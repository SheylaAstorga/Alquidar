
const pasos = document.querySelectorAll(".paso-interactivo");

pasos.forEach(function(paso) {

    paso.addEventListener("click", function() {

        paso.classList.toggle("activo");

    });

});

const navbar = document.querySelector(".navbar");
const enlacesNavbar = document.querySelectorAll("#menuPrincipal .nav-link");

const secciones = [...enlacesNavbar]
    .map(function (enlace) {
        return document.querySelector(enlace.getAttribute("href"));
    })
    .filter(function (seccion) {
        return seccion !== null;
    });

if (navbar && secciones.length > 0) {
    function actualizarNavbar() {
        let seccionActiva = secciones[0];

        secciones.forEach(function (seccion) {
            const distanciaSuperior = seccion.getBoundingClientRect().top;

            if (distanciaSuperior <= navbar.offsetHeight + 20) {
                seccionActiva = seccion;
            }
        });

        enlacesNavbar.forEach(function (enlace) {
            enlace.classList.remove("active");
            enlace.removeAttribute("aria-current");        
        });

        const enlaceActivo = document.querySelector(
            `#menuPrincipal .nav-link[href="#${seccionActiva.id}"]`
        );

        if (enlaceActivo) {
            enlaceActivo.classList.add("active");
            enlaceActivo.setAttribute("aria-current", "page");
        }
        
        navbar.classList.toggle("navbar-con-scroll", window.scrollY > 10);
    }
    
    window.addEventListener("scroll", actualizarNavbar);
    window.addEventListener("resize", actualizarNavbar);

    actualizarNavbar();
}


const filtrosServicios = document.getElementById("filtrosServicios");
const gridServicios = document.getElementById("gridServicios");

if (filtrosServicios && gridServicios){

    const botonesFiltro = filtrosServicios.querySelectorAll("button");
    const tarjetasServicios = gridServicios.querySelectorAll(".servicio");

    botonesFiltro.forEach(function(boton) {

        boton.addEventListener("click", function(){

            const filtro = boton.dataset.filtro;

            botonesFiltro.forEach (function (otroBoton){
                otroBoton.classList.remove("btn-alquidar");
                otroBoton.classList.add("btn-outline-alquidar-light");
                otroBoton.setAttribute("aria-pressed", "false");
            });

            boton.classList.remove ("btn-outline-alquidar-light");
            boton.classList.add("btn-alquidar");
            boton.setAttribute("aria-pressed", "true");

            tarjetasServicios.forEach(function(tarjeta) {

                const coincide = filtro === "todos" || tarjeta.dataset.categoria === filtro;

                tarjeta.classList.toggle("d-none", !coincide);
            });
        });
    });


}

const togglePrecios = document.querySelector("#togglePrecios");
const labelMensual = document.querySelector("#labelMensual");
const labelAnual = document.querySelector("#labelAnual");

const preciosCards = document.querySelectorAll(".card-precio h3[data-mensual]");

const formatoPesos = new Intl.NumberFormat("es-AR");

togglePrecios.addEventListener("change", function () {

    const esAnual = togglePrecios.checked;

    preciosCards.forEach(function (precioEl) {

        const contenedor = precioEl.closest(".precio-caja");
        const periodoEl = precioEl.querySelector("span");
        const promoBox = contenedor.querySelector(".promo-anual");
        const precioAnteriorEl = promoBox.querySelector(".precio-anterior");
        const notaMensual = contenedor.querySelector(".nota-mensual");

        const valorMensual = Number(precioEl.dataset.mensual);
        const valorAnual = Number(precioEl.dataset.anual);
        const valorSinDescuento = valorMensual * 12; 

        if (esAnual) {
            precioEl.firstChild.textContent = "$" + formatoPesos.format(valorAnual);
            periodoEl.textContent = "/año";

            precioAnteriorEl.textContent = "$" + formatoPesos.format(valorSinDescuento);
            promoBox.classList.remove("d-none");
            notaMensual.classList.add("d-none");
        } else {
            precioEl.firstChild.textContent = "$" + formatoPesos.format(valorMensual);
            periodoEl.textContent = "/mes";

            promoBox.classList.add("d-none");
            notaMensual.classList.remove("d-none");
        }
    });

    if (esAnual) {
        labelAnual.classList.replace("opacity-50", "opacity-100");
        labelAnual.classList.replace("fw-semibold", "fw-bold");

        labelMensual.classList.replace("opacity-100", "opacity-50");
        labelMensual.classList.replace("fw-bold", "fw-semibold");
    } else {
        labelMensual.classList.replace("opacity-50", "opacity-100");
        labelMensual.classList.replace("fw-semibold", "fw-bold");

        labelAnual.classList.replace("opacity-100", "opacity-50");
        labelAnual.classList.replace("fw-bold", "fw-semibold");
    }
});




const formulario = document.querySelector("#formulario-contacto");

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

    if (nombre.length < 2) {
        document.querySelector("#error-nombre").textContent = "❌ El nombre debe tener al menos 2 caracteres.";
        document.querySelector("#contacto-nombre").classList.add("is-invalid");
        return;
    }

    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/.test(nombre) || /\s{2,}/.test(nombre)) {
        document.querySelector("#error-nombre").textContent = "❌ El nombre solo puede contener letras y no permite espacios repetidos.";
        document.querySelector("#contacto-nombre").classList.add("is-invalid");
        return;
    }

    if (email === "") {
        document.querySelector("#error-email").textContent = "❌ Completá con tu email, por favor..";
        document.querySelector("#contacto-email").classList.add("is-invalid");
        return;
    }
    
    if (!/^[a-zA-Z0-9](?:[a-zA-Z0-9.]*)[a-zA-Z0-9]@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/.test(email) || email.includes("..")) {
        document.querySelector("#error-email").textContent = "❌ Ingresá un email válido, por favor..";
        document.querySelector("#contacto-email").classList.add("is-invalid");
        return;
    } /*Ingrese estos caracteres para validar el email del formulario*/

    if (mensaje === "") {
        document.querySelector("#error-mensaje").textContent = "❌ Completá con un mensaje, por favor..";
        document.querySelector("#contacto-mensaje").classList.add("is-invalid");
        return;
    }

    if (mensaje.length < 10) {
        document.querySelector("#error-mensaje").textContent = "❌ El mensaje debe tener al menos 10 caracteres.";
        document.querySelector("#contacto-mensaje").classList.add("is-invalid");
        return;
    }

    document.querySelector("#mensaje-exito").textContent = "Listo. ¡Mensaje enviado correctamente! Muchas gracias.";
    document.querySelector("#formulario-contacto").reset();

    setTimeout(function() {
    
    document.querySelector("#mensaje-exito").textContent = "";
}, 4000);
});

