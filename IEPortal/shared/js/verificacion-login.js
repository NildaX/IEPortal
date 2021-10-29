document.addEventListener("DOMContentLoaded", function(event) {
	let boton1 = document.getElementById("valida");
	boton1.addEventListener('click', validar);
	}
)

function validar(){
	//console.log("valdiar");
	let correo = document.getElementById("correo");
	let contrasena = document.getElementById("password");
	let error = document.getElementById('error');
	error.style.display = 'none';
	error.innerHTML = '';
	if(correo.value == '' || correo.value == null){
        //console.log('Por favor ingresa tu correo');
        error.classList.add("alert", "alert-danger");
        error.style.display = 'block';
        error.innerHTML += '<li>Por favor completa el campo de Correo</li>'
    }else{
        if(contrasena.value == '' || contrasena.value == null){
            //console.log('Por favor completa el campo de contraseña');
            error.classList.add("alert", "alert-danger");
            error.style.display = 'block';
            error.innerHTML += '<li>Por favor ingresa tu contraseña</li>';
        }else{
			//console.log("todo bien");
            var parametros = {
			'correo': correo.value,
			'contrasena': contrasena.value,
			};
			//console.log(parametros);
			$.ajax({
				data: parametros, //ajuntamos los parametros con los datos
				url: "ajax/iniciar-sesion.php", //url de donde obtener los datos
				dataType: 'json',
			   type: 'post',
			  success: function (data){
				let json_string = JSON.stringify(data);
				let obj = $.parseJSON(json_string);
				//console.log(obj);
				//console.log("2");
				//console.log(obj.error);
				if(obj.error==0){
					error.classList.replace('alert-danger', 'alert-success')
					error.style.display = 'block';
					error.innerHTML = "<li>Correcto, redireccionando</li>";
					setTimeout(function () {
                    window.location.href = "perfil.php";
					}, 3000);
				}
				else{
					if(obj.error==1){
						error.classList.add("alert", "alert-danger");
						error.style.display = 'block';
						error.innerHTML += '<li>Contraseña incorrecta</li>';
					}
					else{
						if(obj.error==2){
							error.classList.add("alert", "alert-danger");
							error.style.display = 'block';
							error.innerHTML += '<li>Usuario no habilitado</li>';
						}
						else{
							error.classList.add("alert", "alert-danger");
							error.style.display = 'block';
							error.innerHTML += '<li>Correo incorrecto</li>';
						}
					}
				}
			  },
			  error: function (error) {
					error.classList.add("alert", "alert-danger");
					error.style.display = 'block';
					error.innerHTML += '<li>Ha ocurrido un error con la base datos, intente de nuevo más tarde</li>'
				}
			});
        }
    }
}

