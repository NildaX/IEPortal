<?php
session_start();
$id_profesor = $_SESSION['ID'];
include '../../shared/conexionle.php';
$conn=Conectarse(); 
if (!$conn) { 
die('Not connected : ' . mysql_error()); 
echo mysql_error();
}
mysqli_set_charset($conn, "utf8");
$obj=array();
$obj2=array();
$query = "SELECT * FROM clase  where ID_profesor=$id_profesor";
$result = mysqli_query($conn, $query);
$arr_ids=array();
while ($f = mysqli_fetch_array($result, MYSQLI_ASSOC)){
	array_push($arr_ids,$f['ID_clase']);
}
$obj=array();
$obj2=array();
$ids_alumnos=array();
for($i=0;$i<count($arr_ids);$i++){
	$consulta_n=$conn->query("SELECT * FROM alumno WHERE Clase_gramatical = '$arr_ids[$i]' or Clase_conversacional = '$arr_ids[$i]';"); 
	while ($fila = $consulta_n->fetch_array()){
		if (!in_array($fila['ID_alumno'], $ids_alumnos)) {
		   $obj['nombre']=((string)$fila['Nombre'])." ". ((string)$fila['Apellido_P'])." ".((string)$fila['Apellido_M']);
		   $obj['ids']=$fila['ID_alumno'];
		   array_push($ids_alumnos,$fila['ID_alumno']);
		   array_push($obj2,$obj);
		}
    }
}
echo json_encode($obj2);	


?>