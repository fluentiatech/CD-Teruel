/* =========================================================================
   CD TERUEL — i18n (ES / EN / FR)
   Traduce la interfaz al vuelo. Marca elementos con data-i18n="clave".
   Guarda el idioma elegido y actualiza <html lang>.
   ========================================================================= */
(function () {
  "use strict";

  var KEY = "cdt_lang";
  var DEFAULT = "es";
  var LANGS = ["es", "en", "fr"];

  var DICT = {
    /* ---- Navegación ---- */
    "nav.club":            { es: "Club",                   en: "Club",                  fr: "Club" },
    "nav.transparencia":   { es: "Portal de Transparencia", en: "Transparency Portal",  fr: "Portail de Transparence" },

    /* ---- CTAs ---- */
    "cta.abonado":         { es: "Hazte abonado",          en: "Become a member",       fr: "Devenir abonné" },

    /* ---- Footer legal ---- */
    "footer.aviso":         { es: "Aviso Legal",                   en: "Legal Notice",              fr: "Mentions Légales" },
    "footer.privacidad":    { es: "Política de Privacidad",        en: "Privacy Policy",            fr: "Politique de Confidentialité" },
    "footer.cookies":       { es: "Política de Cookies",           en: "Cookie Policy",             fr: "Politique de Cookies" },
    "footer.derechos":      { es: "Ejercicio de derechos ARSOL",   en: "Exercise of Rights",        fr: "Exercice des Droits" },
    "footer.accesibilidad": { es: "Declaración de accesibilidad",  en: "Accessibility Statement",   fr: "Déclaration d'Accessibilité" },
    "footer.contacto":      { es: "Contacto",                      en: "Contact",                   fr: "Contact" },
    "footer.config_cookies":{ es: "Configurar cookies",            en: "Cookie settings",           fr: "Paramètres cookies" },

    /* ---- Cabecera de bienvenida ---- */
    "hero.bienvenida":     { es: "Bienvenidos a la web oficial del CD Teruel",
                             en: "Welcome to the official website of CD Teruel",
                             fr: "Bienvenue sur le site officiel du CD Teruel" },

    /* ---- Transparencia (títulos de sección) ---- */
    "transp.title":        { es: "Portal de Transparencia", en: "Transparency Portal",   fr: "Portail de Transparence" },
    "transp.intro":        { es: "El Club Deportivo Teruel pone a disposición de socios, aficionados y ciudadanía la información institucional y económica del club en cumplimiento de sus principios de transparencia y buen gobierno.",
                             en: "Club Deportivo Teruel makes the institutional and financial information of the club available to members, fans and the public in compliance with its principles of transparency and good governance.",
                             fr: "Le Club Deportivo Teruel met à la disposition des membres, des supporters et du public les informations institutionnelles et financières du club, conformément à ses principes de transparence et de bonne gouvernance." },
    "transp.estatutos":    { es: "Estatutos",              en: "Bylaws",                fr: "Statuts" },
    "transp.organigrama":  { es: "Organigrama",            en: "Organisation chart",    fr: "Organigramme" },
    "transp.presupuesto":  { es: "Presupuesto anual",      en: "Annual budget",         fr: "Budget annuel" },
    "transp.auditoria":    { es: "Auditoría y cuentas anuales", en: "Audit and annual accounts", fr: "Audit et comptes annuels" },
    "transp.contacto":     { es: "Contacto",               en: "Contact",               fr: "Contact" },
    "transp.secciones":    { es: "Secciones",              en: "Sections",              fr: "Sections" }
  };

  function getLang() {
    try { var l = localStorage.getItem(KEY); if (l && LANGS.indexOf(l) !== -1) return l; } catch (e) {}
    return DEFAULT;
  }
  function setLangStored(l) { try { localStorage.setItem(KEY, l); } catch (e) {} }

  function translate(lang) {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var entry = DICT[key];
      if (entry && entry[lang]) el.textContent = entry[lang];
    });
    document.documentElement.setAttribute("lang", lang);
    // Actualizar indicadores del selector
    var cur = document.querySelector("[data-lang-current]");
    if (cur) cur.textContent = lang.toUpperCase();
    document.querySelectorAll("[data-setlang]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-setlang") === lang));
    });
  }

  function apply(lang) {
    if (LANGS.indexOf(lang) === -1) lang = DEFAULT;
    setLangStored(lang);
    translate(lang);
  }

  function bind() {
    document.addEventListener("click", function (e) {
      var b = e.target.closest("[data-setlang]");
      if (b) { e.preventDefault(); apply(b.getAttribute("data-setlang")); }
    });
  }

  window.CDTi18n = { set: apply, get: getLang };

  var started = false;
  function init() { if (started) return; started = true; bind(); translate(getLang()); }

  // Los partials se inyectan por JS. Como i18n.js se carga tras partials.js,
  // el evento partials:ready puede haberse disparado ya: escuchamos Y ejecutamos ya.
  document.addEventListener("partials:ready", init);
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
