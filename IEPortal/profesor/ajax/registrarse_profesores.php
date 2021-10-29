<?php
class Password {
    const SALT = '70g$7D4DKfhVgjy!B$jY^*^Rc9B&G@L&#JXp&$9!f@#tXEvIrD';
    public static function hash($password) {
        return hash('sha512', self::SALT . $password);
    }
    public static function verify($password, $hash) {
        return ($hash == self::hash($password));
    }
}
   include '../../shared/conexionle.php'; 
   $mysql=Conectarse(); 
	if (!$mysql) { 
	die('Not connected : ' . mysql_error()); 
	echo mysql_error();
	} 
	mysqli_set_charset($mysql, "utf8");
	$pas= $_REQUEST['password1'];
	$hash = Password::hash($pas);
	$tel= $_REQUEST['telefono'];
	$sexo = $_REQUEST['sexo'];
	if ($sexo == "hombre"){
		$s = "M";
		$fotog = "../shared/assets/img/perfilM.png";
	}
	else{
		$s = "F";
		$fotog = "../shared/assets/img/perfilF.png";
	}
	
	if ($tel != ""){
		$instruccion="insert into profesor(Nombre,Apellido_P,Apellido_M,Correo,Password,Telefono,Edad,Sexo,Foto)
              	values ('$_REQUEST[nombre]','$_REQUEST[apellidop]','$_REQUEST[apellidom]','$_REQUEST[correo]','$hash','$_REQUEST[telefono]','$_REQUEST[edad]','$s','$fotog')";
		              	
	$verificar=mysqli_query($mysql,$instruccion);
	if(!$verificar){
	  $errors []= "Lo siento, el correo que ingreso ya esta registrado, intente con uno nuevo";
     }
	 else{
		 $messages[] = "El registro se ha completado exitosamente, ya puede iniciar sesión";
	 }
	}
	else{
		$instruccion="insert into profesor(Nombre,Apellido_P,Apellido_M,Correo,Password,Edad,Sexo,Foto)
              	values ('$_REQUEST[nombre]','$_REQUEST[apellidop]','$_REQUEST[apellidom]','$_REQUEST[correo]','$hash','$_REQUEST[edad]','$s','$fotog')";
		               	
	$verificar=mysqli_query($mysql,$instruccion);
	if(!$verificar){
	  $errors []= "Lo siento, el correo que ingreso ya esta registrado, intente con uno nuevo";
     }
	 else{
		 $messages[] = "El registro se ha completado exitosamente, ya puede iniciar sesión";
	 }
		
	}

    if (isset($errors)){
			
			?>
			<div class="alert alert-danger" role="alert">
				<button type="button" class="close" data-dismiss="alert">&times;</button>
					<?php
						foreach ($errors as $error) {
								echo $error;
							}
						?>
			</div>
			<?php
			}
			if (isset($messages)){
				
				?>
				<div class="alert alert-success" role="alert">
						<button type="button" class="close" data-dismiss="alert">&times;</button>
						<?php
							foreach ($messages as $message) {
									echo $message;
								}
							?>
				</div>
				<?php
			}	
?>