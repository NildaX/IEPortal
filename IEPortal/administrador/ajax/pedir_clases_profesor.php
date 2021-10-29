<?php
	include '../../shared/conexionle.php';
	$conn=Conectarse(); 
	if (!$conn) { 
	die('Not connected : ' . mysql_error()); 
	echo mysql_error();
	}
	$id_b=filter_input(INPUT_POST, 'id_profesor_buscar');
	mysqli_set_charset($conn, "utf8");
	$query = "select * from clase WHERE ID_profesor='$id_b'";
    $result = mysqli_query($conn, $query);
    $obj2=array();
	$obj=array();
	while ($f = mysqli_fetch_array($result, MYSQLI_ASSOC)){
			$obj['tipo']=$f['Tipo'];
			$obj['dias']=$f['Dias'];
			$obj['id']=$f['ID_clase'];
			$obj['horas']=$f['Horas'];
			
			array_push($obj2,$obj);
	}
	
	echo json_encode($obj2,JSON_UNESCAPED_UNICODE);
?>