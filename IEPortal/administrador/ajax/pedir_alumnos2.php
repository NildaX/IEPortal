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


$consulta_n=$conn->query("SELECT * from alumno where Clase_conversacional is null;"); 
$nombres=array();
$ids=array();
while ($fila = $consulta_n->fetch_array()){
		   array_push($nombres,((string)$fila['Nombre'])." ". ((string)$fila['Apellido_P'])." ".((string)$fila['Apellido_M']));
		   array_push($ids,$fila['ID_alumno']);
}
$obj2['Nombres_alumnos_conversacional']=$nombres;
$obj2['ids_alumnos_conversacional']=$ids;

$consulta_n=$conn->query("SELECT * from clase JOIN profesor on clase.ID_profesor=profesor.ID_profesor where tipo='Gramatical';"); 
$profesores_gr=array();
$ids_gr=array();
while ($fila = $consulta_n->fetch_array()){
	       $consulta_n2=$conn->query("SELECT COUNT(Clase_gramatical) total FROM alumno where Clase_gramatical='$fila[ID_clase]';"); 
		   $fila2 = $consulta_n2->fetch_array();
		   if($fila2['total']<6){
			   array_push($profesores_gr,"profesor: ".((string)$fila['Nombre'])." ".((string)$fila['Apellido_P'])." ".((string)$fila['Apellido_M'])." Dias: ".((string)$fila['Dias'])." Horas: ". ((string)$fila['Horas']));
		       array_push($ids_gr,$fila['ID_clase']);
		   }
		   
}
$obj2['Clases_gramatical']=$profesores_gr;
$obj2['ids_gramatical']=$ids_gr;


$consulta_n=$conn->query("SELECT * from clase JOIN profesor on clase.ID_profesor=profesor.ID_profesor where tipo='Conversacional';"); 
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