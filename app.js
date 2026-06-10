const WEIGHTS = {
  demandInflection: 15,
  architectureCoupling: 10,
  chokepointSeverity: 15,
  supplierConcentration: 12,
  expansionDifficulty: 12,
  evidenceQuality: 15,
  valuationDisconnect: 11,
  catalystTiming: 10
};

const DEFAULT_PENALTIES = {
  dilutionFinancing: 0,
  governance: 0,
  geopolitics: 1,
  liquidity: 0,
  hypeRisk: 2,
  accountingQuality: 0,
  cyclicality: 1,
  alternativeDesignRisk: 1
};

const SYMBOL_ALIASES = {
  SIVE: "SIVE.ST",
  "STO:SIVE": "SIVE.ST",
  SIVEF: "SIVEF",
  "BRK.A": "BRK-A",
  "BRK.B": "BRK-B",
  英伟达: "NVDA",
  輝達: "NVDA",
  辉达: "NVDA",
  博通: "AVGO",
  台积电: "TSM",
  台積電: "TSM",
  美光: "MU",
  苹果: "AAPL",
  蘋果: "AAPL",
  特斯拉: "TSLA",
  谷歌: "GOOGL",
  亚马逊: "AMZN",
  亞馬遜: "AMZN",
  微软: "MSFT",
  微軟: "MSFT",
  超微: "AMD",
  美国超微: "AMD",
  甲骨文: "ORCL",
  甲骨文公司: "ORCL",
  思科: "CSCO",
  高通: "QCOM",
  高通公司: "QCOM",
  骁龙: "QCOM",
  驍龍: "QCOM",
  QUALCOMM: "QCOM",
  阿斯麦: "ASML",
  阿斯麥: "ASML",
  应用材料: "AMAT",
  應用材料: "AMAT",
  泛林: "LRCX",
  泛林集团: "LRCX",
  科磊: "KLAC",
  迈威尔: "MRVL",
  邁威爾: "MRVL",
  阿里斯塔: "ANET",
  相干: "COHR",
  应用光电: "AAOI",
  應用光電: "AAOI",
  维谛: "VRT",
  维谛技术: "VRT",
  維諦技術: "VRT",
  伊顿: "ETN",
  伊頓: "ETN",
  星座能源: "CEG",
  超微电脑: "SMCI",
  超微電腦: "SMCI",
  戴尔: "DELL",
  戴爾: "DELL",
  帕兰提尔: "PLTR",
  帕蘭提爾: "PLTR",
  伯克希尔: "BRK-A",
  伯克希尔哈撒韦: "BRK-A",
  阿里巴巴: "BABA",
  卡特彼勒: "CAT",
  帕洛阿尔托: "PANW",
  帕洛阿尔托网络: "PANW",
  英特尔: "INTC",
  英特爾: "INTC",
  闪迪: "SNDK",
  閃迪: "SNDK"
};

const SYMBOL_ZH_NAMES = {
  "SIVE.ST": "赛维斯半导体",
  SIVEF: "赛维斯半导体",
  NVDA: "英伟达",
  AVGO: "博通",
  AMD: "超微半导体",
  TSM: "台积电",
  ASML: "阿斯麦",
  AMAT: "应用材料",
  LRCX: "泛林集团",
  KLAC: "科磊",
  MU: "美光",
  MRVL: "迈威尔",
  ANET: "阿里斯塔网络",
  COHR: "相干公司",
  LITE: "鲁门特姆",
  AAOI: "应用光电",
  ALAB: "Astera Labs",
  VRT: "维谛技术",
  ETN: "伊顿",
  CEG: "星座能源",
  SMCI: "超微电脑",
  DELL: "戴尔",
  DJT: "特朗普媒体",
  BA: "波音",
  AXON: "Axon",
  BE: "Bloom Energy",
  IREN: "IREN",
  CORZ: "Core Scientific",
  APLD: "Applied Digital",
  RIOT: "Riot Platforms",
  CLSK: "CleanSpark",
  SEI: "Solaris Energy Infrastructure",
  BITF: "Bitfarms",
  BTDR: "Bitdeer",
  MSFT: "微软",
  AMZN: "亚马逊",
  GOOGL: "谷歌-A",
  GOOG: "谷歌-C",
  META: "Meta",
  PLTR: "帕兰提尔",
  TSLA: "特斯拉",
  QCOM: "高通",
  AAPL: "苹果",
  AXP: "美国运通",
  KO: "可口可乐",
  BAC: "美国银行",
  CVX: "雪佛龙",
  OXY: "西方石油",
  CB: "安达保险",
  MCO: "穆迪",
  KHC: "卡夫亨氏",
  CRWV: "CoreWeave",
  NBIS: "Nebius",
  INTC: "英特尔",
  COIN: "Coinbase",
  ROKU: "Roku",
  SHOP: "Shopify",
  CRSP: "CRISPR Therapeutics",
  "BRK-A": "伯克希尔-A",
  "BRK-B": "伯克希尔-B",
  BABA: "阿里巴巴",
  PACK: "Ranpak",
  FIX: "Comfort Systems",
  CAT: "卡特彼勒",
  RGTI: "Rigetti",
  SNDK: "闪迪",
  PANW: "帕洛阿尔托网络",
  ORCL: "甲骨文",
  CSCO: "思科",
  BN: "布鲁克菲尔德",
  UBER: "优步",
  QSR: "餐饮品牌国际",
  CMG: "Chipotle",
  HLT: "希尔顿",
  PDD: "拼多多",
  WM: "废品管理",
  CNI: "加拿大国家铁路",
  DE: "迪尔",
  ECL: "艺康",
  WMT: "沃尔玛",
  EWBC: "华美银行",
  CROX: "卡骆驰",
  NTRA: "Natera",
  INSM: "Insmed",
  EWZ: "巴西 ETF",
  RSP: "标普等权 ETF",
  YPF: "阿根廷国家石油",
  AA: "美国铝业",
  MOH: "Molina Healthcare",
  LULU: "露露乐蒙",
  SLM: "Sallie Mae",
  BRKR: "布鲁克",
  GEV: "GE Vernova",
  CPNG: "Coupang",
  CPAY: "Corpay",
  APP: "AppLovin",
  PSX: "菲利普斯66",
  LUV: "西南航空",
  HPE: "惠普企业",
  QRVO: "Qorvo",
  KVUE: "Kenvue",
  MTCH: "Match Group",
  IEP: "Icahn Enterprises",
  CVI: "CVR Energy"
};

const SYMBOL_EN_NAMES = {
  "SIVE.ST": "Sivers Semiconductors",
  SIVEF: "Sivers Semiconductors",
  NVDA: "NVIDIA",
  AVGO: "Broadcom",
  AMD: "AMD",
  TSM: "TSMC",
  ASML: "ASML",
  AMAT: "Applied Materials",
  LRCX: "Lam Research",
  KLAC: "KLA",
  MU: "Micron",
  MRVL: "Marvell",
  ANET: "Arista Networks",
  COHR: "Coherent",
  LITE: "Lumentum",
  AAOI: "Applied Optoelectronics",
  ALAB: "Astera Labs",
  VRT: "Vertiv",
  ETN: "Eaton",
  CEG: "Constellation Energy",
  SMCI: "Super Micro",
  DELL: "Dell",
  DJT: "Trump Media & Technology Group",
  BA: "Boeing",
  AXON: "Axon Enterprise",
  BE: "Bloom Energy",
  IREN: "IREN",
  CORZ: "Core Scientific",
  APLD: "Applied Digital",
  RIOT: "Riot Platforms",
  CLSK: "CleanSpark",
  SEI: "Solaris Energy Infrastructure",
  BITF: "Bitfarms",
  BTDR: "Bitdeer",
  MSFT: "Microsoft",
  AMZN: "Amazon",
  GOOGL: "Alphabet",
  GOOG: "Alphabet",
  META: "Meta",
  PLTR: "Palantir",
  TSLA: "Tesla",
  QCOM: "QUALCOMM",
  AAPL: "Apple",
  AXP: "American Express",
  KO: "Coca-Cola",
  BAC: "Bank of America",
  CVX: "Chevron",
  OXY: "Occidental Petroleum",
  CB: "Chubb",
  MCO: "Moody's",
  KHC: "Kraft Heinz",
  CRWV: "CoreWeave",
  NBIS: "Nebius",
  INTC: "Intel",
  COIN: "Coinbase",
  ROKU: "Roku",
  SHOP: "Shopify",
  CRSP: "CRISPR Therapeutics",
  "BRK-A": "Berkshire Hathaway",
  "BRK-B": "Berkshire Hathaway",
  BABA: "Alibaba",
  PACK: "Ranpak",
  FIX: "Comfort Systems",
  CAT: "Caterpillar",
  RGTI: "Rigetti",
  SNDK: "SanDisk",
  PANW: "Palo Alto Networks",
  ORCL: "Oracle",
  CSCO: "Cisco",
  BN: "Brookfield",
  UBER: "Uber",
  QSR: "Restaurant Brands",
  CMG: "Chipotle",
  HLT: "Hilton",
  PDD: "PDD Holdings",
  WM: "Waste Management",
  CNI: "Canadian National Railway",
  DE: "Deere",
  ECL: "Ecolab",
  WMT: "Walmart",
  EWBC: "East West Bancorp",
  CROX: "Crocs",
  NTRA: "Natera",
  INSM: "Insmed",
  EWZ: "iShares MSCI Brazil ETF",
  RSP: "Invesco S&P 500 Equal Weight ETF",
  YPF: "YPF",
  AA: "Alcoa",
  MOH: "Molina Healthcare",
  LULU: "Lululemon",
  SLM: "Sallie Mae",
  BRKR: "Bruker",
  GEV: "GE Vernova",
  CPNG: "Coupang",
  CPAY: "Corpay",
  APP: "AppLovin",
  PSX: "Phillips 66",
  LUV: "Southwest Airlines",
  HPE: "HPE",
  QRVO: "Qorvo",
  KVUE: "Kenvue",
  MTCH: "Match Group",
  IEP: "Icahn Enterprises",
  CVI: "CVR Energy"
};

function normalizeTickerKey(symbol) {
  return String(symbol || "")
    .trim()
    .toUpperCase()
    .replace(/^STO:/, "")
    .replace("BRK.A", "BRK-A")
    .replace("BRK.B", "BRK-B");
}

function hasChineseText(value) {
  return /[\u3400-\u9fff]/.test(String(value || ""));
}

function symbolZhName(symbol) {
  return SYMBOL_ZH_NAMES[normalizeTickerKey(symbol)] || "";
}

function canonicalStockName(symbol, name = "") {
  const key = normalizeTickerKey(symbol);
  const raw = String(name || "").trim();
  if (raw && raw !== key && raw !== String(symbol || "").trim()) return raw;
  return SYMBOL_EN_NAMES[key] || raw || key;
}

function displayNameWithZh(symbol, name = "") {
  const base = canonicalStockName(symbol, name);
  const zh = symbolZhName(symbol);
  if (!zh) return base;
  if (base === zh || hasChineseText(base) || base.includes(`（${zh}）`) || base.includes(`(${zh})`)) return base;
  return `${base}（${zh}）`;
}
const MONITOR_HANDLE = "aleabitoreddit";
const MONITOR_TOKEN_KEY = "serenity.xBearerToken";
const NEWS_STRICTNESS_KEY = "serenity.newsStrictness";
const WATCHLIST_KEY = "serenity.watchlist";
const COMPARE_KEY = "serenity.compareSymbols";
const ALERT_RULES_KEY = "serenity.alertRules";
const VIEW_MODE_KEY = "serenity.viewMode";
const THEME_KEY = "serenity.theme";
const PANEL_DEFAULT_REV_KEY = "serenity.panelDefaults.finaldesk2";
const THEME_OPTIONS = {
  light: "日光",
  dark: "夜间"
};
const REDDIT_TRENDING_REFRESH_MS = 300000;
const FRED_MACRO_REFRESH_MS = 3600000;
const CONGRESS_TRADES_REFRESH_MS = 900000;
const PANEL_COLLAPSE_KEY = "serenity.panelCollapse.v3";
const DEFAULT_WATCHLIST = ["SIVE.ST", "NVDA", "AVGO", "QCOM", "TSM", "MU"];
const DEFAULT_COMPARE_SYMBOLS = ["SIVE.ST", "NVDA", "AVGO", "QCOM"];
const VIEW_MODE_META = {
  watch: "盯盘模式 · 自选雷达 · 提醒 · 事件聚合",
  research: "深研模式 · 图表 · 调研包 · 证据阶梯",
  portfolio: "持仓模式 · 聪明钱榜单 · 组合收益 · Top holdings"
};
const ALERT_RULES = [
  { id: "strongEvidence", label: "强证据出现", description: "SEC、官方公告、新闻稿或高可信来源出现强证据。" },
  { id: "near20dma", label: "接近 20DMA", description: "研究分数够高，价格回到 20 日均线附近。" },
  { id: "rsiReset", label: "RSI 冷却", description: "RSI 降到 55 以下，适合重新看风险回报。" },
  { id: "monitorMention", label: "喊单提及", description: "@aleabitoreddit 提到当前标的，先作为触发器。" },
  { id: "redditHeat", label: "Reddit 升温", description: "过去 24 小时 Reddit 提及量明显升温，只当社区情绪线索。" },
  { id: "officialFiling", label: "SEC / IR 更新", description: "监管文件、IR 或公司官方新闻出现新条目。" }
];
const USD_CNY_SYMBOL = "USDCNY=X";
const MARKET_ENV_SYMBOLS = [
  { symbol: "^IXIC", label: "纳指", note: "科技风险偏好" },
  { symbol: "^SOX", label: "SOX", note: "半导体" },
  { symbol: "^VIX", label: "VIX", note: "恐慌波动" },
  { symbol: "^TNX", label: "10Y", note: "美债收益率" },
  { symbol: "USDCNY=X", label: "美元/人民币", note: "汇率" },
  { symbol: "BTC-USD", label: "BTC", note: "风险资产" }
];
const NEWS_STRICTNESS_LABELS = {
  balanced: "均衡",
  strict: "严格",
  official: "官方"
};

const COLLAPSIBLE_PANELS = [
  { selector: ".mover-panel", key: "movers", defaultCollapsed: true },
  { selector: ".layer-panel", key: "layer", defaultCollapsed: true },
  { selector: ".universe-panel", key: "universe", defaultCollapsed: true },
  { selector: ".market-env-panel", key: "marketEnv", defaultCollapsed: true },
  { selector: ".macro-panel", key: "macro", defaultCollapsed: true },
  { selector: ".session-playbook-panel", key: "session", defaultCollapsed: true },
  { selector: ".compare-panel", key: "compare", defaultCollapsed: true },
  { selector: ".research-pack-panel", key: "researchPack", defaultCollapsed: false },
  { selector: ".signal-monitor-panel", key: "monitor", defaultCollapsed: true },
  { selector: ".portfolio-exposure-panel", key: "portfolioExposure", defaultCollapsed: false },
  { selector: ".alert-rules-panel", key: "alertRules", defaultCollapsed: true },
  { selector: ".data-health-panel", key: "dataHealth", defaultCollapsed: true },
  { selector: ".event-panel", key: "events", defaultCollapsed: true },
  { selector: ".catalyst-panel", key: "catalysts", defaultCollapsed: true },
  { selector: ".memo-panel", key: "memo", defaultCollapsed: true },
  { selector: ".evidence-panel", key: "evidence", defaultCollapsed: true },
  { selector: ".risk-panel", key: "risk", defaultCollapsed: true },
  { selector: ".thirteenf-module", key: "thirteenfQueue", defaultCollapsed: true },
  { selector: ".congress-trades-module", key: "congressTrades", defaultCollapsed: true },
  { selector: ".framework-panel", key: "framework", defaultCollapsed: true },
  { selector: ".boundary-panel", key: "boundary", defaultCollapsed: true }
];

const PORTFOLIO_SOURCE_TYPES = {
  official13f: {
    label: "13F官方",
    short: "13F",
    tone: "strong",
    description: "来自 SEC Form 13F 或同级官方披露，季度滞后，适合看机构配置变化。"
  },
  beneficial: {
    label: "13D/13G",
    short: "13D",
    tone: "strong",
    description: "来自 5% 以上权益或激进资金披露，重点看控制权、董事会和资本配置变化。"
  },
  congress: {
    label: "国会披露",
    short: "国会",
    tone: "medium",
    description: "来自 STOCK Act 延迟披露，交易日期和披露日期要分开看。"
  },
  oge: {
    label: "OGE披露",
    short: "OGE",
    tone: "medium",
    description: "来自美国政府伦理办公室或 278-T/278e 延迟披露，金额多为区间，不能当成实时精确仓位。"
  },
  publicFund: {
    label: "基金披露",
    short: "基金",
    tone: "medium",
    description: "来自基金公开持仓、官网或投资组合披露，频率和口径各不相同。"
  },
  synthetic: {
    label: "模拟组合",
    short: "模型",
    tone: "waiting",
    description: "本地研究篮子或产业镜头，不代表任何真实账户。"
  },
  manual: {
    label: "人工维护",
    short: "人工",
    tone: "weak",
    description: "公开资料人工整理，使用前要回到 SEC、基金官网或披露原文核验。"
  }
};

const SMART_MONEY_13F_QUEUE = [
  {
    manager: "Berkshire Hathaway",
    cn: "伯克希尔",
    type: "已接入",
    sourceType: "official13f",
    focus: "长期重仓、保险浮存金、现金流质量",
    nextStep: "接入 SEC 13F 最新季度和上一季度，自动标新增、加仓、减仓、清仓",
    tickers: ["AAPL", "AXP", "KO", "BAC"],
    url: "https://www.sec.gov/edgar/browse/?CIK=1067983"
  },
  {
    manager: "Pershing Square",
    cn: "阿克曼",
    type: "已接入",
    sourceType: "official13f",
    focus: "高集中度大仓，适合看消费、平台和利率敏感资产",
    nextStep: "已进持仓榜；下一步接季度变化，重点看新增大仓和仓位集中度变化",
    tickers: ["BN", "AMZN", "UBER", "MSFT"],
    url: "https://valuesider.com/guru/bill-ackman-pershing-square-capital-management/portfolio"
  },
  {
    manager: "Bill & Melinda Gates Foundation Trust",
    cn: "盖茨基金会",
    type: "已接入",
    sourceType: "official13f",
    focus: "低换手质量股、微软和基础设施复利仓位",
    nextStep: "已进持仓榜；后续接 SEC 自动季度变化，重点看 MSFT、WM、CNI 权重变化",
    tickers: ["MSFT", "BRK-B", "WM", "CNI"],
    url: "https://valuesider.com/guru/bill-gates-bill--melinda-gates-foundation-trust/portfolio"
  },
  {
    manager: "Duquesne Family Office",
    cn: "德鲁肯米勒",
    type: "已接入",
    sourceType: "official13f",
    focus: "宏观交易和 AI/半导体大方向，换仓速度较快",
    nextStep: "已进持仓榜；下一步做季度新增/减仓榜，变化比静态仓位更重要",
    tickers: ["NTRA", "INSM", "TSM", "EWZ"],
    url: "https://valuesense.io/superinvestors/duquesnefamily"
  },
  {
    manager: "Appaloosa",
    cn: "泰珀",
    type: "已接入",
    sourceType: "official13f",
    focus: "AI 大盘、中概、周期和利率交易",
    nextStep: "已进持仓榜；后续与市场环境面板联动，看是否顺周期加仓",
    tickers: ["BABA", "AMZN", "NVDA", "GOOGL"],
    url: "https://valuesider.com/guru/david-tepper-appaloosa-management/portfolio"
  },
  {
    manager: "Scion Asset Management",
    cn: "大空头 Burry",
    type: "已接入",
    sourceType: "official13f",
    focus: "事件驱动、小盘和逆向仓位，噪音高但值得监控",
    nextStep: "已进持仓榜；只当逆向雷达，不当长期配置模板",
    tickers: ["MOH", "LULU", "SLM", "BRKR"],
    url: "https://valuesider.com/guru/michael-burry-scion-asset-management/portfolio"
  },
  {
    manager: "Himalaya Capital",
    cn: "李录",
    type: "已接入",
    sourceType: "official13f",
    focus: "长期集中、低换手，适合做质量股对照组",
    nextStep: "已进持仓榜；后续只跟踪季度集中度变化，不做短线提醒",
    tickers: ["GOOGL", "GOOG", "PDD", "BRK-B"],
    url: "https://www.dataroma.com/m/holdings.php?m=HC"
  },
  {
    manager: "Coatue / Tiger Global",
    cn: "成长基金",
    type: "已接入",
    sourceType: "official13f",
    focus: "软件、AI 应用、互联网成长股，适合和 Reddit/新闻热度交叉",
    nextStep: "已拆成 Coatue 和 Tiger 两张卡；后续只展示新增和大幅加仓",
    tickers: ["TSM", "GEV", "GOOGL", "NVDA"],
    url: "https://stockzoa.com/fund/coatue-management/"
  },
  {
    manager: "Elliott / Starboard / Icahn",
    cn: "激进资金",
    type: "已接入",
    sourceType: "beneficial",
    focus: "控制权、董事会、回购、拆分和资本配置变化",
    nextStep: "已做成 13D/13G 雷达卡；重点看事件催化，不当普通组合收益榜",
    tickers: ["PSX", "LUV", "QRVO", "IEP"],
    url: "https://www.sec.gov/edgar/search/#/forms=SC%2013D%2CSC%2013G"
  },
  {
    manager: "Situational Awareness LP",
    cn: "利奥波特",
    type: "已接入",
    sourceType: "official13f",
    focus: "Leopold Aschenbrenner 相关 AI 基建 13F，股票、Call、Put 必须分开看",
    nextStep: "已进持仓榜；当前卡片只计普通股多头，Put 不当成持仓权重",
    tickers: ["BE", "SNDK", "CRWV", "IREN"],
    url: "https://www.sec.gov/Archives/edgar/data/2045724/000204572426000008/0002045724-26-000008-index.htm"
  },
  {
    manager: "Trump disclosure radar",
    cn: "特朗普",
    type: "已接入",
    sourceType: "oge",
    focus: "OGE/278-T 与政策敏感交易线索，金额区间和披露滞后要单独标注",
    nextStep: "已进持仓榜；后续接 Open Cabinet、TrumpTrades 和 OGE 原文做自动更新",
    tickers: ["DJT", "NVDA", "ORCL", "MSFT"],
    url: "https://www.oge.gov/"
  }
];

const TRADINGVIEW_EXCHANGE_OVERRIDES = {
  "SIVE.ST": "OMXSTO:SIVE",
  SIVEF: "OTC:SIVEF",
  SPY: "AMEX:SPY",
  QQQ: "NASDAQ:QQQ",
  SOXL: "AMEX:SOXL",
  SOXS: "AMEX:SOXS",
  NVDA: "NASDAQ:NVDA",
  AVGO: "NASDAQ:AVGO",
  AMD: "NASDAQ:AMD",
  ASML: "NASDAQ:ASML",
  AMAT: "NASDAQ:AMAT",
  LRCX: "NASDAQ:LRCX",
  KLAC: "NASDAQ:KLAC",
  MU: "NASDAQ:MU",
  MRVL: "NASDAQ:MRVL",
  QCOM: "NASDAQ:QCOM",
  AAPL: "NASDAQ:AAPL",
  MSFT: "NASDAQ:MSFT",
  AMZN: "NASDAQ:AMZN",
  GOOGL: "NASDAQ:GOOGL",
  GOOG: "NASDAQ:GOOG",
  META: "NASDAQ:META",
  TSLA: "NASDAQ:TSLA",
  TSM: "NYSE:TSM",
  CRWV: "NASDAQ:CRWV",
  NBIS: "NASDAQ:NBIS",
  VRT: "NYSE:VRT",
  ANET: "NYSE:ANET",
  BE: "NYSE:BE",
  IREN: "NASDAQ:IREN",
  CORZ: "NASDAQ:CORZ",
  APLD: "NASDAQ:APLD",
  RIOT: "NASDAQ:RIOT",
  CLSK: "NASDAQ:CLSK",
  SEI: "NYSE:SEI",
  BITF: "NASDAQ:BITF",
  BTDR: "NASDAQ:BTDR",
  RDDT: "NYSE:RDDT",
  NOW: "NYSE:NOW",
  ORCL: "NYSE:ORCL",
  PLTR: "NASDAQ:PLTR",
  INTC: "NASDAQ:INTC",
  DJT: "NASDAQ:DJT",
  BA: "NYSE:BA",
  AXON: "NASDAQ:AXON",
  ASTS: "NASDAQ:ASTS",
  SNDK: "NASDAQ:SNDK",
  "BRK-A": "NYSE:BRK.A",
  "BRK-B": "NYSE:BRK.B",
  BN: "NYSE:BN",
  BABA: "NYSE:BABA",
  CAT: "NYSE:CAT",
  PANW: "NASDAQ:PANW",
  UBER: "NYSE:UBER",
  QSR: "NYSE:QSR",
  CMG: "NYSE:CMG",
  HLT: "NYSE:HLT",
  PDD: "NASDAQ:PDD",
  WM: "NYSE:WM",
  CNI: "NYSE:CNI",
  DE: "NYSE:DE",
  ECL: "NYSE:ECL",
  WMT: "NYSE:WMT",
  EWBC: "NASDAQ:EWBC",
  CROX: "NASDAQ:CROX",
  NTRA: "NASDAQ:NTRA",
  INSM: "NASDAQ:INSM",
  EWZ: "AMEX:EWZ",
  RSP: "AMEX:RSP",
  YPF: "NYSE:YPF",
  AA: "NYSE:AA",
  MOH: "NYSE:MOH",
  LULU: "NASDAQ:LULU",
  SLM: "NASDAQ:SLM",
  BRKR: "NASDAQ:BRKR",
  GEV: "NYSE:GEV",
  CPNG: "NYSE:CPNG",
  CPAY: "NYSE:CPAY",
  APP: "NASDAQ:APP",
  PSX: "NYSE:PSX",
  LUV: "NYSE:LUV",
  HPE: "NYSE:HPE",
  QRVO: "NASDAQ:QRVO",
  KVUE: "NYSE:KVUE",
  MTCH: "NASDAQ:MTCH",
  IEP: "NASDAQ:IEP",
  CVI: "NYSE:CVI"
};

function profile(base) {
  return {
    market: "US",
    category: "compute",
    factors: {},
    penalties: {},
    alpha: {},
    bayes: [2, 5, 18, 38, 30, 7],
    valuation: {},
    evidence: [],
    checks: [],
    weaken: [],
    ...base,
    penalties: { ...DEFAULT_PENALTIES, ...(base.penalties || {}) }
  };
}

