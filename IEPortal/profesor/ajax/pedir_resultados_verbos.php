<?php
include '../../shared/conexionle.php'; 
$conn=Conectarse(); 
if (!$conn) { 
die('Not connected : ' . mysql_error()); 
echo mysql_error();
}
if(filter_input(INPUT_POST, 'buscar_id')){
$num1=filter_input(INPUT_POST, 'buscar_id');
$consulta_n=$conn->query("SELECT * FROM registro_verbos WHERE ID_alumno LIKE '%$num1%';"); 
$obj=array();
$obj2=array();
while ($fila = $consulta_n->fetch_array()){
		   $obj['ids_verbos']=(string)$fila['ids_verbos'];
		   $obj['num_errores']=(string)$fila['Num_errores'];
		   array_push($obj2,$obj);
}
echo json_encode($obj2);	
}

?>