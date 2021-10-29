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
$consulta_n=$conn->query("SELECT registro_verbos.ID_alumno, alumno.Nombre as NombreAlumno,  registro_verbos.ids_verbos, registro_verbos.Num_errores 
                            FROM registro_verbos 
                            INNER JOIN alumno
                            ON registro_verbos.ID_alumno = alumno.ID_alumno
                            WHERE  alumno.Clase_gramatical = $num1
                            ORDER BY `registro_verbos`.`ID_alumno` ASC"); 
$obj=array();
$obj2=array();
while ($fila = $consulta_n->fetch_array()){
		   $obj['ID_alumno']=(string)$fila['ID_alumno'];
           $obj['NombreAlumno']=(string)$fila['NombreAlumno'];
           $obj['ids_verbos']=(string)$fila['ids_verbos'];
           $obj['Num_errores']=(string)$fila['Num_errores'];
		   array_push($obj2,$obj);
}
echo json_encode($obj2);	
}

?>