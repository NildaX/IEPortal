<?php
	include '../../shared/conexionle.php';
	$conn=Conectarse(); 
	if (!$conn) { 
	die('Not connected : ' . mysql_error()); 
	echo mysql_error();
	}
	$num_aleatorio = 10;
	mysqli_set_charset($conn, "utf8");
	session_start();
	//$id_tema_b = $_SESSION['id_tema'];
	$query = "SELECT * FROM verbos where Habilitado=1 ORDER BY RAND() LIMIT $num_aleatorio";
    $result = mysqli_query($conn, $query);
    $obj2=array();
	
	while ($f = mysqli_fetch_array($result, MYSQLI_ASSOC)){
		    $obj=array();
		    $obj['id']=$f['ID_verbo'];
			$obj['espanol']=$f['Espanol'];
			$obj['presente']=$f['Presente'];
			$obj['pasado']=$f['Pasado'];
			$obj['pasado_p']=$f['Pasado Participio'];
			$obj['imagen']=$f['Imagen'];
			$obj['gerundio']=$f['Gerundio'];
			$ale = rand(0, 1);
			$obj['tipo']=$ale;
			//de tipo ejercicio
			if ($ale ==0){
				$respuestas=array();
			    $recursos=array();
				$query2 = "SELECT * FROM verbos where ID_verbo<>'$f[ID_verbo]' and Habilitado=1  ORDER BY RAND() LIMIT 3";
				$result2 = mysqli_query($conn, $query2);
				while ($f2 = mysqli_fetch_array($result2, MYSQLI_ASSOC)){
						array_push($respuestas,$f2['Presente']);
						array_push($recursos,$f2['Imagen']);
				}
				array_push($respuestas,$f['Presente']);
				array_push($recursos,$f['Imagen']);
				$obj['respuestas']=$respuestas;
				$obj['recursos']=$recursos;
			}
			
			array_push($obj2,$obj);
	}
	$obj2['numero_preguntas']=$num_aleatorio;
	echo json_encode($obj2,JSON_UNESCAPED_UNICODE);
?>