<?php
session_start();
setcookie("emailsesion", '', time()-7200, "/");
setcookie("idusuario", '', time()-7200, "/");
setcookie("tipousuario", '', time()-7200, "/");
session_destroy();
?>
<script>
setTimeout(function () {
    window.location.href = "login.php";
}, 1000);
</script>
