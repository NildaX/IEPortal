<?php
include '../../shared/conexionle.php'; 
$conn=Conectarse(); 
if (!$conn) { 
die('Not connected : ' . mysql_error()); 
echo mysql_error();
}
mysqli_set_charset($conn, "utf8");
$consulta_n=$conn->query("SELECT * from temas where Habilitado=1 order by Orden;"); 
$obj=array();
$obj2=array();
while ($fila = $consulta_n->fetch_array()){
		   $obj['Nombre']=(string)$fila['Nombre'];
		   $obj['id_t']=$fila['ID_tema'];
		   array_push($obj2,$obj);
}
echo json_encode($obj2);	


?>