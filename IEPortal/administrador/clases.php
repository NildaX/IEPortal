<?php session_start(); ?>
<?php if(!$_SESSION || $_SESSION['type']!="Administrador"){header("Location: ../shared/login");} ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Clases | International English</title>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600&display=swap" rel="stylesheet">
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" 
	integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" 
	crossorigin="anonymous">
	<link rel="stylesheet" href="../shared/uicons-regular-rounded/css/uicons-regular-rounded.css">
	<link>
	<link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
	<link rel="stylesheet" href="../shared/css/header.css">
	<link rel="stylesheet" href="../shared/css/styles.css">
    <link rel="icon" href="../shared/assets/img/imagotipo.ico" />
	<title>International English | Clases </title>
</head>
<body class="cuerpo">
        <div class="container-fluid px-0">
			<?php require '../shared/header.php'?>
        </div>
		<div class="row titulo centrado">
			<h1>Clases</h1>
		</div>

		<ul class="nav nav-tabs" id="myTab" role="tablist">
  			<li class="nav-item" role="presentation">
    			<a class="nav-link " id="alumnos-tab" data-toggle="tab" href="#alumnos_tabd" role="tab" aria-controls="alumnos_tabd" aria-selected="true"><i class="fi  fi-rr-user"></i> Alumnos</a>
  			</li>
  			<li class="nav-item" role="presentation">
    			<a class="nav-link active" id="grupo-tab" data-toggle="tab" href="#grupo" role="tab" aria-controls="Grupo" aria-selected="false"><i class="fi  fi-rr-users"></i> Grupo</a>
  			</li>
		</ul>
			<div class="tab-content" id="myTabContent">
  				<div class="tab-pane fade " id="alumnos_tabd" role="tabpanel" aria-labelledby="alumnos-tabd">
				<?php 
				include("alumnos.php") ?>
				</div>
  				<div class="tab-pane fade show active" id="grupo" role="tabpanel" aria-labelledby=grupo-tab style="background-color:rgba(0, 0, 0, 0.0);">
				<?php include("grupos.php") ?>
				</div>
  				
			</div>
<!-- 		
		<div class="contenedor contenedor--grande contenedor--sombra animate__animated animate__fadeIn">
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
				<div class="d-flex">
					<select name="select" id="tipodegrafica" class="formulario__input">
						<option value="0" selected>No ver nada</option>
  						<option value="preguntas">Preguntas</option>
  						<option value="verbos" >Verbos</option>			
					</select>
					<select name="temas" id="numerotema" style="display: none;" class="formulario__input">
						<option value="0" selected>Selecciona un Tema</option>
					</select>

					<button class="boton" id="generar">Generar Gráfica</button> -->
				<!-- </div>
			
				<div class="chart-container centrado" id="chart-container" style="position: relative; width:80vw">
        			<canvas id="myChart" ></canvas>
    			</div>
			</div>
		</div> -->

	<script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns" crossorigin="anonymous"></script>
    <!-- <script src="js/chart.min.js"></script>
	<script src="js/clases_funcion.js"></script>
</body> -->
</html>
