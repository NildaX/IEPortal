	<?php
				require '../functions.php';
				if(!isset($_SESSION['user'])){
				header('Location: login.php');
				}
				include '../conexionle.php'; 
				$mysql=Conectarse(); 
				if (!$mysql) { 
				die('Not connected : ' . mysql_error()); 
				echo mysql_error();
				} 
				mysqli_set_charset($mysql, "utf8");
				$arreglo_ids=array();
				$arreglo_profesores=array();
				$arreglo_dias=array();
				$arreglo_horario=array();
				$user=array();
				$email = $_SESSION['email_user'];
				if ($_SESSION['type'] == "Alumno"){
				//	$stm = "SELECT * FROM alumno WHERE Correo = '$email'";	
					$stm = "SELECT * FROM alumno JOIN clase on alumno.Clase_conversacional=clase.ID_clase or alumno.Clase_gramatical=clase.ID_clase WHERE Correo = '$email'";
					$user['tipo']="alumno";
			    }
				else{
					if ($_SESSION['type'] == "Profesor"){
						$stm = "SELECT * FROM profesor WHERE Correo = '$email'";
						$user['tipo']="profesor";
					}
					else{
						$stm = "SELECT * FROM administrador WHERE Correo = '$email'";
						$user['tipo']="administrador";
					}
				}
				$result = mysqli_query($mysql, $stm);
				//echo(mysqli_num_rows($result));
				if (mysqli_num_rows($result) > 0) {
					while ($base = mysqli_fetch_array($result)){
					
					$user['nombre']=$base['Nombre'];
					$user['apellido_m']=$base['Apellido_M'];
					$user['apellido_p']=$base['Apellido_P'];
					$user['correo']=$base['Correo'];
					$user['edad']=$base['Edad'];
					$user['foto']=$base['Foto'];
					if ($base['Telefono']==NULL || $base['Telefono']==0){
						$user['telefono']="";
					}
					else{
						$user['telefono']=$base['Telefono'];
					}
					if ($base["Sexo"] == "M"){
						$user["sexo"] = "Masculino";
					}
					else{
						$user["sexo"] = "Femenino";
					}
						
					if ($user['tipo']=="alumno"){
						
						array_push($arreglo_ids,$base['Tipo']);
						array_push($arreglo_dias,$base['Dias']);
						array_push($arreglo_horario,$base['Horas']);
						$stm3 = "SELECT * FROM profesor WHERE ID_profesor = '$base[ID_profesor]'";
						$result3 = mysqli_query($mysql, $stm3);
						if (mysqli_num_rows($result3) > 0) {
							$user3 = mysqli_fetch_array($result3);
							array_push($arreglo_profesores,$user3['Apellido_P']);
						 }
					$user['arreglo_ids']=$arreglo_ids;
					$user['arreglo_profesores']=$arreglo_profesores;
					$user['arreglo_dias']=$arreglo_dias;
					$user['arreglo_horario']=$arreglo_horario;	
					}
				  }//while
				 }
				else{
					$stm = "SELECT * FROM alumno WHERE Correo = '$email'";	
					$result = mysqli_query($mysql, $stm);
					$base = mysqli_fetch_array($result);
					$user['nombre']=$base['Nombre'];
					$user['apellido_m']=$base['Apellido_M'];
					$user['apellido_p']=$base['Apellido_P'];
					$user['correo']=$base['Correo'];
					$user['edad']=$base['Edad'];
					$user['foto']=$base['Foto'];
					if ($base['Telefono']==NULL || $base['Telefono']==0){
						$user['telefono']="";
					}
					else{
						$user['telefono']=$base['Telefono'];
					}
					if ($base["Sexo"] == "M"){
						$user["sexo"] = "Masculino";
					}
					else{
						$user["sexo"] = "Femenino";
					}
				}
				echo json_encode($user,JSON_UNESCAPED_UNICODE);
				?>