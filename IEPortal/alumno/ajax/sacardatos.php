<?php
include '../../shared/conexionle.php'; 
$conn=Conectarse(); 
if (!$conn) { 
die('Not connected : ' . mysql_error()); 
echo mysql_error();
}
if(filter_input(INPUT_POST, 'buscar_id')){
$num1=filter_input(INPUT_POST, 'buscar_id');
$consulta_n=$conn->query("SELECT * FROM conversaciones where Categoria = '$num1'"); 
$obj=array();
$obj2=array();
	while ($fila = $consulta_n->fetch_array()){
		   $obj['nombre']=(string)$fila['Nombre'];
		   $obj['id']=$fila['ID_conv'];
		   $obj['url']=$fila['Ruta'];
		   array_push($obj2,$obj);
	}
echo json_encode($obj2);	
}

?>