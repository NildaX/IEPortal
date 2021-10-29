<?php
class Password {
    const SALT = '70g$7D4DKfhVgjy!B$jY^*^Rc9B&G@L&#JXp&$9!f@#tXEvIrD';
    public static function hash($password) {
        return hash('sha512', self::SALT . $password);
    }
    public static function verify($password, $hash) {
        return ($hash == self::hash($password));
    }
	const SALT2 = 'contrasenia';
    public static function hash2($password) {
        return hash('sha512', self::SALT2 . $password);
    }
    public static function verify2($password, $hash) {
        return ($hash == self::hash2($password));
    }
}
   include '../../shared/conexionle.php'; 
   $mysql=Conectarse(); 
	if (!$mysql) { 
	die('Not connected : ' . mysql_error()); 
	echo mysql_error();
	} 
    
	$pas=$_REQUEST['password1'];
	$hash= Password::hash($pas);
	$id_buscar = $_REQUEST['id_'];
	$tipo = $_REQUEST['tipo_'];
	$revisar_ids=array();
	$tipo_num =0;
	if (Password::verify2('alumno', $tipo)) {
		$tipo_num=1;
	    $query = "SELECT * FROM alumno"; //mysqli_query
		$result = mysqli_query($mysql, $query);
		while ($f = mysqli_fetch_array($result, MYSQLI_ASSOC)){
			array_push($revisar_ids,$f['ID_alumno']);
		}
	} 
	else {
		if (Password::verify2('profesor', $tipo)) {
			$tipo_num=2;
			$query = "SELECT * FROM profesor";
			$result = mysqli_query($mysql, $query);
			while ($f = mysqli_fetch_array($result, MYSQLI_ASSOC)){
				array_push($revisar_ids,$f['ID_profesor']);
			}
		} else {
				if (Password::verify2('administrador', $tipo)) {
					$tipo_num=3;
					$query = "SELECT * FROM administrador";
					$result = mysqli_query($mysql, $query);
					while ($f = mysqli_fetch_array($result, MYSQLI_ASSOC)){
						array_push($revisar_ids,$f['ID_administrador']);
					}
				} else {
						$errors []= "Lo siento, Ha ocurrido un error con la base de datos, intente de nuevo \n";
				}
		}
	}
	$id_cambiar_c=NULL;
	foreach ($revisar_ids as $id_) {
		if (Password::verify2($id_, $id_buscar)) {
			$id_cambiar_c=$id_;
		}
	}
	if ($id_cambiar_c===NULL){
		$errors []= "Lo siento, el correo ingresado no existe en la base de datos, o se ha alterado el enlace";
	}
	else{
		//aqui iria ya cambiar la contraseña
		if ($tipo_num==1){
			$instruccion="UPDATE alumno SET Password = '$hash' WHERE ID_alumno ='$id_cambiar_c' ";
		}
		else{
			if ($tipo_num==2){
				$instruccion="UPDATE profesor SET Password = '$hash' WHERE ID_profesor ='$id_cambiar_c' ";
			}
			else{
				$instruccion="UPDATE administrador SET Password = '$hash' WHERE ID_administrador ='$id_cambiar_c' ";
			}
			
		}
		$verificar=mysqli_query($mysql,$instruccion);
		if(!$verificar){
			 $errors[] = "Ha ocurrido un error en el cambio de contraseña, intentelo de nuevo más tarde";
		 }
		 else{
			 $messages[] = "La contraseña se ha cambiado correctamente, prueba iniciar sesión";
		 }
	
    }
	
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