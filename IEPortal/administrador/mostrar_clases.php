<?php session_start(); ?>
<?php if(!$_SESSION || $_SESSION['type']!="Administrador"){header("Location: ../shared/login");} ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mostrar clases | International English</title>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600&display=swap" rel="stylesheet">
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" 
	integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" 
	crossorigin="anonymous">
	<link rel="stylesheet" href="../shared/uicons-regular-rounded/css/uicons-regular-rounded.css">
	<link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
	<link rel="stylesheet" href="../shared/css/header.css">
	<link rel="stylesheet" href="../shared/css/styles.css">
    <link rel="icon" href="../shared/assets/img/imagotipo.ico" />
	<title>International English | Mostrar clases </title>
</head>
<div class="modal" tabindex="-1" id="Modal_agregarT" role="dialog" >
<div class="modal-dialog modal-dialog-scrollable" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" >Agregar clase</h5>
        <button type="button"  id="botonQuitar3" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
        <div class="modal-body" >
			<p class="formulario__parrafo">Tipo de clase</p>
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
			<div id="resultados_agregar">
			</div>
		</div>
      <div class="modal-footer">
        <button type="button" id="botonQuitar4" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
		<button type="button" id="botonAgregar" class="open-Modal btn btn-primary" data-toggle="modal">
         Agregar
         </button>
      </div>
    </div>
</div>
</div>
<div class="modal" tabindex="-1" id="Modal_cambiarprofesor" role="dialog" >
<div class="modal-dialog modal-dialog-scrollable" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" >Cambiar profesor asignado</h5>
        <button type="button"  id="botonQuitar1" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
        <div class="modal-body" >
			<select name="select" id="profesor_a2" class="formulario__input">
				<option elected="true" value="0" disabled="disabled" selected>Seleccione un profesor</option>				
			</select>
			<br>
			<div id="resultados_cambiarprofesor">
			</div>
		</div>
      <div class="modal-footer">
        <button type="button" id="botonQuitar2" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
		<button type="button" id="botonCambiar" class="open-Modal btn btn-primary" data-toggle="modal">
         Cambiar
         </button>
      </div>
    </div>
</div>
</div>
<div class="modal" tabindex="-1" id="Modal_cambiarclase" role="dialog" >
<div class="modal-dialog modal-dialog-scrollable" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" >Cambiar clase asignada</h5>
        <button type="button"  id="botonQuitar5" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
        <div class="modal-body" >
			<select name="select" id="clases_para_cambiar" class="formulario__input">
				<option elected="true" value="0" disabled="disabled" selected>Seleccione una clase</option>				
			</select>
			<div id="resultados_cambiar_clase">
			</div>
		</div>
      <div class="modal-footer">
        <button type="button" id="botonQuitar6" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
		<button type="button" id="botonCambiarC" class="open-Modal btn btn-primary" data-toggle="modal">
         Cambiar
         </button>
      </div>
    </div>
</div>
</div>
<body class="cuerpo">
        <div class="container-fluid px-0">
			<?php require '../shared/header.php'?>
        </div>
		<div class="row titulo centrado">
			<h1>Mostrar clases</h1>
		</div>
		
		<div class="contenedor contenedor--grande contenedor--sombra animate__animated animate__fadeIn contenedor--minimo">
      <div class="container">

        <div class="row pt-2">
          <div class="col-md-4">
            <strong>Seleccione el profesor para mostrar sus clases</strong>
          </div>
          <div class="col-md-4">
            <select name="select" id="select_profesor" class="formulario__input centrado" >
				    <option selected="true" value="0" disabled="disabled" selected >Seleccione un profesor</option>						
			</select>
          </div>
          <div class="col-md-4">
            <button type="button" id="Agregar" class="boton">
            <i class="fi fi-rr-add"></i>
			      Agregar nueva clase
			      </button>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <table id="tabla_mostrarclases" class="table table-bordered table-condensed table-sm table-responsive-md"></table>
          </div>
        </div>
        
        <div class="row">
          <div class="col">
            <div id="alumnos"  style="display: none;">
			        <table id="tabla_alumnos" class="table table-bordered table-striped table-condensed p-3"">
			        </table>
			      </div>
          </div>
        </div>

      </div>
		</div>
		<script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns" crossorigin="anonymous"></script>
	<script src="js/mostrar_clases.js"></script>
	
	
</body>
</html>
