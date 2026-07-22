/* =========================================================================
   CD TERUEL — Validación de formularios con consentimiento RGPD
   Exige checkbox de consentimiento (no premarcado) antes de enviar.
   Prototipo: no envía datos a ningún servidor, solo valida y confirma.
   ========================================================================= */
(function () {
  "use strict";

  function init() {
    document.querySelectorAll("[data-consent-form]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var ok = true;

        // Campos requeridos
        form.querySelectorAll("input[required], textarea[required]").forEach(function (el) {
          if (el.type === "checkbox") return; // el consentimiento se valida aparte
          var field = el.closest(".field");
          var valid = el.value.trim() !== "" && (el.type !== "email" || /.+@.+\..+/.test(el.value));
          if (field) field.classList.toggle("has-error", !valid);
          if (!valid) ok = false;
        });

        // Consentimiento RGPD obligatorio
        var consentBox = form.querySelector('.consent input[type="checkbox"]');
        var consent = form.querySelector(".consent");
        if (consentBox) {
          var granted = consentBox.checked;
          if (consent) consent.classList.toggle("has-error", !granted);
          if (!granted) ok = false;
        }

        if (!ok) {
          var firstErr = form.querySelector(".has-error input, .has-error textarea, .consent.has-error input");
          if (firstErr) firstErr.focus();
          return;
        }

        // Éxito (demostración)
        var okMsg = form.querySelector(".form-ok");
        if (okMsg) okMsg.hidden = false;
        form.querySelectorAll("input, textarea, button").forEach(function (el) {
          if (el.type !== "submit") el.value = el.type === "checkbox" ? (el.checked = false) : "";
        });
      });

      // Limpiar error al corregir
      form.addEventListener("input", function (e) {
        var field = e.target.closest(".field");
        if (field) field.classList.remove("has-error");
        if (e.target.type === "checkbox") {
          var c = e.target.closest(".consent");
          if (c && e.target.checked) c.classList.remove("has-error");
        }
      });
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
