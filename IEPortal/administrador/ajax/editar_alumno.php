<?php
   include '../../shared/conexionle.php'; 
   $mysql=Conectarse(); 
	if (!$mysql) { 
	die('Not connected : ' . mysql_error()); 
	echo mysql_error();
	}
	mysqli_set_charset($mysql, "utf8");
	$id_c=filter_input(INPUT_POST, 'id_alumno');
	$habilitar=filter_input(INPUT_POST, 'habilitado');
	$instruccion="update alumno set HabilitadoA='$habilitar' where ID_alumno='$id_c'";
	//$messages[]=$instruccion;
	$verificar=mysqli_query($mysql,$instruccion);
	if(!$verificar){
		$errors []= "Lo siento, hay un problema con la base de datos intente de nuevo más tarde";
    }
	else{
		 $messages[] = "El alumno se ha Habilitado/Deshabilitado correctamente";
		 //unlink($nombre);
	}
	
	// $messages[] = "La pregunta se ha eliminado correctamente";
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