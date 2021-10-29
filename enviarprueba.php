<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';



      $mail = new PHPMailer(true);

      try {
          //Server settings
          $mail->SMTPDebug = 0;                                       // Enable verbose debug output
          $mail->Protocol = 'mail';
          //$mail->isSMTP();                                            // Set mailer to use SMTP
          $mail->Host       = 'smtp.gmail.com';                        // Specify main and backup SMTP servers
          //$mail->SMTPAuth   = true;                                   // Enable SMTP authentication
          $mail->Username   = 'xologabriela@gmail.com';                     // SMTP username
          $mail->Password   = 'benihime';                               // SMTP password
          $mail->SMTPSecure = 'tls';                                  // Enable TLS encryption, `ssl` also accepted
          $mail->Port       = 25;                                    // TCP port to connect to
          $mail->SMTPDebug = 2;
          //Recipients
          $mail->setFrom('xologabriela@gmail.com', 'Aministrador');
          $mail->addAddress("link_2642@hotmail.com", 'Alumno');     // Add a recipient
          //$mail->addAddress("raul.romerod26@gmail.com", 'Alumno'); 

          // Attachments
          //$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
          //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name

          // Content
          $mail->isHTML(true);                                  // Set email format to HTML
          $mail->Subject = 'Correo de prueba';
          $mail->Body    = "PRUEBA DESDE EL HOST 2 aca va la clave";

          $mail->send();
          echo "Correo enviado prueba hosting real";

      } catch (Exception $e) {
        echo"Error al enviar email";
		echo $e;
 
      }
