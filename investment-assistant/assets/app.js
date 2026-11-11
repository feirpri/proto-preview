/* Musi 投资助手 · 静态原型交互与渲染（无构建链，原生 JS） */
(function () {
  "use strict";

  var M = window.MOCK;
  if (!M) return;

  var ICONS = {
    home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M9.5 21v-6h5v6"/>',
    pie: '<path d="M12 3v9h9"/><path d="M21 12a9 9 0 1 1-9-9"/>',
    chart: '<path d="M3 3v18h18"/><path d="m7 15 4-5 3 3 5-7"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    sliders: '<path d="M4 6h9"/><path d="M17 6h3"/><circle cx="15" cy="6" r="2"/><path d="M4 12h3"/><path d="M11 12h9"/><circle cx="9" cy="12" r="2"/><path d="M4 18h9"/><path d="M17 18h3"/><circle cx="15" cy="18" r="2"/>',
    lock: '<rect x="4.5" y="10" width="15" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    check: '<path d="m5 12 4.5 4.5L19 7"/>',
    arrow: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
    warning: '<path d="M12 3 2.6 20.5h18.8Z"/><path d="M12 9v5"/><path d="M12 17.4v.2"/>',
    shield: '<path d="M12 3 5 6v5.2c0 4.3 2.9 7.7 7 9.8 4.1-2.1 7-5.5 7-9.8V6Z"/>',
    database: '<ellipse cx="12" cy="5.5" rx="7" ry="3"/><path d="M5 5.5v13c0 1.7 3.1 3 7 3s7-1.3 7-3v-13"/><path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3"/>',
    bell: '<path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/>',
    wallet: '<path d="M4 7a2 2 0 0 1 2-2h12v4"/><rect x="3" y="7" width="18" height="12" rx="2"/><path d="M16.5 13h2"/>',
    activity: '<path d="M3 12h4l2.6-7 5 14L17 12h4"/>',
    spark: '<path d="M12 3v3.5"/><path d="M12 17.5V21"/><path d="M3 12h3.5"/><path d="M17.5 12H21"/><path d="m5.6 5.6 2.5 2.5"/><path d="m15.9 15.9 2.5 2.5"/><path d="m18.4 5.6-2.5 2.5"/><path d="m8.1 15.9-2.5 2.5"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5Z"/><path d="m3 13 9 5 9-5"/>',
    refresh: '<path d="M20 11a8 8 0 0 0-14.9-4"/><path d="M4 4v4h4"/><path d="M4 13a8 8 0 0 0 14.9 4"/><path d="M20 20v-4h-4"/>',
    external: '<path d="M7 17 17 7"/><path d="M9 7h8v8"/>',
    trend: '<path d="m3 16 6-6 4 4 8-8"/><path d="M15 6h6v6"/>',
    file: '<path d="M6 3h8l4 4v14H6Z"/><path d="M14 3v4h4"/><path d="M9 12h6"/><path d="M9 16h6"/>'
  };

  function icon(name, cls) {
    return '<svg class="' + (cls || "") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[name] || "") + "</svg>";
  }

  var NAV = [
    { key: "today", href: "index.html", label: "今日", icon: "home" },
    { key: "portfolio", href: "portfolio.html", label: "组合", icon: "pie" },
    { key: "compare", href: "compare.html", label: "对比", icon: "chart" },
    { key: "history", href: "history.html", label: "历史", icon: "clock" },
    { key: "settings", href: "settings.html", label: "设置", icon: "sliders" }
  ];

  var QUALITY = {
    official: { cls: "official", label: "official 官方净值" },
    estimate: { cls: "estimate", label: "estimate 盘中估算" },
    partial: { cls: "partial", label: "partial 部分到齐" },
    stale: { cls: "stale", label: "stale 数据延迟" }
  };

  function qBadge(q, label) {
    var def = QUALITY[q];
    if (!def) return '<span class="q neutral">' + (label || q) + "</span>";
    return '<span class="q ' + def.cls + '">' + (label || def.label) + "</span>";
  }

  function groupTag(key) {
    var g = M.groups[key];
    return '<span class="group-tag ' + g.cls + '">' + g.label + "</span>";
  }

  function num(n) {
    return Math.round(n).toLocaleString("en-US");
  }
  function num2(n) {
    return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  function wan(n) {
    var v = Math.round((n / 10000) * 10) / 10;
    return (Number.isInteger(v) ? v.toFixed(0) : v.toFixed(1)) + " 万";
  }
  function pct(x, d) {
    return (x * 100).toFixed(d == null ? 2 : d) + "%";
  }
  function signedPct(x, d) {
    var s = x > 0 ? "+" : x < 0 ? "−" : "";
    return s + Math.abs(x * 100).toFixed(d == null ? 2 : d) + "%";
  }
  function signedPp(x, d) {
    var s = x > 0 ? "+" : x < 0 ? "−" : "";
    return s + Math.abs(x * 100).toFixed(d == null ? 1 : d) + "pct";
  }
  function signedYuan(n) {
    var s = n > 0 ? "+" : n < 0 ? "−" : "";
    return s + Math.abs(Math.round(n)).toLocaleString("en-US");
  }
  function cls(x) {
    return x > 0.00001 ? "up" : x < -0.00001 ? "down" : "flat";
  }
  function actionChip(action) {
    var map = { "加仓": "buy", "减仓": "sell", "保持": "hold" };
    return '<span class="chip ' + (map[action] || "plain") + '">' + action + "</span>";
  }
  function roChip(text) {
    return '<span class="ro-chip">' + icon("lock") + (text || "只读原型") + "</span>";
  }
  function dataChip() {
    var t = M.meta.asof.slice(11);
    return '<span class="data-chip"><span class="dot live"></span>数据时间 <b>' + t + "</b>" + qBadge(M.meta.quality, "estimate") + "</span>";
  }
  function miniBrand() {
    return '<div class="brand"><div class="brand-mark">M</div><div><div class="brand-name">Musi 投资助手</div><div class="brand-sub">只读原型 · ' + M.meta.version + "</div></div></div>";
  }
  function navHTML(active, mobile) {
    return NAV.map(function (n) {
      return '<a class="' + (mobile ? "" : "nav-item ") + (n.key === active ? "active" : "") + '" href="' + n.href + '"' + (n.key === active ? ' aria-current="page"' : "") + ">" + icon(n.icon) + "<span>" + n.label + "</span></a>";
    }).join("");
  }

  function mountShell(active) {
    var m = M.meta;
    var side = document.getElementById("sidebar");
    if (side) {
      side.innerHTML =
        miniBrand() +
        '<nav class="side-nav" aria-label="主导航">' + navHTML(active, false) + "</nav>" +
        '<div class="side-foot">' +
        '<div class="side-data"><b>数据时间</b><br>' + m.asof + '<br>业务时区 ' + m.timezone + "<br><b>最近官方净值</b> " + m.lastOfficial.slice(5) + "</div>" +
        '<div class="readonly-note">' + icon("lock") + "<span>客户端只读。下单、改仓位、写建议均需通过 MCP 写入口。</span></div>" +
        "</div>";
    }

    var top = document.getElementById("topbar");
    if (top) {
      var current = NAV.filter(function (n) { return n.key === active; })[0] || NAV[0];
      top.innerHTML =
        '<div class="topbar-left"><div class="topbar-brand"><div class="brand-mark">M</div></div><div><div class="topbar-title">' + current.label + '</div><div class="topbar-sub">' + m.asofDate + " 周二 · " + m.session + "</div></div></div>" +
        '<div class="topbar-right">' + dataChip() + roChip("只读") + "</div>";
    }

    var foot = document.getElementById("site-footer");
    if (foot) {
      foot.innerHTML =
        '<div class="quality-legend"><span class="lg-title">数据质量</span>' +
        qBadge("official") + qBadge("estimate") + qBadge("partial") + qBadge("stale") +
        '<span class="lg-title" style="margin-left:8px">三组颜色</span>' +
        '<span class="group-tag actual">实盘</span><span class="group-tag ai">AI 影子</span><span class="group-tag bench">沪深300 基准</span></div>' +
        '<div class="risk-note">' + icon("warning") + "<span>" + m.disclaimer + " 数据时间 " + m.asof + "（" + m.timezone + "）。</span></div>";
    }

    var bottom = document.getElementById("bottom-nav");
    if (bottom) bottom.innerHTML = navHTML(active, true);
  }

  /* ---------------- 今日 ---------------- */
  function todayHead() {
    var el = document.getElementById("today-head-side");
    if (el) el.innerHTML = roChip("只读原型 · 演示数据");
  }

  function marketCard() {
    var mk = M.market;
    var sh = mk.indices[0];
    var cy = mk.indices[1];
    var lv = mk.levels.sh;
    var pos = ((sh.value - lv.break) / (lv.resistance - lv.break)) * 100;
    pos = Math.max(6, Math.min(94, pos));
    return (
      '<div class="card stat-card col-3 accent-amber">' +
      '<div class="k">' + icon("activity") + ' 市场状态 <span class="q estimate">盘中</span></div>' +
      '<div class="market-line"><span class="market-value">' + mk.state + '</span><span class="market-name">上证 ' + num2(sh.value) + '</span></div>' +
      '<div class="s ' + cls(sh.pct) + '">' + signedPct(sh.pct) + ' <span class="flat">· 创业板 ' + signedPct(cy.pct) + "</span></div>" +
      '<div class="level-bar"><div class="level-track"><span class="level-marker" style="left:' + pos + '%"></span></div>' +
      '<div class="level-labels"><span>破位 <b>' + lv.break + '</b></span><span>支撑 <b>' + lv.support + '</b></span><span>压力 <b>' + lv.resistance + "</b></span></div></div>" +
      "</div>"
    );
  }

  function statCards() {
    var a = M.groups.actual;
    var over = a.equityRatio - a.targetEquity;
    return (
      marketCard() +
      '<div class="card stat-card col-3 accent-blue">' +
      '<div class="k">' + icon("wallet") + ' 总资产 ' + groupTag("actual") + "</div>" +
      '<div class="v">' + num(a.total) + "<small>元</small></div>" +
      '<div class="s">持仓 ' + wan(a.holdings) + " · 现金 " + wan(a.cash) + "</div>" +
      '<div class="s">' + wan(a.total) + " = " + wan(a.holdings) + " + " + wan(a.cash) + "</div>" +
      "</div>" +
      '<div class="card stat-card col-3 accent-up">' +
      '<div class="k">' + icon("trend") + ' 今日预估收益 <span class="q estimate">estimate</span></div>' +
      '<div class="v up">' + signedYuan(a.dayPnl) + "<small>元</small></div>" +
      '<div class="s up">' + signedPct(a.dayPct) + " · 盘中估算</div>" +
      '<div class="s">非官方净值，夜间修正为 official / partial</div>' +
      "</div>" +
      '<div class="card stat-card col-3">' +
      '<div class="k">' + icon("pie") + ' 权益仓位 <span class="q estimate">盘中</span></div>' +
      '<div class="v">' + pct(a.equityRatio, 1) + "<small>目标 " + pct(a.targetEquity, 0) + "</small></div>" +
      '<div class="s">现金 ' + pct(a.cash / a.total, 1) + ' · 目标 ' + pct(1 - a.targetEquity, 0) + "</div>" +
      '<div class="s"><span class="chip amber">超配 ' + signedPp(over) + "</span><span>再平衡仅通过 MCP</span></div>" +
      "</div>"
    );
  }

  function adviceBanner() {
    var ad = M.advice;
    return (
      '<div class="advice-banner">' +
      '<div class="advice-icon">' + icon("spark") + "</div>" +
      '<div class="advice-body">' +
      '<div class="advice-title">今日建议 <span class="chip green">executed · 已执行</span><span class="q neutral">' + ad.executedAt.slice(11) + " 应用</span></div>" +
      '<div class="advice-text">' + ad.summary + "</div>" +
      '<div class="advice-meta"><span class="chip plain">市场状态 ' + ad.state + '</span><span class="chip plain">5 条建议</span><span class="chip plain">2 减仓 · 3 保持</span><span class="chip plain">审计保留</span></div>' +
      '<div class="advice-text" style="margin-top:8px;color:var(--muted);font-size:12px">' + ad.targetPlan + "</div>" +
      '<div class="advice-text" style="margin-top:4px;color:var(--muted-2);font-size:11px">持仓金额为 14:30 估算快照（执行前）；14:31 已按建议执行，交易明细见历史页。</div>' +
      "</div></div>"
    );
  }

  function fundCard(f) {
    var pnl = f.dayPnl;
    var dev = f.weight - f.target;
    var fillW = Math.min(100, f.weight * 100);
    var targetLeft = Math.min(98, f.target * 100);
    var exec = f.executed
      ? '<span class="exec-state">' + icon("check") + "executed · " + f.executedAt + "</span>"
      : '<span class="exec-state" style="color:var(--muted)">' + icon("lock") + "不执行主动建议</span>";
    return (
      '<article class="card fund-card">' +
      '<div class="fund-top"><div><div class="fund-name">' + f.name + '</div><div class="fund-code">' + f.code + " · 目标权重 " + pct(f.target, 0) + "</div></div>" + qBadge(f.quality, f.stale ? "stale 延迟" : null) + "</div>" +
      '<div class="fund-mid"><div><div class="fund-pnl ' + cls(pnl) + '">' + signedYuan(pnl) + "<small>元</small></div><div class=\"fund-amt\">今日预估 " + signedPct(f.dayPct) + "</div></div>" +
      '<div class="fund-amt">持仓<b>' + wan(f.amount) + "</b>实际权重 " + pct(f.weight, 1) + "</div></div>" +
      '<div class="weight-row"><span>权重</span><div class="weight-track"><div class="weight-fill" style="width:' + fillW + "%;background:" + (f.stale ? "var(--amber)" : "var(--blue)") + '"></div><div class="weight-target" style="left:' + targetLeft + '%"></div></div><span>目标 ' + pct(f.target, 0) + "</span></div>" +
      '<div class="fund-action">' + actionChip(f.action) + (f.amountWan > 0 ? '<span class="chip plain">' + f.amountWan.toFixed(1) + " 万</span>" : '<span class="chip plain">维持仓位</span>') + '<span class="q neutral">偏离 ' + signedPp(dev) + "</span></div>" +
      '<div class="fund-reason">' + f.reason + "</div>" +
      '<div class="fund-foot">' + exec + "<span>只读</span></div>" +
      "</article>"
    );
  }

  function qualityCard() {
    return (
      '<div class="card col-12 card-pad">' +
      '<div class="section-head" style="margin-bottom:10px"><div><h2 style="margin:0;font-size:15px">数据时间与质量</h2><div class="hint">asof ' + M.meta.asof + " · " + M.meta.timezone + '</div></div><span class="q estimate">estimate 盘中估算</span></div>' +
      '<div class="quality-legend" style="background:var(--surface-2)">' +
      qBadge("official", "official · 官方净值到齐") + qBadge("estimate", "estimate · 盘中估算") + qBadge("partial", "partial · 部分到齐") + qBadge("stale", "stale · 数据延迟") +
      "</div>" +
      '<div class="risk-note">' + icon("warning") + "<span>今日快照为盘中估算，晚间 21:30 后按官方净值修正；修正前请勿以估算数字对账。基准组与 AI 影子组均为模拟，不涉及真实资金。</span></div>" +
      "</div>"
    );
  }

  function renderToday() {
    todayHead();
    var stats = document.getElementById("today-stats");
    if (stats) stats.innerHTML = statCards();
    var adv = document.getElementById("today-advice");
    if (adv) adv.innerHTML = adviceBanner();
    var grid = document.getElementById("fund-grid");
    if (grid) grid.innerHTML = M.groups.actual.funds.map(fundCard).join("");
    var q = document.getElementById("today-quality");
    if (q) q.innerHTML = qualityCard();
  }

  /* ---------------- 组合 ---------------- */
  var portfolioGroup = "actual";

  function groupTabs() {
    return (
      '<div class="tabs" role="tablist" aria-label="组合分组">' +
      ["actual", "ai", "bench"].map(function (k) {
        var g = M.groups[k];
        return '<button class="tab' + (k === portfolioGroup ? " active" : "") + '" role="tab" aria-selected="' + (k === portfolioGroup) + '" data-group="' + k + '"><span class="dot" style="background:' + g.color + '"></span>' + g.label + "</button>";
      }).join("") +
      "</div>"
    );
  }

  function portfolioStats(g) {
    var over = g.equityRatio - g.targetEquity;
    return (
      '<div class="card stat-card col-3 accent-blue"><div class="k">' + icon("wallet") + " 总资产 " + groupTag(g.key) + "</div>" +
      '<div class="v">' + num(g.total) + "<small>元</small></div>" +
      '<div class="s">' + g.note + "</div></div>" +
      '<div class="card stat-card col-3"><div class="k">' + icon("layers") + " 持仓市值 / 现金</div>" +
      '<div class="v">' + wan(g.holdings) + "</div>" +
      '<div class="s">现金 ' + wan(g.cash) + " · 合计 " + wan(g.total) + "</div></div>" +
      '<div class="card stat-card col-3 accent-up"><div class="k">' + icon("trend") + ' 今日预估收益 <span class="q estimate">estimate</span></div>' +
      '<div class="v ' + cls(g.dayPnl) + '">' + signedYuan(g.dayPnl) + "<small>元</small></div>" +
      '<div class="s ' + cls(g.dayPct) + '">' + signedPct(g.dayPct) + " · 盘中估算</div></div>" +
      '<div class="card stat-card col-3"><div class="k">' + icon("pie") + " 权益仓位 / 目标</div>" +
      '<div class="v">' + pct(g.equityRatio, 1) + "<small>目标 " + pct(g.targetEquity, 0) + "</small></div>" +
      '<div class="s">' + (g.key === "bench" ? '<span class="chip amber">基点跟踪</span><span>全仓沪深300</span>' : '<span class="chip ' + (over > 0.02 ? "amber" : "green") + '">偏离 ' + signedPp(over) + "</span><span>再平衡仅通过 MCP</span>") + "</div></div>"
    );
  }

  function holdings(g) {
    var head =
      '<div class="holdings-head"><div>基金 / 代码</div><div class="r">持仓市值</div><div class="r">实际权重</div><div class="r">目标权重</div><div class="r">偏离</div><div class="r">今日预估</div></div>';
    var rows = g.funds.map(function (f) {
      var dev = f.weight - f.target;
      var devCls = Math.abs(dev) < 0.02 ? "flat" : dev > 0 ? "up" : "down";
      var barW = Math.min(100, f.weight * 100);
      return (
        '<div class="holding-row">' +
        '<div class="fund-cell"><div class="fund-avatar">' + f.short + '</div><div style="min-width:0"><div class="nm">' + f.name + '</div><div class="cd">' + f.code + " · " + (f.stale ? "stale" : "estimate") + "</div></div></div>" +
        '<div class="r"><span class="cell-k">持仓市值</span><b>' + wan(f.amount) + "</b></div>" +
        '<div class="r"><span class="cell-k">实际权重</span><b>' + pct(f.weight, 1) + '</b><div class="subbar"><span style="width:' + barW + "%;background:" + g.color + '"></span></div></div>' +
        '<div class="r"><span class="cell-k">目标权重</span>' + pct(f.target, 0) + "</div>" +
        '<div class="r"><span class="cell-k">偏离</span><span class="' + devCls + '">' + signedPp(dev) + "</span></div>" +
        '<div class="r"><span class="cell-k">今日预估</span><span class="' + cls(f.dayPnl) + '">' + signedYuan(f.dayPnl) + " 元</span></div>" +
        "</div>"
      );
    }).join("");
    return head + rows;
  }

  function deviationList(g) {
    if (g.key === "bench") {
      return '<div class="dev-item"><span class="bar"></span><div><div class="t">基准组无主动偏离</div><div class="d">按沪深300全仓跟踪，用于对比主动策略的超额收益；不参与再平衡。</div></div></div>';
    }
    if (g.key === "ai") {
      return '<div class="dev-item"><span class="bar"></span><div><div class="t">与目标权重一致</div><div class="d">AI 影子组严格执行每日建议，当前权益仓位 72.0%，现金 28.0%，无触发偏离提示。</div></div></div>';
    }
    var over = g.equityRatio - g.targetEquity;
    var items = [
      {
        warn: Math.abs(over) > 0.02,
        t: "权益仓位 " + pct(g.equityRatio, 1) + " / 目标 " + pct(g.targetEquity, 1),
        d: (over > 0 ? "超配 " : "低配 ") + Math.abs(over * 100).toFixed(1) + "pct；" + (over > 0 ? "今日建议已减仓 1.4 万降低偏离，本页为执行前快照。" : "建议等待趋势确认后再补足。")
      }
    ];
    g.funds.forEach(function (f) {
      var d = f.weight - f.target;
      if (Math.abs(d) >= 0.02) {
        items.push({
          warn: d > 0,
          t: f.short + " " + (d > 0 ? "超配 " : "低配 ") + signedPp(d).replace("+", "").replace("−", ""),
          d: "实际 " + pct(f.weight, 1) + " / 目标 " + pct(f.target, 1) + (f.stale ? "；该基金估值源延迟，权重按最近可用值展示。" : "。")
        });
      }
    });
    items.push({
      warn: false,
      t: "现金 " + pct(g.cash / g.total, 1) + " / 目标 " + pct(1 - g.targetEquity, 1),
      d: "现金不参与日内波动；再平衡动作需通过 MCP 写入口确认。"
    });
    return items.map(function (i) {
      return '<div class="dev-item ' + (i.warn ? "warn" : "") + '"><span class="bar"></span><div><div class="t">' + i.t + '</div><div class="d">' + i.d + "</div></div></div>";
    }).join("");
  }

  function levelRows() {
    var lv = M.settings.keyLevels;
    return lv.map(function (l) {
      return '<div class="setting-row"><div class="label">' + l.label + '</div><div class="value">' + l.value + "</div></div>";
    }).join("");
  }

  function renderPortfolio() {
    var g = M.groups[portfolioGroup];
    var tabs = document.getElementById("group-tabs");
    if (tabs) tabs.innerHTML = groupTabs();
    var note = document.getElementById("group-note");
    if (note) note.textContent = g.note;
    var stats = document.getElementById("portfolio-stats");
    if (stats) stats.innerHTML = portfolioStats(g);
    var hold = document.getElementById("holdings");
    if (hold) hold.innerHTML = holdings(g);
    var dev = document.getElementById("deviation-list");
    if (dev) dev.innerHTML = deviationList(g);
    var lv = document.getElementById("portfolio-levels");
    if (lv) lv.innerHTML = levelRows();
    Array.prototype.forEach.call(document.querySelectorAll("#group-tabs .tab"), function (btn) {
      btn.addEventListener("click", function () {
        portfolioGroup = btn.getAttribute("data-group");
        renderPortfolio();
      });
    });
  }

  /* ---------------- 对比 ---------------- */
  var compareRange = "1y";

  function rangeTabs() {
    var labels = { "1m": "近 1 月", "3m": "近 3 月", "1y": "近 1 年", all: "全部" };
    return (
      '<div class="tabs" role="tablist" aria-label="区间切换">' +
      ["1m", "3m", "1y", "all"].map(function (k) {
        return '<button class="tab' + (k === compareRange ? " active" : "") + '" role="tab" aria-selected="' + (k === compareRange) + '" data-range="' + k + '">' + labels[k] + "</button>";
      }).join("") +
      "</div>"
    );
  }

  function smoothPath(points) {
    if (points.length < 2) return "";
    var d = "M" + points[0].x.toFixed(2) + "," + points[0].y.toFixed(2);
    for (var i = 0; i < points.length - 1; i++) {
      var p0 = points[i - 1] || points[i];
      var p1 = points[i];
      var p2 = points[i + 1];
      var p3 = points[i + 2] || p2;
      var c1x = p1.x + (p2.x - p0.x) / 6;
      var c1y = p1.y + (p2.y - p0.y) / 6;
      var c2x = p2.x - (p3.x - p1.x) / 6;
      var c2y = p2.y - (p3.y - p1.y) / 6;
      d += " C" + c1x.toFixed(2) + "," + c1y.toFixed(2) + " " + c2x.toFixed(2) + "," + c2y.toFixed(2) + " " + p2.x.toFixed(2) + "," + p2.y.toFixed(2);
    }
    return d;
  }

  function chartSVG(range) {
    var compact = window.innerWidth <= 720;
    var W = compact ? 390 : 980;
    var H = compact ? 300 : 390;
    var pad = compact ? { l: 38, r: 12, t: 14, b: 30 } : { l: 48, r: 20, t: 16, b: 36 };
    var fs = compact ? 11.5 : 10.5;
    var series = range.series;
    var n = series.actual.length;
    var all = series.actual.concat(series.ai, series.bench);
    var min = Math.min.apply(null, all);
    var max = Math.max.apply(null, all);
    var yMin = Math.floor((min - 1) / 2) * 2;
    var yMax = Math.ceil((max + 1) / 2) * 2;
    if (yMax - yMin < 6) { yMin -= 2; yMax += 2; }
    function x(i) { return pad.l + (i / (n - 1)) * (W - pad.l - pad.r); }
    function y(v) { return pad.t + ((yMax - v) / (yMax - yMin)) * (H - pad.t - pad.b); }
    var defs = '<defs><linearGradient id="actualFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#2563eb" stop-opacity="0.14"/><stop offset="100%" stop-color="#2563eb" stop-opacity="0"/></linearGradient></defs>';
    var grid = "";
    var ticks = compact ? 4 : 5;
    for (var t = 0; t < ticks; t++) {
      var val = yMin + ((yMax - yMin) * t) / (ticks - 1);
      var yy = y(val);
      grid += '<line x1="' + pad.l + '" y1="' + yy.toFixed(1) + '" x2="' + (W - pad.r) + '" y2="' + yy.toFixed(1) + '" stroke="#e9edf5" stroke-width="1"/>';
      grid += '<text x="' + (pad.l - 7) + '" y="' + (yy + 3.5).toFixed(1) + '" text-anchor="end" fill="#94a3b8" font-size="' + fs + '">' + val.toFixed(0) + "</text>";
    }
    var y100 = y(100);
    var base100 = '<line x1="' + pad.l + '" y1="' + y100.toFixed(1) + '" x2="' + (W - pad.r) + '" y2="' + y100.toFixed(1) + '" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4 4" opacity="0.55"/>';
    var labelPoints = compact ? [range.labels[0], range.labels[Math.floor(range.labels.length / 2)], range.labels[range.labels.length - 1]] : range.labels;
    var xLabels = labelPoints.map(function (l, idx) {
      var lab = range.n > 80 ? l.label.slice(0, 7) : l.label.slice(5);
      var anchor = idx === 0 ? "start" : idx === labelPoints.length - 1 ? "end" : "middle";
      return '<text x="' + x(l.i).toFixed(1) + '" y="' + (H - 10) + '" text-anchor="' + anchor + '" fill="#94a3b8" font-size="' + fs + '">' + lab + "</text>";
    }).join("");
    var cols = [
      { key: "bench", color: "#d97706" },
      { key: "ai", color: "#7c3aed" },
      { key: "actual", color: "#2563eb" }
    ];
    var area = "";
    var lines = "";
    var ends = "";
    cols.forEach(function (c) {
      var vals = series[c.key];
      var pts = vals.map(function (v, i) { return { x: x(i), y: y(v) }; });
      var d = smoothPath(pts);
      if (c.key === "actual") {
        area = '<path d="' + d + " L" + pts[pts.length - 1].x.toFixed(2) + "," + (H - pad.b) + " L" + pts[0].x.toFixed(2) + "," + (H - pad.b) + ' Z" fill="url(#actualFill)"/>';
      }
      lines += '<path d="' + d + '" fill="none" stroke="' + c.color + '" stroke-width="' + (compact ? 2 : 2.2) + '" stroke-linecap="round" stroke-linejoin="round"/>';
      var last = pts[pts.length - 1];
      ends += '<circle cx="' + last.x.toFixed(2) + '" cy="' + last.y.toFixed(2) + '" r="3.6" fill="#fff" stroke="' + c.color + '" stroke-width="2.4"/>';
    });
    var endVals = [
      { key: "actual", color: "#2563eb", dy: 1 },
      { key: "ai", color: "#7c3aed", dy: -11 },
      { key: "bench", color: "#d97706", dy: 16 }
    ];
    var endLabels = endVals.map(function (e) {
      var vals = series[e.key];
      var v = vals[vals.length - 1];
      return '<text x="' + (W - pad.r - 3) + '" y="' + (y(v) + e.dy).toFixed(1) + '" text-anchor="end" fill="' + e.color + '" font-size="' + fs + '" font-weight="700">' + v.toFixed(1) + "</text>";
    }).join("");
    return (
      '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="三组基点 100 收益曲线">' +
      defs + grid + base100 + area + lines + ends + endLabels + xLabels +
      '<text x="' + pad.l + '" y="' + (pad.t - 2) + '" fill="#94a3b8" font-size="' + fs + '">基点 100</text>' +
      "</svg>"
    );
  }

  function metricBox(k, v, clsName, sub) {
    return '<div class="metric-box"><div class="k">' + k + '</div><div class="v ' + (clsName || "") + '">' + v + '</div><div class="s">' + (sub || "") + "</div></div>";
  }

  function compareMetrics(range) {
    var m = range.metrics;
    return (
      metricBox("AI 影子累计收益", signedPct(m.ai.cum), cls(m.ai.cum), "区间 " + range.n + " 个交易日") +
      metricBox("实盘累计收益", signedPct(m.actual.cum), cls(m.actual.cum), "对比基准") +
      metricBox("沪深300 累计收益", signedPct(m.bench.cum), cls(m.bench.cum), "基准组") +
      metricBox("AI 超额收益", signedPct(m.ai.excess), cls(m.ai.excess), "AI − 沪深300") +
      metricBox("AI 最大回撤", signedPct(m.ai.maxDd), "down", "区间内峰值回撤")
    );
  }

  function compareTable(range) {
    var m = range.metrics;
    function row(label, key, fmt, best) {
      var vals = ["actual", "ai", "bench"].map(function (g) {
        var v = m[g][key];
        return '<td class="' + (best && g === best ? "best " : "") + cls(v) + '">' + fmt(v) + "</td>";
      }).join("");
      return "<tr><td>" + label + "</td>" + vals + "</tr>";
    }
    var bestCum = ["actual", "ai", "bench"].reduce(function (a, b) {
      return m[a].cum >= m[b].cum ? a : b;
    });
    return (
      "<thead><tr><th>指标</th><th>实盘</th><th>AI 影子</th><th>沪深300 基准</th></tr></thead><tbody>" +
      row("累计收益", "cum", signedPct, bestCum) +
      row("最大回撤", "maxDd", signedPct, null) +
      row("胜率", "winRate", function (v) { return pct(v, 1); }, null) +
      row("日均收益", "dailyAvg", function (v) { return signedPct(v, 3); }, null) +
      row("超额收益（vs 沪深300）", "excess", signedPct, null) +
      "</tbody>"
    );
  }

  function renderCompare() {
    var range = M.ranges[compareRange];
    var tabs = document.getElementById("range-tabs");
    if (tabs) tabs.innerHTML = rangeTabs();
    var chart = document.getElementById("chart");
    if (chart) chart.innerHTML = chartSVG(range);
    var mg = document.getElementById("compare-metrics");
    if (mg) mg.innerHTML = compareMetrics(range);
    var table = document.getElementById("compare-table");
    if (table) table.innerHTML = compareTable(range);
    var meta = document.getElementById("compare-meta");
    if (meta) meta.textContent = range.start + " → " + range.end + " · " + range.n + " 个交易日 · 基点 100";
    var lgA = document.getElementById("lg-actual");
    var lgI = document.getElementById("lg-ai");
    var lgB = document.getElementById("lg-bench");
    if (lgA) lgA.textContent = signedPct(range.metrics.actual.cum);
    if (lgI) lgI.textContent = signedPct(range.metrics.ai.cum);
    if (lgB) lgB.textContent = signedPct(range.metrics.bench.cum);
    Array.prototype.forEach.call(document.querySelectorAll("#range-tabs .tab"), function (btn) {
      btn.addEventListener("click", function () {
        compareRange = btn.getAttribute("data-range");
        renderCompare();
      });
    });
  }

  /* ---------------- 历史 ---------------- */
  function historySummary() {
    return (
      '<div class="card stat-card col-3 accent-blue"><div class="k">' + icon("file") + " 最近 7 天建议</div><div class=\"v\">5<small>条</small></div><div class=\"s\">2 减仓 · 3 保持</div></div>" +
      '<div class="card stat-card col-3"><div class="k">' + icon("check") + " 已执行</div><div class=\"v\">4<small>条</small></div><div class=\"s\">applied · 审计保留</div></div>" +
      '<div class="card stat-card col-3"><div class="k">' + icon("refresh") + " 已回滚</div><div class=\"v\">1<small>条</small></div><div class=\"s\">reverted · 保留审计</div></div>" +
      '<div class="card stat-card col-3 accent-amber"><div class="k">' + icon("shield") + " 最新官方修正</div><div class=\"v\">5/5<small>到齐</small></div><div class=\"s\">11-07 完整 · 11-06 4/5 partial</div></div>"
    );
  }

  function timeline() {
    return M.history.map(function (h) {
      var typeCls = h.type === "snapshot" ? "estimate" : h.type === "rollback" ? "reverted" : h.type === "correction" ? h.quality : h.type === "baseline" ? "official" : "";
      var badge = h.quality ? qBadge(h.quality) : h.type === "rollback" ? '<span class="chip red">reverted</span>' : h.type === "executed" ? '<span class="chip green">applied</span>' : h.type === "advice" ? '<span class="chip blue">advice</span>' : '<span class="chip plain">' + h.type + "</span>";
      var tags = h.tags.map(function (t) {
        var isQ = /^(estimate|official|partial|stale)/.test(t);
        if (!isQ) return '<span class="chip plain">' + t + "</span>";
        var qk = t.indexOf("→ official") >= 0 ? "official" : t.indexOf("→ partial") >= 0 ? "partial" : t.split(" ")[0];
        return qBadge(qk, t);
      }).join("");
      return (
        '<div class="tl-item ' + typeCls + '"><span class="tl-dot"></span>' +
        '<div class="tl-card"><div class="tl-top"><span class="tl-time">' + h.time + '</span><span class="tl-title">' + h.title + "</span>" + badge + "</div>" +
        '<div class="tl-desc">' + h.desc + "</div>" +
        '<div class="tl-meta">' + tags + "</div></div></div>"
      );
    }).join("");
  }

  function tradesTable() {
    var head = '<div class="trade-head"><div>日期</div><div>基金</div><div>方向</div><div class="r">金额</div><div class="r">净值</div><div>状态 / 来源</div></div>';
    var rows = M.trades.map(function (t) {
      var side = t.side === "buy" ? '<span class="chip buy">买入</span>' : '<span class="chip sell">卖出</span>';
      var st = t.status === "applied" ? '<span class="chip green">已执行</span>' : '<span class="chip red">已回滚</span>';
      var src = t.source === "advice" ? "建议" : "手动";
      return (
        '<div class="trade-row"><div><span class="trade-key">日期</span>' + t.date + '</div><div class="trade-fund">' + t.name + ' <span style="color:var(--muted-2)">' + t.code + "</span></div>" +
        '<div><span class="trade-key">方向</span>' + side + '</div><div class="r"><span class="trade-key">金额</span>' + num(t.amount) + ' 元</div><div class="r"><span class="trade-key">净值</span>' + t.nav.toFixed(3) + "</div>" +
        '<div><span class="trade-key">状态 / 来源</span>' + st + ' <span class="chip plain">' + src + "</span></div></div>"
      );
    }).join("");
    return head + rows;
  }

  function renderHistory() {
    var s = document.getElementById("history-summary");
    if (s) s.innerHTML = historySummary();
    var tl = document.getElementById("timeline");
    if (tl) tl.innerHTML = timeline();
    var tr = document.getElementById("trades");
    if (tr) tr.innerHTML = tradesTable();
  }

  /* ---------------- 设置 ---------------- */
  function renderSettings() {
    var st = M.settings;
    var levels = document.getElementById("settings-levels");
    if (levels) {
      levels.innerHTML = st.keyLevels.map(function (l) {
        return '<div class="setting-row"><div><div class="label">' + l.label + '</div></div><div class="value">' + l.value + "</div></div>";
      }).join("");
    }
    var weights = document.getElementById("settings-weights");
    if (weights) {
      var maxW = 0.30;
      weights.innerHTML =
        '<div class="setting-row"><div><div class="label">目标权益仓位</div><div class="desc">持仓市值 / 总资产</div></div><div class="value">' + pct(st.targetEquity, 0) + "<small>现金目标 " + pct(st.targetCash, 0) + "</small></div></div>" +
        '<div class="weight-setting">' +
        st.weights.map(function (w) {
          return '<div class="ws-row"><div><div>' + w.name + ' <span style="color:var(--muted-2);font-size:11px">' + w.code + '</span></div><div class="ws-bar"><span style="width:' + Math.min(100, (w.weight / maxW) * 100) + '%"></span></div></div><div class="ws-num">' + pct(w.weight, 0) + "</div></div>";
        }).join("") +
        "</div>" +
        '<div class="setting-row"><div><div class="label">权重合计</div><div class="desc">5 只基金目标权重之和</div></div><div class="value">72%<small>与目标权益仓位一致</small></div></div>' +
        '<div class="hint" style="margin-top:10px;font-size:11px;color:var(--muted-2)">条形长度按 30% 满格展示，仅用于权重比较。</div>';
    }
    var reminders = document.getElementById("settings-reminders");
    if (reminders) {
      reminders.innerHTML = st.reminders.map(function (r) {
        return '<div class="setting-row"><div><div class="label">' + r.label + '</div><div class="desc">' + r.desc + '</div></div><div style="display:flex;align-items:center;gap:8px"><span class="ro-pill">' + icon("lock") + '只读</span><span class="ro-switch ' + (r.on ? "" : "off") + '" aria-hidden="true"></span></div></div>';
      }).join("");
    }
    var sources = document.getElementById("settings-sources");
    if (sources) {
      sources.innerHTML = st.sources.map(function (s) {
        var chip = s.status === "正常" || s.status === "已配置" ? '<span class="chip green">' + s.status + "</span>" : '<span class="chip amber">' + s.status + "</span>";
        return '<div class="setting-row"><div><div class="label">' + s.label + '</div><div class="desc">' + s.value + "</div></div><div class=\"value\">" + chip + "<small>" + s.last + "</small></div></div>";
      }).join("");
    }
    var backup = document.getElementById("settings-backup");
    if (backup) {
      backup.innerHTML =
        '<div class="setting-row"><div><div class="label">最近备份</div><div class="desc">SQLite 快照，包含账本、快照、建议与审计</div></div><div class="value">' + st.backup.last + "<small>" + st.backup.size + " · " + st.backup.status + "</small></div></div>" +
        '<div class="setting-row"><div><div class="label">备份恢复</div><div class="desc">客户端只读，恢复操作需在服务端执行</div></div><span class="disabled-entry">' + icon("lock") + "只读原型不可操作</span></div>";
    }
  }

  /* ---------------- 扩展 popup ---------------- */
  function renderPopup() {
    var root = document.getElementById("popup-root");
    if (!root) return;
    var a = M.groups.actual, ai = M.groups.ai, b = M.groups.bench;
    var sh = M.market.indices[0];
    var ad = M.advice;
    root.innerHTML =
      '<div class="browser-frame">' +
      '<div class="browser-top"><span class="traffic"></span><div class="browser-tab">投资助手 · 今日</div></div>' +
      '<div class="browser-toolbar">' +
      '<div class="browser-nav"><span>‹</span><span>›</span><span class="reload">⟳</span></div>' +
      '<div class="omnibox"><span class="lock-ico">' + icon("lock") + "</span>musi.local/today</div>" +
      '<div class="ext-wrap"><div class="ext-icon">M</div><span class="ext-badge">0.47%</span></div>' +
      "</div>" +
      '<div class="popup-panel">' +
      '<div class="popup-head"><div class="popup-brand"><div class="brand-mark">M</div><div><div class="brand-name">Musi 投资助手</div><div class="brand-sub">' + M.meta.asof + " · " + M.meta.timezone + '</div></div></div><span class="ro-chip">' + icon("lock") + "只读</span></div>" +
      '<div class="popup-data"><span class="dot live"></span>数据时间 <b>' + M.meta.asof.slice(11) + "</b>" + qBadge("estimate", "estimate") + "</div>" +
      '<div class="popup-market"><div><div class="popup-k">市场状态</div><div class="popup-market-state">' + M.market.state + '</div></div><div class="popup-market-idx"><div>上证 <b>' + num2(sh.value) + '</b></div><div class="' + cls(sh.pct) + '">' + signedPct(sh.pct) + ' · 创业板 ' + signedPct(M.market.indices[1].pct) + "</div></div></div>" +
      '<div class="popup-groups">' +
      [a, ai, b].map(function (g) {
        return '<div class="popup-group"><div class="pg-label"><span class="dot" style="background:' + g.color + '"></span>' + g.label + '</div><div class="pg-val ' + cls(g.dayPct) + '">' + signedPct(g.dayPct) + '</div><div class="pg-sub">' + signedYuan(g.dayPnl) + " 元</div></div>";
      }).join("") +
      "</div>" +
      '<div class="popup-advice"><div class="pa-head"><span class="chip green">executed</span><span class="pa-title">最新建议 · ' + ad.executedAt.slice(11) + "</span></div>" +
      '<div class="pa-text">' + ad.summary + "</div></div>" +
      '<a class="popup-cta" href="index.html">查看今日建议 ' + icon("arrow") + "</a>" +
      '<div class="popup-hint">' + icon("external") + "badge 与 omnibox 仅为示意；扩展 popup 只读。</div>" +
      '<div class="popup-risk">' + icon("warning") + "演示数据，不构成投资建议或收益承诺。</div>" +
      "</div></div>" +
      '<div class="popup-caption">Chrome 扩展 popup 示意 · badge 显示今日预估涨跌，omnibox 支持关键词唤起</div>' +
      "</div>";
  }

  var PAGES = {
    today: renderToday,
    portfolio: renderPortfolio,
    compare: renderCompare,
    history: renderHistory,
    settings: renderSettings,
    popup: renderPopup
  };

  function boot() {
    var page = document.body.getAttribute("data-page");
    if (page !== "popup") mountShell(page);
    if (PAGES[page]) PAGES[page]();
    if (page === "compare") {
      var timer = null;
      window.addEventListener("resize", function () {
        clearTimeout(timer);
        timer = setTimeout(renderCompare, 160);
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
