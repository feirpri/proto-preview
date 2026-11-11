/* Musi 投资助手 · 静态原型 mock 数据（P1-2 种子基线：2026-11-05 收盘）
   说明：全部为演示数据，仅用于原型展示，不构成投资建议或收益承诺。 */
(function () {
  "use strict";

  var ASOF = "2026-11-10";
  var ASOF_TIME = "2026-11-10 14:32:10";

  function mulberry32(a) {
    return function () {
      a |= 0;
      a = (a + 0x6d2b79f5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function parseUTC(s) {
    var p = s.split("-").map(Number);
    return Date.UTC(p[0], p[1] - 1, p[2]);
  }
  function fmtUTC(ms) {
    var d = new Date(ms);
    var m = String(d.getUTCMonth() + 1).padStart(2, "0");
    var day = String(d.getUTCDate()).padStart(2, "0");
    return d.getUTCFullYear() + "-" + m + "-" + day;
  }
  function businessDaysEnding(endStr, count) {
    var out = [];
    var ms = parseUTC(endStr);
    while (out.length < count) {
      var d = new Date(ms);
      var wd = d.getUTCDay();
      if (wd !== 0 && wd !== 6) out.push(fmtUTC(ms));
      ms -= 86400000;
    }
    return out.reverse();
  }

  var FULL_N = 380;
  var DATES = businessDaysEnding(ASOF, FULL_N);

  function marketPath(n) {
    var rnd = mulberry32(20261105);
    var arr = [];
    for (var i = 0; i < n; i++) {
      var r = 0.00034 + (rnd() - 0.5) * 0.0122;
      var p = i / n;
      if (Math.abs(p - 0.3) < 0.7 / n) r += -0.026;
      if (Math.abs(p - 0.69) < 0.7 / n) r += -0.021;
      if (Math.abs(p - 0.72) < 0.7 / n) r += 0.015;
      if (Math.abs(p - 0.89) < 0.7 / n) r += -0.012;
      arr.push(r);
    }
    return arr;
  }

  function groupPath(mkt, seed, beta, alpha, vol) {
    var rnd = mulberry32(seed);
    return mkt.map(function (r) {
      return r * beta + alpha + (rnd() - 0.5) * vol;
    });
  }

  function toBase100(rets) {
    var v = 100;
    var out = [v];
    for (var i = 0; i < rets.length; i++) {
      v = v * (1 + rets[i]);
      out.push(v);
    }
    return out;
  }

  var MARKET = marketPath(FULL_N);
  var RET = {
    actual: groupPath(MARKET, 1105, 1.0, 0.00006, 0.0034),
    ai: groupPath(MARKET, 2203, 1.02, 0.00004, 0.0029),
    bench: groupPath(MARKET, 3307, 0.88, 0.00002, 0.0025)
  };
  var FULL = {
    actual: toBase100(RET.actual),
    ai: toBase100(RET.ai),
    bench: toBase100(RET.bench)
  };

  function metrics(values) {
    var first = values[0];
    var last = values[values.length - 1];
    var peak = values[0];
    var maxDd = 0;
    var wins = 0;
    var sum = 0;
    for (var i = 1; i < values.length; i++) {
      var d = values[i] / values[i - 1] - 1;
      sum += d;
      if (d > 0) wins++;
      if (values[i] > peak) peak = values[i];
      var dd = values[i] / peak - 1;
      if (dd < maxDd) maxDd = dd;
    }
    return {
      cum: last / first - 1,
      maxDd: maxDd,
      winRate: wins / (values.length - 1),
      dailyAvg: sum / (values.length - 1)
    };
  }

  function sliceRange(key) {
    var n = { "1m": 22, "3m": 66, "1y": 244, all: FULL_N }[key];
    var from = Math.max(0, FULL_N - n);
    function rebase(arr) {
      var first = arr[0];
      return arr.map(function (v) { return (v / first) * 100; });
    }
    var series = {
      actual: rebase(FULL.actual.slice(from, FULL_N + 1)),
      ai: rebase(FULL.ai.slice(from, FULL_N + 1)),
      bench: rebase(FULL.bench.slice(from, FULL_N + 1))
    };
    function dateAt(i) {
      return i === 0 ? DATES[from] : DATES[from + i - 1];
    }
    var labels = [];
    var idx = [0, 0.25, 0.5, 0.75, 1].map(function (p) {
      return Math.round(n * p);
    });
    idx = idx.filter(function (v, i, a) { return a.indexOf(v) === i; });
    idx.forEach(function (i) {
      labels.push({ i: i, label: dateAt(i) });
    });
    var m = {
      actual: metrics(series.actual),
      ai: metrics(series.ai),
      bench: metrics(series.bench)
    };
    m.actual.excess = m.actual.cum - m.bench.cum;
    m.ai.excess = m.ai.cum - m.bench.cum;
    m.bench.excess = 0;
    return {
      key: key,
      start: dateAt(0),
      end: dateAt(n),
      n: n,
      labels: labels,
      series: series,
      metrics: m
    };
  }

  var RANGES = {};

  var actualFunds = [
    {
      code: "006503", name: "财通集成电路产业股票C", short: "财通",
      amount: 145000, target: 0.16, dayPct: 0.0082, dayPnl: 1189,
      quality: "estimate", stale: false,
      nav: 1.284, estNav: 1.2945, estPct: 0.0082, estPnl: 1189,
      estTime: "14:32:10", estSource: "腾讯行情 · 估算", estQuality: "estimate", estNote: null,
      action: "减仓", amountWan: 0.8,
      reason: "权重 21.4% 高于目标 16.0%，按反抽规则减偏离部分，降低权益仓位。",
      executed: true, executedAt: "14:31"
    },
    {
      code: "018345", name: "华夏中证机器人ETF联接C", short: "机器人",
      amount: 139000, target: 0.16, dayPct: 0.0115, dayPnl: 1599,
      quality: "estimate", stale: false,
      nav: 1.126, estNav: 1.1390, estPct: 0.0115, estPnl: 1599,
      estTime: "14:32:10", estSource: "腾讯行情 · 估算", estQuality: "estimate", estNote: null,
      action: "减仓", amountWan: 0.6,
      reason: "权重 20.5% 高于目标 16.0%，同步降低组合权益仓位。",
      executed: true, executedAt: "14:31"
    },
    {
      code: "006864", name: "国联安核心资产混合", short: "国联安",
      amount: 104000, target: 0.22, dayPct: 0.0021, dayPnl: 218,
      quality: "estimate", stale: false,
      nav: 2.041, estNav: 2.0453, estPct: 0.0021, estPnl: 218,
      estTime: "14:32:10", estSource: "腾讯行情 · 估算", estQuality: "estimate", estNote: null,
      action: "保持", amountWan: 0,
      reason: "低于目标权重 6.7pct，趋势未破位，保持观察，不追涨。",
      executed: true, executedAt: "14:31"
    },
    {
      code: "007818", name: "国泰中证全指通信设备ETF联接C", short: "通信",
      amount: 71000, target: 0.08, dayPct: 0.0064, dayPnl: 454,
      quality: "stale", stale: true,
      nav: 0.986, estNav: 0.9923, estPct: 0.0064, estPnl: 454,
      estTime: "13:58:20", estSource: "东财基金 · 最近可用", estQuality: "stale",
      estNote: "最近可用 13:58:20 · 延迟 33 分钟（打开页面未取到新值）",
      action: "保持", amountWan: 0,
      reason: "估值源返回延迟，标记 stale；权重偏离 +2.5pct，处于容忍区间。",
      executed: true, executedAt: "14:31"
    },
    {
      code: "015790", name: "永赢高端装备智选混合发起C", short: "永赢",
      amount: 70000, target: 0.10, dayPct: -0.0037, dayPnl: -259,
      quality: "estimate", stale: false,
      nav: 1.000, estNav: 0.9963, estPct: -0.0037, estPnl: -259,
      estTime: "14:32:10", estSource: "腾讯行情 · 估算", estQuality: "estimate", estNote: null,
      action: "保持", amountWan: 0,
      reason: "接近目标权重，日内波动在阈值内，维持现有仓位。",
      executed: true, executedAt: "14:31"
    }
  ];

  var aiFunds = [
    {
      code: "006503", name: "财通集成电路产业股票C", short: "财通",
      amount: 108600, target: 0.16, dayPct: 0.0082, dayPnl: 891,
      quality: "estimate", stale: false,
      nav: 1.284, estNav: 1.2945, estPct: 0.0082, estPnl: 891,
      estTime: "14:32:10", estSource: "腾讯行情 · 估算", estQuality: "estimate", estNote: null,
      action: "保持", amountWan: 0,
      reason: "影子组严格执行建议后与目标权重一致。", executed: true, executedAt: "14:31"
    },
    {
      code: "018345", name: "华夏中证机器人ETF联接C", short: "机器人",
      amount: 108600, target: 0.16, dayPct: 0.0115, dayPnl: 1249,
      quality: "estimate", stale: false,
      nav: 1.126, estNav: 1.1390, estPct: 0.0115, estPnl: 1249,
      estTime: "14:32:10", estSource: "腾讯行情 · 估算", estQuality: "estimate", estNote: null,
      action: "保持", amountWan: 0,
      reason: "影子组严格执行建议后与目标权重一致。", executed: true, executedAt: "14:31"
    },
    {
      code: "006864", name: "国联安核心资产混合", short: "国联安",
      amount: 149400, target: 0.22, dayPct: 0.0021, dayPnl: 314,
      quality: "estimate", stale: false,
      nav: 2.041, estNav: 2.0453, estPct: 0.0021, estPnl: 314,
      estTime: "14:32:10", estSource: "腾讯行情 · 估算", estQuality: "estimate", estNote: null,
      action: "保持", amountWan: 0,
      reason: "影子组严格执行建议后与目标权重一致。", executed: true, executedAt: "14:31"
    },
    {
      code: "007818", name: "国泰中证全指通信设备ETF联接C", short: "通信",
      amount: 54300, target: 0.08, dayPct: 0.0064, dayPnl: 348,
      quality: "stale", stale: true,
      nav: 0.986, estNav: 0.9923, estPct: 0.0064, estPnl: 348,
      estTime: "13:58:20", estSource: "东财基金 · 最近可用", estQuality: "stale",
      estNote: "最近可用 13:58:20 · 延迟 33 分钟（打开页面未取到新值）",
      action: "保持", amountWan: 0,
      reason: "估值源返回延迟，标记 stale；影子组仓位不变。", executed: true, executedAt: "14:31"
    },
    {
      code: "015790", name: "永赢高端装备智选混合发起C", short: "永赢",
      amount: 67900, target: 0.10, dayPct: -0.0037, dayPnl: -251,
      quality: "estimate", stale: false,
      nav: 1.000, estNav: 0.9963, estPct: -0.0037, estPnl: -251,
      estTime: "14:32:10", estSource: "腾讯行情 · 估算", estQuality: "estimate", estNote: null,
      action: "保持", amountWan: 0,
      reason: "影子组严格执行建议后与目标权重一致。", executed: true, executedAt: "14:31"
    }
  ];

  var benchFunds = [
    {
      code: "000300", name: "沪深300指数（基准）", short: "沪深300",
      amount: 679000, target: 1.0, dayPct: 0.0031, dayPnl: 2105,
      quality: "estimate", stale: false,
      nav: 1.000, estNav: 1.0031, estPct: 0.0031, estPnl: 2105,
      estTime: "14:32:10", estSource: "沪深300 行情 · 估算", estQuality: "estimate", estNote: null,
      action: "保持", amountWan: 0,
      reason: "基准组按沪深300全仓跟踪，不执行主动建议。", executed: false, executedAt: null
    }
  ];

  function decorate(funds, total) {
    return funds.map(function (f) {
      var weight = f.amount / total;
      return Object.assign({}, f, {
        weight: weight,
        targetAmount: f.target * total,
        deviation: weight - f.target
      });
    });
  }

  var GROUPS = {
    actual: {
      key: "actual", label: "实盘", short: "实盘", color: "#2563eb", cls: "actual",
      total: 679000, holdings: 529000, cash: 150000,
      targetEquity: 0.72, equityRatio: 529000 / 679000,
      dayPnl: 3201, dayPct: 3201 / 679000,
      note: "真实持仓，只读展示",
      funds: decorate(actualFunds, 679000)
    },
    ai: {
      key: "ai", label: "AI 影子", short: "AI 影子", color: "#7c3aed", cls: "ai",
      total: 679000, holdings: 488800, cash: 190200,
      targetEquity: 0.72, equityRatio: 488800 / 679000,
      dayPnl: 2551, dayPct: 2551 / 679000,
      note: "严格执行每日建议（模拟、不计费用）",
      funds: decorate(aiFunds, 679000)
    },
    bench: {
      key: "bench", label: "沪深300 基准", short: "沪深300", color: "#d97706", cls: "bench",
      total: 679000, holdings: 679000, cash: 0,
      targetEquity: 1.0, equityRatio: 1.0,
      dayPnl: 2105, dayPct: 2105 / 679000,
      note: "按沪深300全仓跟踪",
      funds: decorate(benchFunds, 679000)
    }
  };

  /* ---------------- v5 演示数据：持仓成本 + 分时/多周期净值 + 指数 PE 分位 ----------------
     说明：以下序列全部为构造的演示数据，用于确认图表形态；不代表真实净值，
     生产环境是否存在稳定接口由数据可行性调研任务确认。 */
  var TREND_PERIODS = [
    { key: "1w", label: "近一周", days: 5 },
    { key: "1m", label: "近一月", days: 22 },
    { key: "1y", label: "近一年", days: 244 },
    { key: "ytd", label: "今年", days: null },
    { key: "3y", label: "近三年", days: 732 },
    { key: "5y", label: "近五年", days: 1250 }
  ];
  var TREND_N = 1260;
  var TREND_DATES = businessDaysEnding(ASOF, TREND_N);

  function r4(v) { return Math.round(v * 10000) / 10000; }

  function buildNavPath(seed, nav, amp, phase) {
    var rnd = mulberry32(seed);
    var noise = 0;
    var factor = [];
    for (var t = 0; t < TREND_N; t++) {
      var p = t / (TREND_N - 1);
      noise += (rnd() - 0.5) * 0.0042;
      factor.push(
        0.8 + 0.2 * p +
        amp * Math.sin(p * Math.PI * 2 * 2.4 + phase) +
        amp * 0.45 * Math.sin(p * Math.PI * 2 * 6.1 + phase * 1.7) +
        noise
      );
    }
    var last = factor[TREND_N - 1];
    var out = [];
    for (var i = 0; i < TREND_N; i++) out.push(r4((nav * factor[i]) / last));
    return out;
  }

  function minuteOf(t) {
    var p = t.split(":").map(Number);
    return p[0] * 60 + p[1];
  }

  function buildIntraday(f, idx) {
    var mins = [];
    var m;
    for (m = 570; m <= 690; m += 5) mins.push(m);
    for (m = 780; m <= 900; m += 5) mins.push(m);
    var target = minuteOf(f.estTime);
    var pts = mins.filter(function (x) { return x <= target; });
    var rnd = mulberry32(7000 + idx * 131);
    var raw = [0];
    var v = 0;
    for (var i = 1; i < pts.length; i++) {
      v += (rnd() - 0.5) * 0.0017 + 0.00002;
      raw.push(v);
    }
    var lastRaw = raw[raw.length - 1] || 0;
    var points = pts.map(function (x, i) {
      return { min: x, pct: raw[i] - lastRaw + f.estPct };
    });
    if (points.length) {
      points[0].pct = 0;
      points[points.length - 1].pct = f.estPct;
    }
    if (!points.length || points[points.length - 1].min !== target) {
      points.push({ min: target, pct: f.estPct, exact: true });
    }
    return {
      points: points,
      lastTime: f.estTime,
      lastPct: f.estPct,
      stale: !!f.stale,
      lastMin: target
    };
  }

  function buildTrend(f, idx) {
    var amp = 0.055 + (idx % 3) * 0.018;
    var values = buildNavPath(20261110 + idx * 97, f.nav, amp, idx * 0.9 + 0.3);
    var oneYear = values.slice(TREND_N - 244);
    var mn = Math.min.apply(null, oneYear);
    var mx = Math.max.apply(null, oneYear);
    var costNav = r4((mn + mx) / 2);
    var ytdFrom = 0;
    for (var i = 0; i < TREND_DATES.length; i++) {
      if (TREND_DATES[i] >= "2026-01-01") { ytdFrom = i; break; }
    }
    var periods = {};
    TREND_PERIODS.forEach(function (p) {
      var from = p.key === "ytd" ? ytdFrom : TREND_N - (p.days + 1);
      from = Math.max(0, from);
      var vals = values.slice(from);
      var dates = TREND_DATES.slice(from);
      periods[p.key] = {
        key: p.key, label: p.label,
        available: true,
        dates: dates, values: vals, n: vals.length,
        start: dates[0], end: dates[dates.length - 1]
      };
    });
    if (idx === 4) {
      /* v6：该基金成立不足 5 年，五年档改为「成立以来」，展示可得区间而非空态 */
      var fromInception = Math.max(0, TREND_N - 561);
      var inceptionValues = values.slice(fromInception);
      var inceptionDates = TREND_DATES.slice(fromInception);
      periods["5y"] = {
        key: "5y", label: "成立以来",
        available: true,
        dates: inceptionDates, values: inceptionValues, n: inceptionValues.length,
        start: inceptionDates[0], end: inceptionDates[inceptionDates.length - 1],
        note: "演示：该基金成立不足 5 年，展示成立以来可得区间；生产可用性待数据调研确认。"
      };
    }
    return {
      costNav: costNav,
      periods: periods,
      intraday: buildIntraday(f, idx),
      demo: true
    };
  }

  GROUPS.actual.funds.forEach(function (f, i) {
    var t = buildTrend(f, i);
    f.trend = t;
    f.costNav = t.costNav;
  });

  var adviceRows = actualFunds.map(function (f) {
    return {
      code: f.code, name: f.name, short: f.short,
      action: f.action, amountWan: f.amountWan,
      reason: f.reason, executed: f.executed, executedAt: f.executedAt
    };
  });

  RANGES["1m"] = sliceRange("1m");
  RANGES["3m"] = sliceRange("3m");
  RANGES["1y"] = sliceRange("1y");
  RANGES.all = sliceRange("all");

  window.MOCK = {
    meta: {
      product: "Musi 投资助手",
      version: "原型 v6",
      asof: ASOF_TIME,
      asofDate: ASOF,
      realtime: {
        trigger: "打开页面自动刷新",
        calcTime: "14:32:10",
        manualStepSec: 47,
        autoDelayMs: 420,
        manualDelayMs: 650,
        source: "腾讯行情 · 估算（演示）",
        demoNote: "原型演示：时间为模拟值；生产环境由估值接口返回，打开页面与手动刷新时调用。",
        staleNote: "通信联接估值源延迟，展示最近可用值，不冒充实时。",
        staleAsOf: "13:58:20"
      },
      timezone: "Asia/Shanghai",
      quality: "estimate",
      qualityLabel: "盘中估算",
      lastOfficial: "2026-11-07 21:32",
      lastOfficialQuality: "official",
      session: "A 股盘中",
      seedBaseline: "2026-11-05 收盘",
      disclaimer: "本原型所有数字均为演示数据，仅用于界面确认，不构成投资建议，也不代表任何收益承诺。",
      trendDemo: "演示数据 · 生产接入待确认",
      writeDemo: "演示写入 · 仅保存在本地，不影响实盘",
      writeNote: "网页端调整仅写入浏览器 localStorage，用于确认交互；不写入真实账本、不调用交易接口、不产生下单。刷新后保留，可随时恢复演示初始值。",
      writeMinAmount: 1000,
      peNote: "PE-TTM 与历史分位数为演示值；分位窗口近 10 年；生产数据接口待调研确认。"
    },
    market: {
      state: "震荡",
      stateKey: "range",
      stateDesc: "指数位于支撑位与压力位之间，未触发破位或反抽规则。",
      indices: [
        { code: "000001", name: "上证指数", value: 3628.41, pct: 0.0042, change: 15.21, high: 3635.2, low: 3601.7, pe: 15.82, pePctile: 0.61, peWindow: "近 10 年" },
        { code: "399001", name: "深证成指", value: 11452.68, pct: 0.0065, change: 73.96, high: 11480.3, low: 11370.1, pe: 24.36, pePctile: 0.48, peWindow: "近 10 年" },
        { code: "399006", name: "创业板指", value: 2431.2, pct: 0.0086, change: 20.73, high: 2444.8, low: 2409.5, pe: 33.15, pePctile: 0.27, peWindow: "近 10 年" },
        { code: "000300", name: "沪深300", value: 4285.63, pct: 0.0031, change: 13.25, high: 4301.4, low: 4262.8, pe: 13.47, pePctile: 0.54, peWindow: "近 10 年" }
      ],
      peDemo: { label: "演示数据 · 生产接入待确认", window: "近 10 年", metric: "PE-TTM" },
      levels: {
        sh: { support: 3590, break: 3574, resistance: 3650 },
        cy: { support: 2376, resistance: 2500 }
      }
    },
    groups: GROUPS,
    advice: {
      date: "2026-11-10",
      state: "震荡",
      executed: true,
      executedAt: "2026-11-10 14:31",
      summary: "震荡市，权益仓位 77.9% 高于目标 72.0%。按反抽规则减偏离：财通减 0.8 万、机器人减 0.6 万，其余保持。",
      targetPlan: "目标权益仓位 72%；减仓后预计权益仓位约 75.8%，现金约 16.4 万。",
      statusLabel: "applied",
      auditNote: "执行记录（executed · applied）与改动前后快照均已保留，回滚不物理删除审计。",
      readonlyNote: "建议只读，执行仅通过 MCP 写入口；页面不提供下单/交易按钮。",
      riskNote: "建议由规则引擎与 AI 生成，仅供参考；不构成投资建议，不保证收益。",
      rows: adviceRows
    },
    news: {
      updatedAt: "2026-11-10 14:30",
      cadence: "AI 每日 14:30 更新本次要闻",
      note: "本页展示最近一次更新（截至 2026-11-10 14:30）的昨日/近期内容。本期不提供刷新，后续迭代接入每日更新。",
      demoBadge: "演示数据 · 非真实新闻",
      items: [
        {
          date: "2026-11-10", time: "11:20", category: "政策",
          title: "国务院常务会议部署扩大内需与设备更新配套措施",
          summary: "会议提出延续设备更新与消费品以旧换新支持，强调资金尽快形成实物工作量。",
          impact: "利好", impactKey: "up", scope: "消费 / 机械 / 家电",
          source: "演示来源 · 政策通稿（虚构）"
        },
        {
          date: "2026-11-10", time: "09:05", category: "民生",
          title: "多地公布最低工资标准上调方案",
          summary: "本轮调整覆盖制造业与服务业密集地区，居民可支配收入预期小幅改善。",
          impact: "利好", impactKey: "up", scope: "消费 / 零售",
          source: "演示来源 · 地方人社厅公告（虚构）"
        },
        {
          date: "2026-11-09", time: "16:40", category: "行业",
          title: "算力基础设施高质量发展行动方案发布",
          summary: "方案提出提升智能算力供给与网络时延指标，鼓励存量数据中心绿色改造。",
          impact: "利好", impactKey: "up", scope: "通信 / 算力 / 电力设备",
          source: "演示来源 · 行业主管部门文件（虚构）"
        },
        {
          date: "2026-11-09", time: "08:30", category: "国际",
          title: "美联储会议纪要显示对降息路径保持谨慎",
          summary: "纪要强调通胀回落仍需观察，市场对下一次降息时点的预期小幅后移。",
          impact: "中性", impactKey: "flat", scope: "全球流动性 / 成长股",
          source: "演示来源 · 海外央行纪要（虚构）"
        },
        {
          date: "2026-11-08", time: "17:10", category: "政策",
          title: "财政部提前下达明年专项债额度",
          summary: "额度向在建项目与重点区域倾斜，要求加快发行使用并形成有效投资。",
          impact: "利好", impactKey: "up", scope: "基建 / 建材 / 工程机械",
          source: "演示来源 · 财政部门公告（虚构）"
        },
        {
          date: "2026-11-08", time: "10:15", category: "民生",
          title: "医保药品目录完成新一轮调整",
          summary: "新增部分创新药与慢性病用药，平均降价幅度较上一轮收窄。",
          impact: "中性", impactKey: "flat", scope: "医药 / 创新药",
          source: "演示来源 · 医保部门公告（虚构）"
        },
        {
          date: "2026-11-07", time: "15:45", category: "国际",
          title: "国际油价回落至近两月低位",
          summary: "供给端扰动缓解叠加需求预期走弱，原油期货连续三个交易日下跌。",
          impact: "利空", impactKey: "down", scope: "石油石化 / 上游资源",
          source: "演示来源 · 国际商品行情（虚构）"
        },
        {
          date: "2026-11-07", time: "12:00", category: "行业",
          title: "10 月新能源汽车销量同比保持增长",
          summary: "插混与出口贡献主要增量，动力电池装机增速略高于整车。",
          impact: "利好", impactKey: "up", scope: "新能源车 / 锂电",
          source: "演示来源 · 行业协会数据（虚构）"
        },
        {
          date: "2026-11-06", time: "18:20", category: "政策",
          title: "央行开展中期借贷便利操作，利率保持不变",
          summary: "本月 MLF 等量续作，流动性投放节奏平稳，短端资金面维持宽松。",
          impact: "中性", impactKey: "flat", scope: "银行 / 利率敏感板块",
          source: "演示来源 · 央行公开市场公告（虚构）"
        },
        {
          date: "2026-11-06", time: "09:40", category: "行业",
          title: "半导体设备出口数据环比改善",
          summary: "先进封装与检测设备订单回暖，成熟制程设备价格仍有压力。",
          impact: "中性", impactKey: "flat", scope: "半导体 / 专用设备",
          source: "演示来源 · 海关数据摘编（虚构）"
        }
      ]
    },
    ranges: RANGES,
    history: [
      {
        time: "2026-11-10 14:32", type: "snapshot", quality: "estimate",
        title: "实盘估算快照",
        desc: "总资产 67.9 万，今日预估收益 +3,201 元（+0.47%）；权益仓位 77.9%。",
        tags: ["盘中快照"]
      },
      {
        time: "2026-11-10 14:31", type: "executed", quality: null,
        title: "今日建议已执行",
        desc: "通过 MCP 写入口应用：减仓 财通 0.8 万、机器人 0.6 万；状态 applied，审计记录已保留。",
        tags: ["executed", "MCP 写入口"]
      },
      {
        time: "2026-11-10 14:30", type: "advice", quality: null,
        title: "每日建议生成",
        desc: "市场状态「震荡」；5 只基金中 2 减仓、3 保持；目标权益仓位 72%。",
        tags: ["14:30 任务", "executed=false → true"]
      },
      {
        time: "2026-11-07 21:32", type: "correction", quality: "official",
        title: "官方净值修正完成",
        desc: "5/5 基金官方净值到齐，11-07 快照由 estimate 修正为 official，并重算累计收益与对比。",
        tags: ["estimate → official", "5/5"]
      },
      {
        time: "2026-11-06 21:34", type: "correction", quality: "partial",
        title: "部分官方净值修正",
        desc: "4/5 基金到齐；通信设备联接延迟公布，快照标记 partial 并在下一轮重试。",
        tags: ["estimate → partial", "4/5"]
      },
      {
        time: "2026-11-06 15:02", type: "rollback", quality: null,
        title: "示例回滚（审计保留）",
        desc: "11-06 建议执行后按用户要求回滚，恢复 pre_snapshot；写反向记录，不物理删除历史。",
        tags: ["pre_snapshot 恢复", "审计保留"]
      },
      {
        time: "2026-11-05 15:00", type: "baseline", quality: "official",
        title: "P1-2 种子基线",
        desc: "5 只基金、持仓 52.9 万 + 现金 15 万 = 67.9 万；目标权重合计 72%。",
        tags: ["seed", "baseline"]
      }
    ],
    trades: [
      { date: "2026-11-10", code: "006503", name: "财通集成电路产业股票C", side: "sell", amount: 8000, nav: 1.284, source: "advice", status: "applied" },
      { date: "2026-11-10", code: "018345", name: "华夏中证机器人ETF联接C", side: "sell", amount: 6000, nav: 1.126, source: "advice", status: "applied" },
      { date: "2026-11-07", code: "006864", name: "国联安核心资产混合", side: "buy", amount: 5000, nav: 2.041, source: "advice", status: "applied" },
      { date: "2026-11-06", code: "007818", name: "国泰中证全指通信设备ETF联接C", side: "sell", amount: 3000, nav: 0.986, source: "advice", status: "reverted" },
      { date: "2026-11-05", code: "015790", name: "永赢高端装备智选混合发起C", side: "buy", amount: 70000, nav: 1.0, source: "manual", status: "applied" }
    ],
    settings: {
      keyLevels: [
        { label: "上证指数 · 支撑位", value: "3590" },
        { label: "上证指数 · 破位线", value: "3574" },
        { label: "上证指数 · 压力位", value: "3650" },
        { label: "创业板指 · 支撑位", value: "2376" },
        { label: "创业板指 · 压力位", value: "2500" }
      ],
      targetEquity: 0.72,
      targetCash: 0.28,
      weights: [
        { code: "006503", name: "财通集成电路产业股票C", weight: 0.16 },
        { code: "018345", name: "华夏中证机器人ETF联接C", weight: 0.16 },
        { code: "006864", name: "国联安核心资产混合", weight: 0.22 },
        { code: "007818", name: "国泰中证全指通信设备ETF联接C", weight: 0.08 },
        { code: "015790", name: "永赢高端装备智选混合发起C", weight: 0.10 }
      ],
      reminders: [
        { label: "14:35 今日决策提醒", desc: "建议生成后提醒查看，只提醒不执行", on: true },
        { label: "14:50 收盘前确认提醒", desc: "提醒确认是否执行今日建议", on: true },
        { label: "21:30 官方净值修正", desc: "修正完成后推送 correction_done", on: true }
      ],
      sources: [
        { label: "行情数据源", value: "腾讯行情（只读）", status: "正常", last: "最近更新 14:32" },
        { label: "基金净值源", value: "东财基金（只读）", status: "正常", last: "最近更新 11-07 21:32" },
        { label: "只读 REST token", value: "••••••7f3a", status: "已配置", last: "本机校验通过" },
        { label: "SSE 实时推送", value: "已连接", status: "正常", last: "最近推送 14:32" }
      ],
      backup: { last: "2026-11-09 21:40", size: "2.4 MB", status: "成功" }
    }
  };
})();
