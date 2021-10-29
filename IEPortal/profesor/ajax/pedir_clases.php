<?php
	session_start();
	$id_profesor = $_SESSION['ID'];
	include '../../shared/conexionle.php';
	$conn=Conectarse(); 
	if (!$conn) { 
	die('Not connected : ' . mysql_error()); 
	echo mysql_error();
	}
	$obj=array();
    $obj2=array();
	$query = "SELECT * FROM clase  where ID_profesor=$id_profesor";
	$result = mysqli_query($conn, $query);
	$arr_ids=array();
	$arr_tipo=array();
	$arr_dias=array();
	$arr_horas=array();
	while ($f = mysqli_fetch_array($result, MYSQLI_ASSOC)){
		$obj['ids']=$f['ID_clase'];
		$obj['tipo']=$f['Tipo'];
		$obj['dias']=$f['Dias'];
		$obj['horas']=$f['Horas'];
	    array_push($obj2,$obj);
	}
	echo json_encode($obj2);

?>