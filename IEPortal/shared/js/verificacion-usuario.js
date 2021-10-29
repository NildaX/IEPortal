(function() {
    var tipo = document.getElementById('tipo'),
        menu = document.getElementById('menu');
     tipo.style.display = 'none';
     // console.log(tipo.innerHTML);
     var html = tipo.innerHTML;
      function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }
    var escoger = readCookie('tipousuario');
    
     if(escoger === 'Alumno'){
         //console.log('es alumno')
         menu.innerHTML = `
         
         <!-- Navbar brand -->
         <a class="navbar-brand" href="http://internationalenglish.co/"><img src="../shared/assets/img/logotipo.webp" alt=""></a>
         <!-- Collapse button -->
         <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#movil"
             aria-controls="movil" aria-expanded="false" aria-label="Toggle navigation">
             <span class="navbar-toggler-icon"></span>
         </button>
         <!-- Collapsible content -->
         <div class="collapse navbar-collapse" id="movil">
             <!-- Links -->
             <ul class="navbar-nav ml-auto">
             <li class="nav-item active">
                 <a class="nav-link" href="../shared/perfil.php"><i class="fi  fi-rr-user"></i> Perfil</a>
             </li>
             <li class="nav-item">
                 <a class="nav-link" href="../alumno/temas.php"><i class="fi  fi-rr-grid"></i> Temario</a>
             </li>
             <li class="nav-item">
                 <a class="nav-link" href="../alumno/verbos.php"><i class="fi  fi-rr-test"></i> Verbos</a>
             </li>
             <li class="nav-item">
                 <a class="nav-link" href="../alumno/vocabulario.php"><i class="fi  fi-rr-comment-alt"></i> Vocabulario</a>
             </li>
             <li class="nav-item">
                 <a class="nav-link" href="../alumno/conversasiones.php"><i class="fi fi-rr-e-learning"></i> Conversasiones</a>
             </li>
             <li class="nav-item">
                 <a class="nav-link" href="../shared/cerrar.php"><i class="fi fi-rr-sign-out"></i> Cerrar Sesión</a>
             </li>
             </ul>
             <!-- Links -->
         </div>
         <!-- Collapsible content -->
         `
     }else{
         if(escoger === 'Profesor'){
             //console.log('es profesor')
             menu.innerHTML = `
             
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
                 <ul class="navbar-nav ml-auto">
                 <li class="nav-item active">
                     <a class="nav-link" href="../shared/perfil.php"><i class="fi  fi-rr-user"></i> Perfil</a>
                 </li>
                 <li class="nav-item">
                     <a class="nav-link" href="../profesor/clases.php"><i class="fi  fi-rr-stats"></i> Mis alumnos</a>
                 </li>
                 <li class="nav-item">
                     <a class="nav-link" href="../profesor/pase-lista.php"><i class="fi  fi-rr-list-check"></i> Pasar Lista</a>
                 </li>
                 <li class="nav-item">
                     <a class="nav-link" href="../profesor/registro-asistencia.php"><i class="fi  fi-rr-list"></i> Registro asistencia</a>
                 </li>
                 <li class="nav-item">
                     <a class="nav-link" href="../shared/cerrar.php"><i class="fi fi-rr-sign-out"></i> Cerrar Sesión</a>
                 </li>
                 </ul>
                 <!-- Links -->
             </div>
             <!-- Collapsible content -->
             `
         }else{
             if(escoger === 'Administrador'){
                 //console.log('es administrador');
                 menu.innerHTML = `
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
                 <ul class="navbar-nav ml-auto">
                 
                 <li class="nav-item active">
                     <a class="nav-link" href="../shared/perfil.php"><i class="fi  fi-rr-user"></i> Perfil</a>
                 </li>
                 <li class="nav-item dropdown">
                 <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                     <i class="fi fi-rr-users"></i> Alumnos
                 </a>
                 <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                     <a class="dropdown-item" href="../administrador/asignar_alumnos2.php"><i class="fi fi-rr-edit"></i> Asignar Alumnos</a>
                     <a class="dropdown-item" href="../administrador/mostrar_alumnos.php"> <i class="fi fi-rr-edit"></i> Alumnos</a>
                 </div>
            </li>
                 <li class="nav-item">
                     <a class="nav-link" href="../administrador/mostrar_clases.php"><i class="fi fi-rr-edit"></i> Clases</a>
                 </li>
                 <li class="nav-item">
                 <a class="nav-link" href="../administrador/clases.php"><i class="fi fi-rr-stats"></i> Graficas</a>
             </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fi fi-rr-edit"></i></i> Agregar y Editar 
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="../administrador/mostrar_preguntas.php"><i class="fi fi-rr-add"></i> Preguntas</a>
                        <a class="dropdown-item" href="../administrador/mostrar_verbos.php"><i class="fi fi-rr-add"></i> Verbos</a>
                        <a class="dropdown-item" href="../administrador/mostrar_conversaciones.php"><i class="fi fi-rr-add"></i> Conversaciones</a>
                        <a class="dropdown-item" href="../administrador/mostrar_vocabulario.php"><i class="fi fi-rr-add"></i> Vocabulario</a>
                        <a class="dropdown-item" href="../administrador/mostrar_temas.php"><i class="fi fi-rr-add"></i> Temas</a>
                    </div>
               </li>
                 <li class="nav-item">
                 <a class="nav-link" href="../shared/cerrar.php"><i class="fi fi-rr-sign-out"></i> Cerrar Sesion</a>
                 </li>
                 </ul>
                 <!-- Links -->
             </div>
             <!-- Collapsible content -->
             `
             }
             //console.log('no es nada');
         }
         //console.log('no entro a alumno');
     }
  })();