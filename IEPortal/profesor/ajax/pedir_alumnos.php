<?php
include '../../shared/conexionle.php'; 
$conn=Conectarse(); 
if (!$conn) { 
die('Not connected : ' . mysql_error()); 
echo mysql_error();
}
mysqli_set_charset($conn, "utf8");
if(filter_input(INPUT_POST, 'buscar_id')){
$num1=filter_input(INPUT_POST, 'buscar_id');
//$consulta_n=$conn->query("SELECT * FROM Conversaciones where Categoria = '$num1'");
//SELECT * FROM alumno WHERE Clase_gramatical = 1 or Clase_conversacional = 1
$consulta_n=$conn->query("SELECT * FROM alumno WHERE Clase_gramatical = '$num1'"); 
$obj=array();
$obj2=array();
while ($fila = $consulta_n->fetch_array()){
		   $obj['nombre']=(string)$fila['Nombre'];
		   $obj['apellido']=(string)$fila['Apellido_P'];
		   $obj['apellido2']=(string)$fila['Apellido_M'];
		   $obj['correo']=(string)$fila['Correo'];
		   $obj['ids']=$fila['ID_alumno'];
		   array_push($obj2,$obj);
}
echo json_encode($obj2);	
}

?>