<?php           
               
				include '../../shared/conexionle.php';
                session_start();
				$mysql=Conectarse(); 
				if (!$mysql) { 
				die('Not connected : ' . mysql_error()); 
				echo mysql_error();
				}
				mysqli_set_charset($mysql, "utf8");
                $email = $_SESSION['email_user'];
				$consulta_n=$mysql->query("SELECT * FROM alumno WHERE Correo = '$email'"); //session nivel 
				$cont=0; 
				$obj=array();
                $obj2=array();
				while ($fila = $consulta_n->fetch_array()){
					$obj['temasCompletos']=$fila['temas_completos'];
					array_push($obj2,$obj);
				}
				echo json_encode($obj2,JSON_UNESCAPED_UNICODE);
			?>		