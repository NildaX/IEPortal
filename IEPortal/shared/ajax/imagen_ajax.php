	<?php
				require '../functions.php';
				if(!isset($_SESSION['user'])){
				header('Location: login.php');
				}
					include '../conexionle.php'; 
					$mysql=Conectarse(); 
					if (!$mysql) { 
					die('Not connected : ' . mysql_error()); 
					echo mysql_error();
					} 
				if (isset($_FILES["imagefile"])){
					if ($_SESSION['type'] == "Alumno"){
				      $target_dir="../assets/img/Imgperfil/alumno/";
					}
					else{
						if ($_SESSION['type'] == "Profesor"){
							$target_dir="../assets/img/Imgperfil/profesor/";
						}
						else{
							$target_dir="../assets/img/Imgperfil/administrador/";
						}
					}
				$image_name = time()."_".basename($_FILES["imagefile"]["name"]);
				$target_file = $target_dir . $image_name;
				$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
				$imageFileZise=$_FILES["imagefile"]["size"];
				
					
				
				/* Inicio Validacion*/
				// Allow certain file formats
				if(($imageFileType != "jpg" && $imageFileType != "JPG" && $imageFileType != "png" && $imageFileType != "PNG" && $imageFileType != "jpeg" && $imageFileType != "JPEG" && $imageFileType != "gif" ) and $imageFileZise>0) {
				$errors[]= "<p>Lo sentimos, sólo se permiten archivos JPG , JPEG, PNG y GIF.</p>";
				} else if ($imageFileZise > 1048576) {//1048576 byte=1MB
				$errors[]= "<p>Lo sentimos, pero el archivo es demasiado grande. Selecciona una imagen de menos de 1MB</p>";
				}  else
			{
				
				
				
				/* Fin Validacion*/
				if ($imageFileZise>0){
					if ($_SESSION['type'] == "Alumno"){
				      $logo_update="Foto='assets/img/Imgperfil/alumno/$image_name' ";
					  $nueva_img = "assets/img/Imgperfil/alumno/".$image_name;
					}
					else{
						if ($_SESSION['type'] == "Profesor"){
							$logo_update="Foto='assets/img/Imgperfil/profesor/$image_name' ";
							$nueva_img = "assets/img/Imgperfil/profesor/".$image_name;
						}
						else{
							$logo_update="Foto='assets/img/Imgperfil/administrador/$image_name' ";
							$nueva_img = "assets/img/Imgperfil/administrador/".$image_name;
						}
					}
					
				
				}	else { $logo_update="";}
				    if ($_SESSION['type'] == "Alumno"){
				      $sql = "UPDATE alumno SET $logo_update WHERE correo='$_SESSION[email_user]'";
					}
					else{
						if ($_SESSION['type'] == "Profesor"){
							$sql = "UPDATE profesor SET $logo_update WHERE correo='$_SESSION[email_user]'";
						}
						else{
							$sql = "UPDATE administrador SET $logo_update WHERE correo='$_SESSION[email_user]'";
						}
					}
                    
                    $query_new_insert = mysqli_query($mysql,$sql);
					
                   
                    if ($query_new_insert) {
						$afectados = mysqli_affected_rows($mysql);
						if ($afectados>=1){
							move_uploaded_file($_FILES["imagefile"]["tmp_name"], $target_file);
							?>
							<img class="animate__animated animate__fadeIn img-responsive contenedor__avatar centrado" src="<?php echo $nueva_img;?>" alt="Logo" style="max-width:200px;max-height:200px">
							<?php
						}
						else{
							$errors[] = "Lo sentimos, la actualización falló. Intente nuevamente. ";
						}
                    } else {
                        $errors[] = "Lo sentimos, la actualización falló. Intente nuevamente. ";
                    }
			}
		}	
				
				
				
		
	?>
	<?php 
		if (isset($errors)){
	?>
		<div class="alert alert-danger">
			<button type="button" class="close" data-dismiss="alert">&times;</button>
			<strong>Error! </strong>
		<?php
			foreach ($errors as $error){
				echo $error;
			}
		?>
		</div>	
	<?php
			}
	?>
