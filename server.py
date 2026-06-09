#!/usr/bin/env python3
import argparse
import hashlib
import html
import json
import os
import re
import time
import xml.etree.ElementTree as ET
from datetime import date, datetime, time as datetime_time, timedelta, timezone
from email.utils import parsedate_to_datetime
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import parse_qs, quote, unquote, urlparse
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parent
CACHE_TTL_SECONDS = 90
EVIDENCE_CACHE_TTL_SECONDS = 600
LONG_CACHE_TTL_SECONDS = 86400
MONITOR_CACHE_TTL_SECONDS = int(os.environ.get("SERENITY_MONITOR_TTL_SECONDS", "90"))
YAHOO_CHART = "https://query1.finance.yahoo.com/v8/finance/chart/{symbol}?range={range}&interval={interval}&includePrePost=false&events=div%2Csplits"
YAHOO_RSS = "https://feeds.finance.yahoo.com/rss/2.0/headline?s={symbol}&region=US&lang=en-US"
SEC_TICKERS = "https://www.sec.gov/files/company_tickers.json"
SEC_SUBMISSIONS = "https://data.sec.gov/submissions/CIK{cik}.json"
X_API_BASE = "https://api.x.com/2"

DEFAULT_HEADERS = {
    "accept": "text/html,application/xhtml+xml,application/xml,text/xml,application/json;q=0.9,*/*;q=0.8",
    "user-agent": "Mozilla/5.0 Serenity-US-Stock-Desk/1.0",
}
SEC_HEADERS = {
    "accept": "application/json",
    "user-agent": "SerenityUltimate/1.0 local-research@example.com",
}
MAJOR_SEC_FORMS = {"10-K", "10-Q", "8-K", "20-F", "40-F", "6-K", "S-1", "S-3", "424B2", "424B5", "DEF 14A", "DEFA14A", "SD"}
SECONDARY_SEC_FORMS = {"4", "3", "5", "144", "SC 13G", "SC 13D", "ARS"}
MONITOR_SYMBOL_ALIASES = {
    "SIVE": "SIVE.ST",
    "BRK.A": "BRK-A",
    "BRK.B": "BRK-B",
}
SYMBOL_ALIASES = {
    "QUALCOMM": "QCOM",
    "高通": "QCOM",
    "高通公司": "QCOM",
    "骁龙": "QCOM",
    "驍龍": "QCOM",
}
MONITOR_TICKER_BLACKLIST = {"USD", "US", "NYSE", "NASDAQ"}
OFFICIAL_SOURCES = {
    "SIVE.ST": [
        {
            "url": "https://www.sivers-semiconductors.com/press/all-space-awards-8-2m-production-order-to-sivers-semiconductors-for-ka-band-beamforming-ics/",
            "source": "Sivers official",
            "strength": "Strong",
            "kind": "official",
            "title_hint": "ALL.SPACE Awards $8.2M Production Order to Sivers Semiconductors for Ka-Band Beamforming ICs",
            "summary_hint": "Official Sivers announcement: ALL.SPACE awarded an $8.2M 2027 production order for multi-beam Ka-band BFICs.",
        },
        {
            "url": "https://www.nasdaq.com/press-release/sivers-globalfoundries-advance-ai-data-center-optical-solutions-2026-06-02",
            "source": "Nasdaq press release",
            "strength": "Medium",
            "kind": "official",
            "title_hint": "Sivers, GlobalFoundries Advance AI Data Center Optical Solutions",
            "summary_hint": "Sivers/GF optical roadmap item. Treat as a cross-check until it turns into disclosed volume revenue.",
        },
    ],
    "SIVEF": [
        {
            "url": "https://www.sivers-semiconductors.com/press/all-space-awards-8-2m-production-order-to-sivers-semiconductors-for-ka-band-beamforming-ics/",
            "source": "Sivers official",
            "strength": "Strong",
            "kind": "official",
            "title_hint": "ALL.SPACE Awards $8.2M Production Order to Sivers Semiconductors for Ka-Band Beamforming ICs",
            "summary_hint": "Official Sivers announcement: ALL.SPACE awarded an $8.2M 2027 production order for multi-beam Ka-band BFICs.",
        }
    ],
}
COMPANY_DOMAINS = {
    "AAPL": "apple.com",
    "AXP": "americanexpress.com",
    "KO": "coca-colacompany.com",
    "BAC": "bankofamerica.com",
    "GOOGL": "google.com",
    "GOOG": "google.com",
    "QCOM": "qualcomm.com",
    "CVX": "chevron.com",
    "OXY": "oxy.com",
    "CB": "chubb.com",
    "MCO": "moodys.com",
    "KHC": "kraftheinzcompany.com",
    "NVDA": "nvidia.com",
    "AMD": "amd.com",
    "AMZN": "amazon.com",
    "MSFT": "microsoft.com",
    "PANW": "paloaltonetworks.com",
    "CRWV": "coreweave.com",
    "AVGO": "broadcom.com",
    "TSM": "tsmc.com",
    "ANET": "arista.com",
    "INTC": "intel.com",
    "TSLA": "tesla.com",
    "COIN": "coinbase.com",
    "ROKU": "roku.com",
    "SHOP": "shopify.com",
    "CRSP": "crisprtx.com",
    "BRK-A": "berkshirehathaway.com",
    "META": "meta.com",
    "BABA": "alibabagroup.com",
    "PACK": "ranpak.com",
    "FIX": "comfortsystemsusa.com",
    "CAT": "caterpillar.com",
    "RGTI": "rigetti.com",
    "NBIS": "nebius.com",
    "SNDK": "sandisk.com",
    "VRT": "vertiv.com",
    "SIVE.ST": "sivers-semiconductors.com",
    "ASML": "asml.com",
    "MU": "micron.com",
    "LRCX": "lamresearch.com",
}
COMPANY_BADGE_LABELS = {
    "BRK-A": "BH",
}
PERSON_IMAGES = {
    "buffett": "https://commons.wikimedia.org/wiki/Special:FilePath/Warren_Buffett_at_the_2015_SelectUSA_Investment_Summit_%28cropped%29.jpg?width=360",
    "pelosi": "https://commons.wikimedia.org/wiki/Special:FilePath/Official_photo_of_Speaker_Nancy_Pelosi_in_2019.jpg?width=360",
    "jensen": "https://commons.wikimedia.org/wiki/Special:FilePath/Jen-Hsun_Huang_2025.jpg?width=360",
    "cathie": "https://commons.wikimedia.org/wiki/Special:FilePath/Cathie_Wood_ARK_Invest_Photo.jpg?width=360",
    "duan": "https://img.i-scmp.com/cdn-cgi/image/fit%3Dcontain%2Cwidth%3D512%2Cformat%3Dauto/sites/default/files/d8/images/canvas/2026/04/17/ee19073f-7e4d-4908-a0b6-3e8c8f82f343_cb0c5d2e.jpg",
    "soros": "https://opensocietyfoundations.imgix.net/uploads/6264e8c8-a29e-4794-b9a8-c063cf16a1e9/2013-george-soros-desk-3000.jpg?auto=format&fit=crop&crop=faces&w=360&h=360&q=75",
    "greene": "https://www.congress.gov/img/member/g000596_200.jpg",
}

