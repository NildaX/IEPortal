<?php session_start(); ?>
<!DOCTYPE html>
<html lang="en">
<head><meta charset="gb18030">
    
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mostrar temas | International English</title>
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
	<title>International English | Mostrar temas </title>
</head>
<!------------------------------------------------- Modal -------------------->
<div class="modal" tabindex="-1" id="Modal_eliminarT" role="dialog" >
<div class="modal-dialog modal-dialog-scrollable" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="titulo_habilitar">Deshabilitar Tema</h5>
        <button type="button"  id="botonQuitar1" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
        <div class="modal-body" >
		    <div id="confirmar">
			¿Esta seguro que desea deshabilitar este verbo?
			</div>
			<div id="resultados_modal">
			</div>
		</div>
      <div class="modal-footer">
        <button type="button" id="botonQuitar2" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
		<button type="button" id="botonEliminar" class="open-Modal btn btn-primary"  data-toggle="modal">
         Deshabilitar
         </button>
      </div>
    </div>
</div>
</div>


<div class="modal" tabindex="-1" id="Modal_agregarT" role="dialog" >
<div class="modal-dialog modal-dialog-scrollable" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" >Agregar Tema</h5>
        <button type="button"  id="botonQuitar3" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
        <div class="modal-body" >
			Ingrese el nombre del tema:
			<br>
			<input type="text" id="nuevo_ntema" required minlength="4" maxlength="500" class="formulario__input">
			<br>
			Ingrese el video del tema:
			<br>
			<input type="text" id="nuevo_videot" required minlength="4" maxlength="500" class="formulario__input">
			<br>
			Ingrese la imagen del tema:
			<br>
			<div style="text-align:center;" class="mt-1">
		        <label for="nueva_imagen_t" class="boton boton--pequeno centrado">
    				<i class="fi-rr-file-add"></i> Subir Foto
				</label>
		    <input class="centrado custom-file-upload" data-buttonText="Logo" type="file" id="nueva_imagen_t" name="nueva_imagen_t">
		    </div>
			<br>
			El orden en que se agregará:
			<br>
			<select  id="select_orden" class="formulario__input" >
				<option selected="true" value="0"  selected class="formulario__input formulario__input--chico2">Seleccione el orden</option>	
                <option  value="1"  class="formulario__input formulario__input--chico2">Al inicio</option>	
				<option  value="2"  class="formulario__input formulario__input--chico2">Al final</option>	
				<option  value="3"   class="formulario__input formulario__input--chico2">Entre dos temas</option>	
			</select>
			<div id="entre_temas" style="display: none;">
			Entre:
			<br>
			<select  id="select_entre_temas1" class="formulario__input" >
				<option selected="true" value="0"  selected class="formulario__input formulario__input--chico2">Seleccione tema</option>		
			</select>
			-
			<select  id="select_entre_temas2" class="formulario__input">
				<option selected="true" value="0"  selected class="formulario__input formulario__input--chico2">Seleccione tema</option>	
			</select>
			</div>
			
			
			<div id="resultados_modalA">
			</div>
		</div>
      <div class="modal-footer">
        <button type="button" id="botonQuitar4" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
		<button type="button" id="botonAgregar" class="open-Modal btn btn-primary"  data-toggle="modal">
         Agregar
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
			<h1>Mostrar temas</h1>
		</div>
		
		<div class="contenedor contenedor--grande contenedor--sombra animate__animated animate__fadeIn">
			<div class="container">
				<div class="row pt-2">
					<div class="col-md-6">
						<button type="button" id="Agregar" class="boton">
						<i class="fi fi-rr-add"></i>
			 			Agregar nuevo tema
			 			</button>
					</div>
					<div class="col-md-6">
						<div id="resultados_editar"></div>
					</div>
				</div>
				<div class="row">
				<table id="tabla_temas" class="table table-bordered table-condensed table-sm table-responsive"></table>
				</div>
			</div>
		   
			 
			
			
		</div>
		<script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns" crossorigin="anonymous"></script>
	<script src="js/mostrar_temas.js"></script>
	
	
</body>
</html>
