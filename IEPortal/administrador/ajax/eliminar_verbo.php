<?php
   include '../../shared/conexionle.php'; 
   $mysql=Conectarse(); 
	if (!$mysql) { 
	die('Not connected : ' . mysql_error()); 
	echo mysql_error();
	}
	mysqli_set_charset($mysql, "utf8");
	$id_e=filter_input(INPUT_POST, 'id_eliminar');
	$habilitar=filter_input(INPUT_POST, 'habilitar');
	if($habilitar==1){
		$instruccion="update verbos set Habilitado=1 where ID_verbo='$id_e'";
	} 
	else{
		$instruccion="update verbos set Habilitado=0 where ID_verbo='$id_e'";
		
	}
		
	
	$verificar=mysqli_query($mysql,$instruccion);
	if(!$verificar){
		$errors []= "Lo siento, hay un problema con la base de datos intente con uno nuevo";
    }
	else{
		 $messages[] = "La pregunta se ha Habilitado/Deshabilitado correctamente";
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