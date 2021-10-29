<?php
   include '../../shared/conexionle.php'; 
   $mysql=Conectarse(); 
	if (!$mysql) { 
	die('Not connected : ' . mysql_error()); 
	echo mysql_error();
	}
	mysqli_set_charset($mysql, "utf8");
	//if (isset($_FILES["nuevo_imagen"])){
		//$messages[]=$_FILES["file"]["name"];
	//	$messages[]=$_POST ["espanol"];
//	}
	//else{
	//	$messages[]="se equivoco";
//	}
	$espanol=$_POST ["espanol"];
	$ingles=$_POST ["ingles"];
	$pasado=$_POST ["pasado"];
	$pasadop=$_POST ["pasadop"];
	$gerundio=$_POST ["gerundio"];
	$target_dir2="../../alumno/assets/img/Verbos/";
	$target_dir="assets/img/Verbos/";
	$imageFileType = $_FILES["file"]["type"];
	$extension=$_FILES['file']['name'];
	$extension=explode(".",$extension);
	$permitidos = array("image/jpg", "image/jpeg", "image/gif", "image/png","image/svg+xml");
	$image_name = $ingles.".".$extension[1];
	$target_file = $target_dir . $image_name;
	$target_file2 = $target_dir2 . $image_name;
	if(in_array($imageFileType, $permitidos)) {
		move_uploaded_file($_FILES["file"]["tmp_name"], $target_file2);
		//$nueva_img = "assets/img/Imgperfil/alumno/".$image_name;
		$instruccion="insert into verbos(Espanol,Presente,Pasado,`Pasado Participio`,Gerundio,Imagen,Habilitado)
            values ('$espanol','$ingles','$pasado','$pasadop','$gerundio','$target_file',1)";
		$verificar=mysqli_query($mysql,$instruccion);
		if(!$verificar){
			$errors []= "Lo siento, hay un problema con la base de datos intente con uno nuevo";
		}
		else{
			 $messages[] = "El verbo se ha ingresado correctamente";
		}
	} 
	else{
		$errors[]= "<p>Lo sentimos, sólo se permiten archivos JPG , JPEG, PNG y GIF.</p>";
	}
	
	
	
	
  //  $messages[]=$_FILES["file"]["name"];
	//$pregunta=filter_input(INPUT_POST, 'pregunta');
	
	
	
	if (isset($errors)){
			
			?>
			<div class="alert alert-danger" role="alert">
				<button type="button" class="close" data-dismiss="alert">&times;</button>
					<?php
						foreach ($errors as $error) {
								echo $error;
								?>
								<br>
								<?php
							}
						?>
			</div>
			<?php
			}
			if (isset($messages)){
				
				?>
				<div class="alert alert-success" role="alert">
						<button type="button" class="close" data-dismiss="alert">&times;</button>
						<?php
							foreach ($messages as $message) {
									echo $message;
									?>
								<br>
								<?php
								}
							?>
				</div>
				<?php
			}