<?php
function eliminar_acentos($cadena){
		$cadena = str_replace(
		array('Á', 'À', 'Â', 'Ä', 'á', 'à', 'ä', 'â', 'ª'),
		array('A', 'A', 'A', 'A', 'a', 'a', 'a', 'a', 'a'),
		$cadena
		);
		$cadena = str_replace(
		array('É', 'È', 'Ê', 'Ë', 'é', 'è', 'ë', 'ê'),
		array('E', 'E', 'E', 'E', 'e', 'e', 'e', 'e'),
		$cadena );
		$cadena = str_replace(
		array('Í', 'Ì', 'Ï', 'Î', 'í', 'ì', 'ï', 'î'),
		array('I', 'I', 'I', 'I', 'i', 'i', 'i', 'i'),
		$cadena );
		$cadena = str_replace(
		array('Ó', 'Ò', 'Ö', 'Ô', 'ó', 'ò', 'ö', 'ô'),
		array('O', 'O', 'O', 'O', 'o', 'o', 'o', 'o'),
		$cadena );
		$cadena = str_replace(
		array('Ú', 'Ù', 'Û', 'Ü', 'ú', 'ù', 'ü', 'û'),
		array('U', 'U', 'U', 'U', 'u', 'u', 'u', 'u'),
		$cadena );
		$cadena = str_replace(
		array('Ç', 'ç'),
		array('C', 'c'),
		$cadena
		);
		return $cadena;
	}
	include '../../shared/conexionle.php';
	$conn=Conectarse(); 
	if (!$conn) { 
	die('Not connected : ' . mysql_error()); 
	echo mysql_error();
	}
	$num_aleatorio = rand(10,15);
	mysqli_set_charset($conn, "utf8");
	session_start();
	$id_tema_b = $_SESSION['id_tema'];
	$bandera_preguntas=0;
	while($bandera_preguntas==0){
	    $obj2=array();
	    $array_ids = array();
	    $bandera_preguntas=1;
    	$query = "SELECT * FROM preguntas  where ID_tema=$id_tema_b and Habilitado=1 ORDER BY RAND() LIMIT $num_aleatorio";
        $result = mysqli_query($conn, $query);
    	while ($f = mysqli_fetch_array($result, MYSQLI_ASSOC)){
    	        array_push($array_ids, $f['pregunta']);
    		    $obj=array();
    		    $respuestas=array();
    			$recursos=array();
    			$obj['tipo']=$f['Tipo'];
    			$obj['tema']=$f['ID_tema'];
    			$obj['id']=$f['ID_po'];
    			$obj['descripcion']=$f['pregunta'];
    			$obj['instrucciones']=$f['instrucciones'];
    			if ($f['Tipo']=="opciones"){
    				array_push($respuestas,$f['opcion1']);
    				array_push($respuestas,$f['opcion2']);
    				array_push($respuestas,$f['opcion3']);
    				array_push($respuestas,$f['correcta']);
    				$obj['respuestas']=$respuestas;
    				$obj['correcta']=$f['correcta'];
    			}
    			else{
    				if ($f['Tipo']=="imagenes"){
    					$query2 = "SELECT * FROM imagenes  where ID_imagen='$f[correcta]'";
                        $result2 = mysqli_query($conn, $query2);
    					while ($f2 = mysqli_fetch_array($result2, MYSQLI_ASSOC)){
    						$obj['correcta']=$f2['Descripcion'];
    						array_push($respuestas,$f2['Descripcion']);
    						array_push($recursos,$f2['Ruta']);
    					}
    					$query2 = "SELECT * FROM imagenes where ID_imagen<>'$f[correcta]' ORDER BY RAND() LIMIT 3";
                        $result2 = mysqli_query($conn, $query2);
    					while ($f2 = mysqli_fetch_array($result2, MYSQLI_ASSOC)){
    							array_push($respuestas,$f2['Descripcion']);
    							array_push($recursos,$f2['Ruta']);
    					}
    					$obj['respuestas']=$respuestas;
    					$obj['recursos']=$recursos;
    					
    				}
    				else{
    					if ($f['Tipo']=="traduccion"){
    						$ale = rand(0, 1);
    						//0 ingles
    						if ($ale ==0){
    							$obj['correcta']=$f['correcta'];
    						    $obj['extras']=$f['p_extras_esp'];
    							$obj['descripcion']=$f['pregunta'];
    							
    						}
    						//1 en español
    						else{
    							$obj['correcta']=$f['pregunta'];
    						    $obj['extras']=$f['p_extras_eng'];
    							$obj['descripcion']=$f['correcta'];
    							
    						}
    						
    					}
    					else{
    					if($f['Tipo']=="escribir"){
    							$obj['correcta']=$f['correcta'];
    							$obj['correcta']=eliminar_acentos($obj['correcta']);
    							$obj['descripcion']=$f['pregunta'];
    						}
    						else{
    							if( $f['Tipo']=="audio"){
    							$obj['correcta']=$f['pregunta'];
    						    $obj['contraida']=$f['p_extras_eng'];
    							}
    						}
    					}
    				}
    				
    			}
    			
    			array_push($obj2,$obj);
    	}
    	
    	for ($i = 0; $i < $num_aleatorio; $i++) {
            for ($j = 0; $j < $num_aleatorio; $j++) {
                   if($i!=$j){
                        if (strcmp($array_ids[$i],$array_ids[$j])==0) {
                            $bandera_preguntas=0;
                        }
                   }
            }    
        }
	}//while_bandera
    
	$query3 = "SELECT * FROM temas  where ID_tema=$id_tema_b";
	$result3 = mysqli_query($conn, $query3);
	while ($f3 = mysqli_fetch_array($result3, MYSQLI_ASSOC)){
		$obj2['video']=$f3['video'];
	}
	$obj2['numero_preguntas']=$num_aleatorio;
//	$obj2['descripciones_prueba']=$array_ids;
	echo json_encode($obj2,JSON_UNESCAPED_UNICODE);
?>