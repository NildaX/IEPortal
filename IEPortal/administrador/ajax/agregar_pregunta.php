<?php
   include '../../shared/conexionle.php'; 
   $mysql=Conectarse(); 
	if (!$mysql) { 
	die('Not connected : ' . mysql_error()); 
	echo mysql_error();
	}
	mysqli_set_charset($mysql, "utf8");
	$tipo_pregunta=filter_input(INPUT_POST, 'tipo');
	$id_tema=filter_input(INPUT_POST, 'id_tema');
	$pregunta=filter_input(INPUT_POST, 'pregunta');
	$pregunta = str_replace("  "," ",$pregunta);
	switch($tipo_pregunta){
		case 1:
		    //opciones
			$correcta=filter_input(INPUT_POST, 'op_correcta');
			$correcta=str_replace(' ', '',$correcta);
			$incorrectas=$_POST['incorrectas'];
		    $instruccion="insert into preguntas(ID_tema,Tipo,instrucciones,pregunta,opcion1,opcion2,opcion3,correcta,Habilitado)
            values ('$id_tema','opciones','Elige la opción que complete correctamente la oración.','$pregunta','$incorrectas[0]','$incorrectas[1]','$incorrectas[2]','$correcta',1)";
			break;
		case 2:
		//completar
			$instruccion="insert into preguntas(ID_tema,Tipo,instrucciones,pregunta,correcta,Habilitado)
            values ('$id_tema','completar','Reescribe las palabras para que la oración tenga coherencia y sea gramaticalmente correcta.','$pregunta','$pregunta',1)";
			break;
		case 3:
		//traduccion
			$pregunta_ingles=filter_input(INPUT_POST, 'pregunta_ingles');
			$pregunta_ingles = str_replace("  "," ",$pregunta_ingles);
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
			
		//	$extras=str_replace(' ', '', $extras);
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
		    $instruccion="insert into preguntas(ID_tema,Tipo,instrucciones,pregunta,correcta,p_extras_eng,p_extras_esp,Habilitado)
            values ('$id_tema','traduccion','Lee con atención la oración. Selecciona  las palabras que traduzcan de manera adecuada la oración y ordénalas en el espacio.','$pregunta_ingles','$pregunta','$extras_ingles','$extras',1)";
			break;
		case 4:
		    //escribir
			$pregunta_espanol=filter_input(INPUT_POST, 'op_correcta');
			$pregunta_espanol = str_replace("  "," ",$pregunta_espanol);
			$instruccion="insert into preguntas(ID_tema,Tipo,instrucciones,pregunta,correcta,Habilitado)
            values ('$id_tema','escribir','Traduce la siguiente oración al español','$pregunta','$pregunta_espanol',1)";
			break;
		case 5:
			//audio
			$extra=filter_input(INPUT_POST, 'extras');
			if($extra=="undifined"){
				$instruccion="insert into preguntas(ID_tema,Tipo,instrucciones,pregunta,correcta,Habilitado)
				values ('$id_tema','audio','Escucha y escribe','$pregunta','$pregunta',1)";
				//$instruccion="update preguntas set pregunta='$pregunta',correcta='$pregunta_espanol' where ID_po='$id_pr'";
			}
			else{
	            $extra=str_replace("'","''", $extra);
	            $extra=str_replace("  "," ", $extra);
				$instruccion="insert into preguntas(ID_tema,Tipo,instrucciones,pregunta,correcta,p_extras_eng,Habilitado)
				values ('$id_tema','audio','Escucha y escribe','$pregunta','$pregunta','$extra',1)";
				//$instruccion="update preguntas set pregunta='$pregunta',correcta='$pregunta', p_extras_eng='$extra' where ID_po='$id_pr'";
			}
			break;
	}
	
	$verificar=mysqli_query($mysql,$instruccion);
	if(!$verificar){
		$errors []= "Lo siento, hay un problema con la base de datos intente con uno nuevo";
    }
	else{
		 $messages[] = "La pregunta se ha ingresado correctamente";
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