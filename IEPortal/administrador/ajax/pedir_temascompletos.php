<?php
include '../../shared/conexionle.php'; 
$conn=Conectarse(); 
if (!$conn) { 
die('Not connected : ' . mysql_error()); 
echo mysql_error();
}
mysqli_set_charset($conn, "utf8");
$consulta_n=$conn->query("SELECT * from temas order by Orden;"); 
$obj=array();
$obj2=array();
while ($fila = $consulta_n->fetch_array()){
		   $obj['nombre']=(string)$fila['Nombre'];
		   $obj['id']=$fila['ID_tema'];
		   $obj['video']=$fila['video'];
		   $obj['habilitado']=$fila['Habilitado'];
		   $obj['orden']=$fila['Orden'];
		   $obj['imgtema']=$fila['imgtema'];
		   array_push($obj2,$obj);
}
echo json_encode($obj2);	


?>