/* =========================================================
   main.js — interactions
   - mobile nav, sticky header state
   - scroll reveal
   - appointment form: validate + send via WhatsApp
   ========================================================= */

(function () {
  "use strict";

  var WHATSAPP = "919922460229";

  function t(key) {
    var lang = document.documentElement.getAttribute("data-lang") || "mr";
    return (window.I18N && I18N[lang] && I18N[lang][key]) || key;
  }

  /* ---------- Mobile nav ---------- */
  var hamburger = document.getElementById("hamburger");
  var nav = document.getElementById("nav");

  function closeNav() {
    if (!nav) return;
    nav.classList.remove("is-open");
    hamburger.classList.remove("is-open");
    hamburger.setAttribute("aria-expanded", "false");
  }
  if (hamburger && nav) {
    hamburger.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      hamburger.classList.toggle("is-open", open);
      hamburger.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeNav);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  /* ---------- Sticky header state ---------- */
  var header = document.getElementById("header");
  function onScroll() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Lightbox (facility gallery) ---------- */
  var lb = document.getElementById("lightbox");
  if (lb) {
    var lbImg = document.getElementById("lbImg");
    var lbCap = document.getElementById("lbCap");
    var lbClose = document.getElementById("lbClose");
    var lastFocus = null;

    var openLb = function (src, alt, cap) {
      lastFocus = document.activeElement;
      lbImg.src = src; lbImg.alt = alt || "";
      lbCap.textContent = cap || "";
      lb.hidden = false;
      document.body.style.overflow = "hidden";
      lbClose.focus();
    };
    var closeLb = function () {
      lb.hidden = true;
      lbImg.src = "";
      document.body.style.overflow = "";
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    };

    document.querySelectorAll("[data-lightbox]").forEach(function (fig) {
      fig.setAttribute("role", "button");
      fig.setAttribute("tabindex", "0");
      fig.addEventListener("click", function () {
        var img = fig.querySelector("img");
        var capEl = fig.querySelector("figcaption");
        if (img) openLb(img.currentSrc || img.src, img.alt, capEl ? capEl.textContent : "");
      });
      fig.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fig.click(); }
      });
    });

    lbClose.addEventListener("click", closeLb);
    lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !lb.hidden) closeLb(); });
  }

  /* ---------- Year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) {
    // Avoid Date in restricted contexts; fall back gracefully.
    try { yearEl.textContent = new Date().getFullYear(); }
    catch (e) { yearEl.textContent = "2026"; }
  }

  /* ---------- Appointment form ---------- */
  var form = document.getElementById("appointmentForm");
  if (!form) return;

  var statusEl = document.getElementById("formStatus");

  function setError(name, msg) {
    var field = form.querySelector("#" + name).closest(".field");
    var err = form.querySelector('.field__error[data-for="' + name + '"]');
    if (msg) {
      field.classList.add("is-invalid");
      if (err) err.textContent = msg;
    } else {
      field.classList.remove("is-invalid");
      if (err) err.textContent = "";
    }
  }

  function validate() {
    var ok = true;
    var name = form.name.value.trim();
    var phone = form.phone.value.trim();
    var email = form.email.value.trim();

    if (!name) { setError("name", t("f.err.name")); ok = false; }
    else setError("name", "");

    var digits = phone.replace(/\D/g, "");
    if (digits.length < 10) { setError("phone", t("f.err.phone")); ok = false; }
    else setError("phone", "");

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("email", t("f.err.email")); ok = false;
    } else setError("email", "");

    return ok;
  }

  // live-clear errors as the user types
  ["name", "phone", "email"].forEach(function (n) {
    var el = form.querySelector("#" + n);
    if (el) el.addEventListener("input", function () {
      if (el.closest(".field").classList.contains("is-invalid")) validate();
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validate()) {
      var firstBad = form.querySelector(".field.is-invalid input");
      if (firstBad) firstBad.focus();
      return;
    }

    var data = {
      name: form.name.value.trim(),
      phone: form.phone.value.trim(),
      email: form.email.value.trim(),
      type: form.type.value,
      date: form.date.value,
      message: form.message.value.trim()
    };

    var lines = [
      "Appointment request — Niramay Hospital",
      "",
      "Name: " + data.name,
      "Phone: " + data.phone
    ];
    if (data.email) lines.push("Email: " + data.email);
    lines.push("Type: " + data.type);
    if (data.date) lines.push("Preferred date: " + data.date);
    if (data.message) lines.push("Message: " + data.message);

    var text = encodeURIComponent(lines.join("\n"));
    var url = "https://wa.me/" + WHATSAPP + "?text=" + text;

    if (statusEl) {
      statusEl.textContent = t("f.sending");
      statusEl.className = "form__status";
    }

    var win = window.open(url, "_blank");
    setTimeout(function () {
      if (statusEl) {
        statusEl.textContent = t("f.ok");
        statusEl.className = "form__status is-ok";
      }
      if (!win) { window.location.href = url; } // popup blocked → same tab
    }, 300);

    form.reset();
  });
})();
