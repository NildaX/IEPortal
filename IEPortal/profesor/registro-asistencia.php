<?php session_start(); ?>
<?php if(!$_SESSION || $_SESSION['type']!="Profesor"){header("Location: ../shared/login");} ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro Asistencia | International English</title>
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
	<title>International English | Registro Asistencia </title>
</head>
<body class="cuerpo">
        <div class="container-fluid px-0">
			<?php require '../shared/header.php'?>
        </div>
		<div class="row titulo centrado">
			<h1>Reporte asistencia</h1>
		</div>
		
		<div class="contenedor contenedor--grande contenedor--minimo contenedor--sombra animate__animated animate__fadeIn">
			<div class="container centrado">
				<div class="row pt-5">
					<div class="col-sm-12 col-md-4">
						<p class="formulario__parrafo">Reportar por:</p>
					</div>
					<div class="col-sm-12 col-md-4">
						<div>
							<input type="radio" id="grupo" name="tipo" value="grupo" class="formulario__input">
							<label for="grupo" class="respuesta">Clase</label><br>
						</div>
					</div>
					<div class="col-sm-12 col-md-4">
						<div>
							<input type="radio" id="alumno" name="tipo" value="alumno" class="formulario__input ">
							<label for="alumno" class="respuesta">Alumno</label><br>	
						</div>
					</div>
					
					
						
					
					
					
				</div>
			<select name="select" id="clase_alumno" style="display: none;" class="formulario__input">
				<option value="primera" selected>---</option>		
			</select>
			<select name="select" id="clase_" style="display: none;" class="formulario__input" >
				<option value="primera" selected>---</option>		
			</select>
			<div class="row">
				<p class="formulario__parrafo">Rango de fechas:</p>
				<input type="date" name="fecha" id="inicio" class="formulario__input formulario__input--chico" >
				-
				<input type="date" name="fecha" id="final" class="formulario__input formulario__input--chico" >
				<input type="button" id="dar_registro" name="dar_registro" class="boton ml-2 mr-2 mb-2" value="Mostrar registro">	
				</div>
			
			<div id="resultados" style="display: none;">
			</div>
			<div>
			<br>
			<br>
			<table id="alumnos_tabla" class="table table-bordered table-striped table-condensed">
			</table>
			</div>
				</div>
			</div>
			
			
		</div>
		<script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns" crossorigin="anonymous"></script>
	<script src="js/registro.js"></script>
	
	
</body>
</html>
