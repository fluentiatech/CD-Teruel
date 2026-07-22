# Web CD Teruel

Prototipo de la web oficial del **Club Deportivo Teruel**, construido con HTML, CSS y JavaScript vanilla (sin dependencias ni build). Sigue el patrón de arquitectura de información de las webs de clubes profesionales.

## Estructura

```
index.html              Portada (hero de bienvenida en Pinilla)
primer-equipo.html      Hub del Primer Equipo (partidos + clasificación)
primer-equipo-*.html    Plantilla · Clasificación · Noticias
femenino*.html          Sección femenina (mismas secciones)
juvenil*.html           Cantera / Juvenil A (mismas secciones)
transparencia.html      Portal de Transparencia (estatutos, organigrama, presupuesto, auditoría, contacto)
legal.html              Aviso legal · Privacidad (RGPD) · Cookies · Accesibilidad
contacto.html           Formulario de contacto con consentimiento RGPD
partido.html            Ficha de partido (previa/crónica)
noticia(s).html         Listado y detalle de noticias
jugador.html            Ficha de jugador

css/                    Sistema de diseño (styles, components, team, legal, forms, mobile)
js/                     partials (header/footer), i18n (ES/EN/FR), cookies, forms, main
assets/                 Escudo, iconos SVG, logos de patrocinadores
data/                   club.config.json (datos del club)
```

## Características

- **Identidad**: colores rojo y azul marino del escudo real del club; tipografía Cinzel (titulares) + Barlow (texto).
- **Multiidioma**: selector ES / EN / FR que traduce la interfaz al vuelo.
- **RGPD / legal**: banner de cookies con consentimiento real (bloquea Google Analytics hasta aceptar), documentos legales con los datos del club y consentimiento en formularios.
- **Responsive**: optimizado para móvil, sin scroll horizontal.

## Despliegue en GitHub Pages

Al ser un sitio estático, se publica directamente:

1. En el repositorio: **Settings → Pages**.
2. **Source**: `Deploy from a branch`.
3. **Branch**: `main` · carpeta `/ (root)`.
4. Guardar. La web quedará disponible en `https://fluentiatech.github.io/CD-Teruel/`.

## Pendiente para producción

- Sustituir las imágenes de ejemplo (`picsum.photos`) por fotos reales del club.
- Poner el ID real de Google Analytics en `js/cookies.js` (`GA_ID`).
- Validar los textos legales con un asesor jurídico.
- Conectar los datos de competición (calendario/clasificación) a una fuente real.
