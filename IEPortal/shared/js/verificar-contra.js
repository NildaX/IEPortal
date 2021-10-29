(function(){
    

	var formulario = document.getElementById('cambiar_c'),
        contrasena = formulario.password1,
        contrasena2 = formulario.password2;
   
	
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
   
    function validarFormulario(e){
		$("#resultados").html("");
        error.innerHTML = '';
        validarContrasena(e);
		var verificar_1 = document.getElementById('error');
        var contenido_1 = verificar_1.innerHTML;
		if (contenido_1== ''){
			//console.log("sin error");
			//console.log("sin error 2");
			error.style.display = 'none';
		 var parametros = $(this).serialize();
		 //console.log(parametros);
			 $.ajax({
					type: "POST",
					url: "ajax/cambiar_contrasenia.php",
					data: parametros,
					 beforeSend: function(objeto){
						 resultados.style.display = 'block';
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