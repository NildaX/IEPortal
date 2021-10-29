

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
include '../conexionle.php'; 
$conn=Conectarse(); 
if (!$conn) { 
die('Not connected : ' . mysql_error()); 
echo mysql_error();
}
//error 0---todo bien
//error 1---contrasena incorrecta
//error 2--usuario no habilitado
//error 3--correo incorrecta
mysqli_set_charset($conn, "utf8");
$email=filter_input(INPUT_POST, 'correo');
$pass=filter_input(INPUT_POST, 'contrasena');
$hash = Password::hash($pass);
$stm = "SELECT * FROM alumno WHERE Correo = '$email'";
$result = mysqli_query($conn, $stm);
$numero =mysqli_num_rows($result);
$error=1;
if ($numero == 1) {
	$user = mysqli_fetch_array($result);
	if (Password::verify($pass,$user['Password'])){
		if($user['HabilitadoA']==1){
			session_start();
			$_SESSION['user'] = $user['Nombre'];
			$_SESSION['email_user'] = $user['Correo'];
			$_SESSION['type'] = "Alumno";
			$_SESSION['ID'] = $user['ID_alumno'];
			$error=0;
		}
		else{
			$error=2;
		}
	} 
	else {
	   $error=1;	
	}
}
else{
	$stm = "SELECT * FROM profesor WHERE Correo = '$email'";// and Password = '$pass'";
	$result = mysqli_query($conn, $stm);
	$numero =mysqli_num_rows($result);
	if ($numero == 1) {
		$user = mysqli_fetch_array($result);
		if (Password::verify($pass,$user['Password'])){
			session_start();
			$_SESSION['user'] = $user['Nombre'];
			$_SESSION['email_user'] = $user['Correo'];
			$_SESSION['type'] = "Profesor";
			$_SESSION['ID'] = $user['ID_profesor'];
			$error=0;
		} 
		else {
		   $error=1;	
		}
	}
	else{
		$stm = "SELECT * FROM administrador WHERE Correo = '$email'";// and Password = '$pass'";
		$result = mysqli_query($conn, $stm);
		$numero =mysqli_num_rows($result);
		if ($numero == 1) {
			$user = mysqli_fetch_array($result);
			if (Password::verify($pass,$user['Password'])){
				session_start();
				$_SESSION['user'] = $user['Nombre'];
				$_SESSION['email_user'] = $user['Correo'];
				$_SESSION['type'] = "Administrador";
				$_SESSION['ID'] = $user['ID_administrador'];
				$error=0;
			} 
			else {
			   $error=1;	
			}
		}
		else{
			$error=3;	
		}
	}
}
$obj['error']=$error;
echo json_encode($obj);
?>