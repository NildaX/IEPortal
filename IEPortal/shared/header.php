<!--Navbar-->
<link rel="stylesheet" href="../shared/uicons-regular-rounded/css/uicons-regular-rounded.css">
	<link>
<h3 id="tipo" style="display: none" > <?php  echo $tipo = $_SESSION['type']; ?> </h3>
<nav class="navbar navbar-expand-lg navbar-dark bg-primary" id="menu">
  <!-- Navbar brand -->
  <a class="navbar-brand" href="http://internationalenglish.co/"><img src="../shared/assets/img/logotipo.webp" alt="International English"></a>
  <!-- Collapse button -->
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#movil"
    aria-controls="movil" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <!-- Collapsible content -->
  
    <div class="collapse navbar-collapse" id="movil">
    <!-- Links -->
    <ul class="navbar-nav ml-auto ">
      <li class="nav-item active">
        <a class="nav-link" href="../shared/login.php">Iniciar Sesión</a>
      </li>
    </ul>
    <!-- Links -->
    </div>
 
  <!-- Collapsible content -->
</nav>
  <script src="../shared/js/verificacion-usuario.js"></script>