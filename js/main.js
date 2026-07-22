/* =========================================================================
   CD TERUEL — Interactividad global
   Vanilla JS. Sin dependencias. Compatible con file://
   ========================================================================= */
(function () {
  "use strict";

  function init() {
    header();
    overlays();
    drawerAccordion();
    heroCarousel();
    matchTabs();
    lightbox();
    reveal();
  }

  /* Header: sombra al hacer scroll (rAF, sin animar layout) */
  function header() {
    var h = document.getElementById("siteHeader");
    if (!h) return;
    var ticking = false;
    function upd() { h.classList.toggle("is-scrolled", window.scrollY > 8); ticking = false; }
    window.addEventListener("scroll", function () {
      if (!ticking) { requestAnimationFrame(upd); ticking = true; }
    }, { passive: true });
    upd();
  }

  /* Drawer + search overlay (open/close por data-attrs, con foco y Esc) */
  function overlays() {
    var map = { drawer: "drawer", search: "searchOverlay" };
    var lastFocus = null;

    function open(id) {
      var el = document.getElementById(map[id]);
      if (!el) return;
      lastFocus = document.activeElement;
      el.classList.add("is-open");
      document.body.style.overflow = "hidden";
      var f = el.querySelector("input, button, a");
      if (f) setTimeout(function () { f.focus(); }, 60);
    }
    function close(id) {
      var el = document.getElementById(map[id]);
      if (!el) return;
      el.classList.remove("is-open");
      document.body.style.overflow = "";
      if (lastFocus) lastFocus.focus();
    }

    document.addEventListener("click", function (e) {
      var o = e.target.closest("[data-open]");
      var c = e.target.closest("[data-close]");
      if (o) { open(o.getAttribute("data-open")); }
      if (c) { close(c.getAttribute("data-close")); }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { close("drawer"); close("search"); }
    });
  }

  /* Acordeón del drawer */
  function drawerAccordion() {
    document.addEventListener("click", function (e) {
      var t = e.target.closest(".acc__trigger");
      if (!t) return;
      var exp = t.getAttribute("aria-expanded") === "true";
      t.setAttribute("aria-expanded", String(!exp));
    });
  }

  /* Hero carrusel: auto + prev/next + dots. Pausa en hover/oculto. */
  function heroCarousel() {
    var root = document.querySelector("[data-carousel]");
    if (!root) return;
    var slides = Array.prototype.slice.call(root.querySelectorAll(".hero__slide"));
    var dots = Array.prototype.slice.call(root.querySelectorAll(".hero__dots button"));
    if (slides.length < 2) return;
    var i = 0, timer = null, DELAY = 6000;

    function go(n) {
      i = (n + slides.length) % slides.length;
      slides.forEach(function (s, k) { s.classList.toggle("is-active", k === i); });
      dots.forEach(function (d, k) { d.classList.toggle("is-active", k === i); });
    }
    function next() { go(i + 1); }
    function play() { stop(); timer = setInterval(next, DELAY); }
    function stop() { if (timer) clearInterval(timer); }

    root.querySelector("[data-hero-next]").addEventListener("click", function () { next(); play(); });
    root.querySelector("[data-hero-prev]").addEventListener("click", function () { go(i - 1); play(); });
    dots.forEach(function (d, k) { d.addEventListener("click", function () { go(k); play(); }); });
    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", play);
    document.addEventListener("visibilitychange", function () { document.hidden ? stop() : play(); });

    go(0); play();
  }

  /* Tabs del widget de partidos */
  function matchTabs() {
    document.querySelectorAll("[data-tabs]").forEach(function (group) {
      var tabs = Array.prototype.slice.call(group.querySelectorAll("[role='tab']"));
      tabs.forEach(function (tab) {
        tab.addEventListener("click", function () {
          tabs.forEach(function (t) {
            var on = t === tab;
            t.setAttribute("aria-selected", String(on));
            var panel = document.getElementById(t.getAttribute("aria-controls"));
            if (panel) panel.hidden = !on;
          });
        });
      });
    });
  }

  /* Lightbox para vídeos y galería */
  function lightbox() {
    var box = document.getElementById("lightbox");
    if (!box) {
      box = document.createElement("div");
      box.className = "lightbox";
      box.id = "lightbox";
      box.innerHTML =
        '<button class="lightbox__close" aria-label="Cerrar" data-lb-close>' +
        '<svg class="icon" aria-hidden="true"><use href="#i-close"></use></svg></button>' +
        '<div class="lightbox__frame" id="lbFrame"></div>';
      document.body.appendChild(box);
    }
    var frame = box.querySelector("#lbFrame");

    function openVideo(id) {
      frame.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0" allow="autoplay; encrypted-media" allowfullscreen title="Vídeo CD Teruel"></iframe>';
      box.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }
    function openImg(src) {
      frame.innerHTML = '<img src="' + src + '" alt="Imagen ampliada">';
      box.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }
    function close() {
      box.classList.remove("is-open");
      document.body.style.overflow = "";
      setTimeout(function () { frame.innerHTML = ""; }, 400);
    }

    document.addEventListener("click", function (e) {
      var v = e.target.closest("[data-video]");
      var g = e.target.closest("[data-lightimg]");
      if (v) { e.preventDefault(); openVideo(v.getAttribute("data-video")); }
      else if (g) { e.preventDefault(); openImg(g.getAttribute("src") || g.getAttribute("data-lightimg")); }
      if (e.target.closest("[data-lb-close]") || e.target === box) close();
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
  }

  /* Reveal on-scroll con IntersectionObserver (nada de scroll listeners) */
  function reveal() {
    var els = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window) || !els.length) {
      els.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  var started = false;
  function boot() { if (started) return; started = true; init(); }

  // partials.js se carga ANTES que main.js y dispara "partials:ready" de inmediato,
  // así que ese evento puede haber ocurrido ya. Escuchamos Y arrancamos directamente.
  document.addEventListener("partials:ready", boot);
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
