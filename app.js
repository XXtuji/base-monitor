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
  迈威尔: "MRVL",
  邁威爾: "MRVL"
};
const MONITOR_HANDLE = "aleabitoreddit";
const MONITOR_TOKEN_KEY = "serenity.xBearerToken";
const USD_CNY_SYMBOL = "USDCNY=X";

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
  LRCX: "lamresearch.com"
};

const PERSON_IMAGES = {
  buffett: "https://commons.wikimedia.org/wiki/Special:FilePath/Warren_Buffett_at_the_2015_SelectUSA_Investment_Summit_%28cropped%29.jpg?width=360",
  pelosi: "https://commons.wikimedia.org/wiki/Special:FilePath/Official_photo_of_Speaker_Nancy_Pelosi_in_2019.jpg?width=360",
  jensen: "https://commons.wikimedia.org/wiki/Special:FilePath/Jen-Hsun_Huang_2025.jpg?width=360",
  cathie: "https://commons.wikimedia.org/wiki/Special:FilePath/Cathie_Wood_ARK_Invest_Photo.jpg?width=360",
  duan: "https://img.i-scmp.com/cdn-cgi/image/fit%3Dcontain%2Cwidth%3D512%2Cformat%3Dauto/sites/default/files/d8/images/canvas/2026/04/17/ee19073f-7e4d-4908-a0b6-3e8c8f82f343_cb0c5d2e.jpg",
  soros: "https://opensocietyfoundations.imgix.net/uploads/6264e8c8-a29e-4794-b9a8-c063cf16a1e9/2013-george-soros-desk-3000.jpg?auto=format&fit=crop&crop=faces&w=360&h=360&q=75",
  greene: "https://www.congress.gov/img/member/g000596_200.jpg"
};

const PORTFOLIOS = [
  {
    id: "serenity",
    name: "Serenity 持仓",
    owner: "Serenity research basket",
    type: "ai",
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
    id: "pelosi",
    name: "佩洛西持仓",
    owner: "Congress disclosure model",
    type: "congress",
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
  }
];

const state = {
  activeSymbol: "SIVE.ST",
  range: "6mo",
  filter: "all",
  portfolioFilter: "all",
  activePortfolio: "serenity",
  monitor: null,
  monitorLoading: false,
  monitorError: "",
  monitorToken: localStorage.getItem(MONITOR_TOKEN_KEY) || "",
  usdCny: null,
  usdCnyFetchedAt: null,
  quotes: new Map(),
  evidence: new Map(),
  loading: new Set(),
  currentChartData: null
};

const el = {
  marketClock: document.getElementById("marketClock"),
  refreshButton: document.getElementById("refreshButton"),
  symbolInput: document.getElementById("symbolInput"),
  addSymbolButton: document.getElementById("addSymbolButton"),
  layerRanking: document.getElementById("layerRanking"),
  universeRows: document.getElementById("universeRows"),
  universeMeta: document.getElementById("universeMeta"),
  chinaSessionPanel: document.getElementById("chinaSessionPanel"),
  monitorMeta: document.getElementById("monitorMeta"),
  monitorStatusPill: document.getElementById("monitorStatusPill"),
  monitorRefreshButton: document.getElementById("monitorRefreshButton"),
  monitorTokenSetup: document.getElementById("monitorTokenSetup"),
  monitorTokenInput: document.getElementById("monitorTokenInput"),
  monitorTokenSave: document.getElementById("monitorTokenSave"),
  monitorSummary: document.getElementById("monitorSummary"),
  monitorBuyList: document.getElementById("monitorBuyList"),
  monitorPosts: document.getElementById("monitorPosts"),
  portfolioMeta: document.getElementById("portfolioMeta"),
  portfolioSpotlight: document.getElementById("portfolioSpotlight"),
  portfolioBoard: document.getElementById("portfolioBoard"),
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
  metricStrip: document.getElementById("metricStrip"),
  priceCanvas: document.getElementById("priceCanvas"),
  chartTooltip: document.getElementById("chartTooltip"),
  chartState: document.getElementById("chartState"),
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
  evidenceList: document.getElementById("evidenceList"),
  killSwitches: document.getElementById("killSwitches")
};

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
  const res = await fetch(`/api/chart/${encodeURIComponent(symbol)}?range=${encodeURIComponent(range)}`);
  if (!res.ok) throw new Error(`行情服务返回 ${res.status}`);
  const payload = await res.json();
  if (payload.error) throw new Error(payload.error);
  const enriched = enrichPayload(payload);
  state.quotes.set(key, enriched);
  state.loading.delete(symbol);
  renderUniverse();
  return enriched;
}

