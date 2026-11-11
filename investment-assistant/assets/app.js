/* Musi 投资助手 · 静态原型交互与渲染（无构建链，原生 JS）· v7 */
(function () {
  "use strict";

  var M = window.MOCK;
  if (!M) return;
  if (window.MusiGate && !window.MusiGate.isAuthorized()) return;

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
    chevron: '<path d="m9 18 6-6-6-6"/>',
    list: '<path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M3.5 6h.01"/><path d="M3.5 12h.01"/><path d="M3.5 18h.01"/>',
    file: '<path d="M6 3h8l4 4v14H6Z"/><path d="M14 3v4h4"/><path d="M9 12h6"/><path d="M9 16h6"/>',
    news: '<path d="M4 5h12v14H5a2 2 0 0 1-2-2Z"/><path d="M16 8h3a1 1 0 0 1 1 1v8a2 2 0 0 1-2 2H5"/><path d="M7 9h6"/><path d="M7 12.5h6"/><path d="M7 16h4"/>',
    bulb: '<path d="M9.5 18h5"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5.9 1.2.9 2h5.2c0-.8.3-1.5.9-2A6 6 0 0 0 12 3Z"/>',
    more: '<circle cx="5" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="19" cy="12" r="1.4"/>',
    expand: '<path d="M8 3H3v5"/><path d="M16 3h5v5"/><path d="M8 21H3v-5"/><path d="M16 21h5v-5"/>'
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
  function wan2(n) {
    return (n / 10000).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " 万";
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
  function money(n) {
    return "¥" + Math.abs(Math.round(n)).toLocaleString("en-US");
  }
  function signedMoney(n) {
    var s = n > 0 ? "+" : n < 0 ? "−" : "";
    return s + "¥" + Math.abs(Math.round(n)).toLocaleString("en-US");
  }
  function money2(n) {
    return "¥" + Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  function signedMoney2(n) {
    var s = n > 0 ? "+" : n < 0 ? "−" : "";
    return s + "¥" + Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  function signedYuan2(n) {
    var s = n > 0 ? "+" : n < 0 ? "−" : "";
    return s + Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  function signedPpUnit(x, d) {
    var s = x > 0 ? "+" : x < 0 ? "−" : "";
    return s + Math.abs(x * 100).toFixed(d == null ? 1 : d) + "pp";
  }
  function estPnlOf(f) {
    return f.amount * f.estPct;
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
  var openFund = null;

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
    if (document.body.getAttribute("data-page") === "home") {
      return '<span class="data-chip"><span class="dot live"></span>数据日期 <b>' + M.meta.asofDate + "</b>" + qBadge(M.meta.quality, "estimate") + "</span>";
    }
    return '<span class="data-chip"><span class="dot live"></span>数据时间 <b data-update-time>' + M.meta.asof.slice(11) + "</b>" + qBadge(M.meta.quality, "estimate") + "</span>";
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
        '<div class="readonly-note">' + icon("lock") + "<span>客户端除首页手动刷新与「演示写入（仅本地）」外只读；真实下单、账本写入仍通过 MCP 写入口。</span></div>" +
        "</div>";
    }

    var top = document.getElementById("topbar");
    if (top) {
      var current = NAV.filter(function (n) { return n.key === active; })[0] || NAV[0];
      top.innerHTML =
        '<div class="topbar-left"><div class="topbar-brand"><div class="brand-mark">M</div></div><div><div class="topbar-title">' + current.label + '</div><div class="topbar-sub">' + M.meta.asofDate + " 周二 · " + M.meta.session + "</div></div></div>" +
        '<div class="topbar-right">' + dataChip() + roChip("只读") +
        '<button class="logout-btn" type="button" data-logout aria-label="退出并清除本机 token">' + icon("lock") + "退出</button></div>";
    }

    var content = document.querySelector(".content");
    if (content && !content.querySelector(".demo-banner-row")) {
      content.insertAdjacentHTML("afterbegin",
        '<div class="demo-banner-row" role="note">' +
        '<span class="demo-ban write">' + icon("warning") + M.meta.writeDemo + "</span>" +
        '<span class="demo-ban gate">' + icon("lock") + "原型模拟门禁 · 真实 token 由服务端生成" + "</span>" +
        "</div>");
    }

    var foot = document.getElementById("site-footer");
    if (foot) {
      if (active === "home") {
        foot.innerHTML = "";
      } else {
        foot.innerHTML =
          '<div class="quality-legend"><span class="lg-title">数据质量</span>' +
          qBadge("official") + qBadge("estimate") + qBadge("partial") + qBadge("stale") +
          '<span class="lg-title" style="margin-left:8px">三组颜色</span>' +
          '<span class="group-tag actual">实盘</span><span class="group-tag ai">AI 影子</span><span class="group-tag bench">沪深300 基准</span></div>' +
          '<div class="risk-note">' + icon("warning") + "<span>" + M.meta.disclaimer + " 数据日期 " + M.meta.asofDate + "（" + M.meta.timezone + "）。</span></div>";
      }
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

  function peBar(ix) {
    var p = Math.round(ix.pePctile * 100);
    return (
      '<span class="pe-wrap" title="' + (ix.peWindow || "近 10 年") + '分位 ' + p + '%（演示值）">' +
      '<span class="pe-bar" aria-hidden="true"><i style="width:' + p + '%"></i></span>' +
      '<b class="tabular">' + p + "%</b></span>"
    );
  }

  function indexRow(ix) {
    var c = cls(ix.pct);
    return (
      '<tr class="index-row ' + c + '">' +
      '<th scope="row" class="index-name-cell"><span class="nm">' + ix.name + '</span><span class="cd">' + ix.code + "</span></th>" +
      '<td class="r index-value tabular" data-label="点位">' + num2(ix.value) +
      '<small class="index-points ' + c + '">' + signedNum(ix.change) + " 点</small></td>" +
      '<td class="r index-pct tabular ' + c + '" data-label="涨跌幅">' + signedPct(ix.pct) + "</td>" +
      '<td class="r index-pe tabular" data-label="PE-TTM">' + ix.pe.toFixed(2) + "</td>" +
      '<td class="r index-pctile-cell" data-label="PE 分位">' + peBar(ix) + "</td>" +
      '<td class="r index-state-cell"><span class="ud-dot ' + c + '"></span>' + direction(ix.pct) + "</td>" +
      "</tr>"
    );
  }

  function renderHomeIndices() {
    var el = document.getElementById("index-body");
    if (el) el.innerHTML = M.market.indices.map(indexRow).join("");
  }

  /* ---------------- v7：全站门禁 + 份额记账 + 历史重算 ---------------- */
  var TREND_DEFAULT = "1y";
  var TREND_KEYS = ["1w", "1m", "1y", "ytd", "3y", "5y"];
  var HOME_STORE = "musi.home.v7";
  var LEGACY_HOME_STORES = ["musi.home.v6", "musi.home.v5"];
  var chartPeriods = {};
  var savedState = null;
  var BASE_FUNDS = M.groups.actual.funds.map(function (f) { return Object.assign({}, f); });
  var BASE_CASH = M.groups.actual.cash;
  var BASE_POSITIONS = {};
  var TREND_TEMPLATES = {};
  BASE_FUNDS.forEach(function (f) {
    BASE_POSITIONS[f.code] = { amount: f.amount, target: f.target, costNav: f.costNav, shares: f.amount / f.nav };
    TREND_TEMPLATES[f.code] = f.trend;
  });

  function round6(n) { return Math.round(n * 1000000) / 1000000; }
  function round4(n) { return Math.round(n * 10000) / 10000; }
  function money2s(n) {
    if (!isFinite(n)) return "—";
    return (n < 0 ? "−" : "") + "¥" + Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  function fmtShares(n) {
    if (!isFinite(n)) return "—";
    return Number(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 6 });
  }
  function fmtSharesPlain(n) {
    return String(round6(n));
  }
  function nowLocalInput() {
    var d = new Date();
    function p(v) { return String(v).padStart(2, "0"); }
    return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate()) + "T" + p(d.getHours()) + ":" + p(d.getMinutes());
  }
  function fmtAt(at) {
    return String(at || "").replace("T", " ");
  }
  function eventKey(e) { return String(e.at || "") + "|" + String(e.seq == null ? 0 : e.seq).padStart(9, "0"); }
  function sortEvents(events) {
    return events.slice().sort(function (a, b) {
      var ka = eventKey(a), kb = eventKey(b);
      return ka < kb ? -1 : ka > kb ? 1 : 0;
    });
  }

  function readHomeState() {
    if (savedState) return savedState;
    var raw = null;
    try { raw = localStorage.getItem(HOME_STORE); } catch (e) { raw = null; }
    var st = null;
    try { st = raw ? JSON.parse(raw) : null; } catch (e) { st = null; }
    if (!st || typeof st !== "object") st = {};
    if (!Array.isArray(st.events)) st.events = [];
    if (typeof st.seq !== "number") st.seq = st.events.reduce(function (m, e) { return Math.max(m, Number(e.seq) || 0); }, 0);
    savedState = st;
    return savedState;
  }
  function writeHomeState() {
    var st = readHomeState();
    st.version = 7;
    st.open = openFund;
    st.periods = chartPeriods;
    st.scrollY = window.scrollY || 0;
    if (!Array.isArray(st.events)) st.events = [];
    try { localStorage.setItem(HOME_STORE, JSON.stringify(st)); } catch (e) { /* localStorage 不可用时忽略 */ }
  }
  function eventsOf() { return readHomeState().events; }
  function nextSeq() {
    var st = readHomeState();
    st.seq = (st.seq || 0) + 1;
    return st.seq;
  }
  function baseMetaOf(f) {
    return {
      code: f.code, name: f.name, short: f.short || f.name.slice(0, 4),
      shares: round6(f.amount / f.nav), nav: f.nav, costNav: f.costNav, target: f.target,
      quality: f.quality || "estimate", estQuality: f.estQuality || "estimate",
      stale: !!f.stale, estTime: f.estTime || M.meta.realtime.calcTime,
      estSource: f.estSource || "演示行情 · 估算", estPct: typeof f.estPct === "number" ? f.estPct : 0,
      action: f.action || "保持", amountWan: f.amountWan || 0,
      reason: f.reason || "自建持仓（演示数据）。", executed: !!f.executed, executedAt: f.executedAt || null
    };
  }
  function baseFundMap() {
    var map = {};
    BASE_FUNDS.forEach(function (f) { map[f.code] = baseMetaOf(f); });
    return map;
  }
  function newFundMeta(ev) {
    return {
      code: ev.code, name: ev.name || ev.code, short: (ev.name || ev.code).slice(0, 4),
      shares: round6(ev.shares || 0), nav: Number(ev.nav) || 1, costNav: Number(ev.costNav) || Number(ev.nav) || 1,
      target: typeof ev.target === "number" ? ev.target : 0,
      quality: "estimate", estQuality: "estimate", stale: false,
      estTime: M.meta.realtime.calcTime, estSource: "自建持仓 · 演示", estPct: 0,
      action: "保持", amountWan: 0, reason: "新增持仓（演示数据，可继续编辑或记账）。",
      executed: false, executedAt: null, userAdded: true
    };
  }
  function holdingsOf(map) {
    var sum = 0;
    Object.keys(map).forEach(function (k) { sum += map[k].shares * map[k].nav; });
    return sum;
  }
  function applyEventToState(map, box, ev) {
    var code = ev.code;
    var p = code ? map[code] : null;
    var amount;
    switch (ev.type) {
      case "add":
        if (p) { p.name = ev.name || p.name; p.shares = round6(ev.shares); p.nav = Number(ev.nav) || p.nav; p.costNav = Number(ev.costNav) || p.costNav; }
        else { map[code] = newFundMeta(ev); }
        box.order.push(code);
        amount = (Number(ev.shares) || 0) * (Number(ev.nav) || 0);
        box.cash -= amount;
        break;
      case "edit":
        if (!p) break;
        if (ev.name) { p.name = ev.name; p.short = ev.name.slice(0, 4); }
        if (typeof ev.shares === "number") p.shares = round6(ev.shares);
        if (typeof ev.nav === "number" && ev.nav > 0) p.nav = ev.nav;
        if (typeof ev.costNav === "number" && ev.costNav > 0) p.costNav = ev.costNav;
        if (typeof ev.target === "number") p.target = ev.target;
        break;
      case "delete":
        if (!p) break;
        delete map[code];
        box.order = box.order.filter(function (c) { return c !== code; });
        break;
      case "buy":
        if (!p) break;
        amount = Number(ev.shares) * Number(ev.nav);
        p.costNav = p.shares + Number(ev.shares) > 0
          ? round4((p.shares * p.costNav + amount) / (p.shares + Number(ev.shares)))
          : Number(ev.nav);
        p.shares = round6(p.shares + Number(ev.shares));
        if (Number(ev.nav) > 0) p.nav = Number(ev.nav);
        if (typeof ev.target === "number") p.target = ev.target;
        box.cash -= amount;
        break;
      case "sell":
        if (!p) break;
        amount = Number(ev.shares) * Number(ev.nav);
        p.shares = round6(Math.max(0, p.shares - Number(ev.shares)));
        if (Number(ev.nav) > 0) p.nav = Number(ev.nav);
        box.cash += amount;
        break;
      case "clear":
        if (!p) break;
        amount = p.shares * (Number(ev.nav) > 0 ? Number(ev.nav) : p.nav);
        p.shares = 0;
        if (Number(ev.nav) > 0) p.nav = Number(ev.nav);
        box.cash += amount;
        break;
      case "cash":
        box.cash = Number(ev.cash) || 0;
        break;
      case "total":
        box.cash = (Number(ev.total) || 0) - holdingsOf(map);
        break;
      default:
        break;
    }
  }
  function computeState(events) {
    var map = baseFundMap();
    var box = { cash: BASE_CASH, order: BASE_FUNDS.map(function (f) { return f.code; }) };
    sortEvents(events || []).forEach(function (ev) { applyEventToState(map, box, ev); });
    var funds = box.order.filter(function (c, i, arr) { return map[c] && arr.indexOf(c) === i; }).map(function (c) { return map[c]; });
    var holdings = holdingsOf(map);
    var cash = round2(box.cash);
    var total = round2(holdings + cash);
    funds.forEach(function (f) {
      f.amount = f.shares * f.nav;
      f.weight = total > 0 ? f.amount / total : 0;
      f.targetAmount = f.target * total;
      f.deviation = f.weight - f.target;
    });
    return { funds: funds, map: map, cash: cash, holdings: round2(holdings), total: total };
  }
  function ensureTrend(f) {
    if (!f.trend) {
      var tpl = TREND_TEMPLATES[f.code] || TREND_TEMPLATES["015790"] || (BASE_FUNDS[0] && BASE_FUNDS[0].trend);
      f.trend = tpl ? JSON.parse(JSON.stringify(tpl)) : null;
    }
    if (f.trend) f.trend.costNav = f.costNav;
  }
  function applyPortfolio(pf) {
    var g = M.groups.actual;
    g.cash = round2(pf.cash);
    g.holdings = round2(pf.holdings);
    g.total = pf.total;
    g.equityRatio = g.total > 0 ? g.holdings / g.total : 0;
    g.dayPnl = 0;
    pf.funds.forEach(function (f) {
      ensureTrend(f);
      f.estNav = f.nav;
      f.estPnl = f.amount * f.estPct;
      g.dayPnl += f.estPnl;
    });
    g.dayPct = g.total > 0 ? g.dayPnl / g.total : 0;
    g.funds = pf.funds;
  }
  function initPortfolio() {
    var st = readHomeState();
    applyPortfolio(computeState(st.events));
    if (st.periods) {
      Object.keys(st.periods).forEach(function (k) {
        if (TREND_KEYS.indexOf(st.periods[k]) >= 0) chartPeriods[k] = st.periods[k];
      });
    }
  }
  function resetAllPositions() {
    savedState = { version: 7, events: [], seq: 0, open: null, periods: {}, scrollY: 0 };
    try { localStorage.removeItem(HOME_STORE); } catch (e) { /* ignore */ }
    LEGACY_HOME_STORES.forEach(function (k) {
      try { localStorage.removeItem(k); } catch (e) { /* ignore */ }
      try { sessionStorage.removeItem(k); } catch (e) { /* ignore */ }
    });
    applyPortfolio(computeState([]));
  }
  function fundOfState(pf, code) {
    if (!pf) return null;
    return pf.map[code] || null;
  }
  function previewEvent(ev) {
    var st = readHomeState();
    var ins = Object.assign({}, ev);
    ins.seq = (st.seq || 0) + 1;
    var beforeEvents = st.events.filter(function (e) { return String(e.at) <= String(ev.at); });
    var future = st.events.filter(function (e) { return String(e.at) > String(ev.at); });
    var before = computeState(beforeEvents);
    var afterAt = computeState(beforeEvents.concat([ins]));
    var afterAll = computeState(st.events.concat([ins]));
    return { ev: ins, before: before, afterAt: afterAt, afterAll: afterAll, future: future };
  }
  function decimalsOf(n) {
    var s = String(n);
    if (s.indexOf("e") >= 0) return 0;
    var i = s.indexOf(".");
    return i < 0 ? 0 : s.length - i - 1;
  }
  function validateEvent(ev, pv) {
    var errs = [];
    var before = pv.before, after = pv.afterAt;
    var p = ev.code ? before.map[ev.code] : null;
    if (!isFinite(Number(ev.shares)) && (ev.type === "buy" || ev.type === "sell" || ev.type === "add")) errs.push("请输入有效的份额。");
    if (!isFinite(Number(ev.nav)) && (ev.type === "buy" || ev.type === "sell" || ev.type === "add" || ev.type === "edit" || ev.type === "clear")) errs.push("请输入有效的净值。");
    if ((ev.type === "buy" || ev.type === "sell" || ev.type === "clear") && !(Number(ev.nav) > 0)) errs.push("成交净值必须大于 0。");
    if ((ev.type === "buy" || ev.type === "sell" || ev.type === "add") && Number(ev.shares) < 0) errs.push("份额不能为负。");
    if ((ev.type === "buy" || ev.type === "sell" || ev.type === "add") && decimalsOf(ev.shares) > 6) errs.push("份额最多 6 位小数。");
    if (ev.amountText != null && decimalsOf(ev.amountText) > 2) errs.push("金额最多 2 位小数。");
    if (ev.type === "sell" || ev.type === "clear") {
      if (!p) errs.push("请选择要赎回/清仓的基金。");
      else if (ev.type === "sell" && Number(ev.shares) > p.shares + 0.0000005) errs.push("赎回份额不能超过当前持有 " + fmtShares(p.shares) + " 份。");
    }
    if (ev.type === "add") {
      if (!ev.code) errs.push("请输入基金代码。");
      if (before.map[ev.code]) errs.push("基金代码 " + ev.code + " 已存在，不能重复。");
      if (!ev.name) errs.push("请输入基金名称。");
      if (!(Number(ev.nav) > 0)) errs.push("净值必须大于 0。");
    }
    if (ev.type === "edit") {
      if (!p) errs.push("基金不存在，可能已被删除。");
      if (!(Number(ev.nav) > 0)) errs.push("净值必须大于 0。");
    }
    if (ev.type === "delete" && !p) errs.push("基金不存在，可能已被删除。");
    if (ev.type === "cash" && (!isFinite(Number(ev.cash)) || Number(ev.cash) < 0)) errs.push("现金不能为负。");
    if (ev.type === "total") {
      if (!isFinite(Number(ev.total)) || Number(ev.total) < 0) errs.push("总资产不能为负。");
      else if (Number(ev.total) < before.holdings - 0.005) errs.push("总资产不能低于当前持仓市值 " + money2(before.holdings) + "（现金不能为负）。");
    }
    if ((ev.type === "buy" || ev.type === "add") && after.cash < -0.005) errs.push("现金不足，操作后现金将为 " + money2(after.cash) + "。");
    if (ev.type === "sell" && after.cash < -0.005) errs.push("现金不能为负。");
    var weightSum = 0;
    after.funds.forEach(function (f) { weightSum += f.weight; });
    if (weightSum > 1.000001) errs.push("操作后总权重为 " + pct(weightSum, 1) + "，不能超过 100%。");
    if (after.total < 0) errs.push("总资产不能为负。");
    return errs;
  }
  function eventLabel(type) {
    return ({
      buy: "申购/加仓", sell: "赎回/减仓", clear: "清仓", cash: "现金调整",
      total: "总额校正", add: "新增基金", edit: "编辑基金", delete: "删除基金"
    })[type] || type;
  }
  function auditFromPreview(ev, pv) {
    var before = pv.before, after = pv.afterAt;
    var bf = ev.code ? before.map[ev.code] : null;
    var af = ev.code ? after.map[ev.code] : null;
    var bits = [];
    if (ev.code && (bf || af)) {
      bits.push("份额 " + fmtShares(bf ? bf.shares : 0) + " → " + fmtShares(af ? af.shares : 0));
      bits.push("市值 " + money2(bf ? bf.shares * bf.nav : 0) + " → " + money2(af ? af.shares * af.nav : 0));
    }
    if (ev.type === "cash" || ev.type === "total" || Math.abs(after.cash - before.cash) > 0.005) {
      bits.push("现金 " + money2s(before.cash) + " → " + money2s(after.cash));
    }
    bits.push("总额 " + money2s(before.total) + " → " + money2s(after.total));
    var name = ev.name || (af && af.name) || (bf && bf.name) || "组合";
    return {
      at: ev.at, time: fmtAt(ev.at), type: ev.type, label: eventLabel(ev.type),
      code: ev.code || "", name: name, source: "网页",
      text: bits.join(" · "),
      before: { shares: bf ? bf.shares : null, cash: before.cash, total: before.total, holdings: before.holdings },
      after: { shares: af ? af.shares : null, cash: after.cash, total: after.total, holdings: after.holdings },
      futureCount: pv.future.length
    };
  }
  function commitEvent(ev) {
    if (window.MusiGate && !window.MusiGate.isAuthorized()) return null;
    var pv = previewEvent(ev);
    var errs = validateEvent(pv.ev, pv);
    if (errs.length) return { error: errs[0], errors: errs, preview: pv };
    var st = readHomeState();
    st.events.push(pv.ev);
    st.seq = pv.ev.seq;
    savedState = st;
    writeHomeState();
    initPortfolio();
    return { entry: auditFromPreview(pv.ev, pv), preview: pv, ev: pv.ev };
  }
  function undoLastEvent() {
    var st = readHomeState();
    if (!st.events.length) return null;
    var removed = st.events.pop();
    st.seq = st.events.reduce(function (m, e) { return Math.max(m, Number(e.seq) || 0); }, 0);
    savedState = st;
    writeHomeState();
    initPortfolio();
    return removed;
  }

  function periodOf(code) {
    return chartPeriods[code] || TREND_DEFAULT;
  }
  function fundByCode(code) {
    return M.groups.actual.funds.filter(function (f) { return f.code === code; })[0];
  }
  function chartSize(zoom) {
    if (zoom) {
      var narrow = window.innerWidth <= 640;
      return narrow
        ? { W: 900, H: 520, fs: 12, pad: { l: 58, r: 82, t: 28, b: 38 }, ticks: 5 }
        : { W: 1200, H: 560, fs: 13, pad: { l: 70, r: 96, t: 32, b: 42 }, ticks: 6 };
    }
    var w = window.innerWidth;
    if (w <= 520) return { W: 360, H: 214, fs: 9.5, pad: { l: 34, r: 64, t: 20, b: 24 }, ticks: 4 };
    if (w <= 1100) return { W: 700, H: 232, fs: 10, pad: { l: 44, r: 66, t: 22, b: 26 }, ticks: 4 };
    return { W: 980, H: 268, fs: 10.5, pad: { l: 52, r: 68, t: 24, b: 28 }, ticks: 5 };
  }
  function shortDate(d, n) {
    return n > 320 ? d.slice(0, 7) : d.slice(5);
  }
  function xLabelIdx(n) {
    if (n <= 1) return [0];
    return [0, Math.round((n - 1) / 3), Math.round(((n - 1) * 2) / 3), n - 1]
      .filter(function (v, i, a) { return a.indexOf(v) === i; });
  }
  function crossList(vals, cost) {
    var out = [];
    for (var i = 0; i < vals.length - 1; i++) {
      var a = vals[i] - cost;
      var b = vals[i + 1] - cost;
      if ((a < 0 && b > 0) || (a > 0 && b < 0)) out.push({ idx: i + a / (a - b) });
    }
    return out;
  }
  function sampledIdx(n) {
    var step = Math.max(1, Math.ceil(n / 10));
    var out = [];
    for (var i = 0; i < n; i += step) out.push(i);
    if (out[out.length - 1] !== n - 1) out.push(n - 1);
    return out;
  }

  function trendChartSVG(f, key, zoom) {
    var p = f.trend.periods[key];
    if (!p || p.available === false) return "";
    var g = chartSize(zoom);
    var vals = p.values;
    var n = vals.length;
    var est = f.estNav;
    var cost = f.costNav;
    var sMin = Math.min.apply(null, vals);
    var sMax = Math.max.apply(null, vals);
    var lo = Math.min(sMin, est, cost);
    var hi = Math.max(sMax, est, cost);
    var padV = (hi - lo) * 0.14 || 0.02;
    var yMin = lo - padV;
    var yMax = hi + padV;
    function x(i) { return g.pad.l + (n <= 1 ? 0.5 : i / (n - 1)) * (g.W - g.pad.l - g.pad.r); }
    function y(v) { return g.pad.t + ((yMax - v) / (yMax - yMin)) * (g.H - g.pad.t - g.pad.b); }
    var grid = "";
    for (var t = 0; t < g.ticks; t++) {
      var vv = yMin + ((yMax - yMin) * t) / (g.ticks - 1);
      var yy = y(vv);
      grid += '<line x1="' + g.pad.l + '" y1="' + yy.toFixed(1) + '" x2="' + (g.W - g.pad.r) + '" y2="' + yy.toFixed(1) + '" stroke="#e9edf5" stroke-width="1"/>' +
        '<text x="' + (g.pad.l - 6) + '" y="' + (yy + 3.2).toFixed(1) + '" text-anchor="end" fill="#94a3b8" font-size="' + g.fs + '">' + vv.toFixed(3) + "</text>";
    }
    var pts = vals.map(function (v, i) { return { x: x(i), y: y(v) }; });
    var d = smoothPath(pts);
    var area = '<path d="' + d + " L" + pts[pts.length - 1].x.toFixed(2) + "," + (g.H - g.pad.b) + " L" + pts[0].x.toFixed(2) + "," + (g.H - g.pad.b) + ' Z" fill="rgba(37,99,235,0.09)"/>';
    var line = '<path d="' + d + '" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
    var crosses = crossList(vals, cost);
    var crossMarks = crosses.map(function (c) {
      var cxp = x(c.idx);
      var cyp = y(cost);
      return '<line x1="' + cxp.toFixed(1) + '" y1="' + g.pad.t + '" x2="' + cxp.toFixed(1) + '" y2="' + (g.H - g.pad.b) + '" stroke="#d97706" stroke-width="1" stroke-dasharray="2 4" opacity="0.35"/>' +
        '<circle cx="' + cxp.toFixed(1) + '" cy="' + cyp.toFixed(1) + '" r="3.1" fill="#fff" stroke="#d97706" stroke-width="2"/>';
    }).join("");
    function hLine(v, color, label) {
      var yy = y(v);
      return '<line x1="' + g.pad.l + '" y1="' + yy.toFixed(1) + '" x2="' + (g.W - g.pad.r) + '" y2="' + yy.toFixed(1) + '" stroke="' + color + '" stroke-width="1.5" stroke-dasharray="7 5"/>' +
        '<text x="' + (g.W - 6) + '" y="' + (yy - 5).toFixed(1) + '" text-anchor="end" fill="' + color + '" font-size="' + g.fs + '" font-weight="700">' + label + "</text>" +
        '<text x="' + (g.W - 6) + '" y="' + (yy + g.fs + 3).toFixed(1) + '" text-anchor="end" fill="' + color + '" font-size="' + g.fs + '">' + v.toFixed(4) + "</text>";
    }
    var last = pts[pts.length - 1];
    var lastDot = '<circle cx="' + last.x.toFixed(2) + '" cy="' + last.y.toFixed(2) + '" r="3.4" fill="#fff" stroke="#2563eb" stroke-width="2.2"/>';
    var xLabels = xLabelIdx(n).map(function (ii, k, arr) {
      var anchor = k === 0 ? "start" : k === arr.length - 1 ? "end" : "middle";
      return '<text x="' + x(ii).toFixed(1) + '" y="' + (g.H - 8) + '" text-anchor="' + anchor + '" fill="#94a3b8" font-size="' + g.fs + '">' + shortDate(p.dates[ii], n) + "</text>";
    }).join("");
    var aria = f.name + " " + p.label + "净值趋势（演示数据）：起点 " + vals[0].toFixed(4) + "，终点 " + vals[n - 1].toFixed(4) +
      "，区间最高 " + sMax.toFixed(4) + "，最低 " + sMin.toFixed(4) +
      "；今日估算 " + est.toFixed(4) + "，持仓成本 " + cost.toFixed(4) + "；历史交叉 " + crosses.length + " 处。";
    return '<svg class="trend-svg" viewBox="0 0 ' + g.W + " " + g.H + '" role="img" aria-label="' + aria + '">' +
      grid + area + line + crossMarks + hLine(est, "#2563eb", "今日估算") + hLine(cost, "#d97706", "持仓成本") +
      lastDot + xLabels + "</svg>";
  }

  function trendDataTable(f, key) {
    var p = f.trend.periods[key];
    var idxs = sampledIdx(p.n);
    var rows = idxs.map(function (i) {
      return "<tr><td>" + p.dates[i] + '</td><td class="r tabular">' + p.values[i].toFixed(4) + "</td></tr>";
    }).join("");
    var crosses = crossList(p.values, f.costNav).length;
    return '<details class="chart-data"><summary>' + icon("list") + "查看数据表（抽样 " + idxs.length + " 行）</summary>" +
      '<table><caption>' + f.name + " " + p.label + "净值（演示数据）</caption>" +
      '<thead><tr><th scope="col">日期</th><th scope="col" class="r">净值</th></tr></thead><tbody>' + rows + "</tbody></table>" +
      '<p class="chart-data-note">区间 ' + p.start + " → " + p.end + " · 共 " + p.n + " 个交易日 · 今日估算 " +
      f.estNav.toFixed(4) + " · 持仓成本 " + f.costNav.toFixed(4) + " · 历史交叉 " + crosses + " 处 · 演示数据</p></details>";
  }

  function trendLegend() {
    return '<div class="chart-legend">' +
      '<span><i class="lg-line"></i>历史净值</span>' +
      '<span><i class="lg-dash today"></i>今日估算</span>' +
      '<span><i class="lg-dash cost"></i>持仓成本</span>' +
      '<span><i class="lg-dot"></i>历史交叉</span></div>';
  }

  function trendBody(f, key) {
    var p = f.trend.periods[key];
    if (!p || p.available === false) {
      return '<div class="chart-empty" role="status">' + icon("warning") +
        "<div><b>" + (p ? p.label : "") + "暂无数据</b><span>" + (p ? p.note : "该周期暂不可用。") + "</span></div></div>";
    }
    return '<div class="chart-canvas">' + trendChartSVG(f, key) + "</div>" + trendLegend() + trendDataTable(f, key) +
      '<p class="chart-demo-note">' + icon("warning") + "<span>" + M.meta.trendDemo +
      "：本图为构造的净值序列；生产环境接口、更新频率与历史覆盖待数据调研结论。</span></p>";
  }

  function xOfMinute(min, g) {
    var plotW = g.W - g.pad.l - g.pad.r;
    if (min <= 690) return g.pad.l + ((min - 570) / 240) * (plotW * 0.5);
    return g.pad.l + plotW * 0.5 + ((min - 780) / 240) * (plotW * 0.5);
  }

  function intradaySVG(f, zoom) {
    var d = f.trend.intraday;
    var pts = d.points;
    var g = chartSize(zoom);
    var H = zoom ? g.H : (window.innerWidth <= 520 ? 192 : 228);
    var vals = pts.map(function (p) { return p.pct; });
    var lo = Math.min.apply(null, vals.concat([0]));
    var hi = Math.max.apply(null, vals.concat([0]));
    var padV = Math.max(0.0015, (hi - lo) * 0.18);
    var yMin = lo - padV;
    var yMax = hi + padV;
    function y(v) { return g.pad.t + ((yMax - v) / (yMax - yMin)) * (H - g.pad.t - g.pad.b); }
    var grid = "";
    for (var t = 0; t < 3; t++) {
      var vv = yMin + ((yMax - yMin) * t) / 2;
      var yy = y(vv);
      grid += '<line x1="' + g.pad.l + '" y1="' + yy.toFixed(1) + '" x2="' + (g.W - g.pad.r) + '" y2="' + yy.toFixed(1) + '" stroke="#e9edf5" stroke-width="1"/>' +
        '<text x="' + (g.pad.l - 6) + '" y="' + (yy + 3.2).toFixed(1) + '" text-anchor="end" fill="#94a3b8" font-size="' + g.fs + '">' + signedPct(vv, 2) + "</text>";
    }
    var xy = pts.map(function (p) { return { x: xOfMinute(p.min, g), y: y(p.pct) }; });
    var dPath = smoothPath(xy);
    var area = '<path d="' + dPath + " L" + xy[xy.length - 1].x.toFixed(2) + "," + (H - g.pad.b) + " L" + xy[0].x.toFixed(2) + "," + (H - g.pad.b) + ' Z" fill="rgba(37,99,235,0.10)"/>';
    var line = '<path d="' + dPath + '" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
    var lp = xy[xy.length - 1];
    var ly = y(d.lastPct);
    var anchor = lp.x > g.W * 0.72 ? "end" : "start";
    var dx = anchor === "end" ? -6 : 6;
    var lastLabel = '<circle cx="' + lp.x.toFixed(1) + '" cy="' + ly.toFixed(1) + '" r="3.4" fill="#fff" stroke="#2563eb" stroke-width="2.2"/>' +
      '<text x="' + (lp.x + dx).toFixed(1) + '" y="' + (ly - 8).toFixed(1) + '" text-anchor="' + anchor + '" fill="#1d4ed8" font-size="' + g.fs + '" font-weight="700">' +
      d.lastTime.slice(0, 5) + " · " + signedPct(d.lastPct) + "</text>";
    var yd = y(d.lastPct);
    var todayLine = '<line x1="' + g.pad.l + '" y1="' + yd.toFixed(1) + '" x2="' + (g.W - g.pad.r) + '" y2="' + yd.toFixed(1) + '" stroke="#2563eb" stroke-width="1.5" stroke-dasharray="7 5" opacity="0.75"/>' +
      '<text x="' + (g.pad.l + 4) + '" y="' + (yd - 6).toFixed(1) + '" fill="#2563eb" font-size="' + g.fs + '" font-weight="700">今日估算 ' + signedPct(d.lastPct) + "</text>";
    var xMarks = window.innerWidth <= 520 ? [570, 690, 780, 900] : [570, 630, 690, 780, 840, 900];
    var xLabels = xMarks.map(function (m, k, arr) {
      var anchor2 = k === 0 ? "start" : k === arr.length - 1 ? "end" : "middle";
      return '<text x="' + xOfMinute(m, g).toFixed(1) + '" y="' + (H - 8) + '" text-anchor="' + anchor2 + '" fill="#94a3b8" font-size="' + g.fs + '">' +
        timeOf(m * 60).slice(0, 5) + "</text>";
    }).join("");
    var aria = f.name + " 当日分时估算涨跌幅（演示数据）：09:30–11:30、13:00–15:00；最后一点 " + d.lastTime.slice(0, 5) + " " + signedPct(d.lastPct) + "。";
    return '<svg class="trend-svg" viewBox="0 0 ' + g.W + " " + H + '" role="img" aria-label="' + aria + '">' +
      grid + area + line + todayLine + lastLabel + xLabels + "</svg>";
  }

  /* ---------------- v6：图表放大（内联 SVG，无图表库） ---------------- */
  var zoomState = { open: false, trigger: null, frame: null, scale: 1, x: 0, y: 0, scrollY: 0, pointers: null, drag: null, pinch: null };
  var ZOOM_MIN = 1, ZOOM_MAX = 4;

  function zoomBtn(f, kind, label) {
    return '<button class="zoom-btn" type="button" data-zoom="' + kind + '" data-zoom-fund="' + f.code +
      '" aria-label="放大查看' + label + '（' + f.name + '）">' + icon("expand") + "<span>放大</span></button>";
  }
  function zoomPayload(f, kind) {
    if (kind === "intraday") {
      var d = f.trend.intraday;
      return {
        title: f.name + " · 当日分时（放大）",
        sub: "09:30–11:30 / 13:00–15:00 · 估算涨跌幅 · 演示数据",
        svg: intradaySVG(f, true),
        legend: '<span><i class="lg-line"></i>估算涨跌幅</span><span><i class="lg-dash today"></i>今日估算</span>',
        summary: "最后一点 " + d.lastTime.slice(0, 5) + " · " + signedPct(d.lastPct) +
          "；今日估算以主色虚线标示，估算值为演示数据，可能被官方净值修正。"
      };
    }
    var key = periodOf(f.code);
    var p = f.trend.periods[key];
    if (!p || p.available === false) return null;
    var crosses = crossList(p.values, f.costNav).length;
    return {
      title: f.name + " · " + p.label + "净值趋势（放大）",
      sub: "区间 " + p.start + " → " + p.end + " · 共 " + p.n + " 个交易日 · 演示数据",
      svg: trendChartSVG(f, key, true),
      legend: trendLegend(),
      summary: "起点 " + p.values[0].toFixed(4) + "，终点 " + p.values[p.n - 1].toFixed(4) +
        "；区间最高 " + Math.max.apply(null, p.values).toFixed(4) + "，最低 " + Math.min.apply(null, p.values).toFixed(4) +
        "；今日估算 " + f.estNav.toFixed(4) + "，持仓成本 " + f.costNav.toFixed(4) + "；历史交叉 " + crosses + " 处。"
    };
  }
  function ensureZoomModal() {
    var modal = document.getElementById("chart-modal");
    if (modal) return modal;
    modal = document.createElement("div");
    modal.id = "chart-modal";
    modal.className = "chart-modal";
    modal.hidden = true;
    modal.innerHTML =
      '<div class="zm-backdrop" data-zm-close></div>' +
      '<div class="zm-panel" role="dialog" aria-modal="true" aria-labelledby="zm-title" aria-describedby="zm-summary">' +
      '<div class="zm-head"><div><h3 id="zm-title"></h3><p class="zm-sub" data-zm-sub></p></div>' +
      '<button class="zm-icon-btn" type="button" data-zm-close aria-label="关闭放大图">×</button></div>' +
      '<div class="zm-tools">' +
      '<button class="zm-tool" type="button" data-zm-zoomout aria-label="缩小">−</button>' +
      '<button class="zm-tool" type="button" data-zm-zoomin aria-label="放大">+</button>' +
      '<button class="zm-tool wide" type="button" data-zm-reset>重置</button>' +
      '<span class="zm-scale tabular" data-zm-scale>100%</span>' +
      '<span class="zm-hint">滚轮 / 双指缩放 · 拖拽平移</span>' +
      "</div>" +
      '<div class="zm-stage" data-zm-stage tabindex="0" role="application" aria-label="可缩放的趋势图，滚轮或双指缩放，拖拽平移">' +
      '<div class="zm-inner" data-zm-inner></div></div>' +
      '<div class="zm-legend" data-zm-legend></div>' +
      '<p class="zm-summary" id="zm-summary" data-zm-summary></p>' +
      '<p class="zm-foot">' + icon("warning") + "<span>" + M.meta.trendDemo + "：放大视图与页面内为同一构造序列，仅用于确认交互；不引入图表库。</span></p>" +
      "</div>";
    document.body.appendChild(modal);
    modal.addEventListener("click", function (e) {
      if (e.target.closest("[data-zm-close]")) { closeZoom(); return; }
      if (e.target.closest("[data-zm-zoomin]")) { zoomBy(1.2); return; }
      if (e.target.closest("[data-zm-zoomout]")) { zoomBy(1 / 1.2); return; }
      if (e.target.closest("[data-zm-reset]")) { resetZoom(); return; }
    });
    var stage = modal.querySelector("[data-zm-stage]");
    zoomState.pointers = new Map();
    stage.addEventListener("wheel", function (e) {
      if (!zoomState.open) return;
      e.preventDefault();
      zoomBy(e.deltaY < 0 ? 1.15 : 1 / 1.15, e.clientX, e.clientY);
    }, { passive: false });
    stage.addEventListener("pointerdown", function (e) {
      if (!zoomState.open) return;
      e.preventDefault();
      stage.setPointerCapture(e.pointerId);
      zoomState.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (zoomState.pointers.size === 1) {
        zoomState.drag = { x: e.clientX, y: e.clientY };
        stage.classList.add("grabbing");
      } else if (zoomState.pointers.size === 2) {
        zoomState.drag = null;
        var p = Array.from(zoomState.pointers.values());
        zoomState.pinch = Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y);
      }
    });
    stage.addEventListener("pointermove", function (e) {
      if (!zoomState.open || !zoomState.pointers.has(e.pointerId)) return;
      zoomState.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      var pts = Array.from(zoomState.pointers.values());
      if (zoomState.pointers.size === 1 && zoomState.drag) {
        var dx = e.clientX - zoomState.drag.x;
        var dy = e.clientY - zoomState.drag.y;
        zoomState.drag = { x: e.clientX, y: e.clientY };
        panBy(dx, dy);
      } else if (zoomState.pointers.size === 2 && zoomState.pinch) {
        var dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
        var mid = { x: (pts[0].x + pts[1].x) / 2, y: (pts[0].y + pts[1].y) / 2 };
        if (dist > 0) zoomBy(dist / zoomState.pinch, mid.x, mid.y);
        zoomState.pinch = dist;
      }
    });
    function endPointer(e) {
      zoomState.pointers.delete(e.pointerId);
      if (zoomState.pointers.size < 2) zoomState.pinch = null;
      if (zoomState.pointers.size === 1) {
        var p = Array.from(zoomState.pointers.values())[0];
        zoomState.drag = { x: p.x, y: p.y };
      } else if (zoomState.pointers.size === 0) {
        zoomState.drag = null;
        stage.classList.remove("grabbing");
      }
    }
    stage.addEventListener("pointerup", endPointer);
    stage.addEventListener("pointercancel", endPointer);
    stage.addEventListener("pointerleave", function (e) {
      if (e.pointerType === "mouse" && e.buttons === 0) return;
    });
    return modal;
  }
  function applyZoom() {
    var modal = document.getElementById("chart-modal");
    if (!modal) return;
    var inner = modal.querySelector("[data-zm-inner]");
    var scaleEl = modal.querySelector("[data-zm-scale]");
    if (inner) inner.style.transform = "translate(" + zoomState.x.toFixed(1) + "px," + zoomState.y.toFixed(1) + "px) scale(" + zoomState.scale.toFixed(3) + ")";
    if (scaleEl) scaleEl.textContent = Math.round(zoomState.scale * 100) + "%";
  }
  function panBy(dx, dy) {
    zoomState.x += dx;
    zoomState.y += dy;
    applyZoom();
  }
  function zoomBy(factor, clientX, clientY) {
    var modal = document.getElementById("chart-modal");
    if (!modal) return;
    var stage = modal.querySelector("[data-zm-stage]");
    var rect = stage.getBoundingClientRect();
    var cx = (clientX == null ? rect.left + rect.width / 2 : clientX) - rect.left;
    var cy = (clientY == null ? rect.top + rect.height / 2 : clientY) - rect.top;
    var next = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, zoomState.scale * factor));
    var k = next / zoomState.scale;
    zoomState.x = cx - (cx - zoomState.x) * k;
    zoomState.y = cy - (cy - zoomState.y) * k;
    zoomState.scale = next;
    applyZoom();
  }
  function resetZoom() {
    zoomState.scale = 1;
    zoomState.x = 0;
    zoomState.y = 0;
    applyZoom();
  }
  function openZoom(f, kind, trigger) {
    var payload = zoomPayload(f, kind);
    if (!payload) return;
    var modal = ensureZoomModal();
    modal.querySelector("#zm-title").textContent = payload.title;
    modal.querySelector("[data-zm-sub]").textContent = payload.sub;
    modal.querySelector("[data-zm-inner]").innerHTML = payload.svg;
    modal.querySelector("[data-zm-legend]").innerHTML = payload.legend;
    modal.querySelector("[data-zm-summary]").textContent = payload.summary;
    zoomState.open = true;
    zoomState.trigger = trigger || null;
    zoomState.scrollY = window.scrollY || 0;
    resetZoom();
    modal.hidden = false;
    requestAnimationFrame(function () { modal.classList.add("open"); });
    document.body.classList.add("zoom-open");
    var stage = modal.querySelector("[data-zm-stage]");
    if (stage) stage.focus();
  }
  function closeZoom() {
    if (!zoomState.open) return;
    var modal = document.getElementById("chart-modal");
    zoomState.open = false;
    if (zoomState.pointers) zoomState.pointers.clear();
    zoomState.drag = null;
    zoomState.pinch = null;
    if (modal) {
      modal.classList.remove("open");
      setTimeout(function () { if (!zoomState.open) modal.hidden = true; }, 160);
    }
    document.body.classList.remove("zoom-open");
    var trigger = zoomState.trigger;
    zoomState.trigger = null;
    if (trigger && trigger.focus) {
      try { trigger.focus({ preventScroll: true }); } catch (e) { trigger.focus(); }
    }
    var y = zoomState.scrollY;
    if (typeof y === "number") window.scrollTo(0, y);
  }

  function intradayBlock(f) {
    var d = f.trend.intraday;
    return '<div class="chart-card">' +
      '<div class="chart-head"><div><h4>当日分时</h4><span class="chart-sub">09:30–11:30 / 13:00–15:00 · 估算涨跌幅</span></div>' +
      '<div class="chart-head-right"><span class="chart-last">最后一点 <b>' + d.lastTime.slice(0, 5) + '</b> · <b class="' + cls(d.lastPct) + '">' + signedPct(d.lastPct) + "</b></span>" + zoomBtn(f, "intraday", "当日分时") + "</div></div>" +
      '<div class="chart-canvas">' + intradaySVG(f) + "</div>" +
      '<div class="chart-legend"><span><i class="lg-line"></i>估算涨跌幅</span><span><i class="lg-dash today"></i>今日估算</span></div>' +
      '<p class="chart-demo-note">' + icon("warning") + "<span>" + M.meta.trendDemo +
      "；持仓成本线与历史交叉位置见下方多周期趋势。</span></p></div>";
  }

  function trendSeg(f) {
    var cur = periodOf(f.code);
    return '<div class="seg" role="tablist" aria-label="趋势周期（' + f.name + '）">' +
      TREND_KEYS.map(function (k) {
        var p = f.trend.periods[k];
        return '<button class="seg-btn' + (k === cur ? " active" : "") + '" type="button" role="tab" aria-selected="' + (k === cur) +
          '" data-period="' + k + '" data-period-fund="' + f.code + '">' + p.label + "</button>";
      }).join("") + "</div>";
  }

  function trendBlock(f) {
    return '<div class="chart-card">' +
      '<div class="chart-head"><div><h4>多周期趋势</h4><span class="chart-sub">净值曲线 · 今日估算与持仓成本为水平虚线</span></div>' +
      '<div class="chart-head-right">' + trendSeg(f) + zoomBtn(f, "period", "多周期趋势") + "</div></div>" +
      '<div class="chart-body" data-chart-body="' + f.code + '">' + trendBody(f, periodOf(f.code)) + "</div>" +
      "</div>";
  }

  function fundFact(label, value, clsName) {
    return '<div class="fund-fact"><span>' + label + '</span><b class="tabular ' + (clsName || "") + '">' + value + "</b></div>";
  }

  function fundFacts(f) {
    var dev = f.weight - f.target;
    return '<div class="fund-facts">' +
      fundFact("持有份额", fmtShares(f.shares)) +
      fundFact("当前净值", f.nav.toFixed(4)) +
      fundFact("当前持仓市值", wan(f.amount)) +
      fundFact("当前权重", pct(f.weight, 1)) +
      fundFact("组合目标权重", pct(f.target, 1)) +
      fundFact("当前偏离", signedPp(dev), Math.abs(dev) >= 0.02 ? "warn" : "") +
      fundFact("持仓成本净值", f.costNav.toFixed(4)) +
      "</div>";
  }

  /* ---------------- v7：调整后目标值（兼容 v6）与本地审计 ---------------- */
  function round2(n) { return Math.round(n * 100) / 100; }
  function nowClock() {
    var d = new Date();
    return [d.getHours(), d.getMinutes(), d.getSeconds()].map(function (v) {
      return String(v).padStart(2, "0");
    }).join(":");
  }
  function defaultTargetAmount(f) {
    if (f.action === "减仓" && f.amountWan > 0) return Math.max(0, f.amount - f.amountWan * 10000);
    return f.amount;
  }
  function adjustMetrics(f, targetAmount) {
    var total = M.groups.actual.total;
    targetAmount = round2(targetAmount);
    var targetWeight = total > 0 ? targetAmount / total : 0;
    return {
      targetAmount: targetAmount,
      targetWeight: targetWeight,
      delta: round2(targetAmount - f.amount),
      deviation: targetWeight - f.weight
    };
  }
  function validateAdjust(f, m) {
    var min = M.meta.writeMinAmount || 1000;
    if (!isFinite(m.targetWeight) || !isFinite(m.targetAmount)) return "请输入有效数字。";
    if (m.targetWeight < 0 || m.targetAmount < 0) return "目标权重与目标市值不能为负。";
    if (m.targetWeight > 1.0000001) return "目标权重不能超过 100%。";
    if (Math.abs(m.delta) > 0.5 && Math.abs(m.delta) < min) return "最小变动单位为 ¥" + min.toLocaleString("en-US") + "。";
    if (m.delta > M.groups.actual.cash + 0.5) return "超出可用现金 ¥" + Math.round(M.groups.actual.cash).toLocaleString("en-US") + "。";
    if (m.delta < 0 && -m.delta > f.amount + 0.5) return "减仓金额不能超过当前持仓市值 ¥" + Math.round(f.amount).toLocaleString("en-US") + "。";
    var sum = 0;
    M.groups.actual.funds.forEach(function (x) {
      sum += x.code === f.code ? m.targetWeight : x.weight;
    });
    if (sum > 1.0004) return "调整后基金总权重为 " + pct(sum, 1) + "，不能超过 100%。";
    return "";
  }
  function paTarget(label, value, key, clsName) {
    return '<div class="pa-target"><span>' + label + '</span><b class="tabular ' + (clsName || "") + '" data-pa-' + key + '>' + value + "</b></div>";
  }
  function paStatusText(f, m) {
    if (Math.abs(m.delta) < 0.5) return "保持（目标 = 当前）";
    return "待保存（演示）";
  }
  function positionAdjustBlock(f) {
    var tAmount = defaultTargetAmount(f);
    var m = adjustMetrics(f, tAmount);
    var err = validateAdjust(f, m);
    var entries = eventsOf().filter(function (a) { return a.code === f.code; }).slice(-3).reverse();
    var auditHTML = entries.length
      ? entries.map(function (a) {
        return '<li><span class="pa-audit-time">' + fmtAt(a.at) + '</span><span>' + eventLabel(a.type) + '</span><span class="pa-audit-src">来源 ' + (a.source || "网页") + "</span></li>";
      }).join("")
      : '<li class="pa-audit-empty">暂无本地调整记录。</li>';
    return '<div class="position-adjust" data-pa="' + f.code + '">' +
      '<div class="pa-head"><div class="pa-title"><b>目标权重调整</b><span class="pa-demo-chip">' + icon("warning") + M.meta.writeDemo + "</span></div>" +
      '<span class="pa-status tabular" data-pa-status tabindex="-1">' + paStatusText(f, m) + "</span></div>" +
      '<div class="pa-targets">' +
      paTarget("当前权重 → 目标权重", pct(f.weight, 1) + " → " + pct(m.targetWeight, 1), "weight") +
      paTarget("当前持仓市值 → 调整后目标市值", wan2(f.amount) + " → " + wan2(m.targetAmount), "amount") +
      paTarget("调整金额", signedMoney2(m.delta), "delta", Math.abs(m.delta) < 0.5 ? "" : cls(m.delta)) +
      paTarget("偏离（目标 − 当前）", signedPpUnit(m.deviation), "dev", Math.abs(m.deviation) >= 0.02 ? "warn" : "") +
      paTarget("执行状态", paStatusText(f, m), "exec") +
      "</div>" +
      '<form class="pa-form" data-pa-form="' + f.code + '" novalidate>' +
      '<div class="pa-fields">' +
      '<label class="pa-field"><span>目标权重</span><span class="pa-inputwrap"><input type="number" name="weight" inputmode="decimal" min="0" max="100" step="0.1" value="' + (m.targetWeight * 100).toFixed(2) + '" aria-label="目标权重百分比"><i>%</i></span></label>' +
      '<label class="pa-field"><span>调整金额</span><span class="pa-inputwrap"><input type="number" name="amount" inputmode="numeric" step="100" value="' + m.delta + '" aria-label="调整金额元"><i>元</i></span></label>' +
      '<button class="pa-save" type="submit">保存调整（演示）</button>' +
      "</div>" +
      '<p class="pa-error" data-pa-error role="alert"' + (err ? "" : " hidden") + ">" + err + "</p>" +
      "</form>" +
      '<p class="pa-note">计算口径：目标市值 = 目标权重 × 总资产 ¥' + M.groups.actual.total.toLocaleString("en-US") +
      "，按估算净值折算为份额（最多 6 位小数）；最小变动 ¥" + (M.meta.writeMinAmount || 1000).toLocaleString("en-US") +
      "，不超过可用现金 ¥" + M.groups.actual.cash.toLocaleString("en-US") + " 或当前持仓，全部基金合计权重 ≤100%。" +
      "保存后写入本地记账并重算后续，演示写入仅保存在本机 localStorage，不写入真实账本、不产生下单。</p>" +
      '<div class="pa-audit"><b>本地审计（最近 3 条）</b><ul>' + auditHTML + "</ul></div>" +
      "</div>";
  }

  function readAdjustForm(form) {
    var wEl = form.querySelector('[name="weight"]');
    var aEl = form.querySelector('[name="amount"]');
    return {
      weightEl: wEl, amountEl: aEl,
      weightPct: parseFloat(wEl.value),
      amountDelta: parseFloat(aEl.value)
    };
  }
  function metricsFromForm(f, changed) {
    var form = document.querySelector('[data-pa-form="' + f.code + '"]');
    if (!form) return null;
    var vals = readAdjustForm(form);
    var m;
    if (changed === "amount") {
      if (!isFinite(vals.amountDelta)) return { invalid: "请输入有效的调整金额。", vals: vals };
      m = adjustMetrics(f, f.amount + vals.amountDelta);
    } else {
      if (!isFinite(vals.weightPct)) return { invalid: "请输入有效的目标权重。", vals: vals };
      m = adjustMetrics(f, (vals.weightPct / 100) * M.groups.actual.total);
    }
    m.vals = vals;
    return m;
  }
  function syncAdjustPreview(f, changed) {
    var form = document.querySelector('[data-pa-form="' + f.code + '"]');
    if (!form) return null;
    var m = metricsFromForm(f, changed);
    var errEl = form.querySelector("[data-pa-error]");
    var saveBtn = form.querySelector(".pa-save");
    if (!m || m.invalid) {
      if (errEl) { errEl.textContent = (m && m.invalid) || ""; errEl.hidden = false; }
      if (saveBtn) saveBtn.disabled = true;
      return null;
    }
    var vals = m.vals;
    if (changed === "weight" && isFinite(vals.weightPct)) {
      vals.amountEl.value = String(Math.round(m.delta * 100) / 100);
    } else if (changed === "amount" && isFinite(vals.amountDelta)) {
      vals.weightEl.value = (m.targetWeight * 100).toFixed(2);
    }
    var err = validateAdjust(f, m);
    if (errEl) { errEl.textContent = err; errEl.hidden = !err; }
    if (saveBtn) saveBtn.disabled = !!err;
    var wrap = document.querySelector('[data-pa="' + f.code + '"]');
    if (wrap) {
      var w = wrap.querySelector("[data-pa-weight]");
      var a = wrap.querySelector("[data-pa-amount]");
      var d = wrap.querySelector("[data-pa-delta]");
      var dv = wrap.querySelector("[data-pa-dev]");
      var ex = wrap.querySelector("[data-pa-exec]");
      if (w) w.textContent = pct(f.weight, 1) + " → " + pct(m.targetWeight, 1);
      if (a) a.textContent = wan2(f.amount) + " → " + wan2(m.targetAmount);
      if (d) { d.textContent = signedMoney2(m.delta); d.className = "tabular " + cls(m.delta); }
      if (dv) { dv.textContent = signedPpUnit(m.deviation); dv.className = "tabular " + (Math.abs(m.deviation) >= 0.02 ? "warn" : ""); }
      if (ex) ex.textContent = paStatusText(f, m);
    }
    return m;
  }
  function updateFundRow(f) {
    var tr = document.querySelector('.fund-row[data-fund="' + f.code + '"]');
    if (!tr) return;
    var amount = tr.querySelector(".fund-amount-cell");
    var weight = tr.querySelector(".fund-weight-cell");
    var pnl = tr.querySelector(".fund-pnl-cell");
    var unit = tr.querySelector(".fund-unit-cell");
    var wm = tr.querySelector(".fund-weight-mobile");
    var tm = tr.querySelector(".fund-target-mobile");
    var pnlValue = estPnlOf(f);
    if (amount) amount.textContent = wan(f.amount);
    if (weight) weight.textContent = pct(f.weight, 1);
    if (unit) unit.innerHTML = '<b class="tabular">' + fmtShares(f.shares) + '</b> 份<small class="tabular">净值 ' + nav4(f.nav) + "</small>";
    if (pnl) {
      pnl.textContent = signedMoney(pnlValue);
      pnl.className = "r tabular fund-pnl-cell " + cls(pnlValue);
    }
    if (wm) wm.textContent = "权重 " + pct(f.weight, 1);
    if (tm) tm.textContent = "目标 " + pct(f.target, 1);
  }
  function rerenderAdviceRow(f) {
    var row = document.getElementById("advice-" + f.code);
    if (!row) return;
    row.innerHTML = '<td colspan="7">' + advicePanel(f) + "</td>";
    var status = row.querySelector("[data-pa-status]");
    if (status) status.focus();
  }
  function saveAdjust(f) {
    var m = syncAdjustPreview(f, "weight");
    if (!m) return;
    var err = validateAdjust(f, m);
    if (err) return;
    if (Math.abs(m.delta) < 0.5) {
      showWriteToast("调整金额为 0，未产生记账 · " + f.name, null);
      return;
    }
    var ev = {
      type: m.delta > 0 ? "buy" : "sell", code: f.code, at: nowLocalInput(),
      shares: round6(Math.abs(m.delta) / (f.estNav || f.nav)),
      nav: f.estNav || f.nav, amountText: String(Math.abs(m.delta).toFixed(2)),
      target: m.targetWeight, source: "网页", note: "目标权重调整"
    };
    var res = commitEvent(ev);
    if (!res || res.error) {
      showWriteToast((res && res.error) || "保存失败，请检查输入。", null);
      return;
    }
    renderAllFundsKeepOpen();
    renderHomeAudit();
    showWriteToast("已保存演示调整 · " + f.name + " " + money(res.entry.before.total) + " → " + money(res.entry.after.total), res.entry);
  }
  function undoEntry(entry) {
    if (!entry) return;
    var removed = undoLastEvent();
    renderAllFundsKeepOpen();
    renderHomeAudit();
    showWriteToast("已撤销刚才的演示写入 · " + (entry.name || "组合"), null);
  }
  function auditRowHTML(a, isLast) {
    return '<li class="audit-row"><span class="audit-time">' + fmtAt(a.at) + '</span><span class="audit-type">' + eventLabel(a.type) + '</span>' +
      '<span class="audit-name">' + (a.name || a.code || "组合") + '</span>' +
      '<span class="audit-range tabular">' + (a.text || "") + "</span>" +
      '<span class="audit-src">来源 ' + (a.source || "网页") + "</span>" +
      (isLast ? '<button class="audit-undo" type="button" data-undo-last>撤销上一笔</button>' : "") + "</li>";
  }
  function renderHomeAudit() {
    var el = document.getElementById("home-audit-body");
    if (!el) return;
    var events = eventsOf().slice().reverse();
    var count = events.length;
    var rows = count
      ? events.map(function (a, i) { return auditRowHTML(a, i === 0); }).join("")
      : '<li class="audit-empty">暂无本地写入记录。演示写入保存在本机 localStorage，可随时恢复演示初始值。</li>';
    el.innerHTML = '<div class="audit-summary"><b>已记录 ' + count + ' 条本地写入</b><span>来源均为「网页」· 时间 / 类型 / 基金 / 前→后 · 仅保存在本机，不影响实盘</span>' +
      '<button class="audit-reset" type="button" data-write-reset>' + icon("refresh") + '恢复演示初始值</button></div>' +
      '<ul class="audit-list">' + rows + "</ul>";
  }
  function showWriteToast(msg, entry) {
    var host = document.getElementById("write-toast");
    if (!host) {
      host = document.createElement("div");
      host.id = "write-toast";
      host.className = "write-toast";
      host.setAttribute("role", "status");
      host.setAttribute("aria-live", "polite");
      document.body.appendChild(host);
    }
    host.innerHTML = '<span class="wt-text">' + msg + "</span>";
    if (entry) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "wt-undo";
      btn.textContent = "撤销";
      btn.addEventListener("click", function () {
        undoEntry(entry);
        host.classList.remove("show");
      });
      host.appendChild(btn);
    }
    host.classList.add("show");
    clearTimeout(showWriteToast._t);
    showWriteToast._t = setTimeout(function () { host.classList.remove("show"); }, 6000);
  }

  function advicePanel(f) {
    var exec = f.executed
      ? '<span class="exec-state">' + icon("check") + "executed · " + (f.executedAt || "14:31") + " 已应用</span>"
      : '<span class="exec-state pending">' + icon("clock") + "待执行（14:30 生成）</span>";
    return (
      '<div class="advice-panel">' +
      '<div class="advice-panel-grid">' +
      '<div class="advice-cell"><span class="cell-label">操作</span><span class="advice-op">' + actionChip(f.action) + "</span></div>" +
      '<div class="advice-cell"><span class="cell-label">金额</span><b class="cell-value tabular">' + (f.amountWan > 0 ? f.amountWan.toFixed(1) + " 万" : "0 万") + "</b></div>" +
      '<div class="advice-cell"><span class="cell-label">执行状态</span>' + exec + "</div>" +
      "</div>" +
      fundFacts(f) +
      positionAdjustBlock(f) +
      '<p class="advice-reason">' + f.reason + "</p>" +
      '<div class="advice-compare">' + icon("trend") + "<span>估算涨跌幅 <b class=\"" + cls(f.estPct) + "\">" + signedPct(f.estPct) +
      "</b> · 今日预估收益 <b class=\"" + cls(estPnlOf(f)) + "\">" + signedMoney(estPnlOf(f)) + "</b> · 数据 " +
      (f.stale ? f.estTime + "（stale）" : updateTime()) + "</span></div>" +
      '<div class="chart-stack">' + intradayBlock(f) + trendBlock(f) + "</div>" +
      '<div class="advice-panel-foot">' + icon("lock") + "<span>仓位调整仅演示写入本地；真实执行仍仅通过 MCP 写入口。</span>" +
      (M.advice.rows.some(function (r) { return r.code === f.code; })
        ? '<a class="text-link" href="advice.html#fund-' + f.code + '">完整明细' + icon("arrow") + "</a>"
        : '<span class="text-link muted">该基金暂无每日建议</span>') + "</div>" +
      "</div>"
    );
  }

  function fundRow(f) {
    var stale = f.stale;
    var id = "advice-" + f.code;
    var staleLine = stale
      ? '<span class="stale-inline">' + icon("warning") + "最近可用 " + f.estTime + " · 延迟 <b data-stale-min>" + staleDelayMin() + "</b> 分钟</span>"
      : "";
    return (
      '<tr class="fund-row' + (stale ? " is-stale" : "") + '" data-fund="' + f.code + '">' +
      '<th scope="row" class="fund-name-cell">' +
      '<button class="fund-toggle" type="button" data-expand="' + f.code + '" aria-expanded="false" aria-controls="' + id + '">' +
      icon("chevron", "fund-chevron") +
      '<span class="fund-title">' +
      '<span class="fund-name">' + f.name + "</span>" +
      '<span class="fund-sub"><span class="fund-code">' + f.code + '</span><span class="fund-sep">·</span>' + groupTag("actual") +
      '<span class="fund-weight-mobile">权重 ' + pct(f.weight, 1) + '</span>' +
      '<span class="fund-target-mobile">目标 ' + pct(f.target, 1) + '</span>' +
      '<span class="fund-quality-mobile">' + qBadge(f.estQuality, stale ? "stale" : "estimate") + "</span>" +
      '<span class="fund-quality-desktop">' + qBadge(f.estQuality, stale ? "stale" : "estimate") + "</span></span>" +
      "</span>" +
      "</button>" +
      staleLine +
      "</th>" +
      '<td class="r tabular fund-unit-cell" data-label="份额 / 净值"><b class="tabular">' + fmtShares(f.shares) + '</b> 份<small class="tabular">净值 ' + nav4(f.nav) + "</small></td>" +
      '<td class="r tabular fund-amount-cell" data-label="当前持仓市值">' + wan(f.amount) + "</td>" +
      '<td class="r tabular fund-weight-cell" data-label="当前权重">' + pct(f.weight, 1) + "</td>" +
      '<td class="r tabular fund-pct-cell ' + cls(f.estPct) + '" data-label="估算涨跌幅">' + signedPct(f.estPct) + "</td>" +
      '<td class="r tabular fund-pnl-cell ' + cls(estPnlOf(f)) + '" data-label="今日预估收益">' + signedMoney(estPnlOf(f)) + "</td>" +
      '<td class="r fund-actions-cell" data-label="操作"><div class="fund-actions">' +
      '<button class="fa-btn" type="button" data-edit="' + f.code + '" aria-label="编辑 ' + f.name + '">编辑</button>' +
      '<button class="fa-btn danger" type="button" data-delete="' + f.code + '" aria-label="删除 ' + f.name + '">删除</button>' +
      "</div></td>" +
      "</tr>" +
      '<tr class="fund-advice-row" id="' + id + '" hidden>' +
      '<td colspan="7">' + advicePanel(f) + "</td>" +
      "</tr>"
    );
  }

  function renderPortfolioToolbar() {
    var el = document.getElementById("pf-toolbar");
    if (!el) return;
    var g = M.groups.actual;
    var weight = g.total > 0 ? g.holdings / g.total : 0;
    el.innerHTML =
      '<div class="pf-stats">' +
      '<div class="pf-stat"><span>持仓市值</span><b class="tabular">' + wan2(g.holdings) + "</b></div>" +
      '<div class="pf-stat"><span>现金</span><b class="tabular">' + money2(g.cash) + "</b></div>" +
      '<div class="pf-stat"><span>总资产</span><b class="tabular">' + wan2(g.total) + "</b></div>" +
      '<div class="pf-stat"><span>总权重</span><b class="tabular">' + pct(weight, 1) + "</b></div>" +
      '<div class="pf-stat"><span>基金数</span><b class="tabular">' + g.funds.length + " 只</b></div>" +
      "</div>" +
      '<div class="pf-ops" role="group" aria-label="实盘记账操作">' +
      '<button class="pf-btn primary" type="button" data-op="buy">申购 / 加仓</button>' +
      '<button class="pf-btn" type="button" data-op="sell">赎回 / 减仓</button>' +
      '<button class="pf-btn" type="button" data-op="clear">清仓</button>' +
      '<button class="pf-btn" type="button" data-op="add">新增基金</button>' +
      '<button class="pf-btn" type="button" data-op="cash">现金调整</button>' +
      '<button class="pf-btn" type="button" data-op="total">总额校正</button>' +
      '<button class="pf-btn ghost" type="button" data-write-reset>恢复演示初始值</button>' +
      "</div>" +
      '<p class="pf-note">' + icon("warning") + "<span>" + M.meta.writeDemo + " · 按份额记账，金额 = 份额 × 净值；可选生效时间，历史时间会重算后续操作。原型模拟门禁，真实 token 由服务端生成。</span></p>";
  }

  function renderHomeFunds() {
    var body = document.getElementById("fund-body");
    if (body) body.innerHTML = M.groups.actual.funds.map(fundRow).join("");
    renderPortfolioToolbar();
    openFund = null;
    var saved = readHomeState();
    if (saved && saved.open && document.getElementById("advice-" + saved.open)) {
      setFundOpen(saved.open, true);
      refreshChart(saved.open);
      if (saved.scrollY > 0) {
        setTimeout(function () { window.scrollTo(0, saved.scrollY); }, 40);
      }
    }
  }
  function renderAllFundsKeepOpen() {
    var keep = openFund;
    var scroll = window.scrollY;
    var body = document.getElementById("fund-body");
    if (body) body.innerHTML = M.groups.actual.funds.map(fundRow).join("");
    renderPortfolioToolbar();
    openFund = null;
    if (keep && document.getElementById("advice-" + keep)) {
      setFundOpen(keep, true);
      refreshChart(keep);
      setTimeout(function () { window.scrollTo(0, scroll); }, 20);
    }
  }
  function rerenderAllFunds() {
    resetAllPositions();
    renderHomeFunds();
  }


  /* ---------------- v7：实盘记账确认弹层 ---------------- */
  var opCtx = { mode: null, entry: "shares", returnFocus: null };

  function opFundOptions(selected, includeZero) {
    return M.groups.actual.funds.filter(function (f) { return includeZero || f.shares > 0.0000005; }).map(function (f) {
      return '<option value="' + f.code + '"' + (f.code === selected ? " selected" : "") + ">" + f.name + "（" + f.code + "）· 持有 " + fmtShares(f.shares) + " 份</option>";
    }).join("");
  }
  function opField(label, inner, clsName) {
    return '<label class="op-field ' + (clsName || "") + '"><span>' + label + "</span>" + inner + "</label>";
  }
  function opModalHTML(mode, code) {
    var isTrade = mode === "buy" || mode === "sell";
    var isFund = isTrade || mode === "clear" || mode === "delete";
    var f = code ? fundByCode(code) : (M.groups.actual.funds[0] || null);
    var at = nowLocalInput();
    var title = ({
      buy: "申购 / 加仓", sell: "赎回 / 减仓", clear: "清仓", add: "新增基金",
      edit: "编辑基金", delete: "删除基金", cash: "现金调整", total: "总额校正"
    })[mode] || "实盘操作";
    var body = "";
    if (isFund) {
      body += '<div class="op-row">' +
        '<label class="op-field"><span>基金</span><select name="fund"' + (mode === "edit" || mode === "delete" ? " disabled" : "") + ">" +
        opFundOptions(code || (f && f.code), mode === "buy" || mode === "add") + "</select></label>" +
        "</div>";
    }
    if (isTrade) {
      body += '<fieldset class="op-entry"><legend>录入方式</legend>' +
        '<label><input type="radio" name="entry" value="shares" checked> 按份额</label>' +
        '<label><input type="radio" name="entry" value="amount"> 按金额（自动反算份额）</label>' +
        "</fieldset>" +
        '<div class="op-grid">' +
        opField("份额", '<span class="op-input"><input name="shares" type="number" inputmode="decimal" step="0.000001" min="0" value=""><i>份</i></span>') +
        opField("金额", '<span class="op-input"><input name="amount" type="number" inputmode="decimal" step="0.01" min="0" value=""><i>元</i></span>') +
        opField("成交净值", '<span class="op-input"><input name="nav" type="number" inputmode="decimal" step="0.0001" min="0" value="' + (f ? f.nav.toFixed(4) : "1.0000") + '"></span>') +
        opField("生效时间", '<input name="at" type="datetime-local" step="60" value="' + at + '">') +
        "</div>";
    } else if (mode === "clear") {
      body += '<div class="op-grid">' +
        opField("成交净值", '<span class="op-input"><input name="nav" type="number" inputmode="decimal" step="0.0001" min="0" value="' + (f ? f.nav.toFixed(4) : "1.0000") + '"></span>') +
        opField("生效时间", '<input name="at" type="datetime-local" step="60" value="' + at + '">') +
        "</div>";
    } else if (mode === "cash" || mode === "total") {
      var val = mode === "cash" ? M.groups.actual.cash : M.groups.actual.total;
      body += '<div class="op-grid">' +
        opField(mode === "cash" ? "现金（元）" : "总资产（元）", '<span class="op-input"><input name="value" type="number" inputmode="decimal" step="0.01" min="0" value="' + round2(val) + '"><i>元</i></span>') +
        opField("生效时间", '<input name="at" type="datetime-local" step="60" value="' + at + '">') +
        "</div>" +
        '<p class="op-hint">' + (mode === "cash" ? "现金调整只改现金，总资产 = 持仓市值 + 现金。" : "总额校正会反推现金 = 总资产 − 持仓市值，现金不能为负。") + "</p>";
    } else if (mode === "add" || mode === "edit") {
      body += '<div class="op-grid">' +
        opField("基金代码", '<input name="code" type="text" inputmode="numeric" maxlength="12" value="' + (mode === "edit" && f ? f.code : "") + '"' + (mode === "edit" ? " readonly" : "") + ">") +
        opField("基金名称", '<input name="name" type="text" maxlength="40" value="' + (mode === "edit" && f ? f.name : "") + '">') +
        opField("份额", '<span class="op-input"><input name="shares" type="number" inputmode="decimal" step="0.000001" min="0" value="' + (mode === "edit" && f ? fmtSharesPlain(f.shares) : "0") + '"><i>份</i></span>') +
        opField("净值 / 现价", '<input name="nav" type="number" inputmode="decimal" step="0.0001" min="0" value="' + (mode === "edit" && f ? f.nav.toFixed(4) : "1.0000") + '">') +
        opField("持仓成本净值", '<input name="costNav" type="number" inputmode="decimal" step="0.0001" min="0" value="' + (mode === "edit" && f ? f.costNav.toFixed(4) : "1.0000") + '">') +
        opField("目标权重（%）", '<input name="target" type="number" inputmode="decimal" step="0.1" min="0" max="100" value="' + (mode === "edit" && f ? (f.target * 100).toFixed(1) : "0") + '">') +
        opField("生效时间", '<input name="at" type="datetime-local" step="60" value="' + at + '">') +
        "</div>" +
        '<p class="op-hint">' + (mode === "add" ? "新增持仓按「份额 × 净值」从现金扣减；仅新增代码与名称时可将份额填 0。" : "编辑为数据校正：现金不变，持仓市值与总资产随份额/净值变化。基金代码不可修改。") + "</p>";
    } else if (mode === "delete") {
      body += '<p class="op-hint warning">删除为数据校正：不产生卖出回款，现金不变，总资产减少该基金市值。若要卖出请使用「清仓」。</p>' +
        '<div class="op-grid">' + opField("生效时间", '<input name="at" type="datetime-local" step="60" value="' + at + '">') + "</div>";
    }
    return '<div class="op-card" role="dialog" aria-modal="true" aria-labelledby="op-title">' +
      '<div class="op-head"><div><h2 id="op-title">' + title + '</h2><p>确认前会展示受影响行的「前 → 后」对照；保存后仅写入本机 localStorage。</p></div>' +
      '<button class="op-close" type="button" data-op-cancel aria-label="关闭">×</button></div>' +
      '<form class="op-form" data-op-form novalidate>' + body +
      '<div class="op-preview" data-op-preview aria-live="polite"></div>' +
      '<p class="op-error" data-op-error role="alert" hidden></p>' +
      '<div class="op-actions"><button type="button" class="op-btn" data-op-cancel>取消</button>' +
      '<button type="submit" class="op-btn primary" data-op-save>确认写入（演示）</button></div>' +
      "</form>" +
      '<p class="op-foot">' + M.meta.writeDemo + " · 原型模拟门禁，真实 token 由服务端生成。</p>" +
      "</div>";
  }

  function ensureOpModal() {
    var host = document.getElementById("op-modal");
    if (!host) {
      host = document.createElement("div");
      host.id = "op-modal";
      host.className = "op-overlay";
      host.hidden = true;
      document.body.appendChild(host);
    }
    return host;
  }
  function openOpModal(mode, code) {
    opCtx.mode = mode;
    opCtx.entry = "shares";
    opCtx.returnFocus = document.activeElement;
    var host = ensureOpModal();
    host.innerHTML = opModalHTML(mode, code);
    host.hidden = false;
    host.classList.add("open");
    document.body.classList.add("op-open");
    host.onclick = function (e) { if (e.target === host) closeOpModal(); };
    var form = host.querySelector("[data-op-form]");
    form.addEventListener("input", onOpInput);
    form.addEventListener("change", onOpInput);
    form.addEventListener("submit", onOpSubmit);
    host.querySelectorAll("[data-op-cancel]").forEach(function (b) {
      b.addEventListener("click", closeOpModal);
    });
    syncOpFields();
    renderOpPreview();
    var first = form.querySelector("input:not([readonly]), select:not([disabled])");
    if (first) setTimeout(function () { try { first.focus(); } catch (e) { /* ignore */ } }, 30);
  }
  function closeOpModal() {
    var host = document.getElementById("op-modal");
    if (!host) return;
    host.hidden = true;
    host.classList.remove("open");
    host.innerHTML = "";
    document.body.classList.remove("op-open");
    if (opCtx.returnFocus && opCtx.returnFocus.focus) {
      try { opCtx.returnFocus.focus(); } catch (e) { /* ignore */ }
    }
  }
  function opForm() { return document.querySelector("[data-op-form]"); }
  function opVal(name) {
    var form = opForm();
    if (!form) return "";
    var el = form.querySelector('[name="' + name + '"]');
    return el ? el.value : "";
  }
  function onOpInput(e) {
    var name = e.target && e.target.name;
    if (name === "entry") opCtx.entry = e.target.value;
    if (name === "fund" && (opCtx.mode === "buy" || opCtx.mode === "sell" || opCtx.mode === "clear")) {
      var nf = fundByCode(e.target.value);
      var navEl = opForm() && opForm().querySelector('[name="nav"]');
      if (nf && navEl) navEl.value = nf.nav.toFixed(4);
    }
    if (opCtx.mode === "buy" || opCtx.mode === "sell") {
      if (name === "shares") opCtx.entry = "shares";
      if (name === "amount") opCtx.entry = "amount";
      syncOpFields(name);
    }
    renderOpPreview();
  }
  function syncOpFields(changed) {
    var form = opForm();
    if (!form) return;
    if (opCtx.mode !== "buy" && opCtx.mode !== "sell") return;
    var sharesEl = form.querySelector('[name="shares"]');
    var amountEl = form.querySelector('[name="amount"]');
    var navEl = form.querySelector('[name="nav"]');
    var nav = parseFloat(navEl && navEl.value);
    if (!isFinite(nav) || nav <= 0) return;
    if (opCtx.entry === "amount") {
      var amount = parseFloat(amountEl.value);
      if (isFinite(amount)) sharesEl.value = (round6(amount / nav)).toFixed(6);
    } else {
      var shares = parseFloat(sharesEl.value);
      if (isFinite(shares)) amountEl.value = round2(shares * nav).toFixed(2);
    }
    var radios = form.querySelectorAll('[name="entry"]');
    Array.prototype.forEach.call(radios, function (r) { r.checked = r.value === opCtx.entry; });
  }
  function formToEvent() {
    var form = opForm();
    if (!form) return null;
    var at = opVal("at") || nowLocalInput();
    var mode = opCtx.mode;
    if (mode === "buy" || mode === "sell") {
      var code = opVal("fund");
      var nav = parseFloat(opVal("nav"));
      var shares, amountText;
      if (opCtx.entry === "amount") {
        var amountRaw = parseFloat(opVal("amount"));
        shares = isFinite(amountRaw) && nav > 0 ? round6(amountRaw / nav) : NaN;
        amountText = opVal("amount");
      } else {
        shares = parseFloat(opVal("shares"));
        amountText = isFinite(shares) && nav > 0 ? round2(shares * nav).toFixed(2) : "";
      }
      return { type: mode, code: code, shares: shares, nav: nav, at: at, source: "网页",
        amountText: amountText, note: mode === "buy" ? "申购/加仓" : "赎回/减仓" };
    }
    if (mode === "clear") return { type: "clear", code: opVal("fund"), nav: parseFloat(opVal("nav")), at: at, source: "网页", note: "清仓" };
    if (mode === "delete") return { type: "delete", code: opVal("fund"), at: at, source: "网页", note: "删除基金" };
    if (mode === "cash") return { type: "cash", cash: parseFloat(opVal("value")), at: at, source: "网页", note: "现金调整" };
    if (mode === "total") return { type: "total", total: parseFloat(opVal("value")), at: at, source: "网页", note: "总额校正" };
    if (mode === "add" || mode === "edit") {
      return {
        type: mode, code: opVal("code").trim(), name: opVal("name").trim(),
        shares: parseFloat(opVal("shares")), nav: parseFloat(opVal("nav")),
        costNav: parseFloat(opVal("costNav")), target: (parseFloat(opVal("target")) || 0) / 100,
        at: at, source: "网页", note: mode === "add" ? "新增基金" : "编辑基金"
      };
    }
    return null;
  }
  function diffCell(before, after, fmt) {
    var b = fmt(before), a = fmt(after);
    var c = before === after ? "" : after > before ? "up" : "down";
    return { b: b, a: a, cls: c, changed: before !== after };
  }
  function renderOpPreview() {
    var form = opForm();
    if (!form) return;
    var prev = form.querySelector("[data-op-preview]");
    var errEl = form.querySelector("[data-op-error]");
    var save = form.querySelector("[data-op-save]");
    var ev = formToEvent();
    if (!ev || !prev) return;
    var pv = previewEvent(ev);
    var errs = validateEvent(pv.ev, pv);
    var bf = ev.code ? pv.before.map[ev.code] : null;
    var af = ev.code ? pv.afterAt.map[ev.code] : null;
    var fundRows = "";
    var duplicateAdd = ev.type === "add" && !!pv.before.map[ev.code];
    if (ev.code && !duplicateAdd) {
      var rows = [
        ["基金份额", bf ? bf.shares : 0, af ? af.shares : 0, fmtShares],
        ["单位成本", bf ? bf.costNav : 0, af ? af.costNav : 0, function (v) { return Number(v).toFixed(4); }],
        ["持仓市值", bf ? bf.shares * bf.nav : 0, af ? af.shares * af.nav : 0, money2],
        ["权重", bf && pv.before.total > 0 ? bf.shares * bf.nav / pv.before.total : 0, af && pv.afterAt.total > 0 ? af.shares * af.nav / pv.afterAt.total : 0, function (v) { return pct(v, 2); }]
      ];
      fundRows = rows.map(function (r) {
        var d = diffCell(r[1], r[2], r[3]);
        return "<tr" + (d.changed ? ' class="changed"' : "") + "><th>" + r[0] + '</th><td class="tabular">' + d.b + '</td><td class="tabular ' + d.cls + '">' + d.a + "</td></tr>";
      }).join("");
    } else if (duplicateAdd) {
      fundRows = '<tr><th>基金代码</th><td class="tabular">' + ev.code + '</td><td class="tabular">已存在，不能重复</td></tr>';
    }
    var cashD = diffCell(pv.before.cash, pv.afterAt.cash, money2s);
    var totalD = diffCell(pv.before.total, pv.afterAt.total, money2s);
    var wD = diffCell(pv.before.total > 0 ? pv.before.holdings / pv.before.total : 0, pv.afterAt.total > 0 ? pv.afterAt.holdings / pv.afterAt.total : 0, function (v) { return pct(v, 2); });
    prev.innerHTML = '<div class="op-preview-head"><b>操作前 → 操作后</b><span>' + eventLabel(ev.type) + (af ? " · " + af.name : "") + " · 生效 " + fmtAt(ev.at) + "</span></div>" +
      '<div class="op-diff-wrap"><table class="op-diff"><caption class="sr-only">受影响行操作前与操作后对照</caption>' +
      '<thead><tr><th>项目</th><th>操作前</th><th>操作后</th></tr></thead><tbody>' + fundRows +
      '<tr' + (cashD.changed ? ' class="changed"' : "") + '><th>现金</th><td class="tabular">' + cashD.b + '</td><td class="tabular ' + cashD.cls + '">' + cashD.a + "</td></tr>" +
      '<tr' + (totalD.changed ? ' class="changed"' : "") + '><th>总资产</th><td class="tabular">' + totalD.b + '</td><td class="tabular ' + totalD.cls + '">' + totalD.a + "</td></tr>" +
      '<tr' + (wD.changed ? ' class="changed"' : "") + '><th>总权重</th><td class="tabular">' + wD.b + '</td><td class="tabular ' + wD.cls + '">' + wD.a + "</td></tr>" +
      "</tbody></table></div>" +
      (pv.future.length
        ? '<p class="op-recalc">' + icon("warning") + "<span>生效时间早于 " + pv.future.length + " 条历史操作，保存后将重算后续 " + pv.future.length + " 条；相关收益与图表会随之变化。</span></p>"
        : '<p class="op-ok">' + icon("check") + "<span>将写入本地审计，可撤销上一笔或恢复演示初始值。</span></p>") +
      '<p class="op-final">保存后当前组合：总资产 ' + money2s(pv.afterAll.total) + " · 现金 " + money2s(pv.afterAll.cash) + " · " + pv.afterAll.funds.length + " 只基金。</p>";
    if (errEl) {
      errEl.textContent = errs.join(" ");
      errEl.hidden = errs.length === 0;
    }
    if (save) save.disabled = errs.length > 0;
  }
  function onOpSubmit(e) {
    e.preventDefault();
    var ev = formToEvent();
    if (!ev) return;
    var res = commitEvent(ev);
    if (!res || res.error) {
      var errEl = document.querySelector("[data-op-error]");
      if (errEl) { errEl.textContent = (res && res.error) || "保存失败，请检查输入。"; errEl.hidden = false; }
      return;
    }
    closeOpModal();
    renderAllFundsKeepOpen();
    renderHomeAudit();
    showWriteToast("已保存演示写入 · " + eventLabel(ev.type) + " · " + (res.entry.name || "组合"), res.entry);
  }
  function setFundOpen(code, open) {
    var btn = document.querySelector('[data-expand="' + code + '"]');
    var row = document.getElementById("advice-" + code);
    if (!btn || !row) return;
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    row.hidden = !open;
    var tr = btn.closest("tr");
    if (tr) tr.classList.toggle("is-open", open);
    openFund = open ? code : null;
    writeHomeState();
  }

  function toggleFund(code) {
    var isOpen = openFund === code;
    if (openFund && openFund !== code) setFundOpen(openFund, false);
    setFundOpen(code, !isOpen);
  }

  function refreshChart(code) {
    var f = fundByCode(code);
    var wrap = document.querySelector('[data-chart-body="' + code + '"]');
    if (f && wrap) wrap.innerHTML = trendBody(f, periodOf(code));
    Array.prototype.forEach.call(document.querySelectorAll('[data-period-fund="' + code + '"]'), function (b) {
      var on = b.getAttribute("data-period") === periodOf(code);
      b.classList.toggle("active", on);
      b.setAttribute("aria-selected", on ? "true" : "false");
    });
  }

  function qualityCard() {
    var rt = M.meta.realtime;
    return (
      '<div class="card col-12 card-pad quality-card">' +
      '<div class="section-head" style="margin-bottom:10px"><div><h2 style="margin:0;font-size:15px">数据口径说明</h2><div class="hint">asof ' + M.meta.asofDate + " · " + M.meta.timezone + ' · 全部为演示数据</div></div>' + qBadge("estimate", "estimate 盘中估算") + "</div>" +
      '<div class="quality-legend" style="background:var(--surface-2)">' +
      qBadge("official", "official · 官方净值到齐") + qBadge("estimate", "estimate · 盘中估算") + qBadge("partial", "partial · 部分到齐") + qBadge("stale", "stale · 数据延迟") +
      "</div>" +
      '<div class="realtime-note">' + icon("database") +
      "<div><b>持仓口径：</b>首页以份额 × 净值的当前持仓市值与当前权重为主，展开区展示持有份额、单位成本、当前净值；今日预估收益按当前持仓计算，非官方净值；晚间 21:30 后按官方净值修正。" + rt.staleNote +
      "<br><b>估值与 PE：</b>指数 PE-TTM 与近 10 年历史分位数为构造的演示值，生产环境接口与授权待数据调研任务确认。" +
      "<br><b>趋势图：</b>当日分时与近一周/一月/一年/今年/三年/五年净值为演示序列，今日估算与持仓成本以虚线标示；生产可用性与历史覆盖待确认，不代表已接入稳定接口。" +
      "<br><b>刷新：</b>进入页面自动刷新一次，也可点击页头「刷新估值」手动刷新；刷新后保留展开行、图表周期与滚动位置。" + rt.demoNote + "数据源 " + rt.source + "。" +
      "<br><b>建议：</b>每日 14:30 生成逐基金建议，首页点击基金名称展开，完整明细见「建议」页；建议只读，真实执行仅通过 MCP 写入口。" +
      "<br><b>演示写入：</b>" + M.meta.writeDemo + "。持仓可新增/编辑/删除，支持按份额申购、赎回、清仓、加减仓、现金与总额校正；金额 = 份额 × 净值，可双向折算。每笔可选生效时间并展示操作前/后对照；历史时间会重算后续 N 条。输入校验非负、可用现金/份额、总权重 ≤100%、份额 ≤6 位小数、金额 2 位小数与基金代码不可重复。" + M.meta.writeNote +
      "</div></div>" +
      '<div class="risk-note">' + icon("warning") + "<span>估算可能被官方净值修正；AI 影子组与沪深300 基准组均为模拟，不涉及真实资金。" + M.meta.disclaimer + "</span></div>" +
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
    Array.prototype.forEach.call(document.querySelectorAll("[data-stale-min]"), function (el) {
      el.textContent = String(staleDelayMin());
    });
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
      if (live) live.textContent = "估值已更新";
    }, M.meta.realtime.manualDelayMs);
  }

  function renderHome() {
    RT.time = M.meta.realtime.calcTime;
    RT.ready = false;
    homeHead();
    renderHomeIndices();
    renderHomeFunds();
    renderHomeAudit();
    var q = document.getElementById("home-quality");
    if (q) q.innerHTML = qualityCard();
    setRefreshBusy(true);
    setTimeout(function () {
      RT.ready = true;
      applyUpdate();
      document.body.setAttribute("data-auto-refreshed", "1");
      var live = document.getElementById("refresh-status");
      if (live) live.textContent = "估值已自动刷新";
    }, M.meta.realtime.autoDelayMs);
    document.addEventListener("click", function (e) {
      if (e.target.closest("[data-refresh]")) {
        manualRefresh();
        return;
      }
      var zoomTrigger = e.target.closest("[data-zoom]");
      if (zoomTrigger) {
        var zf = fundByCode(zoomTrigger.getAttribute("data-zoom-fund"));
        if (zf) openZoom(zf, zoomTrigger.getAttribute("data-zoom"), zoomTrigger);
        return;
      }
      var opBtn = e.target.closest("[data-op]");
      if (opBtn) {
        openOpModal(opBtn.getAttribute("data-op"));
        return;
      }
      var editBtn = e.target.closest("[data-edit]");
      if (editBtn) {
        openOpModal("edit", editBtn.getAttribute("data-edit"));
        return;
      }
      var deleteBtn = e.target.closest("[data-delete]");
      if (deleteBtn) {
        openOpModal("delete", deleteBtn.getAttribute("data-delete"));
        return;
      }
      if (e.target.closest("[data-undo-last]")) {
        var removed = undoLastEvent();
        renderAllFundsKeepOpen();
        renderHomeAudit();
        showWriteToast(removed ? "已撤销上一笔演示写入 · " + eventLabel(removed.type) : "暂无可撤销的写入", null);
        return;
      }
      if (e.target.closest("[data-write-reset]")) {
        resetAllPositions();
        renderHomeFunds();
        renderHomeAudit();
        showWriteToast("已恢复全部演示初始值 · 本地写入记录已清空", null);
        return;
      }
      var seg = e.target.closest("[data-period]");
      if (seg) {
        var segCode = seg.getAttribute("data-period-fund");
        chartPeriods[segCode] = seg.getAttribute("data-period");
        refreshChart(segCode);
        writeHomeState();
        return;
      }
      var btn = e.target.closest("[data-expand]");
      if (btn) toggleFund(btn.getAttribute("data-expand"));
    });
    document.addEventListener("input", function (e) {
      var inp = e.target.closest(".pa-form input");
      if (!inp) return;
      var form = inp.closest(".pa-form");
      var f = fundByCode(form.getAttribute("data-pa-form"));
      if (f) syncAdjustPreview(f, inp.name);
    });
    document.addEventListener("submit", function (e) {
      var form = e.target.closest(".pa-form");
      if (!form) return;
      e.preventDefault();
      var f = fundByCode(form.getAttribute("data-pa-form"));
      if (f) saveAdjust(f);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && document.getElementById("op-modal") && !document.getElementById("op-modal").hidden) {
        e.preventDefault();
        closeOpModal();
        return;
      }
      if (e.key === "Escape" && zoomState.open) {
        e.preventDefault();
        closeZoom();
        return;
      }
      if (e.key === "Escape" && openFund) {
        var code = openFund;
        setFundOpen(code, false);
        var btn = document.querySelector('[data-expand="' + code + '"]');
        if (btn) btn.focus();
      }
    });
    var resizeTimer = null;
    window.addEventListener("resize", function () {
      if (!openFund) return;
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () { if (openFund) refreshChart(openFund); }, 160);
    });
    var scrollTimer = null;
    window.addEventListener("scroll", function () {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(writeHomeState, 200);
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
      '<div class="popup-head"><div class="popup-brand"><div class="brand-mark">M</div><div><div class="brand-name">Musi 投资助手</div><div class="brand-sub">' + M.meta.asof + " · " + M.meta.timezone + '</div></div></div><div class="popup-head-actions"><span class="ro-chip">' + icon("lock") + '只读</span><button class="popup-logout" type="button" data-logout>退出</button></div></div>' +
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
      '<div class="popup-risk">' + icon("warning") + "演示写入 · 仅保存在本地，不影响实盘；原型模拟门禁，真实 token 由服务端生成。演示数据不构成投资建议或收益承诺。</div>" +
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
    initPortfolio();
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
