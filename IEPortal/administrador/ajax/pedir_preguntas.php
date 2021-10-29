<?php
	include '../../shared/conexionle.php';
	$conn=Conectarse(); 
	if (!$conn) { 
	die('Not connected : ' . mysql_error()); 
	echo mysql_error();
	}
	$id_b=filter_input(INPUT_POST, 'id_tema_buscar');
	mysqli_set_charset($conn, "utf8");
	$query = "select * from preguntas WHERE preguntas.ID_tema='$id_b' order by pregunta, Tipo";
    $result = mysqli_query($conn, $query);
    $obj2=array();
	$obj=array();
	while ($f = mysqli_fetch_array($result, MYSQLI_ASSOC)){
			$obj['tipo']=$f['Tipo'];
			$obj['habilitado']=$f['Habilitado'];
			$obj['id']=$f['ID_po'];
			$obj['descripcion']=$f['pregunta'];
			$obj['instrucciones']=$f['instrucciones'];
			$obj['correcta']=$f['correcta'];
			$obj['extras_e']=$f['p_extras_esp'];
			$obj['extras_en']=$f['p_extras_eng'];
			$obj['opcion1']=$f['opcion1'];
			$obj['opcion2']=$f['opcion2'];
			$obj['opcion3']=$f['opcion3'];
			array_push($obj2,$obj);
	}
	
	echo json_encode($obj2,JSON_UNESCAPED_UNICODE);
?>