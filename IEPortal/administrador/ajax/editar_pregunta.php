<?php
   include '../../shared/conexionle.php'; 
   $mysql=Conectarse(); 
	if (!$mysql) { 
	die('Not connected : ' . mysql_error()); 
	echo mysql_error();
	}
	mysqli_set_charset($mysql, "utf8");
	$tipo_pregunta=filter_input(INPUT_POST, 'tipo');
	$id_pr=filter_input(INPUT_POST, 'id_pregunta');
	$pregunta=filter_input(INPUT_POST, 'pregunta');
	$pregunta = str_replace("  "," ",$pregunta);
	switch($tipo_pregunta){
		case 1:
		    //opciones
			$correcta=filter_input(INPUT_POST, 'op_correcta');
			$correcta=str_replace(' ', '',$correcta);
			$incorrectas=$_POST['incorrectas'];
		    $instruccion="update preguntas set pregunta='$pregunta',opcion1='$incorrectas[0]',opcion2='$incorrectas[1]',opcion3='$incorrectas[2]',correcta='$correcta' where ID_po='$id_pr'";
			break;
		case 2:
		//completar
			$instruccion="update preguntas set pregunta='$pregunta',correcta='$pregunta' where ID_po='$id_pr'";
			break;
		case 3:
		//traduccion
			$correcta=filter_input(INPUT_POST, 'op_correcta');
			$correcta = str_replace("  "," ",$correcta);
			$extras=filter_input(INPUT_POST, 'extras');
			$arr_extras=explode(",",$extras);
			for ($i=0;$i<count($arr_extras);$i++){
			    $arr_extras[$i]=trim($arr_extras[$i]);
			}
			$extras="";
			for ($i=0;$i<count($arr_extras);$i++){
			    if($i!=0){
			        $extras=$extras.",".$arr_extras[$i];
			    }
			    else{
			        $extras=$arr_extras[$i];
			    }
			}
			$extras_ingles=filter_input(INPUT_POST, 'extras_ingles');
			$arr_extras=explode(",",$extras_ingles);
			for ($i=0;$i<count($arr_extras);$i++){
			    $arr_extras[$i]=trim($arr_extras[$i]);
			}
			$extras_ingles="";
			for ($i=0;$i<count($arr_extras);$i++){
			    if($i!=0){
			        $extras_ingles=$extras_ingles.",".$arr_extras[$i];
			    }
			    else{
			        $extras_ingles=$arr_extras[$i];
			    }
			}
		//	$extras_ingles=str_replace(' ', '', $extras_ingles);
		    $instruccion="update preguntas set pregunta='$pregunta',correcta='$correcta',p_extras_eng='$extras_ingles',p_extras_esp='$extras' where ID_po='$id_pr'";
			break;
		case 4:
		//escribir
			$pregunta_espanol=filter_input(INPUT_POST, 'op_correcta');
			$pregunta_espanol=str_replace('  ', ' ', $pregunta_espanol);
		    $instruccion="update preguntas set pregunta='$pregunta',correcta='$pregunta_espanol' where ID_po='$id_pr'";
			break;
		case 5:
		//audio
			$extra=filter_input(INPUT_POST, 'extras');
			if($extra=="undifined"){
				$instruccion="update preguntas set pregunta='$pregunta',correcta='$pregunta_espanol' where ID_po='$id_pr'";
			}
			else{
	            $extra=str_replace("'","''", $extra);
	            $extra=str_replace("  "," ", $extra);
				$instruccion="update preguntas set pregunta='$pregunta',correcta='$pregunta', p_extras_eng='$extra' where ID_po='$id_pr'";
			}
			break;
	}
	
	$verificar=mysqli_query($mysql,$instruccion);
	if(!$verificar){
		$errors []= "Lo siento, hay un problema con la base de datos intente con uno nuevo";
    }
	else{
		 $messages[] = "La pregunta se ha editado correctamente";
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