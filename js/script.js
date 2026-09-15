
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