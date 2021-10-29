<?php session_start(); ?>
<?php if(!$_SESSION){header("Location: ../shared/login");} ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ejercicios | International English</title>
    <link rel="preconnect" href="https://fonts.gstatic.com">
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../shared/css/header.css">
    <link rel="stylesheet" href="../shared/css/styles.css">
    <link rel="icon" href="../shared/assets/img/imagotipo.ico" />
    
</head>
<body class="cuerpo">
	<div class="container-fluid px-0">
        <?php require '../shared/header.php'?>
    </div>
	<div class="row titulo centrado">
		<h1>Ejercicios</h1>
	</div>
    <div class="container-fluid">		
	<form method="POST" id="examen" enctype="multipart/form-data-" class="formulario contenedor contenedor--grande contenedor--sombra">
			<div class="progress">
  				<div class="progress-bar progress-bar-striped progress-bar-animated" 
			  role="progressbar" valor=0; style="width: 0%" id="barra"></div>
			</div>
			<div id="instruccion" class="my-2 row d-flex justify-content-center">
			</div>
			<div id= "espacio_pregunta_1" style="display: none;" name="espacio_pregunta_1"></div>
			<div id= "espacio_pregunta" name="espacio_pregunta"></div>
			<div class="row" id="resp" name="resp"></div>
	 		<div class="row m-auto" style="display: none; max-width: 70vw;" id="retroalimentacion"></div>
			<div class="row mt-2">
				<div class="col-6 Enviar" id="Enviar">
					<input type="button" id="benviar" name="benviar" class="boton mb-2 ml-2 mr-2" value="Enviar" >
				</div>
				<div class="col-6" style="display: none;" id="Siguiente">
					<input type="button" id="bsiguiente" name="bsiguiente" class="boton mb-2 ml-2 mr-2" value="Siguiente" >
				</div>
			</div>
			<div  clas="mt-2 mx-auto" style="display: none;" id="espacio_video"></div>	 	
    </form> 
	</div>
	<script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns" crossorigin="anonymous"></script>
	<script src="../shared/js/Sortable.min.js"></script>
	<script src="js/verbos_j.js"></script>
</body>  
</html>