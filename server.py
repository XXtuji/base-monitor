#!/usr/bin/env python3
import argparse
import hashlib
import html
import json
import os
import re
import time
import xml.etree.ElementTree as ET
from concurrent.futures import ThreadPoolExecutor, as_completed
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
REDDIT_TRENDING_TTL_SECONDS = int(os.environ.get("SERENITY_REDDIT_TTL_SECONDS", "300"))
FRED_CACHE_TTL_SECONDS = int(os.environ.get("SERENITY_FRED_TTL_SECONDS", "3600"))
POLITICAL_TRADES_TTL_SECONDS = int(os.environ.get("SERENITY_POLITICAL_TRADES_TTL_SECONDS", "21600"))
CONGRESS_TRADES_TTL_SECONDS = int(os.environ.get("SERENITY_CONGRESS_TRADES_TTL_SECONDS", "900"))
YAHOO_CHART = "https://query1.finance.yahoo.com/v8/finance/chart/{symbol}?range={range}&interval={interval}&includePrePost=false&events=div%2Csplits"
YAHOO_RSS = "https://feeds.finance.yahoo.com/rss/2.0/headline?s={symbol}&region=US&lang=en-US"
GOOGLE_NEWS_RSS = "https://news.google.com/rss/search?q={query}&hl={hl}&gl={gl}&ceid={ceid}"
PRNEWSWIRE_RSS = "https://www.prnewswire.com/rss/news-releases-list.rss"
GLOBENEWSWIRE_PUBLIC_RSS = "https://www.globenewswire.com/RssFeed/orgclass/1/feedTitle/GlobeNewswire%20-%20News%20about%20Public%20Companies"
SEC_TICKERS = "https://www.sec.gov/files/company_tickers.json"
SEC_SUBMISSIONS = "https://data.sec.gov/submissions/CIK{cik}.json"
X_API_BASE = "https://api.x.com/2"
MEIGUHULI_CACHE = "https://cache.meiguhuli.com"
OPEN_CABINET_DATASET = "https://open-cabinet.org/data/full-dataset.json"
OPEN_CABINET_SITE = "https://open-cabinet.org"
QUIVER_CONGRESS_TRADING = "https://api.quiverquant.com/beta/live/congresstrading"
CONGRESSSTOCK_TRADES = "https://www.congressstock.com/trades"
CONGRESSSTOCK_STOCK = "https://www.congressstock.com/stocks/{symbol}"
FRED_OBSERVATIONS = "https://api.stlouisfed.org/fred/series/observations?series_id={series_id}&api_key={api_key}&file_type=json&sort_order=desc&limit={limit}"
MYMEMORY_TRANSLATE = "https://api.mymemory.translated.net/get?q={text}&langpair=en%7Czh-CN"
TRANSLATE_TO_ZH = os.environ.get("SERENITY_TRANSLATE_ZH", "1").strip().lower() not in {"0", "false", "no"}
TRANSLATE_TIMEOUT_SECONDS = float(os.environ.get("SERENITY_TRANSLATE_TIMEOUT_SECONDS", "6"))
TRANSLATE_MAX_WORKERS = int(os.environ.get("SERENITY_TRANSLATE_WORKERS", "6"))

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
    "SPY": "ssga.com",
    "QQQ": "invesco.com",
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
    "MRVL": "marvell.com",
    "ASTS": "ast-science.com",
    "DJT": "trumpmediagroup.com",
    "BA": "boeing.com",
    "AXON": "axon.com",
    "BE": "bloomenergy.com",
    "IREN": "iren.com",
    "CORZ": "corescientific.com",
    "APLD": "applieddigital.com",
    "RIOT": "riotplatforms.com",
    "CLSK": "cleanspark.com",
    "SEI": "solaris-energy.com",
    "BITF": "bitfarms.com",
    "BTDR": "bitdeer.com",
    "RDDT": "redditinc.com",
    "NOW": "servicenow.com",
    "SOXL": "direxion.com",
    "SOXS": "direxion.com",
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
    "BRK-B": "berkshirehathaway.com",
    "BN": "brookfield.com",
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
    "UBER": "uber.com",
    "QSR": "rbi.com",
    "CMG": "chipotle.com",
    "HLT": "hilton.com",
    "PDD": "pddholdings.com",
    "WM": "wm.com",
    "CNI": "cn.ca",
    "DE": "deere.com",
    "ECL": "ecolab.com",
    "WMT": "walmart.com",
    "EWBC": "eastwestbank.com",
    "CROX": "crocs.com",
    "NTRA": "natera.com",
    "INSM": "insmed.com",
    "EWZ": "ishares.com",
    "RSP": "invesco.com",
    "YPF": "ypf.com",
    "AA": "alcoa.com",
    "MOH": "molinahealthcare.com",
    "LULU": "lululemon.com",
    "SLM": "salliemae.com",
    "BRKR": "bruker.com",
    "GEV": "gevernova.com",
    "CPNG": "coupang.com",
    "CPAY": "corpay.com",
    "APP": "applovin.com",
    "PSX": "phillips66.com",
    "LUV": "southwest.com",
    "HPE": "hpe.com",
    "QRVO": "qorvo.com",
    "KVUE": "kenvue.com",
    "MTCH": "mtch.com",
    "IEP": "ielp.com",
    "CVI": "cvrenergy.com",
}
COMPANY_NEWS_NAMES = {
    "AAPL": "Apple",
    "AMD": "AMD",
    "AMZN": "Amazon",
    "ASML": "ASML",
    "AVGO": "Broadcom",
    "CRWV": "CoreWeave",
    "GOOG": "Google",
    "GOOGL": "Google",
    "INTC": "Intel",
    "LRCX": "Lam Research",
    "META": "Meta",
    "MSFT": "Microsoft",
    "MU": "Micron",
    "NVDA": "NVIDIA",
    "QCOM": "Qualcomm",
    "SIVE.ST": "Sivers Semiconductors",
    "TSLA": "Tesla",
    "TSM": "TSMC",
    "VRT": "Vertiv",
    "BN": "Brookfield",
    "UBER": "Uber",
    "QSR": "Restaurant Brands",
    "CMG": "Chipotle",
    "HLT": "Hilton",
    "PDD": "PDD Holdings",
    "WM": "Waste Management",
    "CNI": "Canadian National Railway",
    "DE": "Deere",
    "ECL": "Ecolab",
    "WMT": "Walmart",
    "EWBC": "East West Bancorp",
    "CROX": "Crocs",
    "NTRA": "Natera",
    "INSM": "Insmed",
    "EWZ": "iShares MSCI Brazil ETF",
    "RSP": "Invesco S&P 500 Equal Weight ETF",
    "YPF": "YPF",
    "AA": "Alcoa",
    "MOH": "Molina Healthcare",
    "LULU": "Lululemon",
    "SLM": "Sallie Mae",
    "BRKR": "Bruker",
    "GEV": "GE Vernova",
    "CPNG": "Coupang",
    "CPAY": "Corpay",
    "APP": "AppLovin",
    "PSX": "Phillips 66",
    "LUV": "Southwest Airlines",
    "HPE": "HPE",
    "QRVO": "Qorvo",
    "KVUE": "Kenvue",
    "MTCH": "Match Group",
    "IEP": "Icahn Enterprises",
    "CVI": "CVR Energy",
}
COMPANY_CHINESE_NAMES = {
    "AAPL": "苹果",
    "AMD": "AMD",
    "AMZN": "亚马逊",
    "ASML": "阿斯麦",
    "AVGO": "博通",
    "GOOGL": "谷歌",
    "GOOG": "谷歌",
    "INTC": "英特尔",
    "META": "Meta",
    "MSFT": "微软",
    "MU": "美光",
    "NVDA": "英伟达",
    "QCOM": "高通",
    "TSLA": "特斯拉",
    "TSM": "台积电",
    "BN": "布鲁克菲尔德",
    "UBER": "优步",
    "QSR": "餐饮品牌国际",
    "CMG": "Chipotle",
    "HLT": "希尔顿",
    "PDD": "拼多多",
    "WM": "废品管理",
    "CNI": "加拿大国家铁路",
    "DE": "迪尔",
    "ECL": "艺康",
    "WMT": "沃尔玛",
    "EWBC": "华美银行",
    "CROX": "卡骆驰",
    "NTRA": "Natera",
    "INSM": "Insmed",
    "EWZ": "巴西 ETF",
    "RSP": "标普等权 ETF",
    "YPF": "阿根廷国家石油",
    "AA": "美国铝业",
    "MOH": "Molina Healthcare",
    "LULU": "露露乐蒙",
    "SLM": "Sallie Mae",
    "BRKR": "布鲁克",
    "GEV": "GE Vernova",
    "CPNG": "Coupang",
    "CPAY": "Corpay",
    "APP": "AppLovin",
    "PSX": "菲利普斯66",
    "LUV": "西南航空",
    "HPE": "惠普企业",
    "QRVO": "Qorvo",
    "KVUE": "Kenvue",
    "MTCH": "Match Group",
    "IEP": "Icahn Enterprises",
    "CVI": "CVR Energy",
}
DIRECT_WIRE_RSS_FEEDS = [
    {"name": "PR Newswire RSS", "url": PRNEWSWIRE_RSS},
    {"name": "GlobeNewswire RSS", "url": GLOBENEWSWIRE_PUBLIC_RSS},
]
FRED_MACRO_SERIES = [
    {"id": "DGS10", "label": "10年美债", "unit": "%", "precision": 2, "note": "长端利率，压估值"},
    {"id": "DGS2", "label": "2年美债", "unit": "%", "precision": 2, "note": "短端政策预期"},
    {"id": "T10Y2Y", "label": "10Y-2Y", "unit": "pct", "precision": 2, "note": "收益率曲线"},
    {"id": "FEDFUNDS", "label": "联邦基金利率", "unit": "%", "precision": 2, "note": "政策利率"},
    {"id": "CPIAUCSL", "label": "CPI 指数", "unit": "", "precision": 1, "note": "通胀压力"},
    {"id": "UNRATE", "label": "失业率", "unit": "%", "precision": 1, "note": "就业周期"},
    {"id": "BAMLH0A0HYM2", "label": "高收益利差", "unit": "%", "precision": 2, "note": "信用风险偏好"},
]
FAST_MARKET_NEWS_CONTEXT = "Reuters CNBC Bloomberg MarketWatch Benzinga TheFly Barron's Investor's Business Daily"
OFFICIAL_WIRE_NEWS_CONTEXT = "site:businesswire.com OR site:globenewswire.com OR site:prnewswire.com"
CHINA_MARKET_NEWS_CONTEXT = "财联社 华尔街见闻 证券时报 格隆汇 美港电讯 富途 雪球"
AI_SUPPLY_CHAIN_SYMBOLS = {
    "NVDA", "AMD", "AVGO", "TSM", "ASML", "MU", "LRCX", "INTC", "QCOM", "CRWV", "VRT", "ANET"
}
NEWS_QUERY_OVERRIDES = {
    "NVDA": [
        "NVIDIA Korea Samsung SK hynix HBM when:14d",
        "NVIDIA SK hynix Naver Doosan South Korea AI data centers when:14d",
        "NVIDIA Samsung HBM foundry Korea when:14d",
        "NVDA OR NVIDIA stock when:14d",
    ],
    "AMD": [
        "AMD AI GPU MI300 MI350 data center when:14d",
        "AMD OR Advanced Micro Devices stock when:14d",
    ],
    "AVGO": [
        "Broadcom AI custom silicon ASIC stock when:14d",
        "AVGO OR Broadcom stock when:14d",
    ],
    "MU": [
        "Micron HBM memory AI stock when:14d",
        "MU OR Micron stock when:14d",
    ],
    "QCOM": [
        "Qualcomm Snapdragon AI chip stock when:14d",
        "QCOM OR Qualcomm stock when:14d",
    ],
    "TSM": [
        "TSMC CoWoS AI chip capacity stock when:14d",
        "TSM OR TSMC stock when:14d",
    ],
}
SUPPLY_CHAIN_NEWS_TERMS = (
    "ai factory",
    "co-packaged",
    "cowos",
    "data center",
    "foundry",
    "hbm",
    "korea",
    "memory",
    "samsung",
    "sk hynix",
    "supplier",
    "supply",
    "taiwan",
    "tsmc",
)
TRUSTED_NEWS_SOURCES = (
    "reuters",
    "bloomberg",
    "cnbc",
    "marketwatch",
    "barron's",
    "investor's business daily",
    "business wire",
    "pr newswire",
    "globenewswire",
    "nasdaq",
)
SPECIALIST_NEWS_SOURCES = (
    "digitimes",
    "thelec",
    "the korea herald",
    "the korea times",
    "trendforce",
    "nikkei asia",
    "ked global",
    "siliconangle",
    "blocks & files",
    "techzine",
    "seeking alpha",
    "marketscreener",
    "tradingview",
)
NOISY_NEWS_SOURCES = (
    "stocktwits",
    "24/7 wall st",
    "barchart",
    "mshale",
    "gotrade",
    "let's data science",
    "the american bazaar",
    "mezha",
    "104.1 wiky",
    "marketwise",
    "tradingkey",
    "quiver quantitative",
    "eciks.org",
)
LOW_VALUE_NEWS_PATTERNS = (
    r"\bwill trade at this price\b",
    r"\bprice prediction\b",
    r"\bshould you buy\b",
    r"\bshould investors buy\b",
    r"\bbest stocks?\b",
    r"\b3 stocks?\b",
    r"\bthree stocks?\b",
    r"\btop stocks?\b",
    r"\b10-baggers?\b",
    r"\bget exposure to\b",
    r"\bwithout actually buying\b",
    r"\bbiggest analyst calls\b",
    r"\bstocks? making (?:the )?biggest moves\b",
    r"\bbiggest moves\b",
    r"\bpremarket\b",
    r"\bstock fans\b",
    r"\bmark your calendars\b",
    r"\bgenerational entry point\b",
    r"\bvalue trap\b",
    r"\bexplains? the market today\b",
    r"\bkeeping traders engaged\b",
    r"\bstock bob\b",
    r"\bstock underperforms\b",
    r"\bstock outperforms competitors\b",
    r"\bstock .*performs competitors\b",
    r"\bwhich .* stock wins\b",
    r"\bwhich .* wins now\b",
    r"\byoutube\b",
    r"\bfake .*endorsement video\b",
    r"\betfs? announces? distributions?\b",
    r"\byieldmax\b",
    r"\bweekly distributions?\b",
    r"\bdividend reports?\b",
    r"\blaw firm\b",
    r"\bshareholder alert\b",
    r"\bclass action\b",
    r"\bsecurities class action\b",
    r"\binvestors? to inquire\b",
    r"\bencourages? .* investors?\b",
    r"\binsider\b",
    r"\bsells? shares?\b",
    r"\bsold shares?\b",
    r"\banalyst target\b",
    r"\bsparks rally\b",
    r"\bunder scrutiny\b",
    r"\bdoubling potential\b",
    r"\bheading to nasdaq\b",
)
HARD_LOW_VALUE_NEWS_PATTERNS = (
    r"\blaw firm\b",
    r"\bshareholder alert\b",
    r"\bclass action\b",
    r"\bsecurities class action\b",
    r"\binvestors? to inquire\b",
    r"\bencourages? .* investors?\b",
    r"\binsider\b",
    r"\bsells? shares?\b",
    r"\bsold shares?\b",
    r"\banalyst target\b",
    r"\bsparks rally\b",
    r"\bunder scrutiny\b",
    r"\bdoubling potential\b",
    r"\bheading to nasdaq\b",
)
MATERIAL_NEWS_PATTERNS = (
    r"\border\b",
    r"\bcontract\b",
    r"\bdeal\b",
    r"\bpartnership\b",
    r"\bcollaboration\b",
    r"\bcustomer\b",
    r"\bproduction\b",
    r"\bsupply\b",
    r"\bsupplier\b",
    r"\bshipment\b",
    r"\bdata centers?\b",
    r"\bai infrastructure\b",
    r"\bhbm\b",
    r"\bfoundry\b",
    r"\bmemory\b",
    r"\bearnings?\b",
    r"\brevenue\b",
    r"\bguidance\b",
    r"\bbacklog\b",
    r"\bsecures?\b",
    r"\blaunch(?:es|ed)?\b",
    r"\bunveils?\b",
    r"\bexport controls?\b",
)
ECOSYSTEM_ONLY_PATTERNS = (
    r"\bpowered by nvidia\b",
    r"\bnvidia mgx\b",
    r"\bnvidia omniverse\b",
    r"\bnvidia isaac\b",
    r"\bnvidia nvlink fusion\b",
    r"\bnvidia dsx\b",
    r"\bnvidia[- ]powered\b",
    r"\bnvidia ecosystem\b",
    r"\bnvidia reference\b",
)
STRENGTH_LABEL_ZH = {
    "Strong": "强证据",
    "Medium": "中等线索",
    "Weak": "弱线索",
    "Needs checking": "待核验",
}
SOURCE_STATUS_ZH = {
    "ok": "已连接",
    "unavailable": "不可用",
    "not_found": "未找到",
    "not_applicable": "不适用",
    "not_configured": "手动源",
    "needs_token": "等待 Token",
}
SOURCE_NAME_ZH = {
    "Official/IR curated": "官方/IR 精选",
    "SEC EDGAR": "SEC 监管文件",
    "Press release RSS": "新闻稿 RSS",
    "Official wires via Google": "新闻稿聚合",
    "Sector specialist news": "行业/供应链新闻",
    "Fast market media": "快讯媒体",
    "China market lens": "中文视角",
    "Yahoo Finance RSS": "雅虎财经 RSS",
}
OUTLET_NAME_ZH = {
    "Reuters": "路透",
    "Bloomberg": "彭博",
    "CNBC": "CNBC",
    "Barron's": "巴伦周刊",
    "Investor's Business Daily": "投资者商业日报",
    "Business Wire": "Business Wire",
    "PR Newswire": "美通社",
    "GlobeNewswire": "GlobeNewswire",
    "Nasdaq press release": "纳斯达克新闻稿",
    "SEC EDGAR": "SEC EDGAR",
    "Sivers official": "Sivers 官方",
    "digitimes": "DigiTimes",
    "thelec.net": "The Elec",
    "The Korea Herald": "韩国先驱报",
    "The Korea Times": "韩国时报",
    "SiliconANGLE": "SiliconANGLE",
    "Techzine Global": "Techzine",
    "Yahoo Finance": "雅虎财经",
    "MarketWatch": "MarketWatch",
    "Seeking Alpha": "Seeking Alpha",
    "marketscreener.com": "MarketScreener",
    "TradingView": "TradingView",
    "MSN": "MSN",
}
TRANSLATION_REPLACEMENTS = (
    ("NVIDIA", "英伟达"),
    ("Nvidia", "英伟达"),
    ("Qualcomm", "高通"),
    ("Samsung", "三星"),
    ("SK Hynix", "SK海力士"),
    ("SK hynix", "SK海力士"),
    ("Micron", "美光"),
    ("Foundry", "晶圆代工"),
    ("foundry", "晶圆代工"),
    ("data centres", "数据中心"),
    ("data centers", "数据中心"),
    ("AI infrastructure", "AI 基础设施"),
    ("Production", "量产"),
    ("production", "量产"),
    ("Ka-Band Beamforming ICs", "Ka 波段波束成形 IC"),
    ("Next Generation Tactical Terminals", "下一代战术终端"),
    ("Foundry Collaboration", "晶圆代工合作"),
    ("partnership", "合作"),
    ("Partnership", "合作"),
    ("collaboration", "合作"),
    ("Collaboration", "合作"),
    ("PACT", "合作"),
    ("pact", "合作"),
    ("not listed", "未列出"),
    ("CEO", "CEO"),
    ("memory race", "存储竞争"),
    ("Memory Race", "存储竞争"),
)
COMPANY_BADGE_LABELS = {
    "BRK-A": "BH",
    "BRK-B": "BH",
}
PERSON_IMAGES = {
    "buffett": "https://commons.wikimedia.org/wiki/Special:FilePath/Warren_Buffett_at_the_2015_SelectUSA_Investment_Summit_%28cropped%29.jpg?width=360",
    "pelosi": "https://commons.wikimedia.org/wiki/Special:FilePath/Official_photo_of_Speaker_Nancy_Pelosi_in_2019.jpg?width=360",
    "jensen": "https://commons.wikimedia.org/wiki/Special:FilePath/Jen-Hsun_Huang_2025.jpg?width=360",
    "cathie": "https://commons.wikimedia.org/wiki/Special:FilePath/Cathie_Wood_ARK_Invest_Photo.jpg?width=360",
    "duan": "https://img.i-scmp.com/cdn-cgi/image/fit%3Dcontain%2Cwidth%3D512%2Cformat%3Dauto/sites/default/files/d8/images/canvas/2026/04/17/ee19073f-7e4d-4908-a0b6-3e8c8f82f343_cb0c5d2e.jpg",
    "soros": "https://opensocietyfoundations.imgix.net/uploads/6264e8c8-a29e-4794-b9a8-c063cf16a1e9/2013-george-soros-desk-3000.jpg?auto=format&fit=crop&crop=faces&w=360&h=360&q=75",
    "greene": "https://www.congress.gov/img/member/g000596_200.jpg",
    "trump": "https://commons.wikimedia.org/wiki/Special:FilePath/Donald_Trump_official_portrait_%282025%29.jpg?width=360",
    "ackman": "https://commons.wikimedia.org/wiki/Special:FilePath/Bill_Ackman_%2827929603310%29.jpg?width=360",
    "tepper": "https://www.tepperfoundation.org/uploads/david-p20-1.jpeg?_cchid=8c161b19281e800895535b1cf2a26328",
    "gates": "https://commons.wikimedia.org/wiki/Special:FilePath/Bill_Gates_2018.jpg?width=360",
    "lilu": "https://cdn.prod.website-files.com/5ef3c7300432b4eb48659917/68fa5947d6184e3b91deb2a7_Li_Lu0062_edit1_RELEASE2v2.jpg",
    "duquesne": "wiki",
    "burry": "wiki",
    "leopold": "badge",
    "coatue": "badge",
    "tiger": "badge",
    "activist-radar": "badge",
}
PERSON_WIKI_PAGES = {
    "buffett": "Warren_Buffett",
    "pelosi": "Nancy_Pelosi",
    "jensen": "Jensen_Huang",
    "cathie": "Cathie_Wood",
    "soros": "George_Soros",
    "greene": "Marjorie_Taylor_Greene",
    "trump": "Donald_Trump",
    "ackman": "Bill_Ackman",
    "tepper": "David_Tepper",
    "gates": "Bill_Gates",
    "lilu": "Li_Lu",
    "duquesne": "Stanley_Druckenmiller",
    "burry": "Michael_Burry",
    "coatue": "Philippe_Laffont",
    "tiger": "Chase_Coleman_III",
}
PERSON_BADGE_LABELS = {
    "buffett": "WB",
    "pelosi": "NP",
    "jensen": "JH",
    "cathie": "CW",
    "duan": "DY",
    "soros": "GS",
    "greene": "MG",
    "trump": "DT",
    "ackman": "BA",
    "tepper": "DT",
    "gates": "BG",
    "lilu": "LL",
    "duquesne": "SD",
    "burry": "MB",
    "leopold": "LA",
    "coatue": "CL",
    "tiger": "TG",
    "activist-radar": "13D",
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


def person_badge_svg(person_id):
    label = PERSON_BADGE_LABELS.get(person_id, (person_id[:2] or "?").upper())
    safe_label = html.escape(label.upper())
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" role="img" aria-label="{safe_label} avatar">
<defs>
  <linearGradient id="g" x1="18" y1="12" x2="110" y2="116" gradientUnits="userSpaceOnUse">
    <stop stop-color="#fde68a"/>
    <stop offset=".55" stop-color="#34d399"/>
    <stop offset="1" stop-color="#2563eb"/>
  </linearGradient>
</defs>
<rect width="128" height="128" rx="64" fill="url(#g)"/>
<circle cx="64" cy="49" r="25" fill="#fff7ed" fill-opacity=".92"/>
<path d="M26 112c8-24 24-36 38-36s30 12 38 36" fill="#fff7ed" fill-opacity=".92"/>
<text x="64" y="76" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="25" font-weight="900" fill="#064e3b">{safe_label}</text>
</svg>"""
    return svg.encode("utf-8")


def wiki_person_thumbnail_url(person_id):
    page = PERSON_WIKI_PAGES.get(person_id)
    if not page:
        return ""
    try:
        data = http_json(
            f"https://en.wikipedia.org/api/rest_v1/page/summary/{quote(page, safe='')}",
            headers={
                "accept": "application/json",
                "user-agent": "Mozilla/5.0 Serenity-US-Stock-Desk/1.0",
            },
            ttl_seconds=LONG_CACHE_TTL_SECONDS,
        )
        return ((data.get("thumbnail") or {}).get("source") or (data.get("originalimage") or {}).get("source") or "").strip()
    except Exception:
        return ""


def normalize_symbol(value):
    symbol = "".join(ch for ch in value.upper().strip() if ch.isalnum() or ch in ".-=^")
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


def freshness_label_zh(value):
    ts = parse_date_to_ts(value)
    if not ts:
        return "时间待核验"
    days = max(0, int((time.time() - ts) / 86400))
    if days == 0:
        return "今天"
    if days <= 45:
        return f"{days}天前"
    months = max(1, days // 30)
    return f"{months}个月前"


def has_chinese(text):
    return bool(re.search(r"[\u4e00-\u9fff]", text or ""))


def needs_translation_to_zh(text):
    if not TRANSLATE_TO_ZH or not text:
        return False
    return bool(re.search(r"[A-Za-z]", text)) and not has_chinese(text)


def postprocess_zh_translation(text):
    value = html.unescape(text or "").strip()
    value = re.sub(r"\s+", " ", value)
    for src, dst in TRANSLATION_REPLACEMENTS:
        value = value.replace(src, dst)
    value = value.replace(" - ", " - ")
    return value


def local_translate_to_zh(text, symbol=""):
    value = clean_text(text, 520)
    filing = re.match(r"^([A-Z0-9.\-=]+)\s+([A-Z0-9\- ]+)\s+filed\s+(\d{4}-\d{2}-\d{2})$", value)
    if filing:
        return f"{filing.group(1)} 于 {filing.group(3)} 提交 {filing.group(2).strip()}"

    sec = re.match(
        r"^Official SEC filing for (.+?)\. Report date: ([^.]+)\. Primary doc: ([^.]+)\.$",
        value,
    )
    if sec:
        report_date = "未列出" if sec.group(2).strip().lower() == "not listed" else sec.group(2)
        return f"{sec.group(1)} 的官方 SEC 文件。报告期：{report_date}。主文件：{sec.group(3)}。"

    if value == "Yahoo Finance headline feed item.":
        return "雅虎财经标题流条目。"
    clean = re.sub(r"\s+-\s+[^-]{2,80}$", "", value)
    match = re.match(r"^(.+?) Awards (\$[\d.]+[MBK]?) (.+?) Order to (.+?) for (.+)$", clean, re.I)
    if match:
        return postprocess_zh_translation(f"{match.group(1)} 向 {match.group(4)} 授予 {match.group(2)} {match.group(3)}订单，用于 {match.group(5)}")
    match = re.match(r"^(.+?) Secures (\$[\d.]+[MBK]?) Order to Support (.+)$", clean, re.I)
    if match:
        return postprocess_zh_translation(f"{match.group(1)} 获得 {match.group(2)} 订单，用于支持 {match.group(3)}")
    match = re.match(r"^Supports Volume Production Through (\d{4}) For (.+)$", clean, re.I)
    if match:
        return postprocess_zh_translation(f"支持 {match.group(2)} 的量产延续至 {match.group(1)}")
    match = re.match(r"^(.+?) Says (.+?) Partnership Extends Beyond (.+?) to (.+)$", clean, re.I)
    if match:
        return postprocess_zh_translation(f"{match.group(1)} 称 {match.group(2)} 合作不止 {match.group(3)}，还延伸到 {match.group(4)}")
    return ""


def translate_text_to_zh(text, symbol=""):
    value = clean_text(text, 520)
    if not value:
        return ""
    local = local_translate_to_zh(value, symbol)
    if local:
        return local
    if not needs_translation_to_zh(value):
        return value

    cache_key = ("translate-zh", hashlib.sha256(value.encode("utf-8")).hexdigest())
    cached = cached_value(cache_key, LONG_CACHE_TTL_SECONDS * 7)
    if cached is not None:
        return cached

    try:
        url = MYMEMORY_TRANSLATE.format(text=quote(value[:480], safe=""))
        req = Request(url, headers={**DEFAULT_HEADERS, "accept": "application/json"})
        with urlopen(req, timeout=TRANSLATE_TIMEOUT_SECONDS) as res:
            payload = json.loads(res.read().decode("utf-8", errors="replace"))
        translated = ((payload.get("responseData") or {}).get("translatedText") or "").strip()
        if not translated or translated.lower() == value.lower():
            translated = value
        translated = postprocess_zh_translation(translated)
    except Exception:
        translated = value
    return store_cached_value(cache_key, translated)


def translate_many_to_zh(texts, symbol=""):
    unique = []
    seen = set()
    results = {}
    for text in texts:
        value = clean_text(text, 520)
        if not value or value in seen:
            continue
        seen.add(value)
        local = local_translate_to_zh(value, symbol)
        if local or not needs_translation_to_zh(value):
            results[value] = local or value
        else:
            unique.append(value)

    if unique:
        workers = max(1, min(TRANSLATE_MAX_WORKERS, len(unique)))
        with ThreadPoolExecutor(max_workers=workers) as executor:
            futures = {executor.submit(translate_text_to_zh, value, symbol): value for value in unique}
            for future in as_completed(futures):
                value = futures[future]
                try:
                    results[value] = future.result()
                except Exception:
                    results[value] = value
    return results


def source_label_zh(source):
    value = source or ""
    if " / " in value:
        prefix, outlet = value.split(" / ", 1)
        return f"{SOURCE_NAME_ZH.get(prefix, prefix)} / {OUTLET_NAME_ZH.get(outlet, outlet)}"
    return SOURCE_NAME_ZH.get(value, OUTLET_NAME_ZH.get(value, value))


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
            "kindLabel": "监管文件",
            "tierLabel": "强证据" if is_major else "跟踪项",
            "actionHint": "监管文件可信度最高，重点看 8-K/10-Q/10-K 的收入、风险和管理层表述。",
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
    filtered = 0
    for item in root.findall(".//item")[:limit]:
        title = clean_text(item.findtext("title"), 220)
        link = clean_text(item.findtext("link"), 500)
        description = clean_text(item.findtext("description"), 260)
        published = rss_date_to_iso(item.findtext("pubDate"))
        if not title or not link:
            continue
        if not title_directly_matches_company(title, symbol):
            filtered += 1
            continue
        if news_relevance_score(symbol, "yahoo_rss", title, description, "Yahoo Finance RSS") < 5:
            filtered += 1
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
            "kindLabel": "泛新闻",
            "tierLabel": "低权重",
            "actionHint": "泛新闻只当背景，先确认是否直接影响当前标的。",
            "affects": ["news_context"],
        })
    return items, {"name": "Yahoo Finance RSS", "status": "ok", "count": len(items), "detail": f"filtered low-value: {filtered}"}


def company_search_terms(symbol):
    company = COMPANY_NEWS_NAMES.get(symbol, symbol)
    chinese = COMPANY_CHINESE_NAMES.get(symbol, "")
    terms = [symbol, company]
    if chinese:
        terms.append(chinese)
    return [term for term in terms if term]


def text_matches_company(text, symbol):
    if not text:
        return False
    lower = text.lower()
    for term in company_search_terms(symbol):
        if not term:
            continue
        if term.isascii() and len(term) <= 5:
            pattern = rf"(?<![A-Z0-9]){re.escape(term.upper())}(?![A-Z0-9])"
            if re.search(pattern, text.upper()):
                return True
        elif term.lower() in lower:
                return True
    return False


def source_quality_score(source_name):
    source = (source_name or "").lower()
    if any(name in source for name in TRUSTED_NEWS_SOURCES):
        return 3
    if any(name in source for name in SPECIALIST_NEWS_SOURCES):
        return 2
    if any(name in source for name in NOISY_NEWS_SOURCES):
        return -3
    return 0


def title_directly_matches_company(title, symbol):
    return text_matches_company(title or "", symbol)


def broad_multi_stock_penalty(title, symbol):
    title_upper = (title or "").upper()
    title_lower = (title or "").lower()
    mentions = set()
    for ticker, company in COMPANY_NEWS_NAMES.items():
        if ticker == symbol:
            continue
        if len(ticker) <= 5 and re.search(rf"(?<![A-Z0-9]){re.escape(ticker)}(?![A-Z0-9])", title_upper):
            mentions.add(ticker)
        if company and company.lower() in title_lower:
            mentions.add(ticker)
    if len(mentions) >= 3:
        return 4
    if len(mentions) >= 2 and "," in (title or ""):
        return 2
    return 0


def pattern_count(patterns, text, cap=3):
    count = 0
    for pattern in patterns:
        if re.search(pattern, text, re.I):
            count += 1
            if count >= cap:
                break
    return count


def is_hard_low_value_news(text):
    return any(re.search(pattern, text or "", re.I) for pattern in HARD_LOW_VALUE_NEWS_PATTERNS)


def news_relevance_score(symbol, profile_id, title, summary, source_name):
    haystack = f"{title or ''} {summary or ''} {source_name or ''}"
    lower = haystack.lower()
    if is_hard_low_value_news(lower):
        return -99
    score = 0

    if title_directly_matches_company(title, symbol):
        score += 4
    elif text_matches_company(summary, symbol):
        score += 1

    score += source_quality_score(source_name)
    score += min(pattern_count(MATERIAL_NEWS_PATTERNS, lower), 3) * 2

    if any(term in lower for term in SUPPLY_CHAIN_NEWS_TERMS):
        score += 2
    if profile_id == "sector_specialists" and "supply_chain_signal" in news_affects(title, summary):
        score += 2
    if profile_id == "official_wires" and any(re.search(pattern, lower, re.I) for pattern in ECOSYSTEM_ONLY_PATTERNS):
        if not (title or "").lower().strip().startswith(COMPANY_NEWS_NAMES.get(symbol, symbol).lower()):
            score -= 5

    score -= pattern_count(LOW_VALUE_NEWS_PATTERNS, lower, cap=2) * 6
    score -= broad_multi_stock_penalty(title, symbol)
    return score


def fetch_press_release_rss(symbol, limit=8):
    items = []
    feed_status = []
    seen = set()
    filtered = 0

    for feed in DIRECT_WIRE_RSS_FEEDS:
        try:
            text = http_text(feed["url"], ttl_seconds=EVIDENCE_CACHE_TTL_SECONDS)
            root = ET.fromstring(text)
        except Exception as exc:
            feed_status.append(f"{feed['name']}:down:{str(exc)[:80]}")
            continue

        matched = 0
        for item in root.findall(".//item")[:80]:
            title = clean_text(item.findtext("title"), 220)
            link = clean_text(item.findtext("link"), 500)
            description = clean_text(item.findtext("description"), 280)
            published = rss_date_to_iso(item.findtext("pubDate"))
            haystack = f"{title} {description}"
            if not title or not link or not title_directly_matches_company(title, symbol):
                filtered += 1
                continue
            if news_relevance_score(symbol, "press_release_rss", title, description, feed["name"]) < 6:
                filtered += 1
                continue

            key = link or title
            if key in seen:
                continue
            seen.add(key)
            matched += 1
            items.append({
                "title": title,
                "summary": description or f"{feed['name']} company news release.",
                "source": feed["name"],
                "url": link,
                "date": published,
                "freshness": freshness_label(published),
                "strength": "Strong",
                "kind": "official_wire",
                "kindLabel": "官方新闻稿",
                "tierLabel": "强证据",
                "actionHint": "先读原文，确认是否公司本身公告、订单、财报或监管披露。",
                "affects": ["official_disclosure", "news_context"],
            })
            if len(items) >= limit:
                break
        feed_status.append(f"{feed['name']}:{matched}")
        if len(items) >= limit:
            break

    return items[:limit], {
        "name": "Press release RSS",
        "status": "ok" if feed_status else "unavailable",
        "count": len(items[:limit]),
        "detail": (f"{'; '.join(feed_status)}; filtered low-value: {filtered}")[:220],
    }


def base_google_query(symbol, days=7):
    company = COMPANY_NEWS_NAMES.get(symbol, symbol)
    if company != symbol:
        return f"{symbol} OR {company} stock when:{days}d"
    return f"{symbol} stock when:{days}d"


def google_news_queries(symbol):
    queries = list(NEWS_QUERY_OVERRIDES.get(symbol, []))
    queries.append(base_google_query(symbol, 14))

    unique = []
    seen = set()
    for query in queries:
        key = query.lower()
        if key in seen:
            continue
        seen.add(key)
        unique.append(query)
    return unique[:5]


def google_news_url(query_text, locale="en"):
    if locale == "zh":
        hl = "zh-CN"
        ceid = "US:zh-Hans"
    else:
        hl = "en-US"
        ceid = "US:en"
    return GOOGLE_NEWS_RSS.format(
        query=quote(query_text, safe=""),
        hl=hl,
        gl="US",
        ceid=quote(ceid, safe=":"),
    )


def news_affects(title, summary):
    text = f"{title} {summary}".lower()
    affects = ["news_context"]
    if any(term in text for term in SUPPLY_CHAIN_NEWS_TERMS):
        affects.insert(0, "supply_chain_signal")
    return affects


def google_news_profile(profile_id, symbol):
    company = COMPANY_NEWS_NAMES.get(symbol, symbol)
    chinese = COMPANY_CHINESE_NAMES.get(symbol, company)

    if profile_id == "official_wires":
        return {
            "name": "Official wires via Google",
            "kind": "official_wire",
            "kindLabel": "新闻稿聚合",
            "tierLabel": "需核验发行方",
            "strength": "Medium",
            "locale": "en",
            "requireCompanyMatch": True,
            "actionHint": "新闻稿聚合要看发行方是谁；不是公司本身公告时，只当产业线索。",
            "queries": [
                f"{company} OR {symbol} {OFFICIAL_WIRE_NEWS_CONTEXT} when:14d",
            ],
            "affects": ["press_wire_context", "news_context"],
        }

    if profile_id == "fast_market":
        return {
            "name": "Fast market media",
            "kind": "fast_media",
            "kindLabel": "快讯媒体",
            "tierLabel": "快线索",
            "strength": "Medium",
            "locale": "en",
            "requireCompanyMatch": True,
            "actionHint": "快讯适合看催化和情绪，不要单凭标题追涨。",
            "queries": [
                base_google_query(symbol, 7),
                f"{company} stock Reuters OR CNBC OR Bloomberg OR MarketWatch OR Benzinga when:7d",
            ],
            "affects": ["news_context", "market_reaction"],
        }

    if profile_id == "sector_specialists":
        sector_queries = google_news_queries(symbol)
        if symbol not in AI_SUPPLY_CHAIN_SYMBOLS:
            sector_queries = [f"{base_google_query(symbol, 14)} earnings guidance analyst"]
        return {
            "name": "Sector specialist news",
            "kind": "supply_chain",
            "kindLabel": "半导体供应链" if symbol in AI_SUPPLY_CHAIN_SYMBOLS else "行业专项",
            "tierLabel": "产业线索",
            "strength": "Medium",
            "locale": "en",
            "requireCompanyMatch": True,
            "actionHint": "供应链新闻先看客户、金额、产能、时间点，再回到价格位置。",
            "queries": sector_queries[:3],
            "affects": ["supply_chain_signal", "news_context"] if symbol in AI_SUPPLY_CHAIN_SYMBOLS else ["news_context"],
        }

    return {
        "name": "China market lens",
        "kind": "china_lens",
        "kindLabel": "中文视角",
        "tierLabel": "中文线索",
        "strength": "Weak",
        "locale": "zh",
        "requireCompanyMatch": True,
        "actionHint": "中文源更适合看国内情绪和转述，结论要回到英文原文核验。",
        "queries": [
            f"{chinese} {symbol} 美股 when:14d",
            f"{chinese} {symbol} 财报 股价 {CHINA_MARKET_NEWS_CONTEXT} when:14d",
        ],
        "affects": ["china_context", "news_context"],
    }


def fetch_google_news_profile(symbol, profile_id, limit=10):
    profile = google_news_profile(profile_id, symbol)
    profile.update({
        "official_wires": {"requireTitleMatch": True, "minRelevance": 8},
        "fast_market": {"requireTitleMatch": True, "minRelevance": 6},
        "sector_specialists": {"requireTitleMatch": True, "minRelevance": 6},
        "china_lens": {"requireTitleMatch": True, "minRelevance": 5},
    }.get(profile_id, {}))
    queries = profile["queries"]
    items = []
    seen = set()
    parsed_feeds = 0
    errors = []
    filtered = 0

    for query_text in queries:
        try:
            text = http_text(google_news_url(query_text, profile["locale"]), ttl_seconds=EVIDENCE_CACHE_TTL_SECONDS)
            root = ET.fromstring(text)
            parsed_feeds += 1
        except Exception as exc:
            errors.append(str(exc)[:120])
            continue

        for item in root.findall(".//item")[:10]:
            title = clean_text(item.findtext("title"), 220)
            link = clean_text(item.findtext("link"), 500)
            description = clean_text(item.findtext("description"), 260)
            source_name = clean_text(item.findtext("source"), 80) or "Google News"
            published = rss_date_to_iso(item.findtext("pubDate"))
            if not title or not link:
                continue
            haystack = f"{title} {description} {source_name}"
            if profile.get("requireCompanyMatch") and not text_matches_company(haystack, symbol):
                filtered += 1
                continue
            if profile.get("requireTitleMatch") and not title_directly_matches_company(title, symbol):
                filtered += 1
                continue
            if "press release distribution" in haystack.lower():
                filtered += 1
                continue
            relevance_score = news_relevance_score(symbol, profile_id, title, description, source_name)
            if relevance_score < profile.get("minRelevance", 0):
                filtered += 1
                continue
            if source_quality_score(source_name) < 0 and relevance_score < 9:
                filtered += 1
                continue

            title_key = re.sub(r"\W+", "", title.lower())[:180]
            if title_key in seen or link in seen:
                continue
            seen.add(title_key)
            seen.add(link)

            summary = description or f"Google News matched query: {query_text}."
            affects = list(dict.fromkeys(profile["affects"] + news_affects(title, summary)))
            items.append({
                "title": title,
                "summary": summary,
                "source": f"{profile['name']} / {source_name}",
                "url": link,
                "date": published,
                "freshness": freshness_label(published),
                "strength": profile["strength"],
                "kind": profile["kind"],
                "kindLabel": profile["kindLabel"],
                "tierLabel": profile["tierLabel"],
                "actionHint": profile.get("actionHint", ""),
                "affects": affects,
                "query": query_text,
                "relevanceScore": relevance_score,
            })
            if len(items) >= limit:
                break
        if len(items) >= limit:
            break

    status = "ok" if parsed_feeds else "unavailable"
    detail = f"{len(queries)} queries: " + "; ".join(queries[:3])
    if errors and not parsed_feeds:
        detail = "; ".join(errors[:2])
    elif errors:
        detail += f"; partial errors: {len(errors)}"
    if filtered:
        detail += f"; filtered low-value: {filtered}"
    return items[:limit], {"name": profile["name"], "status": status, "count": len(items[:limit]), "detail": detail[:220]}


def fetch_google_official_wires(symbol):
    return fetch_google_news_profile(symbol, "official_wires", limit=8)


def fetch_google_fast_market(symbol):
    return fetch_google_news_profile(symbol, "fast_market", limit=8)


def fetch_google_sector_specialists(symbol):
    return fetch_google_news_profile(symbol, "sector_specialists", limit=14)


def fetch_google_china_lens(symbol):
    return fetch_google_news_profile(symbol, "china_lens", limit=6)


def diversified_evidence_items(sorted_items, limit=40):
    selected = []
    seen = set()

    def item_key(item):
        return item.get("url") or item.get("title") or id(item)

    def add_matching(predicate, max_count):
        added = 0
        for item in sorted_items:
            key = item_key(item)
            if key in seen or not predicate(item):
                continue
            selected.append(item)
            seen.add(key)
            added += 1
            if added >= max_count or len(selected) >= limit:
                break

    add_matching(lambda item: item.get("strength") == "Strong" and item.get("kind") in {"official", "filing"}, 3)
    add_matching(lambda item: item.get("kind") == "official_wire", 2)
    add_matching(lambda item: item.get("kind") == "supply_chain", 8)
    add_matching(lambda item: item.get("kind") == "fast_media", 4)
    add_matching(lambda item: item.get("kind") == "china_lens", 2)
    add_matching(lambda item: item.get("kind") == "media", 3)
    add_matching(lambda item: True, limit - len(selected))
    return selected[:limit]


def localize_evidence_payload_items(items, statuses, symbol):
    texts = []
    for item in items:
        title = item.get("title") or ""
        summary = item.get("summary") or ""
        if title:
            texts.append(title)
        if summary and summary != title:
            texts.append(summary)
    translations = translate_many_to_zh(texts, symbol)

    for item in items:
        title = clean_text(item.get("title") or "", 520)
        summary = clean_text(item.get("summary") or "", 520)
        item["titleZh"] = translations.get(title) or translate_text_to_zh(title, symbol)
        item["summaryZh"] = translations.get(summary) or translate_text_to_zh(summary, symbol)
        item["sourceZh"] = source_label_zh(item.get("source"))
        item["strengthLabel"] = STRENGTH_LABEL_ZH.get(item.get("strength"), item.get("strength") or "待核验")
        item["freshnessZh"] = freshness_label_zh(item.get("date"))
        if item.get("kind") == "official":
            item.setdefault("kindLabel", "官方公告")
            item.setdefault("tierLabel", "强证据")
        elif item.get("kind") == "filing":
            item.setdefault("kindLabel", "监管文件")
            item.setdefault("tierLabel", "强证据" if item.get("strength") == "Strong" else "跟踪项")

    for status in statuses:
        status["nameZh"] = SOURCE_NAME_ZH.get(status.get("name"), status.get("name") or "")
        status["statusZh"] = SOURCE_STATUS_ZH.get(status.get("status"), status.get("status") or "未知")


def evidence_payload(symbol):
    symbol = resolve_symbol(symbol)
    key = ("evidence", symbol)
    cached = cached_value(key, EVIDENCE_CACHE_TTL_SECONDS)
    if cached is not None:
        return cached

    all_items = []
    statuses = []
    source_fetchers = [
        fetch_official_sources,
        fetch_sec_filings,
        fetch_press_release_rss,
        fetch_google_official_wires,
        fetch_google_sector_specialists,
        fetch_google_fast_market,
        fetch_google_china_lens,
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
        item["sortSignal"] = 1 if "supply_chain_signal" in (item.get("affects") or []) else 0
        item["sortRelevance"] = item.get("relevanceScore") or 0
        item["sortKind"] = {
            "official": 5,
            "filing": 5,
            "official_wire": 4,
            "supply_chain": 3,
            "fast_media": 2,
            "china_lens": 1,
            "media": 1,
        }.get(item.get("kind"), 0)
        deduped.append(item)
    deduped.sort(key=lambda item: (
        item.get("sortStrength") or 0,
        item.get("sortSignal") or 0,
        item.get("sortKind") or 0,
        item.get("sortRelevance") or 0,
        item.get("sortTs") or 0,
    ), reverse=True)
    display_items = diversified_evidence_items(deduped)
    for item in display_items:
        item.pop("sortTs", None)
        item.pop("sortStrength", None)
        item.pop("sortSignal", None)
        item.pop("sortRelevance", None)
        item.pop("sortKind", None)

    localize_evidence_payload_items(display_items, statuses, symbol)

    counts = {"Strong": 0, "Medium": 0, "Weak": 0, "Needs checking": 0}
    for item in deduped:
        strength = item.get("strength") or "Needs checking"
        counts[strength] = counts.get(strength, 0) + 1

    payload = {
        "symbol": symbol,
        "fetchedAt": now_iso(),
        "cacheTtlSeconds": EVIDENCE_CACHE_TTL_SECONDS,
        "items": display_items,
        "counts": counts,
        "sources": statuses,
    }
    return store_cached_value(key, payload)


def safe_int(value, default=0):
    try:
        return int(float(value))
    except (TypeError, ValueError):
        return default


def reddit_trending_payload(force=False):
    key = ("reddit-trending",)
    if not force:
        cached = cached_value(key, REDDIT_TRENDING_TTL_SECONDS)
        if cached is not None:
            return cached

    raw = json.loads(http_text(
        MEIGUHULI_CACHE,
        ttl_seconds=0 if force else REDDIT_TRENDING_TTL_SECONDS,
    ))
    source_rows = raw.get("results") if isinstance(raw, dict) else []
    items = []
    for raw_item in source_rows[:250]:
        ticker = normalize_symbol(html.unescape(str(raw_item.get("ticker") or "")))
        if not ticker:
            continue
        rank = safe_int(raw_item.get("rank"), len(items) + 1)
        mentions = safe_int(raw_item.get("mentions"))
        previous_mentions = safe_int(raw_item.get("mentions_24h_ago"))
        rank_24h_ago = safe_int(raw_item.get("rank_24h_ago"), 0)
        mention_change_pct = None
        if previous_mentions > 0:
            mention_change_pct = round((mentions - previous_mentions) / previous_mentions * 100, 2)
        items.append({
            "rank": rank,
            "ticker": ticker,
            "name": clean_text(raw_item.get("name") or ticker, 180),
            "mentions": mentions,
            "upvotes": safe_int(raw_item.get("upvotes")),
            "rank24hAgo": rank_24h_ago or None,
            "rankChange": (rank_24h_ago - rank) if rank_24h_ago else None,
            "mentions24hAgo": previous_mentions or None,
            "mentionChangePct": mention_change_pct,
        })

    payload = {
        "fetchedAt": now_iso(),
        "cacheTtlSeconds": REDDIT_TRENDING_TTL_SECONDS,
        "source": {
            "name": "美股狐狸 Reddit 热度缓存",
            "url": "https://meiguhuli.com/",
            "api": MEIGUHULI_CACHE,
            "status": "ok",
            "count": len(items),
            "detail": "过去 24 小时 Reddit 股票提及量，约 5 分钟更新一次。只作为社区情绪线索。",
        },
        "items": items,
    }
    return store_cached_value(key, payload)


def parse_trade_amount(amount):
    text = clean_text(amount or "", 64)
    values = []
    for raw in re.findall(r"[\d,]+", text):
        try:
            values.append(int(raw.replace(",", "")))
        except ValueError:
            continue
    if not values:
        return {"text": text or "--", "min": None, "max": None, "mid": None}
    low = min(values)
    high = max(values)
    return {
        "text": text,
        "min": low,
        "max": high,
        "mid": int((low + high) / 2),
    }


def parse_iso_date(value):
    try:
        return datetime.strptime((value or "")[:10], "%Y-%m-%d").date()
    except (TypeError, ValueError):
        return None


def political_trade_type_zh(trade_type):
    value = (trade_type or "").strip().lower()
    if "purchase" in value or "buy" in value:
        return "买入"
    if "sale" in value or "sell" in value:
        return "卖出"
    return "披露"


def political_trade_tone(trade_type, late_filing=False):
    value = (trade_type or "").strip().lower()
    if "purchase" in value or "buy" in value:
        return "open" if not late_filing else "waiting"
    if "sale" in value or "sell" in value:
        return "closed"
    return "waiting"


def political_trade_payload(symbol="", force=False):
    normalized_symbol = resolve_symbol(symbol) if symbol else ""
    key = ("political-trades", normalized_symbol or "all")
    if not force:
        cached = cached_value(key, POLITICAL_TRADES_TTL_SECONDS)
        if cached is not None:
            return cached

    dataset = http_json(
        OPEN_CABINET_DATASET,
        headers={"accept": "application/json", "user-agent": DEFAULT_HEADERS["user-agent"]},
        ttl_seconds=0 if force else POLITICAL_TRADES_TTL_SECONDS,
    )
    officials = dataset.get("officials") or []
    focus_symbols = {
        "AMD", "AMZN", "AVGO", "CAT", "CRWV", "DELL", "GOOG", "GOOGL", "INTC",
        "META", "MSFT", "MU", "NVDA", "ORCL", "PLTR", "QCOM", "SNDK", "TSLA", "TSM",
    }
    if normalized_symbol:
        focus_symbols.add(normalized_symbol)

    items = []
    symbol_counts = {}
    official_hits = {}
    for official in officials:
        slug = clean_text(official.get("slug") or "", 96)
        official_url = f"{OPEN_CABINET_SITE}/officials/{quote(slug, safe='')}" if slug else OPEN_CABINET_SITE
        filing_date = clean_text(official.get("mostRecentFilingDate") or "", 24)
        for tx in official.get("transactions") or []:
            ticker = normalize_symbol(tx.get("ticker") or "")
            if not ticker:
                continue
            tx_date = parse_iso_date(tx.get("date"))
            age_days = (date.today() - tx_date).days if tx_date else None
            type_text = clean_text(tx.get("type") or "", 64)
            amount = parse_trade_amount(tx.get("amount"))
            late = bool(tx.get("lateFilingFlag"))
            exact_match = bool(normalized_symbol and ticker == normalized_symbol)
            in_focus = ticker in focus_symbols
            symbol_counts[ticker] = symbol_counts.get(ticker, 0) + 1
            if ticker not in official_hits:
                official_hits[ticker] = set()
            official_hits[ticker].add(slug or official.get("name") or ticker)
            if not exact_match and not in_focus:
                continue
            score = 0
            if exact_match:
                score += 60
            if "Purchase" in type_text:
                score += 16
            if amount["mid"]:
                score += min(18, amount["mid"] / 100000)
            if age_days is not None:
                score += max(0, 18 - min(age_days, 180) / 10)
            if late:
                score += 5
            item = {
                "symbol": ticker,
                "description": clean_text(tx.get("description") or ticker, 160),
                "type": type_text,
                "typeZh": political_trade_type_zh(type_text),
                "tone": political_trade_tone(type_text, late),
                "date": clean_text(tx.get("date") or "", 24),
                "ageDays": age_days,
                "amount": amount["text"],
                "amountMin": amount["min"],
                "amountMax": amount["max"],
                "amountMid": amount["mid"],
                "lateFilingFlag": late,
                "official": clean_text(official.get("name") or "", 120),
                "officialTitle": clean_text(official.get("title") or "", 160),
                "agency": clean_text(official.get("agency") or "", 160),
                "level": clean_text(official.get("level") or "", 80),
                "filingDate": filing_date,
                "officialUrl": official_url,
                "score": round(score, 2),
                "exact": exact_match,
            }
            items.append(item)

    items.sort(key=lambda item: (
        item.get("exact", False),
        item.get("score") or 0,
        item.get("date") or "",
    ), reverse=True)
    hot_symbols = sorted(
        [
            {
                "symbol": ticker,
                "count": count,
                "officialCount": len(official_hits.get(ticker, [])),
            }
            for ticker, count in symbol_counts.items()
        ],
        key=lambda row: (row["count"], row["officialCount"]),
        reverse=True,
    )[:12]
    visible_items = items[:18]
    active_items = [item for item in items if normalized_symbol and item["symbol"] == normalized_symbol][:8]
    payload = {
        "fetchedAt": now_iso(),
        "cacheTtlSeconds": POLITICAL_TRADES_TTL_SECONDS,
        "source": {
            "name": "Open Cabinet",
            "status": "ok",
            "count": len(items),
            "transactionCount": safe_int(dataset.get("transactionCount")),
            "officialCount": safe_int(dataset.get("officialCount")),
            "exportedAt": clean_text(dataset.get("exportedAt") or "", 40),
            "url": OPEN_CABINET_SITE,
            "api": OPEN_CABINET_DATASET,
            "detail": "OGE Form 278-T 财务披露整理数据，金额为披露区间，不是实时成交。"
        },
        "activeSymbol": normalized_symbol,
        "activeItems": active_items,
        "items": visible_items,
        "hotSymbols": hot_symbols,
        "links": [
            {"label": "Open Cabinet", "url": OPEN_CABINET_SITE},
            {"label": "OGE 原始披露", "url": "https://www.oge.gov/web/oge.nsf/Officials%20Individual%20Disclosures%20Search%20Collection?OpenForm"},
            {"label": "ProPublica 补充搜索", "url": "https://projects.propublica.org/trump-team-financial-disclosures/"},
        ],
    }
    return store_cached_value(key, payload)


def safe_float(value, default=None):
    try:
        if value in {None, "", "null"}:
            return default
        return float(value)
    except (TypeError, ValueError):
        return default


def congress_trade_type_zh(value):
    text = (value or "").lower()
    if "purchase" in text or text == "buy" or " buy" in text:
        return "买入"
    if "sale" in text or text == "sell" or " sell" in text:
        return "卖出"
    if "exchange" in text:
        return "换仓"
    return "披露"


def congress_trade_tone(value):
    text = (value or "").lower()
    if "purchase" in text or text == "buy" or " buy" in text:
        return "open"
    if "sale" in text or text == "sell" or " sell" in text:
        return "closed"
    return "waiting"


def normalize_symbols_param(value):
    if not value:
        return []
    parts = re.split(r"[,|\s]+", value)
    symbols = []
    for part in parts:
        symbol = resolve_symbol(part)
        if symbol and symbol not in symbols:
            symbols.append(symbol)
    return symbols[:80]


def congress_source_headers():
    return {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,application/json;q=0.8,*/*;q=0.7",
        "accept-language": "en-US,en;q=0.9",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    }


def congress_amount_text(value):
    text = clean_text(value, 90)
    text = text.replace("$$", "$").replace("$ $", "$")
    text = text.replace("–", "-").replace("—", "-").replace(" 每 ", "-").replace("每", "-")
    text = re.sub(r"\s*-\s*", "-", text)
    return text


def first_anchor_text(fragment, limit=120):
    match = re.search(r"<a\b[^>]*>(.*?)</a>", fragment or "", re.S)
    return clean_text(match.group(1) if match else fragment, limit)


def congressstock_house_party(fragment):
    text = clean_text(re.sub(r".*?</a>", "", fragment or "", flags=re.S), 80)
    lower = text.lower()
    house = "House" if "house" in lower else "Senate" if "senate" in lower else "Congress"
    party = ""
    prefix = text.split("·", 1)[0].strip()
    if prefix and prefix.lower() not in {"unknown", "n/a", "none"}:
        party = prefix[:8]
    return house, party


def congressstock_rows_from_html(text, symbol_hint="", limit=80):
    rows = []
    symbol_hint = normalize_symbol(symbol_hint or "")
    for tr in re.findall(r'<tr class="hover:bg-secondary/30 transition-colors">(.*?)</tr>', text or "", re.S):
        cells = re.findall(r"<td\b[^>]*>(.*?)</td>", tr, re.S)
        if symbol_hint and len(cells) >= 5:
            date_text = clean_text(cells[0], 24)
            representative = first_anchor_text(cells[1])
            transaction = clean_text(cells[2], 40)
            amount = congress_amount_text(cells[3])
            security = clean_text(cells[4], 40)
            rows.append({
                "representative": representative,
                "bioGuideId": "",
                "party": "",
                "house": "Congress",
                "reportDate": "",
                "transactionDate": date_text,
                "reportLagDays": None,
                "symbol": symbol_hint,
                "transaction": transaction,
                "transactionZh": congress_trade_type_zh(transaction),
                "range": amount,
                "amount": None,
                "description": symbol_hint,
                "priceChange": None,
                "spyChange": None,
                "excessReturn": None,
                "lastModified": "",
                "tone": congress_trade_tone(transaction),
                "focus": True,
                "sourceUrl": CONGRESSSTOCK_STOCK.format(symbol=quote(symbol_hint, safe="")),
                "security": security,
            })
        elif len(cells) >= 7:
            date_text = clean_text(cells[0], 24)
            representative = first_anchor_text(cells[1])
            house, party = congressstock_house_party(cells[1])
            symbol_match = re.search(r'href="/stocks/([^"]+)"', cells[2], re.S)
            ticker = normalize_symbol(symbol_match.group(1) if symbol_match else "")
            if not ticker:
                continue
            description_match = re.search(r"</a>\s*(.*)", cells[2], re.S)
            description = clean_text(description_match.group(1) if description_match else ticker, 160)
            transaction = clean_text(cells[3], 40)
            owner = clean_text(cells[4], 40)
            amount = congress_amount_text(cells[5])
            security = clean_text(cells[6], 40)
            rows.append({
                "representative": representative,
                "bioGuideId": "",
                "party": party,
                "house": house,
                "reportDate": "",
                "transactionDate": date_text,
                "reportLagDays": None,
                "symbol": ticker,
                "transaction": transaction,
                "transactionZh": congress_trade_type_zh(transaction),
                "range": amount,
                "amount": None,
                "description": description or ticker,
                "priceChange": None,
                "spyChange": None,
                "excessReturn": None,
                "lastModified": "",
                "tone": congress_trade_tone(transaction),
                "focus": False,
                "sourceUrl": CONGRESSSTOCK_TRADES,
                "owner": owner,
                "security": security,
            })
        if len(rows) >= limit:
            break
    return rows


def congressstock_items_for_focus(focus, force=False):
    ttl = 0 if force else CONGRESS_TRADES_TTL_SECONDS
    headers = congress_source_headers()
    items = []
    errors = []

    try:
        html_text = http_text(CONGRESSSTOCK_TRADES, headers=headers, ttl_seconds=ttl)
        items.extend(congressstock_rows_from_html(html_text, limit=90))
    except Exception as exc:
        errors.append(f"recent: {str(exc)[:90]}")

    focus_symbols = sorted(symbol for symbol in focus if symbol and symbol not in MONITOR_TICKER_BLACKLIST)[:18]

    def fetch_symbol(symbol):
        url = CONGRESSSTOCK_STOCK.format(symbol=quote(symbol, safe=""))
        html_text = http_text(url, headers=headers, ttl_seconds=ttl)
        return congressstock_rows_from_html(html_text, symbol_hint=symbol, limit=14)

    if focus_symbols:
        with ThreadPoolExecutor(max_workers=min(6, len(focus_symbols))) as executor:
            futures = {executor.submit(fetch_symbol, symbol): symbol for symbol in focus_symbols}
            for future in as_completed(futures):
                symbol = futures[future]
                try:
                    items.extend(future.result())
                except Exception as exc:
                    errors.append(f"{symbol}: {str(exc)[:70]}")

    detail = "CongressStock 可抓取来源；披露来自 STOCK Act PTR，通常晚于真实交易。"
    if errors:
        detail += f" 部分股票页未取到 {len(errors)} 个。"
    return items, {
        "name": "CongressStock",
        "status": "ok" if items else "unavailable",
        "count": len(items),
        "url": CONGRESSSTOCK_TRADES,
        "api": "",
        "detail": detail,
    }


def congress_trade_payload(symbols=None, force=False):
    symbols = symbols or []
    focus = set(resolve_symbol(symbol) for symbol in symbols if symbol)
    key = ("congress-trades", tuple(sorted(focus)))
    if not force:
        cached = cached_value(key, CONGRESS_TRADES_TTL_SECONDS)
        if cached is not None:
            return cached

    items = []
    seen = set()
    source_info = {
        "name": "Quiver Quant Congress Trading",
        "status": "ok",
        "count": 0,
        "url": "https://quiverquant.com/congresstrading",
        "api": QUIVER_CONGRESS_TRADING,
        "detail": "STOCK Act 披露数据，交易后最多可延迟约 45 天披露，金额为区间。",
    }
    quiver_error = ""

    try:
        raw_rows = http_json(
            QUIVER_CONGRESS_TRADING,
            headers={
                "accept": "application/json,text/plain,*/*",
                "accept-language": "en-US,en;q=0.9",
                "referer": "https://quiverquant.com/",
                "user-agent": congress_source_headers()["user-agent"],
            },
            ttl_seconds=0 if force else CONGRESS_TRADES_TTL_SECONDS,
        )
        if not isinstance(raw_rows, list):
            raw_rows = []

        for row in raw_rows:
            if not isinstance(row, dict):
                continue
            ticker = normalize_symbol(row.get("Ticker") or "")
            ticker_type = clean_text(row.get("TickerType") or "", 32).lower()
            if not ticker or ticker in MONITOR_TICKER_BLACKLIST:
                continue
            if ticker_type and ticker_type not in {"st", "stock"}:
                continue
            representative = clean_text(row.get("Representative") or "", 120)
            transaction = clean_text(row.get("Transaction") or "", 80)
            tx_date = clean_text(row.get("TransactionDate") or "", 24)
            report_date = clean_text(row.get("ReportDate") or "", 24)
            key_row = (representative, ticker, transaction, tx_date, report_date, clean_text(row.get("Range") or "", 80))
            if key_row in seen:
                continue
            seen.add(key_row)
            tx_dt = parse_iso_date(tx_date)
            report_dt = parse_iso_date(report_date)
            report_lag = (report_dt - tx_dt).days if tx_dt and report_dt else None
            items.append({
                "representative": representative,
                "bioGuideId": clean_text(row.get("BioGuideID") or "", 24),
                "party": clean_text(row.get("Party") or "", 8),
                "house": clean_text(row.get("House") or "", 32),
                "reportDate": report_date,
                "transactionDate": tx_date,
                "reportLagDays": report_lag,
                "symbol": ticker,
                "transaction": transaction,
                "transactionZh": congress_trade_type_zh(transaction),
                "range": congress_amount_text(row.get("Range") or ""),
                "amount": safe_float(row.get("Amount")),
                "description": clean_text(row.get("Description") or "", 160),
                "priceChange": safe_float(row.get("PriceChange")),
                "spyChange": safe_float(row.get("SPYChange")),
                "excessReturn": safe_float(row.get("ExcessReturn")),
                "lastModified": clean_text(row.get("last_modified") or "", 24),
                "tone": congress_trade_tone(transaction),
                "focus": ticker in focus,
            })
    except Exception as exc:
        quiver_error = str(exc)[:120]

    if not items:
        items, source_info = congressstock_items_for_focus(focus, force=force)
        if quiver_error:
            source_info["detail"] += f" Quiver 当前未返回：{quiver_error}。"

    deduped = []
    seen = set()
    for item in items:
        ticker = normalize_symbol(item.get("symbol") or "")
        if not ticker or ticker in MONITOR_TICKER_BLACKLIST:
            continue
        item["symbol"] = ticker
        item["focus"] = bool(item.get("focus")) or ticker in focus
        key_row = (
            item.get("representative") or "",
            ticker,
            item.get("transaction") or item.get("transactionZh") or "",
            item.get("transactionDate") or "",
            item.get("reportDate") or "",
            item.get("range") or "",
        )
        if key_row in seen:
            continue
        seen.add(key_row)
        deduped.append(item)
    items = deduped
    source_info["count"] = len(items)
    if not items:
        source_info["status"] = "unavailable"

    items.sort(key=lambda item: (
        item.get("reportDate") or "",
        item.get("transactionDate") or "",
        item.get("lastModified") or "",
    ), reverse=True)

    symbol_stats = {}
    for item in items:
        stat = symbol_stats.setdefault(item["symbol"], {
            "symbol": item["symbol"],
            "count": 0,
            "buy": 0,
            "sell": 0,
            "latestReportDate": "",
            "latestTransactionDate": "",
            "representatives": set(),
        })
        stat["count"] += 1
        if item["transactionZh"] == "买入":
            stat["buy"] += 1
        elif item["transactionZh"] == "卖出":
            stat["sell"] += 1
        if item["reportDate"] > stat["latestReportDate"]:
            stat["latestReportDate"] = item["reportDate"]
        if item["transactionDate"] > stat["latestTransactionDate"]:
            stat["latestTransactionDate"] = item["transactionDate"]
        if item["representative"]:
            stat["representatives"].add(item["representative"])

    hot_symbols = sorted(symbol_stats.values(), key=lambda item: (
        item["count"],
        item["buy"] - item["sell"],
        item["latestReportDate"],
    ), reverse=True)[:15]
    for item in hot_symbols:
        item["representativeCount"] = len(item.pop("representatives", set()))

    focus_items = [item for item in items if item["focus"]][:24]
    purchase_items = [item for item in items if item["transactionZh"] == "买入"][:24]
    payload = {
        "fetchedAt": now_iso(),
        "cacheTtlSeconds": CONGRESS_TRADES_TTL_SECONDS,
        "source": source_info,
        "focusSymbols": sorted(focus),
        "focusItems": focus_items,
        "recentItems": items[:40],
        "purchaseItems": purchase_items,
        "hotSymbols": hot_symbols,
        "links": [
            {"label": "Quiver Quant", "url": "https://quiverquant.com/congresstrading"},
            {"label": "Capitol Trades", "url": "https://www.capitoltrades.com/trades"},
            {"label": "Unusual Whales", "url": "https://unusualwhales.com/politics"},
            {"label": "CongressStock", "url": "https://www.congressstock.com/trades"},
        ],
    }
    return store_cached_value(key, payload)


def fred_api_key():
    for name in ("FRED_API_KEY", "SERENITY_FRED_API_KEY"):
        value = os.environ.get(name, "").strip()
        if value:
            return value
    return ""


def format_macro_value(value, precision=2, unit=""):
    if value is None:
        return "--"
    if unit == "%":
        return f"{value:.{precision}f}%"
    if unit == "pct":
        return f"{value:.{precision}f}pct"
    return f"{value:.{precision}f}"


def parse_fred_observations(payload, limit=18):
    values = []
    for row in (payload.get("observations") or [])[:limit]:
        raw = row.get("value")
        if raw in {None, "", "."}:
            continue
        try:
            value = float(raw)
        except (TypeError, ValueError):
            continue
        values.append({"date": row.get("date"), "value": value})
    return values


def macro_tone(series_id, value, delta):
    if value is None:
        return "waiting"
    if series_id == "DGS10":
        if value >= 4.75 or (delta or 0) >= 0.18:
            return "closed"
        if value <= 4.15:
            return "open"
    if series_id == "T10Y2Y":
        if value < -0.55:
            return "waiting"
        if value > 0.2:
            return "open"
    if series_id == "BAMLH0A0HYM2":
        if value >= 4.8 or (delta or 0) >= 0.35:
            return "closed"
        if value <= 3.6:
            return "open"
    if series_id == "UNRATE":
        if value >= 4.5 or (delta or 0) >= 0.2:
            return "waiting"
    if series_id == "CPIAUCSL":
        if (delta or 0) >= 0.8:
            return "waiting"
    return "neutral"


def fred_macro_verdict(items):
    item_by_id = {item["id"]: item for item in items}
    ten_year = item_by_id.get("DGS10", {}).get("value")
    curve = item_by_id.get("T10Y2Y", {}).get("value")
    credit = item_by_id.get("BAMLH0A0HYM2", {}).get("value")
    if ten_year is None and curve is None and credit is None:
        return {"label": "等待 FRED", "tone": "waiting", "note": "配置 FRED_API_KEY 后读取官方宏观序列。"}
    if (ten_year is not None and ten_year >= 4.75) or (credit is not None and credit >= 4.8):
        return {"label": "宏观逆风", "tone": "closed", "note": "长端利率或信用利差偏高，成长股估值要更保守。"}
    if curve is not None and curve < -0.55:
        return {"label": "曲线倒挂", "tone": "waiting", "note": "收益率曲线仍偏紧，先降低追涨冲动。"}
    if (ten_year is not None and ten_year <= 4.15) and (credit is None or credit <= 3.8):
        return {"label": "宏观顺风", "tone": "open", "note": "利率和信用条件相对友好，适合重点看强证据标的。"}
    return {"label": "宏观中性", "tone": "waiting", "note": "宏观没有给出强方向，优先按个股证据排序。"}


def fred_macro_payload(force=False):
    key = ("fred-macro",)
    if not force:
        cached = cached_value(key, FRED_CACHE_TTL_SECONDS)
        if cached is not None:
            return cached

    api_key = fred_api_key()
    if not api_key:
        payload = {
            "fetchedAt": now_iso(),
            "cacheTtlSeconds": 0,
            "source": {
                "name": "FRED",
                "status": "needs_key",
                "count": 0,
                "detail": "等待 FRED_API_KEY 环境变量。",
                "url": "https://fred.stlouisfed.org/docs/api/fred/",
            },
            "verdict": {"label": "等待 FRED", "tone": "waiting", "note": "配置 FRED_API_KEY 后接入官方宏观序列。"},
            "items": [],
        }
        return store_cached_value(key, payload)

    items = []
    errors = []
    for series in FRED_MACRO_SERIES:
        try:
            url = FRED_OBSERVATIONS.format(
                series_id=quote(series["id"], safe=""),
                api_key=quote(api_key, safe=""),
                limit=18,
            )
            data = http_json(url, headers={"accept": "application/json", "user-agent": DEFAULT_HEADERS["user-agent"]}, ttl_seconds=0 if force else FRED_CACHE_TTL_SECONDS)
            values = parse_fred_observations(data)
            latest = values[0] if values else {}
            previous = values[1] if len(values) > 1 else {}
            value = latest.get("value")
            prev_value = previous.get("value")
            delta = value - prev_value if value is not None and prev_value is not None else None
            precision = series.get("precision", 2)
            unit = series.get("unit", "")
            items.append({
                "id": series["id"],
                "label": series["label"],
                "note": series.get("note", ""),
                "date": latest.get("date"),
                "value": value,
                "valueText": format_macro_value(value, precision, unit),
                "previous": prev_value,
                "delta": delta,
                "deltaText": ("+" if delta is not None and delta >= 0 else "") + format_macro_value(delta, precision, "pct") if delta is not None else "--",
                "tone": macro_tone(series["id"], value, delta),
            })
        except Exception as exc:
            errors.append(f"{series['id']}: {str(exc)[:80]}")

    status = "ok" if items else "unavailable"
    payload = {
        "fetchedAt": now_iso(),
        "cacheTtlSeconds": FRED_CACHE_TTL_SECONDS,
        "source": {
            "name": "FRED",
            "status": status,
            "count": len(items),
            "detail": "; ".join(errors[:3]) if errors and not items else ("部分序列暂不可用。" if errors else "官方宏观序列已连接。"),
            "url": "https://fred.stlouisfed.org/",
        },
        "verdict": fred_macro_verdict(items),
        "items": items,
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
    urls = []
    if PERSON_IMAGES.get(person_id, "").startswith("http"):
        urls.append(PERSON_IMAGES[person_id])
    wiki_thumb = wiki_person_thumbnail_url(person_id)
    if wiki_thumb and wiki_thumb not in urls:
        urls.append(wiki_thumb)
    for url in urls:
        try:
            payload = http_bytes(url, headers={
                "accept": "image/avif,image/webp,image/jpeg,image/png,image/*,*/*;q=0.8",
                "user-agent": "Mozilla/5.0 Serenity-US-Stock-Desk/1.0",
            })
            binary_response(handler, payload["body"], payload["content_type"])
            return
        except Exception:
            continue
    binary_response(handler, person_badge_svg(person_id), "image/svg+xml")


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def end_headers(self):
        clean_path = urlparse(self.path).path
        if clean_path in {"/", "/index.html"} or clean_path.endswith((".js", ".css")):
            self.send_header("cache-control", "no-store, max-age=0")
            self.send_header("pragma", "no-cache")
            self.send_header("expires", "0")
        super().end_headers()

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
            if parsed.path == "/api/reddit-trending":
                force = (query.get("force") or ["0"])[0] == "1"
                json_response(self, reddit_trending_payload(force=force))
                return
            if parsed.path == "/api/fred-macro":
                force = (query.get("force") or ["0"])[0] == "1"
                json_response(self, fred_macro_payload(force=force))
                return
            if parsed.path == "/api/political-trades":
                force = (query.get("force") or ["0"])[0] == "1"
                symbol = (query.get("symbol") or [""])[0]
                json_response(self, political_trade_payload(symbol=symbol, force=force))
                return
            if parsed.path == "/api/congress-trades":
                force = (query.get("force") or ["0"])[0] == "1"
                symbols = normalize_symbols_param((query.get("symbols") or [""])[0])
                json_response(self, congress_trade_payload(symbols=symbols, force=force))
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
