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
$consulta_n=$conn->query("SELECT * FROM clase WHERE ID_clase = '$num1'"); 
$obj_clase=array();
$bandera=0;
while ($fila = $consulta_n->fetch_array()){
	$dias=$fila['Dias'];
	$horas=$fila['Horas'];
}
$dias_a=explode("-",$dias);
$horas_a=explode("-",$horas);
date_default_timezone_set('America/Mexico_City'); 
$dias = array("Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sábado");
$dia_actual=$dias[date('w',time())];
for ($i=0;$i<count($dias_a);$i++){
	if($dias_a[$i]==$dia_actual){
		$hora_actual =date('H:i', time());  
		if($horas_a[0]<$hora_actual and $hora_actual<$horas_a[1]){//<$horas_a[1]){
			$bandera=1;
		}
	}
}


if($bandera==1){
	$consulta_n=$conn->query("SELECT * FROM alumno WHERE Clase_gramatical = '$num1' or Clase_conversacional ='$num1'"); 
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
else{
	$obj2=array();
	$obj2['Error']="No es posible el pase de lista, hasta que sea el dia y la hora indicada";
	echo json_encode($obj2);	
	
}
}

?>