<?php
				include '../../shared/conexionle.php';
				$mysql=Conectarse(); 
				if (!$mysql) { 
				die('Not connected : ' . mysql_error()); 
				echo mysql_error();
				}
				mysqli_set_charset($mysql, "utf8");
				$consulta_n=$mysql->query("SELECT * FROM temas where Habilitado=1 order by Orden"); //session nivel 
				$cont=0; 
				$obj=array();
                $obj2=array();
				while ($fila = $consulta_n->fetch_array()){
					$obj['nombre']=$fila['Nombre'];
					$obj['idt']=$fila['ID_tema'];
					$obj['imgtema']=$fila['imgtema'];
					array_push($obj2,$obj);
				}
				echo json_encode($obj2,JSON_UNESCAPED_UNICODE);
			?>		