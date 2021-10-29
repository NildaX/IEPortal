<?php

   include '../../shared/conexionle.php'; 
   $mysql=Conectarse(); 
	if (!$mysql) { 
	die('Not connected : ' . mysql_error()); 
	echo mysql_error();
	}
	
	mysqli_set_charset($mysql, "utf8");
	$tipo=$_POST['tipo'];
	$fecha_i=$_POST['fecha_inicio'];
	$fecha_f=$_POST['fecha_final'];
	$clase_alumno=$_POST['clase_alumno'];
	$obj=array();
    $obj2=array();
	$columnas_fecha=array();
	$renglones_a=array();
	$arreglo_desc=array();
	if ($tipo==1){
		
		$query_fechas="SELECT DISTINCT Fecha from alumno JOIN registro_asistencia_alumnos on alumno.ID_alumno=registro_asistencia_alumnos.ID_alumno where ID_clase='$clase_alumno' and Fecha between '$fecha_i' and '$fecha_f' ORDER by Fecha";
	}
	else{
		$clase=$_POST['clase'];
		$query_fechas="SELECT DISTINCT Fecha from alumno JOIN registro_asistencia_alumnos on alumno.ID_alumno=registro_asistencia_alumnos.ID_alumno where registro_asistencia_alumnos.ID_alumno='$clase_alumno' and registro_asistencia_alumnos.ID_clase = '$clase' and Fecha between '$fecha_i' and '$fecha_f' ORDER by Fecha";
	}
	$result = mysqli_query($mysql, $query_fechas);
	while ($f = mysqli_fetch_array($result, MYSQLI_ASSOC)){
		array_push($columnas_fecha,$f['Fecha']);
	}
	$obj2['columnas_fecha']=$columnas_fecha;
	
	if ($tipo==1){
		$query_ids_alumnos="SELECT DISTINCT registro_asistencia_alumnos.ID_alumno from alumno JOIN registro_asistencia_alumnos on alumno.ID_alumno=registro_asistencia_alumnos.ID_alumno where ID_clase='$clase_alumno' and Fecha between '$fecha_i' and '$fecha_f' ORDER by registro_asistencia_alumnos.ID_alumno";
	    $result = mysqli_query($mysql, $query_ids_alumnos);
		while ($f = mysqli_fetch_array($result, MYSQLI_ASSOC)){
			array_push($renglones_a,$f['ID_alumno']);
		}
		$obj2['diferentes_alumnos']=$renglones_a;
	}
	if ($tipo==1){ //por grupo
		$query  = "select * from alumno JOIN registro_asistencia_alumnos on alumno.ID_alumno=registro_asistencia_alumnos.ID_alumno where ID_clase='$clase_alumno' and Fecha between '$fecha_i' and '$fecha_f' ORDER by Fecha";
	}
	else{ //por alumno
		$query = "select * from alumno JOIN registro_asistencia_alumnos on alumno.ID_alumno=registro_asistencia_alumnos.ID_alumno where registro_asistencia_alumnos.ID_alumno='$clase_alumno' and registro_asistencia_alumnos.ID_clase = '$clase' and Fecha between '$fecha_i' and '$fecha_f' ORDER by Fecha";
	}
	$result = mysqli_query($mysql, $query);
	$cantidad=0;
	while ($f = mysqli_fetch_array($result, MYSQLI_ASSOC)){
	   $obj['Nombre']=((string)$f['Nombre'])." ". ((string)$f['Apellido_P'])." ".((string)$f['Apellido_M']);
	   $obj['ID_clase']=$f['ID_clase'];
	   $obj['ID_alumno']=$f['ID_alumno'];
	   $obj['Fecha']=$f['Fecha'];
	   $obj['Asistencia']=$f['Asistencia'];
	//   $cantidad=$cantidad+1;
	   
	   array_push($obj2,$obj);
	}
//	obj2['cantidad']=$cantidad;
	echo json_encode($obj2);	
	
	?>