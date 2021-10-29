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
$consulta_n=$conn->query("SELECT registro_respuestas.ID_alumno, registro_respuestas.ID_tema, alumno.Nombre as NombreAlumno, temas.Nombre, temas.Habilitado, registro_respuestas.ids_preguntas, registro_respuestas.Num_errores 
                            FROM registro_respuestas 
                            INNER JOIN alumno
                            ON registro_respuestas.ID_alumno = alumno.ID_alumno 
                            INNER JOIN temas
                            WHERE registro_respuestas.ID_tema = temas.ID_tema AND temas.Habilitado=1 AND alumno.Clase_gramatical = $num1
                            ORDER BY `registro_respuestas`.`ID_alumno` ASC"); 
$obj=array();
$obj2=array();
while ($fila = $consulta_n->fetch_array()){
		   $obj['ID_alumno']=(string)$fila['ID_alumno'];
		   $obj['ID_tema']=(string)$fila['ID_tema'];
           $obj['NombreAlumno']=(string)$fila['NombreAlumno'];
           $obj['Nombre']=(string)$fila['Nombre'];
           $obj['ids_preguntas']=(string)$fila['ids_preguntas'];
           $obj['Num_errores']=(string)$fila['Num_errores'];
		   array_push($obj2,$obj);
}
echo json_encode($obj2);	
}

?>