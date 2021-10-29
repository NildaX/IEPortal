<?php
include '../../shared/conexionle.php'; 
$conn=Conectarse(); 
if (!$conn) { 
die('Not connected : ' . mysql_error()); 
echo mysql_error();
}
mysqli_set_charset($conn, "utf8");
$consulta_n=$conn->query("SELECT ID_verbo, Espanol, Habilitado FROM verbos"); 
$obj=array();
$obj2=array();
while ($fila = $consulta_n->fetch_array()){
		   $obj['ID_verbo']=(string)$fila['ID_verbo'];
		   $obj['Espanol']=(string)$fila['Espanol'];
		   $obj['Habilitado']=(string)$fila['Habilitado'];
		   array_push($obj2,$obj);
}
echo json_encode($obj2);	

?> 