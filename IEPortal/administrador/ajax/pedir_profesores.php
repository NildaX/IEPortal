<?php
include '../../shared/conexionle.php'; 
$conn=Conectarse(); 
if (!$conn) { 
die('Not connected : ' . mysql_error()); 
echo mysql_error();
}
mysqli_set_charset($conn, "utf8");
$consulta_n=$conn->query("SELECT * from profesor;"); 
$obj=array();
$obj2=array();
while ($fila = $consulta_n->fetch_array()){
		   $obj['Nombre']=((string)$fila['Nombre'])." ". ((string)$fila['Apellido_P'])." ".((string)$fila['Apellido_M']);
		   $obj['ID_profesor']=$fila['ID_profesor'];
		   array_push($obj2,$obj);
}
echo json_encode($obj2);	


?>