/* =========================================================
   reviews.js — LIVE Google Reviews widget (Places API New)
   =========================================================

   ┌─────────────────────────────────────────────────────────┐
   │  TO GO LIVE: paste your Google API key below.             │
   │  Until then, the site shows the Justdial reviews instead. │
   └─────────────────────────────────────────────────────────┘

   How to get the key (one-time, ~5 min):
   1. https://console.cloud.google.com/  → create/select a project
   2. APIs & Services → Enable APIs → enable "Places API (New)"
   3. APIs & Services → Credentials → Create credentials → API key
   4. RESTRICT the key (important — it is public in the browser):
        • Application restrictions → "Websites" → add your domains:
            https://niramayhospital.com/*   (and your *.vercel.app domain)
        • API restrictions → restrict to "Places API (New)"
   5. Paste the key into GOOGLE_PLACES_API_KEY below and redeploy.

   Cost: results are cached in the browser for 12h to keep calls
   (and billing) minimal. A small clinic site stays within the
   free monthly tier comfortably.
*/

var REVIEWS_CONFIG = {
  GOOGLE_PLACES_API_KEY: "AIzaSyDDYZBwDaEn_9Y65GRpukPhzJs8XTgbM0Y",   // browser-public: RESTRICT by HTTP referrer + Places API (New)

  PLACE_ID: "ChIJ4awfbaAx1zsROcyTDRjMQP0",
  MAX_REVIEWS: 6,
  MIN_STAR: 4,                                      // only show 4–5★ reviews
  CACHE_HOURS: 12
};

(function () {
  "use strict";

  var cfg = REVIEWS_CONFIG;
  if (!cfg.GOOGLE_PLACES_API_KEY) return;           // no key → keep Justdial fallback

  var state = null;                                  // {rating,count,uri,reviews:[...]}

  function lang() { return document.documentElement.getAttribute("data-lang") || "mr"; }

  function ratingLabel(d) {
    var n = d.count;
    return lang() === "mr"
      ? d.rating + " ★ · Google वर " + n + "+ पुनरावलोकने"
      : d.rating + " ★ · " + n + "+ reviews on Google";
  }

  function stars(n) {
    n = Math.round(n || 5);
    return "★★★★★".slice(0, n) + "☆☆☆☆☆".slice(0, 5 - n);
  }

  function esc(s) {
    var d = document.createElement("div");
    d.textContent = s == null ? "" : s;
    return d.innerHTML;
  }

  /* ---------- cache ---------- */
  function readCache() {
    try {
      var raw = localStorage.getItem("g_reviews_" + cfg.PLACE_ID + "_" + lang());
      if (!raw) return null;
      var o = JSON.parse(raw);
      if (!o.t || (nowMs() - o.t) > cfg.CACHE_HOURS * 3600 * 1000) return null;
      return o.d;
    } catch (e) { return null; }
  }
  function writeCache(d) {
    try { localStorage.setItem("g_reviews_" + cfg.PLACE_ID + "_" + lang(), JSON.stringify({ t: nowMs(), d: d })); } catch (e) {}
  }
  function nowMs() { try { return Date.now(); } catch (e) { return 0; } }

  /* ---------- fetch (Places API New) ---------- */
  function fetchPlace() {
    var url = "https://places.googleapis.com/v1/places/" + encodeURIComponent(cfg.PLACE_ID) +
              "?languageCode=" + lang();
    return fetch(url, {
      headers: {
        "X-Goog-Api-Key": cfg.GOOGLE_PLACES_API_KEY,
        "X-Goog-FieldMask": "rating,userRatingCount,googleMapsUri,reviews"
      }
    }).then(function (r) {
      if (!r.ok) throw new Error("Places API " + r.status);
      return r.json();
    }).then(function (j) {
      var reviews = (j.reviews || []).map(function (rv) {
        return {
          author: (rv.authorAttribution && rv.authorAttribution.displayName) || "Google user",
          photo: (rv.authorAttribution && rv.authorAttribution.photoUri) || "",
          rating: rv.rating || 5,
          when: rv.relativePublishTimeDescription || "",
          text: (rv.text && rv.text.text) || (rv.originalText && rv.originalText.text) || ""
        };
      }).filter(function (rv) { return rv.text && rv.rating >= cfg.MIN_STAR; })
        .slice(0, cfg.MAX_REVIEWS);

      return {
        rating: (j.rating != null ? j.rating : 0).toFixed(1),
        count: j.userRatingCount || 0,
        uri: j.googleMapsUri || "",
        reviews: reviews
      };
    });
  }

  /* ---------- render ---------- */
  function renderLabel() {
    if (!state) return;
    var t = document.getElementById("reviewRatingText");
    if (t) t.textContent = ratingLabel(state);
    if (state.uri) {
      document.querySelectorAll(".js-reviews-link").forEach(function (a) { a.href = state.uri; });
    }
  }

  function renderReviews() {
    if (!state || !state.reviews.length) return;
    var mount = document.getElementById("googleReviews");
    if (!mount) return;

    mount.innerHTML = state.reviews.map(function (r) {
      var av = r.photo
        ? '<img class="g-review__avatar" src="' + esc(r.photo) + '" alt="" loading="lazy" referrerpolicy="no-referrer" />'
        : '<span class="g-review__avatar g-review__avatar--ph">' + esc(r.author.charAt(0)) + "</span>";
      return '' +
        '<figure class="quote g-review">' +
          '<div class="g-review__head">' + av +
            '<div><div class="g-review__name">' + esc(r.author) + '</div>' +
            '<div class="g-review__when">' + esc(r.when) + '</div></div>' +
            '<svg class="g-review__g" viewBox="0 0 24 24" aria-label="Google"><path d="M12 11v2.8h4c-.2 1-1.5 3-4 3a4.3 4.3 0 1 1 0-8.6c1.2 0 2.1.5 2.6 1l2-2A7.3 7.3 0 1 0 12 19.3c4.2 0 7-3 7-7.2 0-.5 0-.8-.1-1.1H12z" fill="#4285F4"/></svg>' +
          '</div>' +
          '<div class="stars" aria-label="' + r.rating + ' stars">' + stars(r.rating) + '</div>' +
          '<blockquote>' + esc(r.text) + '</blockquote>' +
        '</figure>';
    }).join("");

    // swap static Justdial quotes for live Google reviews
    var st = document.getElementById("staticQuotes");
    if (st) st.hidden = true;
    mount.hidden = false;
    var pw = document.getElementById("grPowered");
    if (pw) pw.hidden = false;
  }

  function apply(data) {
    state = data;
    renderLabel();
    renderReviews();
  }

  /* ---------- boot ---------- */
  function load() {
    var cached = readCache();
    if (cached) { apply(cached); return; }
    fetchPlace().then(function (d) {
      if (!d.reviews.length && !d.count) return;     // nothing useful → keep fallback
      writeCache(d);
      apply(d);
    }).catch(function (e) {
      // Silent: leave the Justdial fallback in place.
      if (window.console) console.warn("[reviews] Google reviews unavailable:", e.message);
    });
  }

  // re-localise the rating label (and re-fetch in the new language) on toggle
  window.addEventListener("langchange", function () {
    var cached = readCache();
    if (cached) { apply(cached); return; }
    if (state) renderLabel();
    load();
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", load);
  } else {
    load();
  }
})();