const UNIVERSE = [
  profile({
    symbol: "SIVE.ST", name: "Sivers Semiconductors", theme: "卫星通信 / 光子毫米波", category: "satcom", layer: "Ka-band BFIC / 光子与毫米波芯片", role: "多轨道卫星终端和 AI 光互连上游的高弹性小盘供应商",
    tags: ["$SIVE", "ALL.SPACE", "Ka-band BFIC", "Silicon photonics"],
    factors: { demandInflection: 5, architectureCoupling: 5, chokepointSeverity: 4, supplierConcentration: 4, expansionDifficulty: 4, evidenceQuality: 4, valuationDisconnect: 4, catalystTiming: 5 },
    penalties: { liquidity: 3, hypeRisk: 5, cyclicality: 2, governance: 1, accountingQuality: 1 },
    alpha: { demand: 5, transmission: 5, purity: 5, elasticity: 5, neglect: 4, verification: 4, risk: 4 },
    bayes: [4, 7, 20, 42, 24, 3],
    valuation: { forwardPE: 0, epsCagr: 38, revenueCagr: 32, runwayYears: 5, qualityFactor: 0.62, impliedGrowth: 36, revisionScore: 58, fundamentalSpeed: 28, corpus: 92 },
    evidence: [
      ["Strong", "2026-06-09 官方公告：ALL.SPACE 给 Sivers $8.2M 2027 年 Ka-band BFIC 生产订单"],
      ["Strong", "订单从开发/初始生产推进到多年度规模部署，能直接进入 2027 年交付验证链"],
      ["Medium", "卫星通信、国防终端、AI 光互连都贴近 Serenity 二阶供应链卡点"],
      ["Weak", "股价短期涨幅和社媒热度很高，必须单独扣 FOMO 和流动性风险"]
    ],
    checks: ["ALL.SPACE 订单转收入节奏", "2027 年交付毛利率", "GlobalFoundries/光子合作是否形成量产收入", "现金流与融资需求"],
    weaken: ["ALL.SPACE 订单延后或无法转收入", "新订单没有带来毛利率改善", "高涨幅后融资/内部人交易/流动性风险放大", "客户认证不能扩展到更多卫星或 AI 光互连客户"]
  }),
  profile({
    symbol: "NVDA", name: "NVIDIA", theme: "AI 算力核心", category: "compute", layer: "GPU / 加速卡", role: "控制 AI 训练与推理核心算力生态",
    tags: ["GPU", "CUDA", "HBM 拉动", "Blackwell"],
    factors: { demandInflection: 5, architectureCoupling: 5, chokepointSeverity: 5, supplierConcentration: 4, expansionDifficulty: 4, evidenceQuality: 5, valuationDisconnect: 2, catalystTiming: 4 },
    penalties: { hypeRisk: 3, geopolitics: 2, alternativeDesignRisk: 2 },
    alpha: { demand: 5, transmission: 5, purity: 5, elasticity: 3, neglect: 1, verification: 5, risk: 3 },
    bayes: [1, 3, 10, 34, 42, 10],
    valuation: { forwardPE: 38, epsCagr: 32, revenueCagr: 26, runwayYears: 8, qualityFactor: 1.38, impliedGrowth: 34, revisionScore: 82, fundamentalSpeed: 24, corpus: 78 },
    evidence: [
      ["Strong", "SEC/IR/电话会可核验数据中心收入与产品周期"],
      ["Strong", "客户 capex 与 HBM/先进封装供应链共同印证需求"],
      ["Medium", "市场已充分关注，估值安全边际需要单独打折"]
    ],
    checks: ["下一季数据中心收入与毛利率", "Blackwell 交付节奏与客户排产", "云厂商 capex 是否继续上修"],
    weaken: ["云厂商削减 GPU capex", "毛利率因供应或竞争明显下滑", "ASIC 替代速度超过预期"]
  }),
  profile({
    symbol: "AVGO", name: "Broadcom", theme: "定制 ASIC / 网络", category: "interconnect", layer: "ASIC / 交换芯片", role: "云厂商自研 ASIC 与 AI 网络核心供应商",
    tags: ["ASIC", "Networking", "AI cluster"],
    factors: { demandInflection: 5, architectureCoupling: 5, chokepointSeverity: 4, supplierConcentration: 4, expansionDifficulty: 4, evidenceQuality: 5, valuationDisconnect: 3, catalystTiming: 4 },
    penalties: { hypeRisk: 2, customerConcentration: 2 },
    alpha: { demand: 5, transmission: 5, purity: 4, elasticity: 3, neglect: 2, verification: 4, risk: 2 },
    bayes: [1, 4, 15, 42, 31, 7],
    valuation: { forwardPE: 31, epsCagr: 21, revenueCagr: 18, runwayYears: 8, qualityFactor: 1.28, impliedGrowth: 24, revisionScore: 78, fundamentalSpeed: 18, corpus: 72 },
    evidence: [["Strong", "IR/财报可核验 AI 半导体收入目标"], ["Medium", "云厂商 ASIC 趋势强化第二路线"], ["Medium", "收购整合与客户集中需要持续跟踪"]],
    checks: ["AI 半导体收入占比", "交换芯片订单与毛利率", "VMware 整合后的现金流"],
    weaken: ["核心 ASIC 客户订单放缓", "网络升级周期晚于预期", "并购整合侵蚀利润质量"]
  }),
  profile({
    symbol: "AMD", name: "AMD", theme: "AI GPU 第二供给", category: "compute", layer: "GPU / CPU", role: "GPU 第二供给与 CPU 现金流支撑",
    tags: ["MI 系列", "CPU", "GPU"],
    factors: { demandInflection: 4, architectureCoupling: 4, chokepointSeverity: 3, supplierConcentration: 3, expansionDifficulty: 3, evidenceQuality: 4, valuationDisconnect: 3, catalystTiming: 4 },
    penalties: { hypeRisk: 3, alternativeDesignRisk: 2 },
    alpha: { demand: 4, transmission: 4, purity: 4, elasticity: 4, neglect: 2, verification: 4, risk: 3 },
    bayes: [2, 5, 18, 38, 32, 5],
    valuation: { forwardPE: 44, epsCagr: 30, revenueCagr: 21, runwayYears: 6, qualityFactor: 1.02, impliedGrowth: 32, revisionScore: 72, fundamentalSpeed: 20, corpus: 68 },
    evidence: [["Strong", "IR 可核验 MI 系列路线和客户进展"], ["Medium", "第二供给逻辑强，但生态黏性弱于 NVIDIA"], ["Weak", "部分行情来自追逐 GPU 替代叙事"]],
    checks: ["MI 出货与毛利率", "云客户复购", "CPU 周期是否拖累利润"],
    weaken: ["MI 毛利低于预期", "客户验证慢", "NVIDIA 供给改善后替代需求减弱"]
  }),
  profile({
    symbol: "TSM", name: "TSMC", theme: "先进制程 / 封装", category: "foundry", layer: "晶圆代工 / CoWoS", role: "先进制程和先进封装产能核心瓶颈",
    tags: ["Foundry", "CoWoS", "Advanced node"],
    factors: { demandInflection: 5, architectureCoupling: 5, chokepointSeverity: 5, supplierConcentration: 5, expansionDifficulty: 5, evidenceQuality: 5, valuationDisconnect: 3, catalystTiming: 4 },
    penalties: { geopolitics: 3, hypeRisk: 1, cyclicality: 1 },
    alpha: { demand: 5, transmission: 5, purity: 4, elasticity: 2, neglect: 2, verification: 5, risk: 3 },
    bayes: [1, 3, 15, 45, 31, 5],
    valuation: { forwardPE: 26, epsCagr: 20, revenueCagr: 19, runwayYears: 10, qualityFactor: 1.32, impliedGrowth: 21, revisionScore: 80, fundamentalSpeed: 18, corpus: 66 },
    evidence: [["Strong", "月度收入、财报、capex 与 CoWoS 扩产可交叉验证"], ["Strong", "客户集中但不可替代性强"], ["Medium", "地缘政治是长期估值折扣来源"]],
    checks: ["月度收入趋势", "CoWoS 扩产节奏", "先进节点毛利率"],
    weaken: ["先进封装供需缓解", "地缘风险定价上升", "大客户订单削减"]
  }),
  profile({
    symbol: "ASML", name: "ASML", theme: "光刻设备", category: "equipment", layer: "EUV / DUV 光刻", role: "先进制程扩产最硬设备约束",
    tags: ["EUV", "DUV", "Semicap"],
    factors: { demandInflection: 4, architectureCoupling: 5, chokepointSeverity: 5, supplierConcentration: 5, expansionDifficulty: 5, evidenceQuality: 5, valuationDisconnect: 3, catalystTiming: 3 },
    penalties: { geopolitics: 3, cyclicality: 2 },
    alpha: { demand: 4, transmission: 5, purity: 5, elasticity: 2, neglect: 2, verification: 4, risk: 3 },
    bayes: [1, 5, 28, 42, 22, 2],
    valuation: { forwardPE: 28, epsCagr: 17, revenueCagr: 14, runwayYears: 8, qualityFactor: 1.42, impliedGrowth: 20, revisionScore: 68, fundamentalSpeed: 14, corpus: 58 },
    evidence: [["Strong", "订单、积压和出货节奏来自公司财报"], ["Strong", "供应商数量极低，扩产难度高"], ["Medium", "出口管制影响区域需求"]],
    checks: ["EUV backlog", "中国 DUV 出口限制", "高 NA EUV 采用进度"],
    weaken: ["客户 capex 延后", "出口限制扩大", "成熟制程周期下行"]
  }),
  profile({
    symbol: "AMAT", name: "Applied Materials", theme: "半导体设备平台", category: "equipment", layer: "沉积 / 材料工程", role: "先进工艺迁移中的平台型设备供应商",
    tags: ["Deposition", "Etch-adjacent", "Packaging"],
    factors: { demandInflection: 4, architectureCoupling: 4, chokepointSeverity: 4, supplierConcentration: 4, expansionDifficulty: 4, evidenceQuality: 4, valuationDisconnect: 3, catalystTiming: 3 },
    alpha: { demand: 4, transmission: 4, purity: 4, elasticity: 3, neglect: 2, verification: 4, risk: 2 },
    valuation: { forwardPE: 22, epsCagr: 14, revenueCagr: 11, runwayYears: 6, qualityFactor: 1.1, impliedGrowth: 15, revisionScore: 64, fundamentalSpeed: 12, corpus: 54 },
    evidence: [["Strong", "财报分部和订单可核验 WFE 周期"], ["Medium", "先进封装和材料工程带来结构性增量"]],
    checks: ["WFE 订单", "先进封装收入", "中国收入占比"],
    weaken: ["WFE 下修", "中国限制扩大", "毛利率走弱"]
  }),
  profile({
    symbol: "LRCX", name: "Lam Research", theme: "刻蚀 / 沉积", category: "equipment", layer: "刻蚀与存储设备", role: "存储和先进逻辑工艺迁移设备供应商",
    tags: ["Etch", "Deposition", "Memory"],
    factors: { demandInflection: 4, architectureCoupling: 4, chokepointSeverity: 4, supplierConcentration: 4, expansionDifficulty: 4, evidenceQuality: 4, valuationDisconnect: 3, catalystTiming: 3 },
    penalties: { cyclicality: 2, geopolitics: 2 },
    alpha: { demand: 4, transmission: 4, purity: 4, elasticity: 3, neglect: 2, verification: 4, risk: 2 },
    valuation: { forwardPE: 23, epsCagr: 18, revenueCagr: 13, runwayYears: 5, qualityFactor: 1.05, impliedGrowth: 17, revisionScore: 66, fundamentalSpeed: 13, corpus: 55 },
    evidence: [["Strong", "存储 capex 恢复可通过客户与订单验证"], ["Medium", "HBM 拉动前道设备需求"]],
    checks: ["存储客户 capex", "订单恢复", "中国收入风险"],
    weaken: ["存储 capex 复苏不及预期", "出口限制扩大", "价格竞争"]
  }),
  profile({
    symbol: "KLAC", name: "KLA", theme: "检测 / 量测", category: "equipment", layer: "制程控制 / Metrology", role: "良率提升和先进制程爬坡的检测卡点",
    tags: ["Metrology", "Inspection", "Yield"],
    factors: { demandInflection: 4, architectureCoupling: 5, chokepointSeverity: 4, supplierConcentration: 4, expansionDifficulty: 4, evidenceQuality: 4, valuationDisconnect: 3, catalystTiming: 3 },
    alpha: { demand: 4, transmission: 4, purity: 5, elasticity: 2, neglect: 3, verification: 4, risk: 2 },
    valuation: { forwardPE: 25, epsCagr: 15, revenueCagr: 12, runwayYears: 7, qualityFactor: 1.22, impliedGrowth: 17, revisionScore: 68, fundamentalSpeed: 13, corpus: 56 },
    evidence: [["Strong", "良率与制程控制需求贯穿先进节点"], ["Medium", "相对不如 GPU 显眼，卡点质量更高"]],
    checks: ["订单与 backlog", "先进节点客户占比", "毛利率"],
    weaken: ["晶圆厂 capex 放缓", "成熟制程需求下行", "估值扩张过快"]
  }),
  profile({
    symbol: "MU", name: "Micron", theme: "HBM / 存储", category: "memory", layer: "HBM / DRAM / NAND", role: "AI 服务器内存容量与带宽受益者",
    tags: ["HBM", "DRAM", "NAND"],
    factors: { demandInflection: 5, architectureCoupling: 4, chokepointSeverity: 4, supplierConcentration: 4, expansionDifficulty: 4, evidenceQuality: 4, valuationDisconnect: 4, catalystTiming: 4 },
    penalties: { cyclicality: 3, hypeRisk: 2 },
    alpha: { demand: 5, transmission: 4, purity: 4, elasticity: 4, neglect: 3, verification: 4, risk: 3 },
    bayes: [2, 5, 20, 45, 25, 3],
    valuation: { forwardPE: 18, epsCagr: 32, revenueCagr: 20, runwayYears: 4, qualityFactor: 0.82, impliedGrowth: 19, revisionScore: 76, fundamentalSpeed: 22, corpus: 70 },
    evidence: [["Strong", "HBM 与存储价格周期可由财报/行业数据验证"], ["Medium", "周期股不能线性外推峰值 EPS"]],
    checks: ["HBM 产能锁定", "DRAM/NAND 价格", "库存与毛利率"],
    weaken: ["存储价格转弱", "HBM 份额低于预期", "capex 过快导致供给压力"]
  }),
  profile({
    symbol: "MRVL", name: "Marvell", theme: "AI 网络 / 定制硅", category: "interconnect", layer: "DSP / ASIC / Networking", role: "AI 集群互连和定制芯片受益者",
    tags: ["DSP", "ASIC", "Networking"],
    factors: { demandInflection: 4, architectureCoupling: 5, chokepointSeverity: 4, supplierConcentration: 3, expansionDifficulty: 4, evidenceQuality: 4, valuationDisconnect: 3, catalystTiming: 4 },
    penalties: { hypeRisk: 2, customerConcentration: 2 },
    alpha: { demand: 4, transmission: 4, purity: 4, elasticity: 4, neglect: 3, verification: 4, risk: 2 },
    bayes: [2, 5, 22, 43, 25, 3],
    valuation: { forwardPE: 33, epsCagr: 28, revenueCagr: 22, runwayYears: 6, qualityFactor: 1.0, impliedGrowth: 28, revisionScore: 70, fundamentalSpeed: 18, corpus: 72 },
    evidence: [["Strong", "AI 定制硅收入和网络产品由财报跟踪"], ["Medium", "客户项目节奏是关键变量"]],
    checks: ["AI revenue run-rate", "客户项目数量", "毛利率与库存"],
    weaken: ["定制硅项目延迟", "网络周期疲弱", "估值提前透支"]
  }),
  profile({
    symbol: "ANET", name: "Arista", theme: "AI 网络", category: "interconnect", layer: "数据中心以太网交换机", role: "AI 集群横向扩张的网络设备受益者",
    tags: ["Ethernet", "Switching", "Cloud"],
    factors: { demandInflection: 5, architectureCoupling: 5, chokepointSeverity: 4, supplierConcentration: 3, expansionDifficulty: 3, evidenceQuality: 4, valuationDisconnect: 3, catalystTiming: 4 },
    alpha: { demand: 5, transmission: 5, purity: 4, elasticity: 3, neglect: 2, verification: 4, risk: 2 },
    valuation: { forwardPE: 35, epsCagr: 19, revenueCagr: 18, runwayYears: 7, qualityFactor: 1.2, impliedGrowth: 24, revisionScore: 74, fundamentalSpeed: 17, corpus: 63 },
    evidence: [["Strong", "云客户和 AI Ethernet 升级可从财报验证"], ["Medium", "竞争来自自研网络和其他设备商"]],
    checks: ["AI networking revenue", "云客户集中", "毛利率"],
    weaken: ["云客户订单推迟", "以太网份额不及预期", "竞争压价"]
  }),
  profile({
    symbol: "COHR", name: "Coherent", theme: "光通信 / 激光", category: "optical", layer: "光模块上游材料与器件", role: "高速光互连中的激光、材料、光器件供应商",
    tags: ["Optical", "Laser", "Datacom"],
    factors: { demandInflection: 5, architectureCoupling: 5, chokepointSeverity: 4, supplierConcentration: 3, expansionDifficulty: 4, evidenceQuality: 3, valuationDisconnect: 4, catalystTiming: 4 },
    penalties: { cyclicality: 2, debt: 2, hypeRisk: 2 },
    alpha: { demand: 5, transmission: 4, purity: 4, elasticity: 4, neglect: 4, verification: 3, risk: 3 },
    bayes: [3, 8, 24, 42, 20, 3],
    valuation: { forwardPE: 24, epsCagr: 26, revenueCagr: 18, runwayYears: 5, qualityFactor: 0.82, impliedGrowth: 21, revisionScore: 62, fundamentalSpeed: 17, corpus: 74 },
    evidence: [["Medium", "光通信上游受 AI 集群带宽需求拉动"], ["Needs checking", "需要核验债务、分部收入和客户订单"]],
    checks: ["Datacom 收入", "债务去杠杆", "800G/1.6T 订单"],
    weaken: ["订单只停留在库存周期", "债务压力加大", "客户转向替代供应"]
  }),
  profile({
    symbol: "LITE", name: "Lumentum", theme: "光通信 / 激光", category: "optical", layer: "激光器 / 光器件", role: "高速光模块和工业激光链条上游",
    tags: ["Laser", "Optical", "800G"],
    factors: { demandInflection: 4, architectureCoupling: 5, chokepointSeverity: 4, supplierConcentration: 3, expansionDifficulty: 4, evidenceQuality: 3, valuationDisconnect: 4, catalystTiming: 4 },
    penalties: { cyclicality: 2, hypeRisk: 2 },
    alpha: { demand: 4, transmission: 4, purity: 4, elasticity: 4, neglect: 4, verification: 3, risk: 3 },
    valuation: { forwardPE: 26, epsCagr: 30, revenueCagr: 17, runwayYears: 5, qualityFactor: 0.78, impliedGrowth: 21, revisionScore: 60, fundamentalSpeed: 17, corpus: 82 },
    evidence: [["Medium", "Serenity 语料中光通信/光子方向反复出现"], ["Needs checking", "需要确认客户验证和利润恢复"]],
    checks: ["Datacom 订单", "毛利率恢复", "库存出清"],
    weaken: ["客户验证慢", "消费/工业拖累", "竞争导致 ASP 下滑"]
  }),
  profile({
    symbol: "AAOI", name: "Applied Optoelectronics", theme: "光模块高弹性", category: "optical", layer: "光模块 / 收发器", role: "AI 光互连高 beta 供应链标的",
    tags: ["Transceiver", "800G", "High beta"],
    factors: { demandInflection: 4, architectureCoupling: 4, chokepointSeverity: 3, supplierConcentration: 2, expansionDifficulty: 3, evidenceQuality: 2, valuationDisconnect: 5, catalystTiming: 4 },
    penalties: { liquidity: 2, hypeRisk: 4, accountingQuality: 1 },
    alpha: { demand: 4, transmission: 3, purity: 4, elasticity: 5, neglect: 4, verification: 2, risk: 4 },
    bayes: [5, 10, 28, 38, 17, 2],
    valuation: { forwardPE: 0, epsCagr: 36, revenueCagr: 22, runwayYears: 4, qualityFactor: 0.52, impliedGrowth: 30, revisionScore: 48, fundamentalSpeed: 18, corpus: 78 },
    evidence: [["Weak", "高弹性光模块线索，但强证据需要客户和财务验证"], ["Needs checking", "PE/PEG 失真，适合里程碑框架"]],
    checks: ["客户认证", "订单可见性", "现金流和融资风险"],
    weaken: ["订单无法转收入", "增发/融资压力", "毛利率无法改善"]
  }),
  profile({
    symbol: "ALAB", name: "Astera Labs", theme: "AI 互连芯片", category: "interconnect", layer: "PCIe/CXL 连接芯片", role: "AI 服务器内部连接和内存扩展受益者",
    tags: ["CXL", "PCIe", "Retimer"],
    factors: { demandInflection: 5, architectureCoupling: 5, chokepointSeverity: 4, supplierConcentration: 3, expansionDifficulty: 4, evidenceQuality: 3, valuationDisconnect: 2, catalystTiming: 4 },
    penalties: { hypeRisk: 4, liquidity: 1, alternativeDesignRisk: 2 },
    alpha: { demand: 5, transmission: 4, purity: 5, elasticity: 4, neglect: 1, verification: 3, risk: 4 },
    bayes: [2, 5, 17, 35, 34, 7],
    valuation: { forwardPE: 78, epsCagr: 42, revenueCagr: 35, runwayYears: 7, qualityFactor: 1.0, impliedGrowth: 48, revisionScore: 72, fundamentalSpeed: 27, corpus: 58 },
    evidence: [["Strong", "公司披露产品与客户类型可核验"], ["Medium", "估值对高增长要求很高"]],
    checks: ["超大客户集中", "CXL 渗透", "毛利率和竞争"],
    weaken: ["连接芯片被集成或替代", "客户集中风险暴露", "估值无法容忍增速放缓"]
  }),
  profile({
    symbol: "VRT", name: "Vertiv", theme: "AI 电力散热", category: "power", layer: "数据中心电力 / 液冷", role: "数据中心电力密度和散热约束供应商",
    tags: ["Power", "Cooling", "Data center"],
    factors: { demandInflection: 5, architectureCoupling: 5, chokepointSeverity: 5, supplierConcentration: 3, expansionDifficulty: 4, evidenceQuality: 4, valuationDisconnect: 3, catalystTiming: 5 },
    penalties: { hypeRisk: 3, cyclicality: 1 },
    alpha: { demand: 5, transmission: 5, purity: 4, elasticity: 4, neglect: 2, verification: 5, risk: 3 },
    bayes: [1, 4, 18, 45, 28, 4],
    valuation: { forwardPE: 42, epsCagr: 28, revenueCagr: 18, runwayYears: 8, qualityFactor: 1.08, impliedGrowth: 34, revisionScore: 82, fundamentalSpeed: 20, corpus: 62 },
    evidence: [["Strong", "订单、backlog 和数据中心暴露可从财报核验"], ["Medium", "市场已高度定价 AI 电力散热叙事"]],
    checks: ["订单增长", "液冷收入", "毛利率与 backlog"],
    weaken: ["订单增速放缓", "客户推迟数据中心建设", "估值透支"]
  }),
  profile({
    symbol: "ETN", name: "Eaton", theme: "电气设备", category: "power", layer: "配电 / 电力设备", role: "数据中心和电网升级的电气设备平台",
    tags: ["Electrical", "Grid", "Data center"],
    factors: { demandInflection: 5, architectureCoupling: 4, chokepointSeverity: 4, supplierConcentration: 3, expansionDifficulty: 4, evidenceQuality: 5, valuationDisconnect: 3, catalystTiming: 4 },
    alpha: { demand: 5, transmission: 4, purity: 3, elasticity: 2, neglect: 2, verification: 5, risk: 2 },
    valuation: { forwardPE: 30, epsCagr: 14, revenueCagr: 10, runwayYears: 9, qualityFactor: 1.18, impliedGrowth: 18, revisionScore: 76, fundamentalSpeed: 12, corpus: 50 },
    evidence: [["Strong", "电气分部、订单和 backlog 可由财报验证"], ["Medium", "更像稳健基础设施复利，不是最高弹性"]],
    checks: ["Electrical backlog", "数据中心订单", "产能扩张"],
    weaken: ["电气订单见顶", "项目延后", "估值高于增长"]
  }),
  profile({
    symbol: "CEG", name: "Constellation Energy", theme: "AI 电力 / 核电", category: "power", layer: "低碳电力供应", role: "AI 数据中心长期电力约束的上游受益者",
    tags: ["Nuclear", "Power", "PPA"],
    factors: { demandInflection: 5, architectureCoupling: 4, chokepointSeverity: 4, supplierConcentration: 4, expansionDifficulty: 4, evidenceQuality: 4, valuationDisconnect: 3, catalystTiming: 4 },
    penalties: { regulation: 2, hypeRisk: 2 },
    alpha: { demand: 5, transmission: 4, purity: 3, elasticity: 3, neglect: 2, verification: 4, risk: 3 },
    valuation: { forwardPE: 28, epsCagr: 18, revenueCagr: 8, runwayYears: 10, qualityFactor: 1.02, impliedGrowth: 22, revisionScore: 70, fundamentalSpeed: 12, corpus: 48 },
    evidence: [["Strong", "电力合同、监管和财报可核验"], ["Medium", "AI PPA 叙事强，但受政策和电价影响"]],
    checks: ["数据中心 PPA", "核电重启/延寿", "监管价格机制"],
    weaken: ["电价回落", "监管限制", "AI 电力需求低于预期"]
  }),
  profile({
    symbol: "SMCI", name: "Super Micro", theme: "AI 服务器", category: "server", layer: "服务器集成 / 液冷", role: "AI 服务器集成与液冷高弹性标的",
    tags: ["Server", "Liquid cooling", "Execution"],
    factors: { demandInflection: 5, architectureCoupling: 4, chokepointSeverity: 3, supplierConcentration: 2, expansionDifficulty: 3, evidenceQuality: 2, valuationDisconnect: 4, catalystTiming: 5 },
    penalties: { governance: 3, accountingQuality: 3, hypeRisk: 3, customerConcentration: 2 },
    alpha: { demand: 5, transmission: 4, purity: 4, elasticity: 5, neglect: 2, verification: 2, risk: 5 },
    bayes: [5, 10, 25, 40, 18, 2],
    valuation: { forwardPE: 16, epsCagr: 28, revenueCagr: 24, runwayYears: 4, qualityFactor: 0.58, impliedGrowth: 22, revisionScore: 45, fundamentalSpeed: 20, corpus: 54 },
    evidence: [["Needs checking", "高弹性但治理/会计质量必须先核验"], ["Strong", "服务器收入可由财报验证，但利润质量是关键"]],
    checks: ["审计与治理进展", "毛利率", "客户集中与现金流"],
    weaken: ["治理问题升级", "毛利率持续下滑", "现金流无法匹配收入增长"]
  }),
  profile({
    symbol: "DELL", name: "Dell", theme: "AI 服务器 / 企业 IT", category: "server", layer: "服务器 OEM", role: "AI 服务器放量和企业硬件更新受益者",
    tags: ["Server", "Enterprise", "AI factory"],
    factors: { demandInflection: 4, architectureCoupling: 4, chokepointSeverity: 2, supplierConcentration: 2, expansionDifficulty: 2, evidenceQuality: 4, valuationDisconnect: 4, catalystTiming: 4 },
    penalties: { cyclicality: 2, marginRisk: 2 },
    alpha: { demand: 4, transmission: 4, purity: 3, elasticity: 3, neglect: 3, verification: 4, risk: 3 },
    valuation: { forwardPE: 15, epsCagr: 14, revenueCagr: 8, runwayYears: 4, qualityFactor: 0.86, impliedGrowth: 13, revisionScore: 62, fundamentalSpeed: 10, corpus: 44 },
    evidence: [["Strong", "AI 服务器订单和 ISG 分部可由财报验证"], ["Medium", "毛利率低，卡点控制力弱于上游"]],
    checks: ["AI server backlog", "ISG margin", "现金回报"],
    weaken: ["服务器放量不赚钱", "订单被拉前", "企业 IT 周期走弱"]
  }),
  profile({
    symbol: "MSFT", name: "Microsoft", theme: "AI 云 / 软件", category: "platform", layer: "云平台 / 应用层", role: "AI 需求端和云基础设施资本开支源头",
    tags: ["Azure", "Copilot", "Capex"],
    factors: { demandInflection: 5, architectureCoupling: 4, chokepointSeverity: 2, supplierConcentration: 3, expansionDifficulty: 3, evidenceQuality: 5, valuationDisconnect: 2, catalystTiming: 3 },
    alpha: { demand: 5, transmission: 4, purity: 3, elasticity: 1, neglect: 1, verification: 5, risk: 2 },
    bayes: [1, 6, 30, 42, 18, 3],
    valuation: { forwardPE: 29, epsCagr: 15, revenueCagr: 12, runwayYears: 10, qualityFactor: 1.45, impliedGrowth: 18, revisionScore: 70, fundamentalSpeed: 12, corpus: 55 },
    evidence: [["Strong", "Azure 增长、capex 和 AI 贡献由财报验证"], ["Medium", "不是供应链卡点，更像需求源头和平台复利"]],
    checks: ["Azure AI 贡献", "Copilot ARPU", "capex 回报"],
    weaken: ["AI 软件变现慢", "capex 压缩 FCF", "云增速放缓"]
  }),
  profile({
    symbol: "AMZN", name: "Amazon", theme: "AWS / 自研芯片", category: "platform", layer: "云平台 / 零售现金流", role: "AWS AI 需求、Trainium 和电商现金流组合",
    tags: ["AWS", "Trainium", "Retail"],
    factors: { demandInflection: 5, architectureCoupling: 4, chokepointSeverity: 2, supplierConcentration: 3, expansionDifficulty: 3, evidenceQuality: 5, valuationDisconnect: 3, catalystTiming: 3 },
    alpha: { demand: 5, transmission: 4, purity: 3, elasticity: 2, neglect: 2, verification: 5, risk: 2 },
    valuation: { forwardPE: 34, epsCagr: 25, revenueCagr: 12, runwayYears: 8, qualityFactor: 1.15, impliedGrowth: 22, revisionScore: 74, fundamentalSpeed: 14, corpus: 58 },
    evidence: [["Strong", "AWS 增速、margin 和 capex 可核验"], ["Medium", "自研芯片改善成本，但非纯卡点"]],
    checks: ["AWS 增速", "AI 服务收入", "零售利润率"],
    weaken: ["AWS 增速放缓", "AI capex 回报低", "零售利润回落"]
  }),
  profile({
    symbol: "GOOGL", name: "Alphabet", theme: "TPU / 搜索 AI", category: "platform", layer: "模型 / 广告 / 自研芯片", role: "TPU 与搜索广告现金流的 AI 平台",
    tags: ["TPU", "Search", "Cloud"],
    factors: { demandInflection: 4, architectureCoupling: 4, chokepointSeverity: 2, supplierConcentration: 3, expansionDifficulty: 3, evidenceQuality: 5, valuationDisconnect: 4, catalystTiming: 3 },
    alpha: { demand: 4, transmission: 4, purity: 3, elasticity: 2, neglect: 3, verification: 5, risk: 2 },
    valuation: { forwardPE: 23, epsCagr: 18, revenueCagr: 12, runwayYears: 10, qualityFactor: 1.25, impliedGrowth: 16, revisionScore: 72, fundamentalSpeed: 13, corpus: 55 },
    evidence: [["Strong", "搜索、云和 capex 可由财报核验"], ["Medium", "估值相对平台质量仍有讨论空间"]],
    checks: ["搜索 AI 对广告影响", "Cloud margin", "TPU 外部化可能性"],
    weaken: ["搜索份额受损", "AI 成本侵蚀利润", "监管压力升级"]
  }),
  profile({
    symbol: "META", name: "Meta", theme: "AI 应用 / 广告", category: "platform", layer: "广告 / 开源模型", role: "广告模型效率和 AI 基建需求源头",
    tags: ["Ads", "Llama", "Capex"],
    factors: { demandInflection: 4, architectureCoupling: 4, chokepointSeverity: 1, supplierConcentration: 2, expansionDifficulty: 3, evidenceQuality: 5, valuationDisconnect: 3, catalystTiming: 3 },
    alpha: { demand: 4, transmission: 3, purity: 3, elasticity: 2, neglect: 2, verification: 5, risk: 3 },
    valuation: { forwardPE: 24, epsCagr: 16, revenueCagr: 12, runwayYears: 8, qualityFactor: 1.2, impliedGrowth: 18, revisionScore: 68, fundamentalSpeed: 12, corpus: 44 },
    evidence: [["Strong", "广告效率和 capex 可由财报核验"], ["Medium", "AI 基建投入可能压制 FCF"]],
    checks: ["广告增速", "AI capex", "Reality Labs 亏损"],
    weaken: ["capex 回报低", "广告周期下行", "监管/内容风险"]
  }),
  profile({
    symbol: "PLTR", name: "Palantir", theme: "AI 软件", category: "software", layer: "企业 AI 应用", role: "企业与政府 AI 工作流软件",
    tags: ["AIP", "Gov", "Enterprise"],
    factors: { demandInflection: 4, architectureCoupling: 3, chokepointSeverity: 2, supplierConcentration: 2, expansionDifficulty: 3, evidenceQuality: 4, valuationDisconnect: 1, catalystTiming: 4 },
    penalties: { hypeRisk: 5 },
    alpha: { demand: 4, transmission: 4, purity: 4, elasticity: 3, neglect: 1, verification: 4, risk: 4 },
    bayes: [1, 5, 18, 38, 32, 6],
    valuation: { forwardPE: 92, epsCagr: 34, revenueCagr: 24, runwayYears: 7, qualityFactor: 1.05, impliedGrowth: 55, revisionScore: 78, fundamentalSpeed: 20, corpus: 42 },
    evidence: [["Strong", "合同、客户增长和 margin 可由财报核验"], ["Medium", "估值隐含增长很高，FOMO 风险重"]],
    checks: ["商业客户净扩张", "RPO/合同", "估值倍数"],
    weaken: ["增速不能支撑估值", "政府业务放缓", "AIP 变现低于预期"]
  }),
  profile({
    symbol: "TSLA", name: "Tesla", theme: "自动驾驶 / 机器人", category: "robotics", layer: "整车 / FSD / 储能", role: "自动驾驶和机器人可选项，但车业务仍是基底",
    tags: ["FSD", "Robotaxi", "Energy"],
    factors: { demandInflection: 3, architectureCoupling: 4, chokepointSeverity: 2, supplierConcentration: 3, expansionDifficulty: 4, evidenceQuality: 3, valuationDisconnect: 1, catalystTiming: 4 },
    penalties: { hypeRisk: 5, governance: 2, cyclicality: 2 },
    alpha: { demand: 3, transmission: 3, purity: 3, elasticity: 4, neglect: 1, verification: 3, risk: 5 },
    bayes: [4, 10, 28, 34, 20, 4],
    valuation: { forwardPE: 70, epsCagr: 28, revenueCagr: 14, runwayYears: 8, qualityFactor: 0.78, impliedGrowth: 50, revisionScore: 48, fundamentalSpeed: 12, corpus: 40 },
    evidence: [["Strong", "交付、汽车毛利和储能收入可核验"], ["Weak", "Robotaxi/机器人估值仍需里程碑证据"]],
    checks: ["汽车毛利率", "FSD 监管和付费率", "储能 margin"],
    weaken: ["车业务继续降价", "自动驾驶里程碑延后", "估值只靠叙事"]
  })
];

const PORTFOLIO_COLORS = [
  "oklch(0.56 0.19 255)",
  "oklch(0.66 0.14 245)",
  "oklch(0.73 0.11 230)",
  "oklch(0.82 0.075 220)",
  "oklch(0.89 0.052 218)",
  "oklch(0.92 0.032 220)"
];

const COMPANY_DOMAINS = {
  SPY: "ssga.com",
  QQQ: "invesco.com",
  AAPL: "apple.com",
  AXP: "americanexpress.com",
  KO: "coca-colacompany.com",
  BAC: "bankofamerica.com",
  GOOGL: "google.com",
  GOOG: "google.com",
  QCOM: "qualcomm.com",
  CVX: "chevron.com",
  OXY: "oxy.com",
  CB: "chubb.com",
  MCO: "moodys.com",
  KHC: "kraftheinzcompany.com",
  NVDA: "nvidia.com",
  AMD: "amd.com",
  AMZN: "amazon.com",
  MSFT: "microsoft.com",
  PANW: "paloaltonetworks.com",
  CRWV: "coreweave.com",
  MRVL: "marvell.com",
  ASTS: "ast-science.com",
  DJT: "trumpmediagroup.com",
  BA: "boeing.com",
  AXON: "axon.com",
  BE: "bloomenergy.com",
  IREN: "iren.com",
  CORZ: "corescientific.com",
  APLD: "applieddigital.com",
  RIOT: "riotplatforms.com",
  CLSK: "cleanspark.com",
  SEI: "solaris-energy.com",
  BITF: "bitfarms.com",
  BTDR: "bitdeer.com",
  RDDT: "redditinc.com",
  NOW: "servicenow.com",
  SOXL: "direxion.com",
  SOXS: "direxion.com",
  AVGO: "broadcom.com",
  TSM: "tsmc.com",
  ANET: "arista.com",
  INTC: "intel.com",
  TSLA: "tesla.com",
  COIN: "coinbase.com",
  ROKU: "roku.com",
  SHOP: "shopify.com",
  CRSP: "crisprtx.com",
  "BRK-A": "berkshirehathaway.com",
  "BRK-B": "berkshirehathaway.com",
  BN: "brookfield.com",
  META: "meta.com",
  BABA: "alibabagroup.com",
  PACK: "ranpak.com",
  FIX: "comfortsystemsusa.com",
  CAT: "caterpillar.com",
  RGTI: "rigetti.com",
  NBIS: "nebius.com",
  SNDK: "sandisk.com",
  VRT: "vertiv.com",
  "SIVE.ST": "sivers-semiconductors.com",
  ASML: "asml.com",
  MU: "micron.com",
  LRCX: "lamresearch.com",
  UBER: "uber.com",
  QSR: "rbi.com",
  CMG: "chipotle.com",
  HLT: "hilton.com",
  PDD: "pddholdings.com",
  WM: "wm.com",
  CNI: "cn.ca",
  DE: "deere.com",
  ECL: "ecolab.com",
  WMT: "walmart.com",
  EWBC: "eastwestbank.com",
  CROX: "crocs.com",
  NTRA: "natera.com",
  INSM: "insmed.com",
  EWZ: "ishares.com",
  RSP: "invesco.com",
  YPF: "ypf.com",
  AA: "alcoa.com",
  MOH: "molinahealthcare.com",
  LULU: "lululemon.com",
  SLM: "salliemae.com",
  BRKR: "bruker.com",
  GEV: "gevernova.com",
  CPNG: "coupang.com",
  CPAY: "corpay.com",
  APP: "applovin.com",
  PSX: "phillips66.com",
  LUV: "southwest.com",
  HPE: "hpe.com",
  QRVO: "qorvo.com",
  KVUE: "kenvue.com",
  MTCH: "mtch.com",
  IEP: "ielp.com",
  CVI: "cvrenergy.com"
};

const PERSON_IMAGES = {
  buffett: "https://commons.wikimedia.org/wiki/Special:FilePath/Warren_Buffett_at_the_2015_SelectUSA_Investment_Summit_%28cropped%29.jpg?width=360",
  pelosi: "https://commons.wikimedia.org/wiki/Special:FilePath/Official_photo_of_Speaker_Nancy_Pelosi_in_2019.jpg?width=360",
  jensen: "https://commons.wikimedia.org/wiki/Special:FilePath/Jen-Hsun_Huang_2025.jpg?width=360",
  cathie: "https://commons.wikimedia.org/wiki/Special:FilePath/Cathie_Wood_ARK_Invest_Photo.jpg?width=360",
  duan: "https://img.i-scmp.com/cdn-cgi/image/fit%3Dcontain%2Cwidth%3D512%2Cformat%3Dauto/sites/default/files/d8/images/canvas/2026/04/17/ee19073f-7e4d-4908-a0b6-3e8c8f82f343_cb0c5d2e.jpg",
  soros: "https://opensocietyfoundations.imgix.net/uploads/6264e8c8-a29e-4794-b9a8-c063cf16a1e9/2013-george-soros-desk-3000.jpg?auto=format&fit=crop&crop=faces&w=360&h=360&q=75",
  greene: "https://www.congress.gov/img/member/g000596_200.jpg",
  trump: "https://commons.wikimedia.org/wiki/Special:FilePath/Donald_Trump_official_portrait_%282025%29.jpg?width=360",
  ackman: "https://commons.wikimedia.org/wiki/Special:FilePath/Bill_Ackman_%2827929603310%29.jpg?width=360",
  tepper: "https://www.tepperfoundation.org/uploads/david-p20-1.jpeg?_cchid=8c161b19281e800895535b1cf2a26328",
  gates: "https://commons.wikimedia.org/wiki/Special:FilePath/Bill_Gates_2018.jpg?width=360",
  lilu: "https://cdn.prod.website-files.com/5ef3c7300432b4eb48659917/68fa5947d6184e3b91deb2a7_Li_Lu0062_edit1_RELEASE2v2.jpg",
  duquesne: "wiki",
  burry: "wiki",
  leopold: "badge",
  coatue: "badge",
  tiger: "badge",
  "activist-radar": "badge"
};

