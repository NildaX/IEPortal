<?php
include '../../shared/conexionle.php';
$mysql=Conectarse(); 
if (!$mysql) { 
die('Not connected : ' . mysql_error()); 
echo mysql_error();
}
$obj=array();
$obj2=array();
mysqli_set_charset($mysql, "utf8");
$consulta_n=$mysql->query("SELECT distinct Categoria FROM conversaciones"); //session nivel 
$cont=0; 
while ($fila = $consulta_n->fetch_array()){
	$obj['Categoria']=$fila['Categoria'];
	array_push($obj2,$obj);
}
echo json_encode($obj2,JSON_UNESCAPED_UNICODE);

?>