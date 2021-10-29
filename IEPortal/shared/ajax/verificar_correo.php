<?php  
class Password {
    const SALT = 'contrasenia';
    public static function hash($password) {
        return hash('sha512', self::SALT . $password);
    }
    public static function verify($password, $hash) {
        return ($hash == self::hash($password));
    }
}


use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';
$conn = mysqli_connect('localhost', 'raulnilda', 'XDLOL1234', 'ieapp');
$enviar_a = NULL;
if (isset($_REQUEST['correo']) && !empty($_REQUEST['correo'] ))  {
    $email = $_REQUEST['correo'];
    $stm = "SELECT * FROM alumno WHERE Correo = '$email'";
    $result = mysqli_query($conn, $stm);
    if (mysqli_num_rows($result) > 0) {
        $user = mysqli_fetch_array($result);
	    $enviar_a = $user['Correo'];
		$id_ = $user['ID_alumno'];
		$tipo = "alumno";
		$id_1=Password::hash($id_);
		$tipo_1 = Password::hash($tipo);
		
	}
    else {
		$stm = "SELECT * FROM profesor WHERE Correo = '$email'";
		$result = mysqli_query($conn, $stm);
		if (mysqli_num_rows($result) > 0) {
			$user = mysqli_fetch_array($result);
			$enviar_a = $user['Correo'];
			$id_ = $user['ID_profesor'];
			$tipo = "profesor";
			$id_1=Password::hash($id_);
			$tipo_1 = Password::hash($tipo);
			} 
		else {
				$response = array(
				'response' => 'false'
			);
		}
	}
	if ($enviar_a!=NULL){
		$mail = new PHPMailer(true);
		 $content = '<html>';
		 $content .=	'<body>';
		 $content .= 		'<table style="width: 100%; background-color:  #f2f2f2;">';
		 $content .= 			'<tr><td style="background-color:  #0275d8; text-align: center; "><h2>INTERNATIONAL ENGLISH</h2></td></tr>';
		 $content .= 			'<tr><td style="background-color:  #f2f2f2; text-align: center;"><h3>CORREO PARA RECUPERAR CONTRASENA</h4></td></tr>';
		 $content .=			'<tr><td style="background-color:  #f2f2f2;"><p  style="font-size: 22px;">Estas recibiendo este correo porque hiciste una solicitud de recuperacion de contraseña para tu cuenta en IEEApp, sino hiciste la solictud, haz caso omiso, si deseas continuar haz click en el siguiente boton:</p></td></tr>';
		 $content .=			'<tr><td style="background-color:  #f2f2f2;  text-align: center; padding-bottom: 30px;"><a style="display: inline-block; background-color: #0275d8; padding: 10px; color: #fff; text-decoration: none;"href="http://internationalenglish.co/IEPortal/shared/cambiar_contra.php?id='.$id_1.'&tipo='.$tipo_1.'">Cambiar contrasena</td></tr>';
		 $content .= 			'<tr><td style="background-color:  #0275d8;  text-align: center;"><p style="font-size: 25px;">IE International English | Empoderando latinos</p></td></tr>';
		 $content .= 		'</table>';
		 $content .= 	'</body>';
		 $content .='</html>';
		try {
			  $mail->SMTPDebug = 0;                                       
              $mail->Protocol = 'mail';                                 
			  $mail->Host       = 'smtp.gmail.com';                        
			  $mail->SMTPAuth   = true;                                   
			  $mail->Username   = 'ieinternationalenglish@gmail.com';          
			  $mail->Password   = '#latin@sempoderados2997';            
			  $mail->SMTPSecure = 'tls';                                  
			  $mail->Port       = 25;                                    
			  $mail->setFrom('ieinternationalenglish@gmail.com', 'Internarional English');
			  $mail->addAddress($enviar_a, 'Alumno'); 
			  $mail->Subject = 'Recuperacion de clave';
              $mail->MsgHTML($content); 
			  $mail->send();
			  $response = array(
				'response' => 'true',
				);
              

      } catch (Exception $e) {
			$response = array(
			'response' => 'false'
			);
			
 
      }
	
	}
	else {
		$response = array(
		'response' => 'false'
	    );
		
	}
echo(json_encode($response));
}
else{
   return 0;
}

?>