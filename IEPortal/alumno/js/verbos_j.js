var contador = 0;
var preguntas = 0;
var numerrores = 0;
var num_preguntas = 0;
var cant_errores = [];
var vacios = [];

function FuncionSiguiente(){
var y = document.getElementById("espacio_video");
y.style.display = "none";
numerrores = 0;
 if (contador < num_preguntas){
	progressBar(contador);
	//console.log("tipoooooo:");
	var y = document.getElementById("Enviar");
	y.style.display = "block";
	var x1 = document.getElementById("espacio_pregunta_1");
	x1.style.display = "none";
	var instruccion = document.getElementById('instruccion');
	var x = document.getElementById("espacio_pregunta");
	var resp = document.getElementById("resp");
	instruccion.innerHTML = "";
	x.innerHTML = "";
	resp.innerHTML ="";
	//console.log(preguntas[contador].tipo);
	if (preguntas[contador].tipo===1){
		    //console.log("tipo 1");
			instruccion.innerHTML = `<h3>
			${contador+1}.-Completa los verbos faltantes
			</h3>`;
			//console.log("funcion siguiente");
			//console.log(contador);
			numerrores = 0;
			//console.log(preguntas[contador].imagen);
			resp.innerHTML +=`

							<div class='row centrado w-100'>
								<div class='col'>
									<img src='${preguntas[contador].imagen}' class="imagenrespuesta" width="200" height="200">
								</div>
							</div>
								
							<div class='row d-flex justify-content-around mx-auto'>
								
								<div class='col-sm-12 col-md-2'>
									<label>
										Español
									</label>
									<label name='labelopciones' class="respuesta">
										<input type='text' name='opciones' value='${preguntas[contador].espanol}' disabled class='formulario__input'>  
									</label>
								</div>
								<div class='col-sm-12 col-md-2'>
									<label>
										Presente
									</label>
									<label name='labelopciones' class="respuesta">
										<input type='text' name='opciones' value='${preguntas[contador].presente}' disabled class='formulario__input'> 
									</label>
								</div>
								<div class='col-sm-12 col-md-2'>
									<label>
										Pasado
									</label>
									<label name='labelopciones' class="respuesta">
										<input type='text' name='opciones' value='${preguntas[contador].pasado}' disabled class='formulario__input'> 
									</label>
								</div>
								<div class='col-sm-12 col-md-2'>
									<label>
										Pasado Participio							
									</label>
									<label name='labelopciones' class="respuesta">
										<input type='text' name='opciones' value='${preguntas[contador].pasado_p}' disabled class='formulario__input'> 
									</label>
									
								</div>
								<div class='col-sm-12 col-md-2'>
									<label>
										Gerundio							
									</label>
									<label name='labelopciones' class="respuesta">
										<input type='text' name='opciones' value='${preguntas[contador].gerundio}' disabled class='formulario__input'> 
									</label>
								</div>
								
							</div>
							`;
			
			var ra = document.getElementsByName("opciones");
			for(var i=0; i<2; i++) {
				vacios[i] = Math.round(Math.random()*(3-0)+parseInt(0));
				////console.log(vacios[i]);
				ra[vacios[i]].value = "";
				ra[vacios[i]].disabled = false;
			}
	   }
	   else{
		   ////console.log("es tipo 0");
		   var x = document.getElementById("espacio_pregunta");
		   var resp = document.getElementById("resp");
		   x.innerHTML =`
			<div class='row'>
				<div class='col'>
					<div id='Descripcion' class='d-flex justify-content-center py-1 respuesta'> 
						${contador+1}.-¿Como se dice ${preguntas[contador].espanol}?
					</div>
				</div>
			</div>
			`;
			var arre_alea=[0,1,2,3];
			var i,j,k;
			for (i = arre_alea.length; i; i--) {
				j = Math.floor(Math.random() * i);
				k = arre_alea[i - 1];
				arre_alea[i - 1] = arre_alea[j];
				arre_alea[j] = k;
			}
			arre_alea.forEach(function(elemento, indice, array) {
					resp.innerHTML +=`
						<div class='col-sm-12 col-md-3'>
							<img src='${preguntas[contador].recursos[elemento]}' class="imagenrespuesta" width="200" height="200">
							<label name='labelopciones' class="respuesta">
								<input type='radio' name='opciones' value='${preguntas[contador].respuestas[elemento]}'> ${preguntas[contador].respuestas[elemento]}
							</label>
						</div>
					`;
			});
       }
	   contador = contador+1;
	   var y = document.getElementById("retroalimentacion");
	   y.style.display = "none";
	   var y = document.getElementById("Siguiente");
	   y.style.display = "none";
   }
	   
   else{
		var instruccion = document.getElementById('instruccion');
		instruccion.innerHTML = "";
		instruccion.innerHTML = `<h3>
		Termino ejercicios
		</h3>`;
		var x1 = document.getElementById("espacio_pregunta_1");
		x1.style.display = "none";
		var x = document.getElementById("espacio_pregunta");
		x.style.display = "none";
		x.innerHTML = "";
		var resp = document.getElementById("resp");
		resp.style.display = "none";
		var y = document.getElementById("retroalimentacion");
		y.style.display = "none";
		var y = document.getElementById("Siguiente");
		y.style.display = "none";
		var y = document.getElementById("Enviar");
		y.style.display = "none";
		//--------------enviar resultados
		////console.log("enviar");
		var id_verbos = [];
		for(i=0;i<num_preguntas;i++){
			id_verbos[i]=preguntas[i].id;
			////console.log(cant_errores[i]);
		}
		var parametros = {
		  'id_verbos': id_verbos,
		  'num_errores': cant_errores,
		};
		$.ajax({
		  data: parametros, 
		  url: "ajax/enviar_verbos.php", 
		  type: 'post' 
		}).done(function (datos){
			$("#Siguiente").html(datos);
			var y = document.getElementById("Siguiente");
		    y.style.display = "block";
			////console.log("se hizo envio");
			setTimeout(function () {
			window.location.href = "./temas.php";
			}, 3000);
		  });
		
		
   }
}
document.addEventListener("DOMContentLoaded", function(event) {
	let botonEnviar = document.getElementById("benviar");
	botonEnviar.addEventListener('click', FuncionEnviar);
	let botonSiguiente = document.getElementById("bsiguiente");
	botonSiguiente.addEventListener('click', FuncionSiguiente);
	
	////console.log("Primero que se ejecuta");
	 $.ajax({
	  url: "ajax/pedir_verbos.php", //url de donde obtener los datos
	  type: 'post', //enviar variables como pos
	  dataType: 'json', //tipo de datos retornados
	  success: function (data){
		////console.log("termino");
		var json_string = JSON.stringify(data);
		var obj = $.parseJSON(json_string);
		preguntas = obj;
		////console.log(preguntas);
		num_preguntas = preguntas.numero_preguntas;
		////console.log(num_preguntas);
		FuncionSiguiente();
	  },
	  error: function (error) {
		////console.log(error);
	  }
	});	
})

