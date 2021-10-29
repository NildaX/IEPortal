<?php
function eliminar_acentos($cadena){
		$cadena = str_replace(
		array('Á', 'À', 'Â', 'Ä', 'á', 'à', 'ä', 'â', 'ª'),
		array('A', 'A', 'A', 'A', 'a', 'a', 'a', 'a', 'a'),
		$cadena
		);
		$cadena = str_replace(
		array('É', 'È', 'Ê', 'Ë', 'é', 'è', 'ë', 'ê'),
		array('E', 'E', 'E', 'E', 'e', 'e', 'e', 'e'),
		$cadena );
		$cadena = str_replace(
		array('Í', 'Ì', 'Ï', 'Î', 'í', 'ì', 'ï', 'î'),
		array('I', 'I', 'I', 'I', 'i', 'i', 'i', 'i'),
		$cadena );
		$cadena = str_replace(
		array('Ó', 'Ò', 'Ö', 'Ô', 'ó', 'ò', 'ö', 'ô'),
		array('O', 'O', 'O', 'O', 'o', 'o', 'o', 'o'),
		$cadena );
		$cadena = str_replace(
		array('Ú', 'Ù', 'Û', 'Ü', 'ú', 'ù', 'ü', 'û'),
		array('U', 'U', 'U', 'U', 'u', 'u', 'u', 'u'),
		$cadena );
		$cadena = str_replace(
		array('Ñ', 'ñ', 'Ç', 'ç'),
		array('N', 'n', 'C', 'c'),
		$cadena
		);
		$cadena=str_replace(' ', '', $cadena);
		return $cadena;
	}
   include '../../shared/conexionle.php'; 
   $mysql=Conectarse(); 
	if (!$mysql) { 
	die('Not connected : ' . mysql_error()); 
	echo mysql_error();
	}
	mysqli_set_charset($mysql, "utf8");
	$nombre=$_POST["nombre"];
	$video=$_POST["video"];
	$tipo_orden=$_POST["tipo_orden"];
	if(strpos($video, "embed")===false){
         if(strpos($video, "ab_channel")===false){
			 $pos=strpos($video, "youtu.be");
			 if($pos!==false){
				$video = str_replace("youtu.be","www.youtube.com/embed", $video);
			 }
			 else{
				 $video = str_replace("watch?v=","embed/", $video);
			 }
		 }
		 else{
			 $video=str_replace("watch?v=","embed/",$video);
			 $pos=strpos($video, "&ab_channel");
			 $video=substr($video,0,$pos);
			
			 
		 }
	}
	if($tipo_orden==1){
		$orden=1;
	}else{
		if($tipo_orden==2){
			$orden=intval($_POST["orden1"]);
			$orden=$orden+1;
		}
		else{
			$orden=$_POST["orden1"];
		}
	}
	$target_dir2="../../alumno/assets/img/Temas/";
	$target_dir="assets/img/Temas/";
	$imageFileType = $_FILES["file"]["type"];
	$extension=$_FILES['file']['name'];
	$extension=explode(".",$extension);
	$permitidos = array("image/jpg", "image/jpeg", "image/gif", "image/png","image/svg+xml");
	$reemplazar=eliminar_acentos($nombre);
	$image_name = $reemplazar.".".$extension[1];
	$target_file = $target_dir . $image_name;
	$target_file2 = $target_dir2 . $image_name;
	if(in_array($imageFileType, $permitidos)) {
		move_uploaded_file($_FILES["file"]["tmp_name"], $target_file2);
		
		$instruccion="insert into temas(Nombre,video,Habilitado,Orden,imgtema)
				values ('$nombre','$video',1,'$orden','$target_file')";
		
		$verificar=mysqli_query($mysql,$instruccion);
		if(!$verificar){
			$errors []= "Lo siento, hay un problema con la base de datos intente de nuevo más tarde";
		}
		else{
			if($tipo_orden==1 or $tipo_orden==3){
				$ultimo=mysqli_insert_id($mysql);
				if($tipo_orden==1){
					$instruccion2="update temas set Orden=Orden+1 where ID_tema<>'$ultimo'";
				}
				else{
					$instruccion2="update temas set Orden=Orden+1 where Orden>='$orden' and ID_tema<>'$ultimo' ";
				}
				
				$verificar2=mysqli_query($mysql,$instruccion2);
				if(!$verificar2){
					$errors []= "Lo siento, hubo un problema al actualizar el orden de los temas, pero el tema se ha ingresado, intente cambiando el orden manualmente";
				}
				else{
					$messages[] = "El tema se ha ingresado correctamente y se ha actualizado el orden de los temas";
				}
			}
			else{
				$messages[] = "El tema se ha ingresado correctamente";
			}
		}
	}
	else{
		$errors[]= "<p>Lo sentimos, sólo se permiten archivos JPG , JPEG, PNG y GIF.</p>";
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