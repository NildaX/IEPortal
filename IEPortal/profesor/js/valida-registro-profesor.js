(function(){
    

	var formulario = document.getElementById('formulario'),
        nombre = formulario.nombre,
        apellidop = formulario.apellidop,
        apellidom = formulario.apellidom,
        correo = formulario.correo,
        contrasena = formulario.password1,
        contrasena2 = formulario.password2,
        edad = formulario.edad,
        error = document.getElementById('error');
    var password = document.getElementById('password2');
    var sexom = document.getElementById('hombre');
    var sexof = document.getElementById('mujer');
	
    function validarNombre(e){
		
        if(nombre.value == '' || nombre.value == null){
            //console.log('Por favor completa el campo de Nombre');
            error.style.display = 'block';
            error.innerHTML += '<li>Por favor completa el campo de Nombre</li>'
            e.preventDefault();
        }
    }
    function validarAp(e){
		
        if(apellidop.value == '' || apellidop.value == null){
            //console.log('Por favor completa el campo de Apellido Paterno');
            error.style.display = 'block';
            error.innerHTML += '<li>Por favor completa el campo de Apellido Paterno</li>'
            e.preventDefault();
        }
    }
    function validarAm(e){

        if(apellidom.value == '' || apellidom.value == null){
            //console.log('Por favor completa el campo de Apellido Materno');
            error.style.display = 'block';
            error.innerHTML += '<li>Por favor completa el campo de Apellido Materno</li>'
            e.preventDefault();
        }
    }
    function validarContrasena(e){
        if(contrasena.value == '' || contrasena.value == null){
            //console.log('Por favor completa el campo de Contraseña');
            error.style.display = 'block';
            error.innerHTML += '<li>Por favor completa el campo de Contraseña</li>'
            e.preventDefault();
        }
        if(contrasena2.value == '' || contrasena2.value == null){
            //console.log('Por favor completa el campo de Contraseña');
            error.style.display = 'block';
            error.innerHTML += '<li>Por favor completa el campo de repetir contraseña</li>'
            e.preventDefault();
        }
		if(contrasena.value != contrasena2.value){
            //console.log('Las contraseñas ingresadas no coinciden');
            error.style.display = 'block';
            error.innerHTML += '<li>Las contraseñas ingresadas no coinciden</li>'
            e.preventDefault();
        }
    }
   
    function validarCorreo(e){
        if(correo.value == '' || correo.value == null){
            //console.log('Por favor completa el campo de Correo');
            error.style.display = 'block';
            error.innerHTML += '<li>Por favor completa el campo de Correo</li>'
            e.preventDefault();
        }
    }
    function validarEdad(e){
        if(edad.value == '' || edad.value == null){
            //console.log('Por favor ingrgresa tu edad');
            error.style.display = 'block';
            error.innerHTML += '<li>Por favor ingresa tu edad</li>'
            e.preventDefault();
        }
    }
    function validarSexo(e){
        if(sexom.checked == false && sexof.checked == false){
            //console.log('Por favor selecciona un Sexo');
            error.style.display = 'block';
            error.innerHTML += '<li>Por favor selecciona un Sexo</li>'
            e.preventDefault();
        }
    }

    
    

    function validarFormulario(e){
		$("#resultados").html("");
        error.innerHTML = '';
        validarNombre(e);
        validarAp(e);
        validarAm(e);
        validarCorreo(e);
        validarContrasena(e);
        validarEdad(e);
        validarSexo(e);
		var verificar_1 = document.getElementById('error');
        var contenido_1 = verificar_1.innerHTML;
		if (contenido_1== ''){
			error.style.display = 'none';
		 var parametros = $(this).serialize();
			 $.ajax({
					type: "POST",
					url: "ajax/registrarse_profesores.php",
					data: parametros,
					 beforeSend: function(objeto){
						$("#resultados").html("Mensaje: Cargando...");
					  },
					success: function(datos){
					$("#resultados").html(datos);
				   }
				   
			});
	   }
	   e.preventDefault();
    }

    formulario.addEventListener('submit', validarFormulario);
    
}())