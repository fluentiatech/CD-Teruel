/* =========================================================================
   CD TERUEL — Partials globales (header, footer, sponsors)
   Se inyectan por JS para funcionar también con file:// (sin fetch).
   Uso: <div data-partial="header" data-active="noticias"></div>
   ========================================================================= */
(function () {
  "use strict";

  function icon(id, cls) { return '<svg class="' + (cls || "icon") + '" aria-hidden="true"><use href="#' + id + '"></use></svg>'; }

  // Sprite de iconos inline: <use href="#id"> del mismo documento funciona con file://
  var SPRITE = '<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true">' +
    '<symbol id="i-cart" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h2.2l1.6 11.3a1.5 1.5 0 0 0 1.5 1.3h8.9a1.5 1.5 0 0 0 1.5-1.2L20 7H5"/></symbol>' +
    '<symbol id="i-ticket" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4Z"/><path d="M14 6v12" stroke-dasharray="2 2.5"/></symbol>' +
    '<symbol id="i-user" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-3.5 3.6-6 8-6s8 2.5 8 6"/></symbol>' +
    '<symbol id="i-search" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></symbol>' +
    '<symbol id="i-globe" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></symbol>' +
    '<symbol id="i-menu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></symbol>' +
    '<symbol id="i-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></symbol>' +
    '<symbol id="i-chevron-down" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></symbol>' +
    '<symbol id="i-chevron-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></symbol>' +
    '<symbol id="i-arrow-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h16M14 6l6 6-6 6"/></symbol>' +
    '<symbol id="i-arrow-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12H4M10 6l-6 6 6 6"/></symbol>' +
    '<symbol id="i-play" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13a1 1 0 0 0 1.5.87l11-6.5a1 1 0 0 0 0-1.74l-11-6.5A1 1 0 0 0 8 5.5Z"/></symbol>' +
    '<symbol id="i-gallery" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8.5" cy="10" r="1.4"/><path d="m4 17 4.5-4 3 2.6L15 12l5 5"/></symbol>' +
    '<symbol id="i-video" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="13" height="12" rx="2"/><path d="m16 10 5-3v10l-5-3"/></symbol>' +
    '<symbol id="i-calendar" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></symbol>' +
    '<symbol id="i-pin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21c4-4 7-7.5 7-11a7 7 0 1 0-14 0c0 3.5 3 7 7 11Z"/><circle cx="12" cy="10" r="2.5"/></symbol>' +
    '<symbol id="i-clock" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></symbol>' +
    '<symbol id="i-share" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 10.5 6.8-4M8.6 13.5l6.8 4"/></symbol>' +
    '<symbol id="i-shield" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 5 6v6c0 4 3 7 7 9 4-2 7-5 7-9V6Z"/></symbol>' +
    '<symbol id="i-instagram" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></symbol>' +
    '<symbol id="i-x" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 3h3l-7.1 8.1L22 21h-6.4l-4.4-5.8L6 21H3l7.6-8.7L2.5 3H9l4 5.3L17.5 3Zm-1.1 16h1.7L7.7 4.8H5.9L16.4 19Z"/></symbol>' +
    '<symbol id="i-youtube" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="6" width="19" height="12" rx="3.5"/><path d="M10 9.2v5.6l5-2.8z" fill="currentColor" stroke="none"/></symbol>' +
    '<symbol id="i-tiktok" viewBox="0 0 24 24" fill="currentColor"><path d="M16 3c.3 2.3 1.7 3.9 4 4.2v3c-1.5.1-2.9-.3-4-1v6.4A6.1 6.1 0 1 1 9.9 9.5v3.1a3 3 0 1 0 3 3V3Z"/></symbol>' +
    '<symbol id="i-facebook" viewBox="0 0 24 24" fill="currentColor"><path d="M14 8.5V6.8c0-.8.5-1 .9-1H17V2.5h-2.6C11.3 2.5 11 4.9 11 6.3v2.2H8.5v3.3H11V21h3v-9.2h2.4l.4-3.3H14Z"/></symbol>' +
    '</svg>';

  // enlaces del menú completo (7 bloques) — árbol podado al tamaño del CDT
  /* MENU (móvil) anterior COMENTADO temporalmente:
  var MENU = [
    { t: "Equipos", items: [
      ["Primer Equipo", "primer-equipo.html"],
      ["Femenino", "femenino.html"],
      ["Juvenil A · Pinilla", "juvenil.html"],
      ["Cadete A · Pinilla", "juvenil-plantilla.html"]
    ]},
    { t: "Club", items: [
      ["Historia", "club.html"],
      ["Institucional", "club.html"],
      ["Instalaciones", "club.html"],
      ["Transparencia", "club.html"]
    ]},
    { t: "Afición", items: [
      ["Área de Socio", "#"],
      ["APP del club", "#"],
      ["Cuenta CD Teruel", "#"],
      ["Abono digital NFC", "#"]
    ]},
    { t: "Media", items: [
      ["Noticias", "noticias.html"],
      ["CD Teruel TV", "#"]
    ]},
    { t: "Pinilla", items: [
      ["Historia del estadio", "club.html"],
      ["Tour de Pinilla", "#"],
      ["Áreas VIP", "#"],
      ["Experiencias", "#"]
    ]},
    { t: "Empresas", items: [
      ["Club de Empresas", "#"],
      ["Descuentos para socios", "#"],
      ["Establecimientos turolenses", "#"]
    ]},
    { t: "Zona Turolense", items: [
      ["Sorteos activos", "#"],
      ["Turolenses desde la cuna", "#"],
      ["Juegos", "#"]
    ]}
  ];
  */
  // MENU (móvil) actual: solo Club → Portal de Transparencia
  var MENU = [
    { t: "Club", key: "nav.club", items: [
      ["Portal de Transparencia", "transparencia.html", "nav.transparencia"]
    ]}
  ];

  /* NAV anterior COMENTADO temporalmente:
  var NAV = [
    ["Equipos", "primer-equipo.html", "equipos"],
    ["Partidos", "partido.html", "partidos"],
    ["Noticias", "noticias.html", "noticias"],
    ["CD Teruel TV", "#", "tv"]
  ];
  */
  // NAV actual: solo "Club" con desplegable
  var NAV = [
    ["Club", "#", "club"]
  ];

  // Desplegable de Club
  var CLUB_MENU = [
    ["Portal de Transparencia", "transparencia.html"]
  ];

  // Mega-menú de Equipos (hover en desktop)
  var MEGA_CARDS = [
    { t: "Primer Equipo", sub: "Primera Federación", img: "https://picsum.photos/seed/cdt-mega-pe/500/360", href: "primer-equipo.html" },
    { t: "Femenino", sub: "Segunda Fed. Femenina", img: "https://picsum.photos/seed/cdt-mega-fem/500/360", href: "femenino.html" },
    { t: "Juvenil A", sub: "Liga Nacional Juvenil", img: "https://picsum.photos/seed/cdt-mega-juv/500/360", href: "juvenil.html" }
  ];
  var MEGA_CANTERA = [
    ["Juvenil A", "juvenil.html"],
    ["Cadete A", "juvenil-plantilla.html"],
    ["Infantil A", "juvenil-plantilla.html"],
    ["Alevín", "juvenil-plantilla.html"],
    ["Femenino base", "femenino-plantilla.html"]
  ];

  function megaEquiposHTML() {
    var cards = MEGA_CARDS.map(function (c) {
      return '' +
        '<a class="mega-card" href="' + c.href + '">' +
          '<img src="' + c.img + '" alt="" loading="lazy">' +
          '<span class="mega-card__ov"></span>' +
          '<span class="mega-card__go">' + icon("i-arrow-right") + '</span>' +
          '<span class="mega-card__body"><small>' + c.sub + '</small><strong>' + c.t + '</strong></span>' +
        '</a>';
    }).join("");
    var cantera = MEGA_CANTERA.map(function (it) {
      return '<a href="' + it[1] + '">' + icon("i-chevron-right") + '<span>' + it[0] + '</span></a>';
    }).join("");
    return '' +
      '<div class="mega" id="megaEquipos" role="region" aria-label="Equipos del club">' +
        '<div class="wrap mega__inner">' +
          '<div class="mega__cards">' + cards + '</div>' +
          '<div class="mega__cantera">' +
            '<h4>Equipos Pinilla</h4>' +
            '<div class="mega__cantera-list">' + cantera + '</div>' +
            '<a class="mega__all" href="juvenil.html">Ver toda la cantera' + icon("i-arrow-right") + '</a>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  function clubDropdownHTML() {
    var links = CLUB_MENU.map(function (it) {
      return '<a href="' + it[1] + '">' + icon("i-chevron-right") + '<span data-i18n="nav.transparencia">' + it[0] + '</span></a>';
    }).join("");
    return '' +
      '<div class="nav-drop__panel" role="region" aria-label="Club">' +
        '<div class="nav-drop__list">' + links + '</div>' +
      '</div>';
  }

  function headerHTML(active) {
    var nav = NAV.map(function (n) {
      var cur = n[2] === active ? ' aria-current="page"' : "";
      // "Equipos" abre mega-menú en hover
      if (n[2] === "equipos") {
        return '' +
          '<div class="nav-mega" data-mega>' +
            '<a href="' + n[1] + '"' + cur + ' aria-haspopup="true" aria-expanded="false">' + n[0] +
              icon("i-chevron-down") +
            '</a>' +
            megaEquiposHTML() +
          '</div>';
      }
      // "Club" abre desplegable sencillo en hover
      if (n[2] === "club") {
        return '' +
          '<div class="nav-drop" data-drop>' +
            '<a href="' + n[1] + '"' + cur + ' aria-haspopup="true" aria-expanded="false"><span data-i18n="nav.club">' + n[0] + '</span>' +
              icon("i-chevron-down") +
            '</a>' +
            clubDropdownHTML() +
          '</div>';
      }
      return '<a href="' + n[1] + '"' + cur + '>' + n[0] + "</a>";
    }).join("");

    var acc = MENU.map(function (b, i) {
      var links = b.items.map(function (it) {
        var k = it[2] ? ' data-i18n="' + it[2] + '"' : "";
        return '<a href="' + it[1] + '"><span' + k + ">" + it[0] + "</span></a>";
      }).join("");
      var bk = b.key ? ' data-i18n="' + b.key + '"' : "";
      return '' +
        '<div class="acc">' +
          '<button class="acc__trigger" aria-expanded="false">' +
            '<span' + bk + ">" + b.t + "</span>" + icon("i-chevron-down") +
          "</button>" +
          '<div class="acc__panel"><div>' + links + "</div></div>" +
        "</div>";
    }).join("");

    return '' +
    '<div class="topbar"><div class="wrap">' +
      '<div class="topbar__left"></div>' +
      '<div class="topbar__social" aria-label="Redes sociales">' +
        '<a href="https://www.instagram.com/club_deportivo_teruel" target="_blank" rel="noopener" aria-label="Instagram">' + icon("i-instagram") + "</a>" +
        '<a href="https://x.com/TeruelCd" target="_blank" rel="noopener" aria-label="X">' + icon("i-x") + "</a>" +
        '<a href="https://www.youtube.com/@CD.Teruel" target="_blank" rel="noopener" aria-label="YouTube">' + icon("i-youtube") + "</a>" +
        '<a href="https://www.tiktok.com/@cd.teruel" target="_blank" rel="noopener" aria-label="TikTok">' + icon("i-tiktok") + "</a>" +
        '<a href="https://www.facebook.com/clubdeportivoTeruel" target="_blank" rel="noopener" aria-label="Facebook">' + icon("i-facebook") + "</a>" +
      "</div>" +
    "</div></div>" +

    '<header class="header" id="siteHeader"><div class="wrap"><div class="header__inner">' +
      '<a class="brand" href="index.html" aria-label="Inicio CD Teruel">' +
        '<img class="brand__escudo" src="assets/img/escudo-cdt.png" alt="Escudo del CD Teruel" width="76" height="92">' +
      "</a>" +
      '<nav class="nav-main" aria-label="Principal">' + nav + "</nav>" +
      '<div class="header__spacer"></div>' +
      '<div class="header__actions">' +
        '<div class="header__ctas">' +
          '<a class="btn btn--primary btn--sm" href="https://cdteruel.compralaentrada.com/" target="_blank" rel="noopener">' + icon("i-ticket") + '<span data-i18n="cta.abonado">Hazte abonado</span></a>' +
        "</div>" +
        '<div class="lang-drop" data-langdrop>' +
          '<button class="header__lang" aria-haspopup="true" aria-expanded="false" aria-label="Idioma">' + icon("i-globe") + '<span data-lang-current>ES</span>' + icon("i-chevron-down") + "</button>" +
          '<div class="lang-drop__panel">' +
            '<button data-setlang="es" aria-pressed="true">Español</button>' +
            '<button data-setlang="en" aria-pressed="false">English</button>' +
            '<button data-setlang="fr" aria-pressed="false">Français</button>' +
          "</div>" +
        "</div>" +
        '<button class="icon-btn burger" data-open="drawer" aria-label="Abrir menú">' + icon("i-menu") + "</button>" +
      "</div>" +
    "</div></div></header>" +

    // Drawer (menú a pantalla completa)
    '<div class="drawer" id="drawer">' +
      '<div class="drawer__panel" role="dialog" aria-label="Menú" aria-modal="true">' +
        '<div class="drawer__head">' +
          '<img class="drawer__escudo" src="assets/img/escudo-cdt.png" alt="CD Teruel">' +
          '<button class="icon-btn" data-close="drawer" aria-label="Cerrar">' + icon("i-close") + "</button>" +
        "</div>" +
        '<div class="drawer__body">' + acc +
          '<div class="drawer__ctas">' +
            '<a class="btn btn--primary btn--block" href="https://cdteruel.compralaentrada.com/" target="_blank" rel="noopener">' + icon("i-ticket") + '<span data-i18n="cta.abonado">Hazte abonado</span></a>' +
          "</div>" +
          '<div class="drawer__langs">' +
            '<button data-setlang="es" aria-pressed="true">ES</button>' +
            '<button data-setlang="en" aria-pressed="false">EN</button>' +
            '<button data-setlang="fr" aria-pressed="false">FR</button>' +
          "</div>" +
        "</div>" +
      "</div>" +
    "</div>";
  }

  var SPONSORS = {
    main: [
      { name: "Caja Rural de Teruel", logo: "assets/sponsors/principal.svg" },
      { name: "Mudéjar Sport", logo: "assets/sponsors/tecnica.svg" }
    ],
    official: ["Jamón de Teruel D.O.", "Termas Pallarés", "Cerámica Turolense", "Ayuntamiento de Teruel"],
    collab: ["Aguas de Pinilla", "Autobuses Samar", "Hotel Reina Cristina", "Dinópolis", "Gráficas Mudéjar"]
  };

  function textLogo(name) {
    return '<a class="sponsor-logo sponsor-logo--text" href="#" aria-label="' + name + '">' + name + "</a>";
  }

  function sponsorsHTML() {
    var main = SPONSORS.main.map(function (s) {
      return '<a class="sponsor-logo" href="#" aria-label="' + s.name + '"><img src="' + s.logo + '" alt="' + s.name + '" style="height:100%;width:auto" onerror="this.replaceWith(document.createTextNode(\'' + s.name + '\'))"></a>';
    }).join("");
    return '' +
    '<section class="sponsors"><div class="wrap">' +
      '<div class="sponsors__head"><p>Patrocinadores y colaboradores del CD Teruel</p></div>' +
      '<div class="sponsors__row sponsors__row--main">' + main + "</div>" +
      '<div class="sponsors__row sponsors__row--official">' + SPONSORS.official.map(textLogo).join("") + "</div>" +
      '<div class="sponsors__row sponsors__row--collab">' + SPONSORS.collab.map(textLogo).join("") + "</div>" +
    "</div></section>";
  }

  function footerHTML() {
    var cols = [
      ["Equipos", [["Primer Equipo", "primer-equipo.html"], ["Femenino", "femenino.html"], ["Cantera Pinilla", "juvenil.html"], ["Clasificación", "primer-equipo-clasificacion.html"]]],
      ["Media", [["Noticias", "noticias.html"], ["CD Teruel TV", "#"], ["Galería", "#"], ["Sala de prensa", "#"]]],
      ["Club", [["Historia", "club.html"], ["Estadio Pinilla", "club.html"], ["Transparencia", "club.html"], ["Club de Empresas", "#"]]],
      ["Afición", [["Área de socio", "#"], ["Entradas", "entradas.html"], ["Tienda oficial", "#"], ["Zona Turolense", "#"]]]
    ].map(function (c) {
      var links = c[1].map(function (l) { return '<a href="' + l[1] + '">' + l[0] + "</a>"; }).join("");
      return '<div class="footer__col"><h4>' + c[0] + "</h4>" + links + "</div>";
    }).join("");

    var legalLinks = [
      ["Aviso Legal", "legal.html#aviso", "footer.aviso"],
      ["Política de Privacidad", "legal.html#privacidad", "footer.privacidad"],
      ["Política de Cookies", "legal.html#cookies", "footer.cookies"],
      ["Ejercicio de derechos ARSOL", "legal.html#derechos", "footer.derechos"],
      ["Declaración de accesibilidad", "legal.html#accesibilidad", "footer.accesibilidad"],
      ["Contacto", "contacto.html", "footer.contacto"]
    ];
    var legal = legalLinks.map(function (l) { return '<a href="' + l[1] + '" data-i18n="' + l[2] + '">' + l[0] + "</a>"; }).join("") +
      '<a href="#" data-i18n="footer.config_cookies" onclick="if(window.CDTCookies){window.CDTCookies.open();}return false;">Configurar cookies</a>';

    // Parte superior del footer (marca, redes, apps, columnas) OCULTA temporalmente.
    /* --- BLOQUE OCULTO: footer__top ---
    var footerTop =
      '<div class="wrap footer__top">' +
        '<div class="footer__brand">' +
          '<img class="escudo" src="assets/img/escudo-cdt.png" alt="Escudo del CD Teruel" width="72" height="86">' +
          '<h3>Club Deportivo Teruel</h3>' +
          '<p>El club de la ciudad del amor y del Mudéjar. Desde 1954 defendiendo los colores rojinegros en Pinilla.</p>' +
          '<div class="footer__social">' +
            '<a href="https://www.instagram.com/club_deportivo_teruel" target="_blank" rel="noopener" aria-label="Instagram">' + icon("i-instagram") + "</a>" +
            '<a href="https://x.com/TeruelCd" target="_blank" rel="noopener" aria-label="X">' + icon("i-x") + "</a>" +
            '<a href="https://www.youtube.com/@CD.Teruel" target="_blank" rel="noopener" aria-label="YouTube">' + icon("i-youtube") + "</a>" +
            '<a href="https://www.tiktok.com/@cd.teruel" target="_blank" rel="noopener" aria-label="TikTok">' + icon("i-tiktok") + "</a>" +
            '<a href="https://www.facebook.com/clubdeportivoTeruel" target="_blank" rel="noopener" aria-label="Facebook">' + icon("i-facebook") + "</a>" +
          "</div>" +
          '<div class="footer__apps">' +
            '<a class="app-badge" href="#"><small>Descárgala en</small><strong>App Store</strong></a>' +
            '<a class="app-badge" href="#"><small>Disponible en</small><strong>Google Play</strong></a>' +
          "</div>" +
        "</div>" +
        '<div class="footer__cols">' + cols + "</div>" +
      "</div>";
    --- FIN BLOQUE OCULTO --- */

    return '' +
    '<footer class="footer">' +
      '<div class="wrap footer__legal">' + legal + "</div>" +
      '<div class="wrap footer__copy">' +
        "<span>© " + new Date().getFullYear() + " Club Deportivo Teruel. Todos los derechos reservados.</span>" +
        '<span>C/ Juez Villanueva, 1 · 44001 Teruel · Tel. <a href="tel:+34978622074">978 622 074</a></span>' +
      "</div>" +
    "</footer>";
  }

  // Subnav de equipo: enlaza entre las páginas reales de cada equipo.
  // data-team = "primer-equipo" | "femenino" | "juvenil"; data-sec = sección activa.
  var TEAM_BASE = {
    "primer-equipo": "primer-equipo",
    "femenino": "femenino",
    "juvenil": "juvenil"
  };
  function teamNavHTML(team, sec) {
    var base = TEAM_BASE[team] || "primer-equipo";
    var items = [
      ["plantilla", "Plantilla", base + "-plantilla.html"],
      ["cuerpo", "Cuerpo técnico", base + "-plantilla.html"],
      ["partidos", "Partidos", base + ".html"],
      ["clasificacion", "Clasificaciones", base + "-clasificacion.html"],
      ["noticias", "Noticias", base + "-noticias.html"]
    ];
    var links = items.map(function (it) {
      var cur = it[0] === sec ? ' aria-current="page"' : "";
      return '<a href="' + it[2] + '"' + cur + '>' + it[1] + "</a>";
    }).join("");
    return '<nav class="subnav" aria-label="Secciones del equipo"><div class="wrap"><div class="subnav__inner">' + links + "</div></div></nav>";
  }

  // Inyectar sprite de iconos inline al principio del body
  var spriteHost = document.createElement("div");
  spriteHost.style.cssText = "position:absolute;width:0;height:0;overflow:hidden";
  spriteHost.innerHTML = SPRITE;
  document.body.insertBefore(spriteHost, document.body.firstChild);

  // Inyección de partials
  document.querySelectorAll("[data-partial]").forEach(function (el) {
    var type = el.getAttribute("data-partial");
    if (type === "header") el.outerHTML = headerHTML(el.getAttribute("data-active") || "");
    else if (type === "sponsors") el.outerHTML = sponsorsHTML();
    else if (type === "footer") el.outerHTML = footerHTML();
    else if (type === "teamnav") el.outerHTML = teamNavHTML(el.getAttribute("data-team") || "primer-equipo", el.getAttribute("data-sec") || "");
  });

  // avisar a main.js que el DOM de partials ya está
  document.dispatchEvent(new CustomEvent("partials:ready"));
})();
