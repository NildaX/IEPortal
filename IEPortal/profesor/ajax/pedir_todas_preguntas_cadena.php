<?php
include '../../shared/conexionle.php'; 
$conn=Conectarse(); 
if (!$conn) { 
die('Not connected : ' . mysql_error()); 
echo mysql_error();
}
if(filter_input(INPUT_POST, 'buscar_id')){
$num1=filter_input(INPUT_POST, 'buscar_id');
mysqli_set_charset($conn, "utf8");
$consulta_n=$conn->query("SELECT preguntas.ID_po, preguntas.Habilitado FROM preguntas 
                            INNER JOIN temas 
                            on preguntas.ID_Tema = temas.ID_tema
                            WHERE temas.nombre LIKE '$num1';"); 
$obj=array();
$obj2=array();
while ($fila = $consulta_n->fetch_array()){
		   $obj['ID_po']=(string)$fila['ID_po'];
		   $obj['Habilitado']=(string)$fila['Habilitado'];
		   array_push($obj2,$obj);
}
echo json_encode($obj2);	
}

?>