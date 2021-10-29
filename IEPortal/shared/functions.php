<?php
function user_verify(){
    return isset($_SESSION['user']);
   }
   user_verify();
   session_start();


?>