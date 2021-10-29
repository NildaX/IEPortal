<?php
include '../../shared/conexionle.php'; 
$conn=Conectarse(); 
if (!$conn) { 
die('Not connected : ' . mysql_error()); 
echo mysql_error();
}
mysqli_set_charset($conn, "utf8");
$categoria=filter_input(INPUT_POST, 'categoria_buscar');
$consulta_n=$conn->query("SELECT * from conversaciones where Categoria='$categoria';"); 
$obj=array();
$obj2=array();
while ($fila = $consulta_n->fetch_array()){
		   $obj['nombre']=(string)$fila['Nombre'];
		   $obj['id']=$fila['ID_conv'];
		   $obj['archivo']=$fila['Ruta'];
		   $obj['categoria']=$fila['Categoria'];
		   array_push($obj2,$obj);
}
echo json_encode($obj2);	


?>