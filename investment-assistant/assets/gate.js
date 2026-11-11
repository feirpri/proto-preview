/* Musi 投资助手 · 原型 v7 全站 Token 门禁（交互演示）
   注意：这是静态原型，门禁只是交互演示，不构成真实安全边界。
   真实 token 应由服务端生成并校验；此处使用固定演示 token。 */
(function () {
  "use strict";

  var TOKEN_KEY = "musi.gate.v7";
  var DEMO_TOKEN = "demo-2026";
  var STYLE_ID = "gate-style";

  function readToken() {
    try { return localStorage.getItem(TOKEN_KEY) || ""; } catch (e) { return ""; }
  }

  function isAuthorized() {
    return readToken() === DEMO_TOKEN;
  }

  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;
    var css =
      'html[data-auth="locked"] body > *:not(#gate-root){display:none !important}' +
      'html[data-auth="locked"] body{margin:0;background:#f4f6fb}' +
      '#gate-root{display:flex;align-items:center;justify-content:center;min-height:100vh;padding:24px 16px;' +
      'background:radial-gradient(900px 480px at 82% -8%,rgba(37,99,235,.10),transparent 62%),' +
      'radial-gradient(760px 420px at 8% 10%,rgba(124,58,237,.08),transparent 58%),#f4f6fb;' +
      'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif;color:#0f172a}' +
      '#gate-root .gate-card{width:100%;max-width:420px;background:#fff;border:1px solid #e5eaf2;border-radius:18px;' +
      'padding:28px 26px 22px;box-shadow:0 18px 50px rgba(15,23,42,.10)}' +
      '#gate-root .gate-brand{display:flex;align-items:center;gap:11px;margin-bottom:18px}' +
      '#gate-root .gate-mark{width:40px;height:40px;border-radius:12px;background:linear-gradient(145deg,#2563eb,#4f46e5 58%,#7c3aed);' +
      'color:#fff;display:grid;place-items:center;font-weight:800;font-size:18px}' +
      '#gate-root .gate-brand b{display:block;font-size:15px;letter-spacing:.2px}' +
      '#gate-root .gate-brand span{display:block;color:#64748b;font-size:11.5px;margin-top:1px}' +
      '#gate-root h1{margin:0 0 6px;font-size:21px;line-height:1.3}' +
      '#gate-root .gate-lede{margin:0 0 16px;color:#64748b;font-size:12.5px;line-height:1.6}' +
      '#gate-root label{display:block;font-size:12px;font-weight:650;color:#334155;margin-bottom:6px}' +
      '#gate-root input{width:100%;min-height:46px;padding:0 13px;border:1px solid #d6deea;border-radius:11px;' +
      'font-size:14px;font-family:inherit;background:#f8fafc;color:#0f172a}' +
      '#gate-root input:focus{outline:2px solid #2563eb;outline-offset:1px;background:#fff}' +
      '#gate-root .gate-actions{display:flex;gap:8px;margin-top:14px}' +
      '#gate-root button{min-height:44px;padding:0 18px;border-radius:11px;border:1px solid transparent;' +
      'background:#2563eb;color:#fff;font-weight:700;font-size:13.5px;font-family:inherit;cursor:pointer;flex:1}' +
      '#gate-root button:hover{background:#1d4ed8}' +
      '#gate-root button:focus-visible{outline:2px solid #0f172a;outline-offset:2px}' +
      '#gate-root .gate-error{margin:10px 0 0;padding:8px 10px;border-radius:9px;background:#fdecec;' +
      'border:1px solid #f5c6c6;color:#b91c1c;font-size:12px;line-height:1.5}' +
      '#gate-root .gate-demo{margin-top:14px;padding:10px 12px;border-radius:10px;background:#eef4ff;' +
      'border:1px solid #cfe0ff;color:#1e3a8a;font-size:12px;line-height:1.6}' +
      '#gate-root .gate-demo code{padding:1px 6px;border-radius:6px;background:#fff;border:1px solid #cfe0ff;' +
      'font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-weight:700}' +
      '#gate-root .gate-note{margin:12px 0 0;color:#64748b;font-size:11px;line-height:1.6}' +
      '#gate-root .gate-note.warn{color:#92400e;background:#fff7e8;border:1px solid #f3dfb8;' +
      'border-radius:9px;padding:8px 10px}' +
      '#gate-root .gate-demo-token{margin-top:10px;color:#475569;font-size:11.5px}' +
      '@media(max-width:480px){#gate-root .gate-card{padding:22px 18px 18px}}';
    var style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = css;
    document.head.appendChild(style);
  }

  function applyAuthState() {
    document.documentElement.setAttribute("data-auth", isAuthorized() ? "ok" : "locked");
  }

  function gateMarkup() {
    return (
      '<div class="gate-card" role="main" aria-labelledby="gate-title">' +
      '<div class="gate-brand"><div class="gate-mark" aria-hidden="true">M</div><div><b>Musi 投资助手</b><span>原型 v7 · 个人访问</span></div></div>' +
      '<h1 id="gate-title">需要授权 Token</h1>' +
      '<p class="gate-lede">进入任何信息页前需要有效的访问 token。首次输入成功后保存在本机 localStorage，退出后立即重新拦截。</p>' +
      '<form class="gate-form" novalidate>' +
      '<label for="gate-token">访问 Token</label>' +
      '<input id="gate-token" name="token" type="password" inputmode="text" autocomplete="current-password" ' +
      'placeholder="输入访问 token" aria-describedby="gate-help">' +
      '<p class="gate-error" data-gate-error role="alert" hidden></p>' +
      '<div class="gate-actions"><button type="submit">进入原型</button></div>' +
      '</form>' +
      '<div class="gate-demo">演示 token：<code>' + DEMO_TOKEN + '</code>（仅用于原型演示）</div>' +
      '<p class="gate-note" id="gate-help">原型模拟门禁，真实 token 由服务端生成。静态页面无法提供真正的访问控制，此处只演示交互流程。</p>' +
      '<p class="gate-note warn">演示写入 · 仅保存在本地，不影响实盘</p>' +
      '</div>'
    );
  }

  function renderGate() {
    if (isAuthorized()) return;
    injectStyle();
    var root = document.getElementById("gate-root");
    if (!root) {
      document.body.innerHTML = "";
      root = document.createElement("div");
      root.id = "gate-root";
      document.body.appendChild(root);
    }
    root.innerHTML = gateMarkup();
    var form = root.querySelector(".gate-form");
    var input = root.querySelector("#gate-token");
    var err = root.querySelector("[data-gate-error]");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var value = (input.value || "").trim();
      if (!value) {
        err.textContent = "请输入访问 token。";
        err.hidden = false;
        input.focus();
        return;
      }
      if (value !== DEMO_TOKEN) {
        err.textContent = "Token 无效，请检查后重试。";
        err.hidden = false;
        input.select();
        return;
      }
      try { localStorage.setItem(TOKEN_KEY, value); } catch (e2) { /* 忽略存储失败 */ }
      applyAuthState();
      window.location.reload();
    });
    setTimeout(function () { try { input.focus(); } catch (e3) { /* ignore */ } }, 40);
  }

  function logout() {
    try { localStorage.removeItem(TOKEN_KEY); } catch (e) { /* ignore */ }
    applyAuthState();
    window.location.href = window.location.pathname;
  }

  applyAuthState();
  injectStyle();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderGate);
  } else {
    renderGate();
  }

  document.addEventListener("click", function (e) {
    var btn = e.target.closest && e.target.closest("[data-logout]");
    if (!btn) return;
    e.preventDefault();
    logout();
  });

  window.MusiGate = {
    tokenKey: TOKEN_KEY,
    demoToken: DEMO_TOKEN,
    isAuthorized: isAuthorized,
    logout: logout
  };
})();
