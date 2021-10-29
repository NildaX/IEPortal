<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Iniciar Sesión | International English</title>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/header.css">
    <link rel="stylesheet" href="css/styles.css">
    <link rel="icon" href="assets/img/imagotipo.ico" />
</head>
<body class="cuerpo">
        <div class="container-fluid px-0">
            <?php require './header.php'?>
        </div>
        <div class="container-fluid fondo fondo--login">
            <div class="row">
                <div class="col">
                    <div class="contenedor contenedor--espaciado-superior">
                        <div class="titulo">
                            <h1>Inicia Sesión</h1>
                        </div>
                        <div class="formulario">
                            <input type="email" name="correo" placeholder="Correo" id="correo" class="formulario__input">
                            <input type="password" name="password" placeholder="Ingresa tu contraseña" id="password" class="formulario__input">
                            <a href="recuperar_contra.php" class="formulario__link">¿Olvidaste tu contraseña?</a>
                            <ul id="error" class="alert alert-danger" style="display: none"></ul>
                            <button id="valida" name="valida" class="boton">Iniciar sesión</button>
                        </div>
                    </div>
                </div>  
            </div>
        </div>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns" crossorigin="anonymous"></script>
    <script src="js/verificacion-login.js"></script>
</body>
</html>
 