<?php session_start(); ?>
<?php if(!$_SESSION || $_SESSION['type']!="Profesor"){header("Location: ../shared/login");} ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pase de lista | International English</title>
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
	<title>International English | Pase de lista </title>
</head>
<body class="cuerpo">
        <div class="container-fluid px-0">
			<?php require '../shared/header.php'?>
        </div>
		<div class="row titulo centrado">
			<h1>Clases</h1>
		</div>
		
		<div class="contenedor contenedor--grande contenedor--sombra contenedor--minimo animate__animated animate__fadeIn">
			  <div class="table-responsive">
			  <table  id="tabla_clases" class="table table-bordered table-striped table-condensed" >
			  <tr>
			  <th >Tipo de clase</th>
			  <th>Dias asignados</th>
			  <th>Horario</th>
			  <th>---</th>
			  </tr>
			  </table>
			  </div>
			<div id="alumnos"  style="display: none;">
			<table id="tabla_alumnos" class="table table-bordered table-striped table-condensed">
			</table>
			</div>
			<div id="graficas"  style="display: none;">
			</div>
			<div id="error_dia"  style="display: none;">
			</div>
			<input type="button" style="display: none;" id="pasar_lista" name="pasar_lista" class="boton" value="Terminar">
		</div>
		<script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns" crossorigin="anonymous"></script>
	<script src="js/pasar_lista.js"></script>
	
	
</body>
</html>