//-------------------------------------------------------------------VERIFICACION CORRECTO/INCORRECTO
function FuncionEnviar(){
	////console.log("enviar segunda");
	////console.log(preguntas[contador-1].tipo);
	var ra = document.getElementsByName("opciones");
	var pasa = 1;
	if (preguntas[contador-1].tipo===1){
		for(var i=0; i<5; i++) {
			if(ra[i].disabled===false){
				////console.log(i);
				switch (i) {
					case 0: 
						if(String((ra[i].value).toLowerCase()).trim()!=String((preguntas[contador-1].espanol).toLowerCase())){
							pasa=0;
						}
						////console.log("español");
						break;
					case 1:
						//if(ra[i].value!=preguntas[contador-1].presente){
						if(String((ra[i].value).toLowerCase()).trim()!=String((preguntas[contador-1].presente).toLowerCase())){
							pasa=0;
						}
						////console.log("presente");
						break;
					case 2:
					//	if(ra[i].value!=preguntas[contador-1].pasado){
						if(String((ra[i].value).toLowerCase()).trim()!=String((preguntas[contador-1].pasado).toLowerCase())){
							pasa=0;
						}
						////console.log("pasado");
						break;
					case 3:
						//if(ra[i].value!=preguntas[contador-1].pasado_p){
						if(String((ra[i].value).toLowerCase()).trim()!=String((preguntas[contador-1].pasado_p).toLowerCase())){
							pasa=0;
						}
						////console.log("pasado participio");
						break;
					case 4:
					//	if(ra[i].value!=preguntas[contador-1].gerundio){
					    if(String((ra[i].value).toLowerCase()).trim()!=String((preguntas[contador-1].gerundio).toLowerCase())){
							pasa=0;
						}
						////console.log("gerundio");
						break;
					
				}
		    }
		
	    }
	}
	else{
		var ra = document.getElementsByName("opciones");
		////console.log("evaluacion de preguntas opciones o imagenes")
		if ((ra[0].checked===false) && (ra[1].checked===false) && (ra[2].checked===false)&& (ra[3].checked===false)){
			var y = document.getElementById("retroalimentacion");
			y.classList.remove("alert-success");
			y.classList.remove("alert-danger");
			y.classList.add("alert");
			y.classList.add("alert-info");
			y.style.display = "block";
		
			$("#retroalimentacion").text('Por favor, eliga una opcion para continuar');	
		}
		else{
			////console.log("presente");
			////console.log(preguntas[contador-1].presente);
			for(var i=0; i<4; i++) {
				////console.log(ra[i].value);
				if(ra[i].checked){
				    ////console.log(i);
					if (ra[i].value!=preguntas[contador-1].presente){
						pasa=0;
					}
					
				}
			}
		}
	}
	
    if (pasa===0){
		//equivocado
		var y = document.getElementById("retroalimentacion");
		y.classList.add("alert");
		y.classList.remove("alert-info");
		y.classList.remove("alert-success");
		y.classList.add("alert-danger");
		y.style.display = "block";
		$("#retroalimentacion").text('Respues incorrecta, intentelo de nuevo');
		numerrores = numerrores+1;
		
	}
	else{
		//pasa
		var y = document.getElementById("retroalimentacion");
		y.classList.add("alert");
		y.classList.remove("alert-info");
		y.classList.remove("alert-danger");
		y.classList.add("alert-success");
		y.style.display = "block";
		$("#retroalimentacion").text('Felicidades, respuesta correcta');
		var y = document.getElementById("Siguiente");
		y.style.display = "block";	
		cant_errores[contador-1] = numerrores;
	}
}

function progressBar(contador){
	
	let contadorr = contador
	////console.log('entro a progreso contador', contadorr)
	let barra = document.getElementById('barra');
	let cantidad = barra.getAttribute('valor')
	////console.log('entro a progreso',cantidad)
	cantidad = (100/num_preguntas)*(contadorr+1);
	barra.style.width = cantidad +'%';
}