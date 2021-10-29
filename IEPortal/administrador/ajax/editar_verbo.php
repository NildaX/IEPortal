<?php
   include '../../shared/conexionle.php'; 
   $mysql=Conectarse(); 
	if (!$mysql) { 
	die('Not connected : ' . mysql_error()); 
	echo mysql_error();
	}
	mysqli_set_charset($mysql, "utf8");
	$espanol=$_POST ["espanol"];
	$presente=$_POST ["ingles"];
	$pasado=$_POST ["pasado"];
	$pasado_p=$_POST ["pasadop"];
	$gerundio=$_POST ["gerundio"];
	$id_v=$_POST["id_verbo"];
	$contiene=$_POST["contieneImagen"];
	if($contiene==0){
		$instruccion="update verbos set Espanol='$espanol',Presente='$presente',Pasado='$pasado',`Pasado Participio` ='$pasado_p', Gerundio='$gerundio' where ID_verbo='$id_v'";
	}
    else{
		$target_dir2="../../alumno/assets/img/Verbos/";
		$target_dir="assets/img/Verbos/";
		$imageFileType = $_FILES["fileEditar"]["type"];
		$extension=$_FILES['fileEditar']['name'];
		$extension=explode(".",$extension);
		$permitidos = array("image/jpg", "image/jpeg", "image/gif", "image/png","image/svg+xml");
		$image_name = $presente.".".$extension[1];
		$target_file = $target_dir . $image_name;
		$target_file2 = $target_dir2 . $image_name;
		if(in_array($imageFileType, $permitidos)) {
			move_uploaded_file($_FILES["fileEditar"]["tmp_name"], $target_file2);
			$instruccion="update verbos set Espanol='$espanol',Presente='$presente',Pasado='$pasado',`Pasado Participio` ='$pasado_p', Gerundio='$gerundio',Imagen='$target_file' where ID_verbo='$id_v'";
		}
        else{
				$errors []= "No se ha podido editar, eliga una imagen con extension jpg, jpeg, gif, png o svg";
		}		
	}	
	if (!isset($errors)){
		$verificar=mysqli_query($mysql,$instruccion);
		if(!$verificar){
			$errors []= "Lo siento, hay un problema con la base de datos intente con uno nuevo";
		}
		else{
			 $messages[] = "El verbo ".$espanol." se ha editado correctamente";
		}
	}
	
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