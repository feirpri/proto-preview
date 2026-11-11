/* Musi 投资助手 · 静态原型交互与渲染（无构建链，原生 JS）· v3 */
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
    file: '<path d="M6 3h8l4 4v14H6Z"/><path d="M14 3v4h4"/><path d="M9 12h6"/><path d="M9 16h6"/>',
    news: '<path d="M4 5h12v14H5a2 2 0 0 1-2-2Z"/><path d="M16 8h3a1 1 0 0 1 1 1v8a2 2 0 0 1-2 2H5"/><path d="M7 9h6"/><path d="M7 12.5h6"/><path d="M7 16h4"/>',
    bulb: '<path d="M9.5 18h5"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5.9 1.2.9 2h5.2c0-.8.3-1.5.9-2A6 6 0 0 0 12 3Z"/>',
    more: '<circle cx="5" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="19" cy="12" r="1.4"/>'
  };

  function icon(name, cls) {
    return '<svg class="' + (cls || "") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[name] || "") + "</svg>";
  }

  var NAV = [
    { key: "home", href: "index.html", label: "首页", icon: "home", desc: "大盘与基金估值" },
    { key: "advice", href: "advice.html", label: "建议", icon: "bulb", desc: "每日操作建议" },
    { key: "news", href: "news.html", label: "要闻", icon: "news", desc: "经济与民生要闻" },
    { key: "portfolio", href: "portfolio.html", label: "组合", icon: "pie", desc: "持仓与权重" },
    { key: "compare", href: "compare.html", label: "对比", icon: "chart", desc: "三组收益曲线" },
    { key: "history", href: "history.html", label: "历史", icon: "clock", desc: "建议与交易记录" },
    { key: "settings", href: "settings.html", label: "设置", icon: "sliders", desc: "只读参数展示" }
  ];
  var MOBILE_KEYS = ["home", "advice", "news", "portfolio"];
  var MORE_KEYS = ["compare", "history", "settings"];

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
  function signedNum(n, d) {
    var s = n > 0 ? "+" : n < 0 ? "−" : "";
    return s + Math.abs(n).toFixed(d == null ? 2 : d);
  }
  function cls(x) {
    return x > 0.00001 ? "up" : x < -0.00001 ? "down" : "flat";
  }
  function direction(x) {
    return x > 0.00001 ? "上涨" : x < -0.00001 ? "下跌" : "平盘";
  }
  function actionChip(action) {
    var map = { "加仓": "buy", "减仓": "sell", "保持": "hold" };
    return '<span class="chip ' + (map[action] || "plain") + '">' + action + "</span>";
  }
  function roChip(text) {
    return '<span class="ro-chip">' + icon("lock") + (text || "只读原型") + "</span>";
  }
  function nav4(n) {
    return n.toFixed(4);
  }

  /* ---------------- 模拟刷新时钟 ---------------- */
  var RT = { time: M.meta.realtime.calcTime, busy: false, ready: false };

  function secOf(t) {
    var p = t.split(":").map(Number);
    return p[0] * 3600 + p[1] * 60 + p[2];
  }
  function timeOf(sec) {
    sec = ((sec % 86400) + 86400) % 86400;
    var h = Math.floor(sec / 3600);
    var m = Math.floor((sec % 3600) / 60);
    var s = sec % 60;
    return [h, m, s].map(function (v) { return String(v).padStart(2, "0"); }).join(":");
  }
  function updateTime() {
    return RT.time;
  }
  function advanceTime() {
    RT.time = timeOf(secOf(RT.time) + M.meta.realtime.manualStepSec);
  }
  function staleDelayMin() {
    return Math.max(1, Math.round((secOf(RT.time) - secOf(M.meta.realtime.staleAsOf)) / 60));
  }

  function dataChip() {
    var t = document.body.getAttribute("data-page") === "home" ? updateTime() : M.meta.asof.slice(11);
    return '<span class="data-chip"><span class="dot live"></span>数据时间 <b data-update-time>' + t + "</b>" + qBadge(M.meta.quality, "estimate") + "</span>";
  }
  function miniBrand() {
    return '<div class="brand"><div class="brand-mark">M</div><div><div class="brand-name">Musi 投资助手</div><div class="brand-sub">只读原型 · ' + M.meta.version + "</div></div></div>";
  }

  function desktopNavHTML(active) {
    return NAV.map(function (n) {
      return '<a class="nav-item' + (n.key === active ? " active" : "") + '" href="' + n.href + '"' + (n.key === active ? ' aria-current="page"' : "") + ">" + icon(n.icon) + "<span>" + n.label + "</span></a>";
    }).join("");
  }

  function bottomNavHTML(active) {
    var items = MOBILE_KEYS.map(function (key) {
      var n = NAV.filter(function (x) { return x.key === key; })[0];
      return '<a class="' + (n.key === active ? "active" : "") + '" href="' + n.href + '"' + (n.key === active ? ' aria-current="page"' : "") + ">" + icon(n.icon) + "<span>" + n.label + "</span></a>";
    }).join("");
    var moreActive = MOBILE_KEYS.indexOf(active) < 0;
    return items +
      '<button class="bottom-more' + (moreActive ? " active" : "") + '" id="nav-more" type="button" aria-expanded="false" aria-controls="more-sheet">' + icon("more") + "<span>更多</span></button>";
  }

  function moreSheetHTML(active) {
    var current = NAV.filter(function (n) { return n.key === active; })[0];
    var rows = MORE_KEYS.map(function (key) {
      var n = NAV.filter(function (x) { return x.key === key; })[0];
      return '<a class="sheet-item' + (n.key === active ? " active" : "") + '" href="' + n.href + '"' + (n.key === active ? ' aria-current="page"' : "") + ">" +
        '<span class="sheet-ic">' + icon(n.icon) + "</span>" +
        '<span class="sheet-txt"><b>' + n.label + '</b><span>' + n.desc + "</span></span>" +
        icon("arrow", "sheet-arrow") + "</a>";
    }).join("");
    return '<div class="more-sheet" id="more-sheet" hidden>' +
      '<div class="sheet-backdrop" data-sheet-close></div>' +
      '<div class="sheet-panel" role="dialog" aria-modal="true" aria-labelledby="sheet-title">' +
      '<div class="sheet-head"><h2 id="sheet-title">更多页面</h2><button class="sheet-close" type="button" data-sheet-close aria-label="关闭更多菜单">×</button></div>' +
      '<nav class="sheet-nav" aria-label="更多页面">' + rows + "</nav>" +
      '<div class="sheet-hint">当前页：' + (current ? current.label : "首页") + " · 所有页面均可在 2 次点击内到达</div>" +
      "</div></div>";
  }

  function initMoreSheet() {
    var sheet = document.getElementById("more-sheet");
    var more = document.getElementById("nav-more");
    if (!sheet || !more) return;
    var closeTimer = null;
    function open() {
      clearTimeout(closeTimer);
      sheet.hidden = false;
      requestAnimationFrame(function () { sheet.classList.add("open"); });
      document.body.classList.add("sheet-open");
      more.setAttribute("aria-expanded", "true");
      var close = sheet.querySelector(".sheet-close");
      if (close) close.focus();
    }
    function close() {
      sheet.classList.remove("open");
      more.setAttribute("aria-expanded", "false");
      document.body.classList.remove("sheet-open");
      closeTimer = setTimeout(function () { sheet.hidden = true; }, 190);
      more.focus();
    }
    more.addEventListener("click", open);
    sheet.addEventListener("click", function (e) {
      if (e.target.closest("[data-sheet-close]")) close();
      if (e.target.closest(".sheet-item")) close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !sheet.hidden) close();
    });
  }

  function mountShell(active) {
    var side = document.getElementById("sidebar");
    if (side) {
      side.innerHTML =
        miniBrand() +
        '<nav class="side-nav" aria-label="主导航">' + desktopNavHTML(active) + "</nav>" +
        '<div class="side-foot">' +
        '<div class="side-data"><b>数据日期</b> ' + M.meta.asofDate + "<br>业务时区 " + M.meta.timezone + "<br><b>最近官方净值</b> " + M.meta.lastOfficial.slice(5) + "</div>" +
        '<div class="readonly-note">' + icon("lock") + "<span>客户端只读。除首页手动刷新外无写操作；下单、改仓位、写建议均需通过 MCP 写入口。</span></div>" +
        "</div>";
    }

    var top = document.getElementById("topbar");
    if (top) {
      var current = NAV.filter(function (n) { return n.key === active; })[0] || NAV[0];
      top.innerHTML =
        '<div class="topbar-left"><div class="topbar-brand"><div class="brand-mark">M</div></div><div><div class="topbar-title">' + current.label + '</div><div class="topbar-sub">' + M.meta.asofDate + " 周二 · " + M.meta.session + "</div></div></div>" +
        '<div class="topbar-right">' + dataChip() + roChip("只读") + "</div>";
    }

    var foot = document.getElementById("site-footer");
    if (foot) {
      foot.innerHTML =
        '<div class="quality-legend"><span class="lg-title">数据质量</span>' +
        qBadge("official") + qBadge("estimate") + qBadge("partial") + qBadge("stale") +
        '<span class="lg-title" style="margin-left:8px">三组颜色</span>' +
        '<span class="group-tag actual">实盘</span><span class="group-tag ai">AI 影子</span><span class="group-tag bench">沪深300 基准</span></div>' +
        '<div class="risk-note">' + icon("warning") + "<span>" + M.meta.disclaimer + " 数据日期 " + M.meta.asofDate + "（" + M.meta.timezone + "）。</span></div>";
    }

    var bottom = document.getElementById("bottom-nav");
    if (bottom) {
      bottom.innerHTML = bottomNavHTML(active);
      if (!document.getElementById("more-sheet")) {
        var wrap = document.createElement("div");
        wrap.innerHTML = moreSheetHTML(active);
        document.body.appendChild(wrap.firstChild);
      }
      initMoreSheet();
    }
  }

  /* ---------------- 首页：行情与估值 ---------------- */
  function homeHead() {
    var el = document.getElementById("home-head-side");
    if (!el) return;
    el.innerHTML =
      '<span class="data-chip live-chip"><span class="dot live"></span>本次更新 <b data-update-time>' + updateTime() + "</b></span>" +
      qBadge("estimate", "estimate 估算") +
      '<button class="refresh-btn" type="button" data-refresh aria-label="刷新基金估值"><span class="refresh-ico">' + icon("refresh") + '</span><span data-refresh-label>刷新估值</span></button>' +
      roChip("只读");
  }

  function indexCard(ix) {
    var c = cls(ix.pct);
    return (
      '<article class="index-card ' + c + '">' +
      '<div class="index-head"><span class="index-name">' + ix.name + '</span><span class="index-code">' + ix.code + "</span></div>" +
      '<div class="index-value tabular">' + num2(ix.value) + "</div>" +
      '<div class="index-change"><span class="index-pct tabular ' + c + '">' + signedPct(ix.pct) + '</span><span class="index-points tabular ' + c + '">' + signedNum(ix.change) + " 点</span></div>" +
      '<div class="index-foot"><span class="ud-dot ' + c + '"></span>' + direction(ix.pct) + " · 较昨收</div>" +
      "</article>"
    );
  }

  function renderHomeIndices() {
    var el = document.getElementById("index-grid");
    if (el) el.innerHTML = M.market.indices.map(indexCard).join("");
  }

  function fundMeta() {
    var el = document.getElementById("home-fund-meta");
    if (!el) return;
    el.innerHTML = '<span class="live-inline"><span class="dot live"></span>本次更新 <b data-update-time>' + updateTime() + "</b></span>" + qBadge("estimate", "estimate 估算");
  }

  function fundEstimateCard(f) {
    var stale = f.stale;
    var note = stale
      ? '<div class="stale-note">' + icon("warning") + "<span>stale · 最近可用 " + f.estTime + " · 延迟 " + staleDelayMin() + " 分钟（本次未取到新值），不冒充实时。</span></div>"
      : "";
    return (
      '<article class="card fund-card est-card' + (stale ? " is-stale" : "") + '">' +
      '<header class="fund-head">' +
      '<div class="fund-head-main">' +
      '<div class="fund-name">' + f.name + "</div>" +
      '<div class="fund-meta"><span class="fund-code">' + f.code + '</span><span class="fund-sep">·</span><span>目标权重 ' + pct(f.target, 0) + "</span></div>" +
      "</div>" +
      '<div class="fund-badges">' + groupTag("actual") + qBadge(f.estQuality, stale ? "stale" : "estimate") + "</div>" +
      "</header>" +

      '<section class="fund-zone" aria-label="基金实时估值">' +
      '<div class="estimate-grid">' +
      '<div class="est-cell"><span class="cell-label">估算净值</span><b class="cell-value tabular">' + nav4(f.estNav) + '</b><span class="cell-sub">' + (stale ? "最近可用值" : "盘中估算") + "</span></div>" +
      '<div class="est-cell"><span class="cell-label">估算涨跌幅</span><b class="cell-value tabular ' + cls(f.estPct) + '">' + signedPct(f.estPct) + '</b><span class="cell-sub">' + direction(f.estPct) + "</span></div>" +
      '<div class="est-cell is-wide"><span class="cell-label">今日预估收益</span><b class="cell-value tabular ' + cls(f.estPnl) + '">' + signedYuan(f.estPnl) + '<small>元</small></b><span class="cell-sub">按当前持仓估算，非官方净值</span></div>' +
      "</div>" +
      '<div class="live-meta">' +
      '<span class="calc-time' + (stale ? " warn" : "") + '">' + icon("clock") + (stale ? "最近可用 " + f.estTime : "本次更新 " + updateTime()) + "</span>" +
      '<span class="live-source">数据源 ' + f.estSource + "</span>" +
      "</div>" +
      note +
      '<div class="est-foot"><a class="text-link" href="advice.html#fund-' + f.code + '">查看该基金建议' + icon("arrow") + "</a></div>" +
      "</section>" +
      "</article>"
    );
  }

  function renderHomeFunds() {
    var grid = document.getElementById("fund-grid");
    if (grid) grid.innerHTML = M.groups.actual.funds.map(fundEstimateCard).join("");
  }

  function qualityCard() {
    var rt = M.meta.realtime;
    return (
      '<div class="card col-12 card-pad">' +
      '<div class="section-head" style="margin-bottom:10px"><div><h2 style="margin:0;font-size:15px">数据口径说明</h2><div class="hint">asof ' + M.meta.asofDate + " · " + M.meta.timezone + ' · 全部为演示数据</div></div>' + qBadge("estimate", "estimate 盘中估算") + "</div>" +
      '<div class="quality-legend" style="background:var(--surface-2)">' +
      qBadge("official", "official · 官方净值到齐") + qBadge("estimate", "estimate · 盘中估算") + qBadge("partial", "partial · 部分到齐") + qBadge("stale", "stale · 数据延迟") +
      "</div>" +
      '<div class="realtime-note">' + icon("refresh") +
      "<div><b>实时估值：进入页面自动刷新一次，也可点击「刷新估值」手动刷新。</b>本次更新 <b data-update-time>" + updateTime() + "</b>（模拟值）；数据源 " + rt.source + "。" + rt.demoNote +
      "<br><b>定期分析：</b>每日 14:30 生成逐基金建议，见「建议」页；建议只读，执行仅通过 MCP 写入口。" + rt.staleNote + "</div></div>" +
      '<div class="risk-note">' + icon("warning") + "<span>估值在晚间 21:30 后按官方净值修正，修正前请勿以估算数字对账。AI 影子组与沪深300 基准组均为模拟，不涉及真实资金。</span></div>" +
      "</div>"
    );
  }

  function setRefreshBusy(busy) {
    RT.busy = busy;
    document.body.classList.toggle("is-refreshing", busy);
    var btn = document.querySelector("[data-refresh]");
    if (btn) {
      btn.disabled = busy;
      btn.classList.toggle("is-busy", busy);
      btn.setAttribute("aria-busy", busy ? "true" : "false");
    }
    var label = document.querySelector("[data-refresh-label]");
    if (label) label.textContent = busy ? "刷新中…" : "刷新估值";
  }

  function applyUpdate() {
    var t = updateTime();
    Array.prototype.forEach.call(document.querySelectorAll("[data-update-time]"), function (el) {
      el.textContent = t;
    });
    renderHomeIndices();
    renderHomeFunds();
    setRefreshBusy(false);
  }

  function manualRefresh() {
    if (RT.busy) return;
    setRefreshBusy(true);
    setTimeout(function () {
      advanceTime();
      applyUpdate();
      var n = (Number(document.body.getAttribute("data-manual-refresh")) || 0) + 1;
      document.body.setAttribute("data-manual-refresh", String(n));
      var live = document.getElementById("refresh-status");
      if (live) live.textContent = "估值已更新，本次更新 " + updateTime();
    }, M.meta.realtime.manualDelayMs);
  }

  function renderHome() {
    RT.time = M.meta.realtime.calcTime;
    RT.ready = false;
    homeHead();
    renderHomeIndices();
    fundMeta();
    renderHomeFunds();
    var q = document.getElementById("home-quality");
    if (q) q.innerHTML = qualityCard();
    setRefreshBusy(true);
    setTimeout(function () {
      RT.ready = true;
      applyUpdate();
      document.body.setAttribute("data-auto-refreshed", "1");
      var live = document.getElementById("refresh-status");
      if (live) live.textContent = "已自动刷新，本次更新 " + updateTime();
    }, M.meta.realtime.autoDelayMs);
    document.addEventListener("click", function (e) {
      if (e.target.closest("[data-refresh]")) manualRefresh();
    });
  }

  /* ---------------- 建议 ---------------- */
  function adviceHead() {
    var el = document.getElementById("advice-head-side");
    if (!el) return;
    el.innerHTML = '<span class="data-chip"><span class="dot live"></span>建议日期 <b>' + M.advice.date + "</b></span>" + roChip("只读");
    var ro = document.getElementById("advice-ro");
    if (ro) ro.innerHTML = icon("lock") + "只读 · 无交易按钮";
  }

  function adviceSummary() {
    var ad = M.advice;
    var a = M.groups.actual;
    return (
      '<div class="card decision-summary">' +
      '<div class="decision-eyebrow">' + icon("spark") + ' 整体决策摘要 <span class="q neutral">14:30 定期分析</span></div>' +
      '<div class="decision-title">' + ad.state + "市 · 目标权益仓位 " + pct(a.targetEquity, 0) + ' <span class="decision-vs">/ 当前估算 ' + pct(a.equityRatio, 1) + "</span></div>" +
      '<p class="decision-text">' + ad.summary + "</p>" +
      '<div class="decision-chips">' +
      '<span class="chip plain">市场状态 ' + ad.state + "</span>" +
      '<span class="chip green">executed · ' + ad.statusLabel + " · " + ad.executedAt.slice(11) + " 已应用</span>" +
      '<span class="chip plain">5 条建议 · 2 减仓 · 3 保持</span>' +
      '<span class="chip plain">目标权益 ' + pct(a.targetEquity, 0) + "</span>" +
      '<span class="chip plain">审计保留</span>' +
      "</div>" +
      '<div class="decision-plan">' + ad.targetPlan + "</div>" +
      '<div class="decision-note">' + ad.auditNote + "</div>" +
      "</div>"
    );
  }

  function adviceCard(f) {
    var cur = M.groups.actual.funds.filter(function (x) { return x.code === f.code; })[0];
    var dataTime = cur.stale ? cur.estTime + "（stale）" : updateTime();
    var exec = '<span class="exec-state">' + icon("check") + "executed · " + f.executedAt + " 已应用</span>";
    return (
      '<article class="card advice-card" id="fund-' + f.code + '">' +
      '<header class="advice-card-head">' +
      '<div class="fund-head-main"><div class="fund-name">' + f.name + '</div><div class="fund-meta"><span class="fund-code">' + f.code + '</span><span class="fund-sep">·</span><span>目标权重 ' + pct(cur.target, 0) + "</span></div></div>" +
      '<div class="advice-card-tags">' + groupTag("actual") + actionChip(f.action) + "</div>" +
      "</header>" +
      '<div class="advice-detail-grid">' +
      '<div class="advice-cell"><span class="cell-label">操作</span><b class="advice-op">' + f.action + "</b></div>" +
      '<div class="advice-cell"><span class="cell-label">金额</span><b class="cell-value tabular">' + (f.amountWan > 0 ? f.amountWan.toFixed(1) + " 万" : "0 万") + "</b></div>" +
      '<div class="advice-cell"><span class="cell-label">执行状态</span>' + exec + "</div>" +
      "</div>" +
      '<p class="advice-reason">' + f.reason + "</p>" +
      '<div class="advice-compare">' + icon("trend") + "<span>当前估值 " + nav4(cur.estNav) + ' <b class="' + cls(cur.estPct) + '">' + signedPct(cur.estPct) + '</b> · 实际权重 ' + pct(cur.weight, 1) + " · 数据时间 " + dataTime + "</span></div>" +
      '<div class="advice-foot">' + icon("lock") + '<span>只读：执行仅通过 MCP 写入口。</span><a class="text-link" href="index.html">回首页看估值' + icon("arrow") + "</a></div>" +
      "</article>"
    );
  }

  function renderAdvice() {
    adviceHead();
    var sum = document.getElementById("advice-summary");
    if (sum) sum.innerHTML = adviceSummary();
    var list = document.getElementById("advice-list");
    if (list) list.innerHTML = M.advice.rows.map(adviceCard).join("");
    var foot = document.getElementById("advice-foot-note");
    if (foot) {
      foot.innerHTML =
        '<div class="card card-pad"><div class="realtime-note">' + icon("lock") +
        "<div><b>建议只读，执行仅通过 MCP 写入口；页面无下单/交易按钮，也无输入框。</b>" + M.advice.readonlyNote + " " + M.advice.auditNote +
        "<br>" + M.advice.riskNote + "</div></div></div>";
    }
  }

  /* ---------------- 要闻 ---------------- */
  function renderNews() {
    var news = M.news;
    var el = document.getElementById("news-head-side");
    if (el) {
      el.innerHTML = '<span class="demo-chip">' + icon("warning") + '演示数据 · 非真实新闻</span><span class="data-chip">截至 <b>' + news.updatedAt + "</b></span>" + roChip("只读");
    }
    var ro = document.getElementById("news-ro");
    if (ro) ro.innerHTML = icon("lock") + "静态展示 · 本期不刷新";
    var banner = document.getElementById("news-banner");
    if (banner) {
      banner.innerHTML = icon("news") +
        "<div><b>" + news.cadence + "；" + news.note + "</b>" +
        "<span>分类：政策 / 民生 / 国际 / 行业 · 按时间倒序 · 本期无刷新按钮、无搜索/筛选交互。</span>" +
        '<em>以下条目均为构造的演示文本，不代表当日真实资讯，也不构成投资建议。</em></div>';
    }
    var meta = document.getElementById("news-meta");
    if (meta) meta.textContent = "共 " + news.items.length + " 条 · 最近更新 " + news.updatedAt + " · 昨日/近期内容";
    var list = document.getElementById("news-list");
    if (list) {
      list.innerHTML = news.items.map(function (n) {
        return (
          '<article class="card news-item">' +
          '<div class="news-side"><span class="news-date">' + n.date.slice(5) + '</span><span class="news-time">' + n.time + '</span><span class="news-cat">' + n.category + "</span></div>" +
          '<div class="news-body">' +
          '<div class="news-top"><span class="news-impact ' + n.impactKey + '">' + n.impact + '</span><span class="news-scope">' + n.scope + "</span></div>" +
          '<h3 class="news-title">' + n.title + "</h3>" +
          '<p class="news-summary">' + n.summary + "</p>" +
          '<div class="news-source">来源：' + n.source + " · " + n.date + " " + n.time + "</div>" +
          "</div></article>"
        );
      }).join("");
    }
    var foot = document.getElementById("news-foot-note");
    if (foot) {
      foot.innerHTML =
        '<div class="card card-pad"><div class="realtime-note">' + icon("warning") +
        "<div><b>本期不提供刷新。</b>" + news.note + "生产环境将由每日 14:30 的 AI 任务写入最近一次结果，客户端只读展示。" +
        "<br>演示数据 · 非真实新闻：标题、摘要、影响判断与来源均为原型构造，请勿作为投资依据。</div></div></div>";
    }
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
      '<div class="card stat-card col-3 accent-blue"><div class="k">' + icon("file") + ' 最近 7 天建议</div><div class="v">5<small>条</small></div><div class="s">2 减仓 · 3 保持</div></div>' +
      '<div class="card stat-card col-3"><div class="k">' + icon("check") + ' 已执行</div><div class="v">4<small>条</small></div><div class="s">applied · 审计保留</div></div>' +
      '<div class="card stat-card col-3"><div class="k">' + icon("refresh") + ' 已回滚</div><div class="v">1<small>条</small></div><div class="s">reverted · 保留审计</div></div>' +
      '<div class="card stat-card col-3 accent-amber"><div class="k">' + icon("shield") + ' 最新官方修正</div><div class="v">5/5<small>到齐</small></div><div class="s">11-07 完整 · 11-06 4/5 partial</div></div>'
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
    var idx = M.market.indices;
    var sh = idx[0];
    var funds = M.groups.actual.funds;
    root.innerHTML =
      '<div class="browser-frame">' +
      '<div class="browser-top"><span class="traffic"></span><div class="browser-tab">投资助手 · 首页</div></div>' +
      '<div class="browser-toolbar">' +
      '<div class="browser-nav"><span>‹</span><span>›</span><span class="reload">⟳</span></div>' +
      '<div class="omnibox"><span class="lock-ico">' + icon("lock") + "</span>musi.local/home</div>" +
      '<div class="ext-wrap"><div class="ext-icon">M</div><span class="ext-badge">' + signedPct(sh.pct) + "</span></div>" +
      "</div>" +
      '<div class="popup-panel">' +
      '<div class="popup-head"><div class="popup-brand"><div class="brand-mark">M</div><div><div class="brand-name">Musi 投资助手</div><div class="brand-sub">' + M.meta.asof + " · " + M.meta.timezone + '</div></div></div><span class="ro-chip">' + icon("lock") + "只读</span></div>" +
      '<div class="popup-data"><span class="dot live"></span>本次更新 <b>' + M.meta.realtime.calcTime + "</b>" + qBadge("estimate", "estimate") + "</div>" +

      '<div class="popup-block"><div class="popup-block-head"><span>大盘指数</span><span class="popup-ud"><span class="ud-swatch up"></span>涨 <span class="ud-swatch down"></span>跌</span></div>' +
      '<div class="popup-index-grid">' +
      idx.map(function (ix) {
        return '<div class="popup-index"><div class="pi-name">' + ix.name + '</div><div class="pi-value tabular">' + num2(ix.value) + '</div><div class="pi-pct ' + cls(ix.pct) + '">' + signedPct(ix.pct) + "</div></div>";
      }).join("") +
      "</div></div>" +

      '<div class="popup-block"><div class="popup-block-head"><span>基金估值摘要</span><span class="popup-ud">净值 / 涨跌%</span></div>' +
      '<div class="popup-fund-list">' +
      funds.map(function (f) {
        return '<a class="popup-fund' + (f.stale ? " is-stale" : "") + '" href="index.html">' +
          '<span class="pf-name">' + f.short + '<small>' + f.code + "</small></span>" +
          '<span class="pf-nav tabular">' + nav4(f.estNav) + "</span>" +
          '<span class="pf-pct tabular ' + cls(f.estPct) + '">' + signedPct(f.estPct) + "</span>" +
          "</a>";
      }).join("") +
      "</div></div>" +

      '<div class="popup-cta-row">' +
      '<a class="popup-cta" href="index.html">打开首页 ' + icon("arrow") + "</a>" +
      '<a class="popup-cta secondary" href="advice.html">查看建议 ' + icon("arrow") + "</a>" +
      "</div>" +
      '<div class="popup-hint">' + icon("external") + "badge 显示上证涨跌幅、omnibox 支持关键词唤起，均为示意；popup 只读。" + "</div>" +
      '<div class="popup-risk">' + icon("warning") + "演示数据，不构成投资建议或收益承诺。</div>" +
      "</div></div>" +
      '<div class="popup-caption">Chrome 扩展 popup 示意 · 大盘点位 + 涨跌%、基金净值 + 涨跌%，入口指向首页/建议页</div>' +
      "</div>";
  }

  var PAGES = {
    home: renderHome,
    advice: renderAdvice,
    news: renderNews,
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
