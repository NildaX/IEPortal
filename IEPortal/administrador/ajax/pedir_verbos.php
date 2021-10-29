<?php
	include '../../shared/conexionle.php';
	$conn=Conectarse(); 
	if (!$conn) { 
	die('Not connected : ' . mysql_error()); 
	echo mysql_error();
	}
	mysqli_set_charset($conn, "utf8");
	$query = "select * from verbos";
    $result = mysqli_query($conn, $query);
    $obj2=array();
	$obj=array();
	while ($f = mysqli_fetch_array($result, MYSQLI_ASSOC)){
			$obj['id']=$f['ID_verbo'];
			$obj['espanol']=$f['Espanol'];
			$obj['presente']=$f['Presente'];
			$obj['pasado']=$f['Pasado'];
			$obj['pasado_p']=$f['Pasado Participio'];
			$obj['gerundio']=$f['Gerundio'];
			$obj['imagen']=$f['Imagen'];
			$obj['habilitado']=$f['Habilitado'];
			array_push($obj2,$obj);
	}
	
	echo json_encode($obj2,JSON_UNESCAPED_UNICODE);
?>