async function fetchEvidence(symbol, force = false) {
  if (!force && state.evidence.has(symbol)) return state.evidence.get(symbol);
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
      <em>${market.isTradable ? "常规盘内，仍需自己下判断" : "不是常规盘，不标记可买"}</em>
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

  const needsToken = source?.status === "needs_token";
  const showTokenSetup = source?.kind === "x-api" && source?.status !== "ok";
  el.monitorTokenSetup.hidden = !showTokenSetup;
  if (showTokenSetup && el.monitorTokenInput && !el.monitorTokenInput.value) {
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
    el.monitorBuyList.innerHTML = `<div class="monitor-empty">配置 X Bearer Token 后开始读取公开时间线。也可以用环境变量 X_BEARER_TOKEN 启动服务。</div>`;
    el.monitorPosts.innerHTML = "";
    return;
  }

  if (source && source.status !== "ok") {
    el.monitorBuyList.innerHTML = `<div class="monitor-empty">${escapeHtml(source.detail || "数据源暂不可用")}</div>`;
    el.monitorPosts.innerHTML = "";
    return;
  }

  const title = market?.isTradable ? "开盘可买窗口内提及" : "未开盘观察队列";
  const rows = tickers.slice(0, 10);
  el.monitorBuyList.innerHTML = `
    <div class="monitor-list-title">
      <strong>${title}</strong>
      <span>${market?.isTradable ? "仅表示当前可交易时段命中，不是买入建议" : "开盘后再进入可买窗口"}</span>
    </div>
    ${rows.length ? rows.map(row => {
      const quote = row.quote || {};
      const changeCls = quote.changePct > 0 ? "positive" : quote.changePct < 0 ? "negative" : "flat";
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
              <strong>${escapeHtml(row.symbol)} <span>${escapeHtml(quote.name || "")}</span></strong>
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
  const items = liveEvidence?.items || [];
  const counts = items.reduce((acc, item) => {
    const strength = item.strength || "Needs checking";
    acc[strength] = (acc[strength] || 0) + 1;
    const key = `${item.kind || "unknown"}:${strength}`;
    acc[key] = (acc[key] || 0) + 1;
    if (item.kind === "official") acc.official = (acc.official || 0) + 1;
    if (item.kind === "filing") acc.filing = (acc.filing || 0) + 1;
    if (item.kind === "media") acc.media = (acc.media || 0) + 1;
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
    (counts["official:Medium"] || 0) * 14 +
    (counts["filing:Medium"] || 0) * 10 +
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
  if (score >= 82) return "Top priority";
  if (score >= 72) return "High research priority";
  if (score >= 62) return "Worth tracking";
  if (score >= 50) return "Needs proof";
  return "Low priority";
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
    return `
      <button class="universe-row ${item.symbol === state.activeSymbol ? "active" : ""}" data-symbol="${item.symbol}" type="button">
        <span class="ticker">${item.symbol}</span>
        <span class="company"><strong>${item.name}</strong><span>${price} · <b class="${cls}">${change}</b> · ${item.layer}</span></span>
        <span class="row-score"><strong>${scores.composite}</strong><span>优先级</span></span>
      </button>
    `;
  }).join("");
  [...el.universeRows.querySelectorAll(".universe-row")].forEach(row => row.addEventListener("click", () => selectSymbol(row.dataset.symbol)));
}

function portfolioTypeLabel(type) {
  return { guru: "大师", congress: "国会", ai: "AI" }[type] || type;
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
  return `
    <button class="portfolio-card ${portfolio.id === state.activePortfolio ? "active" : ""}" data-portfolio-id="${escapeHtml(portfolio.id)}" type="button">
      <div class="portfolio-card-copy">
        <div class="portfolio-card-title">
          <strong>${escapeHtml(portfolio.name)}</strong>
          <span>${escapeHtml(portfolioTypeLabel(portfolio.type))}</span>
        </div>
        <div class="portfolio-return ${cls}">${formatSignedPct(stats.return250)} <span>250日涨幅</span></div>
        <div class="portfolio-top-two">
          ${top.map(holding => `<span>${escapeHtml(holdingTicker(holding))}</span><strong>${fmtPct.format(holding.weight)}%</strong>`).join("")}
        </div>
      </div>
      ${portfolioRing(portfolio, true)}
    </button>
  `;
}

function renderPortfolioSpotlight(portfolio, stats) {
  const benchmark = stats.benchmark;
  const alpha = Number.isFinite(benchmark) ? stats.return250 - benchmark : null;
  const series = portfolioSeries(portfolio);
  const spy = benchmarkSeries();
  const rows = stats.holdings.slice(0, 10).map((holding, idx) => {
    const changeCls = holding.ret250 > 0 ? "positive" : holding.ret250 < 0 ? "negative" : "flat";
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
            <strong>${escapeHtml(holdingTicker(holding))} ${escapeHtml(holding.name || "")}</strong>
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
          <span class="type-pill">${escapeHtml(portfolioTypeLabel(portfolio.type))}</span>
        </div>
        <div class="portfolio-big-return ${stats.return250 >= 0 ? "positive" : "negative"}">${formatSignedPct(stats.return250)} <span>250日组合收益</span></div>
        <p>${escapeHtml(portfolio.note)}</p>
        <div class="portfolio-summary">
          <div><span>SPY 250日</span><strong>${formatSignedPct(benchmark)}</strong></div>
          <div><span>相对 SPY</span><strong class="${alpha > 0 ? "positive" : alpha < 0 ? "negative" : "flat"}">${formatSignedPct(alpha)}</strong></div>
          <div><span>数据覆盖</span><strong>${Math.round(stats.coverage * 100)}%</strong></div>
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
      selectSymbol(button.dataset.symbol);
      document.querySelector(".hero-panel")?.scrollIntoView({ block: "start", behavior: "smooth" });
    });
  });
}

function renderPortfolioBoard() {
  const rows = visiblePortfolios();
  const active = rows.find(row => row.item.id === state.activePortfolio) || rows[0];
  const liveLoaded = rows.reduce((sum, row) => sum + row.stats.loaded, 0);
  const totalHoldings = rows.reduce((sum, row) => sum + row.stats.holdings.length, 0);
  el.portfolioMeta.textContent = `${rows.length} 个组合 · ${liveLoaded}/${totalHoldings} 持仓已接 live 价格 · 250日`;
  if (active) renderPortfolioSpotlight(active.item, active.stats);
  el.portfolioBoard.innerHTML = rows.map(row => renderPortfolioCard(row.item, row.stats)).join("");
  [...el.portfolioBoard.querySelectorAll(".portfolio-card")].forEach(card => {
    card.addEventListener("click", () => {
      state.activePortfolio = card.dataset.portfolioId;
      renderPortfolioBoard();
    });
  });
}

function renderActive(chartData, analysisData, liveEvidence = null) {
  const p = getProfile(state.activeSymbol);
  const data = analysisData || chartData;
  const evidence = liveEvidence || state.evidence.get(p.symbol);
  const scores = scoreAll(p, data, evidence);
  el.activeTicker.textContent = p.symbol;
  el.activeName.textContent = p.name === p.symbol && chartData?.meta?.shortName ? chartData.meta.shortName : p.name;
  el.activeTheme.textContent = p.theme;
  el.activeMeta.textContent = `${chartData?.meta?.exchange || "US"} · ${chartData?.meta?.currency || "USD"} · ${chartData?.points?.length || 0} 根K线 · ${p.role}`;
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

  renderEngines(p, scores, evidence);
  renderMemo(p, scores, data, evidence);
  renderEvidence(p, evidence);
  renderLedger(p, scores, evidence);
}

function renderEngines(p, scores, liveEvidence = null) {
  const liveScore = scores.live?.score || evidenceSignal(liveEvidence).score;
  el.bottleneckScore.textContent = scores.bottleneck.score;
  el.bottleneckBars.innerHTML = scoreRows([
    ["需求拐点", p.factors.demandInflection * 20],
    ["架构耦合", p.factors.architectureCoupling * 20],
    ["卡点强度", p.factors.chokepointSeverity * 20],
    ["供应集中", p.factors.supplierConcentration * 20],
    ["扩产难度", p.factors.expansionDifficulty * 20],
    ["证据质量", Math.max(p.factors.evidenceQuality * 20, liveScore)]
  ], 2);

  el.gfDmaScore.textContent = scores.gf.score;
  el.gfDmaBars.innerHTML = scoreRows([
    ["基本面-均线匹配", scores.gf.growthMatch],
    ["股价-均线背离", scores.gf.divergence],
    ["趋势平行度", scores.gf.parallel],
    ["预期上修确认", scores.gf.revision]
  ]);

  el.alphaScore.textContent = scores.alpha;
  el.alphaBars.innerHTML = scoreRows([
    ["需求确定性", p.alpha.demand * 20],
    ["财报传导清晰", p.alpha.transmission * 20],
    ["业务纯度", p.alpha.purity * 20],
    ["市值弹性", p.alpha.elasticity * 20],
    ["市场忽视", p.alpha.neglect * 20],
    ["验证速度", p.alpha.verification * 20]
  ], 3);

  el.bayesianScore.textContent = scores.bayesian.score;
  el.bayesianBars.innerHTML = scoreRows([
    ["H3 高景气", p.bayes[3]],
    ["H4 结构爆发", p.bayes[4]],
    ["H5 平台扩张", p.bayes[5]],
    ["内在增长", clamp(scores.bayesian.weightedGrowth * 2, 0, 100)]
  ], 1);

  el.tamPegScore.textContent = scores.tam.score;
  el.tamPegDetails.innerHTML = detailItems([
    ["Forward PE", p.valuation.forwardPE || "N/A"],
    ["EPS CAGR", `${p.valuation.epsCagr || 0}%`],
    ["Runway factor", scores.tam.runwayFactor.toFixed(2)],
    ["Quality factor", p.valuation.qualityFactor?.toFixed(2) || "--"],
    ["TAM-Adj-PEG", scores.tam.tamPeg == null ? "失真" : scores.tam.tamPeg.toFixed(2)]
  ]);

  el.corpusScore.textContent = scores.corpus;
  el.corpusDetails.innerHTML = detailItems([
    ["Serenity 主题贴合", `${scores.corpus}/100`],
    ["Live evidence", `${liveScore}/100`],
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

function renderMemo(p, scores, data) {
  el.memoHorizon.textContent = scores.composite >= 72 ? "优先 1-4 个季度验证" : "先补证据再升级";
  el.researchMemo.innerHTML = [
    ["直接判断", `${p.symbol} 当前是 ${verdict(scores.composite)}。它的关键不是“涨没涨”，而是 ${p.layer} 是否继续成为真实扩张约束。`],
    ["系统变化", `${p.theme} 正在把压力传导到 ${p.layer}。如果客户无法轻易绕开这一层，研究优先级就成立。`],
    ["市场可能没看清", scores.bottleneck.score >= 75 ? "市场容易只盯明显赢家，但真正的重定价可能来自更难扩产、更难认证的环节。" : "市场可能已经把主要叙事定价进去，需要更硬的财务或客户证据。"],
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
    needs_token: "等待 Token"
  }[status] || status || "未知";
}

function renderEvidence(p, liveEvidence = null) {
  const sources = liveEvidence?.sources || [];
  const liveItems = liveEvidence?.items || [];
  const sourceStrip = sources.length ? `
    <div class="source-strip">
      ${sources.map(source => `
        <span class="source-pill ${escapeHtml(source.status)}" title="${escapeHtml(source.detail || "")}">
          ${escapeHtml(source.name)} · ${escapeHtml(sourceStatusLabel(source.status))} · ${source.count || 0}
        </span>
      `).join("")}
    </div>
  ` : "";
  const fetched = liveEvidence?.fetchedAt ? formatEvidenceDate(liveEvidence.fetchedAt) : "等待 live evidence";
  const liveMarkup = liveItems.length ? liveItems.slice(0, 22).map(item => {
    const cls = evidenceClass(item.strength);
    const baseKindLabel = item.kindLabel || item.kind || "source";
    const kindLabel = item.tierLabel ? `${baseKindLabel} · ${item.tierLabel}` : baseKindLabel;
    const actionHint = item.actionHint ? `<div class="evidence-action">${escapeHtml(item.actionHint)}</div>` : "";
    return `
      <div class="evidence-item live ${cls}">
        <div class="evidence-title-row">
          <span class="strength">${escapeHtml(item.strengthLabel || item.strength || "待核验")}</span>
          <span class="evidence-kind">${escapeHtml(kindLabel)}</span>
        </div>
        <a class="evidence-link" href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer">${escapeHtml(item.titleZh || item.title)}</a>
        <p>${escapeHtml(item.summaryZh || item.summary || "")}</p>
        ${actionHint}
        <div class="evidence-meta">${escapeHtml(item.source)} · ${escapeHtml(formatEvidenceDate(item.date))} · ${escapeHtml(item.freshness || "")}</div>
      </div>
    `;
  }).join("") : `
    <div class="evidence-item needs-checking">
      <span class="strength">Needs checking</span>
      <p>Live evidence feed 暂时没有返回可用条目；先按本地框架假设处理，并回到 SEC/IR/官方公告核验。</p>
    </div>
  `;
  const localMarkup = p.evidence.map(([strength, text]) => {
    const cls = evidenceClass(strength);
    return `<div class="evidence-item local ${cls}"><span class="strength">${escapeHtml(strength)}</span><p>${escapeHtml(text)}</p></div>`;
  }).join("");
  el.evidenceList.innerHTML = `
    <div class="evidence-feed-head">
      <strong>Live evidence</strong>
      <span>${escapeHtml(fetched)}</span>
      ${sourceStrip}
    </div>
    ${liveMarkup}
    <div class="evidence-feed-head local-head">
      <strong>Local Serenity notes</strong>
      <span>启发式假设</span>
    </div>
    ${localMarkup}
  `;
  el.killSwitches.innerHTML = p.weaken.map((item, idx) => `
    <div class="kill-item"><strong>${idx + 1}. ${escapeHtml(item)}</strong><p>触发后降低研究优先级，重新检查估值和证据链。</p></div>
  `).join("");
}

function renderEvidence(p, liveEvidence = null) {
  const sources = liveEvidence?.sources || [];
  const liveItems = liveEvidence?.items || [];
  const sourceStrip = sources.length ? `
    <div class="source-strip">
      ${sources.map(source => `
        <span class="source-pill ${escapeHtml(source.status)}" title="${escapeHtml(source.detail || "")}">
          ${escapeHtml(source.nameZh || source.name)} · ${escapeHtml(source.statusZh || sourceStatusLabel(source.status))} · ${source.count || 0}
        </span>
      `).join("")}
    </div>
  ` : "";
  const fetched = liveEvidence?.fetchedAt ? formatEvidenceDate(liveEvidence.fetchedAt) : "等待实时证据";
  const liveMarkup = liveItems.length ? liveItems.slice(0, 22).map(item => {
    const cls = evidenceClass(item.strength);
    const baseKindLabel = item.kindLabel || item.kind || "来源";
    const kindLabel = item.tierLabel ? `${baseKindLabel} · ${item.tierLabel}` : baseKindLabel;
    const actionHint = item.actionHint ? `<div class="evidence-action">${escapeHtml(item.actionHint)}</div>` : "";
    return `
      <div class="evidence-item live ${cls}">
        <div class="evidence-title-row">
          <span class="strength">${escapeHtml(item.strengthLabel || item.strength || "待核验")}</span>
          <span class="evidence-kind">${escapeHtml(kindLabel)}</span>
        </div>
        <a class="evidence-link" href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer">${escapeHtml(item.titleZh || item.title)}</a>
        <p>${escapeHtml(item.summaryZh || item.summary || "")}</p>
        ${actionHint}
        <div class="evidence-meta">${escapeHtml(item.sourceZh || item.source)} · ${escapeHtml(formatEvidenceDate(item.date))} · ${escapeHtml(item.freshnessZh || item.freshness || "")}</div>
      </div>
    `;
  }).join("") : `
    <div class="evidence-item needs-checking">
      <span class="strength">待核验</span>
      <p>实时证据源暂时没有返回可用条目；先按本地框架假设处理，并回到 SEC、IR、官方公告核验。</p>
    </div>
  `;
  const localMarkup = p.evidence.map(([strength, text]) => {
    const cls = evidenceClass(strength);
    const label = STRENGTH_LABELS?.[strength] || strength;
    return `<div class="evidence-item local ${cls}"><span class="strength">${escapeHtml(label)}</span><p>${escapeHtml(text)}</p></div>`;
  }).join("");
  el.evidenceList.innerHTML = `
    <div class="evidence-feed-head">
      <strong>实时证据</strong>
      <span>${escapeHtml(fetched)}</span>
      ${sourceStrip}
    </div>
    ${liveMarkup}
    <div class="evidence-feed-head local-head">
      <strong>本地 Serenity 笔记</strong>
      <span>启发式假设</span>
    </div>
    ${localMarkup}
  `;
  el.killSwitches.innerHTML = p.weaken.map((item, idx) => `
    <div class="kill-item"><strong>${idx + 1}. ${escapeHtml(item)}</strong><p>触发后降低研究优先级，重新检查估值和证据链。</p></div>
  `).join("");
}

function renderLedger(p, scores, liveEvidence = null) {
  const gf = scores.gf.details || {};
  const tamState = scores.tam.tamPeg == null ? "PE/PEG 失真，改用里程碑和正常化利润" : scores.tam.tamPeg < 1.2 ? "估值相对增长仍可讨论" : scores.tam.tamPeg < 2.5 ? "估值要求执行继续兑现" : "估值对高增长要求很高";
  const sourceText = (liveEvidence?.sources || []).map(source => `${source.name}:${sourceStatusLabel(source.status)}(${source.count || 0})`).join("；") || "live sources pending";
  const liveCount = liveEvidence?.items?.length || 0;
  el.frameworkLedger.innerHTML = [
    ["1. Serenity Alpha", `news -> demand -> revenue/profit transmission -> small-cap elasticity -> validation path。当前 ${p.symbol} 的 Alpha 分为 ${scores.alpha}/100，核心验证点是：${p.checks.join("；")}。`],
    ["2. GF-DMA Health Index", `GF-DMA ${scores.gf.score}/100。P/20DMA ${fmtPct.format(gf.d20 || 0)}%，P/50DMA ${fmtPct.format(gf.d50 || 0)}%，Escape Ratio ${(gf.escape || 0).toFixed(2)}，用来判断趋势是否已经逃逸。`],
    ["3. Bayesian Intrinsic Growth", `后验增长假设：H3 ${p.bayes[3]}%，H4 ${p.bayes[4]}%，H5 ${p.bayes[5]}%。加权内在增长约 ${fmtPct.format(scores.bayesian.weightedGrowth)}%，市场隐含增长假设约 ${fmtPct.format(scores.bayesian.implied)}%。`],
    ["4. TAM-Adj-PEG", `${tamState}。修正增长约 ${fmtPct.format(scores.tam.adjustedGrowth)}%，TAM runway factor ${scores.tam.runwayFactor.toFixed(2)}，quality factor ${p.valuation.qualityFactor?.toFixed(2) || "--"}。`],
    ["5. Evidence Ladder", `强证据优先 SEC/IR/财报电话会/订单/监管文件；社交媒体和价格异动只当线索。Live evidence ${liveCount} 条，来源状态：${sourceText}。当前最需要补的证据：${p.checks.slice(0, 2).join("、")}。`]
  ].map(([title, body]) => `<div class="ledger-block"><strong>${escapeHtml(title)}</strong><p>${escapeHtml(body)}</p></div>`).join("");
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
  ctx.strokeStyle = "rgba(30, 48, 42, 0.35)";
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
  showChartState("正在载入价格数据");
  renderActive(null, null);
  try {
    const [chartData, analysisData, liveEvidence] = await Promise.all([
      fetchChart(symbol, state.range),
      fetchChart(symbol, "1y"),
      fetchEvidence(symbol)
    ]);
    if (state.activeSymbol !== symbol) return;
    renderActive(chartData, analysisData, liveEvidence);
    drawChart(chartData);
    renderLayerRanking();
    renderUniverse();
  } catch (error) {
    state.loading.delete(symbol);
    renderUniverse();
    showChartState(`载入失败：${error.message}`);
  }
}

async function warmupUniverse() {
  const starters = UNIVERSE.slice(0, 18);
  await Promise.allSettled(starters.map(item => safeFetchChart(item.symbol, "1y")));
  renderUniverse();
  renderLayerRanking();
  await selectSymbol(state.activeSymbol);
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

function addSymbol() {
  const input = el.symbolInput.value.trim();
  const raw = input.toUpperCase().replace(/[^A-Z0-9.:-]/g, "");
  const symbol = SYMBOL_ALIASES[input] || SYMBOL_ALIASES[input.toUpperCase()] || SYMBOL_ALIASES[raw] || raw;
  if (!symbol) return;
  if (!UNIVERSE.some(item => item.symbol === symbol)) {
    UNIVERSE.unshift(getProfile(symbol));
  }
  el.symbolInput.value = "";
  selectSymbol(symbol);
}

function tickClock() {
  renderChinaSession();
}

function bindEvents() {
  el.refreshButton.addEventListener("click", () => {
    [...state.quotes.keys()].forEach(key => {
      if (key.startsWith(`${state.activeSymbol}:`)) state.quotes.delete(key);
    });
    state.evidence.delete(state.activeSymbol);
    selectSymbol(state.activeSymbol);
    fetchMonitor(true);
  });
  el.monitorRefreshButton?.addEventListener("click", () => fetchMonitor(true));
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
  el.addSymbolButton.addEventListener("click", addSymbol);
  el.symbolInput.addEventListener("keydown", event => {
    if (event.key === "Enter") addSymbol();
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
      document.querySelectorAll("[data-portfolio-filter]").forEach(item => item.classList.remove("active"));
      button.classList.add("active");
      state.portfolioFilter = button.dataset.portfolioFilter;
      renderPortfolioBoard();
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
  window.addEventListener("resize", () => {
    if (state.currentChartData) drawChart(state.currentChartData);
  });
}

function setupSmartMoneyLayer() {
  const panel = document.querySelector(".smart-money-panel");
  if (!panel || panel.dataset.layerReady) return;
  const head = panel.querySelector(".smart-money-head");
  const tabs = panel.querySelector(".portfolio-tabs");
  const layout = panel.querySelector(".portfolio-layout");
  if (!head || !layout) return;

  panel.dataset.layerReady = "true";
  panel.classList.add("secondary-smart-money", "is-collapsed");

  const summary = document.createElement("div");
  summary.className = "secondary-layer-summary";
  summary.innerHTML = `
    <div>
      <span>二层机会池</span>
      <strong>Smart Money 只做灵感来源</strong>
      <p>大师、国会、AI 基建和 Serenity 模拟组合放到第二层，先看当前标的证据，再打开持仓榜找相关线索。</p>
    </div>
    <div class="secondary-layer-stats">
      <span>${PORTFOLIOS.length} 个组合</span>
      <span>${PORTFOLIOS.reduce((sum, item) => sum + item.holdings.length, 0)} 个持仓</span>
      <span>250日对比</span>
    </div>
  `;
  panel.insertBefore(summary, layout);

  const toggle = document.createElement("button");
  toggle.className = "secondary-toggle";
  toggle.type = "button";
  head.appendChild(toggle);

  const sync = () => {
    const collapsed = panel.classList.contains("is-collapsed");
    toggle.textContent = collapsed ? "展开二层" : "收起二层";
    toggle.setAttribute("aria-expanded", String(!collapsed));
    summary.hidden = !collapsed;
    layout.hidden = collapsed;
    if (tabs) tabs.hidden = collapsed;
  };

  toggle.addEventListener("click", () => {
    panel.classList.toggle("is-collapsed");
    sync();
    if (!panel.classList.contains("is-collapsed")) {
      renderPortfolioBoard();
    }
  });
  sync();
}

function init() {
  bindEvents();
  setupSmartMoneyLayer();
  tickClock();
  setInterval(tickClock, 30000);
  fetchFxRate();
  renderMonitor();
  fetchMonitor();
  setInterval(fetchMonitor, 90000);
  renderLayerRanking();
  renderUniverse();
  renderPortfolioBoard();
  selectSymbol(state.activeSymbol);
  warmupUniverse();
  warmupPortfolios();
}

init();
