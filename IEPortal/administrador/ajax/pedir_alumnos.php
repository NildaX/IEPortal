<?php
include '../../shared/conexionle.php'; 
$conn=Conectarse(); 
if (!$conn) { 
die('Not connected : ' . mysql_error()); 
echo mysql_error();
}
mysqli_set_charset($conn, "utf8");
$consulta_n=$conn->query("SELECT * from alumno where Clase_gramatical is null;"); 
$nombres=array();
$ids=array();
while ($fila = $consulta_n->fetch_array()){
		   array_push($nombres,((string)$fila['Nombre'])." ". ((string)$fila['Apellido_P'])." ".((string)$fila['Apellido_M']));
		   array_push($ids,$fila['ID_alumno']);
}
$obj2['Nombres_alumnos_gramatical']=$nombres;
$obj2['ids_alumnos_gramatical']=$ids;

$consulta_n=$conn->query("SELECT * from clase where tipo='Gramatical';"); 
$profesores_gr=array();
$ids_gr=array();
while ($fila = $consulta_n->fetch_array()){
		   array_push($profesores_gr,"profesor: ".((string)$fila['Nombre'])." ".((string)$fila['Apellido_P'])." ".((string)$fila['Apellido_M'])." Dias: ".((string)$fila['Dias'])." Horas: ". ((string)$fila['Horas']));
		   array_push($ids_gr,$fila['ID_clase']);
}
$obj2['Clases_gramatical']=$profesores_gr;
$obj2['ids_gramatical']=$ids_gr;


$consulta_n=$conn->query("SELECT * from alumno where Clase_conversacional is null;"); 
$nombres_cl=array();
$ids_cl=array();
while ($fila = $consulta_n->fetch_array()){
		   array_push($nombres_cl,((string)$fila['Nombre'])." ". ((string)$fila['Apellido_P'])." ".((string)$fila['Apellido_M']));
		   array_push($ids_cl,$fila['ID_alumno']);
}
$obj2['Nombres_alumnos_conver']=$nombres_cl;
$obj2['ids_alumnos_conver']=$ids_cl;

$consulta_n=$conn->query("SELECT * from clase where tipo='Conversacional';"); 
$profesores_con=array();
$ids_con=array();
while ($fila = $consulta_n->fetch_array()){
		   array_push($profesores_con,"profesor: ".((string)$fila['Nombre'])." ".((string)$fila['Apellido_P'])." ".((string)$fila['Apellido_M'])." Dias: ".((string)$fila['Dias'])." Horas: ". ((string)$fila['Horas']));
		   array_push($ids_con,$fila['ID_clase']);
}
$obj2['Clases_conversacional']=$profesores_con;
$obj2['ids_conversacional']=$ids_con;
echo json_encode($obj2);	


?>