<?php  
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';
$conn = mysqli_connect('localhost', 'root', '', 'ieapp');
$enviar_a = NULL;
//if (isset($_REQUEST['correo']) && !empty($_REQUEST['correo'] ))  {
    $email = "lizzyhinatagx@gmail.com";//$_REQUEST['correo'];
    $stm = "SELECT * FROM alumno WHERE Correo = '$email'";
    $result = mysqli_query($conn, $stm);
    if (mysqli_num_rows($result) > 0) {
        $user = mysqli_fetch_array($result);
	//	session_start();
	//	$_SESSION['user'] = $user['Nombre'];
	//	$_SESSION['email_user'] = $user['Correo'];
	//	$_SESSION['type'] = "Alumno";
	    $enviar_a = $user['Correo'];
		$id_ = $user['ID_alumno'];
		$tipo = "alumno";
		
	}
    else {
		echo "entra a ver profesor";
		echo $email;
		$stm = "SELECT * FROM profesor WHERE Correo = '$email'";
		$result = mysqli_query($conn, $stm);
		if (mysqli_num_rows($result) > 0) {
			echo "entra a num rows";
			$user = mysqli_fetch_array($result);
			$enviar_a = $user['Correo'];
			$id_ = $user['ID_profesor'];
			$tipo = "profesor";
	//		session_start();
	//		$_SESSION['user'] = $user['Nombre'];
	//		$_SESSION['email_user'] = $user['Correo'];
	//		$_SESSION['type'] = "Profesor";
			
			} 
		else {
				$response = array(
				'response' => 'false'
			);
			echo "else";
		}
	}
	if ($enviar_a!=NULL){
		$mail = new PHPMailer(true);
		$content = '<html>';
		$content .= '<h1>CORREO PARA RECUPERAR CONTRASEÑA</H1>';
	//	'<td class="td1">Asunto: '.$asunto.'</td></tr>';
		$content .='<a href="http://localhost/IEAppR/shared/cambiar_contra.php?id='.$id_.'&tipo='.$tipo.'">Cambiar contraseña';
	//	$content .='<a href="http://localhost/IEAppR/shared/cambiar_contra.php?id=1&tipo=alumno">Cambiar contraseña';
		$content .='</html>';
		try {
			  $mail->SMTPDebug = 0;                                       
			  $mail->isSMTP();                                           
			  $mail->Host       = 'smtp.gmail.com';                        
			  $mail->SMTPAuth   = true;                                   
			  $mail->Username   = 'xologabriela@gmail.com';                     
			  $mail->Password   = 'benihime';                               
			  $mail->SMTPSecure = 'tls';                                  
			  $mail->Port       = 587;                                    
			  $mail->setFrom('xologabriela@gmail.com', 'Administrador');
			  $mail->addAddress($enviar_a, 'Alumno'); 
			//  $mail->isHTML(true);                                  // Set email format to HTML
			//  $mail->Subject = 'Recuperacion de clave';
			//  $mail->Body    = "Ejemplo de recuperacion de clave";
              $mail->MsgHTML($content); 
			  $mail->send();
			  $response = array(
				'response' => 'true',
				);
              

      } catch (Exception $e) {
			$response = array(
			'response' => 'false'
			);
		echo "catch";
			
 
      }
	
	}
	else {
		$response = array(
		'response' => 'false'
	    );
		echo "null";
		
	}
echo(json_encode($response));
//}
//else{
  //  return 0;
//}

?>