const PORTFOLIOS = [
  {
    id: "serenity",
    name: "Serenity 持仓",
    owner: "Serenity research basket",
    type: "ai",
    sourceType: "synthetic",
    sourceName: "Serenity 本地模型",
    sourceFreshness: "本地模拟",
    avatar: "S",
    seedReturn: 88.88,
    note: "Serenity 框架模拟组合：二阶供应链、AI 基建、光互连、电力和卫星射频卡点。研究雷达，不是账户持仓。",
    holdings: [
      { symbol: "SIVE.ST", name: "Sivers", weight: 18.00 },
      { symbol: "CRWV", name: "CoreWeave", weight: 13.00 },
      { symbol: "NBIS", name: "Nebius", weight: 12.00 },
      { symbol: "VRT", name: "Vertiv", weight: 10.00 },
      { symbol: "ANET", name: "Arista", weight: 9.00 },
      { symbol: "AVGO", name: "博通", weight: 8.00 },
      { symbol: "TSM", name: "台积电", weight: 7.00 },
      { symbol: "NVDA", name: "英伟达", weight: 6.00 },
      { symbol: "MU", name: "美光", weight: 5.00 },
      { symbol: "ASML", name: "ASML", weight: 4.00 }
    ]
  },
  {
    id: "buffett",
    name: "巴菲特持仓",
    owner: "Berkshire Hathaway",
    type: "guru",
    sourceType: "official13f",
    sourceName: "SEC Form 13F",
    sourceFreshness: "季度滞后",
    sourceUrl: "https://www.sec.gov/edgar/browse/?CIK=1067983",
    avatar: "WB",
    seedReturn: 21.82,
    note: "高质量现金流与保险浮存金，偏长期复利。",
    holdings: [
      { symbol: "AAPL", name: "苹果", weight: 21.85, avg: 324.31 },
      { symbol: "AXP", name: "美国运通", weight: 14.49, avg: 368.20 },
      { symbol: "KO", name: "可口可乐", weight: 9.70, avg: 88.00 },
      { symbol: "BAC", name: "美国银行", weight: 8.47, avg: 61.32 },
      { symbol: "GOOGL", name: "谷歌-A", weight: 6.41, avg: 428.90 },
      { symbol: "CVX", name: "雪佛龙", weight: 4.89, avg: 218.50 },
      { symbol: "OXY", name: "西方石油", weight: 4.65, avg: 66.31 },
      { symbol: "CB", name: "安达保险", weight: 3.38, avg: 347.75 },
      { symbol: "MCO", name: "穆迪", weight: 3.36, avg: 537.71 },
      { symbol: "KHC", name: "卡夫亨氏", weight: 2.31, avg: 22.67 }
    ]
  },
  {
    id: "ackman",
    name: "阿克曼持仓",
    owner: "Pershing Square · Q1 2026 13F",
    type: "guru",
    sourceType: "official13f",
    sourceName: "Q1 2026 13F 摘要",
    sourceFreshness: "2026-03-31 持仓，2026-05 披露",
    sourceUrl: "https://valuesider.com/guru/bill-ackman-pershing-square-capital-management/portfolio",
    avatar: "BA",
    seedReturn: 42.00,
    note: "高集中度大仓，适合看平台、消费和利率敏感资产的仓位变化。13F 有季度滞后。",
    holdings: [
      { symbol: "BN", name: "Brookfield", weight: 17.62 },
      { symbol: "AMZN", name: "Amazon", weight: 17.39 },
      { symbol: "UBER", name: "Uber", weight: 15.71 },
      { symbol: "MSFT", name: "Microsoft", weight: 15.26 },
      { symbol: "QSR", name: "Restaurant Brands", weight: 12.20 },
      { symbol: "CMG", name: "Chipotle", weight: 7.80 },
      { symbol: "HLT", name: "Hilton", weight: 7.32 }
    ]
  },
  {
    id: "tepper",
    name: "泰珀持仓",
    owner: "Appaloosa · Q1 2026 13F",
    type: "guru",
    sourceType: "official13f",
    sourceName: "Q1 2026 13F 摘要",
    sourceFreshness: "2026-03-31 持仓，2026-05 披露",
    sourceUrl: "https://valuesider.com/guru/david-tepper-appaloosa-management/portfolio",
    avatar: "DT",
    seedReturn: 51.00,
    note: "AI 大盘、中概和半导体权重较高，更适合看顺周期风险偏好。13F 有季度滞后。",
    holdings: [
      { symbol: "BABA", name: "Alibaba", weight: 8.62 },
      { symbol: "AMZN", name: "Amazon", weight: 8.11 },
      { symbol: "NVDA", name: "NVIDIA", weight: 7.47 },
      { symbol: "GOOGL", name: "Alphabet-A", weight: 6.99 },
      { symbol: "PDD", name: "PDD Holdings", weight: 5.25 },
      { symbol: "TSM", name: "TSMC", weight: 5.15 },
      { symbol: "MU", name: "Micron", weight: 4.48 }
    ]
  },
  {
    id: "gates",
    name: "盖茨基金会持仓",
    owner: "Bill & Melinda Gates Foundation Trust · Q1 2026 13F",
    type: "guru",
    sourceType: "official13f",
    sourceName: "Q1 2026 13F 摘要",
    sourceFreshness: "2026-03-31 持仓，2026-05 披露",
    sourceUrl: "https://valuesider.com/guru/bill-gates-bill--melinda-gates-foundation-trust/portfolio",
    avatar: "BG",
    seedReturn: 24.00,
    note: "微软和基础设施/工业复利仓位更重，适合当低换手质量股对照组。13F 有季度滞后。",
    holdings: [
      { symbol: "MSFT", name: "Microsoft", weight: 31.97 },
      { symbol: "BRK-B", display: "BRK.B", name: "Berkshire-B", weight: 20.13 },
      { symbol: "WM", name: "Waste Management", weight: 17.39 },
      { symbol: "CNI", name: "Canadian National Railway", weight: 15.13 },
      { symbol: "CAT", name: "Caterpillar", weight: 5.61 },
      { symbol: "DE", name: "Deere", weight: 4.18 },
      { symbol: "ECL", name: "Ecolab", weight: 3.53 },
      { symbol: "WMT", name: "Walmart", weight: 1.30 }
    ]
  },
  {
    id: "lilu",
    name: "李录持仓",
    owner: "Himalaya Capital · Q1 2026 13F",
    type: "guru",
    sourceType: "official13f",
    sourceName: "Q1 2026 13F 摘要",
    sourceFreshness: "2026-03-31 持仓，2026-05 披露",
    sourceUrl: "https://www.dataroma.com/m/holdings.php?m=HC",
    avatar: "LL",
    seedReturn: 31.00,
    note: "长期集中、低换手，偏质量复利和中概互联网，适合跟踪集中度变化。13F 有季度滞后。",
    holdings: [
      { symbol: "GOOGL", name: "Alphabet-A", weight: 22.85 },
      { symbol: "GOOG", name: "Alphabet-C", weight: 21.97 },
      { symbol: "PDD", name: "PDD Holdings", weight: 14.71 },
      { symbol: "BRK-B", display: "BRK.B", name: "Berkshire-B", weight: 13.44 },
      { symbol: "EWBC", name: "East West Bancorp", weight: 9.26 },
      { symbol: "BAC", name: "Bank of America", weight: 4.57 },
      { symbol: "OXY", name: "Occidental", weight: 2.98 },
      { symbol: "CROX", name: "Crocs", weight: 2.30 }
    ]
  },
  {
    id: "duquesne",
    name: "德鲁肯米勒持仓",
    owner: "Duquesne Family Office · Q1 2026 13F",
    type: "guru",
    sourceType: "official13f",
    sourceName: "Q1 2026 13F 摘要",
    sourceFreshness: "2026-03-31 持仓，2026-05 披露",
    sourceUrl: "https://valuesense.io/superinvestors/duquesnefamily",
    avatar: "SD",
    seedReturn: 64.00,
    note: "宏观交易型大佬，仓位变化比静态仓位更重要。这里先放 Q1 2026 公开 13F 摘要，后续重点接新增/减仓。",
    holdings: [
      { symbol: "NTRA", name: "Natera", weight: 18.10 },
      { symbol: "INSM", name: "Insmed", weight: 5.60 },
      { symbol: "TSM", name: "TSMC", weight: 5.00 },
      { symbol: "EWZ", name: "iShares MSCI Brazil ETF", weight: 4.80 },
      { symbol: "RSP", name: "S&P 500 Equal Weight ETF", weight: 4.70 },
      { symbol: "YPF", name: "YPF", weight: 4.40 },
      { symbol: "AA", name: "Alcoa", weight: 3.30 }
    ]
  },
  {
    id: "burry",
    name: "Burry / Scion 持仓",
    owner: "Scion Asset Management · 最新公开 13F",
    type: "guru",
    sourceType: "official13f",
    sourceName: "Scion 13F 摘要",
    sourceFreshness: "最新公开口径，需看季度延迟",
    sourceUrl: "https://valuesider.com/guru/michael-burry-scion-asset-management/portfolio",
    avatar: "MB",
    seedReturn: 18.00,
    note: "逆向和事件驱动为主，持仓少、换仓快。只当风险偏好和反共识雷达，不当长期组合模板。",
    holdings: [
      { symbol: "MOH", name: "Molina Healthcare", weight: 46.89 },
      { symbol: "LULU", name: "Lululemon", weight: 19.78 },
      { symbol: "SLM", name: "Sallie Mae", weight: 14.05 },
      { symbol: "BRKR", name: "Bruker", weight: 19.28 }
    ]
  },
  {
    id: "coatue",
    name: "Coatue 持仓",
    owner: "Coatue Management · Q1 2026 13F",
    type: "guru",
    sourceType: "official13f",
    sourceName: "Q1 2026 13F 摘要",
    sourceFreshness: "2026-03-31 持仓，2026-05 披露",
    sourceUrl: "https://stockzoa.com/fund/coatue-management/",
    avatar: "CL",
    seedReturn: 57.00,
    note: "AI 基建和半导体链条浓度高，适合和供应链新闻、Reddit 热度交叉验证。",
    holdings: [
      { symbol: "TSM", name: "TSMC", weight: 10.80 },
      { symbol: "GEV", name: "GE Vernova", weight: 7.70 },
      { symbol: "LRCX", name: "Lam Research", weight: 7.40 },
      { symbol: "AMAT", name: "Applied Materials", weight: 6.20 },
      { symbol: "AVGO", name: "Broadcom", weight: 5.90 },
      { symbol: "ETN", name: "Eaton", weight: 5.80 },
      { symbol: "AMZN", name: "Amazon", weight: 5.70 },
      { symbol: "META", name: "Meta", weight: 5.50 },
      { symbol: "CEG", name: "Constellation Energy", weight: 4.50 },
      { symbol: "GOOGL", name: "Alphabet-A", weight: 4.30 },
      { symbol: "NVDA", name: "NVIDIA", weight: 3.80 }
    ]
  },
  {
    id: "tiger",
    name: "Tiger Global 持仓",
    owner: "Tiger Global · Q1 2026 13F",
    type: "guru",
    sourceType: "official13f",
    sourceName: "Q1 2026 13F 摘要",
    sourceFreshness: "2026-03-31 持仓，2026-05 披露",
    sourceUrl: "https://valuesider.com/guru/chase-coleman-tiger-global-management/portfolio",
    avatar: "TG",
    seedReturn: 49.00,
    note: "成长股和 AI 平台仓位更集中，适合看大盘科技风险偏好回暖还是退潮。",
    holdings: [
      { symbol: "GOOGL", name: "Alphabet-A", weight: 13.38 },
      { symbol: "NVDA", name: "NVIDIA", weight: 9.17 },
      { symbol: "AMZN", name: "Amazon", weight: 9.12 },
      { symbol: "TSM", name: "TSMC", weight: 8.23 },
      { symbol: "META", name: "Meta", weight: 7.73 },
      { symbol: "AVGO", name: "Broadcom", weight: 4.86 },
      { symbol: "GEV", name: "GE Vernova", weight: 3.72 },
      { symbol: "CPNG", name: "Coupang", weight: 2.86 }
    ]
  },
  {
    id: "activist-radar",
    name: "激进资金雷达",
    owner: "Elliott / Starboard / Icahn · 13D/13G",
    type: "activist",
    sourceType: "beneficial",
    sourceName: "13D/13G + 13F 事件雷达",
    sourceFreshness: "混合公开披露，需逐条回源",
    sourceUrl: "https://www.sec.gov/edgar/search/#/forms=SC%2013D%2CSC%2013G",
    avatar: "13D",
    seedReturn: 12.00,
    note: "这不是单一账户仓位，而是激进资金常见事件线索池：董事会、资产出售、回购、拆分和资本配置变化优先看。",
    holdings: [
      { symbol: "PSX", name: "Phillips 66", weight: 18.00 },
      { symbol: "LUV", name: "Southwest Airlines", weight: 12.00 },
      { symbol: "HPE", name: "HPE", weight: 10.00 },
      { symbol: "QRVO", name: "Qorvo", weight: 12.63 },
      { symbol: "KVUE", name: "Kenvue", weight: 10.31 },
      { symbol: "MTCH", name: "Match Group", weight: 8.93 },
      { symbol: "IEP", name: "Icahn Enterprises", weight: 48.49 },
      { symbol: "CVI", name: "CVR Energy", weight: 28.01 }
    ]
  },
  {
    id: "trump",
    name: "特朗普披露持仓",
    owner: "Donald J. Trump · OGE / 278-T disclosure radar",
    type: "government",
    sourceType: "oge",
    sourceName: "OGE 278-T / Open Cabinet 线索",
    sourceFreshness: "延迟披露，金额为区间",
    sourceUrl: "https://www.oge.gov/",
    avatar: "DT",
    seedReturn: 36.00,
    note: "这不是 13F 精确账户仓位，而是特朗普相关 OGE 财务披露、公开交易和政策敏感标的雷达。金额多为区间，先看日期和原文，再看股价反应。",
    holdings: [
      { symbol: "DJT", name: "Trump Media", weight: 28.00 },
      { symbol: "NVDA", name: "NVIDIA", weight: 13.00 },
      { symbol: "ORCL", name: "Oracle", weight: 12.00 },
      { symbol: "MSFT", name: "Microsoft", weight: 11.00 },
      { symbol: "BA", name: "Boeing", weight: 9.00 },
      { symbol: "DELL", name: "Dell", weight: 7.00 },
      { symbol: "INTC", name: "Intel", weight: 6.00 },
      { symbol: "AMD", name: "AMD", weight: 5.00 },
      { symbol: "MU", name: "Micron", weight: 4.00 },
      { symbol: "AXON", name: "Axon", weight: 3.00 }
    ]
  },
  {
    id: "pelosi",
    name: "佩洛西持仓",
    owner: "Congress disclosure model",
    type: "congress",
    sourceType: "congress",
    sourceName: "STOCK Act 披露",
    sourceFreshness: "延迟披露",
    sourceUrl: "https://www.capitoltrades.com/trades",
    avatar: "NP",
    seedReturn: 33.55,
    note: "大盘科技与期权披露线索，需单独核验交易日期。",
    holdings: [
      { symbol: "AAPL", name: "苹果", weight: 35.18 },
      { symbol: "GOOGL", name: "谷歌-A", weight: 19.37 },
      { symbol: "NVDA", name: "英伟达", weight: 14.20 },
      { symbol: "AMZN", name: "亚马逊", weight: 9.40 },
      { symbol: "MSFT", name: "微软", weight: 8.10 },
      { symbol: "PANW", name: "Palo Alto", weight: 5.35 }
    ]
  },
  {
    id: "jensen",
    name: "英伟达持仓",
    owner: "Founder/AI infra lens",
    type: "ai",
    sourceType: "synthetic",
    sourceName: "AI 产业镜头",
    sourceFreshness: "非真实账户",
    avatar: "JH",
    seedReturn: 66.53,
    note: "AI 算力、晶圆、云算力和加速互连的高 beta 组合。",
    holdings: [
      { symbol: "NVDA", name: "英伟达", weight: 64.84 },
      { symbol: "CRWV", name: "CoreWeave", weight: 13.09 },
      { symbol: "AVGO", name: "博通", weight: 6.80 },
      { symbol: "TSM", name: "台积电", weight: 5.90 },
      { symbol: "ANET", name: "Arista", weight: 4.25 },
      { symbol: "INTC", name: "英特尔", weight: 3.20 }
    ]
  },
  {
    id: "cathie",
    name: "木头姐持仓",
    owner: "ARK-style innovation",
    type: "guru",
    sourceType: "publicFund",
    sourceName: "ARK 公开基金持仓",
    sourceFreshness: "基金披露口径",
    sourceUrl: "https://ark-funds.com/funds/arkk/",
    avatar: "CW",
    seedReturn: 26.28,
    note: "高波动创新资产，胜率依赖利率、资金流和商业化节奏。",
    holdings: [
      { symbol: "TSLA", name: "特斯拉", weight: 8.00 },
      { symbol: "AMD", name: "AMD", weight: 5.47 },
      { symbol: "COIN", name: "Coinbase", weight: 5.10 },
      { symbol: "ROKU", name: "Roku", weight: 4.90 },
      { symbol: "SHOP", name: "Shopify", weight: 4.40 },
      { symbol: "CRSP", name: "CRISPR", weight: 3.60 }
    ]
  },
  {
    id: "duan",
    name: "段永平持仓",
    owner: "Quality compounder",
    type: "guru",
    sourceType: "manual",
    sourceName: "公开资料人工维护",
    sourceFreshness: "需回源核验",
    avatar: "DY",
    seedReturn: 29.91,
    note: "消费互联网、苹果生态与伯克希尔式长期配置。",
    holdings: [
      { symbol: "AAPL", name: "苹果", weight: 38.96 },
      { symbol: "BRK-A", display: "BRK.A", name: "伯克希尔-A", weight: 19.15 },
      { symbol: "GOOGL", name: "谷歌-A", weight: 8.50 },
      { symbol: "META", name: "Meta", weight: 5.80 },
      { symbol: "BABA", name: "阿里巴巴", weight: 5.10 }
    ]
  },
  {
    id: "soros",
    name: "索罗斯持仓",
    owner: "Soros Fund style",
    type: "guru",
    sourceType: "manual",
    sourceName: "13F/公开资料人工维护",
    sourceFreshness: "需回源核验",
    avatar: "GS",
    seedReturn: 113.43,
    note: "事件驱动和周期弹性更强，组合波动通常高于大盘。",
    holdings: [
      { symbol: "PACK", name: "Ranpak", weight: 11.63 },
      { symbol: "FIX", name: "Comfort Systems", weight: 7.91 },
      { symbol: "CAT", name: "卡特彼勒", weight: 6.30 },
      { symbol: "GOOG", name: "谷歌-C", weight: 5.40 },
      { symbol: "RGTI", name: "Rigetti", weight: 4.20 },
      { symbol: "TSLA", name: "特斯拉", weight: 3.70 }
    ]
  },
  {
    id: "greene",
    name: "玛乔丽·格林持仓",
    owner: "Congress disclosure model",
    type: "congress",
    sourceType: "congress",
    sourceName: "STOCK Act 披露",
    sourceFreshness: "延迟披露",
    sourceUrl: "https://www.congressstock.com/trades",
    avatar: "MG",
    seedReturn: 39.13,
    note: "国会议员披露只当线索，不能替代 13F 或公司基本面。",
    holdings: [
      { symbol: "AMD", name: "AMD", weight: 8.36 },
      { symbol: "NVDA", name: "英伟达", weight: 2.15 },
      { symbol: "AMZN", name: "亚马逊", weight: 6.50 },
      { symbol: "TSLA", name: "特斯拉", weight: 4.70 },
      { symbol: "META", name: "Meta", weight: 3.80 },
      { symbol: "GOOGL", name: "谷歌-A", weight: 3.20 }
    ]
  },
  {
    id: "ai-infra",
    name: "AI 基建持仓",
    owner: "Serenity synthetic basket",
    type: "ai",
    sourceType: "synthetic",
    sourceName: "Serenity 产业篮子",
    sourceFreshness: "非真实账户",
    avatar: "AI",
    seedReturn: 222.18,
    note: "云算力、存储、光互连和电力扩张，适合当二阶卡点观察清单。",
    holdings: [
      { symbol: "NBIS", name: "Nebius", weight: 27.76 },
      { symbol: "SNDK", name: "Sandisk", weight: 18.72 },
      { symbol: "CRWV", name: "CoreWeave", weight: 14.30 },
      { symbol: "VRT", name: "Vertiv", weight: 10.40 },
      { symbol: "ANET", name: "Arista", weight: 8.90 },
      { symbol: "SIVE.ST", name: "Sivers", weight: 6.80 }
    ]
  },
  {
    id: "leopold",
    name: "利奥波特持仓",
    owner: "Situational Awareness LP · Q1 2026 SEC 13F",
    type: "ai",
    sourceType: "official13f",
    sourceName: "SEC 13F-HR 原始表",
    sourceFreshness: "2026-03-31 持仓，2026-05-18 披露",
    sourceUrl: "https://www.sec.gov/Archives/edgar/data/2045724/000204572426000008/0002045724-26-000008-index.htm",
    avatar: "LA",
    seedReturn: 118.00,
    note: "Leopold Aschenbrenner 相关 Situational Awareness LP。SEC 13F 里股票、Call、Put 同时出现，本卡只按普通股多头价值估算权重；Put 只当风险/对冲线索。",
    holdings: [
      { symbol: "BE", name: "Bloom Energy", weight: 22.79 },
      { symbol: "SNDK", name: "SanDisk", weight: 18.79 },
      { symbol: "CRWV", name: "CoreWeave", weight: 14.42 },
      { symbol: "IREN", name: "IREN", weight: 10.40 },
      { symbol: "CORZ", name: "Core Scientific", weight: 10.09 },
      { symbol: "APLD", name: "Applied Digital", weight: 8.30 },
      { symbol: "RIOT", name: "Riot Platforms", weight: 3.69 },
      { symbol: "CLSK", name: "CleanSpark", weight: 2.71 },
      { symbol: "SEI", name: "Solaris Energy Infrastructure", weight: 1.62 },
      { symbol: "BITF", name: "Bitfarms", weight: 1.00 },
      { symbol: "BTDR", name: "Bitdeer", weight: 0.77 }
    ]
  }
];

function normalizeSymbolList(items, fallback = []) {
  const source = Array.isArray(items) && items.length ? items : fallback;
  const output = [];
  for (const item of source) {
    const symbol = String(item || "").trim().toUpperCase();
    if (!symbol || output.includes(symbol)) continue;
    output.push(symbol);
  }
  return output;
}

function loadStoredSymbolList(key, fallback) {
  try {
    return normalizeSymbolList(JSON.parse(localStorage.getItem(key)), fallback);
  } catch {
    return normalizeSymbolList([], fallback);
  }
}

function saveStoredSymbolList(key, symbols) {
  localStorage.setItem(key, JSON.stringify(normalizeSymbolList(symbols)));
}

function loadAlertRuleSettings() {
  const defaults = ALERT_RULES.reduce((acc, rule) => {
    acc[rule.id] = true;
    return acc;
  }, {});
  try {
    const parsed = JSON.parse(localStorage.getItem(ALERT_RULES_KEY));
    return { ...defaults, ...(parsed || {}) };
  } catch {
    return defaults;
  }
}

