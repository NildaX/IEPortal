window.onload = function() {
const form = document.getElementById('recuperar');
let correo = form.correo,
    error = document.getElementById('error');

    function validarCorreo(e){
        if(correo.value == '' || correo.value == null){
            //console.log('Por favor ingresa tu correo');
            error.style.display = 'block';
            error.innerHTML += '<li>Por favor completa el campo de correo</li>'
            e.preventDefault();
        }
    }

    function validarFormulario(e){
        error.innerHTML = '';
        error.style.display = 'none';
        validarCorreo(e);
    }
    form.addEventListener('submit', validarFormulario);

form.addEventListener('submit', function (e) {
    e.preventDefault();
    let http = new XMLHttpRequest();
    let url = 'ajax/verificar_correo.php';
    let params = new FormData(form);
    http.open('POST', url, true);
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            //console.log(http.responseText);
            let resp = JSON.parse(http.responseText);
            if (resp.response == 'true') {
				error.style.display = 'block';
                error.classList.remove('alert-danger');
                error.classList.add('alert-success');
                error.innerHTML = "<li>Hemos enviado un correo electronico a la dirección proporcionada,prueba iniciar sesión</li>";
                setTimeout(function () {
                    window.location.href = "login.php";
                }, 5000);
            } else {
				error.style.display = 'block';
                error.classList.remove('alert-success');
                error.classList.add('alert-danger');
                error.innerHTML = "<li>Correo incorrecto</li>";
            }
        }
    }
    http.send(params);
});
};