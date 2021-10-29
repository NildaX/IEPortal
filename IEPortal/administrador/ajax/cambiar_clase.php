<?php

   include '../../shared/conexionle.php'; 
   $mysql=Conectarse(); 
	if (!$mysql) { 
	die('Not connected : ' . mysql_error()); 
	echo mysql_error();
	}
	$id_alumno=filter_input(INPUT_POST, 'id_alumno');
	$id_gr=filter_input(INPUT_POST, 'id_clase_gra');
    $instruccion="Update alumno set Clase_gramatical='$id_gr' where ID_alumno='$id_alumno'";
	$verificar=mysqli_query($mysql,$instruccion);
	if(!$verificar){
		$errors []= "Lo siento, hay un problema con la base de datos intente de nuevo más tarde";
    }
	else{
		 $messages[] = "La clase gramatical se ha asignado correctamente";
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