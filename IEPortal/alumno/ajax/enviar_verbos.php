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
	$ids_ = $_POST['id_verbos'];//$_POST['id_preguntas'];
	$num_ = $_POST['num_errores'];//$_POST['id_preguntas'];
	$ids_1 = implode("_",$ids_);
	$num_1 = implode("_",$num_);
	$instruccion="insert into registro_verbos(ID_alumno,ids_verbos,Num_errores)
              	values ('$_SESSION[ID]','$ids_1','$num_1')";
		              	
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