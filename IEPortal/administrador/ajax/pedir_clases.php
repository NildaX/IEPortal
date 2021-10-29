<?php
	session_start();
	$id_profesor = $_SESSION['ID'];
	include '../../shared/conexionle.php';
	$conn=Conectarse(); 
	if (!$conn) { 
	die('Not connected : ' . mysql_error()); 
	echo mysql_error();
	}
	mysqli_set_charset($conn, "utf8");
	$obj=array();
    $obj2=array();
	$query = "SELECT clase.ID_clase, clase.ID_profesor, clase.Tipo, clase.Dias, clase.Horas, profesor.Nombre, profesor.Apellido_P, profesor.Apellido_M FROM clase
				inner join profesor 
				on profesor.ID_profesor=clase.ID_profesor where tipo='Gramatical';";
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
		$obj['nombre']=$f['Nombre'];
		$obj['apellido_p']=$f['Apellido_P'];
		$obj['apellido_m']=$f['Apellido_M'];
	    array_push($obj2,$obj);
	}
	echo json_encode($obj2);

?>