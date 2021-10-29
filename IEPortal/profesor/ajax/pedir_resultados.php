<?php
include '../../shared/conexionle.php'; 
$conn=Conectarse(); 
if (!$conn) { 
die('Not connected : ' . mysql_error()); 
echo mysql_error();
}
if(filter_input(INPUT_POST, 'buscar_id')){
$num1=filter_input(INPUT_POST, 'buscar_id');
$numtema=filter_input(INPUT_POST, 'buscar_tema');
$consulta_n=$conn->query("SELECT * FROM registro_respuestas WHERE ID_alumno LIKE '%$num1%' AND ID_tema LIKE '%$numtema%';"); 
$obj=array();
$obj2=array();
while ($fila = $consulta_n->fetch_array()){
		   $obj['ids_preguntas']=(string)$fila['ids_preguntas'];
		   $obj['num_errores']=(string)$fila['Num_errores'];
		   array_push($obj2,$obj);
}
echo json_encode($obj2);	
}

?>