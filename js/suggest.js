/* ------------------------------------------------------------------
   Niramay — "Suggest a change" widget  (DIY visual feedback)
   Activates ONLY when the URL has  ?suggest=<KEY>  so normal visitors
   never see it. Prasad clicks any element, types what to change, and
   the tool copies a structured list to the clipboard to paste on
   WhatsApp. The captured context (data-i18n key, selector, text) is
   what lets the site be edited precisely afterwards.
   ------------------------------------------------------------------ */
(function () {
  "use strict";

  var KEY = "ps2026";                 // secret: open site as  ...?suggest=ps2026
  var WA  = "";                       // optional: Kunal's WhatsApp number, e.g. "919876543210"
  var STORE = "niramay_suggestions";

  try {
    var params = new URLSearchParams(location.search);
    if (params.get("suggest") !== KEY) return;     // no-op for everyone else
  } catch (e) { return; }

  /* ---------- state ---------- */
  var list = [];
  try { list = JSON.parse(localStorage.getItem(STORE) || "[]"); } catch (e) { list = []; }
  var picking = false;

  /* ---------- styles ---------- */
  var css = "" +
    ".nsg-ui,.nsg-ui *{box-sizing:border-box;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif}" +
    ".nsg-fab{position:fixed;left:16px;bottom:16px;z-index:2147483000;background:#0f6b5c;color:#fff;border:0;" +
      "border-radius:999px;padding:12px 18px;font-size:15px;font-weight:700;box-shadow:0 8px 24px -8px rgba(0,0,0,.5);cursor:pointer}" +
    ".nsg-fab.on{background:#b4532a}" +
    ".nsg-fab--send{bottom:68px;background:#0c2a22;display:none}" +
    ".nsg-badge{display:inline-block;min-width:20px;margin-left:7px;padding:0 6px;background:#fff;color:#0f6b5c;" +
      "border-radius:999px;font-size:12px;line-height:20px;text-align:center;font-weight:800}" +
    ".nsg-outline{position:absolute;z-index:2147482000;border:2px solid #b4532a;background:rgba(180,83,42,.12);" +
      "pointer-events:none;border-radius:4px;transition:all .04s linear}" +
    ".nsg-modal{position:fixed;inset:0;z-index:2147483600;background:rgba(9,28,23,.55);display:flex;align-items:center;justify-content:center;padding:18px}" +
    ".nsg-card{background:#fff;border-radius:14px;max-width:460px;width:100%;max-height:86vh;overflow:auto;padding:20px;box-shadow:0 30px 80px -20px rgba(0,0,0,.6)}" +
    ".nsg-card h3{margin:0 0 4px;font-size:18px;color:#0c2a22}" +
    ".nsg-ctx{font-size:12px;color:#5a6b66;background:#f1f5f3;border-radius:8px;padding:8px 10px;margin:10px 0;word-break:break-word}" +
    ".nsg-ctx b{color:#0f6b5c}" +
    ".nsg-card textarea{width:100%;min-height:90px;border:1px solid #cdd8d4;border-radius:8px;padding:10px;font-size:15px;resize:vertical}" +
    ".nsg-row{display:flex;gap:8px;margin-top:12px;flex-wrap:wrap}" +
    ".nsg-btn{flex:1;min-width:110px;border:0;border-radius:8px;padding:11px 12px;font-size:14px;font-weight:700;cursor:pointer}" +
    ".nsg-btn--p{background:#0f6b5c;color:#fff}.nsg-btn--g{background:#eef2f0;color:#0c2a22}.nsg-btn--d{background:#fff;color:#b4532a;border:1px solid #e3c9bd}" +
    ".nsg-item{border:1px solid #e6ece9;border-radius:8px;padding:9px 10px;margin:8px 0;font-size:13px;color:#23332e}" +
    ".nsg-item .nsg-cmt{font-weight:600;color:#0c2a22}" +
    ".nsg-item .nsg-x{float:right;color:#b4532a;cursor:pointer;font-weight:800;margin-left:8px}" +
    ".nsg-empty{color:#5a6b66;font-size:14px;padding:8px 0}" +
    ".nsg-hint{font-size:13px;color:#5a6b66;margin:2px 0 0}";
  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  /* ---------- helpers ---------- */
  function el(tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; }

  function lang() { return document.documentElement.getAttribute("data-lang") || "mr"; }

  function selectorOf(node) {
    var parts = [], n = node, depth = 0;
    while (n && n.nodeType === 1 && depth < 4 && n.tagName !== "BODY") {
      var s = n.tagName.toLowerCase();
      if (n.id) { parts.unshift(s + "#" + n.id); break; }
      if (n.className && typeof n.className === "string") {
        var c = n.className.trim().split(/\s+/).filter(function (x) { return x.indexOf("nsg-") !== 0; })[0];
        if (c) s += "." + c;
      }
      var sib = n, i = 1; while ((sib = sib.previousElementSibling)) i++;
      s += ":nth-child(" + i + ")";
      parts.unshift(s); n = n.parentElement; depth++;
    }
    return parts.join(" > ");
  }

  function sectionOf(node) { var s = node.closest && node.closest("section[id]"); return s ? "#" + s.id : ""; }

  function capture(node, x, y) {
    var keyed = node.closest && node.closest("[data-i18n],[data-cap-key]");
    var img = node.tagName === "IMG" ? node : (node.querySelector && node.querySelector("img"));
    var textSrc = keyed || node;
    return {
      lang: lang(),
      path: location.pathname,
      section: sectionOf(node),
      tag: node.tagName,
      i18n: keyed ? (keyed.getAttribute("data-i18n") || keyed.getAttribute("data-cap-key")) : "",
      selector: selectorOf(node),
      text: (textSrc.textContent || "").trim().replace(/\s+/g, " ").slice(0, 160),
      img: img ? (img.getAttribute("src") + (img.alt ? " (alt: " + img.alt + ")" : "")) : "",
      x: Math.round(x), y: Math.round(y),
      comment: ""
    };
  }

  /* ---------- floating outline during pick ---------- */
  var outline = null;
  function showOutline(node) {
    if (!outline) { outline = el("div", "nsg-outline nsg-ui"); document.body.appendChild(outline); }
    var r = node.getBoundingClientRect();
    outline.style.display = "block";
    outline.style.left = (r.left + window.scrollX - 2) + "px";
    outline.style.top = (r.top + window.scrollY - 2) + "px";
    outline.style.width = (r.width + 4) + "px";
    outline.style.height = (r.height + 4) + "px";
  }
  function hideOutline() { if (outline) outline.style.display = "none"; }

  function onMove(e) {
    var t = e.target;
    if (t.closest && t.closest(".nsg-ui")) { hideOutline(); return; }
    showOutline(t);
  }
  function onPick(e) {
    var t = e.target;
    if (t.closest && t.closest(".nsg-ui")) return;        // ignore widget clicks
    e.preventDefault(); e.stopPropagation();
    stopPicking();
    openEditor(capture(t, e.pageX, e.pageY));
  }
  function startPicking() {
    picking = true; fab.classList.add("on"); fab.firstChild.nodeValue = "Tap an item to comment ✕";
    document.body.style.cursor = "crosshair";
    document.addEventListener("mousemove", onMove, true);
    document.addEventListener("click", onPick, true);
  }
  function stopPicking() {
    picking = false; fab.classList.remove("on"); setFabLabel();
    document.body.style.cursor = "";
    hideOutline();
    document.removeEventListener("mousemove", onMove, true);
    document.removeEventListener("click", onPick, true);
  }

  /* ---------- modals ---------- */
  function modal(build) {
    var m = el("div", "nsg-modal nsg-ui");
    var card = el("div", "nsg-card");
    m.appendChild(card);
    m.addEventListener("click", function (e) { if (e.target === m) document.body.removeChild(m); });
    build(card, function close() { if (m.parentNode) document.body.removeChild(m); });
    document.body.appendChild(m);
    return m;
  }

  function openEditor(ctx) {
    modal(function (card, close) {
      card.appendChild(el("h3", null, "Suggest a change"));
      var c = el("div", "nsg-ctx");
      c.innerHTML = "<b>" + (ctx.section || ctx.path) + "</b> · " + ctx.tag +
        (ctx.i18n ? " · key <b>" + ctx.i18n + "</b>" : "") +
        (ctx.text ? "<br>“" + ctx.text + "”" : "") +
        (ctx.img ? "<br>img: " + ctx.img : "");
      card.appendChild(c);
      var ta = el("textarea"); ta.placeholder = "What should change here?"; card.appendChild(ta);
      var row = el("div", "nsg-row");
      var save = el("button", "nsg-btn nsg-btn--p", "Save");
      var cancel = el("button", "nsg-btn nsg-btn--g", "Cancel");
      row.appendChild(save); row.appendChild(cancel); card.appendChild(row);
      ta.focus();
      cancel.onclick = close;
      save.onclick = function () {
        ctx.comment = ta.value.trim();
        if (!ctx.comment) { ta.focus(); return; }
        list.push(ctx); persist(); close();
      };
    });
  }

  function openReview() {
    modal(function (card, close) {
      card.appendChild(el("h3", null, "Your suggestions"));
      if (!list.length) card.appendChild(el("p", "nsg-empty", "Nothing yet. Tap ‘Suggest a change’, then click any part of the page."));
      list.forEach(function (s, i) {
        var it = el("div", "nsg-item");
        var x = el("span", "nsg-x", "✕"); x.onclick = function () { list.splice(i, 1); persist(); close(); openReview(); };
        it.appendChild(x);
        it.appendChild(el("div", "nsg-cmt", (i + 1) + ". " + s.comment));
        it.appendChild(el("div", null, (s.section || s.path) + (s.i18n ? " · " + s.i18n : "") + (s.text ? " · “" + s.text.slice(0, 60) + "”" : "")));
        card.appendChild(it);
      });
      var row = el("div", "nsg-row");
      var send = el("button", "nsg-btn nsg-btn--p", "Copy & open WhatsApp");
      var clear = el("button", "nsg-btn nsg-btn--d", "Clear all");
      var close2 = el("button", "nsg-btn nsg-btn--g", "Close");
      if (list.length) { row.appendChild(send); row.appendChild(clear); }
      row.appendChild(close2); card.appendChild(row);
      card.appendChild(el("p", "nsg-hint", "Once copied, paste into WhatsApp to Kunal."));
      close2.onclick = close;
      clear.onclick = function () { if (confirm("Remove all suggestions?")) { list = []; persist(); close(); } };
      send.onclick = function () { sendAll(close); };
    });
  }

  function buildText() {
    var lines = ["Niramay website — change suggestions", "(" + new Date().toLocaleString() + ")", ""];
    list.forEach(function (s, i) {
      lines.push((i + 1) + ". [" + s.lang + "] " + (s.path || "/") + (s.section ? " " + s.section : ""));
      lines.push("   target: " + s.tag + (s.i18n ? "  (i18n: " + s.i18n + ")" : ""));
      if (s.selector) lines.push("   selector: " + s.selector);
      if (s.text) lines.push("   current: “" + s.text + "”");
      if (s.img) lines.push("   img: " + s.img);
      lines.push("   ▶ " + s.comment);
      lines.push("");
    });
    return lines.join("\n");
  }

  function sendAll(close) {
    var text = buildText();
    var openWa = function () {
      var note = "Niramay site suggestions 📋 — pasting below 👇";
      var url = WA ? "https://wa.me/" + WA + "?text=" + encodeURIComponent(note)
                   : "https://wa.me/?text=" + encodeURIComponent(note);
      window.open(url, "_blank");
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        alert("Copied! Opening WhatsApp — long-press and Paste to send.");
        openWa(); if (close) close();
      }, function () { fallbackCopy(text); openWa(); if (close) close(); });
    } else { fallbackCopy(text); openWa(); if (close) close(); }
  }

  function fallbackCopy(text) {
    var t = document.createElement("textarea"); t.value = text;
    t.style.position = "fixed"; t.style.opacity = "0"; document.body.appendChild(t);
    t.focus(); t.select(); try { document.execCommand("copy"); } catch (e) {}
    document.body.removeChild(t);
    alert("Copy the text below and send it on WhatsApp:\n\n" + text.slice(0, 500) + (text.length > 500 ? "\n…" : ""));
  }

  /* ---------- launcher ---------- */
  var fab = el("button", "nsg-fab nsg-ui");
  fab.appendChild(document.createTextNode("Suggest a change"));
  function setFabLabel() { fab.firstChild.nodeValue = "Suggest a change"; }

  var sendFab = el("button", "nsg-fab nsg-fab--send nsg-ui");
  sendFab.appendChild(document.createTextNode("Send"));
  var badge = el("span", "nsg-badge"); sendFab.appendChild(badge);

  function persist() { try { localStorage.setItem(STORE, JSON.stringify(list)); } catch (e) {} updateBadge(); }
  function updateBadge() {
    badge.textContent = list.length;
    sendFab.style.display = list.length ? "block" : "none";
  }

  fab.addEventListener("click", function () { picking ? stopPicking() : startPicking(); });
  sendFab.addEventListener("click", function () { if (picking) stopPicking(); openReview(); });

  function mount() { document.body.appendChild(fab); document.body.appendChild(sendFab); updateBadge(); }
  if (document.readyState !== "loading") mount();
  else document.addEventListener("DOMContentLoaded", mount);
})();
