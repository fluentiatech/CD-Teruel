/* =========================================================================
   CD TERUEL — Gestor de consentimiento de cookies (AEPD / LSSI art. 22.2)
   - Banner con Aceptar / Rechazar / Configurar (misma facilidad).
   - Google Analytics NO se carga hasta que el usuario acepta analíticas.
   - Preferencia guardada 6 meses. Reabrible con window.CDTCookies.open().
   ========================================================================= */
(function () {
  "use strict";

  // >>> Sustituir por el ID real de Google Analytics del club (Admin → Flujo de datos)
  var GA_ID = "G-XXXXXXXXXX";

  var KEY = "cdt_consent";
  var MAX_AGE_DAYS = 180; // 6 meses

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return null;
      var obj = JSON.parse(raw);
      if (!obj || !obj.ts) return null;
      var ageDays = (Date.now() - obj.ts) / 86400000;
      if (ageDays > MAX_AGE_DAYS) { localStorage.removeItem(KEY); return null; }
      return obj;
    } catch (e) { return null; }
  }
  function save(analytics) {
    try { localStorage.setItem(KEY, JSON.stringify({ analytics: !!analytics, ts: Date.now() })); } catch (e) {}
  }

  /* --- Carga condicional de Google Analytics (solo con consentimiento) --- */
  var gaLoaded = false;
  function loadGA() {
    if (gaLoaded || !GA_ID || GA_ID.indexOf("XXXX") !== -1) return; // no cargar con placeholder
    gaLoaded = true;
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", GA_ID, { anonymize_ip: true });
  }

  /* --- UI: banner + modal (se inyectan una vez) --- */
  function icon(id) { return '<svg class="icon" aria-hidden="true"><use href="#' + id + '"></use></svg>'; }

  function buildUI() {
    var banner = document.createElement("div");
    banner.className = "cookie-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-label", "Aviso de cookies");
    banner.innerHTML =
      '<div class="wrap cookie-banner__inner">' +
        '<div class="cookie-banner__text">' +
          '<h3>Cookies en cdteruel.es</h3>' +
          '<p>Usamos cookies técnicas necesarias y, con tu permiso, cookies analíticas (Google Analytics) para medir el uso de la web. ' +
          'Puedes aceptar, rechazar o configurar. Más info en la <a href="legal.html#cookies">política de cookies</a>.</p>' +
        '</div>' +
        '<div class="cookie-banner__actions">' +
          '<button class="btn btn--ghost btn--sm" data-ck="config" style="color:#fff;border-color:rgba(255,255,255,.4)">Configurar</button>' +
          '<button class="btn btn--ghost btn--sm" data-ck="reject" style="color:#fff;border-color:rgba(255,255,255,.4)">Rechazar</button>' +
          '<button class="btn btn--primary btn--sm" data-ck="accept">Aceptar todas</button>' +
        '</div>' +
      '</div>';

    var modal = document.createElement("div");
    modal.className = "cookie-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-label", "Configuración de cookies");
    modal.innerHTML =
      '<div class="cookie-modal__box">' +
        '<div class="cookie-modal__head">' +
          '<h3>Configurar cookies</h3>' +
          '<button class="icon-btn" data-ck="close" aria-label="Cerrar" style="color:var(--gris-700)">' + icon("i-close") + '</button>' +
        '</div>' +
        '<div class="cookie-modal__body">' +
          '<p>Gestiona tus preferencias. Puedes cambiarlas cuando quieras desde el enlace del pie de página.</p>' +
          '<div class="cookie-opt">' +
            '<div class="cookie-opt__txt"><h4>Cookies técnicas</h4><p>Necesarias para el funcionamiento del sitio (recordar tu preferencia de cookies). No se pueden desactivar.</p></div>' +
            '<span class="cookie-opt__fixed">Siempre activas</span>' +
          '</div>' +
          '<div class="cookie-opt">' +
            '<div class="cookie-opt__txt"><h4>Cookies analíticas</h4><p>Google Analytics, para medir de forma anónima cómo se usa la web y mejorarla.</p></div>' +
            '<label class="switch"><input type="checkbox" id="ckAnalytics" aria-label="Activar cookies analíticas"><span class="switch__track"></span></label>' +
          '</div>' +
        '</div>' +
        '<div class="cookie-modal__foot">' +
          '<button class="btn btn--ghost btn--sm" data-ck="reject">Rechazar todas</button>' +
          '<button class="btn btn--primary btn--sm" data-ck="save">Guardar preferencias</button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(banner);
    document.body.appendChild(modal);
    return { banner: banner, modal: modal };
  }

  var ui = null;
  function ensureUI() { if (!ui) ui = buildUI(); return ui; }

  function showBanner() {
    var b = ensureUI().banner;
    // Forzar reflow para que la transición de entrada se dispare de forma fiable
    void b.offsetWidth;
    requestAnimationFrame(function () { b.classList.add("is-visible"); });
  }
  function hideBanner() { if (ui) ui.banner.classList.remove("is-visible"); }
  function openModal() {
    ensureUI();
    var pref = load();
    ui.modal.querySelector("#ckAnalytics").checked = pref ? !!pref.analytics : false;
    ui.modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }
  function closeModal() { if (ui) ui.modal.classList.remove("is-open"); document.body.style.overflow = ""; }

  function apply(analytics) {
    save(analytics);
    if (analytics) loadGA();
    hideBanner();
    closeModal();
  }

  function bind() {
    document.addEventListener("click", function (e) {
      var t = e.target.closest("[data-ck]");
      if (!t) return;
      var action = t.getAttribute("data-ck");
      if (action === "accept") apply(true);
      else if (action === "reject") apply(false);
      else if (action === "config") openModal();
      else if (action === "close") closeModal();
      else if (action === "save") apply(!!(ui && ui.modal.querySelector("#ckAnalytics").checked));
      if (e.target.classList && e.target.classList.contains("cookie-modal")) closeModal();
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeModal(); });
  }

  // API pública para reabrir el panel desde footer / legal
  window.CDTCookies = {
    open: function () { openModal(); },
    reset: function () { try { localStorage.removeItem(KEY); } catch (e) {} showBanner(); }
  };

  function init() {
    bind();
    var pref = load();
    if (pref === null) {
      showBanner();               // primera visita: pedir consentimiento
    } else if (pref.analytics) {
      loadGA();                   // ya consintió analíticas
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
