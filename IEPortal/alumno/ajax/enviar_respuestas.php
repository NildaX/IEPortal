<?php
    require '../../shared/functions.php';
    if(!isset($_SESSION['user'])){
	header('Location: login.php');
    }
	include '../../shared/conexionle.php'; 
	    $mysql=Conectarse(); 
		if (!$mysql) { 
		die('Not connected : ' . mysql_error()); 
		echo mysql_error();
	} 
	$ids_ = $_POST['id_preguntas'];//$_POST['id_preguntas'];
	$num_ = $_POST['num_errores'];//$_POST['id_preguntas'];
	$ids_1 = implode("_",$ids_);
	$num_1 = implode("_",$num_);
	$id_tema = $_SESSION['id_tema'];
	$idalumno = $_COOKIE['idusuario'];
	
	$query = "SELECT * FROM alumno  where ID_alumno='$idalumno'";
    $result = mysqli_query($mysql, $query);
	while ($f = mysqli_fetch_array($result, MYSQLI_ASSOC)){
		$temas_c = $f['temas_completos'];
	}
	$bandera=0;
	if ($temas_c==0){
		 $temas_c = $id_tema."_"; 	
		 $bandera=1;
	}
	else{
		if (strpos($temas_c,$id_tema)===false){
			 $temas_c.= $id_tema."_";
			 $bandera=1;
	     }
		 
	}
	if ($bandera==1){
		$query = "update alumno set temas_completos='$temas_c' where ID_alumno='$idalumno'";
		$verificar=mysqli_query($mysql,$query);
		if(!$verificar){
		  $errors []= "Lo siento, Ha ocurrido un error con la base de datos, intente de nuevo \n";
		 }
		 else{
			 $messages[] = "El tema completado ha sido guardado \n";
		 }
	}
	$instruccion="insert into registro_respuestas(ID_alumno,ID_tema,ids_preguntas,Num_errores)
              	values ('$idalumno','$id_tema','$ids_1','$num_1')";
		              	
	$verificar=mysqli_query($mysql,$instruccion);
	if(!$verificar){
	  $errors []= "Lo siento, Ha ocurrido un error con la base de datos, intente de nuevo \n";
     }
	 else{
		 $messages[] = "Los resultados han sido guardados \n";
	 }
	 if (isset($errors)){
			
			?>
			<div class="alert alert-danger" role="alert">
				<button type="button" class="close" data-dismiss="alert">&times;</button>
					<strong>Error!</strong> 
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
	
	
?>