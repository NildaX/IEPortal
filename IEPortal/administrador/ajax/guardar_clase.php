<?php

   include '../../shared/conexionle.php'; 
   $mysql=Conectarse(); 
	if (!$mysql) { 
	die('Not connected : ' . mysql_error()); 
	echo mysql_error();
	}
	$tipo_clase=filter_input(INPUT_POST, 'tipo');
	$id_profesor=filter_input(INPUT_POST, 'id_profesor');
	$cantidad_dias=$_POST['cantidad_dias'];
	$dias_=$_POST['dias'];  //revisar time para que sea dia correcto
	$dias_total="";
	for($i=0;$i<$cantidad_dias;$i++){
		if ($i==$cantidad_dias-1){
			$dias_total=$dias_total.$dias_[$i];
		}
		else{
			$dias_total=$dias_total.$dias_[$i]."-";
		}
		
		
	}
	$horas_=$_POST['horas'];
	$horas_total=$horas_[0]."-".$horas_[1];
    $instruccion="insert into clase(ID_profesor,Tipo,Dias,Horas)
              	values ('$id_profesor','$tipo_clase','$dias_total','$horas_total')";
	$verificar=mysqli_query($mysql,$instruccion);
	if(!$verificar){
		$errors []= "Lo siento, hay un problema con la base de datos intente con uno nuevo";
    }
	else{
		 $messages[] = "La clase se ha registrado correctamente";
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