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
	$id_t=$_POST ["id_tema"];
	$nombre=$_POST ["nombre"];
	$video=$_POST ["video"];
	$orden=$_POST ["orden"];
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
	$contiene=$_POST["contieneImagen"];
	if($contiene==0){
		$instruccion="update temas set Nombre='$nombre', video='$video', Orden='$orden' where ID_tema='$id_t'";
	}
	else{
		$target_dir2="../../alumno/assets/img/Temas/";
		$target_dir="assets/img/Temas/";
		$imageFileType = $_FILES["fileEditar"]["type"];
		$extension=$_FILES['fileEditar']['name'];
		$extension=explode(".",$extension);
		$permitidos = array("image/jpg", "image/jpeg", "image/gif", "image/png","image/svg+xml");
		$reemplazar=eliminar_acentos($nombre);
		$image_name = $reemplazar.".".$extension[1];
		$target_file = $target_dir . $image_name;
		$target_file2 = $target_dir2 . $image_name;
		if(in_array($imageFileType, $permitidos)) {
			move_uploaded_file($_FILES["fileEditar"]["tmp_name"], $target_file2);
			$instruccion="update temas set Nombre='$nombre', video='$video', Orden='$orden', imgtema='$target_file' where ID_tema='$id_t'";
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
			 $messages[] = "El tema ".$nombre." se ha editado correctamente";
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