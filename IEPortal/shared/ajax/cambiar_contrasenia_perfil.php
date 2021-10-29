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
    $pas_nueva=$_REQUEST['password1'];
	$pas_enterior=$_REQUEST['password_anterior'];
	$hash_anterior= Password::hash($pas_enterior);
	$hash_nueva= Password::hash($pas_nueva);
	$email = $_SESSION['email_user'];
	if ($_SESSION['type'] == "Alumno"){
		$query = "SELECT * FROM alumno WHERE Correo = '$email'";	
		$tipo_num=1;
		
	}
	else{
		if ($_SESSION['type'] == "Profesor"){
			$query = "SELECT * FROM profesor WHERE Correo = '$email'";
			$tipo_num=2;
			
		}
		else{
			$query = "SELECT * FROM administrador WHERE Correo = '$email'";
			$tipo_num=3;
		
		}
	}
	$contra_hash='';
	$result = mysqli_query($mysql, $query);
	while ($f = mysqli_fetch_array($result, MYSQLI_ASSOC)){
			$contra_hash=$f['Password'];
	}
	if (Password::verify($pas_enterior, $contra_hash)) {
		if ($tipo_num==1){
			$instruccion="UPDATE alumno SET Password = '$hash_nueva' WHERE Correo = '$email' ";
		}
		else{
			if ($tipo_num==2){
				$instruccion="UPDATE profesor SET Password = '$hash_nueva' WHERE Correo = '$email' ";
			}
			else{
				$instruccion="UPDATE administrador SET Password = '$hash_nueva' WHERE Correo = '$email' ";
			}
			
		}
		$verificar=mysqli_query($mysql,$instruccion);
		if(!$verificar){
			 $errors[] = "Ha ocurrido un error en el cambio de contraseña, intentelo de nuevo más tarde";
		 }
		 else{
			 $messages[] = "La contraseña se ha cambiado correctamente, recuerdelo para el siguiente inicio de sesión";
		 }
	} else {
		$errors[] = "La contraseña anterior no es correcta";
	}
//	$messages[] = "La contraseña se ha cambiado correctamente, prueba iniciar sesión";
	
	
	if (isset($errors)){
			
			?>
			<div class="alert alert-danger" role="alert">
				<button type="button" class="close" data-dismiss="alert">&times;</button>
					<?php
						foreach ($errors as $error) {
								echo $error;
								?>
								<br>
								<?php
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
									?>
								<br>
								<?php
								}
							?>
				</div>
				<?php
			}