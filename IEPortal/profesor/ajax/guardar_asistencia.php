<?php

   include '../../shared/conexionle.php'; 
   $mysql=Conectarse(); 
	if (!$mysql) { 
	die('Not connected : ' . mysql_error()); 
	echo mysql_error();
	}
	$clase=filter_input(INPUT_POST, 'clase');
	$alumno=$_POST['ids_alumnos'];
	$asistencia=$_POST['asistencia'];  //revisar time para que sea dia correcto
	date_default_timezone_set('America/Mexico_City'); 
	$fecha = date("Y",time())."-".date("m",time()) ."-".date("d",time());
	$bandera=0;
	for($i=0;$i<count($alumno);$i++) {
      $instruccion="insert into registro_asistencia_alumnos(ID_clase,ID_alumno,Fecha,Asistencia)
              	values ('$clase','$alumno[$i]','$fecha','$asistencia[$i]')";
	  $verificar=mysqli_query($mysql,$instruccion);
	  if(!$verificar){
		  $bandera=1;
	  }
    }		                	
	if($bandera==1){
	  $errors []= "Lo siento, hay un problema con la base de datos intente con uno nuevo";
     }
	 else{
		 $messages[] = "El registro de asistencia guardado";
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