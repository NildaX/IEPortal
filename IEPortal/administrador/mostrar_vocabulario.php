<?php session_start(); ?>
<?php if(!$_SESSION || $_SESSION['type']!="Administrador"){header("Location: ../shared/login");} ?>
<!DOCTYPE html>
<html lang="en">
<head><meta charset="gb18030">
    
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mostrar vocabulario | International English</title>
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
	<title>International English | Mostrar vocabulario </title>
</head>
<!------------------------------------------------- Modal -------------------->
<div class="modal" tabindex="-1" id="Modal_eliminarC" role="dialog" >
<div class="modal-dialog modal-dialog-scrollable" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" >Eliminar vocabulario</h5>
        <button type="button"  id="botonQuitar1" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
        <div class="modal-body" >
			���Esta seguro que desea eliminar este vocabulario?
			<div id="resultados_modal">
			</div>
		</div>
      <div class="modal-footer">
        <button type="button" id="botonQuitar2" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
		<button type="button" id="botonEliminar" class="open-Modal btn btn-primary"  data-toggle="modal">
         Eliminar
         </button>
      </div>
    </div>
</div>
</div>


<div class="modal" tabindex="-1" id="Modal_agregarC" role="dialog" >
<div class="modal-dialog modal-dialog-scrollable" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" >Agregar vocabulario</h5>
        <button type="button"  id="botonQuitar3" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
        <div class="modal-body" >
			Ingrese el nombre del vocabulario:
			<br>
			<input type="text" id="nuevo_nconver" required minlength="4" maxlength="500" class="formulario__input">
			<br>
			Ingrese la ruta del vocabulario:
			<br>
			<input type="text" id="nuevo_rutacon" required minlength="4" maxlength="500" class="formulario__input">
			<br>
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
			<h1>Mostrar vocabulario</h1>
		</div>
		
		<div class="contenedor contenedor--grande contenedor--sombra contenedor--minimo animate__animated animate__fadeIn">
			<div class="container">
				<div class="row pt-2 pb-2">
					<div class="col-md-6">
						<button type="button" id="Agregar" class="boton">
						<i class="fi fi-rr-add"></i>Agregar nuevo vocabulario
			 			</button>
					</div>
					<div class="col-md-6">
						<div id="resultados_editar"> </div>
					</div>
				</div>
				<div class="row">
					<table id="tabla_vocabulario" class="table table-bordered table-striped table-condensed table-responsive">
					</table>
				</div>
			</div>
			
		</div>
		<script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns" crossorigin="anonymous"></script>
	<script src="js/mostrar_vocabulario.js"></script>
	
	
</body>
</html>
