<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro Alumnos | International English</title>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../shared/css/header.css">
    <link rel="stylesheet" href="../shared/css/styles.css">
    <link rel="icon" href="../shared/assets/img/imagotipo.ico" />
</head>
<body>
        <div class="container-fluid px-0">
            <?php require '../shared/header.php'?>
        </div>
        

        <div class="container-fluid fondo fondo--profesor">
            <div class="row">
                <div class="col">
                    <div class="contenedor">
                        <div class="titulo">
                            <h1>Registro Profesores</h1>
                        </div>
                        <form method="post" id="formulario" name="formulario" class="formulario">
               
                                <input type="text" name="nombre" placeholder="Nombre" id="nombre" class="formulario__input">
                                <input type="text" name="apellidop" placeholder="Apellido Paterno" id="apellidop" class="formulario__input">
                                <input type="text" name="apellidom" placeholder="Apellido Materno" id="apellidom" class="formulario__input">
                                <input type="email" name="correo" placeholder="Correo" id="correo" class="formulario__input">
                                <input type="password" name="password1" placeholder="Ingresa una contraseña" id="password1" class="formulario__input">
                                <input type="password" name="password2" placeholder="Repita la contraseña" id="password2" class="formulario__input">
                                <input type="tel" name="telefono" placeholder="Teléfono (opcional)" id="telefono" pattern="[0-9]{10}" title="Un numero de telefono valido consiste en 10 digitos" class="formulario__input">
                                <input type="number" name="edad" placeholder="Edad" id="edad" min="10" max="90" class="formulario__input">
                                <div class="formulario__sexo">
                                    <input type="radio" name="sexo" id="hombre" value="hombre" class="formulario__input-radio">
                                    <label for="hombre" class="formulario__label-radio formulario__label-radio--hombre">Hombre</label>
                                    <input type="radio" name="sexo" id="mujer" value="mujer" class="formulario__input-radio">
                                    <label for="mujer" class="formulario__label-radio formulario__label-radio--mujer">Mujer</label>
                                </div>

                                <ul class="alert alert-danger" id="error" style="display: none"></ul>
                                <div class='col-md-12' id="resultados"></div><!-- Carga los datos ajax -->

                            <input type="submit" value="Registrarse" class="boton">
                        </form>
                    </div>
                </div>  
            </div>
        </div>

    <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns" crossorigin="anonymous"></script>
    <script src="js/valida-registro-profesor.js"></script>
</body>
</html>