
const pasos = document.querySelectorAll(".paso-interactivo");

pasos.forEach(function(paso) {

    paso.addEventListener("click", function() {

        paso.classList.toggle("activo");

    });

});
