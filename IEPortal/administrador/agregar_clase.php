<?php session_start(); ?>
<?php if(!$_SESSION || $_SESSION['type']!="Administrador"){header("Location: ../shared/login");} ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Agregar Clase | International English</title>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600&display=swap" rel="stylesheet">
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" 
	integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" 
	crossorigin="anonymous">
	<link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
	<link rel="stylesheet" href="../shared/css/header.css">
	<link rel="stylesheet" href="../shared/css/styles.css">
    <link rel="icon" href="../shared/assets/img/imagotipo.ico" />
	<title>International English | Agregar Clase </title>
</head>
<body class="cuerpo">
        <div class="container-fluid px-0">
			<?php require '../shared/header.php'?>
        </div>
		<div class="row titulo centrado">
			<h1>Agregar Clase</h1>
		</div>
		
		<div class="contenedor contenedor--grande contenedor--sombra animate__animated animate__fadeIn ">
		 <div class="container">
		 	<div class="row d-flex justify-content-center">
			 <p class="formulario__parrafo pt-5">Tipo de clase</p>
			<select name="select" id="tipo_clase" class="formulario__input">
				<option value="Gramatical" >Gramatical</option>	
				<option value="Conversacional" >Conversacional</option>					
			</select>
			<br>
			<p class="formulario__parrafo">Profesor asignado</p>
			<select name="select" id="profesor_a" class="formulario__input">
				<option elected="true" value="0" disabled="disabled" selected>Seleccione un profesor</option>				
			</select>
			<br>
			<p class="formulario__parrafo">Cantidad de días asignados</p>
			<select name="select" id="dias_a" class="formulario__input">
				<option selected="true" value="0" disabled="disabled">Seleccione una cantidad de días</option>	
				<option value="1" >1</option>	
				<option value="2" >2</option>	
				<option value="3" >3</option>	
				<option value="4" >4</option>	
				<option value="5" >5</option>	
			</select>
			<br>
			<div id="mostrar_dias">
			</div>
			<br>
			<div id="resultados">
			</div>
			<input type="button" id="reg_clase" name="reg_clase" class="boton mb-2 ml-2 mr-2" value="Registrar Clase">
			 </div>
		 </div>
			
			
		</div>
		<script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns" crossorigin="anonymous"></script>
	<script src="js/agregar_clase.js"></script>
	
	
</body>
</html>
