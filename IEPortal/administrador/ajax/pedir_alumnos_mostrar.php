<?php
	include '../../shared/conexionle.php';
	$conn=Conectarse(); 
	if (!$conn) { 
	die('Not connected : ' . mysql_error()); 
	echo mysql_error();
	}
	mysqli_set_charset($conn, "utf8");
	$query = "select * from alumno";
    $result = mysqli_query($conn, $query);
    $obj2=array();
	$obj=array();
	while ($f = mysqli_fetch_array($result, MYSQLI_ASSOC)){
			$obj['nombre']=((string)$f['Nombre'])." ". ((string)$f['Apellido_P'])." ".((string)$f['Apellido_M']);
			$obj['correo']=$f['Correo'];
			$obj['id']=$f['ID_alumno'];
			$obj['habilitado']=$f['HabilitadoA'];
			array_push($obj2,$obj);
	}
	
	echo json_encode($obj2,JSON_UNESCAPED_UNICODE);
?>