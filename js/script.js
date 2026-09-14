const formulario = document.querySelector("form");

formulario.addEventListener("submit", function(event) {
    event.preventDefault(); 

    const nombre = document.querySelector("#contacto-nombre").value.trim();
    const email = document.querySelector("#contacto-email").value.trim().toLowerCase();
    const mensaje = document.querySelector("#contacto-mensaje").value.trim();

    document.querySelector("#error-nombre").textContent = "";
    document.querySelector("#error-email").textContent = "";
    document.querySelector("#error-mensaje").textContent = "";
    document.querySelector("#mensaje-exito").textContent = "";

    document.querySelector("#contacto-nombre").classList.remove("is-invalid");
    document.querySelector("#contacto-email").classList.remove("is-invalid");
    document.querySelector("#contacto-mensaje").classList.remove("is-invalid");

    if (nombre === "") {
        document.querySelector("#error-nombre").textContent = "❌ Completá con tu nombre, por favor..";
        document.querySelector("#contacto-nombre").classList.add("is-invalid");
        return;
    }

    if (email === "") {
        document.querySelector("#error-email").textContent = "❌ Completá con tu email, por favor..";
        document.querySelector("#contacto-email").classList.add("is-invalid");
        return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.querySelector("#error-email").textContent = "❌ Ingresá un email válido, por favor..";
        document.querySelector("#contacto-email").classList.add("is-invalid");
        return;
    } /*Ingrese estos caracteres para validar el email del formulario*/
    
    if (mensaje === "") {
        document.querySelector("#error-mensaje").textContent = "❌ Completá con un mensaje, por favor..";
        document.querySelector("#contacto-mensaje").classList.add("is-invalid");
        return;
    }

    if (nombre.length < 2) {
        document.querySelector("#error-nombre").textContent = "❌ El nombre debe tener al menos 2 caracteres.";
        document.querySelector("#contacto-nombre").classList.add("is-invalid");
        return;
    }

    if (mensaje.length < 10) {
        document.querySelector("#error-mensaje").textContent = "❌ El mensaje debe tener al menos 10 caracteres.";
        document.querySelector("#contacto-mensaje").classList.add("is-invalid");
        return;
    }

    document.querySelector("#mensaje-exito").textContent = "Listo. ¡Mensaje enviado correctamente! Muchas gracias.";
});