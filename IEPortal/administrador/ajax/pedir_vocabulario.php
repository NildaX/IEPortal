<?php
include '../../shared/conexionle.php'; 
$conn=Conectarse(); 
if (!$conn) { 
die('Not connected : ' . mysql_error()); 
echo mysql_error();
}
mysqli_set_charset($conn, "utf8");
$consulta_n=$conn->query("SELECT * from vocabulario"); 
$obj=array();
$obj2=array();
while ($fila = $consulta_n->fetch_array()){
		   $obj['nombre']=(string)$fila['Nombre'];
		   $obj['id']=$fila['ID_voc'];
		   $obj['archivo']=$fila['Ruta'];
		   array_push($obj2,$obj);
}
echo json_encode($obj2);	


?>