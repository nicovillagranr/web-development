import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./scss/main.scss";

// Validación nativa de Bootstrap (needs-validation).
// Marca el form como validado al hacer submit y bloquea si hay campos inválidos.
document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll("form.needs-validation");
  forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        event.preventDefault();
        form.reset();
        form.classList.remove("was-validated");
        const toast = document.getElementById("contactToast");
        if (toast) bootstrap.Toast.getOrCreateInstance(toast).show();
        return;
      }
      form.classList.add("was-validated");
    });
  });
});
