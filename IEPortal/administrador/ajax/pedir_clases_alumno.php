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
	$num1=filter_input(INPUT_POST, 'alumno');
	$clases=array();
	$obj=array();
	$obj2=array();
	$consulta_n=$conn->query("select * from clase where ID_profesor='$id_profesor'");
	while ($fila = $consulta_n->fetch_array()){
		array_push($clases,$fila['ID_clase']);
	}
	
	for($i=0;$i<count($clases);$i++){
		$consulta_n=$conn->query("select * from clase JOIN registro_asistencia_alumnos on clase.ID_clase=registro_asistencia_alumnos.ID_clase where registro_asistencia_alumnos.ID_clase='$clases[$i]' and registro_asistencia_alumnos.ID_alumno='$num1'"); 
		while ($fila = $consulta_n->fetch_array()){
	    $obj['nombre']=((string)$fila['Tipo']).",Dias:". ((string)$fila['Dias']).", Horas ".((string)$fila['Horas']);
	    $obj['ids']=$fila['ID_clase'];
	    array_push($obj2,$obj);
		}
	}
	echo json_encode($obj2);	

?>