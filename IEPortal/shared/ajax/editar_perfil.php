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
		mysqli_set_charset($mysql, "utf8");
		if ($_SESSION['type'] == "Alumno"){
		  $sql="UPDATE alumno SET nombre='$_POST[nombre]', apellido_m ='$_POST[apellido_m]', apellido_p = '$_POST[apellido_p]', telefono='$_POST[telefono]', edad='$_POST[edad]' WHERE ID_alumno='$_SESSION[ID]'";
		}
		else{
			if ($_SESSION['type'] == "Profesor"){
				$sql="UPDATE profesor SET nombre='$_POST[nombre]', apellido_m ='$_POST[apellido_m]', apellido_p = '$_POST[apellido_p]', telefono='$_POST[telefono]', edad='$_POST[edad]' WHERE ID_profesor='$_SESSION[ID]'";
			}
			else{
				$sql="UPDATE administrador SET nombre='$_POST[nombre]', apellido_m ='$_POST[apellido_m]', apellido_p = '$_POST[apellido_p]', telefono='$_POST[telefono]', edad='$_POST[edad]' WHERE ID_administrador='$_SESSION[ID]'";
			}
		}
		$query_update = mysqli_query($mysql,$sql);
			if ($query_update){
				$messages[] = "Los datos se han actualizado satisfactoriamente.";
			} else{
				$errors []= "Lo siento algo ha salido mal, intenta nuevamente.";
			}
		if (isset($errors)){
			
			?>
			<div class="alert alert-danger" role="alert">
				<button type="button" class="close" data-dismiss="alert">&times;</button>
					<strong>Error!</strong> 
					<?php
						foreach ($errors as $error) {
								echo $error;
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
								}
							?>
				</div>
				<?php
			}

?>