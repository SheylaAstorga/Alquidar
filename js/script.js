
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

// Variables: referencias a los elementos del DOM que vamos a usar
const togglePrecios = document.querySelector("#togglePrecios");
const labelMensual = document.querySelector("#labelMensual");
const labelAnual = document.querySelector("#labelAnual");

// Todas las cards de precio tienen un h3 con data-mensual y data-anual
const preciosCards = document.querySelectorAll(".card-precio h3[data-mensual]");

// Formateador para mostrar $17.900 en vez de $17900
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
        const valorSinDescuento = valorMensual * 12; // precio anual "de lista", sin el 20%

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