cache = {}


def json_response(handler, payload, status=200):
    body = json.dumps(payload, ensure_ascii=False, separators=(",", ":")).encode("utf-8")
    handler.send_response(status)
    handler.send_header("content-type", "application/json; charset=utf-8")
    handler.send_header("cache-control", "no-store")
    handler.send_header("content-length", str(len(body)))
    handler.end_headers()
    handler.wfile.write(body)


def binary_response(handler, body, content_type="application/octet-stream", status=200):
    handler.send_response(status)
    handler.send_header("content-type", content_type)
    handler.send_header("cache-control", "public, max-age=86400")
    handler.send_header("content-length", str(len(body)))
    handler.end_headers()
    handler.wfile.write(body)


def company_badge_svg(symbol):
    label = COMPANY_BADGE_LABELS.get(symbol, symbol.replace(".", "").replace("-", "")[:2] or "?")
    safe_label = html.escape(label.upper())
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" role="img" aria-label="{safe_label} logo">
<rect width="128" height="128" rx="64" fill="#111827"/>
<circle cx="64" cy="64" r="58" fill="none" stroke="#ffffff" stroke-opacity=".16" stroke-width="6"/>
<text x="64" y="75" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="38" font-weight="800" fill="#ffffff">{safe_label}</text>
</svg>"""
    return svg.encode("utf-8")


def normalize_symbol(value):
    symbol = "".join(ch for ch in value.upper().strip() if ch.isalnum() or ch in ".-=")
    return symbol[:16]


def resolve_symbol(value):
    text = (value or "").strip()
    upper = text.upper()
    return SYMBOL_ALIASES.get(text) or SYMBOL_ALIASES.get(upper) or normalize_symbol(text)


def now_iso():
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def cached_value(key, ttl_seconds):
    cached = cache.get(key)
    if cached and time.time() - cached["time"] < ttl_seconds:
        return cached["payload"]
    return None


def store_cached_value(key, payload):
    cache[key] = {"time": time.time(), "payload": payload}
    return payload


def clean_text(value, limit=240):
    text = html.unescape(value or "")
    text = re.sub(r"<[^>]+>", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    if len(text) > limit:
        return text[:limit - 3].rstrip() + "..."
    return text


def http_text(url, headers=None, ttl_seconds=EVIDENCE_CACHE_TTL_SECONDS):
    key = ("http-text", url)
    cached = cached_value(key, ttl_seconds)
    if cached is not None:
        return cached
    req = Request(url, headers=headers or DEFAULT_HEADERS)
    with urlopen(req, timeout=15) as res:
        charset = res.headers.get_content_charset() or "utf-8"
        payload = res.read().decode(charset, errors="replace")
    return store_cached_value(key, payload)


def http_bytes(url, headers=None, ttl_seconds=LONG_CACHE_TTL_SECONDS):
    key = ("http-bytes", url)
    cached = cached_value(key, ttl_seconds)
    if cached is not None:
        return cached
    req = Request(url, headers=headers or DEFAULT_HEADERS)
    with urlopen(req, timeout=15) as res:
        payload = {
            "body": res.read(),
            "content_type": res.headers.get_content_type() or "application/octet-stream",
        }
    return store_cached_value(key, payload)


def http_json(url, headers=None, ttl_seconds=EVIDENCE_CACHE_TTL_SECONDS):
    key = ("http-json", url)
    cached = cached_value(key, ttl_seconds)
    if cached is not None:
        return cached
    payload = json.loads(http_text(url, headers=headers or DEFAULT_HEADERS, ttl_seconds=ttl_seconds))
    return store_cached_value(key, payload)


def bearer_from_env():
    for name in ("X_BEARER_TOKEN", "TWITTER_BEARER_TOKEN", "SERENITY_X_BEARER_TOKEN"):
        token = os.environ.get(name, "").strip()
        if token:
            return token
    return ""


def bearer_from_request(handler):
    header = handler.headers.get("Authorization", "").strip()
    if header.lower().startswith("bearer "):
        return header[7:].strip()
    return ""


def x_headers(token):
    return {
        "accept": "application/json",
        "authorization": f"Bearer {token}",
        "user-agent": "Serenity-US-Stock-Desk/1.0",
    }


def observed_fixed_holiday(year, month, day_value):
    holiday = date(year, month, day_value)
    if holiday.weekday() == 5:
        return holiday - timedelta(days=1)
    if holiday.weekday() == 6:
        return holiday + timedelta(days=1)
    return holiday


def nth_weekday(year, month, weekday, nth):
    cursor = date(year, month, 1)
    while cursor.weekday() != weekday:
        cursor += timedelta(days=1)
    return cursor + timedelta(days=7 * (nth - 1))


def last_weekday(year, month, weekday):
    cursor = date(year, month + 1, 1) - timedelta(days=1) if month < 12 else date(year, 12, 31)
    while cursor.weekday() != weekday:
        cursor -= timedelta(days=1)
    return cursor


def easter_date(year):
    a = year % 19
    b = year // 100
    c = year % 100
    d = b // 4
    e = b % 4
    f = (b + 8) // 25
    g = (b - f + 1) // 3
    h = (19 * a + b - d - g + 15) % 30
    i = c // 4
    k = c % 4
    l = (32 + 2 * e + 2 * i - h - k) % 7
    m = (a + 11 * h + 22 * l) // 451
    month = (h + l - 7 * m + 114) // 31
    day_value = ((h + l - 7 * m + 114) % 31) + 1
    return date(year, month, day_value)


def eastern_tz_for_utc(value):
    utc_value = value.astimezone(timezone.utc)
    year = utc_value.year
    dst_start_day = nth_weekday(year, 3, 6, 2)
    dst_end_day = nth_weekday(year, 11, 6, 1)
    dst_start_utc = datetime.combine(dst_start_day, datetime_time(7, 0), timezone.utc)
    dst_end_utc = datetime.combine(dst_end_day, datetime_time(6, 0), timezone.utc)
    offset_hours = -4 if dst_start_utc <= utc_value < dst_end_utc else -5
    return timezone(timedelta(hours=offset_hours), "America/New_York")


def to_new_york_time(value=None):
    utc_value = value or datetime.now(timezone.utc)
    if utc_value.tzinfo is None:
        utc_value = utc_value.replace(tzinfo=timezone.utc)
    utc_value = utc_value.astimezone(timezone.utc)
    return utc_value.astimezone(eastern_tz_for_utc(utc_value))


def us_market_holidays(year):
    thanksgiving = nth_weekday(year, 11, 3, 4)
    return {
        observed_fixed_holiday(year, 1, 1): "New Year's Day",
        nth_weekday(year, 1, 0, 3): "Martin Luther King Jr. Day",
        nth_weekday(year, 2, 0, 3): "Washington's Birthday",
        easter_date(year) - timedelta(days=2): "Good Friday",
        last_weekday(year, 5, 0): "Memorial Day",
        observed_fixed_holiday(year, 6, 19): "Juneteenth",
        observed_fixed_holiday(year, 7, 4): "Independence Day",
        nth_weekday(year, 9, 0, 1): "Labor Day",
        thanksgiving: "Thanksgiving Day",
        observed_fixed_holiday(year, 12, 25): "Christmas Day",
    }


def us_market_early_closes(year):
    thanksgiving = nth_weekday(year, 11, 3, 4)
    closes = {thanksgiving + timedelta(days=1): "Day after Thanksgiving"}
    christmas_eve = date(year, 12, 24)
    if christmas_eve.weekday() < 5 and christmas_eve not in us_market_holidays(year):
        closes[christmas_eve] = "Christmas Eve"
    july_3 = date(year, 7, 3)
    if july_3.weekday() < 5 and observed_fixed_holiday(year, 7, 4) != july_3:
        closes[july_3] = "Independence Day eve"
    return closes


def market_session(now=None):
    now_ny = to_new_york_time(now)
    today = now_ny.date()
    holidays = us_market_holidays(today.year)
    early_closes = us_market_early_closes(today.year)
    open_time = datetime_time(9, 30)
    close_time = datetime_time(16, 0)
    reason = "regular"
    if today in early_closes:
        close_time = datetime_time(13, 0)
        reason = early_closes[today]
    ny_tz = now_ny.tzinfo
    open_at = datetime.combine(today, open_time, ny_tz)
    close_at = datetime.combine(today, close_time, ny_tz)
    is_weekday = today.weekday() < 5
    is_holiday = today in holidays
    is_open = is_weekday and not is_holiday and open_at <= now_ny < close_at
    if not is_weekday:
        reason = "weekend"
    elif is_holiday:
        reason = holidays[today]
    elif now_ny < open_at:
        reason = "pre-market"
    elif now_ny >= close_at:
        reason = "after-hours"

    next_open = None
    for offset in range(0, 15):
        day = today + timedelta(days=offset)
        if day.weekday() >= 5 or day in us_market_holidays(day.year):
            continue
        candidate = datetime.combine(day, open_time, eastern_tz_for_utc(datetime.combine(day, datetime_time(14, 30), timezone.utc)))
        if candidate > now_ny:
            next_open = candidate
            break

    return {
        "isTradable": is_open,
        "session": "regular" if is_open else "closed",
        "reason": reason,
        "nyTime": now_ny.replace(microsecond=0).isoformat(),
        "openAt": open_at.isoformat(),
        "closeAt": close_at.isoformat(),
        "nextOpenAt": next_open.isoformat() if next_open else None,
    }


def normalize_monitor_handle(handle):
    return re.sub(r"[^A-Za-z0-9_]", "", handle or "")[:32] or "aleabitoreddit"


def normalize_monitor_symbol(raw):
    cleaned = normalize_symbol((raw or "").replace("$", ""))
    if not cleaned or cleaned in MONITOR_TICKER_BLACKLIST:
        return ""
    return MONITOR_SYMBOL_ALIASES.get(cleaned, cleaned)


def extract_monitor_symbols(text, entities=None):
    found = []
    seen = set()
    for cashtag in ((entities or {}).get("cashtags") or []):
        symbol = normalize_monitor_symbol(cashtag.get("tag"))
        if symbol and symbol not in seen:
            seen.add(symbol)
            found.append(symbol)
    for match in re.finditer(r"(?<![A-Za-z0-9_])\$([A-Za-z][A-Za-z0-9]{0,9}(?:\.[A-Za-z])?)(?![A-Za-z0-9_])", text or ""):
        symbol = normalize_monitor_symbol(match.group(1))
        if symbol and symbol not in seen:
            seen.add(symbol)
            found.append(symbol)
    return found


def monitor_quote(symbol):
    try:
        chart = shape_chart_payload(symbol, "1d")
        if chart.get("error"):
            return {"symbol": symbol, "error": chart["error"]}
        points = chart.get("points") or []
        latest = points[-1] if points else {}
        previous = chart.get("meta", {}).get("previousClose") or (points[-2].get("close") if len(points) > 1 else None)
        close = latest.get("close")
        change = close - previous if isinstance(close, (int, float)) and isinstance(previous, (int, float)) else None
        change_pct = change / previous * 100 if isinstance(change, (int, float)) and previous else None
        return {
            "symbol": symbol,
            "name": chart.get("meta", {}).get("shortName") or chart.get("meta", {}).get("longName") or symbol,
            "currency": chart.get("meta", {}).get("currency"),
            "exchange": chart.get("meta", {}).get("exchange"),
            "price": close,
            "change": change,
            "changePct": change_pct,
            "marketTime": chart.get("meta", {}).get("regularMarketTime"),
        }
    except Exception as exc:
        return {"symbol": symbol, "error": str(exc)[:180]}


def post_from_x_tweet(handle, tweet):
    text = clean_text(tweet.get("text"), 560)
    symbols = extract_monitor_symbols(text, tweet.get("entities") or {})
    return {
        "id": tweet.get("id"),
        "url": f"https://x.com/{handle}/status/{tweet.get('id')}" if tweet.get("id") else f"https://x.com/{handle}",
        "text": text,
        "createdAt": tweet.get("created_at"),
        "symbols": symbols,
        "metrics": tweet.get("public_metrics") or {},
    }


def posts_from_rss(handle, rss_url):
    text = http_text(rss_url, ttl_seconds=MONITOR_CACHE_TTL_SECONDS)
    root = ET.fromstring(text)
    posts = []
    for item in root.findall(".//item")[:20]:
        title = clean_text(item.findtext("title"), 560)
        description = clean_text(item.findtext("description"), 560)
        post_text = title if len(title) >= len(description) else description
        link = clean_text(item.findtext("link"), 500) or f"https://x.com/{handle}"
        post_id_match = re.search(r"/status/(\d+)", link)
        posts.append({
            "id": post_id_match.group(1) if post_id_match else link,
            "url": link,
            "text": post_text,
            "createdAt": rss_date_to_iso(item.findtext("pubDate")),
            "symbols": extract_monitor_symbols(post_text),
            "metrics": {},
        })
    return posts


def posts_from_x_api(handle, token):
    user_url = f"{X_API_BASE}/users/by/username/{quote(handle)}?user.fields=name,username,profile_image_url,verified,public_metrics"
    user_payload = http_json(user_url, headers=x_headers(token), ttl_seconds=LONG_CACHE_TTL_SECONDS)
    user = user_payload.get("data") or {}
    user_id = user.get("id")
    if not user_id:
        raise ValueError("X user lookup returned no user id")
    tweets_url = (
        f"{X_API_BASE}/users/{quote(user_id)}/tweets?"
        "max_results=25&exclude=replies,retweets"
        "&tweet.fields=created_at,entities,public_metrics,lang,referenced_tweets"
    )
    tweets_payload = http_json(tweets_url, headers=x_headers(token), ttl_seconds=MONITOR_CACHE_TTL_SECONDS)
    posts = [post_from_x_tweet(handle, item) for item in tweets_payload.get("data") or []]
    return posts, {
        "id": user_id,
        "name": user.get("name") or handle,
        "username": user.get("username") or handle,
        "profileImageUrl": user.get("profile_image_url"),
        "verified": bool(user.get("verified")),
        "metrics": user.get("public_metrics") or {},
    }


def build_monitor_payload(handle, posts, source, user=None):
    market = market_session()
    signal_posts = [post for post in posts if post.get("symbols")]
    ticker_map = {}
    for post in signal_posts:
        for symbol in post.get("symbols") or []:
            row = ticker_map.setdefault(symbol, {
                "symbol": symbol,
                "mentions": 0,
                "lastMentionAt": post.get("createdAt"),
                "posts": [],
            })
            row["mentions"] += 1
            row["posts"].append(post.get("id"))
            if parse_date_to_ts(post.get("createdAt")) > parse_date_to_ts(row.get("lastMentionAt")):
                row["lastMentionAt"] = post.get("createdAt")

    tickers = []
    for symbol, row in ticker_map.items():
        quote_payload = monitor_quote(symbol)
        tickers.append({
            **row,
            "quote": quote_payload,
            "tradableNow": bool(market.get("isTradable")),
        })
    tickers.sort(key=lambda item: (parse_date_to_ts(item.get("lastMentionAt")), item.get("mentions", 0)), reverse=True)
    return {
        "handle": handle,
        "fetchedAt": now_iso(),
        "cacheTtlSeconds": MONITOR_CACHE_TTL_SECONDS,
        "market": market,
        "source": source,
        "user": user or {"username": handle, "name": handle},
        "tickers": tickers,
        "items": signal_posts[:12],
        "rawItems": posts[:12],
    }


def monitor_payload(handle, bearer_token="", force=False):
    handle = normalize_monitor_handle(handle)
    token = bearer_token or bearer_from_env()
    rss_url = os.environ.get("SERENITY_X_RSS_URL", "").strip()
    token_key = hashlib.sha256(token.encode("utf-8")).hexdigest()[:12] if token else ""
    source_key = token_key if token else ("rss" if rss_url else "none")
    key = ("monitor", handle, source_key)
    cached = None if force else cached_value(key, MONITOR_CACHE_TTL_SECONDS)
    if cached is not None:
        return cached

    if token:
        try:
            posts, user = posts_from_x_api(handle, token)
            payload = build_monitor_payload(handle, posts, {
                "kind": "x-api",
                "status": "ok",
                "label": "X API v2",
                "detail": "official timeline endpoint",
            }, user)
            return store_cached_value(key, payload)
        except HTTPError as exc:
            detail = f"X API returned {exc.code}"
        except (TimeoutError, URLError) as exc:
            detail = f"X API network error: {exc}"
        except Exception as exc:
            detail = str(exc)[:220]
        payload = build_monitor_payload(handle, [], {
            "kind": "x-api",
            "status": "unavailable",
            "label": "X API v2",
            "detail": detail,
        })
        return store_cached_value(key, payload)

    if rss_url:
        try:
            feed_url = rss_url.replace("{handle}", quote(handle))
            posts = posts_from_rss(handle, feed_url)
            payload = build_monitor_payload(handle, posts, {
                "kind": "rss",
                "status": "ok",
                "label": "Custom RSS",
                "detail": feed_url,
            })
            return store_cached_value(key, payload)
        except Exception as exc:
            payload = build_monitor_payload(handle, [], {
                "kind": "rss",
                "status": "unavailable",
                "label": "Custom RSS",
                "detail": str(exc)[:220],
            })
            return store_cached_value(key, payload)

    return build_monitor_payload(handle, [], {
        "kind": "x-api",
        "status": "needs_token",
        "label": "X API v2",
        "detail": "Set X_BEARER_TOKEN, TWITTER_BEARER_TOKEN, SERENITY_X_BEARER_TOKEN, or paste a temporary Bearer Token in the panel.",
    })


def parse_date_to_ts(value):
    if not value:
        return 0
    text = value.strip()
    try:
        if text.endswith("Z"):
            text = text[:-1] + "+00:00"
        return datetime.fromisoformat(text).timestamp()
    except ValueError:
        pass
    try:
        return parsedate_to_datetime(value).timestamp()
    except (TypeError, ValueError, IndexError, AttributeError):
        return 0


def freshness_label(value):
    ts = parse_date_to_ts(value)
    if not ts:
        return "unknown"
    days = max(0, int((time.time() - ts) / 86400))
    if days == 0:
        return "today"
    if days <= 7:
        return f"{days}d"
    if days <= 45:
        return f"{days}d"
    return f"{days // 30}mo"


def interval_for_range(range_value):
    if range_value in {"1d", "5d"}:
        return "5m"
    if range_value in {"1mo", "3mo", "6mo", "1y", "2y"}:
        return "1d"
    if range_value in {"5y"}:
        return "1wk"
    return "1d"


def fetch_yahoo_chart(symbol, range_value):
    symbol = normalize_symbol(symbol)
    range_value = range_value if range_value in {"1d", "5d", "1mo", "3mo", "6mo", "1y", "2y", "5y"} else "6mo"
    interval = interval_for_range(range_value)
    key = (symbol, range_value, interval)
    now = time.time()
    cached = cache.get(key)
    if cached and now - cached["time"] < CACHE_TTL_SECONDS:
        return cached["payload"]

    url = YAHOO_CHART.format(symbol=quote(symbol), range=range_value, interval=interval)
    req = Request(url, headers={
        "accept": "application/json",
        "user-agent": "Mozilla/5.0 Serenity-US-Stock-Desk/1.0",
    })
    with urlopen(req, timeout=12) as res:
        payload = json.loads(res.read().decode("utf-8"))
    cache[key] = {"time": now, "payload": payload}
    return payload


def shape_chart_payload(symbol, range_value):
    raw = fetch_yahoo_chart(symbol, range_value)
    result = ((raw.get("chart") or {}).get("result") or [None])[0]
    if not result:
        error = ((raw.get("chart") or {}).get("error") or {}).get("description") or "No chart data returned"
        return {"symbol": symbol, "range": range_value, "error": error, "points": []}

    meta = result.get("meta") or {}
    timestamps = result.get("timestamp") or []
    quote_data = (((result.get("indicators") or {}).get("quote") or [{}])[0]) or {}
    adjclose_data = (((result.get("indicators") or {}).get("adjclose") or [{}])[0]) or {}
    closes = quote_data.get("close") or []
    adjcloses = adjclose_data.get("adjclose") or []
    points = []
    for idx, ts in enumerate(timestamps):
        close = closes[idx] if idx < len(closes) else None
        adjclose = adjcloses[idx] if idx < len(adjcloses) else close
        if close is None:
            continue
        points.append({
            "time": int(ts),
            "open": value_at(quote_data.get("open"), idx),
            "high": value_at(quote_data.get("high"), idx),
            "low": value_at(quote_data.get("low"), idx),
            "close": close,
            "adjclose": adjclose,
            "volume": value_at(quote_data.get("volume"), idx, 0),
        })

    return {
        "symbol": symbol,
        "range": range_value,
        "meta": {
            "shortName": meta.get("shortName"),
            "longName": meta.get("longName"),
            "currency": meta.get("currency"),
            "exchange": meta.get("exchangeName") or meta.get("fullExchangeName") or meta.get("exchange"),
            "instrumentType": meta.get("instrumentType"),
            "regularMarketPrice": meta.get("regularMarketPrice"),
            "previousClose": meta.get("previousClose") or meta.get("chartPreviousClose"),
            "regularMarketTime": meta.get("regularMarketTime"),
            "timezone": meta.get("timezone"),
        },
        "points": points,
    }


def value_at(items, idx, default=None):
    if not items or idx >= len(items):
        return default
    return items[idx]


def page_meta(text, fallback_title=None, fallback_summary=None):
    def meta_content(name):
        patterns = [
            rf'<meta[^>]+property=["\']{re.escape(name)}["\'][^>]+content=["\']([^"\']+)["\']',
            rf'<meta[^>]+name=["\']{re.escape(name)}["\'][^>]+content=["\']([^"\']+)["\']',
            rf'<meta[^>]+content=["\']([^"\']+)["\'][^>]+property=["\']{re.escape(name)}["\']',
            rf'<meta[^>]+content=["\']([^"\']+)["\'][^>]+name=["\']{re.escape(name)}["\']',
        ]
        for pattern in patterns:
            match = re.search(pattern, text, flags=re.IGNORECASE | re.DOTALL)
            if match:
                return clean_text(match.group(1), 360)
        return None

    title_match = re.search(r"<title[^>]*>(.*?)</title>", text, flags=re.IGNORECASE | re.DOTALL)
    title = meta_content("og:title") or (clean_text(title_match.group(1), 220) if title_match else None) or fallback_title
    summary = meta_content("og:description") or meta_content("description") or fallback_summary
    published_match = re.search(r'"datePublished"\s*:\s*"([^"]+)"', text)
    modified_match = re.search(r'"dateModified"\s*:\s*"([^"]+)"', text)
    date_value = (
        meta_content("article:published_time")
        or meta_content("datePublished")
        or (clean_text(published_match.group(1), 80) if published_match else None)
        or meta_content("article:modified_time")
        or meta_content("dateModified")
        or (clean_text(modified_match.group(1), 80) if modified_match else None)
    )
    return {"title": title, "summary": summary, "date": date_value}


def fetch_official_sources(symbol):
    sources = OFFICIAL_SOURCES.get(symbol, [])
    if not sources:
        return [], {"name": "Official/IR curated", "status": "not_configured", "count": 0}

    items = []
    failures = []
    for source in sources:
        try:
            text = http_text(source["url"], ttl_seconds=EVIDENCE_CACHE_TTL_SECONDS)
            meta = page_meta(text, source.get("title_hint"), source.get("summary_hint"))
            date_value = meta.get("date")
            items.append({
                "title": meta.get("title") or source.get("title_hint") or source["url"],
                "summary": meta.get("summary") or source.get("summary_hint") or "Official source page fetched live.",
                "source": source.get("source", "Official source"),
                "url": source["url"],
                "date": date_value,
                "freshness": freshness_label(date_value),
                "strength": source.get("strength", "Strong"),
                "kind": source.get("kind", "official"),
                "affects": ["evidence_quality", "customer_validation"],
            })
        except Exception as exc:
            failures.append(str(exc))

    status = "ok" if items else "unavailable"
    detail = None if items else "; ".join(failures)[:220]
    return items, {"name": "Official/IR curated", "status": status, "count": len(items), "detail": detail}


def sec_ticker_map():
    raw = http_json(SEC_TICKERS, headers=SEC_HEADERS, ttl_seconds=LONG_CACHE_TTL_SECONDS)
    output = {}
    for row in raw.values():
        ticker = normalize_symbol(str(row.get("ticker", "")))
        cik = str(row.get("cik_str", "")).zfill(10)
        if ticker and cik:
            output[ticker] = {"cik": cik, "name": row.get("title") or ticker}
    return output


def sec_filing_url(cik, accession_number, primary_document):
    accession_folder = accession_number.replace("-", "")
    cik_no_zero = str(int(cik))
    if primary_document:
        return f"https://www.sec.gov/Archives/edgar/data/{cik_no_zero}/{accession_folder}/{primary_document}"
    return f"https://www.sec.gov/Archives/edgar/data/{cik_no_zero}/{accession_folder}/{accession_number}-index.html"


def fetch_sec_filings(symbol, limit=8):
    if "." in symbol:
        return [], {"name": "SEC EDGAR", "status": "not_applicable", "count": 0, "detail": "Ticker suffix is outside SEC ticker map."}

    ticker_map = sec_ticker_map()
    match = ticker_map.get(symbol)
    if not match:
        return [], {"name": "SEC EDGAR", "status": "not_found", "count": 0, "detail": "No SEC CIK match for ticker."}

    data = http_json(SEC_SUBMISSIONS.format(cik=match["cik"]), headers=SEC_HEADERS, ttl_seconds=EVIDENCE_CACHE_TTL_SECONDS)
    recent = ((data.get("filings") or {}).get("recent") or {})
    forms = recent.get("form") or []
    accession_numbers = recent.get("accessionNumber") or []
    filing_dates = recent.get("filingDate") or []
    reports = recent.get("reportDate") or []
    primary_docs = recent.get("primaryDocument") or []
    descriptions = recent.get("primaryDocDescription") or []

    rows = []
    for idx, form in enumerate(forms):
        form = (form or "").upper()
        is_major = form in MAJOR_SEC_FORMS
        is_secondary = form in SECONDARY_SEC_FORMS or form.startswith("SC ")
        if not is_major and not is_secondary:
            continue
        accession = value_at(accession_numbers, idx)
        if not accession:
            continue
        filing_date = value_at(filing_dates, idx, "")
        report_date = value_at(reports, idx, "")
        description = clean_text(value_at(descriptions, idx, "") or form, 120)
        primary_document = value_at(primary_docs, idx, "")
        title = f"{symbol} {form} filed {filing_date}"
        summary = f"Official SEC filing for {match['name']}. Report date: {report_date or 'not listed'}. Primary doc: {description}."
        rows.append({
            "title": title,
            "summary": summary,
            "source": "SEC EDGAR",
            "url": sec_filing_url(match["cik"], accession, primary_document),
            "date": filing_date,
            "freshness": freshness_label(filing_date),
            "strength": "Strong" if is_major else "Medium",
            "kind": "filing",
            "form": form,
            "affects": ["risk_check", "financial_validation"],
            "sortTs": parse_date_to_ts(filing_date),
        })
        if len(rows) >= limit:
            break

    for row in rows:
        row.pop("sortTs", None)
    return rows, {"name": "SEC EDGAR", "status": "ok", "count": len(rows), "detail": f"CIK {match['cik']}"}


def rss_date_to_iso(value):
    try:
        dt = parsedate_to_datetime(value)
        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=timezone.utc)
        return dt.astimezone(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")
    except (TypeError, ValueError, IndexError, AttributeError):
        return value


def fetch_yahoo_rss(symbol, limit=8):
    url = YAHOO_RSS.format(symbol=quote(symbol, safe=""))
    text = http_text(url, ttl_seconds=EVIDENCE_CACHE_TTL_SECONDS)
    root = ET.fromstring(text)
    items = []
    for item in root.findall(".//item")[:limit]:
        title = clean_text(item.findtext("title"), 220)
        link = clean_text(item.findtext("link"), 500)
        description = clean_text(item.findtext("description"), 260)
        published = rss_date_to_iso(item.findtext("pubDate"))
        if not title or not link:
            continue
        items.append({
            "title": title,
            "summary": description or "Yahoo Finance headline feed item.",
            "source": "Yahoo Finance RSS",
            "url": link,
            "date": published,
            "freshness": freshness_label(published),
            "strength": "Medium",
            "kind": "media",
            "affects": ["news_context"],
        })
    return items, {"name": "Yahoo Finance RSS", "status": "ok", "count": len(items)}


def evidence_payload(symbol):
    symbol = normalize_symbol(symbol)
    key = ("evidence", symbol)
    cached = cached_value(key, EVIDENCE_CACHE_TTL_SECONDS)
    if cached is not None:
        return cached

    all_items = []
    statuses = []
    source_fetchers = [
        fetch_official_sources,
        fetch_sec_filings,
        fetch_yahoo_rss,
    ]
    for fetcher in source_fetchers:
        try:
            items, status = fetcher(symbol)
            all_items.extend(items)
            statuses.append(status)
        except Exception as exc:
            statuses.append({"name": fetcher.__name__.replace("fetch_", "").replace("_", " "), "status": "unavailable", "count": 0, "detail": str(exc)[:220]})

    deduped = []
    seen = set()
    for item in all_items:
        url = item.get("url") or item.get("title")
        if url in seen:
            continue
        seen.add(url)
        item["sortTs"] = parse_date_to_ts(item.get("date"))
        item["sortStrength"] = {"Strong": 3, "Medium": 2, "Weak": 1}.get(item.get("strength"), 0)
        item["sortKind"] = {"official": 3, "filing": 3, "media": 1}.get(item.get("kind"), 0)
        deduped.append(item)
    deduped.sort(key=lambda item: (item.get("sortStrength") or 0, item.get("sortKind") or 0, item.get("sortTs") or 0), reverse=True)
    for item in deduped:
        item.pop("sortTs", None)
        item.pop("sortStrength", None)
        item.pop("sortKind", None)

    counts = {"Strong": 0, "Medium": 0, "Weak": 0, "Needs checking": 0}
    for item in deduped:
        strength = item.get("strength") or "Needs checking"
        counts[strength] = counts.get(strength, 0) + 1

    payload = {
        "symbol": symbol,
        "fetchedAt": now_iso(),
        "cacheTtlSeconds": EVIDENCE_CACHE_TTL_SECONDS,
        "items": deduped[:18],
        "counts": counts,
        "sources": statuses,
    }
    return store_cached_value(key, payload)


def serve_company_logo(handler, symbol):
    symbol = resolve_symbol(symbol)
    domain = COMPANY_DOMAINS.get(symbol)
    if not domain:
        json_response(handler, {"error": "Logo domain not configured"}, status=404)
        return
    url = f"https://www.google.com/s2/favicons?domain={quote(domain, safe='')}&sz=128"
    try:
        payload = http_bytes(url, headers={
            "accept": "image/avif,image/webp,image/png,image/svg+xml,image/*,*/*;q=0.8",
            "user-agent": "Mozilla/5.0 Serenity-US-Stock-Desk/1.0",
        })
        binary_response(handler, payload["body"], payload["content_type"])
    except (HTTPError, TimeoutError, URLError):
        binary_response(handler, company_badge_svg(symbol), "image/svg+xml")


def serve_person_image(handler, person_id):
    person_id = re.sub(r"[^a-z0-9_-]", "", person_id.lower())[:40]
    url = PERSON_IMAGES.get(person_id)
    if not url:
        json_response(handler, {"error": "Person image not configured"}, status=404)
        return
    payload = http_bytes(url, headers={
        "accept": "image/avif,image/webp,image/jpeg,image/png,image/*,*/*;q=0.8",
        "user-agent": "Mozilla/5.0 Serenity-US-Stock-Desk/1.0",
    })
    binary_response(handler, payload["body"], payload["content_type"])


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path.startswith("/api/"):
            self.route_api(parsed)
            return
        if parsed.path == "/":
            self.path = "/index.html"
        return super().do_GET()

    def route_api(self, parsed):
        query = parse_qs(parsed.query)
        try:
            if parsed.path == "/api/health":
                json_response(self, {"ok": True, "time": int(time.time())})
                return
            if parsed.path.startswith("/api/logo/"):
                symbol = unquote(parsed.path.rsplit("/", 1)[-1])
                serve_company_logo(self, symbol)
                return
            if parsed.path.startswith("/api/person/"):
                person_id = unquote(parsed.path.rsplit("/", 1)[-1])
                serve_person_image(self, person_id)
                return
            if parsed.path.startswith("/api/monitor/"):
                handle = unquote(parsed.path.rsplit("/", 1)[-1])
                force = (query.get("force") or ["0"])[0] == "1"
                json_response(self, monitor_payload(handle, bearer_from_request(self), force=force))
                return
            if parsed.path.startswith("/api/chart/"):
                symbol = resolve_symbol(unquote(parsed.path.rsplit("/", 1)[-1]))
                range_value = (query.get("range") or ["6mo"])[0]
                if not symbol:
                    json_response(self, {"error": "Missing symbol"}, status=400)
                    return
                json_response(self, shape_chart_payload(symbol, range_value))
                return
            if parsed.path.startswith("/api/evidence/"):
                symbol = resolve_symbol(unquote(parsed.path.rsplit("/", 1)[-1]))
                if not symbol:
                    json_response(self, {"error": "Missing symbol"}, status=400)
                    return
                json_response(self, evidence_payload(symbol))
                return
            json_response(self, {"error": "Unknown API route"}, status=404)
        except HTTPError as exc:
            json_response(self, {"error": f"Upstream returned {exc.code}"}, status=502)
        except (TimeoutError, URLError) as exc:
            json_response(self, {"error": f"Network error: {exc}"}, status=502)
        except Exception as exc:
            json_response(self, {"error": str(exc)}, status=500)


def main():
    parser = argparse.ArgumentParser(description="Serve the Serenity US Stock Desk")
    parser.add_argument("--host", default=os.environ.get("HOST", "127.0.0.1"))
    parser.add_argument("--port", type=int, default=int(os.environ.get("PORT", "8787")))
    args = parser.parse_args()
    server = ThreadingHTTPServer((args.host, args.port), Handler)
    print(f"Serenity US Stock Desk: http://{args.host}:{args.port}", flush=True)
    server.serve_forever()


if __name__ == "__main__":
    main()