function loadPanelCollapseSettings() {
  try {
    const parsed = JSON.parse(localStorage.getItem(PANEL_COLLAPSE_KEY));
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function savePanelCollapseSettings() {
  localStorage.setItem(PANEL_COLLAPSE_KEY, JSON.stringify(state.collapsedPanels));
}

function applyPanelDefaultRevision() {
  if (localStorage.getItem(PANEL_DEFAULT_REV_KEY) === "1") return;
  Object.assign(state.collapsedPanels, {
    portfolioExposure: false,
    alertRules: true,
    dataHealth: true,
    events: true,
    catalysts: true,
    memo: true,
    evidence: true,
    risk: true,
    boundary: true,
    marketEnv: true,
    macro: true,
    session: true,
    compare: true,
    researchPack: false,
    monitor: true,
    framework: true
  });
  savePanelCollapseSettings();
  localStorage.setItem(PANEL_DEFAULT_REV_KEY, "1");
}

function saveAlertRuleSettings() {
  localStorage.setItem(ALERT_RULES_KEY, JSON.stringify(state.alertRules));
}

function applyTheme() {
  const theme = Object.prototype.hasOwnProperty.call(THEME_OPTIONS, state.theme) ? state.theme : "light";
  state.theme = theme;
  document.documentElement.dataset.theme = theme;
  document.body.dataset.theme = theme;
  localStorage.setItem(THEME_KEY, theme);
  el.themeButtons.forEach(button => {
    const active = button.dataset.themeChoice === theme;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
    button.setAttribute("aria-label", `切换到${THEME_OPTIONS[button.dataset.themeChoice] || "主题"}主题`);
  });
  if (state.currentChartData) requestAnimationFrame(() => drawChart(state.currentChartData));
}

const state = {
  activeSymbol: "SIVE.ST",
  range: "6mo",
  filter: "all",
  portfolioFilter: "all",
  activePortfolio: "serenity",
  viewMode: localStorage.getItem(VIEW_MODE_KEY) || "watch",
  theme: localStorage.getItem(THEME_KEY) || "light",
  watchlist: loadStoredSymbolList(WATCHLIST_KEY, DEFAULT_WATCHLIST).slice(0, 18),
  compareSymbols: loadStoredSymbolList(COMPARE_KEY, DEFAULT_COMPARE_SYMBOLS).slice(0, 4),
  alertRules: loadAlertRuleSettings(),
  collapsedPanels: loadPanelCollapseSettings(),
  newsStrictness: localStorage.getItem(NEWS_STRICTNESS_KEY) || "balanced",
  monitor: null,
  monitorLoading: false,
  monitorError: "",
  monitorToken: localStorage.getItem(MONITOR_TOKEN_KEY) || "",
  redditTrending: null,
  redditTrendingLoading: false,
  redditTrendingError: "",
  congressTrades: null,
  congressTradesLoading: false,
  congressTradesError: "",
  fredMacro: null,
  fredMacroLoading: false,
  fredMacroError: "",
  usdCny: null,
  usdCnyFetchedAt: null,
  quotes: new Map(),
  evidence: new Map(),
  loading: new Set(),
  currentChartData: null
};

const el = {
  marketClock: document.getElementById("marketClock"),
  brandSubtitle: document.getElementById("brandSubtitle"),
  viewModeButtons: [...document.querySelectorAll("button[data-view-mode]")],
  themeButtons: [...document.querySelectorAll("button[data-theme-choice]")],
  settingsToggle: document.getElementById("settingsToggle"),
  settingsPanel: document.getElementById("settingsPanel"),
  refreshButton: document.getElementById("refreshButton"),
  symbolInput: document.getElementById("symbolInput"),
  symbolSuggestions: document.getElementById("symbolSuggestions"),
  addSymbolButton: document.getElementById("addSymbolButton"),
  watchlistMeta: document.getElementById("watchlistMeta"),
  watchlistRows: document.getElementById("watchlistRows"),
  watchlistToggleButton: document.getElementById("watchlistToggleButton"),
  marketEnvMeta: document.getElementById("marketEnvMeta"),
  marketEnvironment: document.getElementById("marketEnvironment"),
  macroMeta: document.getElementById("macroMeta"),
  macroBoard: document.getElementById("macroBoard"),
  macroRefreshButton: document.getElementById("macroRefreshButton"),
  dailyBriefMeta: document.getElementById("dailyBriefMeta"),
  dailyBriefBoard: document.getElementById("dailyBriefBoard"),
  sessionModeMeta: document.getElementById("sessionModeMeta"),
  sessionModeBoard: document.getElementById("sessionModeBoard"),
  watchRadarMeta: document.getElementById("watchRadarMeta"),
  watchRadarBoard: document.getElementById("watchRadarBoard"),
  compareMeta: document.getElementById("compareMeta"),
  compareAddActive: document.getElementById("compareAddActive"),
  compareBoard: document.getElementById("compareBoard"),
  layerRanking: document.getElementById("layerRanking"),
  universeRows: document.getElementById("universeRows"),
  universeMeta: document.getElementById("universeMeta"),
  chinaSessionPanel: document.getElementById("chinaSessionPanel"),
  moverRadar: document.getElementById("moverRadar"),
  monitorMeta: document.getElementById("monitorMeta"),
  monitorStatusPill: document.getElementById("monitorStatusPill"),
  monitorRefreshButton: document.getElementById("monitorRefreshButton"),
  monitorTokenSetup: document.getElementById("monitorTokenSetup"),
  monitorTokenInput: document.getElementById("monitorTokenInput"),
  monitorTokenSave: document.getElementById("monitorTokenSave"),
  monitorSummary: document.getElementById("monitorSummary"),
  monitorBuyList: document.getElementById("monitorBuyList"),
  monitorPosts: document.getElementById("monitorPosts"),
  redditTrendingMeta: document.getElementById("redditTrendingMeta"),
  redditTrendingRefresh: document.getElementById("redditTrendingRefresh"),
  redditTrendingList: document.getElementById("redditTrendingList"),
  portfolioMeta: document.getElementById("portfolioMeta"),
  portfolioSourceAudit: document.getElementById("portfolioSourceAudit"),
  portfolioConsensus: document.getElementById("portfolioConsensus"),
  portfolioSpotlight: document.getElementById("portfolioSpotlight"),
  portfolioBoard: document.getElementById("portfolioBoard"),
  thirteenFQueue: document.getElementById("thirteenFQueue"),
  congressTradesMeta: document.getElementById("congressTradesMeta"),
  congressTradesRefresh: document.getElementById("congressTradesRefresh"),
  congressTradesBoard: document.getElementById("congressTradesBoard"),
  portfolioExposureMeta: document.getElementById("portfolioExposureMeta"),
  portfolioExposureList: document.getElementById("portfolioExposureList"),
  activeTicker: document.getElementById("activeTicker"),
  activeName: document.getElementById("activeName"),
  activeTheme: document.getElementById("activeTheme"),
  activeMeta: document.getElementById("activeMeta"),
  activePrice: document.getElementById("activePrice"),
  activeChange: document.getElementById("activeChange"),
  activeCny: document.getElementById("activeCny"),
  compositeScore: document.getElementById("compositeScore"),
  compositeVerdict: document.getElementById("compositeVerdict"),
  chinaActionStrip: document.getElementById("chinaActionStrip"),
  decisionMeta: document.getElementById("decisionMeta"),
  decisionBoard: document.getElementById("decisionBoard"),
  metricStrip: document.getElementById("metricStrip"),
  priceCanvas: document.getElementById("priceCanvas"),
  chartTooltip: document.getElementById("chartTooltip"),
  chartState: document.getElementById("chartState"),
  tradingViewLink: document.getElementById("tradingViewLink"),
  researchSummaryBox: document.getElementById("researchSummaryBox"),
  bottleneckScore: document.getElementById("bottleneckScore"),
  bottleneckBars: document.getElementById("bottleneckBars"),
  gfDmaScore: document.getElementById("gfDmaScore"),
  gfDmaBars: document.getElementById("gfDmaBars"),
  alphaScore: document.getElementById("alphaScore"),
  alphaBars: document.getElementById("alphaBars"),
  bayesianScore: document.getElementById("bayesianScore"),
  bayesianBars: document.getElementById("bayesianBars"),
  tamPegScore: document.getElementById("tamPegScore"),
  tamPegDetails: document.getElementById("tamPegDetails"),
  corpusScore: document.getElementById("corpusScore"),
  corpusDetails: document.getElementById("corpusDetails"),
  frameworkLedger: document.getElementById("frameworkLedger"),
  researchMemo: document.getElementById("researchMemo"),
  memoHorizon: document.getElementById("memoHorizon"),
  catalystCalendar: document.getElementById("catalystCalendar"),
  alertList: document.getElementById("alertList"),
  dataHealthMeta: document.getElementById("dataHealthMeta"),
  dataHealthList: document.getElementById("dataHealthList"),
  sourceHealthList: document.getElementById("sourceHealthList"),
  eventClusterMeta: document.getElementById("eventClusterMeta"),
  eventClusterList: document.getElementById("eventClusterList"),
  alertRulesMeta: document.getElementById("alertRulesMeta"),
  alertRulesList: document.getElementById("alertRulesList"),
  researchPackMeta: document.getElementById("researchPackMeta"),
  researchPackBoard: document.getElementById("researchPackBoard"),
  evidenceEventDigest: document.getElementById("evidenceEventDigest"),
  evidenceList: document.getElementById("evidenceList"),
  killSwitches: document.getElementById("killSwitches")
};

function applyViewMode() {
  const mode = ["watch", "research", "portfolio"].includes(state.viewMode) ? state.viewMode : "watch";
  state.viewMode = mode;
  document.body.dataset.viewMode = mode;
  localStorage.setItem(VIEW_MODE_KEY, mode);
  if (el.brandSubtitle) el.brandSubtitle.textContent = VIEW_MODE_META[mode];
  el.viewModeButtons.forEach(button => {
    const active = button.dataset.viewMode === mode;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  if (state.currentChartData) requestAnimationFrame(() => drawChart(state.currentChartData));
}

function panelCollapsedByDefault(config) {
  return state.collapsedPanels[config.key] ?? config.defaultCollapsed;
}

function setPanelCollapsed(config, collapsed) {
  state.collapsedPanels[config.key] = collapsed;
  savePanelCollapseSettings();
  applyPanelCollapseState(config);
}

function collapseToggleIcon() {
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>`;
}

function applyPanelCollapseState(config) {
  const panel = document.querySelector(config.selector);
  if (!panel) return;
  const collapsed = panelCollapsedByDefault(config);
  panel.classList.toggle("is-collapsed", collapsed);
  const button = panel.querySelector(`.panel-collapse-toggle[data-collapse-key="${config.key}"]`);
  if (button) {
    button.setAttribute("aria-expanded", String(!collapsed));
    button.setAttribute("title", collapsed ? "展开模块" : "收起模块");
    button.setAttribute("aria-label", collapsed ? "展开模块" : "收起模块");
  }
}

function setupPanelCollapsing() {
  COLLAPSIBLE_PANELS.forEach(config => {
    const panel = document.querySelector(config.selector);
    const head = panel?.querySelector(":scope > .section-head");
    if (!panel || !head || head.querySelector(`[data-collapse-key="${config.key}"]`)) return;
    panel.classList.add("is-collapsible");
    const button = document.createElement("button");
    button.type = "button";
    button.className = "panel-collapse-toggle";
    button.dataset.collapseKey = config.key;
    button.innerHTML = collapseToggleIcon();
    button.addEventListener("click", event => {
      event.stopPropagation();
      setPanelCollapsed(config, !panel.classList.contains("is-collapsed"));
    });
    head.appendChild(button);
    head.addEventListener("dblclick", () => setPanelCollapsed(config, !panel.classList.contains("is-collapsed")));
    applyPanelCollapseState(config);
  });
}

const fmtUsd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
const fmtCny = new Intl.NumberFormat("zh-CN", { style: "currency", currency: "CNY", maximumFractionDigits: 2 });
const fmtPct = new Intl.NumberFormat("zh-CN", { maximumFractionDigits: 2, minimumFractionDigits: 2 });
const fmtCompact = new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 });
const STRENGTH_LABELS = {
  Strong: "强证据",
  Medium: "中等线索",
  Weak: "弱线索",
  "Needs checking": "待核验"
};
const fmtDate = new Intl.DateTimeFormat("zh-CN", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", timeZone: "America/New_York" });
const fmtEvidenceDate = new Intl.DateTimeFormat("zh-CN", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  }[char]));
}

function formatEvidenceDate(value) {
  if (!value) return "日期待核验";
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const date = new Date(value);
  if (!Number.isNaN(date.valueOf())) return fmtEvidenceDate.format(date);
  return value;
}

function getProfile(symbol) {
  return UNIVERSE.find(item => item.symbol === symbol) || profile({
    symbol,
    name: symbol,
    theme: "自定义标的",
    category: "custom",
    layer: "待定位",
    role: "需要先做产业链定位",
    tags: ["待补充", "待核验"],
    factors: { demandInflection: 2, architectureCoupling: 2, chokepointSeverity: 1, supplierConcentration: 1, expansionDifficulty: 1, evidenceQuality: 1, valuationDisconnect: 2, catalystTiming: 1 },
    alpha: { demand: 2, transmission: 2, purity: 1, elasticity: 2, neglect: 2, verification: 1, risk: 3 },
    valuation: { forwardPE: 0, epsCagr: 0, revenueCagr: 0, runwayYears: 3, qualityFactor: 0.6, impliedGrowth: 0, revisionScore: 50, fundamentalSpeed: 8, corpus: 20 },
    evidence: [["Needs checking", "自定义标的需要先查 SEC、IR、财报电话会和客户证据"]],
    checks: ["定位产业链层级", "查收入分部", "查融资/稀释风险"],
    weaken: ["找不到收入证据", "只有主题叙事", "融资或治理风险过高"]
  });
}

async function fetchChart(symbol, range) {
  const key = `${symbol}:${range}`;
  if (state.quotes.has(key)) return state.quotes.get(key);
  state.loading.add(symbol);
  renderUniverse();
  renderWatchlist();
  renderWatchRadar();
  renderCompareBoard();
  renderDailyBrief();
  renderDataHealth();
  const res = await fetch(`/api/chart/${encodeURIComponent(symbol)}?range=${encodeURIComponent(range)}`);
  if (!res.ok) throw new Error(`行情服务返回 ${res.status}`);
  const payload = await res.json();
  if (payload.error) throw new Error(payload.error);
  const enriched = enrichPayload(payload);
  state.quotes.set(key, enriched);
  state.loading.delete(symbol);
  renderUniverse();
  renderWatchlist();
  renderWatchRadar();
  renderCompareBoard();
  renderDailyBrief();
  renderDataHealth();
  return enriched;
}

async function fetchEvidence(symbol, force = false) {
  const cached = state.evidence.get(symbol);
  if (!force && cached) {
    const cachedAt = Date.parse(cached.fetchedAt);
    const ttl = Number(cached.cacheTtlSeconds || 0) * 1000;
    const fresh = Number.isFinite(cachedAt) && ttl > 0 && Date.now() - cachedAt < ttl;
    const fallbackOnly = ttl === 0 || (cached.sources || []).some(source => source.name === "Live evidence" && source.status === "unavailable");
    if (fresh && !fallbackOnly) return cached;
  }
  try {
    const res = await fetch(`/api/evidence/${encodeURIComponent(symbol)}`);
    if (!res.ok) throw new Error(`evidence service returned ${res.status}`);
    const payload = await res.json();
    if (payload.error) throw new Error(payload.error);
    state.evidence.set(symbol, payload);
    return payload;
  } catch (error) {
    const fallback = {
      symbol,
      fetchedAt: new Date().toISOString(),
      cacheTtlSeconds: 0,
      items: [],
      counts: {},
      sources: [{ name: "Live evidence", status: "unavailable", count: 0, detail: error.message }]
    };
    state.evidence.set(symbol, fallback);
    return fallback;
  }
}

function redditRowsForUi() {
  return (state.redditTrending?.items || []).map(row => {
    const symbol = resolveInputSymbol(row.ticker || "");
    return {
      ...row,
      symbol,
      known: UNIVERSE.some(item => item.symbol === symbol),
      watched: state.watchlist.includes(symbol)
    };
  }).filter(row => row.symbol);
}

function redditTrendForSymbol(symbol) {
  const key = normalizeTickerKey(symbol);
  return redditRowsForUi().find(row => normalizeTickerKey(row.symbol) === key || normalizeTickerKey(row.ticker) === key) || null;
}

function redditMentionChange(row) {
  if (!row) return null;
  if (Number.isFinite(row.mentionChangePct)) return row.mentionChangePct;
  const mentions = Number(row.mentions);
  const previous = Number(row.mentions24hAgo);
  if (!Number.isFinite(mentions) || !Number.isFinite(previous) || previous <= 0) return null;
  return (mentions - previous) / previous * 100;
}

function redditTone(row) {
  const change = redditMentionChange(row);
  if (row?.rank <= 10 && Number.isFinite(change) && change >= 35) return "hot";
  if (Number.isFinite(change) && change >= 15) return "up";
  if (Number.isFinite(change) && change <= -20) return "down";
  return "steady";
}

function redditTrendLabel(row) {
  const tone = redditTone(row);
  if (tone === "hot") return "爆量";
  if (tone === "up") return "升温";
  if (tone === "down") return "回落";
  return "稳定";
}

const REDDIT_LOW_SIGNAL_SYMBOLS = new Set(["SPY", "QQQ", "IWM", "DIA", "VOO", "VTI", "TQQQ", "SQQQ", "SOXL", "SOXS", "TLT"]);

function redditIsHighSignal(row) {
  if (!row) return false;
  const symbol = normalizeTickerKey(row.symbol || row.ticker || "");
  const change = redditMentionChange(row);
  const rank = Number(row.rank) || 99;
  const mentions = Number(row.mentions) || 0;
  const boost = redditSignalBoost(row);
  if (row.watched) return true;
  if (row.known && boost >= 6) return true;
  if (redditTone(row) === "hot" && !REDDIT_LOW_SIGNAL_SYMBOLS.has(symbol)) return true;
  if (Number.isFinite(change) && change >= 45 && mentions >= 18 && !REDDIT_LOW_SIGNAL_SYMBOLS.has(symbol)) return true;
  if (rank <= 6 && !REDDIT_LOW_SIGNAL_SYMBOLS.has(symbol)) return true;
  return false;
}

function redditPanelRows(rows) {
  const highSignal = rows.filter(redditIsHighSignal);
  const fallback = rows.filter(row => !REDDIT_LOW_SIGNAL_SYMBOLS.has(normalizeTickerKey(row.symbol || row.ticker || "")));
  return (highSignal.length ? highSignal : fallback.length ? fallback : rows).slice(0, 5);
}

function redditChangeText(row) {
  const change = redditMentionChange(row);
  if (!Number.isFinite(change)) return "新上榜";
  return `${change >= 0 ? "+" : ""}${Math.round(change)}%`;
}

function redditSignalBoost(row) {
  if (!row) return 0;
  const mentions = Number(row.mentions) || 0;
  const upvotes = Number(row.upvotes) || 0;
  const change = redditMentionChange(row);
  const rankScore = Math.max(0, 11 - Math.min(Number(row.rank) || 99, 11)) * 0.42;
  const mentionScore = Math.min(Math.log10(mentions + 1) * 2.5, 5);
  const voteScore = Math.min(Math.log10(upvotes + 1) * 1.2, 3);
  const changeScore = Number.isFinite(change) ? clamp(change / 22, -2, 4) : 1;
  return Math.round(clamp(rankScore + mentionScore + voteScore + changeScore, 0, 10));
}

function openDiscoveredSymbol(symbol, name = "") {
  if (!symbol) return;
  const cleanSymbol = resolveInputSymbol(symbol);
  if (!UNIVERSE.some(item => item.symbol === cleanSymbol)) {
    const discovered = getProfile(cleanSymbol);
    discovered.name = canonicalStockName(cleanSymbol, name || discovered.name);
    discovered.theme = "Reddit 社区热度标的";
    discovered.layer = discovered.layer === "待定位" ? "外部热度线索，待产业链定位" : discovered.layer;
    discovered.tags = [...new Set([...(discovered.tags || []), "Reddit 24h 热度", "待核验"])];
    UNIVERSE.unshift(discovered);
  }
  selectSymbol(cleanSymbol);
}

function renderRedditTrending() {
  if (!el.redditTrendingList) return;
  const rows = redditRowsForUi();
  const source = state.redditTrending?.source;
  const fetched = state.redditTrending?.fetchedAt ? formatMonitorTime(state.redditTrending.fetchedAt) : "等待同步";
  const watchedHits = rows.filter(row => row.watched).length;
  if (el.redditTrendingMeta) {
    if (state.redditTrendingError) {
      el.redditTrendingMeta.textContent = `源暂不可用 · ${state.redditTrendingError}`;
    } else {
      el.redditTrendingMeta.textContent = `${source?.name || "美股狐狸缓存"} · ${rows.length || "--"} 只 · 自选命中 ${watchedHits} · ${fetched}`;
    }
  }
  if (el.redditTrendingRefresh) {
    el.redditTrendingRefresh.classList.toggle("active", state.redditTrendingLoading);
  }
  if (state.redditTrendingLoading && !rows.length) {
    el.redditTrendingList.innerHTML = `<div class="reddit-trending-empty">正在读取 Reddit 24h 热度榜。</div>`;
    return;
  }
  if (state.redditTrendingError && !rows.length) {
    el.redditTrendingList.innerHTML = `<div class="reddit-trending-empty">Reddit 热度源暂不可用：${escapeHtml(state.redditTrendingError)}</div>`;
    return;
  }
  const topRows = redditPanelRows(rows);
  if (!topRows.length) {
    el.redditTrendingList.innerHTML = `<div class="reddit-trending-empty">还没有热度数据，稍后自动刷新。</div>`;
    return;
  }
  const hiddenCount = Math.max(0, rows.length - topRows.length);
  el.redditTrendingList.innerHTML = `
    <div class="reddit-trending-summary">
      <strong>${escapeHtml(topRows[0].ticker)} 高信号社区热度</strong>
      <span>只露出自选命中 / 爆量 / 研究池强信号，已压下 ${hiddenCount} 条低信号噪音。</span>
    </div>
    ${topRows.map(row => {
      const displayName = displayNameWithZh(row.symbol, row.name || row.ticker);
      const tone = redditTone(row);
      const status = row.watched ? "自选" : row.known ? "研究池" : "外部";
      return `
        <button class="reddit-trending-row ${escapeHtml(tone)} ${row.symbol === state.activeSymbol ? "active" : ""}" data-reddit-symbol="${escapeHtml(row.symbol)}" data-reddit-name="${escapeHtml(row.name || "")}" type="button">
          <span class="reddit-rank">#${escapeHtml(row.rank || "-")}</span>
          ${visualToken({
            className: "reddit-logo",
            src: companyLogoUrl(row.symbol),
            fallback: row.symbol.slice(0, 2),
            alt: `${row.symbol} logo`
          })}
          <span class="reddit-main">
            <strong title="${escapeHtml(displayName)}">${escapeHtml(row.symbol)} <em>${escapeHtml(displayName)}</em></strong>
            <small>${escapeHtml(status)} · ${fmtCompact.format(row.mentions || 0)} 提及 · ${fmtCompact.format(row.upvotes || 0)} 赞</small>
          </span>
          <span class="reddit-change ${escapeHtml(tone)}">
            <strong>${escapeHtml(redditChangeText(row))}</strong>
            <em>${escapeHtml(redditTrendLabel(row))}</em>
          </span>
        </button>
      `;
    }).join("")}
    <a class="reddit-source-link" href="${escapeHtml(source?.url || "https://meiguhuli.com/")}" target="_blank" rel="noreferrer">打开美股狐狸完整榜单</a>
  `;
  [...el.redditTrendingList.querySelectorAll("[data-reddit-symbol]")].forEach(button => {
    button.addEventListener("click", () => openDiscoveredSymbol(button.dataset.redditSymbol, button.dataset.redditName || ""));
  });
}

async function fetchRedditTrending(force = false) {
  state.redditTrendingLoading = true;
  state.redditTrendingError = "";
  renderRedditTrending();
  try {
    const res = await fetch(`/api/reddit-trending${force ? "?force=1" : ""}`);
    if (!res.ok) throw new Error(`reddit trending service returned ${res.status}`);
    const payload = await res.json();
    if (payload.error) throw new Error(payload.error);
    state.redditTrending = payload;
  } catch (error) {
    state.redditTrendingError = error.message;
  } finally {
    state.redditTrendingLoading = false;
    renderRedditTrending();
    renderWatchRadar();
    renderDailyBrief();
    renderDataHealth();
    renderAlerts();
  }
}

function formatMonitorTime(value) {
  if (!value) return "时间待核";
  const date = new Date(value);
  if (Number.isNaN(date.valueOf())) return value;
  return fmtEvidenceDate.format(date);
}

function formatMonitorPrice(quote) {
  if (!quote || quote.error || !Number.isFinite(quote.price)) return "无报价";
  if (quote.currency === "USD") return fmtUsd.format(quote.price);
  return `${quote.currency || ""} ${new Intl.NumberFormat("zh-CN", { maximumFractionDigits: 2 }).format(quote.price)}`.trim();
}

function monitorMarketLabel(market) {
  if (market?.isTradable) return "美股常规盘中";
  const labels = {
    weekend: "周末休市",
    "pre-market": "盘前",
    "after-hours": "盘后",
    regular: "休市"
  };
  return labels[market?.reason] || market?.reason || "休市";
}

function monitorSourceLabel(source) {
  if (!source) return "未连接";
  if (source.status === "ok") return source.kind === "rss" ? "RSS 已连接" : "X API 已连接";
  if (source.status === "needs_token") return "等待 Token";
  return "源不可用";
}

function formatZoneTime(zone, now = new Date()) {
  return new Intl.DateTimeFormat("zh-CN", {
    timeZone: zone,
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23"
  }).format(now);
}

function zoneParts(zone, now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: zone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23"
  }).formatToParts(now).reduce((acc, part) => {
    acc[part.type] = part.value;
    return acc;
  }, {});
  return {
    weekday: parts.weekday,
    hour: Number(parts.hour) % 24,
    minute: Number(parts.minute)
  };
}

function clientMarketSession(now = new Date()) {
  const ny = zoneParts("America/New_York", now);
  const minutes = ny.hour * 60 + ny.minute;
  const weekend = ny.weekday === "Sat" || ny.weekday === "Sun";
  if (weekend) return { isTradable: false, label: "周末休市", tone: "closed" };
  if (minutes < 9 * 60 + 30) return { isTradable: false, label: "盘前", tone: "waiting" };
  if (minutes < 16 * 60) return { isTradable: true, label: "美股盘中", tone: "open" };
  return { isTradable: false, label: "盘后", tone: "closed" };
}

function marketForUi() {
  const market = state.monitor?.market;
  if (market) {
    return {
      isTradable: Boolean(market.isTradable),
      label: monitorMarketLabel(market),
      tone: market.isTradable ? "open" : market.reason === "pre-market" ? "waiting" : "closed",
      nextOpenAt: market.nextOpenAt
    };
  }
  return clientMarketSession();
}

function sessionModeForUi(now = new Date()) {
  const market = marketForUi();
  const ny = zoneParts("America/New_York", now);
  const minutes = ny.hour * 60 + ny.minute;
  const weekend = ny.weekday === "Sat" || ny.weekday === "Sun";
  if (weekend) {
    return {
      key: "weekend",
      tone: "closed",
      label: "周末复盘",
      headline: "少看价格，多补资料",
      note: "适合清理自选、读财报和更新降级条件。",
      tasks: ["补 SEC / 财报 / IR 原文", "整理下周催化剂", "删除低信号自选"]
    };
  }
  if (market.isTradable || (minutes >= 9 * 60 + 30 && minutes < 16 * 60)) {
    return {
      key: "regular",
      tone: "open",
      label: "盘中盯盘",
      headline: "先看雷达，再看价格位置",
      note: "只把证据和价格同时在线的标的放到前排。",
      tasks: ["盯自选雷达前 5 名", "核对 20DMA / RSI / 成交量", "喊单命中只当触发器"]
    };
  }
  if (minutes < 9 * 60 + 30) {
    return {
      key: "premarket",
      tone: "waiting",
      label: "盘前备战",
      headline: "先扫证据，不追盘口",
      note: "新闻、SEC、订单和财报优先，价格等开盘再确认。",
      tasks: ["读强证据和事件聚合", "把自选按催化剂排序", "标记盘中要看的价位"]
    };
  }
  return {
    key: "afterhours",
    tone: "closed",
    label: "盘后复盘",
    headline: "复盘今天，准备明天",
    note: "盘后重点是财报、监管文件、公司公告和风险闸门。",
    tasks: ["复盘异动原因", "更新证据可信度", "检查是否触发降级条件"]
  };
}

function renderSessionMode() {
  if (!el.sessionModeBoard) return;
  const mode = sessionModeForUi();
  const market = marketForUi();
  const env = marketEnvVerdict();
  if (el.sessionModeMeta) {
    el.sessionModeMeta.textContent = `${mode.label} · ${env.label} · 北京 ${formatZoneTime("Asia/Shanghai")}`;
  }
  el.sessionModeBoard.innerHTML = `
    <div class="session-primary ${escapeHtml(mode.tone)}">
      <span>${escapeHtml(mode.label)}</span>
      <strong>${escapeHtml(mode.headline)}</strong>
      <p>${escapeHtml(mode.note)}</p>
    </div>
    <div class="session-task-list">
      ${mode.tasks.map((task, idx) => `
        <div class="session-task">
          <em>${idx + 1}</em>
          <strong>${escapeHtml(task)}</strong>
        </div>
      `).join("")}
    </div>
    <div class="session-facts">
      <div><span>交易窗口</span><strong class="${escapeHtml(market.tone)}">${escapeHtml(market.label)}</strong></div>
      <div><span>新闻模式</span><strong>${escapeHtml(NEWS_STRICTNESS_LABELS[state.newsStrictness] || "均衡")}</strong></div>
      <div><span>自选数量</span><strong>${state.watchlist.length}</strong></div>
    </div>
  `;
}

function topImpactEvidence(liveEvidence = null) {
  return sortedEvidenceItems(liveEvidence)
    .filter(evidenceAllowedByStrictness)
    .map(item => ({ item, impact: newsImpact(item) }))
    .sort((a, b) => b.impact.score - a.impact.score || (b.item._rank || 0) - (a.item._rank || 0))[0] || null;
}

function renderDailyBrief() {
  if (!el.dailyBriefBoard) return;
  const market = marketForUi();
  const mode = sessionModeForUi();
  const env = marketEnvVerdict();
  const rows = watchRadarRows().slice(0, 6);
  const focusRows = rows.slice(0, 3);
  const impactRows = rows
    .map(row => ({ ...row, topImpact: topImpactEvidence(row.evidence) }))
    .filter(row => row.topImpact && row.topImpact.impact.score >= 45)
    .sort((a, b) => b.topImpact.impact.score - a.topImpact.impact.score)
    .slice(0, 1);
  const riskRows = rows
    .filter(row => ["closed", "waiting"].includes(row.decision.tone) || row.riskPenalty > 0)
    .slice(0, 1);
  const highImpactCount = rows.reduce((sum, row) => {
    const hit = topImpactEvidence(row.evidence);
    return sum + (hit?.impact.score >= 65 ? 1 : 0);
  }, 0);
  if (el.dailyBriefMeta) {
    el.dailyBriefMeta.textContent = `${mode.label} · ${env.label} · ${highImpactCount} 条中高影响线索`;
  }
  const headline = market.isTradable
    ? "盘中只看证据和价格同时命中的标的"
    : mode.key === "premarket"
      ? "开盘前先把证据和事件排好队"
      : "盘后先复盘硬证据，明天再看价格";
  const focusMarkup = focusRows.length ? focusRows.map(row => `
    <button class="brief-action-row" type="button" data-brief-symbol="${escapeHtml(row.symbol)}">
      <span>${escapeHtml(row.symbol)}</span>
      <strong>${escapeHtml(row.decision.label)}</strong>
      <em>${escapeHtml(row.reason.label)} · 雷达 ${row.radarScore}</em>
    </button>
  `).join("") : `<div class="brief-empty">自选还没准备好，先添加 3 到 6 个标的。</div>`;
  const impactMarkup = impactRows.length ? impactRows.map(row => {
    const hit = row.topImpact;
    return `
      <button class="brief-impact-row" type="button" data-brief-symbol="${escapeHtml(row.symbol)}">
        <span class="impact-badge ${escapeHtml(hit.impact.tone)}">${escapeHtml(hit.impact.label)} · ${hit.impact.score}</span>
        <strong>${escapeHtml(row.symbol)} · ${escapeHtml(evidenceTitleZh(hit.item))}</strong>
        <em>${escapeHtml(hit.impact.reason)}</em>
      </button>
    `;
  }).join("") : `<div class="brief-empty">暂无中高影响新闻，先看 SEC、IR 和事件聚合。</div>`;
  const riskMarkup = riskRows.length ? riskRows.map(row => `
    <button class="brief-risk-row" type="button" data-brief-symbol="${escapeHtml(row.symbol)}">
      <strong>${escapeHtml(row.symbol)}</strong>
      <span>${escapeHtml(row.decision.label)}</span>
      <em>${escapeHtml(row.decision.reason)}</em>
    </button>
  `).join("") : `<div class="brief-empty">当前没有明显风险闸门，仍需等证据和价格确认。</div>`;
  el.dailyBriefBoard.innerHTML = `
    <div class="daily-brief-hero slim ${escapeHtml(market.tone)}">
      <div>
        <span>${escapeHtml(mode.label)}</span>
        <strong>${escapeHtml(headline)}</strong>
        <p>${escapeHtml(env.note)}</p>
      </div>
      <div class="brief-hero-facts">
        <div><em>交易窗口</em><strong class="${escapeHtml(market.tone)}">${escapeHtml(market.label)}</strong></div>
        <div><em>自选就绪</em><strong>${rows.filter(row => row.chartData?.latest?.close).length}/${rows.length || state.watchlist.length}</strong></div>
        <div><em>高影响</em><strong>${highImpactCount}</strong></div>
      </div>
    </div>
    <div class="daily-brief-grid compact">
      <section class="daily-priority-section">
        <h3>今日必看</h3>
        ${focusMarkup}
      </section>
      <section class="daily-evidence-section">
        <h3>新证据 / 别追</h3>
        <div class="brief-mini-stack">
          ${impactMarkup}
          ${riskMarkup}
        </div>
      </section>
    </div>
  `;
  [...el.dailyBriefBoard.querySelectorAll("[data-brief-symbol]")].forEach(button => {
    button.addEventListener("click", () => openSymbol(button.dataset.briefSymbol));
  });
}

function formatCnyEstimate(data) {
  const close = data?.latest?.close;
  const currency = data?.meta?.currency;
  if (!Number.isFinite(close)) return "人民币估算待行情";
  if (currency !== "USD") return `${currency || "非美元"} 计价，不折人民币`;
  if (!Number.isFinite(state.usdCny)) return "人民币汇率载入中";
  return `约 ${fmtCny.format(close * state.usdCny)}`;
}

function updateActiveCny(chartData = null) {
  if (!el.activeCny) return;
  const data = chartData || state.quotes.get(`${state.activeSymbol}:${state.range}`) || state.quotes.get(`${state.activeSymbol}:1y`);
  el.activeCny.textContent = formatCnyEstimate(data);
}

function formatEnvValue(item, data) {
  const close = data?.latest?.close;
  if (!Number.isFinite(close)) return "--";
  const fmtNumber = new Intl.NumberFormat("zh-CN", { maximumFractionDigits: 2 });
  if (item.symbol === "^TNX") return `${(close > 20 ? close / 10 : close).toFixed(2)}%`;
  if (item.symbol === "^VIX") return close.toFixed(2);
  if (item.symbol === "USDCNY=X") return close.toFixed(4);
  if (item.symbol === "BTC-USD") return fmtUsd.format(close);
  return fmtNumber.format(close);
}

function macroToneClass(tone) {
  if (tone === "open") return "open";
  if (tone === "closed") return "closed";
  if (tone === "waiting") return "waiting";
  return "neutral";
}

function renderMacroPanel() {
  if (!el.macroBoard) return;
  const payload = state.fredMacro;
  const source = payload?.source;
  const verdict = payload?.verdict || { label: "等待 FRED", tone: "waiting", note: "宏观序列载入中。" };
  const items = payload?.items || [];
  if (el.macroRefreshButton) el.macroRefreshButton.classList.toggle("active", state.fredMacroLoading);
  if (el.macroMeta) {
    if (state.fredMacroError) {
      el.macroMeta.textContent = `源暂不可用 · ${state.fredMacroError}`;
    } else if (source?.status === "needs_key") {
      el.macroMeta.textContent = "等待 FRED_API_KEY · 默认折叠";
    } else {
      const fetched = payload?.fetchedAt ? formatMonitorTime(payload.fetchedAt) : "等待同步";
      el.macroMeta.textContent = `${verdict.label} · ${items.length || 0} 条官方序列 · ${fetched}`;
    }
  }
  if (state.fredMacroLoading && !payload) {
    el.macroBoard.innerHTML = `<div class="macro-empty">正在读取 FRED 官方宏观序列。</div>`;
    return;
  }
  if (source?.status === "needs_key") {
    el.macroBoard.innerHTML = `
      <div class="macro-empty">
        <strong>等待 FRED_API_KEY</strong>
        <span>配置后显示 10年美债、收益率曲线、CPI、失业率和信用利差。</span>
      </div>
    `;
    return;
  }
  if (state.fredMacroError && !items.length) {
    el.macroBoard.innerHTML = `<div class="macro-empty">FRED 暂不可用：${escapeHtml(state.fredMacroError)}</div>`;
    return;
  }
  if (!items.length) {
    el.macroBoard.innerHTML = `<div class="macro-empty">暂无宏观序列，稍后自动刷新。</div>`;
    return;
  }
  el.macroBoard.innerHTML = `
    <div class="macro-verdict ${escapeHtml(macroToneClass(verdict.tone))}">
      <span>${escapeHtml(verdict.label)}</span>
      <strong>${escapeHtml(verdict.note)}</strong>
    </div>
    <div class="macro-grid">
      ${items.map(item => `
        <div class="macro-item ${escapeHtml(macroToneClass(item.tone))}">
          <span>${escapeHtml(item.label)}</span>
          <strong>${escapeHtml(item.valueText || "--")}</strong>
          <em>${escapeHtml(item.deltaText || "--")} · ${escapeHtml(item.date || "待日期")}</em>
          <small>${escapeHtml(item.note || item.id)}</small>
        </div>
      `).join("")}
    </div>
  `;
}

async function fetchFredMacro(force = false) {
  state.fredMacroLoading = true;
  state.fredMacroError = "";
  renderMacroPanel();
  try {
    const res = await fetch(`/api/fred-macro${force ? "?force=1" : ""}`);
    if (!res.ok) throw new Error(`fred service returned ${res.status}`);
    const payload = await res.json();
    if (payload.error) throw new Error(payload.error);
    state.fredMacro = payload;
  } catch (error) {
    state.fredMacroError = error.message;
  } finally {
    state.fredMacroLoading = false;
    renderMacroPanel();
    renderDailyBrief();
    renderDataHealth();
  }
}

function marketEnvVerdict() {
  const qqq = state.quotes.get("^IXIC:1d");
  const sox = state.quotes.get("^SOX:1d");
  const vix = state.quotes.get("^VIX:1d");
  const tnx = state.quotes.get("^TNX:1d");
  const q = qqq?.changePct || 0;
  const s = sox?.changePct || 0;
  const v = vix?.changePct || 0;
  const y = tnx?.changePct || 0;
  if (q < -0.6 && s < -0.8 && v > 2) return { label: "科技盘偏弱", tone: "closed", note: "先降仓位冲动，等证据和价格一起确认" };
  if (q > 0.5 && s > 0.8 && v < 0) return { label: "风险偏好修复", tone: "open", note: "科技和半导体同向，适合看强证据标的" };
  if (v > 6 || y > 3) return { label: "波动升温", tone: "waiting", note: "VIX 或利率扰动明显，追涨要更谨慎" };
  return { label: "环境中性", tone: "waiting", note: "先按个股证据和价格位置排序" };
}

function renderMarketEnvironment() {
  if (!el.marketEnvironment) return;
  const verdict = marketEnvVerdict();
  if (el.marketEnvMeta) {
    el.marketEnvMeta.textContent = `${verdict.label} · ${verdict.note}`;
  }
  el.marketEnvironment.innerHTML = MARKET_ENV_SYMBOLS.map(item => {
    const data = state.quotes.get(`${item.symbol}:1d`);
    const cls = data?.changePct > 0 ? "positive" : data?.changePct < 0 ? "negative" : "flat";
    return `
      <div class="market-env-item">
        <span>${escapeHtml(item.label)}</span>
        <strong>${escapeHtml(formatEnvValue(item, data))}</strong>
        <em class="${cls}">${data ? formatSignedPct(data.changePct) : "载入中"}</em>
        <small>${escapeHtml(item.note)}</small>
      </div>
    `;
  }).join("");
  renderSessionMode();
  renderDataHealth();
}

function renderChinaSession() {
  const now = new Date();
  const market = marketForUi();
  const fxText = Number.isFinite(state.usdCny) ? `USD/CNY ${state.usdCny.toFixed(4)}` : "USD/CNY 载入中";
  if (el.marketClock) {
    el.marketClock.innerHTML = `
      <span>北京时间 ${escapeHtml(formatZoneTime("Asia/Shanghai", now))}</span>
      <span>纽约 ${escapeHtml(formatZoneTime("America/New_York", now))}</span>
      <strong class="${market.tone}">${escapeHtml(market.label)}</strong>
    `;
  }
  renderSessionMode();
  if (!el.chinaSessionPanel) return;
  const windowText = market.isTradable ? "常规盘可下单窗口" : "不在常规盘，先观察";
  const nextOpen = market.nextOpenAt ? formatZoneTime("Asia/Shanghai", new Date(market.nextOpenAt)) : "按纽约 09:30";
  el.chinaSessionPanel.innerHTML = `
    <div class="china-session-row">
      <span>北京时间</span>
      <strong>${escapeHtml(formatZoneTime("Asia/Shanghai", now))}</strong>
    </div>
    <div class="china-session-row">
      <span>美股窗口</span>
      <strong class="${market.tone}">${escapeHtml(windowText)}</strong>
    </div>
    <div class="china-session-row">
      <span>下次开盘</span>
      <strong>${escapeHtml(nextOpen)}</strong>
    </div>
    <div class="china-session-row">
      <span>汇率参考</span>
      <strong>${escapeHtml(fxText)}</strong>
    </div>
  `;
}

function renderChinaAction(p, scores, chartData) {
  if (!el.chinaActionStrip) return;
  const market = marketForUi();
  const score = scores?.composite || 0;
  const riskCount = Object.values(p.penalties || {}).filter(value => value >= 3).length;
  let action = "先不碰";
  let tone = "closed";
  let reason = "分数或证据不足，先别急着追";
  if (score >= 76 && riskCount === 0) {
    action = market.isTradable ? "重点盯盘" : "开盘再看";
    tone = market.isTradable ? "open" : "waiting";
    reason = "评分靠前，等价格和证据确认";
  } else if (score >= 64) {
    action = "放入观察";
    tone = "waiting";
    reason = "方向可跟踪，但还要等催化和证据";
  } else if (score >= 52) {
    action = "等证据";
    tone = "waiting";
    reason = "主题有看点，基本面或估值还没打穿";
  }
  if (riskCount >= 2) {
    action = "风险优先";
    tone = "closed";
    reason = "高风险项较多，先看风险闸门";
  }
  el.chinaActionStrip.innerHTML = `
    <div class="china-action-cell">
      <span>中文动作</span>
      <strong class="${tone}">${escapeHtml(action)}</strong>
      <em>${escapeHtml(reason)}</em>
    </div>
    <div class="china-action-cell">
      <span>交易窗口</span>
      <strong class="${market.tone}">${escapeHtml(market.label)}</strong>
      <em>${market.isTradable ? "常规盘内，仍需自己下判断" : "不是常规盘，不标记盘中命中"}</em>
    </div>
    <div class="china-action-cell">
      <span>人民币估算</span>
      <strong>${escapeHtml(formatCnyEstimate(chartData))}</strong>
      <em>仅美元计价股票显示折算</em>
    </div>
    <div class="china-action-cell">
      <span>适合中国用户</span>
      <strong>先看证据，再看价格</strong>
      <em>避免只按推特喊单追涨</em>
    </div>
  `;
}

async function fetchMonitor(force = false) {
  state.monitorLoading = true;
  state.monitorError = "";
  renderMonitor();
  try {
    const headers = {};
    if (state.monitorToken) headers.Authorization = `Bearer ${state.monitorToken}`;
    const res = await fetch(`/api/monitor/${encodeURIComponent(MONITOR_HANDLE)}${force ? "?force=1" : ""}`, { headers });
    if (!res.ok) throw new Error(`monitor service returned ${res.status}`);
    const payload = await res.json();
    if (payload.error) throw new Error(payload.error);
    state.monitor = payload;
  } catch (error) {
    state.monitorError = error.message;
  } finally {
    state.monitorLoading = false;
    renderMonitor();
  }
}

async function fetchFxRate() {
  try {
    const data = await fetchChart(USD_CNY_SYMBOL, "1d");
    const rate = data?.latest?.close;
    if (Number.isFinite(rate)) {
      state.usdCny = rate;
      state.usdCnyFetchedAt = new Date().toISOString();
    }
  } catch (error) {
    state.loading.delete(USD_CNY_SYMBOL);
  } finally {
    updateActiveCny();
    renderChinaSession();
    const activeData = state.quotes.get(`${state.activeSymbol}:${state.range}`) || state.quotes.get(`${state.activeSymbol}:1y`);
    if (activeData) {
      const p = getProfile(state.activeSymbol);
      renderChinaAction(p, scoreAll(p, state.quotes.get(`${state.activeSymbol}:1y`), state.evidence.get(state.activeSymbol)), activeData);
    }
  }
}

async function fetchMarketEnvironment(force = false) {
  if (force) {
    MARKET_ENV_SYMBOLS.forEach(item => state.quotes.delete(`${item.symbol}:1d`));
  }
  renderMarketEnvironment();
  await Promise.allSettled(MARKET_ENV_SYMBOLS.map(item => safeFetchChart(item.symbol, "1d")));
  const fx = state.quotes.get(`${USD_CNY_SYMBOL}:1d`)?.latest?.close;
  if (Number.isFinite(fx)) {
    state.usdCny = fx;
    state.usdCnyFetchedAt = new Date().toISOString();
    updateActiveCny();
  }
  renderMarketEnvironment();
  renderAlerts();
}

function renderMonitor() {
  if (!el.monitorSummary) return;
  const payload = state.monitor;
  const source = payload?.source;
  const market = payload?.market;
  const tickers = payload?.tickers || [];
  const sourceStatus = source?.status || (state.monitorError ? "unavailable" : "loading");
  const sourceClass = sourceStatus === "ok" ? "ok" : sourceStatus === "needs_token" ? "needs-token" : sourceStatus === "loading" ? "loading" : "unavailable";
  el.monitorStatusPill.className = `monitor-status-pill ${sourceClass}`;
  el.monitorStatusPill.textContent = state.monitorLoading ? "刷新中" : monitorSourceLabel(source);
  el.monitorMeta.textContent = `@${MONITOR_HANDLE} · ${market ? monitorMarketLabel(market) : "读取中"} · ${payload?.fetchedAt ? formatMonitorTime(payload.fetchedAt) : "等待同步"}`;
  renderChinaSession();
  renderAlerts();
  renderWatchRadar();
  renderSessionMode();
  renderDailyBrief();
  renderDataHealth();

  const needsToken = source?.status === "needs_token";
  if (el.monitorTokenSetup) el.monitorTokenSetup.hidden = false;
  if (el.monitorTokenInput && !el.monitorTokenInput.value) {
    el.monitorTokenInput.value = state.monitorToken;
  }

  if (state.monitorError) {
    el.monitorSummary.innerHTML = `<div class="monitor-empty">监控服务暂不可用：${escapeHtml(state.monitorError)}</div>`;
    el.monitorBuyList.innerHTML = "";
    el.monitorPosts.innerHTML = "";
    return;
  }

  const marketState = market?.isTradable ? "open" : "closed";
  const signalCount = tickers.length;
  const postCount = payload?.items?.length || 0;
  el.monitorSummary.innerHTML = `
    <div class="monitor-stat ${marketState}">
      <span>交易窗口</span>
      <strong>${escapeHtml(monitorMarketLabel(market))}</strong>
    </div>
    <div class="monitor-stat">
      <span>喊单标的</span>
      <strong>${signalCount}</strong>
    </div>
    <div class="monitor-stat">
      <span>命中推文</span>
      <strong>${postCount}</strong>
    </div>
    <div class="monitor-stat">
      <span>数据源</span>
      <strong>${escapeHtml(monitorSourceLabel(source))}</strong>
    </div>
  `;

  if (!payload && state.monitorLoading) {
    el.monitorBuyList.innerHTML = `<div class="monitor-empty">正在读取 @${MONITOR_HANDLE} 最新时间线</div>`;
    el.monitorPosts.innerHTML = "";
    return;
  }

  if (needsToken) {
    el.monitorBuyList.innerHTML = `<div class="monitor-empty">在右上角设置里配置 X Bearer Token 后开始读取公开时间线。也可以用环境变量 X_BEARER_TOKEN 启动服务。</div>`;
    el.monitorPosts.innerHTML = "";
    return;
  }

  if (source && source.status !== "ok") {
    el.monitorBuyList.innerHTML = `<div class="monitor-empty">${escapeHtml(source.detail || "数据源暂不可用")}</div>`;
    el.monitorPosts.innerHTML = "";
    return;
  }

  const title = market?.isTradable ? "开盘盯盘窗口内提及" : "未开盘观察队列";
  const rows = tickers.slice(0, 10);
  el.monitorBuyList.innerHTML = `
    <div class="monitor-list-title">
      <strong>${title}</strong>
      <span>${market?.isTradable ? "仅表示当前可交易时段命中，不是买入建议" : "开盘后再进入盯盘窗口"}</span>
    </div>
    ${rows.length ? rows.map(row => {
      const quote = row.quote || {};
      const changeCls = quote.changePct > 0 ? "positive" : quote.changePct < 0 ? "negative" : "flat";
      const displayName = displayNameWithZh(row.symbol, quote.name || SYMBOL_EN_NAMES[normalizeTickerKey(row.symbol)] || "");
      return `
        <button class="monitor-symbol-row" data-monitor-symbol="${escapeHtml(row.symbol)}" type="button">
          <div class="monitor-symbol-main">
            ${visualToken({
              className: "holding-logo",
              src: companyLogoUrl(row.symbol),
              fallback: row.symbol.slice(0, 2),
              alt: `${row.symbol} logo`
            })}
            <div>
              <strong title="${escapeHtml(displayName)}">${escapeHtml(row.symbol)} <span>${escapeHtml(displayName)}</span></strong>
              <em>${escapeHtml(formatMonitorPrice(quote))} · <b class="${changeCls}">${Number.isFinite(quote.changePct) ? formatSignedPct(quote.changePct) : "--"}</b></em>
            </div>
          </div>
          <div class="monitor-mention">
            <span>${row.mentions} 次提及</span>
            <strong>${market?.isTradable ? "窗口内" : "待开盘"}</strong>
          </div>
        </button>
      `;
    }).join("") : `<div class="monitor-empty">最近推文没有识别到 $Ticker。</div>`}
  `;

  [...el.monitorBuyList.querySelectorAll(".monitor-symbol-row")].forEach(button => {
    button.addEventListener("click", () => {
      const symbol = button.dataset.monitorSymbol;
      if (symbol && !UNIVERSE.some(item => item.symbol === symbol)) {
        UNIVERSE.unshift(getProfile(symbol));
      }
      if (symbol) selectSymbol(symbol);
    });
  });

  const posts = payload?.items || [];
  el.monitorPosts.innerHTML = posts.length ? `
    <div class="monitor-list-title compact">
      <strong>最新命中推文</strong>
      <span>${escapeHtml(formatMonitorTime(payload.fetchedAt))}</span>
    </div>
    ${posts.slice(0, 4).map(post => `
      <article class="monitor-post">
        <div class="monitor-post-head">
          <strong>${(post.symbols || []).map(symbol => `$${escapeHtml(symbol)}`).join(" ")}</strong>
          <a href="${escapeHtml(post.url)}" target="_blank" rel="noreferrer">打开 X</a>
        </div>
        <p>${escapeHtml(post.text)}</p>
        <span>${escapeHtml(formatMonitorTime(post.createdAt))}</span>
      </article>
    `).join("")}
  ` : "";
}

async function safeFetchChart(symbol, range) {
  try {
    return await fetchChart(symbol, range);
  } catch (error) {
    state.loading.delete(symbol);
    return null;
  }
}

function holdingTicker(holding) {
  return holding.display || holding.symbol.replace("-", ".");
}

function companyLogoUrl(symbol) {
  const domain = COMPANY_DOMAINS[symbol];
  return domain ? `/api/logo/${encodeURIComponent(symbol)}` : "";
}

function portfolioAvatarUrl(portfolio) {
  return PERSON_IMAGES[portfolio.id] ? `/api/person/${encodeURIComponent(portfolio.id)}` : "";
}

function visualToken({ className = "", src = "", fallback = "", alt = "" }) {
  const safeSrc = escapeHtml(src);
  const safeFallback = escapeHtml(fallback);
  const safeAlt = escapeHtml(alt || fallback);
  const failed = src ? "" : " image-failed";
  return `
    <span class="visual-token ${escapeHtml(className)}${failed}">
      ${src ? `<img src="${safeSrc}" alt="${safeAlt}" loading="lazy" referrerpolicy="no-referrer" onerror="this.parentElement.classList.add('image-failed')" />` : ""}
      <span class="visual-fallback">${safeFallback}</span>
    </span>
  `;
}

function formatSignedPct(value) {
  if (!Number.isFinite(value)) return "--";
  return `${value >= 0 ? "+" : ""}${fmtPct.format(value)}%`;
}

function formatPriceByCurrency(value, currency = "USD") {
  if (!Number.isFinite(value)) return "--";
  if (currency === "USD") return fmtUsd.format(value);
  if (currency === "CNY") return fmtCny.format(value);
  return `${currency} ${new Intl.NumberFormat("zh-CN", { maximumFractionDigits: 2 }).format(value)}`;
}

function formatHoldingPrice(data) {
  const close = data?.latest?.close;
  return formatPriceByCurrency(close, data?.meta?.currency || "USD");
}

function chartForSymbol(symbol, range = state.range) {
  return state.quotes.get(`${symbol}:${range}`)
    || state.quotes.get(`${symbol}:1y`)
    || state.quotes.get(`${symbol}:6mo`)
    || state.quotes.get(`${symbol}:3mo`)
    || state.quotes.get(`${symbol}:2y`)
    || state.quotes.get(`${symbol}:1d`)
    || null;
}

function tradingViewExchangeFromMeta(chartData) {
  const exchange = String(chartData?.meta?.exchange || "").toLowerCase();
  if (exchange.includes("nasdaq")) return "NASDAQ";
  if (exchange.includes("nyse")) return "NYSE";
  if (exchange.includes("amex") || exchange.includes("arca")) return "AMEX";
  if (exchange.includes("stockholm")) return "OMXSTO";
  return "NASDAQ";
}

function tradingViewSymbol(symbol, chartData = null) {
  const key = normalizeTickerKey(symbol);
  if (TRADINGVIEW_EXCHANGE_OVERRIDES[key]) return TRADINGVIEW_EXCHANGE_OVERRIDES[key];
  if (key.endsWith(".ST")) return `OMXSTO:${key.replace(".ST", "")}`;
  if (key.startsWith("^")) return key.replace("^", "");
  return `${tradingViewExchangeFromMeta(chartData)}:${key.replace("-", ".")}`;
}

function updateTradingViewLink(symbol = state.activeSymbol, chartData = null) {
  if (!el.tradingViewLink) return;
  const tvSymbol = tradingViewSymbol(symbol, chartData);
  el.tradingViewLink.href = `https://www.tradingview.com/chart/?symbol=${encodeURIComponent(tvSymbol)}`;
  el.tradingViewLink.title = `打开 TradingView：${tvSymbol}`;
  el.tradingViewLink.setAttribute("aria-label", `在 TradingView 打开 ${symbol}`);
  el.tradingViewLink.textContent = "TradingView";
}

function analysisForSymbol(symbol) {
  return state.quotes.get(`${symbol}:1y`) || chartForSymbol(symbol);
}

function changeClass(data) {
  return data?.changePct > 0 ? "positive" : data?.changePct < 0 ? "negative" : "flat";
}

function isWatchlisted(symbol = state.activeSymbol) {
  return state.watchlist.includes(symbol);
}

function watchlistReasonForSymbol(symbol, profileItem, chartData, scores, evidence) {
  const catalysts = catalystItems(profileItem, evidence).filter(item => item.strength !== "核验项").slice(0, 2);
  const riskCount = Object.values(profileItem.penalties || {}).filter(value => value >= 3).length;
  const monitorHit = (state.monitor?.tickers || []).find(row => row.symbol === symbol || row.symbol === symbol.replace(".ST", ""));
  const redditHit = redditTrendForSymbol(symbol);
  return watchRadarReason({ chartData, scores, evidence, catalysts, monitorHit, redditHit, riskCount });
}

function persistWatchlist() {
  saveStoredSymbolList(WATCHLIST_KEY, state.watchlist);
}

function persistCompareSymbols() {
  saveStoredSymbolList(COMPARE_KEY, state.compareSymbols);
}

function toggleWatchlist(symbol = state.activeSymbol) {
  const cleanSymbol = String(symbol || "").trim().toUpperCase();
  if (!cleanSymbol) return;
  if (state.watchlist.includes(cleanSymbol)) {
    state.watchlist = state.watchlist.filter(item => item !== cleanSymbol);
  } else {
    state.watchlist = [cleanSymbol, ...state.watchlist.filter(item => item !== cleanSymbol)].slice(0, 18);
  }
  persistWatchlist();
  renderWatchlist();
  renderWatchRadar();
  renderDailyBrief();
  renderDataHealth();
  fetchCongressTrades(false);
  if (state.watchlist.includes(cleanSymbol)) safeFetchChart(cleanSymbol, "1y").then(() => {
    renderWatchlist();
    renderWatchRadar();
    renderCompareBoard();
    renderDailyBrief();
    renderDataHealth();
  });
}

function renderWatchlist() {
  if (!el.watchlistRows) return;
  const symbols = normalizeSymbolList(state.watchlist).slice(0, 18);
  if (el.watchlistMeta) el.watchlistMeta.textContent = `${symbols.length} 个标的 · 本机保存`;
  if (el.watchlistToggleButton) {
    el.watchlistToggleButton.textContent = isWatchlisted() ? "移出当前" : "加入当前";
    el.watchlistToggleButton.setAttribute("aria-pressed", String(isWatchlisted()));
  }
  if (!symbols.length) {
    el.watchlistRows.innerHTML = `<div class="watchlist-empty">从搜索框打开标的后，点“加入当前”保存到本机自选。</div>`;
    return;
  }
  el.watchlistRows.innerHTML = symbols.map(symbol => {
    const profileItem = getProfile(symbol);
    const displayName = displayNameWithZh(symbol, profileItem.name);
    const chartData = chartForSymbol(symbol);
    const scores = scoreAll(profileItem, analysisForSymbol(symbol), state.evidence.get(symbol));
    const reason = watchlistReasonForSymbol(symbol, profileItem, chartData, scores, state.evidence.get(symbol));
    const loading = state.loading.has(symbol);
    const price = chartData?.latest?.close ? formatHoldingPrice(chartData) : loading ? "载入中" : "待行情";
    const change = chartData ? formatSignedPct(chartData.changePct) : "--";
    return `
      <div class="watchlist-row ${symbol === state.activeSymbol ? "active" : ""}">
        <button class="watchlist-main" data-watch-symbol="${escapeHtml(symbol)}" type="button">
          <span class="watchlist-ticker">${escapeHtml(symbol)}</span>
          <span class="watchlist-copy">
            <strong title="${escapeHtml(displayName)}">${escapeHtml(displayName)}</strong>
            <em>${escapeHtml(price)} · <b class="${changeClass(chartData)}">${escapeHtml(change)}</b></em>
            <small title="${escapeHtml(reason.detail)}">为什么：${escapeHtml(reason.label)} · ${escapeHtml(reason.detail)}</small>
          </span>
          <span class="watchlist-score"><strong>${scores.composite}</strong><em>${escapeHtml(verdict(scores.composite))}</em></span>
        </button>
        <button class="watchlist-remove" data-remove-watchlist="${escapeHtml(symbol)}" type="button" aria-label="移出 ${escapeHtml(symbol)}">×</button>
      </div>
    `;
  }).join("");
  [...el.watchlistRows.querySelectorAll("[data-watch-symbol]")].forEach(button => {
    button.addEventListener("click", () => openSymbol(button.dataset.watchSymbol));
  });
  [...el.watchlistRows.querySelectorAll("[data-remove-watchlist]")].forEach(button => {
    button.addEventListener("click", event => {
      event.stopPropagation();
      toggleWatchlist(button.dataset.removeWatchlist);
    });
  });
}

function watchRadarReason({ chartData, scores, evidence, catalysts, monitorHit, redditHit, riskCount }) {
  const evidenceSummaryData = evidenceSummary(evidence);
  const d20 = scores.gf?.details?.d20;
  if (monitorHit) return { label: "喊单命中", tone: "open", detail: `@${MONITOR_HANDLE} 提到 ${monitorHit.mentions || 1} 次` };
  if (evidenceSummaryData.score >= 48 || evidenceSummaryData.strong > 0) return { label: "证据升温", tone: "open", detail: `${evidenceSummaryData.strong} 强 / ${evidenceSummaryData.medium} 中` };
  if (redditSignalBoost(redditHit) >= 7) return { label: "Reddit 升温", tone: "waiting", detail: `${redditHit.rank ? `#${redditHit.rank}` : "上榜"} · ${redditChangeText(redditHit)}` };
  if (scores.composite >= 68 && Number.isFinite(d20) && d20 <= 5 && d20 >= -8) return { label: "回踩接近", tone: "open", detail: `距 20DMA ${formatSignedPct(d20)}` };
  if (catalysts.length) return { label: "催化剂", tone: "waiting", detail: catalysts[0].title };
  if (Number.isFinite(chartData?.changePct) && Math.abs(chartData.changePct) >= 3.5) return { label: "价格异动", tone: chartData.changePct > 0 ? "open" : "waiting", detail: formatSignedPct(chartData.changePct) };
  if (riskCount >= 2) return { label: "风险升高", tone: "closed", detail: "先看降级条件" };
  return { label: "常规观察", tone: "waiting", detail: "等待硬证据或更好价格" };
}

function radarContributors(row) {
  const live = evidenceSummary(row.evidence);
  const d20 = row.scores.gf?.details?.d20;
  const parts = [
    { label: "研究", value: Math.round(row.scores.composite * 0.42), tone: "neutral" },
    { label: "证据", value: Math.round(live.score * 0.26), tone: live.score >= 45 ? "open" : "neutral" },
    { label: "异动", value: Math.round(Math.min(Math.abs(row.chartData?.changePct || 0) * 4.5, 18)), tone: Math.abs(row.chartData?.changePct || 0) >= 3.5 ? "waiting" : "neutral" }
  ];
  if (row.catalysts.length) parts.push({ label: "催化", value: row.catalysts.length * 6, tone: "open" });
  if (row.monitorHit) parts.push({ label: "喊单", value: 14, tone: "open" });
  if (row.redditBoost) parts.push({ label: "Reddit", value: row.redditBoost, tone: row.redditBoost >= 7 ? "waiting" : "neutral" });
  if (row.scores.composite >= 68 && Number.isFinite(d20) && d20 <= 5 && d20 >= -8) {
    parts.push({ label: "回踩", value: 12, tone: "open" });
  }
  if (row.riskPenalty > 0) parts.push({ label: "风险", value: -row.riskPenalty, tone: "closed" });
  return parts;
}

function watchRadarRows() {
  return normalizeSymbolList(state.watchlist).slice(0, 18).map(symbol => {
    const profileItem = getProfile(symbol);
    const chartData = chartForSymbol(symbol);
    const analysisData = analysisForSymbol(symbol);
    const evidence = state.evidence.get(symbol);
    const scores = scoreAll(profileItem, analysisData, evidence);
    const catalysts = catalystItems(profileItem, evidence).filter(item => item.strength !== "核验项").slice(0, 2);
    const evidenceSummaryData = evidenceSummary(evidence);
    const riskCount = Object.values(profileItem.penalties || {}).filter(value => value >= 3).length;
    const monitorHit = (state.monitor?.tickers || []).find(row => row.symbol === symbol || row.symbol === symbol.replace(".ST", ""));
    const redditHit = redditTrendForSymbol(symbol);
    const d20 = scores.gf?.details?.d20;
    const rsi = Number.isFinite(analysisData?.rsi) ? analysisData.rsi : null;
    const dayMove = Math.abs(chartData?.changePct || 0);
    const pullbackBoost = scores.composite >= 68 && Number.isFinite(d20) && d20 <= 5 && d20 >= -8 ? 12 : 0;
    const catalystBoost = catalysts.length * 6;
    const monitorBoost = monitorHit ? 14 : 0;
    const redditBoost = redditSignalBoost(redditHit);
    const riskPenalty = riskCount * 5 + (Number.isFinite(rsi) && rsi >= 78 ? 6 : 0);
    const radarScore = Math.round(clamp(
      scores.composite * 0.42
      + evidenceSummaryData.score * 0.26
      + Math.min(dayMove * 4.5, 18)
      + pullbackBoost
      + catalystBoost
      + monitorBoost
      + redditBoost
      - riskPenalty,
      0,
      100
    ));
    return {
      symbol,
      profileItem,
      chartData,
      analysisData,
      evidence,
      scores,
      radarScore,
      reason: watchRadarReason({ chartData, scores, evidence, catalysts, monitorHit, redditHit, riskCount }),
      decision: decisionState(profileItem, scores, chartData, analysisData, evidence),
      catalysts,
      monitorHit,
      redditHit,
      redditBoost,
      riskPenalty,
      riskCount
    };
  }).sort((a, b) => b.radarScore - a.radarScore);
}

function renderWatchRadar() {
  if (!el.watchRadarBoard) return;
  const rows = watchRadarRows().slice(0, 8);
  const ready = rows.filter(row => row.chartData?.latest?.close).length;
  const redditHits = rows.filter(row => row.redditHit).length;
  if (el.watchRadarMeta) {
    el.watchRadarMeta.textContent = `${ready}/${rows.length || state.watchlist.length} 行情就绪 · Reddit命中 ${redditHits} · 证据、回踩、异动、催化剂综合排序`;
  }
  if (!rows.length) {
    el.watchRadarBoard.innerHTML = `<div class="watch-radar-empty">先把标的加入自选，这里会自动排出今天最该看的前排。</div>`;
    return;
  }
  el.watchRadarBoard.innerHTML = rows.map((row, idx) => {
    const price = row.chartData?.latest?.close ? formatHoldingPrice(row.chartData) : state.loading.has(row.symbol) ? "载入中" : "待行情";
    const rangeText = row.chartData ? formatSignedPct(row.chartData.rangeChange) : "--";
    const rsiText = Number.isFinite(row.analysisData?.rsi) ? Math.round(row.analysisData.rsi) : "--";
    const catalystText = row.catalysts[0]?.title || row.profileItem.checks?.[0] || "等下一条硬证据";
    const whyText = `${row.reason.label}：${row.reason.detail}`;
    const displayName = displayNameWithZh(row.symbol, row.profileItem.name);
    return `
      <button class="watch-radar-row ${row.symbol === state.activeSymbol ? "active" : ""}" data-watch-radar-symbol="${escapeHtml(row.symbol)}" type="button">
        <span class="radar-rank">${idx + 1}</span>
        <span class="radar-score"><strong>${row.radarScore}</strong><em>雷达分</em></span>
        <span class="radar-main">
          <strong title="${escapeHtml(displayName)}">${escapeHtml(row.symbol)} <em>${escapeHtml(displayName)}</em></strong>
          <small>${escapeHtml(catalystText)}</small>
        </span>
        <span class="radar-pill ${escapeHtml(row.reason.tone)}">${escapeHtml(row.reason.label)}</span>
        <span class="radar-metric radar-price"><em>现价</em><strong>${escapeHtml(price)}</strong></span>
        <span class="radar-metric radar-range"><em>区间</em><strong class="${changeClass(row.chartData)}">${escapeHtml(rangeText)}</strong></span>
        <span class="radar-metric radar-rsi"><em>RSI</em><strong>${escapeHtml(rsiText)}</strong></span>
        <span class="radar-action ${escapeHtml(row.decision.tone)}">${escapeHtml(row.decision.label)}</span>
        <span class="radar-explain">
          <strong>${escapeHtml(whyText)}</strong>
          <em>${radarContributors(row).map(part => `<i class="${escapeHtml(part.tone)}">${escapeHtml(part.label)} ${part.value >= 0 ? "+" : ""}${part.value}</i>`).join("")}</em>
        </span>
      </button>
    `;
  }).join("");
  [...el.watchRadarBoard.querySelectorAll("[data-watch-radar-symbol]")].forEach(button => {
    button.addEventListener("click", () => openSymbol(button.dataset.watchRadarSymbol));
  });
}

function isCompared(symbol = state.activeSymbol) {
  return state.compareSymbols.includes(symbol);
}

function toggleCompareSymbol(symbol = state.activeSymbol) {
  const cleanSymbol = String(symbol || "").trim().toUpperCase();
  if (!cleanSymbol) return;
  if (state.compareSymbols.includes(cleanSymbol)) {
    state.compareSymbols = state.compareSymbols.filter(item => item !== cleanSymbol);
  } else {
    state.compareSymbols = [cleanSymbol, ...state.compareSymbols.filter(item => item !== cleanSymbol)].slice(0, 4);
  }
  persistCompareSymbols();
  renderCompareBoard();
  renderDataHealth();
  if (state.compareSymbols.includes(cleanSymbol)) safeFetchChart(cleanSymbol, "1y").then(() => {
    renderCompareBoard();
    renderDataHealth();
  });
}

function compareEvidenceText(evidence) {
  const summary = evidenceSummary(evidence);
  if (summary.strong) return `${summary.strong} 强`;
  if (summary.medium) return `${summary.medium} 中`;
  if (summary.total) return `${summary.total} 条`;
  return "待证据";
}

function renderCompareBoard() {
  if (!el.compareBoard) return;
  const symbols = normalizeSymbolList(state.compareSymbols).slice(0, 4);
  if (el.compareMeta) el.compareMeta.textContent = `${symbols.length}/4 个标的 · 对比评分、证据和价格位置`;
  if (el.compareAddActive) {
    el.compareAddActive.textContent = isCompared() ? "移出对比" : "加入对比";
    el.compareAddActive.setAttribute("aria-pressed", String(isCompared()));
  }
  if (!symbols.length) {
    el.compareBoard.innerHTML = `<div class="compare-empty">把当前标的加入对比，适合在 NVDA / AVGO / QCOM / SIVE 之间快速排优先级。</div>`;
    return;
  }
  const rows = symbols.map(symbol => {
    const profileItem = getProfile(symbol);
    const chartData = chartForSymbol(symbol);
    const analysisData = analysisForSymbol(symbol);
    const evidence = state.evidence.get(symbol);
    const scores = scoreAll(profileItem, analysisData, evidence);
    const stateText = decisionState(profileItem, scores, chartData, analysisData, evidence);
    const rangeText = chartData ? formatSignedPct(chartData.rangeChange) : "--";
    const rsiText = Number.isFinite(analysisData?.rsi) ? Math.round(analysisData.rsi) : "--";
    const displayName = displayNameWithZh(symbol, profileItem.name);
    return `
      <div class="compare-row ${symbol === state.activeSymbol ? "active" : ""}">
        <button class="compare-open" data-compare-open="${escapeHtml(symbol)}" type="button">
          <strong>${escapeHtml(symbol)}</strong>
          <span title="${escapeHtml(displayName)}">${escapeHtml(displayName)}</span>
        </button>
        <div><em>优先级</em><strong>${scores.composite}</strong></div>
        <div><em>区间</em><strong class="${changeClass(chartData)}">${escapeHtml(rangeText)}</strong></div>
        <div><em>RSI</em><strong>${escapeHtml(rsiText)}</strong></div>
        <div><em>证据</em><strong>${escapeHtml(compareEvidenceText(evidence))}</strong></div>
        <div><em>动作</em><strong class="${escapeHtml(stateText.tone)}">${escapeHtml(stateText.label)}</strong></div>
        <button class="compare-remove" data-compare-remove="${escapeHtml(symbol)}" type="button" aria-label="移出 ${escapeHtml(symbol)}">移出</button>
      </div>
    `;
  }).join("");
  el.compareBoard.innerHTML = `
    <div class="compare-row compare-header">
      <span>标的</span><span>分数</span><span>区间</span><span>RSI</span><span>证据</span><span>动作</span><span></span>
    </div>
    ${rows}
  `;
  [...el.compareBoard.querySelectorAll("[data-compare-open]")].forEach(button => {
    button.addEventListener("click", () => openSymbol(button.dataset.compareOpen));
  });
  [...el.compareBoard.querySelectorAll("[data-compare-remove]")].forEach(button => {
    button.addEventListener("click", () => toggleCompareSymbol(button.dataset.compareRemove));
  });
}

function peersForProfile(p) {
  return UNIVERSE
    .filter(item => item.symbol !== p.symbol && item.category === p.category)
    .slice(0, 4)
    .map(item => item.symbol);
}

function revenueLens(p) {
  const tags = (p.tags || []).slice(0, 3).join(" / ");
  const categoryText = categoryLabel(p.category);
  if (p.symbol === "SIVE.ST") return "量产订单、设计导入、卫星终端和光互连项目能否转成收入。";
  if (p.category === "compute") return "数据中心收入、GPU/加速卡出货、客户 capex 和毛利率。";
  if (p.category === "memory") return "HBM 产能锁定、DRAM/NAND 价格、库存和毛利率。";
  if (p.category === "foundry") return "月度收入、先进制程、CoWoS/先进封装和客户订单。";
  if (p.category === "equipment") return "WFE 订单、backlog、出货节奏、区域收入和毛利率。";
  if (p.category === "power") return "数据中心电力需求、订单积压、交付周期和资本开支。";
  return `${categoryText} 业务里，优先查 ${tags || p.layer} 是否能进入收入和毛利率。`;
}

function competitorLens(p) {
  const peers = peersForProfile(p);
  if (peers.length) return `同层可先对比 ${peers.join(" / ")}，重点看谁更靠近卡点、谁证据更硬。`;
  return "本地同层样本较少，先找公开竞争对手、客户替代方案和相邻技术路线。";
}

function latestEvidenceForPack(liveEvidence = null) {
  const merged = primaryEvidenceRows(liveEvidence);
  if (merged.length) return merged.slice(0, 3);
  return sortedEvidenceItems(liveEvidence)
    .filter(evidenceAllowedByStrictness)
    .slice(0, 3);
}

function packStatusText(scores, evidence, stateText) {
  const live = evidenceSummary(evidence);
  if (stateText.label === "风险优先") return "先把风险闸门看完，再谈机会。";
  if (scores.composite >= 76 && live.score >= 42) return "可以进入深度调研队列，但仍要回到原文核验。";
  if (scores.composite >= 64) return "值得跟踪，下一步看证据能不能补强。";
  return "先当候选池，不要让低信号新闻占用注意力。";
}

function priceSetupText(scores, chartData, analysisData) {
  const d20 = scores.gf?.details?.d20;
  const rsi = Number.isFinite(analysisData?.rsi) ? Math.round(analysisData.rsi) : null;
  const move = Number.isFinite(chartData?.rangeChange) ? `区间${formatSignedPct(chartData.rangeChange)}` : "价格待行情";
  const dma = Number.isFinite(d20) ? `距20日线${formatSignedPct(d20)}` : "20日线待算";
  const rsiText = rsi === null ? "RSI待算" : `RSI ${rsi}`;
  return `${move}，${dma}，${rsiText}`;
}

function leadingEvidenceText(liveEvidence = null) {
  const item = latestEvidenceForPack(liveEvidence)[0];
  if (!item) return "暂无足够硬的新证据，先回到 SEC、IR、财报电话会和公司公告。";
  const merged = item._mergedCount > 1 ? `（${item._mergedCount} 个来源合并）` : "";
  return `${evidenceTitleZh(item)}${merged}`;
}

function smartMoneyTextForSymbol(symbol) {
  const rows = portfolioExposureRows(symbol);
  if (!rows.length) return "聪明钱样本暂无命中。";
  const top = rows.slice(0, 3).map(row => `${row.portfolio.name.replace("持仓", "")}${fmtPct.format(row.holding.weight)}%`).join(" / ");
  return `聪明钱命中 ${rows.length} 个组合：${top}。`;
}

function researchSummaryText(p, scores, chartData, analysisData, liveEvidence = null) {
  const stateText = decisionState(p, scores, chartData, analysisData, liveEvidence);
  const display = displayNameWithZh(p.symbol, p.name === p.symbol && chartData?.meta?.shortName ? chartData.meta.shortName : p.name);
  const evidence = evidenceSummary(liveEvidence);
  const topEvidence = leadingEvidenceText(liveEvidence);
  const price = priceSetupText(scores, chartData, analysisData);
  const checks = (p.checks || []).slice(0, 2).join("；") || "等待下一条官方证据";
  const weaken = (p.weaken || [])[0] || "证据失效或价格明显透支时降级";
  return `【${p.symbol} ${display}】当前结论：${stateText.label}，综合优先级 ${scores.composite}/100，实时证据 ${evidence.score}/100。核心逻辑：${p.role}；收入抓手看 ${revenueLens(p)} 最新证据：${topEvidence}。价格位置：${price}。${smartMoneyTextForSymbol(p.symbol)} 下一步等：${checks}。看错条件：${weaken}。`;
}

function copyText(text) {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text).catch(() => copyTextFallback(text));
  }
  return copyTextFallback(text);
}

function copyTextFallback(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  textarea.style.pointerEvents = "none";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  const ok = document.execCommand("copy");
  textarea.remove();
  return ok ? Promise.resolve() : Promise.reject(new Error("copy failed"));
}

function bindCopySummaryButton(container, text) {
  const button = container?.querySelector("[data-copy-research-summary]");
  if (!button) return;
  button.addEventListener("click", async () => {
    try {
      await copyText(text);
      button.textContent = "已复制";
      window.setTimeout(() => {
        button.textContent = "复制小结";
      }, 1400);
    } catch {
      const paragraph = container.querySelector("p");
      if (paragraph && window.getSelection) {
        const range = document.createRange();
        range.selectNodeContents(paragraph);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
      }
      button.textContent = "已选中";
      window.setTimeout(() => {
        button.textContent = "复制小结";
      }, 1600);
    }
  });
}

function renderResearchSummaryBox(p, scores, chartData, analysisData, liveEvidence = null) {
  if (!el.researchSummaryBox) return;
  const text = researchSummaryText(p, scores, chartData, analysisData, liveEvidence);
  el.researchSummaryBox.innerHTML = `
    <div class="research-summary-head">
      <div>
        <strong>中文调研小结</strong>
        <span>可直接复制到群里，买卖动作仍由你自己判断</span>
      </div>
      <button data-copy-research-summary type="button">复制小结</button>
    </div>
    <p>${escapeHtml(text)}</p>
  `;
  bindCopySummaryButton(el.researchSummaryBox, text);
}

function renderResearchPack(p, scores, chartData, analysisData, liveEvidence = null) {
  if (!el.researchPackBoard) return;
  const data = chartData || analysisData;
  const stateText = decisionState(p, scores, chartData, analysisData, liveEvidence);
  const evidenceItems = latestEvidenceForPack(liveEvidence);
  const peers = peersForProfile(p);
  const displayName = displayNameWithZh(p.symbol, p.name === p.symbol && chartData?.meta?.shortName ? chartData.meta.shortName : p.name);
  if (el.researchPackMeta) {
    el.researchPackMeta.textContent = `${p.symbol} · ${categoryLabel(p.category)} · ${packStatusText(scores, liveEvidence, stateText)}`;
  }
  const evidenceMarkup = evidenceItems.length ? evidenceItems.map(item => {
    const trust = evidenceTrust(item);
    return `
      <li>
        <strong>${escapeHtml(evidenceTitleZh(item))}</strong>
        <span>${escapeHtml(item.sourceZh || item.source || item.kindLabel || "来源")} · ${escapeHtml(trust.label)} ${trust.score}${item._mergedCount > 1 ? ` · ${item._mergedCount}源合并` : ""}</span>
      </li>
    `;
  }).join("") : `<li><strong>暂无足够硬的实时证据</strong><span>先查 SEC、IR、财报电话会和公司公告。</span></li>`;
  const drawdownText = Number.isFinite(data?.drawdown) ? `${fmtPct.format(data.drawdown)}%` : "--";
  const d20 = scores.gf?.details?.d20;
  const whyItems = [
    p.role,
    revenueLens(p),
    evidenceItems[0] ? `最新主线：${evidenceTitleZh(evidenceItems[0])}${evidenceItems[0]._mergedCount > 1 ? `（${evidenceItems[0]._mergedCount}源）` : ""}` : "最新主线：等待硬证据。"
  ];
  const waitItems = [
    `价格：${priceSetupText(scores, chartData, data)}`,
    ...((p.checks || []).slice(0, 2)),
    `看错：${(p.weaken || [])[0] || "证据失效或价格明显透支时降级"}`
  ].slice(0, 4);
  const summaryText = researchSummaryText(p, scores, chartData, data, liveEvidence);
  el.researchPackBoard.innerHTML = `
    <div class="research-three-step">
      <article class="research-step conclusion">
        <span>先结论</span>
        <strong class="${escapeHtml(stateText.tone)}">${escapeHtml(stateText.label)} · ${scores.composite}/100</strong>
        <p>${escapeHtml(stateText.reason)}</p>
        <button data-copy-research-summary type="button">复制小结</button>
      </article>
      <article class="research-step">
        <span>为什么看</span>
        <ul>${whyItems.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </article>
      <article class="research-step">
        <span>等什么</span>
        <ul>${waitItems.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </article>
    </div>
    <details class="research-pack-more">
      <summary>展开完整调研材料</summary>
      <div class="research-pack-summary">
        <div>
          <span>公司定位</span>
          <strong title="${escapeHtml(displayName)}">${escapeHtml(displayName)}</strong>
          <p>${escapeHtml(p.role)}</p>
        </div>
        <div>
          <span>调研状态</span>
          <strong class="${escapeHtml(stateText.tone)}">${escapeHtml(stateText.label)}</strong>
          <p>${escapeHtml(stateText.reason)}</p>
        </div>
      </div>
      <div class="research-pack-grid">
        <article>
          <span>收入抓手</span>
          <p>${escapeHtml(revenueLens(p))}</p>
        </article>
        <article>
          <span>产业链位置</span>
          <p>${escapeHtml(p.layer)}。核心问题是这层是不是扩张瓶颈，而不是主题热不热。</p>
        </article>
        <article>
          <span>对手 / 替代</span>
          <p>${escapeHtml(competitorLens(p))}</p>
          ${peers.length ? `<div class="pack-tags">${peers.map(symbol => `<button data-pack-peer="${escapeHtml(symbol)}" type="button">${escapeHtml(symbol)}</button>`).join("")}</div>` : ""}
        </article>
        <article>
          <span>价格位置</span>
          <p>区间涨跌 ${chartData ? formatSignedPct(chartData.rangeChange) : "--"}，20DMA 距离 ${Number.isFinite(d20) ? formatSignedPct(d20) : "--"}，最大回撤 ${drawdownText}。</p>
        </article>
        <article class="wide">
          <span>最近硬证据</span>
          <ul>${evidenceMarkup}</ul>
        </article>
        <article class="wide">
          <span>看错条件</span>
          <ul>${(p.weaken || []).slice(0, 3).map(item => `<li><strong>${escapeHtml(item)}</strong><span>触发后降低研究优先级。</span></li>`).join("")}</ul>
        </article>
      </div>
    </details>
  `;
  bindCopySummaryButton(el.researchPackBoard, summaryText);
  [...el.researchPackBoard.querySelectorAll("[data-pack-peer]")].forEach(button => {
    button.addEventListener("click", () => openSymbol(button.dataset.packPeer));
  });
}

function returnForData(data, days = 250) {
  const points = data?.points || [];
  if (points.length < 2) return null;
  const end = points.at(-1)?.close;
  const start = points[Math.max(0, points.length - days)]?.close;
  if (!Number.isFinite(end) || !Number.isFinite(start) || start <= 0) return null;
  return (end / start - 1) * 100;
}

function portfolioWeightedReturn(portfolio) {
  let weighted = 0;
  let weightSum = 0;
  let loaded = 0;
  const holdings = portfolio.holdings.map(holding => {
    const data = state.quotes.get(`${holding.symbol}:1y`);
    const ret250 = returnForData(data);
    if (Number.isFinite(ret250)) {
      loaded += 1;
      weighted += ret250 * holding.weight;
      weightSum += holding.weight;
    }
    return { ...holding, data, ret250 };
  });
  const liveReturn = weightSum ? weighted / weightSum : null;
  return {
    holdings,
    return250: Number.isFinite(liveReturn) ? liveReturn : portfolio.seedReturn,
    live: Number.isFinite(liveReturn),
    loaded,
    coverage: holdings.length ? loaded / holdings.length : 0,
    benchmark: returnForData(state.quotes.get("SPY:1y"))
  };
}

function portfoliosForFilter() {
  return PORTFOLIOS.filter(item => state.portfolioFilter === "all" || item.type === state.portfolioFilter);
}

function portfolioConsensusRows() {
  const rows = new Map();
  portfoliosForFilter().forEach(portfolio => {
    portfolio.holdings.forEach(holding => {
      const key = normalizeTickerKey(holding.symbol);
      const current = rows.get(key) || {
        symbol: holding.symbol,
        display: holdingTicker(holding),
        name: displayNameWithZh(holding.symbol, holding.name),
        totalWeight: 0,
        maxWeight: 0,
        portfolios: [],
        holding
      };
      current.totalWeight += holding.weight || 0;
      current.maxWeight = Math.max(current.maxWeight, holding.weight || 0);
      current.portfolios.push({ portfolio, holding });
      rows.set(key, current);
    });
  });
  return [...rows.values()]
    .map(row => {
      const data = state.quotes.get(`${row.symbol}:1y`) || chartForSymbol(row.symbol);
      return {
        ...row,
        count: row.portfolios.length,
        data,
        changePct: Number.isFinite(data?.changePct) ? data.changePct : null
      };
    })
    .sort((a, b) => (b.count - a.count) || (b.totalWeight - a.totalWeight) || (b.maxWeight - a.maxWeight))
    .slice(0, 10);
}

function portfolioExposureRows(symbol) {
  const key = normalizeTickerKey(symbol);
  return PORTFOLIOS.map(portfolio => {
    const stats = portfolioWeightedReturn(portfolio);
    const holding = stats.holdings.find(item => normalizeTickerKey(item.symbol) === key);
    return holding ? { portfolio, stats, holding } : null;
  })
    .filter(Boolean)
    .sort((a, b) => (b.holding.weight || 0) - (a.holding.weight || 0));
}

function renderPortfolioExposure(p) {
  if (!el.portfolioExposureList) return;
  const rows = portfolioExposureRows(p.symbol);
  const displayName = displayNameWithZh(p.symbol, p.name);
  if (el.portfolioExposureMeta) {
    el.portfolioExposureMeta.textContent = rows.length
      ? `${displayName} · ${rows.length} 个组合命中`
      : `${displayName} · 暂无组合命中`;
  }
  if (!rows.length) {
    el.portfolioExposureList.innerHTML = `
      <div class="portfolio-exposure-empty">
        当前聪明钱样本里没有这个票。可以先看证据和价格位置，再决定是否加入自选。
      </div>
    `;
    return;
  }
  el.portfolioExposureList.innerHTML = rows.slice(0, 7).map(row => {
    const { portfolio, stats, holding } = row;
    const cls = stats.return250 >= 0 ? "positive" : "negative";
    const retText = Number.isFinite(holding.ret250) ? formatSignedPct(holding.ret250) : "待行情";
    return `
      <button class="portfolio-exposure-row" data-exposure-portfolio="${escapeHtml(portfolio.id)}" type="button">
        ${visualToken({
          className: `exposure-avatar ${portfolio.id === "serenity" ? "serenity-avatar" : ""}`,
          src: portfolioAvatarUrl(portfolio),
          fallback: portfolio.avatar,
          alt: `${portfolio.name} avatar`
        })}
        <span>
          <strong>${escapeHtml(portfolio.name)}</strong>
          <em>${escapeHtml(portfolioTypeLabel(portfolio.type))} · 仓位 ${fmtPct.format(holding.weight || 0)}%</em>
        </span>
        <b class="${cls}">${formatSignedPct(stats.return250)}</b>
        <small>${escapeHtml(retText)}</small>
      </button>
    `;
  }).join("");
  [...el.portfolioExposureList.querySelectorAll("[data-exposure-portfolio]")].forEach(button => {
    button.addEventListener("click", () => {
      state.activePortfolio = button.dataset.exposurePortfolio;
      state.viewMode = "portfolio";
      applyViewMode();
      renderPortfolioBoard();
      window.scrollTo({ top: 0, behavior: window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ? "auto" : "smooth" });
    });
  });
}

function portfolioSeries(portfolio, days = 250) {
  const loaded = portfolio.holdings
    .map(holding => ({ holding, data: state.quotes.get(`${holding.symbol}:1y`) }))
    .filter(item => item.data?.points?.length >= 30);
  if (!loaded.length) return [];
  const length = Math.min(days, ...loaded.map(item => item.data.points.length));
  const startIdxs = loaded.map(item => item.data.points.length - length);
  return Array.from({ length }, (_, idx) => {
    let weighted = 0;
    let weightSum = 0;
    loaded.forEach((item, itemIdx) => {
      const points = item.data.points;
      const base = points[startIdxs[itemIdx]]?.close;
      const close = points[startIdxs[itemIdx] + idx]?.close;
      if (Number.isFinite(base) && base > 0 && Number.isFinite(close)) {
        weighted += ((close / base - 1) * 100) * item.holding.weight;
        weightSum += item.holding.weight;
      }
    });
    return weightSum ? weighted / weightSum : 0;
  });
}

function benchmarkSeries(days = 250) {
  const data = state.quotes.get("SPY:1y");
  const points = data?.points || [];
  if (points.length < 30) return [];
  const length = Math.min(days, points.length);
  const start = points.length - length;
  const base = points[start]?.close;
  if (!base) return [];
  return points.slice(start).map(point => (point.close / base - 1) * 100);
}

function sparklineSvg(series, benchmark) {
  const width = 360;
  const height = 120;
  const all = [...series, ...benchmark].filter(Number.isFinite);
  if (all.length < 2) return `<div class="portfolio-spark-empty">等待更多价格数据</div>`;
  const min = Math.min(...all);
  const max = Math.max(...all);
  const pad = 10;
  const scaleX = (idx, length) => pad + (idx / Math.max(1, length - 1)) * (width - pad * 2);
  const scaleY = value => {
    const span = Math.max(1, max - min);
    return height - pad - ((value - min) / span) * (height - pad * 2);
  };
  const path = values => values.map((value, idx) => `${idx === 0 ? "M" : "L"}${scaleX(idx, values.length).toFixed(1)},${scaleY(value).toFixed(1)}`).join(" ");
  const benchPath = benchmark.length > 1 ? `<path class="spark-benchmark" d="${path(benchmark)}" />` : "";
  return `
    <svg class="portfolio-sparkline" viewBox="0 0 ${width} ${height}" aria-label="组合收益曲线">
      <line x1="${pad}" x2="${width - pad}" y1="${scaleY(0).toFixed(1)}" y2="${scaleY(0).toFixed(1)}" />
      ${benchPath}
      <path class="spark-portfolio" d="${path(series)}" />
    </svg>
  `;
}

function donutGradient(holdings) {
  const total = holdings.reduce((sum, item) => sum + item.weight, 0) || 1;
  let cursor = 0;
  const stops = holdings.slice(0, 6).map((holding, idx) => {
    const start = cursor;
    const end = cursor + (holding.weight / total) * 100;
    cursor = end;
    const color = PORTFOLIO_COLORS[idx % PORTFOLIO_COLORS.length];
    return `${color} ${start.toFixed(2)}% ${end.toFixed(2)}%`;
  });
  if (cursor < 100) stops.push(`oklch(0.93 0.025 220) ${cursor.toFixed(2)}% 100%`);
  return `conic-gradient(${stops.join(", ")})`;
}

function enrichPayload(payload) {
  const points = payload.points || [];
  const closes = points.map(point => point.close).filter(Number.isFinite);
  const latest = points.at(-1) || {};
  const first = points[0] || {};
  const previousClose = points.at(-2)?.close || payload.meta?.previousClose || first.close;
  const change = latest.close && previousClose ? latest.close - previousClose : 0;
  const changePct = previousClose ? change / previousClose * 100 : 0;
  const rangeChange = latest.close && first.close ? (latest.close / first.close - 1) * 100 : 0;
  const sma20 = movingAverage(points, 20);
  const sma50 = movingAverage(points, 50);
  const sma100 = movingAverage(points, 100);
  const sma200 = movingAverage(points, 200);
  const atr = atr20(points);
  const returns = dailyReturns(closes);
  return {
    ...payload,
    latest,
    previousClose,
    change,
    changePct,
    rangeChange,
    sma20,
    sma50,
    sma100,
    sma200,
    atr20: atr,
    volatility: standardDeviation(returns) * Math.sqrt(252) * 100,
    drawdown: maxDrawdown(closes),
    rsi: calcRsi(closes, 14)
  };
}

function movingAverage(points, window) {
  return points.map((point, idx) => {
    if (idx < window - 1) return null;
    const slice = points.slice(idx - window + 1, idx + 1).map(item => item.close).filter(Number.isFinite);
    if (slice.length !== window) return null;
    return slice.reduce((sum, value) => sum + value, 0) / window;
  });
}

function atr20(points) {
  if (points.length < 21) return null;
  const ranges = [];
  for (let idx = 1; idx < points.length; idx += 1) {
    const p = points[idx];
    const prev = points[idx - 1];
    ranges.push(Math.max(p.high - p.low, Math.abs(p.high - prev.close), Math.abs(p.low - prev.close)));
  }
  return movingAverage(ranges.map((close, idx) => ({ close, high: close, low: close, volume: 0, time: points[idx + 1]?.time || 0 })), 20).at(-1);
}

function dailyReturns(closes) {
  const output = [];
  for (let idx = 1; idx < closes.length; idx += 1) {
    if (closes[idx - 1]) output.push((closes[idx] / closes[idx - 1]) - 1);
  }
  return output;
}

function standardDeviation(values) {
  if (!values.length) return 0;
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  return Math.sqrt(values.reduce((sum, value) => sum + ((value - mean) ** 2), 0) / values.length);
}

function maxDrawdown(closes) {
  let peak = closes[0] || 0;
  let worst = 0;
  for (const close of closes) {
    peak = Math.max(peak, close);
    if (peak) worst = Math.min(worst, (close / peak - 1) * 100);
  }
  return worst;
}

function calcRsi(closes, period) {
  if (closes.length <= period) return null;
  let gains = 0;
  let losses = 0;
  for (let idx = closes.length - period; idx < closes.length; idx += 1) {
    const diff = closes[idx] - closes[idx - 1];
    if (diff >= 0) gains += diff;
    else losses -= diff;
  }
  if (losses === 0) return 100;
  const rs = gains / losses;
  return 100 - (100 / (1 + rs));
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function lastNumber(items) {
  return [...items].reverse().find(Number.isFinite) || null;
}

function scoreBottleneck(p) {
  const raw = Object.entries(WEIGHTS).reduce((sum, [key, weight]) => sum + ((p.factors[key] || 0) / 5) * weight, 0);
  const penalty = Object.values(p.penalties || {}).reduce((sum, value) => sum + Number(value || 0) * 2, 0);
  const score = clamp(raw - penalty, 0, 100);
  return {
    score: Math.round(score),
    raw: Math.round(raw),
    penalty: Math.round(penalty),
    factors: p.factors
  };
}

function scoreAlpha(p) {
  const a = p.alpha;
  const positive = (a.demand || 0) * 16 + (a.transmission || 0) * 16 + (a.purity || 0) * 15 + (a.elasticity || 0) * 15 + (a.neglect || 0) * 12 + (a.verification || 0) * 16;
  const penalty = (a.risk || 0) * 8;
  return Math.round(clamp(positive / 5 - penalty, 0, 100));
}

function scoreBayesian(p) {
  const mids = [-5, 2.5, 8.5, 18.5, 37.5, 60];
  const posterior = p.bayes || [5, 10, 30, 35, 18, 2];
  const weightedGrowth = posterior.reduce((sum, prob, idx) => sum + prob * mids[idx], 0) / 100;
  const implied = p.valuation.impliedGrowth || weightedGrowth;
  const fomoPenalty = Math.max(0, implied - weightedGrowth) * 1.15;
  const structural = posterior[4] + posterior[5] * 1.2;
  const score = clamp(52 + (weightedGrowth - implied) * 1.6 + structural * 0.55 - fomoPenalty, 0, 100);
  return { score: Math.round(score), weightedGrowth, implied };
}

function scoreTamPeg(p) {
  const v = p.valuation;
  const runwayFactor = Math.sqrt(Math.max(1, v.runwayYears || 3) / 5);
  const adjustedGrowth = (v.epsCagr || 0) * runwayFactor * (v.qualityFactor || 0.8);
  const applicable = v.forwardPE > 0 && adjustedGrowth > 0;
  const tamPeg = applicable ? v.forwardPE / adjustedGrowth : null;
  let score = 45;
  if (!applicable) score = 38;
  else if (tamPeg < 0.5) score = 90;
  else if (tamPeg < 0.8) score = 82;
  else if (tamPeg < 1.2) score = 74;
  else if (tamPeg < 1.8) score = 62;
  else if (tamPeg < 2.5) score = 48;
  else score = 34;
  return { score, tamPeg, adjustedGrowth, runwayFactor };
}

function scoreGfDma(p, data) {
  if (!data?.points?.length) {
    return { score: 50, growthMatch: 50, divergence: 50, parallel: 50, revision: p.valuation.revisionScore || 55, details: {} };
  }
  const latest = data.latest.close;
  const sma20 = lastNumber(data.sma20);
  const sma50 = lastNumber(data.sma50);
  const sma100 = lastNumber(data.sma100);
  const sma200 = lastNumber(data.sma200);
  const slope50 = dmaSlope(data.sma50, 10);
  const fundamentalSpeed = p.valuation.fundamentalSpeed || Math.max(8, p.valuation.revenueCagr || 8);
  const ratio = fundamentalSpeed ? slope50 / fundamentalSpeed : 1;
  const growthMatch = ratioScore(ratio);
  const d20 = sma20 ? (latest / sma20 - 1) * 100 : 0;
  const d50 = sma50 ? (latest / sma50 - 1) * 100 : 0;
  const d100 = sma100 ? (latest / sma100 - 1) * 100 : 0;
  const d200 = sma200 ? (latest / sma200 - 1) * 100 : 0;
  const divergence = divergenceScore(d20, d50, d100, d200);
  const priceSlope5 = fiveDaySlope(data.points.map(point => point.close));
  const sma50Slope5 = fiveDaySlope(data.sma50.filter(Number.isFinite));
  const escape = sma50Slope5 ? priceSlope5 / sma50Slope5 : 1;
  const parallel = parallelScore(escape);
  const revision = p.valuation.revisionScore || 60;
  const score = Math.round(clamp(growthMatch * 0.40 + divergence * 0.25 + parallel * 0.20 + revision * 0.15, 0, 100));
  return { score, growthMatch, divergence, parallel, revision, details: { d20, d50, d100, d200, escape, ratio, slope50, fundamentalSpeed } };
}

function dmaSlope(sma, k) {
  const values = sma.filter(Number.isFinite);
  if (values.length <= k) return 0;
  const latest = values.at(-1);
  const past = values.at(-1 - k);
  return past ? ((latest - past) / past) * (63 / k) * 100 : 0;
}

function fiveDaySlope(values) {
  if (values.length < 6) return 0;
  return (values.at(-1) - values.at(-6)) / 5;
}

function ratioScore(ratio) {
  if (ratio >= 0.8 && ratio <= 1.3) return 92;
  if (ratio >= 0.5 && ratio < 0.8) return 78;
  if (ratio > 1.3 && ratio <= 2) return 70;
  if (ratio > 2) return 48;
  return 60;
}

function divergenceScore(d20, d50, d100, d200) {
  if (d20 > 20 || d50 > 30) return 38;
  if (d20 > 12) return 58;
  if (d20 > 5) return 72;
  if (d20 >= 0 && d20 <= 5 && d50 > -5) return 90;
  if (d20 < 0 && d50 > -8 && d100 > -5) return 84;
  if (d50 < -15 || d100 < -12 || d200 < -10) return 42;
  return 68;
}

function parallelScore(escape) {
  if (escape >= 0.8 && escape <= 1.2) return 94;
  if (escape > 1.2 && escape <= 1.8) return 80;
  if (escape > 1.8 && escape <= 2.5) return 58;
  if (escape > 2.5) return 34;
  if (escape >= 0 && escape < 0.5) return 50;
  if (escape < 0) return 40;
  return 66;
}

function evidenceSignal(liveEvidence) {
  const items = (liveEvidence?.items || []).filter(evidenceAllowedByStrictness);
  const counts = items.reduce((acc, item) => {
    const strength = item.strength || "Needs checking";
    acc[strength] = (acc[strength] || 0) + 1;
    const key = `${item.kind || "unknown"}:${strength}`;
    acc[key] = (acc[key] || 0) + 1;
    if (item.kind === "official" || item.kind === "official_wire") acc.official = (acc.official || 0) + 1;
    if (item.kind === "filing") acc.filing = (acc.filing || 0) + 1;
    if (["media", "supply_chain", "fast_media", "china_market", "yahoo_finance"].includes(item.kind)) acc.media = (acc.media || 0) + 1;
    return acc;
  }, {});
  const newestTs = Math.max(0, ...items.map(item => {
    const value = Date.parse(item.date);
    return Number.isFinite(value) ? value : 0;
  }));
  const ageDays = newestTs ? Math.max(0, (Date.now() - newestTs) / 86400000) : null;
  let recency = 0;
  if (ageDays != null) {
    if (ageDays <= 2) recency = 16;
    else if (ageDays <= 14) recency = 10;
    else if (ageDays <= 60) recency = 5;
  }
  const mediaCount = Math.min(counts.media || 0, 3);
  const raw =
    (counts["official:Strong"] || 0) * 24 +
    (counts["filing:Strong"] || 0) * 20 +
    (counts["official_wire:Strong"] || 0) * 18 +
    (counts["supply_chain:Strong"] || 0) * 16 +
    (counts["fast_media:Strong"] || 0) * 11 +
    (counts["official:Medium"] || 0) * 14 +
    (counts["filing:Medium"] || 0) * 10 +
    (counts["official_wire:Medium"] || 0) * 11 +
    (counts["supply_chain:Medium"] || 0) * 9 +
    (counts["fast_media:Medium"] || 0) * 6 +
    mediaCount * 5 +
    (counts.Weak || 0) * 2 +
    recency;
  return {
    score: Math.round(clamp(raw, 0, 100)),
    counts,
    ageDays,
    newestTs,
    sourceCount: liveEvidence?.sources?.filter(source => source.status === "ok").length || 0
  };
}

function scoreAll(p, data, liveEvidence = null) {
  const bottleneck = scoreBottleneck(p);
  const gf = scoreGfDma(p, data);
  const alpha = scoreAlpha(p);
  const bayesian = scoreBayesian(p);
  const tam = scoreTamPeg(p);
  const live = evidenceSignal(liveEvidence);
  const baseCorpus = p.valuation.corpus || 35;
  const corpus = Math.round(clamp(Math.max(baseCorpus, live.score * 0.86 + baseCorpus * 0.14), 0, 100));
  const composite = Math.round(
    bottleneck.score * 0.25 +
    gf.score * 0.20 +
    alpha * 0.18 +
    bayesian.score * 0.15 +
    tam.score * 0.12 +
    corpus * 0.10
  );
  return { composite, bottleneck, gf, alpha, bayesian, tam, corpus, live };
}

function verdict(score) {
  if (score >= 82) return "优先研究";
  if (score >= 72) return "重点跟踪";
  if (score >= 62) return "可观察";
  if (score >= 50) return "先补证据";
  return "低优先级";
}

function visibleUniverse() {
  return UNIVERSE.filter(item => {
    if (state.filter === "scarce") return scoreBottleneck(item).score >= 70;
    if (state.filter === "power") return item.category === "power";
    if (state.filter === "risk") return Object.values(item.penalties || {}).some(v => v >= 3);
    return true;
  }).sort((a, b) => {
    const da = state.quotes.get(`${a.symbol}:1y`);
    const db = state.quotes.get(`${b.symbol}:1y`);
    return scoreAll(b, db, state.evidence.get(b.symbol)).composite - scoreAll(a, da, state.evidence.get(a.symbol)).composite;
  });
}

function renderLayerRanking() {
  const groups = new Map();
  for (const item of UNIVERSE) {
    const current = groups.get(item.category) || { label: categoryLabel(item.category), total: 0, count: 0 };
    current.total += scoreBottleneck(item).score;
    current.count += 1;
    groups.set(item.category, current);
  }
  const rows = [...groups.values()].map(group => ({ ...group, score: Math.round(group.total / group.count) }))
    .sort((a, b) => b.score - a.score);
  el.layerRanking.innerHTML = rows.map(row => `
    <div class="layer-row">
      <strong>${row.label}</strong>
      <div class="mini-track"><div class="mini-fill" style="width:${row.score}%"></div></div>
      <span>${row.score}</span>
    </div>
  `).join("");
}

function categoryLabel(category) {
  return {
    compute: "算力芯片",
    interconnect: "互连网络",
    foundry: "代工封装",
    equipment: "半导体设备",
    memory: "存储",
    optical: "光通信",
    satcom: "卫星射频",
    power: "电力散热",
    server: "服务器",
    platform: "平台云",
    software: "AI 软件",
    robotics: "机器人"
  }[category] || category;
}

function isLowValueEvidence(item) {
  const text = `${item?.title || ""} ${item?.summary || ""} ${item?.source || ""}`.toLowerCase();
  return [
    "law firm",
    "shareholder alert",
    "class action",
    "securities class action",
    "investors to inquire",
    "encourages",
    "insider",
    "sold shares",
    "sells shares",
    "analyst target",
    "sparks rally",
    "under scrutiny"
  ].some(pattern => text.includes(pattern));
}

function isTrustedIndustryEvidence(item) {
  const text = `${item?.title || ""} ${item?.summary || ""} ${item?.source || ""}`;
  const materialPattern = /order|contract|deal|partnership|collaboration|production|supply|shipment|revenue|guidance|earnings|backlog|hbm|foundry|data center|customer/i;
  const trustedPattern = /thelec|semiwiki|semiengineering|digitimes|ee times|tom's hardware|anandtech|nasdaq|business wire|globenewswire|pr newswire|reuters|cnbc|bloomberg|marketwatch|benzinga|company news|press release/i;
  return materialPattern.test(text) && trustedPattern.test(text);
}

function evidenceAllowedByStrictness(item) {
  if (!item || isLowValueEvidence(item)) return false;
  const mode = state.newsStrictness || "balanced";
  const officialKinds = new Set(["filing", "official", "official_wire"]);
  if (mode === "official") return officialKinds.has(item.kind);
  if (mode === "strict") {
    return officialKinds.has(item.kind) || (["supply_chain", "fast_media"].includes(item.kind) && isTrustedIndustryEvidence(item));
  }
  return true;
}

function hasChineseText(text) {
  return /[\u4e00-\u9fff]/.test(text || "");
}

function evidenceTextZh(text) {
  const value = String(text || "").trim();
  if (!value || hasChineseText(value)) return value;
  const clean = value.replace(/\s+-\s+[^-]{2,60}$/i, "");
  const polish = output => output
    .replace(/\bProduction\b/gi, "量产")
    .replace(/\bKa-Band Beamforming ICs\b/gi, "Ka 波段波束成形 IC")
    .replace(/\bNext Generation Tactical Terminals\b/gi, "下一代战术终端")
    .replace(/\bFoundry Collaboration\b/gi, "晶圆代工合作")
    .replace(/\bPartnership\b/gi, "合作")
    .replace(/\bNvidia\b/g, "英伟达")
    .replace(/\bSamsung\b/g, "三星");
  let match = clean.match(/^(.+?) Awards (\$[\d.]+[MBK]?) (.+?) Order to (.+?) for (.+)$/i);
  if (match) return polish(`${match[1]} 向 ${match[4]} 授予 ${match[2]} ${match[3]}订单，用于 ${match[5]}`);
  match = clean.match(/^(.+?) Secures (\$[\d.]+[MBK]?) Order to Support (.+)$/i);
  if (match) return polish(`${match[1]} 获得 ${match[2]} 订单，用于支持 ${match[3]}`);
  match = clean.match(/^Supports Volume Production Through (\d{4}) For (.+)$/i);
  if (match) return polish(`支持 ${match[2]} 的量产延续至 ${match[1]}`);
  match = clean.match(/^(.+?) Says (.+?) Partnership Extends Beyond (.+?) to (.+)$/i);
  if (match) return polish(`${match[1]} 称 ${match[2]} 合作不止 ${match[3]}，还延伸到 ${match[4]}`);
  return value;
}

function evidenceTitleZh(item) {
  return evidenceTextZh(item?.titleZh || item?.title || "");
}

function evidenceSummaryZh(item) {
  return evidenceTextZh(item?.summaryZh || item?.summary || "");
}

function evidenceTrust(item) {
  const kind = item?.kind || "unknown";
  const baseByKind = {
    filing: 96,
    official: 92,
    official_wire: 88,
    supply_chain: 74,
    fast_media: 62,
    china_market: 56,
    yahoo_finance: 46,
    media: 42,
    search: 34
  };
  const strengthBonus = {
    Strong: 7,
    Medium: 1,
    Weak: -13,
    "Needs checking": -18
  }[item?.strength] || 0;
  const dateValue = Date.parse(item?.date);
  const ageDays = Number.isFinite(dateValue) ? Math.max(0, (Date.now() - dateValue) / 86400000) : 999;
  const recencyBonus = ageDays <= 2 ? 5 : ageDays <= 14 ? 2 : ageDays >= 90 ? -8 : 0;
  const industryBonus = isTrustedIndustryEvidence(item) ? 8 : 0;
  const lowPenalty = isLowValueEvidence(item) ? 40 : 0;
  const score = Math.round(clamp((baseByKind[kind] || 36) + strengthBonus + recencyBonus + industryBonus + (item?.actionHint ? 2 : 0) - lowPenalty, 0, 100));
  let grade = "D";
  let tone = "low";
  let reason = "转述或搜索来源，只能当提示。";
  if (score >= 86) {
    grade = "A";
    tone = "high";
    reason = "监管、官方或公司可核验来源，优先级最高。";
  } else if (score >= 72) {
    grade = "B";
    tone = "good";
    reason = "可靠新闻稿或产业链来源，可进入核验队列。";
  } else if (score >= 54) {
    grade = "C";
    tone = "mid";
    reason = "快讯或二线转述，适合提醒，不适合单独定论。";
  }
  if (isLowValueEvidence(item)) {
    reason = "低信号来源，已在排序里降权。";
  }
  return { score, grade, tone, label: `可信度 ${grade}`, reason };
}

function newsImpact(item) {
  const kind = item?.kind || "unknown";
  const text = `${item?.title || ""} ${item?.summary || ""} ${item?.source || ""}`.toLowerCase();
  const baseByKind = {
    filing: 86,
    official: 84,
    official_wire: 76,
    supply_chain: 66,
    fast_media: 52,
    china_market: 44,
    china_lens: 44,
    yahoo_finance: 38,
    media: 34,
    search: 28
  };
  const materialPattern = /order|contract|deal|customer|revenue|guidance|earnings|margin|gross margin|backlog|shipment|production|capacity|capex|hbm|foundry|data center|blackwell|nvlink|co-packaged|订单|合同|客户|收入|指引|财报|业绩|毛利率|在手订单|出货|量产|产能|供应链/i;
  const riskPattern = /sec|10-q|10-k|8-k|investigation|export control|sanction|delay|cut|recall|融资|稀释|监管|出口管制|制裁|延期|下调/i;
  const dateValue = Date.parse(item?.date);
  const ageDays = Number.isFinite(dateValue) ? Math.max(0, (Date.now() - dateValue) / 86400000) : 999;
  const strength = item?.strengthRaw || item?.strength;
  const strengthBonus = { Strong: 10, Medium: 4, Weak: -9, "Needs checking": -14 }[strength] || 0;
  const materialBonus = materialPattern.test(text) ? 15 : 0;
  const riskBonus = riskPattern.test(text) ? 8 : 0;
  const recencyBonus = ageDays <= 2 ? 7 : ageDays <= 14 ? 3 : ageDays >= 90 ? -8 : 0;
  const lowPenalty = isLowValueEvidence(item) ? 45 : 0;
  const score = Math.round(clamp((baseByKind[kind] || 30) + strengthBonus + materialBonus + riskBonus + recencyBonus - lowPenalty, 0, 100));
  let label = "噪音";
  let tone = "noise";
  let reason = "更像背景信息，不能单独进入判断。";
  if (score >= 82) {
    label = "高影响";
    tone = "high";
    reason = "可能影响收入、供应链、财报或监管风险，优先读原文。";
  } else if (score >= 62) {
    label = "中影响";
    tone = "medium";
    reason = "有交易或研究意义，但需要回到官方或财务材料确认。";
  } else if (score >= 45) {
    label = "需核验";
    tone = "watch";
    reason = "可以放进待办，不要直接放大成结论。";
  }
  if (isLowValueEvidence(item)) {
    label = "噪音";
    tone = "noise";
    reason = "低价值新闻或观点文，已降权处理。";
  }
  return { score, label, tone, reason };
}

function evidenceRank(item) {
  const lowValuePenalty = isLowValueEvidence(item) ? 160 : 0;
  const kindScore = {
    filing: 100,
    official: 96,
    official_wire: 92,
    supply_chain: 78,
    fast_media: 66,
    china_market: 54,
    yahoo_finance: 42,
    media: 40,
    search: 34
  }[item.kind] || 30;
  const strengthScore = {
    Strong: 72,
    Medium: 44,
    Weak: 12,
    "Needs checking": 8
  }[item.strength] || 10;
  const dateValue = Date.parse(item.date);
  const ageDays = Number.isFinite(dateValue) ? Math.max(0, (Date.now() - dateValue) / 86400000) : 999;
  const recencyScore = ageDays <= 2 ? 18 : ageDays <= 10 ? 12 : ageDays <= 30 ? 6 : 0;
  return kindScore + strengthScore + recencyScore + evidenceTrust(item).score * 0.28 + newsImpact(item).score * 0.22 + (item.actionHint ? 8 : 0) - lowValuePenalty;
}

function sortedEvidenceItems(liveEvidence = null) {
  return [...(liveEvidence?.items || [])]
    .map(item => ({ ...item, _rank: evidenceRank(item) }))
    .sort((a, b) => b._rank - a._rank);
}

function evidenceSummary(liveEvidence = null) {
  const live = evidenceSignal(liveEvidence);
  const counts = live.counts || {};
  return {
    score: live.score || 0,
    strong: counts.Strong || 0,
    medium: counts.Medium || 0,
    weak: counts.Weak || 0,
    checking: counts["Needs checking"] || 0,
    total: liveEvidence?.items?.length || 0,
    sourceCount: live.sourceCount || 0
  };
}

function decisionState(p, scores, chartData, analysisData, liveEvidence = null) {
  const data = chartData || analysisData;
  const evidence = evidenceSummary(liveEvidence);
  const gf = scores.gf?.details || {};
  const riskCount = Object.values(p.penalties || {}).filter(value => value >= 3).length;
  const d20 = Number.isFinite(gf.d20) ? gf.d20 : 0;
  const rsi = Number.isFinite(data?.rsi) ? data.rsi : null;
  const rangeChange = Number.isFinite(data?.rangeChange) ? data.rangeChange : null;

  if (!data?.latest?.close) {
    return { label: "先补行情", tone: "waiting", reason: "行情服务还没返回，先不要用价格判断。" };
  }
  if (riskCount >= 2) {
    return { label: "风险优先", tone: "closed", reason: "高风险项偏多，先看降级条件有没有触发。" };
  }
  if (evidence.score < 26 && scores.composite < 70) {
    return { label: "消息待核验", tone: "waiting", reason: "现在线索不够硬，先找 SEC、IR 或公司公告。" };
  }
  if ((rsi != null && rsi >= 76) || d20 >= 18 || (rangeChange != null && rangeChange >= 32)) {
    return { label: "等回踩", tone: "waiting", reason: "价格短线偏热，适合先核证据和等待更好的风险回报。" };
  }
  if (scores.composite >= 76 && evidence.score >= 42) {
    const market = marketForUi();
    return {
      label: market.isTradable ? "重点盯盘" : "重点跟踪",
      tone: market.isTradable ? "open" : "waiting",
      reason: "评分和实时证据同时在线，开盘窗口再看价格位置。"
    };
  }
  if (scores.composite >= 70) {
    return { label: "重点跟踪", tone: "waiting", reason: "基本面方向成立，等待催化剂或更干净的价格位置。" };
  }
  if (scores.composite >= 60) {
    return { label: "可观察", tone: "waiting", reason: "有主题价值，但证据链或估值压力还需要补。" };
  }
  return { label: "先放候选池", tone: "closed", reason: "优先级不够高，别让低信号新闻占注意力。" };
}

function catalystItems(p, liveEvidence = null) {
  const hardKinds = new Set(["filing", "official", "official_wire"]);
  const industryKinds = new Set(["supply_chain", "fast_media"]);
  const materialPattern = /order|contract|deal|partnership|collaboration|production|supply|shipment|revenue|guidance|earnings|backlog|hbm|foundry|data center|customer/i;
  const commentaryPattern = /seeking alpha|yahoo finance|ad hoc news|simply wall|marketbeat|investorplace|motley fool|doubling potential|analyst target|sparks rally|under scrutiny/i;
  const trustedIndustryPattern = /thelec|semiwiki|semiengineering|digitimes|ee times|tom's hardware|anandtech|nasdaq|business wire|globenewswire|pr newswire|reuters|cnbc|bloomberg|marketwatch|benzinga|company news|press release/i;
  const items = sortedEvidenceItems(liveEvidence)
    .filter(evidenceAllowedByStrictness)
    .filter(item => item.strength !== "Weak")
    .filter(item => {
      if (hardKinds.has(item.kind)) return true;
      const text = `${item.title || ""} ${item.summary || ""} ${item.source || ""}`;
      if (commentaryPattern.test(text)) return false;
      return industryKinds.has(item.kind) && materialPattern.test(text) && trustedIndustryPattern.test(text);
    })
    .slice(0, 5)
    .map(item => ({
      title: evidenceTitleZh(item),
      rawTitle: item.title || "",
      summary: item.summary || "",
      source: item.sourceZh || item.source || item.kindLabel || "实时来源",
      date: formatEvidenceDate(item.date),
      rawDate: item.date,
      kind: item.kind,
      url: item.url,
      strengthRaw: item.strength,
      strength: item.strengthLabel || STRENGTH_LABELS[item.strength] || item.strength || "待核验",
      hint: item.actionHint || evidenceSummaryZh(item)
    }));
  if (items.length) return items;
  return (p.checks || []).slice(0, 4).map(check => ({
    title: check,
    source: "待核验",
    date: "下一步",
    strength: "核验项",
    hint: "没有足够实时证据时，先用这个问题回到官方材料。"
  }));
}

function renderMoverRadar() {
  if (!el.moverRadar) return;
  const rows = visibleUniverse().map(item => {
    const data = state.quotes.get(`${item.symbol}:${state.range}`) || state.quotes.get(`${item.symbol}:1y`);
    const analysisData = state.quotes.get(`${item.symbol}:1y`) || data;
    const evidence = state.evidence.get(item.symbol);
    const scores = scoreAll(item, analysisData, evidence);
    const live = evidenceSummary(evidence);
    const dayMove = Math.abs(data?.changePct || 0);
    const rangeMove = Math.abs(data?.rangeChange || 0);
    const heat = dayMove * 2.4 + Math.min(rangeMove, 35) * 0.55 + scores.composite * 0.08 + live.score * 0.05;
    return { item, data, scores, live, heat };
  }).filter(row => row.data?.latest?.close).sort((a, b) => b.heat - a.heat).slice(0, 6);

  if (!rows.length) {
    el.moverRadar.innerHTML = `<div class="mover-empty">正在预热行情，稍后自动出现异动榜。</div>`;
    return;
  }

  el.moverRadar.innerHTML = rows.map(row => {
    const { item, data, scores, live } = row;
    const changeCls = data.changePct > 0 ? "positive" : data.changePct < 0 ? "negative" : "flat";
    const reason = live.score >= 45 ? "证据升温" : data.changePct >= 4 ? "强势上涨" : data.changePct <= -4 ? "急跌核验" : data.rsi >= 72 ? "短线偏热" : "价格异动";
    const displayName = displayNameWithZh(item.symbol, item.name);
    return `
      <button class="mover-row ${item.symbol === state.activeSymbol ? "active" : ""}" data-symbol="${escapeHtml(item.symbol)}" type="button">
        <span class="mover-symbol">${escapeHtml(item.symbol)}</span>
        <span class="mover-copy">
          <strong title="${escapeHtml(displayName)}">${escapeHtml(displayName)}</strong>
          <em>${escapeHtml(reason)} · ${escapeHtml(verdict(scores.composite))}</em>
        </span>
        <span class="mover-change ${changeCls}">${formatSignedPct(data.changePct)}</span>
      </button>
    `;
  }).join("");
  [...el.moverRadar.querySelectorAll(".mover-row")].forEach(row => row.addEventListener("click", () => selectSymbol(row.dataset.symbol)));
}

function renderDecisionBoard(p, scores, chartData, analysisData, liveEvidence = null) {
  if (!el.decisionBoard) return;
  const data = chartData || analysisData;
  const stateText = decisionState(p, scores, chartData, analysisData, liveEvidence);
  const evidence = evidenceSummary(liveEvidence);
  const catalysts = catalystItems(p, liveEvidence).slice(0, 3);
  const checks = (p.checks || []).slice(0, 3);
  if (el.decisionMeta) {
    el.decisionMeta.textContent = `${p.symbol} · ${stateText.label} · ${evidence.strong} 强证据 / ${evidence.medium} 中等线索`;
  }
  el.decisionBoard.innerHTML = `
    <article class="decision-card decision-primary">
      <span>当前状态</span>
      <strong class="${escapeHtml(stateText.tone)}">${escapeHtml(stateText.label)}</strong>
      <p>${escapeHtml(stateText.reason)}</p>
    </article>
    <article class="decision-card">
      <span>今日异动</span>
      <div class="decision-metrics">
        <div><em>区间涨跌</em><strong class="${data?.rangeChange > 0 ? "positive" : data?.rangeChange < 0 ? "negative" : "flat"}">${Number.isFinite(data?.rangeChange) ? formatSignedPct(data.rangeChange) : "--"}</strong></div>
        <div><em>RSI 14</em><strong>${Number.isFinite(data?.rsi) ? Math.round(data.rsi) : "--"}</strong></div>
        <div><em>20DMA</em><strong>${Number.isFinite(scores.gf?.details?.d20) ? formatSignedPct(scores.gf.details.d20) : "--"}</strong></div>
      </div>
    </article>
    <article class="decision-card">
      <span>关键催化</span>
      <ul class="decision-list">
        ${catalysts.map(item => `<li><strong>${escapeHtml(item.strength)}</strong><span>${escapeHtml(item.title)}</span><em>${escapeHtml(item.source)} · ${escapeHtml(item.date)}</em></li>`).join("")}
      </ul>
    </article>
    <article class="decision-card">
      <span>下一步核验</span>
      <ul class="decision-list compact">
        ${checks.map(item => `<li><span>${escapeHtml(item)}</span></li>`).join("") || "<li><span>先查最新 10-Q/10-K、财报电话会和 IR 材料。</span></li>"}
      </ul>
    </article>
  `;
}

function catalystEventType(item) {
  const text = `${item?.rawTitle || ""} ${item?.title || ""} ${item?.summary || ""} ${item?.kind || ""} ${item?.source || ""}`.toLowerCase();
  if (item?.kind === "filing" || /10-k|10-q|8-k|sec|filing|form 4/.test(text)) return "SEC";
  if (item?.kind === "official" || item?.kind === "official_wire" || /press release|investor relations|ir|official/.test(text)) return "IR";
  if (/earnings|guidance|revenue|quarter|财报|业绩|指引/.test(text)) return "财报";
  if (/order|contract|deal|订单|合同/.test(text)) return "订单";
  if (/partnership|collaboration|foundry|supply|supplier|hbm|合作|供应链/.test(text)) return "供应链";
  if (item?.kind === "fast_media") return "快讯";
  return "催化";
}

function catalystTone(item) {
  if (item?.pending) return "pending";
  if (item?.kind === "filing" || item?.kind === "official" || item?.kind === "official_wire") return "official";
  if (item?.strengthRaw === "Strong" || item?.strength === "Strong") return "strong";
  return "watch";
}

function eventWindowLabel(text) {
  const value = String(text || "");
  const year = value.match(/\b(20\d{2})\b/);
  if (year) return `${year[1]} 窗口待跟踪`;
  if (/quarter|q[1-4]|季度|财报/i.test(value)) return "季度窗口待确认";
  return "日期待确认";
}

function eventCalendarItems(p, liveEvidence = null) {
  const liveItems = catalystItems(p, liveEvidence)
    .filter(item => item.source !== "待核验" && item.strength !== "核验项")
    .slice(0, 6)
    .map(item => {
      const timestamp = Date.parse(item.rawDate || item.date);
      const impact = newsImpact(item);
      return {
        ...item,
        type: catalystEventType(item),
        status: "已发生",
        timestamp: Number.isFinite(timestamp) ? timestamp : 0,
        dateQuality: Number.isFinite(timestamp) ? "真实日期" : "日期待核",
        impact
      };
    });
  const checks = p.checks || [];
  const pendingChecks = [
    {
      title: "下一次财报 / 电话会日期",
      source: `${p.symbol} 官方 IR 日历`,
      date: "日期待确认",
      strength: "待确认",
      hint: checks[0] || "到公司 IR、Nasdaq 财报日历或券商日历确认，确认前不写死日期。",
      type: "财报",
      status: "待查",
      timestamp: -1,
      pending: true,
      dateQuality: "待确认"
    },
    {
      title: "下一份 SEC / 监管文件",
      source: `${p.symbol} SEC EDGAR`,
      date: "日期待确认",
      strength: "待确认",
      hint: "10-Q、10-K、8-K 和 Form 4 出现后再提升证据权重。",
      type: "SEC",
      status: "待查",
      timestamp: -2,
      pending: true,
      dateQuality: "待确认"
    },
    ...checks.slice(0, 2).map((check, idx) => ({
      title: idx === 0 ? "订单 / 交付窗口" : "下一项验证清单",
      source: `${p.symbol} 调研待办`,
      date: eventWindowLabel(check),
      strength: "待确认",
      hint: check,
      type: idx === 0 ? "订单" : "待办",
      status: "待跟进",
      timestamp: -idx - 3,
      pending: true,
      dateQuality: eventWindowLabel(check).includes("待确认") ? "待确认" : "窗口线索"
    }))
  ];
  return [...liveItems, ...pendingChecks].sort((a, b) => b.timestamp - a.timestamp).slice(0, 8);
}

function renderCatalystCalendar(p, liveEvidence = null) {
  if (!el.catalystCalendar) return;
  const items = eventCalendarItems(p, liveEvidence);
  const officialCount = items.filter(item => !item.pending && catalystTone(item) === "official").length;
  const datedCount = items.filter(item => !item.pending && item.dateQuality === "真实日期").length;
  const pendingCount = items.filter(item => item.pending).length;
  el.catalystCalendar.innerHTML = `
    <div class="calendar-summary">
      <div><strong>${datedCount}</strong><span>真实日期</span></div>
      <div><strong>${officialCount}</strong><span>官方 / SEC</span></div>
      <div><strong>${pendingCount}</strong><span>待确认</span></div>
    </div>
    ${items.map(item => `
      <div class="catalyst-item timeline ${escapeHtml(catalystTone(item))}">
        <div class="timeline-dot" aria-hidden="true"></div>
        <div class="catalyst-main">
          <div class="catalyst-line">
            <span class="calendar-type">${escapeHtml(item.type)}</span>
            <em>${escapeHtml(item.status)} · ${escapeHtml(item.date)}</em>
          </div>
          <div class="catalyst-flags">
            <span class="date-quality ${item.pending ? "pending" : "actual"}">${escapeHtml(item.dateQuality || (item.pending ? "待确认" : "真实日期"))}</span>
            ${item.impact ? `<span class="impact-badge ${escapeHtml(item.impact.tone)}">${escapeHtml(item.impact.label)} · ${item.impact.score}</span>` : ""}
          </div>
          <strong>${escapeHtml(item.title)}</strong>
          <span>${escapeHtml(item.source)}</span>
          ${item.hint ? `<p>${escapeHtml(item.hint)}</p>` : ""}
        </div>
        ${item.url
          ? `<a class="calendar-open" href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer">原文</a>`
          : `<button class="calendar-open" type="button" data-symbol="${escapeHtml(p.symbol)}" title="打开标的">打开</button>`}
      </div>
    `).join("")}
  `;
}

function eventKeyForEvidence(item) {
  const title = `${evidenceTitleZh(item)} ${evidenceSummaryZh(item)} ${item.source || ""}`.toLowerCase();
  const rules = [
    [/all\.space|allspace|ka-band|ka 波段|beamforming|波束成形/, "Sivers / ALL.SPACE 订单"],
    [/globalfoundries|光互连|silicon photonics|photonics/, "光互连代工合作"],
    [/hbm|high bandwidth memory|三星|samsung|sk hynix|micron/, "HBM / 韩国供应链"],
    [/blackwell|英伟达|nvidia/, "英伟达产品周期"],
    [/sec|10-q|10-k|8-k|form 4|监管/, "SEC / 监管文件"],
    [/earnings|guidance|revenue|财报|业绩|指引/, "财报与收入传导"],
    [/order|contract|deal|订单|合同/, "订单 / 合同催化"],
    [/partnership|collaboration|合作|供应/, "合作 / 供应链事件"]
  ];
  const hit = rules.find(([pattern]) => pattern.test(title));
  if (hit) return hit[1];
  return evidenceTitleZh(item).replace(/[^\u4e00-\u9fff\w\s./-]/g, "").trim().slice(0, 18) || "其他待核验事件";
}

function groupEvidenceEvents(liveEvidence = null) {
  const groups = new Map();
  const items = sortedEvidenceItems(liveEvidence)
    .filter(evidenceAllowedByStrictness)
    .filter(item => item.strength !== "Weak" && item.strength !== "Needs checking")
    .slice(0, 18);
  for (const item of items) {
    const key = eventKeyForEvidence(item);
    const current = groups.get(key) || { key, items: [], sources: new Set(), rank: 0, top: null };
    current.items.push(item);
    current.sources.add(item.sourceZh || item.source || item.kindLabel || "来源");
    current.rank = Math.max(current.rank, item._rank || evidenceRank(item));
    current.top = current.top || item;
    groups.set(key, current);
  }
  return [...groups.values()]
    .sort((a, b) => (b.items.length * 20 + b.rank) - (a.items.length * 20 + a.rank))
    .slice(0, 5);
}

function evidenceRowKey(item) {
  return item.url || `${item.title || item.rawTitle || ""}:${item.date || ""}`;
}

function primaryEvidenceRows(liveEvidence = null) {
  const groups = groupEvidenceEvents(liveEvidence);
  const merged = groups.map(group => {
    const newest = group.items.reduce((best, item) => {
      const current = Date.parse(item.date);
      const bestValue = Date.parse(best?.date);
      return Number.isFinite(current) && (!Number.isFinite(bestValue) || current > bestValue) ? item : best;
    }, group.top);
    return {
      ...group.top,
      _mergedKey: group.key,
      _mergedCount: group.items.length,
      _mergedSources: [...group.sources].slice(0, 5),
      _mergedLatestDate: newest?.date || group.top?.date
    };
  });
  const used = new Set(merged.map(evidenceRowKey));
  const fillers = sortedEvidenceItems(liveEvidence)
    .filter(evidenceAllowedByStrictness)
    .filter(item => item.strength !== "Weak" && item.strength !== "Needs checking")
    .filter(item => !used.has(evidenceRowKey(item)))
    .slice(0, Math.max(0, 6 - merged.length));
  return [...merged, ...fillers]
    .sort((a, b) => (b._rank || evidenceRank(b)) - (a._rank || evidenceRank(a)))
    .slice(0, 6);
}

function renderEvidenceEventDigest(liveEvidence = null) {
  if (!el.evidenceEventDigest) return;
  const groups = groupEvidenceEvents(liveEvidence);
  const rawItems = sortedEvidenceItems(liveEvidence)
    .filter(evidenceAllowedByStrictness)
    .filter(item => item.strength !== "Weak" && item.strength !== "Needs checking");
  if (!groups.length) {
    el.evidenceEventDigest.innerHTML = `
      <div class="event-digest-empty">
        暂未形成可合并事件。先看实时证据和本地核验清单。
      </div>
    `;
    return;
  }
  const mergedCount = groups.reduce((sum, group) => sum + group.items.length, 0);
  el.evidenceEventDigest.innerHTML = `
    <div class="event-digest-head">
      <div>
        <strong>事件合并视图</strong>
        <span>${rawItems.length} 条有效证据合并成 ${groups.length} 个事件，重复来源只保留一条主线</span>
      </div>
      <em>${mergedCount} 条入组</em>
    </div>
    <div class="event-digest-list">
      ${groups.slice(0, 4).map(group => {
        const top = group.top;
        const impact = newsImpact(top);
        const trust = evidenceTrust(top);
        const sources = [...group.sources].slice(0, 4);
        const newest = group.items.reduce((best, item) => {
          const current = Date.parse(item.date);
          const bestValue = Date.parse(best?.date);
          return Number.isFinite(current) && (!Number.isFinite(bestValue) || current > bestValue) ? item : best;
        }, top);
        return `
          <article class="event-digest-item">
            <div class="event-digest-line">
              <strong>${escapeHtml(group.key)}</strong>
              <span>${group.items.length} 条来源</span>
            </div>
            <p>${escapeHtml(evidenceTitleZh(top))}</p>
            <div class="event-digest-badges">
              <span class="impact-badge ${escapeHtml(impact.tone)}">${escapeHtml(impact.label)} · ${impact.score}</span>
              <span class="trust-badge ${escapeHtml(trust.tone)}">${escapeHtml(trust.label)} · ${trust.score}</span>
            </div>
            <div class="event-digest-sources">${sources.map(source => `<i>${escapeHtml(source)}</i>`).join("")}</div>
            <small>最新 ${escapeHtml(formatEvidenceDate(newest?.date))}</small>
            ${top?.url ? `<a href="${escapeHtml(top.url)}" target="_blank" rel="noreferrer">读主来源</a>` : ""}
          </article>
        `;
      }).join("")}
    </div>
  `;
}

function renderEventClusters(p, liveEvidence = null) {
  if (!el.eventClusterList) return;
  const clusters = groupEvidenceEvents(liveEvidence);
  if (el.eventClusterMeta) {
    el.eventClusterMeta.textContent = clusters.length ? `${clusters.length} 个事件簇 · 已按严格度过滤` : "暂未形成事件簇，先按核验清单推进";
  }
  if (!clusters.length) {
    el.eventClusterList.innerHTML = (p.checks || []).slice(0, 4).map((check, idx) => `
      <div class="event-cluster pending">
        <div>
          <strong>${idx + 1}. ${escapeHtml(check)}</strong>
          <span>待核验 · 先回到官方材料</span>
        </div>
        <p>没有足够高信号实时证据时，这条就是下一步要查的事。</p>
      </div>
    `).join("");
    return;
  }
  el.eventClusterList.innerHTML = clusters.map(cluster => {
    const top = cluster.top;
    const sourceText = [...cluster.sources].slice(0, 3).join(" / ");
    const newest = cluster.items.reduce((best, item) => {
      const current = Date.parse(item.date);
      const bestValue = Date.parse(best?.date);
      return Number.isFinite(current) && (!Number.isFinite(bestValue) || current > bestValue) ? item : best;
    }, top);
    return `
      <div class="event-cluster">
        <div class="event-cluster-head">
          <strong>${escapeHtml(cluster.key)}</strong>
          <em>${cluster.items.length} 条</em>
        </div>
        <p>${escapeHtml(evidenceTitleZh(top))}</p>
        <span>${escapeHtml(sourceText)} · 最新 ${escapeHtml(formatEvidenceDate(newest?.date))}</span>
      </div>
    `;
  }).join("");
}

function healthTone(ok, waiting = false) {
  if (ok) return "open";
  return waiting ? "waiting" : "closed";
}

function sourceHealthTone(source) {
  if (source?.status === "ok" && (source.count || 0) > 0) return "open";
  if (source?.status === "ok") return "waiting";
  if (["needs_token", "loading", "waiting", "not_configured"].includes(source?.status)) return "waiting";
  return "closed";
}

function sourceDetailZh(detail) {
  return String(detail || "")
    .replace(/\bqueries\b/gi, "检索")
    .replace(/\bquery\b/gi, "检索")
    .replace(/\bfiltered low-value\b/gi, "已过滤低价值")
    .replace(/\bwhen:(\d+)d\b/gi, "近$1天")
    .replace(/检索:/g, "检索：")
    .replace(/已过滤低价值:/g, "已过滤低价值：")
    .replace(/;\s*/g, "；")
    .replace(/,\s*/g, "，")
    .trim();
}

function sourceHealthDetail(source) {
  if (!source) return "等待实时来源返回。";
  if (source.detail) return sourceDetailZh(source.detail);
  if (source.status === "ok" && (source.count || 0) > 0) return "已返回可用条目，参与证据过滤和事件聚合。";
  if (source.status === "ok") return "来源在线，但当前标的暂无有效条目。";
  if (source.status === "needs_token") return "需要 Token，X 实时喊单源会受限。";
  if (source.status === "not_configured") return "手动源，只作为本地假设或兜底线索。";
  if (source.status === "not_found") return "未找到当前标的对应来源，先降权。";
  if (source.status === "unavailable") return "接口暂不可用，先不要用它下结论。";
  return "等待返回或需要稍后刷新。";
}

function renderSourceHealth(liveEvidence = null) {
  if (!el.sourceHealthList) return;
  const monitorSource = state.monitor?.source
    ? {
        ...state.monitor.source,
        name: "X monitor",
        nameZh: "X 喊单监控",
        count: state.monitor?.items?.length || 0,
        detail: state.monitor?.fetchedAt ? `最近同步 ${formatMonitorTime(state.monitor.fetchedAt)}` : "无 Token 时只显示等待状态。"
      }
    : null;
  const sources = [...(liveEvidence?.sources || []), ...(monitorSource ? [monitorSource] : [])];
  const normalized = sources.length ? sources : [
    { name: "Live evidence", nameZh: "实时证据源", status: "waiting", count: 0, detail: "等待行情和新闻接口返回。" }
  ];
  const rows = normalized
    .map(source => ({ ...source, tone: sourceHealthTone(source) }))
    .sort((a, b) => {
      const toneScore = { open: 3, waiting: 2, closed: 1 };
      return (toneScore[b.tone] - toneScore[a.tone]) || ((b.count || 0) - (a.count || 0));
    })
    .slice(0, 9);
  const online = rows.filter(row => row.tone === "open").length;
  el.sourceHealthList.innerHTML = `
    <div class="source-health-head">
      <strong>消息源健康</strong>
      <span>${online}/${rows.length} 可用 · 严格过滤后入池</span>
    </div>
    ${rows.map(row => `
      <div class="source-health-row ${escapeHtml(row.tone)}">
        <div>
          <strong>${escapeHtml(row.nameZh || row.name || "来源")}</strong>
          <p>${escapeHtml(sourceHealthDetail(row))}</p>
        </div>
        <em>${escapeHtml(row.statusZh || sourceStatusLabel(row.status))} · ${row.count || 0}</em>
      </div>
    `).join("")}
  `;
}

function renderDataHealth() {
  if (!el.dataHealthList) return;
  const activeChart = chartForSymbol(state.activeSymbol);
  const activeEvidence = state.evidence.get(state.activeSymbol);
  const filteredEvidence = sortedEvidenceItems(activeEvidence).filter(evidenceAllowedByStrictness);
  const filteredEvidenceCount = filteredEvidence.length;
  const avgTrust = filteredEvidenceCount
    ? Math.round(filteredEvidence.reduce((sum, item) => sum + evidenceTrust(item).score, 0) / filteredEvidenceCount)
    : 0;
  const sourceOkCount = activeEvidence?.sources?.filter(source => source.status === "ok").length || 0;
  const envLoaded = MARKET_ENV_SYMBOLS.filter(item => state.quotes.has(`${item.symbol}:1d`)).length;
  const monitorSource = state.monitor?.source;
  const monitorTone = monitorSource?.status === "ok" ? "open" : monitorSource?.status === "needs_token" ? "waiting" : "closed";
  const redditRows = redditRowsForUi();
  const redditHit = redditTrendForSymbol(state.activeSymbol);
  const redditToneValue = state.redditTrendingError ? "closed" : redditRows.length ? "open" : state.redditTrendingLoading ? "waiting" : "closed";
  const macroSource = state.fredMacro?.source;
  const macroToneValue = macroSource?.status === "ok" ? "open" : macroSource?.status === "needs_key" || state.fredMacroLoading ? "waiting" : "closed";
  if (el.dataHealthMeta) {
    el.dataHealthMeta.textContent = `${state.activeSymbol} · ${envLoaded}/${MARKET_ENV_SYMBOLS.length} 大盘项 · ${filteredEvidenceCount} 条有效证据 · Reddit ${redditRows.length || 0} 条`;
  }
  const rows = [
    {
      tone: healthTone(Boolean(activeChart?.latest?.close), state.loading.has(state.activeSymbol)),
      label: "当前行情",
      value: activeChart?.latest?.close ? formatHoldingPrice(activeChart) : state.loading.has(state.activeSymbol) ? "载入中" : "待行情",
      detail: activeChart ? `${activeChart.meta?.exchange || "US"} · ${activeChart.points?.length || 0} 根K线` : "Yahoo 行情未返回前，不用价格下结论"
    },
    {
      tone: healthTone(envLoaded >= 4, envLoaded > 0),
      label: "大盘环境",
      value: `${envLoaded}/${MARKET_ENV_SYMBOLS.length}`,
      detail: marketEnvVerdict().label
    },
    {
      tone: healthTone(filteredEvidenceCount > 0, Boolean(activeEvidence)),
      label: "证据过滤",
      value: `${filteredEvidenceCount} 条`,
      detail: `${sourceOkCount} 个来源在线 · 平均可信度 ${avgTrust || "待证据"} · ${NEWS_STRICTNESS_LABELS[state.newsStrictness] || "均衡"}模式`
    },
    {
      tone: monitorTone,
      label: "X 喊单源",
      value: monitorSourceLabel(monitorSource),
      detail: state.monitor?.fetchedAt ? formatMonitorTime(state.monitor.fetchedAt) : "无 Token 时用 RSS/本地状态兜底"
    },
    {
      tone: redditToneValue,
      label: "Reddit 热度",
      value: redditHit ? `#${redditHit.rank} ${redditChangeText(redditHit)}` : redditRows.length ? `${redditRows.length} 条` : state.redditTrendingLoading ? "载入中" : "暂无",
      detail: redditHit ? `${state.activeSymbol} 社区提及 ${redditHit.mentions || 0} 次，只作情绪线索` : "来自美股狐狸 24h Reddit 热度缓存"
    },
    {
      tone: macroToneValue,
      label: "FRED 宏观",
      value: macroSource?.status === "ok" ? state.fredMacro.verdict?.label || "已连接" : macroSource?.status === "needs_key" ? "等待 Key" : state.fredMacroLoading ? "载入中" : "暂无",
      detail: macroSource?.status === "ok" ? `${macroSource.count || 0} 条官方宏观序列` : "配置 FRED_API_KEY 后显示官方宏观序列"
    },
    {
      tone: "open",
      label: "本机缓存",
      value: `${state.watchlist.length} 自选 / ${state.compareSymbols.length} 对比`,
      detail: "保存在浏览器本机，不写入代码仓库"
    }
  ];
  el.dataHealthList.innerHTML = rows.map(row => `
    <div class="health-row ${escapeHtml(row.tone)}">
      <span></span>
      <div>
        <strong>${escapeHtml(row.label)}</strong>
        <p>${escapeHtml(row.detail)}</p>
      </div>
      <em>${escapeHtml(row.value)}</em>
    </div>
  `).join("");
  renderSourceHealth(activeEvidence);
}

function alertRuleEvaluations(p, scores, chartData, analysisData, liveEvidence = null) {
  const data = chartData || analysisData;
  const evidence = evidenceSummary(liveEvidence);
  const officialItems = sortedEvidenceItems(liveEvidence).filter(item => evidenceAllowedByStrictness(item) && ["filing", "official", "official_wire"].includes(item.kind));
  const monitorHit = (state.monitor?.tickers || []).find(row => row.symbol === p.symbol || row.symbol === p.symbol.replace(".ST", ""));
  const redditHit = redditTrendForSymbol(p.symbol);
  const d20 = scores.gf?.details?.d20;
  const rsi = Number.isFinite(data?.rsi) ? data.rsi : null;
  return [
    {
      id: "strongEvidence",
      tone: "open",
      matched: evidence.strong > 0,
      metric: `${evidence.strong} 强 / ${evidence.medium} 中`,
      title: "强证据更新",
      body: `${evidence.strong} 条强证据在线，优先读官方、监管或公司原文。`
    },
    {
      id: "near20dma",
      tone: "open",
      matched: scores.composite >= 68 && Number.isFinite(d20) && d20 <= 5 && d20 >= -8,
      metric: Number.isFinite(d20) ? formatSignedPct(d20) : "--",
      title: "接近 20DMA",
      body: `研究分 ${scores.composite}，距 20DMA ${Number.isFinite(d20) ? formatSignedPct(d20) : "--"}，适合重新检查风险回报。`
    },
    {
      id: "rsiReset",
      tone: "waiting",
      matched: scores.composite >= 64 && Number.isFinite(rsi) && rsi <= 55,
      metric: Number.isFinite(rsi) ? String(Math.round(rsi)) : "--",
      title: "RSI 冷却",
      body: `RSI ${Number.isFinite(rsi) ? Math.round(rsi) : "--"}，若证据不变，可以从追高风险转为回踩观察。`
    },
    {
      id: "monitorMention",
      tone: "waiting",
      matched: Boolean(monitorHit),
      metric: monitorHit ? `${monitorHit.mentions || 1} 次` : "未命中",
      title: "喊单提及",
      body: `@${MONITOR_HANDLE} 提到 ${p.symbol}，只作为触发器，仍要先看证据和盘口。`
    },
    {
      id: "redditHeat",
      tone: "waiting",
      matched: redditSignalBoost(redditHit) >= 7,
      metric: redditHit ? `#${redditHit.rank || "--"} · ${redditChangeText(redditHit)}` : "未上榜",
      title: "Reddit 热度升温",
      body: redditHit
        ? `${p.symbol} 在 Reddit 24h 热度榜排名 #${redditHit.rank || "--"}，提及 ${redditHit.mentions || 0} 次。只当情绪和异动线索。`
        : `${p.symbol} 暂未进入 Reddit 24h 热度前排。`
    },
    {
      id: "officialFiling",
      tone: "open",
      matched: officialItems.length > 0,
      metric: `${officialItems.length} 条`,
      title: "SEC / IR 更新",
      body: officialItems[0] ? `${evidenceTitleZh(officialItems[0])}` : "等待 SEC、IR 或公司官方新闻。"
    }
  ];
}

function renderAlertRules(p = getProfile(state.activeSymbol), scores = null, chartData = null, analysisData = null, liveEvidence = null) {
  if (!el.alertRulesList) return;
  const activeChart = chartData || chartForSymbol(state.activeSymbol);
  const activeAnalysis = analysisData || analysisForSymbol(state.activeSymbol);
  const evidence = liveEvidence || state.evidence.get(state.activeSymbol);
  const activeScores = scores || scoreAll(p, activeAnalysis, evidence);
  const evaluations = alertRuleEvaluations(p, activeScores, activeChart, activeAnalysis, evidence);
  const enabledCount = ALERT_RULES.filter(rule => state.alertRules[rule.id]).length;
  const matchedCount = evaluations.filter(item => state.alertRules[item.id] && item.matched).length;
  if (el.alertRulesMeta) {
    el.alertRulesMeta.textContent = `${enabledCount}/${ALERT_RULES.length} 已启用 · 当前 ${matchedCount} 条命中`;
  }
  el.alertRulesList.innerHTML = ALERT_RULES.map(rule => {
    const evaluation = evaluations.find(item => item.id === rule.id) || {};
    const enabled = state.alertRules[rule.id] !== false;
    return `
      <div class="alert-rule-row ${enabled ? "enabled" : "disabled"} ${evaluation.matched ? "matched" : ""}">
        <button class="rule-switch" data-alert-rule="${escapeHtml(rule.id)}" type="button" aria-pressed="${enabled}">
          <span></span>
        </button>
        <div>
          <strong>${escapeHtml(rule.label)}</strong>
          <p>${escapeHtml(rule.description)}</p>
        </div>
        <em class="${escapeHtml(evaluation.matched ? (evaluation.tone || "open") : "idle")}">${escapeHtml(evaluation.matched ? "命中" : "等待")} · ${escapeHtml(evaluation.metric || "--")}</em>
      </div>
    `;
  }).join("");
  [...el.alertRulesList.querySelectorAll("[data-alert-rule]")].forEach(button => {
    button.addEventListener("click", () => {
      const id = button.dataset.alertRule;
      state.alertRules[id] = !(state.alertRules[id] !== false);
      saveAlertRuleSettings();
      rerenderActiveFromCache();
    });
  });
}

function buildAlerts(p, scores, chartData, analysisData, liveEvidence = null) {
  const data = chartData || analysisData;
  const alerts = [];
  const decision = decisionState(p, scores, chartData, analysisData, liveEvidence);
  const evidence = evidenceSummary(liveEvidence);
  const market = marketForUi();
  const env = marketEnvVerdict();
  const ruleAlerts = alertRuleEvaluations(p, scores, chartData, analysisData, liveEvidence)
    .filter(item => state.alertRules[item.id] !== false && item.matched)
    .map(item => ({ tone: item.tone, title: item.title, body: item.body }));
  alerts.push(...ruleAlerts);
  if (decision.label === "等回踩" || decision.label === "风险优先") {
    alerts.push({ tone: "waiting", title: decision.label, body: decision.reason });
  }
  if (Number.isFinite(data?.drawdown) && data.drawdown < -25) {
    alerts.push({ tone: "closed", title: "大回撤核验", body: "最大回撤超过 25%，先确认是否基本面变坏，不要只按便宜判断。" });
  }
  if (env.tone === "closed" || env.tone === "waiting") {
    alerts.push({ tone: env.tone, title: env.label, body: env.note });
  }
  if (state.newsStrictness === "official") {
    alerts.push({ tone: "waiting", title: "官方模式", body: "当前只展示官方、监管和新闻稿证据，二线转述已隐藏。" });
  }
  return alerts.slice(0, 5);
}

function alertActionLabel(alert) {
  const title = `${alert?.title || ""}`;
  const body = `${alert?.body || ""}`;
  if (title.includes("SEC") || title.includes("IR") || title.includes("订单") || body.includes("SEC")) return "读原文";
  if (title.includes("回踩") || body.includes("回踩")) return "等回踩";
  if (title.includes("喊单") || title.includes("Reddit")) return "先核验";
  if (alert?.tone === "closed") return "先别追";
  if (alert?.tone === "open") return "看价格";
  return "排队看";
}

function alertTaskMeta(alert) {
  const action = alertActionLabel(alert);
  const title = `${alert?.title || ""}`;
  const body = `${alert?.body || ""}`;
  if (action === "读原文" || title.includes("强证据")) {
    return { lane: "马上读原文", action, order: 1, tone: "open" };
  }
  if (action === "看价格" || action === "等回踩" || title.includes("RSI")) {
    return { lane: "盘中看价格", action, order: 2, tone: "waiting" };
  }
  if (action === "先核验" || title.includes("喊单") || title.includes("Reddit")) {
    return { lane: "先核验", action, order: 3, tone: "waiting" };
  }
  if (title.includes("官方模式") || body.includes("已隐藏") || body.includes("低信号")) {
    return { lane: "删除噪音", action: "保持过滤", order: 4, tone: "closed" };
  }
  if (alert?.tone === "closed") {
    return { lane: "只观察", action: "先别追", order: 5, tone: "closed" };
  }
  return { lane: "排队看", action, order: 6, tone: alert?.tone || "waiting" };
}

function renderAlerts(p = getProfile(state.activeSymbol), scores = null, chartData = null, analysisData = null, liveEvidence = null) {
  if (!el.alertList) return;
  const activeChart = chartData || state.quotes.get(`${state.activeSymbol}:${state.range}`);
  const activeAnalysis = analysisData || state.quotes.get(`${state.activeSymbol}:1y`) || activeChart;
  const evidence = liveEvidence || state.evidence.get(state.activeSymbol);
  const activeScores = scores || scoreAll(p, activeAnalysis, evidence);
  renderAlertRules(p, activeScores, activeChart, activeAnalysis, evidence);
  const alerts = buildAlerts(p, activeScores, activeChart, activeAnalysis, evidence)
    .map(alert => ({ ...alert, task: alertTaskMeta(alert) }))
    .sort((a, b) => a.task.order - b.task.order);
  el.alertList.innerHTML = alerts.length ? alerts.map((alert, idx) => `
    <div class="alert-item ${escapeHtml(alert.task.tone || alert.tone)}">
      <div class="alert-item-head">
        <span>${escapeHtml(alert.task.lane)}</span>
        <strong>${escapeHtml(alert.title)}</strong>
        <em>${escapeHtml(alert.task.action)}</em>
      </div>
      <p>${escapeHtml(alert.body)}</p>
    </div>
  `).join("") : `
    <div class="alert-empty">暂无高优先提醒。先看大盘环境、证据和价格位置。</div>
  `;
}

function renderUniverse() {
  const rows = visibleUniverse();
  el.universeMeta.textContent = `${rows.length} 个标的 · ${state.range} 图表`;
  el.universeRows.innerHTML = rows.map(item => {
    const data = state.quotes.get(`${item.symbol}:1y`);
    const chartData = state.quotes.get(`${item.symbol}:${state.range}`) || data;
    const scores = scoreAll(item, data, state.evidence.get(item.symbol));
    const cls = chartData?.changePct > 0 ? "positive" : chartData?.changePct < 0 ? "negative" : "flat";
    const price = chartData?.latest?.close ? fmtUsd.format(chartData.latest.close) : state.loading.has(item.symbol) ? "载入中" : "待刷新";
    const change = chartData ? `${chartData.changePct >= 0 ? "+" : ""}${fmtPct.format(chartData.changePct)}%` : "--";
    const displayName = displayNameWithZh(item.symbol, item.name);
    return `
      <button class="universe-row ${item.symbol === state.activeSymbol ? "active" : ""}" data-symbol="${item.symbol}" type="button">
        <span class="ticker">${item.symbol}</span>
        <span class="company"><strong title="${escapeHtml(displayName)}">${escapeHtml(displayName)}</strong><span>${price} · <b class="${cls}">${change}</b> · ${escapeHtml(item.layer)}</span></span>
        <span class="row-score"><strong>${scores.composite}</strong><span>优先级</span></span>
      </button>
    `;
  }).join("");
  [...el.universeRows.querySelectorAll(".universe-row")].forEach(row => row.addEventListener("click", () => selectSymbol(row.dataset.symbol)));
  renderMoverRadar();
}

function portfolioTypeLabel(type) {
  return { guru: "大师", activist: "激进", congress: "国会", government: "政府", ai: "AI" }[type] || type;
}

function portfolioSourceMeta(portfolio) {
  return PORTFOLIO_SOURCE_TYPES[portfolio?.sourceType] || PORTFOLIO_SOURCE_TYPES.manual;
}

function portfolioSourceBadge(portfolio) {
  const meta = portfolioSourceMeta(portfolio);
  return `<span class="portfolio-source-pill ${escapeHtml(meta.tone)}">${escapeHtml(meta.short)}</span>`;
}

function portfolioSourceDetail(portfolio) {
  const meta = portfolioSourceMeta(portfolio);
  return `${meta.label} · ${portfolio.sourceFreshness || "待核验"}`;
}

function portfolioSourceKind(portfolio) {
  const labels = {
    official13f: "真实13F",
    beneficial: "权益披露",
    congress: "国会延迟",
    oge: "OGE延迟",
    publicFund: "基金披露",
    synthetic: "模拟篮子",
    manual: "人工核验"
  };
  return labels[portfolio?.sourceType] || "待核验";
}

function renderPortfolioSourceAudit(rows) {
  if (!el.portfolioSourceAudit) return;
  const active = rows.find(row => row.item.id === state.activePortfolio)?.item || rows[0]?.item || PORTFOLIOS[0];
  const counts = PORTFOLIOS.reduce((acc, portfolio) => {
    const key = portfolio.sourceType || "manual";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  const verifiedCount = (counts.official13f || 0) + (counts.beneficial || 0) + (counts.publicFund || 0) + (counts.congress || 0) + (counts.oge || 0);
  el.portfolioSourceAudit.innerHTML = `
    <div class="source-audit-main">
      <strong>资金来源审计</strong>
      <span>真实披露、人工维护和模拟篮子分开看，先验不会伪装成账户。</span>
    </div>
    <div class="source-audit-pills">
      <span class="source-pill strong">可回源 ${verifiedCount}</span>
      <span class="source-pill waiting">模型 ${counts.synthetic || 0}</span>
      <span class="source-pill weak">人工 ${counts.manual || 0}</span>
      <span class="source-pill medium">${escapeHtml(active.name)} · ${escapeHtml(portfolioSourceDetail(active))}</span>
    </div>
  `;
}

function renderThirteenFQueue() {
  if (!el.thirteenFQueue) return;
  const connected = SMART_MONEY_13F_QUEUE.filter(row => row.type.includes("已接入")).length;
  const priority = SMART_MONEY_13F_QUEUE.filter(row => row.type.includes("优先")).length;
  el.thirteenFQueue.innerHTML = `
    <div class="thirteenf-summary">
      <div><strong>${SMART_MONEY_13F_QUEUE.length}</strong><span>资金池</span></div>
      <div><strong>${connected}</strong><span>已接入</span></div>
      <div><strong>${priority}</strong><span>优先接入</span></div>
      <p>已回源的进入持仓榜，未核验的只留在队列；13F 仍是季度滞后，不当成实时交易。</p>
    </div>
    <div class="thirteenf-list">
      ${SMART_MONEY_13F_QUEUE.map(row => {
        const source = PORTFOLIO_SOURCE_TYPES[row.sourceType] || PORTFOLIO_SOURCE_TYPES.manual;
        return `
          <article class="thirteenf-row">
            <div class="thirteenf-row-head">
              <span class="source-pill ${escapeHtml(source.tone)}">${escapeHtml(row.type)}</span>
              <strong>${escapeHtml(row.manager)}（${escapeHtml(row.cn)}）</strong>
              <a href="${escapeHtml(row.url)}" target="_blank" rel="noreferrer">回源</a>
            </div>
            <p>${escapeHtml(row.focus)}</p>
            <div class="thirteenf-tags">
              ${row.tickers.map(symbol => symbol === "--"
                ? `<span>按披露筛选</span>`
                : `<button data-queue-symbol="${escapeHtml(symbol)}" type="button">${escapeHtml(symbol)}</button>`).join("")}
            </div>
            <em>${escapeHtml(row.nextStep)}</em>
          </article>
        `;
      }).join("")}
    </div>
  `;
  [...el.thirteenFQueue.querySelectorAll("[data-queue-symbol]")].forEach(button => {
    button.addEventListener("click", () => {
      openSymbol(button.dataset.queueSymbol);
      state.viewMode = "research";
      applyViewMode();
      document.querySelector(".hero-panel")?.scrollIntoView({ block: "start", behavior: window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ? "auto" : "smooth" });
    });
  });
}

function visiblePortfolios() {
  const rows = PORTFOLIOS.filter(item => state.portfolioFilter === "all" || item.type === state.portfolioFilter)
    .map(item => ({ item, stats: portfolioWeightedReturn(item) }))
    .sort((a, b) => b.stats.return250 - a.stats.return250);
  if (rows.length && !rows.some(row => row.item.id === state.activePortfolio)) {
    state.activePortfolio = rows[0].item.id;
  }
  return rows;
}

function syncPortfolioFilterControls() {
  document.querySelectorAll("[data-portfolio-filter]").forEach(button => {
    button.classList.toggle("active", button.dataset.portfolioFilter === state.portfolioFilter);
  });
}

function setPortfolioFilter(filter = "all") {
  state.portfolioFilter = filter;
  syncPortfolioFilterControls();
  renderPortfolioBoard();
}

function portfolioRing(portfolio, compact = false) {
  const badges = portfolio.holdings.slice(0, compact ? 3 : 5).map((holding, idx) => `
    ${visualToken({
      className: `ring-badge pos-${idx}`,
      src: companyLogoUrl(holding.symbol),
      fallback: holdingTicker(holding).slice(0, 2),
      alt: `${holdingTicker(holding)} logo`
    })}
  `).join("");
  return `
    <div class="portfolio-ring ${compact ? "compact" : ""}" style="--ring-bg:${donutGradient(portfolio.holdings)}">
      <div class="ring-core">
        ${visualToken({
          className: `person-avatar ${portfolio.id === "serenity" ? "serenity-avatar" : ""}`,
          src: portfolioAvatarUrl(portfolio),
          fallback: portfolio.avatar,
          alt: `${portfolio.name} avatar`
        })}
      </div>
      ${badges}
    </div>
  `;
}

function renderPortfolioCard(portfolio, stats) {
  const top = stats.holdings.slice(0, 2);
  const cls = stats.return250 >= 0 ? "positive" : "negative";
  const source = portfolioSourceMeta(portfolio);
  const sourceName = portfolio.sourceName || source.label;
  return `
    <button class="portfolio-card ${portfolio.id === state.activePortfolio ? "active" : ""}" data-portfolio-id="${escapeHtml(portfolio.id)}" type="button">
      <div class="portfolio-card-copy">
        <div class="portfolio-card-title">
          <strong>${escapeHtml(portfolio.name)}</strong>
          <span>${escapeHtml(portfolioTypeLabel(portfolio.type))} · ${portfolioSourceBadge(portfolio)}</span>
        </div>
        <div class="portfolio-return ${cls}">${formatSignedPct(stats.return250)} <span>250日涨幅</span></div>
        <div class="portfolio-top-two">
          ${top.map(holding => `<span>${escapeHtml(holdingTicker(holding))}</span><strong>${fmtPct.format(holding.weight)}%</strong>`).join("")}
        </div>
        <small class="portfolio-source-note">
          <span class="source-kind ${escapeHtml(source.tone)}">${escapeHtml(portfolioSourceKind(portfolio))}</span>
          <em>${escapeHtml(sourceName)}</em>
        </small>
      </div>
      ${portfolioRing(portfolio, true)}
    </button>
  `;
}

function renderPortfolioConsensus() {
  if (!el.portfolioConsensus) return;
  const rows = portfolioConsensusRows();
  const scope = state.portfolioFilter === "all" ? "全部组合" : portfolioTypeLabel(state.portfolioFilter);
  if (!rows.length) {
    el.portfolioConsensus.innerHTML = `<div class="portfolio-consensus-empty">当前过滤下没有可统计的持仓。</div>`;
    return;
  }
  el.portfolioConsensus.innerHTML = `
    <div class="portfolio-consensus-head">
      <div>
        <strong>聪明钱共识榜</strong>
        <span>${escapeHtml(scope)} · 按组合重合数和合计仓位排序</span>
      </div>
      <em>${rows.length} 个高重合标的</em>
    </div>
    <div class="portfolio-consensus-grid">
      ${rows.map((row, idx) => {
        const cls = row.changePct > 0 ? "positive" : row.changePct < 0 ? "negative" : "flat";
        const holders = row.portfolios.slice(0, 3).map(item => item.portfolio.name.replace("持仓", "")).join(" / ");
        return `
          <button class="consensus-row ${row.symbol === state.activeSymbol ? "active" : ""}" data-consensus-symbol="${escapeHtml(row.symbol)}" type="button">
            <span class="consensus-rank">${idx + 1}</span>
            ${visualToken({
              className: "consensus-logo",
              src: companyLogoUrl(row.symbol),
              fallback: row.display.slice(0, 2),
              alt: `${row.display} logo`
            })}
            <span class="consensus-main">
              <strong>${escapeHtml(row.display)} ${escapeHtml(row.name)}</strong>
              <em>${row.count} 组共持 · 合计仓位 ${fmtPct.format(row.totalWeight)}%</em>
              <small>${escapeHtml(holders)}</small>
            </span>
            <b class="${cls}">${row.changePct == null ? "待行情" : formatSignedPct(row.changePct)}</b>
          </button>
        `;
      }).join("")}
    </div>
  `;
  [...el.portfolioConsensus.querySelectorAll("[data-consensus-symbol]")].forEach(button => {
    button.addEventListener("click", () => {
      openSymbol(button.dataset.consensusSymbol);
      state.viewMode = "research";
      applyViewMode();
      document.querySelector(".hero-panel")?.scrollIntoView({ block: "start", behavior: window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ? "auto" : "smooth" });
    });
  });
}

function renderPortfolioSpotlight(portfolio, stats) {
  const benchmark = stats.benchmark;
  const alpha = Number.isFinite(benchmark) ? stats.return250 - benchmark : null;
  const source = portfolioSourceMeta(portfolio);
  const series = portfolioSeries(portfolio);
  const spy = benchmarkSeries();
  const rows = stats.holdings.slice(0, 10).map((holding, idx) => {
    const changeCls = holding.ret250 > 0 ? "positive" : holding.ret250 < 0 ? "negative" : "flat";
    const displayName = displayNameWithZh(holding.symbol, holding.name);
    return `
      <div class="holding-row">
        <div class="holding-main">
          ${visualToken({
            className: "holding-logo",
            src: companyLogoUrl(holding.symbol),
            fallback: holdingTicker(holding).slice(0, 2),
            alt: `${holdingTicker(holding)} logo`
          })}
          <div>
            <strong title="${escapeHtml(displayName)}">${escapeHtml(holdingTicker(holding))} ${escapeHtml(displayName)}</strong>
            <span>${formatHoldingPrice(holding.data)} · <b class="${changeCls}">${formatSignedPct(holding.ret250)}</b></span>
          </div>
        </div>
        <div class="holding-stat"><span>持仓占比</span><strong>${fmtPct.format(holding.weight)}%</strong></div>
        <div class="holding-stat"><span>平均目标价</span><strong>${holding.avg ? fmtUsd.format(holding.avg) : "--"}</strong></div>
        <button class="holding-open" data-symbol="${escapeHtml(holding.symbol)}" type="button">打开</button>
      </div>
    `;
  }).join("");

  el.portfolioSpotlight.innerHTML = `
    <div class="portfolio-focus">
      <div class="portfolio-focus-left">
        <div class="portfolio-focus-title">
          <div>
            <strong>${escapeHtml(portfolio.name)}</strong>
            <span>${escapeHtml(portfolio.owner)} · ${stats.live ? "live 价格加权" : "等待价格，使用种子收益"}</span>
          </div>
          <span class="type-pill">${escapeHtml(portfolioTypeLabel(portfolio.type))} · ${escapeHtml(source.short)}</span>
        </div>
        <div class="portfolio-big-return ${stats.return250 >= 0 ? "positive" : "negative"}">${formatSignedPct(stats.return250)} <span>250日组合收益</span></div>
        <p>${escapeHtml(portfolio.note)}</p>
        <div class="portfolio-summary">
          <div><span>SPY 250日</span><strong>${formatSignedPct(benchmark)}</strong></div>
          <div><span>相对 SPY</span><strong class="${alpha > 0 ? "positive" : alpha < 0 ? "negative" : "flat"}">${formatSignedPct(alpha)}</strong></div>
          <div><span>数据覆盖</span><strong>${Math.round(stats.coverage * 100)}%</strong></div>
          <div><span>来源等级</span><strong>${escapeHtml(source.label)}</strong></div>
        </div>
        <div class="portfolio-source-callout ${escapeHtml(source.tone)}">
          <strong>${escapeHtml(portfolio.sourceName || source.label)}</strong>
          <span>${escapeHtml(source.description)} ${portfolio.sourceUrl ? "可点击回源核验。" : "当前仅作研究标签。"}</span>
          ${portfolio.sourceUrl ? `<a href="${escapeHtml(portfolio.sourceUrl)}" target="_blank" rel="noreferrer">打开来源</a>` : ""}
        </div>
      </div>
      <div class="portfolio-focus-ring">${portfolioRing(portfolio)}</div>
    </div>
    <div class="portfolio-analysis">
      <div class="portfolio-chart-head">
        <strong>收益分析</strong>
        <span><i class="spark-dot portfolio"></i>组合收益</span>
        <span><i class="spark-dot benchmark"></i>SPY</span>
      </div>
      ${sparklineSvg(series, spy)}
    </div>
    <div class="holding-list">${rows}</div>
  `;

  [...el.portfolioSpotlight.querySelectorAll(".holding-open")].forEach(button => {
    button.addEventListener("click", event => {
      event.stopPropagation();
      state.viewMode = "research";
      applyViewMode();
      selectSymbol(button.dataset.symbol);
      document.querySelector(".hero-panel")?.scrollIntoView({ block: "start", behavior: window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ? "auto" : "smooth" });
    });
  });
}

function renderPortfolioBoard() {
  const rows = visiblePortfolios();
  const active = rows.find(row => row.item.id === state.activePortfolio) || rows[0];
  const liveLoaded = rows.reduce((sum, row) => sum + row.stats.loaded, 0);
  const totalHoldings = rows.reduce((sum, row) => sum + row.stats.holdings.length, 0);
  syncPortfolioFilterControls();
  renderPortfolioConsensus();
  renderPortfolioSourceAudit(rows);
  renderThirteenFQueue();
  if (el.portfolioMeta) {
    el.portfolioMeta.textContent = `${rows.length} 个组合 · ${liveLoaded}/${totalHoldings} 持仓已接 live 价格 · 250日`;
  }
  if (active && el.portfolioSpotlight) renderPortfolioSpotlight(active.item, active.stats);
  if (!el.portfolioBoard) return;
  el.portfolioBoard.innerHTML = rows.map(row => renderPortfolioCard(row.item, row.stats)).join("");
  [...el.portfolioBoard.querySelectorAll(".portfolio-card")].forEach(card => {
    card.addEventListener("click", () => {
      state.activePortfolio = card.dataset.portfolioId;
      renderPortfolioBoard();
    });
  });
}

function congressFocusSymbols() {
  return normalizeSymbolList([
    ...state.watchlist,
    ...state.compareSymbols,
    ...PORTFOLIOS.flatMap(portfolio => portfolio.holdings.map(holding => holding.symbol))
  ]).slice(0, 80);
}

function congressTradeTone(row) {
  if (!row) return "waiting";
  if (row.transactionZh === "买入") return "open";
  if (row.transactionZh === "卖出") return "closed";
  return "waiting";
}

function congressLagText(row) {
  if (row?.reportLagDays === null || row?.reportLagDays === undefined || row?.reportLagDays === "") return "披露延迟待核";
  const lag = Number(row?.reportLagDays);
  if (!Number.isFinite(lag)) return "披露延迟待核";
  if (lag <= 0) return "当日披露";
  return `披露滞后 ${lag} 天`;
}

function congressReturnText(row) {
  if (row?.excessReturn === null || row?.excessReturn === undefined || row?.excessReturn === "") return "超额待算";
  const value = Number(row?.excessReturn);
  if (!Number.isFinite(value)) return "超额待算";
  return `超额 ${formatSignedPct(value)}`;
}

function congressRowDate(row) {
  if (!row) return "日期待核";
  const report = row.reportDate || "报告待核";
  const tx = row.transactionDate || "交易待核";
  return `${tx} 交易 · ${report} 披露`;
}

function openCongressSymbol(symbol, name = "") {
  if (!symbol) return;
  const cleanSymbol = resolveInputSymbol(symbol);
  if (!UNIVERSE.some(item => item.symbol === cleanSymbol)) {
    const discovered = getProfile(cleanSymbol);
    discovered.name = canonicalStockName(cleanSymbol, name || discovered.name);
    discovered.theme = "国会交易披露线索";
    discovered.layer = discovered.layer === "待定位" ? "STOCK Act 披露命中，需回到官方文件核验" : discovered.layer;
    discovered.tags = [...new Set([...(discovered.tags || []), "国会交易", "披露延迟", "政策线索"])];
    UNIVERSE.unshift(discovered);
  }
  state.viewMode = "research";
  applyViewMode();
  selectSymbol(cleanSymbol);
  document.querySelector(".hero-panel")?.scrollIntoView({ block: "start", behavior: window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ? "auto" : "smooth" });
}

function congressTradeCard(row) {
  const tone = congressTradeTone(row);
  const displayName = displayNameWithZh(row.symbol, row.description || row.symbol);
  const party = row.party ? `${row.party} · ` : "";
  return `
    <button class="congress-trade-card ${escapeHtml(tone)} ${row.focus ? "focus" : ""}" data-congress-symbol="${escapeHtml(row.symbol)}" data-congress-name="${escapeHtml(row.description || "")}" type="button">
      <span class="congress-action ${escapeHtml(tone)}">${escapeHtml(row.transactionZh || "披露")}</span>
      <span class="congress-trade-main">
        <strong title="${escapeHtml(displayName)}">${escapeHtml(row.symbol)} ${escapeHtml(displayName)}</strong>
        <em>${escapeHtml(row.representative || "Congress member")} · ${escapeHtml(party + (row.house || "Congress"))}</em>
        <small>${escapeHtml(congressRowDate(row))}</small>
      </span>
      <span class="congress-trade-stat">
        <strong>${escapeHtml(row.range || "金额区间待核")}</strong>
        <em class="${Number(row.excessReturn) > 0 ? "positive" : Number(row.excessReturn) < 0 ? "negative" : "flat"}">${escapeHtml(congressReturnText(row))}</em>
        <small>${escapeHtml(congressLagText(row))}</small>
      </span>
    </button>
  `;
}

function renderCongressTrades() {
  if (!el.congressTradesBoard) return;
  const payload = state.congressTrades;
  const source = payload?.source;
  const focusItems = payload?.focusItems || [];
  const recentBuys = (payload?.purchaseItems || []).slice(0, 6);
  const recentItems = (payload?.recentItems || []).slice(0, 6);
  const hot = (payload?.hotSymbols || []).slice(0, 8);
  const fetched = payload?.fetchedAt ? formatMonitorTime(payload.fetchedAt) : "等待同步";
  if (el.congressTradesRefresh) {
    el.congressTradesRefresh.classList.toggle("active", state.congressTradesLoading);
  }
  if (el.congressTradesMeta) {
    if (state.congressTradesError) {
      el.congressTradesMeta.textContent = `源暂不可用 · ${state.congressTradesError}`;
    } else if (source?.status === "ok") {
      el.congressTradesMeta.textContent = `${source.count || 0} 笔披露 · 自选/持仓命中 ${focusItems.length} · ${fetched}`;
    } else {
      el.congressTradesMeta.textContent = "Quiver Quant · STOCK Act 披露 · 只作延迟线索";
    }
  }
  if (state.congressTradesLoading && !payload) {
    el.congressTradesBoard.innerHTML = `<div class="congress-trades-empty">正在读取国会交易披露。</div>`;
    return;
  }
  if (state.congressTradesError && !payload) {
    el.congressTradesBoard.innerHTML = `
      <div class="congress-trades-empty">
        国会交易源暂不可用：${escapeHtml(state.congressTradesError)}。先用下方来源入口手动查。
      </div>
      <div class="congress-source-links">
        <a href="https://quiverquant.com/congresstrading" target="_blank" rel="noreferrer">Quiver Quant</a>
        <a href="https://www.capitoltrades.com/trades" target="_blank" rel="noreferrer">Capitol Trades</a>
        <a href="https://unusualwhales.com/politics" target="_blank" rel="noreferrer">Unusual Whales</a>
        <a href="https://www.congressstock.com/trades" target="_blank" rel="noreferrer">CongressStock</a>
      </div>
    `;
    return;
  }
  if (!payload) {
    el.congressTradesBoard.innerHTML = `<div class="congress-trades-empty">等待国会交易数据。</div>`;
    return;
  }
  const primary = focusItems.length ? focusItems.slice(0, 6) : recentBuys;
  el.congressTradesBoard.innerHTML = `
    <div class="congress-summary-strip">
      <div>
        <strong>${focusItems.length ? "自选 / 持仓命中" : "最近买入披露"}</strong>
        <span>披露有时间差，金额是区间，不直接当买卖点。</span>
      </div>
      <em>${escapeHtml(source?.name || "Congress trading")}</em>
    </div>
    <div class="congress-trades-grid">
      ${primary.map(congressTradeCard).join("")}
    </div>
    <div class="congress-secondary">
      <div class="congress-hot">
        <strong>高频 ticker</strong>
        <div>
          ${hot.map(row => `
            <button data-congress-symbol="${escapeHtml(row.symbol)}" type="button">
              ${escapeHtml(row.symbol)}
              <em>${escapeHtml(row.buy || 0)}买/${escapeHtml(row.sell || 0)}卖</em>
            </button>
          `).join("")}
        </div>
      </div>
      <div class="congress-recent">
        <strong>最新披露</strong>
        ${recentItems.slice(0, 4).map(row => `
          <button data-congress-symbol="${escapeHtml(row.symbol)}" data-congress-name="${escapeHtml(row.description || "")}" type="button">
            <span>${escapeHtml(row.symbol)}</span>
            <em>${escapeHtml(row.transactionZh)} · ${escapeHtml(row.representative || "--")} · ${escapeHtml(row.reportDate || "--")}</em>
          </button>
        `).join("")}
      </div>
    </div>
    <div class="congress-source-links">
      ${(payload.links || []).map(link => `<a href="${escapeHtml(link.url)}" target="_blank" rel="noreferrer">${escapeHtml(link.label)}</a>`).join("")}
    </div>
  `;
  [...el.congressTradesBoard.querySelectorAll("[data-congress-symbol]")].forEach(button => {
    button.addEventListener("click", event => {
      event.preventDefault();
      openCongressSymbol(button.dataset.congressSymbol, button.dataset.congressName || "");
    });
  });
}

async function fetchCongressTrades(force = false) {
  state.congressTradesLoading = true;
  state.congressTradesError = "";
  renderCongressTrades();
  try {
    const params = new URLSearchParams({ symbols: congressFocusSymbols().join(",") });
    if (force) params.set("force", "1");
    const res = await fetch(`/api/congress-trades?${params.toString()}`);
    if (!res.ok) throw new Error(`congress trades service returned ${res.status}`);
    const payload = await res.json();
    if (payload.error) throw new Error(payload.error);
    state.congressTrades = payload;
  } catch (error) {
    state.congressTradesError = error.message;
  } finally {
    state.congressTradesLoading = false;
    renderCongressTrades();
  }
}

function renderActive(chartData, analysisData, liveEvidence = null) {
  const p = getProfile(state.activeSymbol);
  const data = analysisData || chartData;
  const evidence = liveEvidence || state.evidence.get(p.symbol);
  const scores = scoreAll(p, data, evidence);
  const activeDisplayName = displayNameWithZh(p.symbol, p.name === p.symbol && chartData?.meta?.shortName ? chartData.meta.shortName : p.name);
  el.activeTicker.textContent = p.symbol;
  el.activeName.textContent = activeDisplayName;
  el.activeName.title = activeDisplayName;
  el.activeTheme.textContent = p.theme;
  el.activeMeta.textContent = `${chartData?.meta?.exchange || "US"} · ${chartData?.meta?.currency || "USD"} · ${chartData?.points?.length || 0} 根K线 · ${p.role}`;
  updateTradingViewLink(p.symbol, chartData);
  el.activePrice.textContent = chartData?.latest?.close ? formatHoldingPrice(chartData) : "--";
  el.activeChange.className = chartData?.changePct > 0 ? "positive" : chartData?.changePct < 0 ? "negative" : "flat";
  el.activeChange.textContent = chartData ? `${chartData.change >= 0 ? "+" : ""}${formatPriceByCurrency(chartData.change, chartData.meta?.currency || "USD")} (${chartData.changePct >= 0 ? "+" : ""}${fmtPct.format(chartData.changePct)}%)` : "--";
  updateActiveCny(chartData);
  el.compositeScore.textContent = scores.composite;
  el.compositeVerdict.textContent = verdict(scores.composite);
  el.metricStrip.innerHTML = [
    ["区间涨跌", chartData ? `${chartData.rangeChange >= 0 ? "+" : ""}${fmtPct.format(chartData.rangeChange)}%` : "--", chartData?.rangeChange > 0 ? "positive" : chartData?.rangeChange < 0 ? "negative" : ""],
    ["RSI 14", data?.rsi == null ? "--" : fmtPct.format(data.rsi), ""],
    ["年化波动", data ? `${fmtPct.format(data.volatility)}%` : "--", ""],
    ["最大回撤", data ? `${fmtPct.format(data.drawdown)}%` : "--", data?.drawdown < -20 ? "negative" : ""],
    ["成交量", chartData?.latest?.volume ? fmtCompact.format(chartData.latest.volume) : "--", ""]
  ].map(([label, value, className]) => `<div class="metric"><span>${label}</span><strong class="${className}">${value}</strong></div>`).join("");
  renderChinaAction(p, scores, chartData);
  renderResearchSummaryBox(p, scores, chartData, data, evidence);
  renderDecisionBoard(p, scores, chartData, data, evidence);
  renderCatalystCalendar(p, evidence);
  renderEventClusters(p, evidence);
  renderAlerts(p, scores, chartData, data, evidence);
  renderPortfolioExposure(p);
  renderWatchlist();
  renderWatchRadar();
  renderCompareBoard();
  renderSessionMode();
  renderDailyBrief();
  renderDataHealth();
  renderEngines(p, scores, evidence);
  renderResearchPack(p, scores, chartData, data, evidence);
  renderMemo(p, scores, data, evidence);
  renderEvidence(p, evidence);
  renderLedger(p, scores, evidence);
}

function renderEngines(p, scores, liveEvidence = null) {
  const liveScore = scores.live?.score || evidenceSignal(liveEvidence).score;
  el.bottleneckScore.textContent = scores.bottleneck.score;
  el.bottleneckBars.innerHTML = scoreRows([
    ["需求拐点", p.factors.demandInflection * 20],
    ["卡点强度", p.factors.chokepointSeverity * 20],
    ["扩产难度", p.factors.expansionDifficulty * 20],
    ["证据质量", Math.max(p.factors.evidenceQuality * 20, liveScore)]
  ], 2);

  el.gfDmaScore.textContent = scores.gf.score;
  el.gfDmaBars.innerHTML = scoreRows([
    ["基本面-均线匹配", scores.gf.growthMatch],
    ["股价-均线背离", scores.gf.divergence],
    ["预期上修确认", scores.gf.revision]
  ]);

  el.alphaScore.textContent = scores.alpha;
  el.alphaBars.innerHTML = scoreRows([
    ["需求确定性", p.alpha.demand * 20],
    ["财报传导清晰", p.alpha.transmission * 20],
    ["市值弹性", p.alpha.elasticity * 20],
    ["验证速度", p.alpha.verification * 20]
  ], 3);

  el.bayesianScore.textContent = scores.bayesian.score;
  el.bayesianBars.innerHTML = scoreRows([
    ["H4 结构爆发", p.bayes[4]],
    ["H5 平台扩张", p.bayes[5]],
    ["内在增长", clamp(scores.bayesian.weightedGrowth * 2, 0, 100)]
  ], 1);

  el.tamPegScore.textContent = scores.tam.score;
  el.tamPegDetails.innerHTML = detailItems([
    ["Forward PE", p.valuation.forwardPE || "N/A"],
    ["EPS CAGR", `${p.valuation.epsCagr || 0}%`],
    ["质量系数", p.valuation.qualityFactor?.toFixed(2) || "--"],
    ["TAM-Adj-PEG", scores.tam.tamPeg == null ? "失真" : scores.tam.tamPeg.toFixed(2)]
  ]);

  el.corpusScore.textContent = scores.corpus;
  el.corpusDetails.innerHTML = detailItems([
    ["实时证据", `${liveScore}/100`],
    ["核心层级", p.layer],
    ["研究标签", p.tags.slice(0, 3).join(" / ")]
  ]);
}

function scoreRows(items, attentionIdx = -1) {
  return items.map(([label, value], idx) => `
    <div class="score-row ${idx === attentionIdx ? "attention" : ""}">
      <div class="score-label"><strong>${label}</strong><span>${Math.round(value)}/100</span></div>
      <div class="score-track"><div class="score-fill" style="width:${clamp(value, 0, 100)}%"></div></div>
    </div>
  `).join("");
}

function detailItems(items) {
  return items.map(([label, value]) => `<div class="detail-item"><span>${label}</span><strong>${value}</strong></div>`).join("");
}

function renderMemo(p, scores, data, liveEvidence = null) {
  const evidence = evidenceSummary(liveEvidence);
  const stateText = decisionState(p, scores, data, data, liveEvidence);
  el.memoHorizon.textContent = scores.composite >= 72 ? "优先 1-4 个季度验证" : "先补证据再升级";
  el.researchMemo.innerHTML = [
    ["当前结论", `${p.symbol} 当前状态是“${stateText.label}”。综合优先级 ${scores.composite}/100，实时证据 ${evidence.score}/100。`],
    ["为什么值得看", `${p.theme} 的核心在 ${p.layer}。如果这一层继续成为扩张约束，研究优先级才有意义。`],
    ["最容易错", scores.bottleneck.score >= 75 ? "容易只看故事热度，却忽略订单能不能进收入、毛利率能不能兑现。" : "市场可能已经把主要叙事定价进去，需要更硬的财务或客户证据。"],
    ["下一步", p.checks[0] || "先查最新 10-Q/10-K、财报电话会和 IR 材料。"]
  ].map(([title, body]) => `
    <div class="memo-block">
      <div class="memo-kicker">${title}</div>
      <p>${body}</p>
      ${title === "系统变化" ? `<div class="tag-list">${p.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}</div>` : ""}
    </div>
  `).join("");
}

function evidenceClass(strength) {
  return String(strength || "Needs checking").toLowerCase().replace(/\s+/g, "-");
}

function sourceStatusLabel(status) {
  return {
    ok: "已连接",
    unavailable: "不可用",
    not_found: "未找到",
    not_applicable: "不适用",
    not_configured: "手动源",
    needs_token: "等待 Token",
    loading: "读取中",
    waiting: "等待返回"
  }[status] || status || "未知";
}

function renderEvidence(p, liveEvidence = null) {
  renderEvidenceEventDigest(liveEvidence);
  const sources = liveEvidence?.sources || [];
  const rankedItems = sortedEvidenceItems(liveEvidence).filter(evidenceAllowedByStrictness);
  const primaryItems = primaryEvidenceRows(liveEvidence);
  const visibleItems = primaryItems.length ? primaryItems : rankedItems.slice(0, 6);
  const visibleKeys = new Set(visibleItems.map(evidenceRowKey));
  const visibleEvents = new Set(visibleItems.map(item => item._mergedKey || eventKeyForEvidence(item)));
  const extraItems = rankedItems
    .filter(item => !visibleKeys.has(evidenceRowKey(item)))
    .filter(item => !visibleEvents.has(eventKeyForEvidence(item)))
    .slice(0, 18);
  const visibleSources = sources.filter(source => source.status === "ok" || source.count > 0).slice(0, 8);
  const sourceStrip = sources.length ? `
    <div class="source-strip">
      ${(visibleSources.length ? visibleSources : sources.slice(0, 6)).map(source => `
        <span class="source-pill ${escapeHtml(source.status)}" title="${escapeHtml(source.detail || "")}">
          ${escapeHtml(source.nameZh || source.name)} · ${escapeHtml(source.statusZh || sourceStatusLabel(source.status))} · ${source.count || 0}
        </span>
      `).join("")}
    </div>
  ` : "";
  const fetched = liveEvidence?.fetchedAt ? formatEvidenceDate(liveEvidence.fetchedAt) : "等待实时证据";
  const evidenceCard = item => {
    const cls = evidenceClass(item.strength);
    const trust = evidenceTrust(item);
    const impact = newsImpact(item);
    const baseKindLabel = item.kindLabel || item.kind || "来源";
    const kindLabel = item.tierLabel ? `${baseKindLabel} · ${item.tierLabel}` : baseKindLabel;
    const actionHint = item.actionHint ? `<div class="evidence-action">${escapeHtml(item.actionHint)}</div>` : "";
    const merged = item._mergedCount > 1
      ? `<span class="merged-badge">${escapeHtml(item._mergedKey || "事件合并")} · ${item._mergedCount} 源</span>`
      : "";
    const mergedSources = item._mergedSources?.length
      ? `<div class="evidence-merged-sources">${item._mergedSources.map(source => `<i>${escapeHtml(source)}</i>`).join("")}</div>`
      : "";
    const title = escapeHtml(evidenceTitleZh(item));
    const summary = evidenceSummaryZh(item);
    const titleMarkup = item.url
      ? `<a class="evidence-link" href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer">${title}</a>`
      : `<strong class="evidence-link">${title}</strong>`;
    return `
      <div class="evidence-item live ${cls}">
        <div class="evidence-title-row">
          <span class="strength">${escapeHtml(item.strengthLabel || item.strength || "待核验")}</span>
          <span class="impact-badge ${escapeHtml(impact.tone)}" title="${escapeHtml(impact.reason)}">${escapeHtml(impact.label)} · ${impact.score}</span>
          <span class="trust-badge ${escapeHtml(trust.tone)}" title="${escapeHtml(trust.reason)}">${escapeHtml(trust.label)} · ${trust.score}</span>
          <span class="evidence-kind">${escapeHtml(kindLabel)}</span>
        </div>
        ${merged}
        ${titleMarkup}
        <p>${escapeHtml(summary)}</p>
        ${mergedSources}
        ${actionHint}
        <div class="evidence-meta">${escapeHtml(item.sourceZh || item.source)} · ${escapeHtml(formatEvidenceDate(item._mergedLatestDate || item.date))} · ${escapeHtml(item.freshnessZh || item.freshness || "")}</div>
      </div>
    `;
  };
  const liveMarkup = visibleItems.length ? visibleItems.map(evidenceCard).join("") : `
    <div class="evidence-item needs-checking">
      <span class="strength">待核验</span>
      <p>实时证据源暂时没有返回可用条目；先按本地框架假设处理，并回到 SEC、IR、官方公告核验。</p>
    </div>
  `;
  const extraMarkup = extraItems.length ? `
    <details class="evidence-more">
      <summary>展开 ${extraItems.length} 条低权重线索</summary>
      ${extraItems.map(evidenceCard).join("")}
    </details>
  ` : "";
  const localVisible = p.evidence.slice(0, 2);
  const localExtra = p.evidence.slice(2);
  const localMarkup = localVisible.map(([strength, text]) => {
    const cls = evidenceClass(strength);
    const label = STRENGTH_LABELS?.[strength] || strength;
    return `<div class="evidence-item local ${cls}"><span class="strength">${escapeHtml(label)}</span><p>${escapeHtml(text)}</p></div>`;
  }).join("");
  const localMoreMarkup = localExtra.length ? `
    <details class="evidence-more local-more">
      <summary>展开 ${localExtra.length} 条本地假设</summary>
      ${localExtra.map(([strength, text]) => {
        const cls = evidenceClass(strength);
        const label = STRENGTH_LABELS?.[strength] || strength;
        return `<div class="evidence-item local ${cls}"><span class="strength">${escapeHtml(label)}</span><p>${escapeHtml(text)}</p></div>`;
      }).join("")}
    </details>
  ` : "";
  el.evidenceList.innerHTML = `
    <div class="evidence-feed-head">
      <strong>实时证据 · 已过滤</strong>
      <span>${escapeHtml(fetched)} · ${escapeHtml(NEWS_STRICTNESS_LABELS[state.newsStrictness] || "均衡")}模式 · 优先展示 SEC、官方公告、供应链和高信号快讯</span>
      ${sourceStrip}
    </div>
    ${liveMarkup}
    ${extraMarkup}
    <div class="evidence-feed-head local-head">
      <strong>本地 Serenity 笔记</strong>
      <span>只作假设，不压过实时证据</span>
    </div>
    ${localMarkup}
    ${localMoreMarkup}
  `;
  el.killSwitches.innerHTML = p.weaken.map((item, idx) => `
    <div class="kill-item"><strong>${idx + 1}. ${escapeHtml(item)}</strong><p>触发后降低研究优先级，重新检查估值和证据链。</p></div>
  `).join("");
}

function renderLedger(p, scores, liveEvidence = null) {
  const gf = scores.gf.details || {};
  const tamState = scores.tam.tamPeg == null ? "PE/PEG 失真，改用里程碑和正常化利润" : scores.tam.tamPeg < 1.2 ? "估值相对增长仍可讨论" : scores.tam.tamPeg < 2.5 ? "估值要求执行继续兑现" : "估值对高增长要求很高";
  const sourceText = (liveEvidence?.sources || []).map(source => `${source.nameZh || source.name}:${source.statusZh || sourceStatusLabel(source.status)}(${source.count || 0})`).join("；") || "实时来源等待中";
  const liveCount = liveEvidence?.items?.length || 0;
  const blocks = [
    ["1. Serenity Alpha", `news -> demand -> revenue/profit transmission -> small-cap elasticity -> validation path。当前 ${p.symbol} 的 Alpha 分为 ${scores.alpha}/100，核心验证点是：${p.checks.join("；")}。`],
    ["2. GF-DMA Health Index", `GF-DMA ${scores.gf.score}/100。P/20DMA ${fmtPct.format(gf.d20 || 0)}%，P/50DMA ${fmtPct.format(gf.d50 || 0)}%，Escape Ratio ${(gf.escape || 0).toFixed(2)}，用来判断趋势是否已经逃逸。`],
    ["3. Bayesian Intrinsic Growth", `后验增长假设：H3 ${p.bayes[3]}%，H4 ${p.bayes[4]}%，H5 ${p.bayes[5]}%。加权内在增长约 ${fmtPct.format(scores.bayesian.weightedGrowth)}%，市场隐含增长假设约 ${fmtPct.format(scores.bayesian.implied)}%。`],
    ["4. TAM-Adj-PEG", `${tamState}。修正增长约 ${fmtPct.format(scores.tam.adjustedGrowth)}%，TAM runway factor ${scores.tam.runwayFactor.toFixed(2)}，quality factor ${p.valuation.qualityFactor?.toFixed(2) || "--"}。`],
    ["5. Evidence Ladder", `强证据优先 SEC/IR/财报电话会/订单/监管文件；社交媒体和价格异动只当线索。Live evidence ${liveCount} 条，来源状态：${sourceText}。当前最需要补的证据：${p.checks.slice(0, 2).join("、")}。`]
  ];
  el.frameworkLedger.innerHTML = `
    <div class="ledger-summary">
      <strong>${escapeHtml(p.symbol)} 验证主线</strong>
      <p>先确认 ${escapeHtml(p.layer)} 是否还是真卡点，再看价格是否已经透支。当前最该补：${escapeHtml(p.checks.slice(0, 2).join("、") || "官方证据")}。</p>
    </div>
    <details class="ledger-more">
      <summary>展开完整评分框架</summary>
      ${blocks.map(([title, body]) => `<div class="ledger-block"><strong>${escapeHtml(title)}</strong><p>${escapeHtml(body)}</p></div>`).join("")}
    </details>
  `;
}

function drawChart(data) {
  state.currentChartData = data;
  const canvas = el.priceCanvas;
  const ctx = canvas.getContext("2d");
  const ratio = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = Math.max(640, Math.floor(rect.width * ratio));
  canvas.height = Math.max(300, Math.floor(rect.height * ratio));
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  const width = rect.width;
  const height = rect.height;
  ctx.clearRect(0, 0, width, height);
  if (!data?.points?.length) return showChartState("没有可显示的数据");
  hideChartState();

  const points = data.points;
  const closes = points.map(point => point.close);
  const volumes = points.map(point => point.volume || 0);
  const sma = data.sma20;
  const pad = { top: 18, right: 58, bottom: 34, left: 54 };
  const volumeHeight = 64;
  const chartBottom = height - pad.bottom - volumeHeight;
  const minPrice = Math.min(...closes, ...sma.filter(Number.isFinite));
  const maxPrice = Math.max(...closes, ...sma.filter(Number.isFinite));
  const priceRange = maxPrice - minPrice || 1;
  const maxVolume = Math.max(...volumes, 1);
  const xFor = idx => pad.left + (idx / Math.max(1, points.length - 1)) * (width - pad.left - pad.right);
  const yFor = price => pad.top + (maxPrice - price) / priceRange * (chartBottom - pad.top);
  const vFor = volume => height - pad.bottom - (volume / maxVolume) * (volumeHeight - 12);

  ctx.strokeStyle = css("--line");
  ctx.lineWidth = 1;
  ctx.fillStyle = css("--muted");
  ctx.font = "12px Inter, system-ui, sans-serif";
  for (let i = 0; i <= 4; i += 1) {
    const y = pad.top + i * (chartBottom - pad.top) / 4;
    const value = maxPrice - i * priceRange / 4;
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(width - pad.right, y);
    ctx.stroke();
    ctx.fillText(fmtUsd.format(value), width - pad.right + 8, y + 4);
  }
  ctx.fillStyle = css("--line-strong");
  volumes.forEach((volume, idx) => {
    const x = xFor(idx);
    const y = vFor(volume);
    ctx.fillRect(x - 1, y, 2, height - pad.bottom - y);
  });
  drawLine(ctx, points.map((point, idx) => [xFor(idx), yFor(point.close)]), css("--primary"), 2.4);
  drawLine(ctx, sma.map((value, idx) => Number.isFinite(value) ? [xFor(idx), yFor(value)] : null).filter(Boolean), css("--accent"), 1.8);
  ctx.fillStyle = css(data.changePct >= 0 ? "--good" : "--bad");
  ctx.beginPath();
  ctx.arc(xFor(points.length - 1), yFor(points.at(-1).close), 4, 0, Math.PI * 2);
  ctx.fill();

  canvas.onmousemove = event => {
    const box = canvas.getBoundingClientRect();
    const x = event.clientX - box.left;
    const idx = clamp(Math.round((x - pad.left) / (width - pad.left - pad.right) * (points.length - 1)), 0, points.length - 1);
    showTooltip(points[idx], event.clientX - box.left, event.clientY - box.top);
  };
  canvas.onmouseleave = () => {
    el.chartTooltip.hidden = true;
    drawChart(data);
  };
}

function drawLine(ctx, coords, color, width) {
  if (!coords.length) return;
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.beginPath();
  coords.forEach(([x, y], idx) => idx === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y));
  ctx.stroke();
}

function drawCrosshair(ctx, x, y, pad, width, height) {
  ctx.save();
  ctx.strokeStyle = css("--line-strong");
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(x, pad.top);
  ctx.lineTo(x, height - pad.bottom);
  ctx.moveTo(pad.left, y);
  ctx.lineTo(width - pad.right, y);
  ctx.stroke();
  ctx.restore();
}

function showTooltip(point, x, y) {
  el.chartTooltip.hidden = false;
  el.chartTooltip.innerHTML = `<b>${fmtDate.format(new Date(point.time * 1000))}</b>${fmtUsd.format(point.close)}<br>成交量 ${fmtCompact.format(point.volume || 0)}`;
  el.chartTooltip.style.left = `${x > 210 ? x - 190 : x + 14}px`;
  el.chartTooltip.style.top = `${y > 120 ? y - 90 : y + 14}px`;
}

function showChartState(message) {
  el.chartState.hidden = false;
  el.chartState.textContent = message;
}

function hideChartState() {
  el.chartState.hidden = true;
}

function css(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

async function selectSymbol(symbol) {
  state.activeSymbol = symbol;
  renderUniverse();
  renderWatchlist();
  renderWatchRadar();
  renderCompareBoard();
  renderDailyBrief();
  renderDataHealth();
  renderRedditTrending();
  showChartState("正在载入价格数据");
  renderActive(null, null);
  try {
    const evidencePromise = fetchEvidence(symbol).then(liveEvidence => {
      if (state.activeSymbol === symbol) {
        const cachedChart = state.quotes.get(`${symbol}:${state.range}`);
        const cachedAnalysis = state.quotes.get(`${symbol}:1y`) || cachedChart;
        renderActive(cachedChart || null, cachedAnalysis || null, liveEvidence);
        renderDailyBrief();
        renderDataHealth();
        renderRedditTrending();
      }
      return liveEvidence;
    });
    const [chartData, analysisData, liveEvidence] = await Promise.all([
      fetchChart(symbol, state.range),
      fetchChart(symbol, "1y"),
      evidencePromise
    ]);
    if (state.activeSymbol !== symbol) return;
    renderActive(chartData, analysisData, liveEvidence);
    drawChart(chartData);
    renderLayerRanking();
    renderUniverse();
    renderWatchlist();
    renderWatchRadar();
    renderCompareBoard();
    renderDailyBrief();
    renderDataHealth();
    renderRedditTrending();
  } catch (error) {
    state.loading.delete(symbol);
    renderUniverse();
    renderWatchlist();
    renderWatchRadar();
    renderCompareBoard();
    renderDailyBrief();
    renderDataHealth();
    renderRedditTrending();
    showChartState(`载入失败：${error.message}`);
  }
}

async function warmupUniverse() {
  const starters = UNIVERSE.slice(0, 18);
  await Promise.allSettled(starters.map(item => safeFetchChart(item.symbol, "1y")));
  renderUniverse();
  renderWatchlist();
  renderWatchRadar();
  renderCompareBoard();
  renderDailyBrief();
  renderDataHealth();
  renderLayerRanking();
  await selectSymbol(state.activeSymbol);
}

async function warmupWatchlistAndCompare() {
  const symbols = [...new Set([...state.watchlist, ...state.compareSymbols])].slice(0, 20);
  await Promise.allSettled(symbols.map(symbol => safeFetchChart(symbol, "1y")));
  renderWatchlist();
  renderWatchRadar();
  renderCompareBoard();
  renderDailyBrief();
  renderDataHealth();
}

async function warmupPortfolios() {
  const symbols = [...new Set([
    "SPY",
    ...PORTFOLIOS.flatMap(portfolio => portfolio.holdings.map(holding => holding.symbol))
  ])];
  for (let idx = 0; idx < symbols.length; idx += 6) {
    await Promise.allSettled(symbols.slice(idx, idx + 6).map(symbol => safeFetchChart(symbol, "1y")));
    renderPortfolioBoard();
  }
}

function resolveInputSymbol(input) {
  const value = input.trim();
  const raw = value.toUpperCase().replace(/[^A-Z0-9.:\-^=]/g, "");
  return SYMBOL_ALIASES[value] || SYMBOL_ALIASES[value.toUpperCase()] || SYMBOL_ALIASES[raw] || raw;
}

function searchCandidates(query) {
  const value = query.trim().toLowerCase();
  if (!value) return [];
  const rows = [];
  for (const item of UNIVERSE) {
    const displayName = displayNameWithZh(item.symbol, item.name);
    const zhName = symbolZhName(item.symbol);
    const haystack = [item.symbol, item.name, displayName, zhName, item.theme, item.layer, item.role, ...(item.tags || [])].join(" ").toLowerCase();
    if (haystack.includes(value) || item.symbol.toLowerCase().startsWith(value)) {
      rows.push({ symbol: item.symbol, name: displayName, meta: item.theme, known: true });
    }
  }
  for (const [alias, symbol] of Object.entries(SYMBOL_ALIASES)) {
    if (!alias || alias.length > 18) continue;
    if (alias.toLowerCase().includes(value) || symbol.toLowerCase().includes(value)) {
      const p = getProfile(symbol);
      const key = normalizeTickerKey(symbol);
      const displayName = displayNameWithZh(symbol, p.name !== symbol ? p.name : SYMBOL_EN_NAMES[key] || alias);
      rows.push({ symbol, name: displayName, meta: `匹配：${alias}`, known: true });
    }
  }
  const deduped = [];
  const seen = new Set();
  for (const row of rows) {
    const key = normalizeTickerKey(row.symbol);
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(row);
    if (deduped.length >= 8) break;
  }
  const resolved = resolveInputSymbol(query);
  if (resolved && !deduped.some(row => row.symbol === resolved)) {
    const key = normalizeTickerKey(resolved);
    deduped.push({ symbol: resolved, name: displayNameWithZh(resolved, SYMBOL_EN_NAMES[key] || "自定义标的"), meta: "打开后先做产业链定位", known: false });
  }
  return deduped.slice(0, 8);
}

function renderSymbolSuggestions() {
  if (!el.symbolSuggestions) return;
  const rows = searchCandidates(el.symbolInput.value);
  if (!rows.length) {
    el.symbolSuggestions.hidden = true;
    el.symbolSuggestions.innerHTML = "";
    return;
  }
  el.symbolSuggestions.hidden = false;
  el.symbolSuggestions.innerHTML = rows.map(row => `
    <button class="symbol-suggestion" data-symbol="${escapeHtml(row.symbol)}" type="button">
      <span>${escapeHtml(row.symbol)}</span>
      <strong>${escapeHtml(row.name)}</strong>
      <em>${escapeHtml(row.meta || "")}</em>
    </button>
  `).join("");
  [...el.symbolSuggestions.querySelectorAll(".symbol-suggestion")].forEach(button => {
    button.addEventListener("click", () => {
      el.symbolInput.value = "";
      el.symbolSuggestions.hidden = true;
      openSymbol(button.dataset.symbol);
    });
  });
}

function openSymbol(symbol) {
  if (!symbol) return;
  if (!UNIVERSE.some(item => item.symbol === symbol)) {
    UNIVERSE.unshift(getProfile(symbol));
  }
  selectSymbol(symbol);
}

function addSymbol() {
  const input = el.symbolInput.value.trim();
  const symbol = resolveInputSymbol(input);
  if (!symbol) return;
  el.symbolInput.value = "";
  if (el.symbolSuggestions) el.symbolSuggestions.hidden = true;
  openSymbol(symbol);
}

function tickClock() {
  renderChinaSession();
  renderSessionMode();
  renderDailyBrief();
}

function rerenderActiveFromCache() {
  const chartData = state.quotes.get(`${state.activeSymbol}:${state.range}`);
  const analysisData = state.quotes.get(`${state.activeSymbol}:1y`) || chartData;
  const liveEvidence = state.evidence.get(state.activeSymbol);
  renderActive(chartData || null, analysisData || null, liveEvidence || null);
  if (chartData) drawChart(chartData);
}

function bindEvents() {
  el.refreshButton.addEventListener("click", () => {
    [...state.quotes.keys()].forEach(key => {
      if (key.startsWith(`${state.activeSymbol}:`)) state.quotes.delete(key);
    });
    state.evidence.delete(state.activeSymbol);
    selectSymbol(state.activeSymbol);
    fetchMonitor(true);
    fetchRedditTrending(true);
    fetchFredMacro(true);
    fetchCongressTrades(true);
    fetchMarketEnvironment(true);
  });
  el.settingsToggle?.addEventListener("click", () => {
    if (!el.settingsPanel) return;
    el.settingsPanel.hidden = !el.settingsPanel.hidden;
    el.settingsToggle.classList.toggle("active", !el.settingsPanel.hidden);
  });
  el.viewModeButtons.forEach(button => {
    button.addEventListener("click", () => {
      state.viewMode = button.dataset.viewMode || "watch";
      applyViewMode();
    });
  });
  el.themeButtons.forEach(button => {
    button.addEventListener("click", () => {
      state.theme = button.dataset.themeChoice || "light";
      applyTheme();
    });
  });
  el.monitorRefreshButton?.addEventListener("click", () => fetchMonitor(true));
  el.redditTrendingRefresh?.addEventListener("click", () => fetchRedditTrending(true));
  el.congressTradesRefresh?.addEventListener("click", () => fetchCongressTrades(true));
  el.macroRefreshButton?.addEventListener("click", () => fetchFredMacro(true));
  el.monitorTokenSave?.addEventListener("click", () => {
    state.monitorToken = el.monitorTokenInput.value.trim();
    if (state.monitorToken) {
      localStorage.setItem(MONITOR_TOKEN_KEY, state.monitorToken);
    } else {
      localStorage.removeItem(MONITOR_TOKEN_KEY);
    }
    fetchMonitor(true);
  });
  el.monitorTokenInput?.addEventListener("keydown", event => {
    if (event.key === "Enter") el.monitorTokenSave.click();
  });
  el.catalystCalendar?.addEventListener("click", event => {
    const target = event.target instanceof Element ? event.target : event.target?.parentElement;
    const button = target?.closest("[data-symbol]");
    if (!button) return;
    selectSymbol(button.dataset.symbol);
  });
  el.watchlistToggleButton?.addEventListener("click", () => toggleWatchlist(state.activeSymbol));
  el.compareAddActive?.addEventListener("click", () => toggleCompareSymbol(state.activeSymbol));
  el.addSymbolButton.addEventListener("click", addSymbol);
  el.symbolInput.addEventListener("input", renderSymbolSuggestions);
  el.symbolInput.addEventListener("focus", renderSymbolSuggestions);
  el.symbolInput.addEventListener("keydown", event => {
    if (event.key === "Escape" && el.symbolSuggestions) {
      el.symbolSuggestions.hidden = true;
      return;
    }
    if (event.key === "Enter") addSymbol();
  });
  document.addEventListener("click", event => {
    if (!el.symbolSuggestions || !el.symbolInput) return;
    if (!event.target.closest(".search-box")) el.symbolSuggestions.hidden = true;
  });
  document.querySelectorAll("[data-filter]").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-filter]").forEach(item => item.classList.remove("active"));
      button.classList.add("active");
      state.filter = button.dataset.filter;
      renderUniverse();
    });
  });
  document.querySelectorAll("[data-portfolio-filter]").forEach(button => {
    button.addEventListener("click", () => {
      setPortfolioFilter(button.dataset.portfolioFilter || "all");
    });
  });
  document.querySelectorAll("[data-range]").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-range]").forEach(item => item.classList.remove("active"));
      button.classList.add("active");
      state.range = button.dataset.range;
      selectSymbol(state.activeSymbol);
    });
  });
  document.querySelectorAll("[data-news-strictness]").forEach(button => {
    button.classList.toggle("active", button.dataset.newsStrictness === state.newsStrictness);
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-news-strictness]").forEach(item => item.classList.remove("active"));
      button.classList.add("active");
      state.newsStrictness = button.dataset.newsStrictness;
      localStorage.setItem(NEWS_STRICTNESS_KEY, state.newsStrictness);
      rerenderActiveFromCache();
      renderDataHealth();
    });
  });
  window.addEventListener("resize", () => {
    if (state.currentChartData) drawChart(state.currentChartData);
  });
}

function init() {
  bindEvents();
  applyTheme();
  applyViewMode();
  applyPanelDefaultRevision();
  setupPanelCollapsing();
  tickClock();
  setInterval(tickClock, 30000);
  renderMarketEnvironment();
  renderMacroPanel();
  renderAlerts();
  renderWatchlist();
  renderWatchRadar();
  renderCompareBoard();
  renderSessionMode();
  renderDailyBrief();
  renderDataHealth();
  fetchFxRate();
  fetchMarketEnvironment();
  fetchFredMacro();
  setInterval(fetchFredMacro, FRED_MACRO_REFRESH_MS);
  renderMonitor();
  fetchMonitor();
  setInterval(fetchMonitor, 90000);
  renderRedditTrending();
  fetchRedditTrending();
  setInterval(fetchRedditTrending, REDDIT_TRENDING_REFRESH_MS);
  renderLayerRanking();
  renderUniverse();
  renderPortfolioBoard();
  renderCongressTrades();
  fetchCongressTrades();
  setInterval(fetchCongressTrades, CONGRESS_TRADES_REFRESH_MS);
  selectSymbol(state.activeSymbol);
  warmupUniverse();
  warmupWatchlistAndCompare();
  warmupPortfolios();
}

init();
