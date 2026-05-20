document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const tipoSolicitud = document.getElementsByName("tipo_solicitud");
    const fecha = document.getElementById("fecha");
    const hora = document.getElementById("hora");
    const duracion = document.getElementById("duracion");
    const nombre = document.getElementById("nombre");
    const email = document.getElementById("email");
    const telefono = document.getElementById("telefono");
    const adultos = document.getElementById("adultos");
    const menores = document.getElementById("menores");
    const aceptaContacto = document.querySelector("input[name='acepta_contacto']");
    const terminos = document.querySelector("input[name='terminos']");
    const privacidad = document.querySelector("input[name='privacidad']");
    const observaciones = document.getElementById("observaciones");
  
    // Validación al enviar el formulario
    form.addEventListener("submit", (e) => {
      e.preventDefault(); // Evita el envío por defecto
      let errores = [];
  
      // Validar tipo de solicitud
      if (![...tipoSolicitud].some((radio) => radio.checked)) {
        errores.push("Debes seleccionar un tipo de solicitud.");
      }
  
      // Validar fecha
      const fechaSeleccionada = new Date(fecha.value);
      const hoy = new Date();
      if (!fecha.value || fechaSeleccionada < hoy) {
        errores.push("La fecha debe ser válida y no puede ser pasada.");
      }
  
      // Validar hora
      if (!hora.value) {
        errores.push("Debes ingresar una hora válida.");
      }
  
      // Validar nombre
      if (nombre.value.trim().length < 5) {
        errores.push("El nombre debe tener al menos 5 caracteres.");
      }
  
      // Validar email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value)) {
        errores.push("Debes ingresar un correo electrónico válido.");
      }
  
      // Validar teléfono
      const telefonoRegex = /^[0-9+\s-]{8,}$/;
      if (!telefonoRegex.test(telefono.value)) {
        errores.push("El teléfono debe ser válido y contener al menos 8 dígitos.");
      }
  
      // Validar cantidad de adultos
      if (adultos.value < 1 || adultos.value > 200) {
        errores.push("La cantidad de adultos debe estar entre 1 y 200.");
      }
  
      // Validar menores
      if (menores.value && parseInt(menores.value) > parseInt(adultos.value)) {
        errores.push("La cantidad de menores no puede superar la de adultos.");
      }
  
      // Validar checkboxes obligatorios
      if (!aceptaContacto.checked) {
        errores.push("Debes aceptar que BuenSabor se contacte contigo.");
      }
      if (!terminos.checked) {
        errores.push("Debes aceptar los Términos y Condiciones.");
      }
      if (!privacidad.checked) {
        errores.push("Debes aceptar la Política de Privacidad.");
      }
  
      // Mostrar errores o enviar formulario
      if (errores.length > 0) {
        mostrarErrores(errores);
      } else {
        mostrarConfirmacion();
      }
    });
  
    // Función para mostrar errores
    function mostrarErrores(errores) {
      const errorContainer = document.createElement("div");
      errorContainer.classList.add("error-container");
      errorContainer.innerHTML = `
        <h3>Se encontraron los siguientes errores:</h3>
        <ul>
          ${errores.map((error) => `<li>${error}</li>`).join("")}
        </ul>
      `;
      form.prepend(errorContainer);
  
      // Eliminar errores después de 5 segundos
      setTimeout(() => {
        errorContainer.remove();
      }, 5000);
    }
  
    // Función para mostrar confirmación
    function mostrarConfirmacion() {
      form.innerHTML = `
        <div class="confirmacion">
          <h2>¡Solicitud enviada con éxito!</h2>
          <p>Gracias por confiar en BuenSabor. Nos pondremos en contacto contigo pronto.</p>
          <p>Tipo de solicitud: ${[...tipoSolicitud].find((radio) => radio.checked).value}</p>
          <p>Fecha: ${fecha.value}</p>
          <p>Hora: ${hora.value}</p>
          <p>Número de solicitud: #${Math.floor(Math.random() * 100000)}</p>
          <a href="index.html" class="btn">Volver al inicio</a>
        </div>
      `;
    }
  });