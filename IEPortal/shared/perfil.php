<?php session_start() ?>
<?php if(!$_SESSION){header("Location: ./login");} 
setcookie("emailsesion", $_SESSION['email_user'], time()+7200, "/");
setcookie("idusuario", $_SESSION['ID'], time()+7200, "/");
setcookie("tipousuario", $_SESSION['type'], time()+7200, "/");?>
<!DOCTYPE html>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Perfil | International English</title>
    <link rel="preconnect" href="https://fonts.gstatic.com">
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" 
	integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" 
	crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600&display=swap" rel="stylesheet">
	<link rel="stylesheet" 
		  href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
	 	  crossorigin="anonymous">
	<link rel="stylesheet" href="../shared/uicons-regular-rounded/css/uicons-regular-rounded.css">
	<link>
	<link
    	  rel="stylesheet"
    	  href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
    <link rel="stylesheet" href="css/header.css">
	<link rel="stylesheet" href="css/styles.css">
    <link rel="icon" href="assets/img/imagotipo.ico" />
	
</head>
  <body class="cuerpo">
	
        <div class="container-fluid px-0">
            <?php require 'header.php'?>
        </div>
		<ul class="nav nav-tabs" id="myTab" role="tablist">
		  <li class="nav-item" role="presentation">
			<a class="nav-link active" id="pperfil-tab" data-toggle="tab" href="#pperfil" role="tab" aria-controls="pperfil" aria-selected="true"><i class="fi  fi-rr-user"></i> Perfil</a>
		  </li>
		  <li class="nav-item" role="presentation">
			<a class="nav-link" id="seguridad-tab" data-toggle="tab" href="#seguridad"  role="tab" aria-controls="seguridad" aria-selected="false"><i class="fi  fi-rr-unlock"></i> Seguridad</a>
		  </li>
		</ul>
		<div class="tab-content" id="myTabContent">
		  <div class="tab-pane fade show active" id="pperfil" role="tabpanel" aria-labelledby="pperfil-tab">
		  	<div class="titulo">
        		<h1>Perfil</h1>
    		</div>
		  	<div class="container contenedor contenedor--grande contenedor--sombra centrado">
				<div class="row">
					<div class="col-lg-6 col-md-12 centrado ">
						<div id="load_img" >
							<img class="animate__animated animate__fadeIn img-responsive contenedor__avatar centrado" src="<?php echo $user['Foto']; ?>" alt="Logo" style="max-width:200px;max-height:200px">
						</div>
						<div style="text-align:center;" class="mt-2">
							<label for="imagefile" class="boton boton--pequeno boton--linea centrado">
    							<i class="fi-rr-file-add"></i> Subir Foto
							</label>
								<input class="centrado custom-file-upload" data-buttonText="Logo" type="file" name="imagefile" id="imagefile" onchange="ActualizarImagen();">
						</div>
						<div id="espacio_horarios" style="display: none;">
						<div>
							<h2 class="centrado  p-2">Tu horario</h2>
						</div>
						<div class="table-responsive  p-2">	
						<table  id="tabla_horarios"class="table table-bordered table-striped table-condensed" >
							<tr>
							<th >Tipo de clase</th>
							<th>Profesor asignado</th>
							<th>Días</th>
							<th>Horario</th>
							</tr>
						</table>
						</div>

						</div>
					</div>
					<div class="col-lg-6 col-md-12 centrado">
						<form method="post" id="perfil" class="formulario formulario--espaciado contenedor--sombra  m-5">	 
								
							
						</form>

						
					</div>
				</div>
			</div>
			<br>
			  
		  </div>
		  <div class="tab-pane fade" id="seguridad" role="tabpanel" aria-labelledby="seguridad-tab">
		  <?php
			include("cambiar_contra_perfil.html");
		  ?>
		  </div>
		  
		</div>
		
		
		<div class="container-fluid px-0">
			<?php require '../shared/footer.php'?>
    	</div>
		<script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>
    	<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns" crossorigin="anonymous"></script>
    	<script src="js/verificacion-usuario.js"></script>
		<script src="js/editar_perfill.js"></script>

  </body>
</html>