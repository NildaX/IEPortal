$(document).ready(function () {
    var inicio = $("#inicio").offset().top,
        metodo = $("#caracteristicas").offset().top,
        precios = $("#precios").offset().top,
        nosotros = $("#nosotros").offset().top;

    $("#btn-inicio").on("click", function (e) {
        e.preventDefault();
        $("html, body").animate(
            {
                scrollTop: inicio,
            },
            500
        );
    });

    $("#btn-caracteristicas").on("click", function (e) {
        e.preventDefault();
        $("html, body").animate(
            {
                scrollTop: metodo,
            },
            500
        );
    });

    $("#btn-precios").on("click", function (e) {
        e.preventDefault();
        $("html, body").animate(
            {
                scrollTop: precios,
            },
            500
        );
    });
    $("#btn-nosotros").on("click", function (e) {
        e.preventDefault();
        $("html, body").animate(
            {
                scrollTop: nosotros,
            },
            500
        );
    });

    $("#btn-caracteristicas2").on("click", function (e) {
        e.preventDefault();
        $("html, body").animate(
            {
                scrollTop: metodo,
            },
            500
        );
    });
    $("#btn-precios2").on("click", function (e) {
        e.preventDefault();
        $("html, body").animate(
            {
                scrollTop: precios,
            },
            500
        );
    });

    $("#seleccionpais").on("change", function () {
        if (this.value == "1") {
            $("#botonmex").show();
            $("#botonusa").hide();
        }
        if (this.value == "2") {
            $("#botonmex").hide();
            $("#botonusa").show();
        }
    });
});
