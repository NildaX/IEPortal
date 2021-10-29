var contador = 0;
var preguntas = 0;
var numerrores = 0;
var num_preguntas = 0;
var cant_errores = [];

function FuncionSiguiente(){
var y = document.getElementById("espacio_video");
y.style.display = "none";
 if (contador < num_preguntas){
	progressBar(contador);
	var y = document.getElementById("Enviar");
	y.style.display = "block";
	var x1 = document.getElementById("espacio_pregunta_1");
	x1.style.display = "none";
	var instruccion = document.getElementById('instruccion');
	instruccion.innerHTML = `<h3>
	${contador+1}.-${preguntas[contador].instrucciones}
	</h3>`;
	//console.log("funcion siguiente");
	//console.log(contador);
	numerrores = 0;
	var x = document.getElementById("espacio_pregunta");
	var resp = document.getElementById("resp");
	x.innerHTML = "";
	resp.innerHTML ="";
	if (preguntas[contador].tipo==="opciones" || preguntas[contador].tipo==="imagenes"){
		//console.log("entro a opciones e imagenes");
		resp.classList.remove('borde');
		x.classList.remove('borde');
		x.innerHTML =`
			<div class='row'>
				<div class='col'>
					<div id='Descripcion' class='d-flex justify-content-center py-1 respuesta'> 
						${preguntas[contador].descripcion}
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
		//aqui iria, tienes que tener cuidado con la impresion de la imagen concuerde con el indice de las opciones
			arre_alea.forEach(function(elemento, indice, array) {
				if(preguntas[contador].tipo==="imagenes"){
					resp.innerHTML +=`
						<div class='col-sm-12 col-md-3'>
							<img src='${preguntas[contador].recursos[elemento]}' class="imagenrespuesta" width="200" height="200">
							<label name='labelopciones' class="respuesta">
								<input type='radio' name='opciones' value='${preguntas[contador].respuestas[elemento]}'> ${preguntas[contador].respuestas[elemento]}
							</label>
						</div>
					`;
				}else{
					resp.innerHTML +=`

					<div class='col-sm-12 col-md-3'>
						
						<label name='labelopciones' class="respuesta">
							<input type='radio' name='opciones' value='${preguntas[contador].respuestas[elemento]}'> ${preguntas[contador].respuestas[elemento]}
						</label>
					</div>
				`;
				}
			});
		}//------------------------------Final del IF
		if(preguntas[contador].tipo==="completar" || preguntas[contador].tipo==="traduccion"){
			//console.log("entro a completar");
			var palabrasOrden = preguntas[contador].descripcion.split(" ");
			if(preguntas[contador].tipo==="completar"){
				
					var palabrasDesorden = preguntas[contador].descripcion.split(" "),
					oracionDesordenada = palabrasDesorden.sort(function(){return Math.random() - 0.7});
					x.innerHTML =`
					<div class='row'>
						<div class='col'>
							<div id='Descripcion' class='d-flex justify-content-center py-1 respuesta'> 
								${preguntas[contador].descripcion}
							</div>
						</div>
					</div>
					`;
			}
			else{
				var p1 = preguntas[contador].correcta.split(" ");
				var p2 = preguntas[contador].extras.split(",");
				var palabrasDesorden = p1.concat(p2);
				 var oracionDesordenada = palabrasDesorden.sort(function(){return Math.random() - 0.7});
				var x1 = document.getElementById("espacio_pregunta_1");
				x1.innerHTML =`
					<div class='row'>
						<div class='col'>
							<div id='Descripcion' class='d-flex flex-wrap justify-content-center py-1 respuesta'> 
								${preguntas[contador].descripcion}
							</div>
						</div>
					</div>
					`;
				x1.style.display = "block";
				
			}
			//console.log(palabrasOrden);
			//console.log(oracionDesordenada);
			x.innerHTML = "";
			x.classList.add('d-flex', 'flex-wrap','justify-content-center', 'py-1');
			resp.classList.add('justify-content-center')
				for (const palabra in palabrasDesorden){
					x.innerHTML +=`<div class="categoria mx-1">${palabrasDesorden[palabra]}</div>`;
				}
			x.innerHTML +=`
				</div>
				`;
	   
			resp.innerHTML = "";
			resp.classList.add('borde');
			x.classList.add('borde');
			Sortable.create(resp, {
				group: {
				  name: "pregunta"
				},
				animation: 300,
				easing: "cubic-bezier(0.64, 0, 0.78, 0)",
				chosenClass: "active",
				//dragClass: "invisible",
				store: {
				  set: function(sortable){
					const ordenActual = sortable.toArray();
					//console.log(ordenActual);
				  }
				}
				
			  });
			  Sortable.create(x	, {
				group: {
				  name: "pregunta"
				},
				animation: 300,
				easing: "cubic-bezier(0.64, 0, 0.78, 0)",
				chosenClass: "active",
				//dragClass: "invisible",
				filter: '.instru'
				
			  });
		}//---------------------------------------Fin del IF
		if(preguntas[contador].tipo==="escribir"){
			//console.log("tipo escribir");
			resp.classList.remove('borde');
			x.classList.remove('borde');
			x.innerHTML =`
				<div class='row'>
					<div class='col'>
						<div id='Descripcion' class='d-flex justify-content-center py-1 respuesta'> 
							${preguntas[contador].descripcion}
						</div>
					</div>
				</div>
				`;
			resp.innerHTML =`
			<div class='container'>
					<div class='row'>
						<div class='col'>
							<input type="text" name="respuesta_escribir" required placeholder="Escribe tu respuesta" id="respuesta_escribir" class="formulario__input">
						</div>
					</div>
				</div>
			`;
				
		}
		
		if(preguntas[contador].tipo==="audio"){
		    resp.classList.remove('borde');
			x.classList.remove('borde');
			x.innerHTML =`
					<div class='row'>
						<div class='col'>
							<div id='Descripcion' class='d-flex justify-content-center py-1 respuesta'> 
								<a class="btn btn-primary pr-2" style="font-size: 30px;" class="btn btn-primary pr-2" onclick=generarAudio(preguntas[contador-1].descripcion,1)> <i class="fi fi-rr-volume"></i> </a>
								<a class="btn btn-primary" style="font-size: 30px;" onclick=generarAudio(preguntas[contador-1].descripcion,0.5)> <i class="fi fi-rr-volume"></i>  <i class="fi fi-rr-caret-down"></i></a>
							</div>
						</div>
					</div>
					`;
			resp.innerHTML = `
				<div class='container'>
					<div class='row'>
						<div class='col'>
							<input type="text" name="respuesta" placeholder="Escribe tu respuesta" id="respuesta" class="formulario__input">
						</div>
					</div>
				</div>
			`
		}
		x.innerHTML +="</div>";		
	
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
		//console.log("enviar");
		var id_preguntas = [];
		for(i=0;i<num_preguntas;i++){
			id_preguntas[i]=preguntas[i].id;
			//console.log(cant_errores[i]);
		}
		var parametros = {
		  'id_preguntas': id_preguntas,
		  'num_errores': cant_errores,
		};
		$.ajax({
		  data: parametros, 
		  url: "ajax/enviar_respuestas.php", 
		  type: 'post' 
		}).done(function (datos){
			$("#Siguiente").html(datos);
			var y = document.getElementById("Siguiente");
		    y.style.display = "block";
			//console.log("se hizo envio");
			setTimeout(function () {
			window.location.href = "./temas.php";
			}, 3000);
		  });
		  
   }
}
document.addEventListener("DOMContentLoaded", function(event) {
	//console.log("Primero que se ejecuta");
	//console.log("segundo que se ejecuta");
	let botonEnviar = document.getElementById("benviar");
	botonEnviar.addEventListener('click', FuncionEnviar);
	let botonSiguiente = document.getElementById("bsiguiente");
	botonSiguiente.addEventListener('click', FuncionSiguiente);
	
	 $.ajax({
	  url: "ajax/pedir_preguntas.php", //url de donde obtener los datos
	  type: 'post', //enviar variables como pos
	  dataType: 'json', //tipo de datos retornados
	  success: function (data){
//		console.log("Pedir preguntas");
		var json_string = JSON.stringify(data);
		var obj = $.parseJSON(json_string);
		preguntas = obj;
	//	console.log(preguntas);
		num_preguntas = preguntas.numero_preguntas;
//		console.log(num_preguntas);
		FuncionSiguiente();
		var y = document.getElementById("espacio_video");
		y.innerHTML = `<iframe class="contenedor__video--video centrado" src=${preguntas.video}  frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="centado"></iframe>`;
	  },
	  error: function (error) {
		//console.log(error);
	  }
	});	
})

//-------------------------------------------------------------------VERIFICACION CORRECTO/INCORRECTO
function FuncionEnviar(){
	if(preguntas[contador-1].tipo==="opciones" || preguntas[contador-1].tipo==="imagenes"){
		var ra = document.getElementsByName("opciones");
		//console.log("evaluacion de preguntas opciones o imagenes")
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
			//console.log("valor de respuesta");
			//console.log(preguntas[contador-1].correcta);
			for(var i=0; i<4; i++) {
				if(ra[i].checked){
					if (ra[i].value===preguntas[contador-1].correcta){
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
					else{
						var y = document.getElementById("retroalimentacion");
						y.classList.add("alert");
						y.classList.remove("alert-info");
						y.classList.remove("alert-success");
						y.classList.add("alert-danger");
						y.style.display = "block";
						$("#retroalimentacion").text('Respues incorrecta, intentelo de nuevo');
						numerrores = numerrores+1;
					}
					//console.log(ra[i].value);
					break;
				
				}
			}
		}
	}

	if(preguntas[contador-1].tipo==="completar" || preguntas[contador-1].tipo==="traduccion"){
			//console.log("evaluacion de preguntas drag and drop")
			if(preguntas[contador-1].tipo==="completar"){
				var palabrasOrden = preguntas[contador-1].descripcion.split(" ");
			}
			else{
				var palabrasOrden = preguntas[contador-1].correcta.split(" ");
			}
			var hijos = resp.childNodes;
			var tuOrden = [];
		//	console.log(hijos);
	//		console.log(hijos[0].textContent);
			for (i=0;i<hijos.length;i++){
			   tuOrden[i] = hijos[i].textContent;
			}
			//console.log('Tu respuesta: ')
			//console.log(tuOrden);
			//console.log('Respuesta Correcta: ')
			//console.log(palabrasOrden);
			if (tuOrden.length===0){
				var y = document.getElementById("retroalimentacion");
				y.classList.remove("alert-success");
				y.classList.remove("alert-danger");
				y.classList.add("alert");
				y.classList.add("alert-info");
				y.style.display = "block";
				$("#retroalimentacion").text('Por favor, arraste las palabras en orden para verificar');	
			}
			else{
				if(JSON.stringify(tuOrden) === JSON.stringify(palabrasOrden)){
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
				else{
					numerrores = numerrores+1;
					if (numerrores < 3){
						var y = document.getElementById("retroalimentacion");
						y.classList.add("alert");
						y.classList.remove("alert-info");
						y.classList.remove("alert-success");
						y.classList.add("alert-danger");
						y.style.display = "block";
						$("#retroalimentacion").text('Respues incorrecta, intentelo de nuevo');
					}
					else{
						var res = "";
						for (i=0;i<palabrasOrden.length;i++){
						   res += palabrasOrden[i];
						   res += " ";
						}
						$("#retroalimentacion").text('La respuesta correcta es '+res);
					}
				}
			}
			
			
	}
	if(preguntas[contador-1].tipo==="escribir"){
		respuesta_escribir=document.getElementById("respuesta_escribir");
		if(respuesta_escribir.value.trim() != ""){
			//console.log("evaluar");
			respuesta_escribir_correcta=quitarAcentos((document.getElementById("respuesta_escribir")).value);
			respuesta_escribir_correcta=respuesta_escribir_correcta.trim();
			if(String((respuesta_escribir_correcta).toLowerCase())==String((preguntas[contador-1].correcta).toLowerCase())){
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
			else{
					numerrores = numerrores+1;
					if (numerrores < 3){
						var y = document.getElementById("retroalimentacion");
						y.classList.add("alert");
						y.classList.remove("alert-info");
						y.classList.remove("alert-success");
						y.classList.add("alert-danger");
						y.style.display = "block";
						$("#retroalimentacion").text('Respuesta incorrecta, intentelo de nuevo');
					}
					else{
						$("#retroalimentacion").text('La respuesta correcta es '+preguntas[contador-1].correcta);
					}
				}
		}
		else{
			var y = document.getElementById("retroalimentacion");
			y.classList.remove("alert-success");
			y.classList.remove("alert-danger");
			y.classList.add("alert");
			y.classList.add("alert-info");
			y.style.display = "block";
		
			$("#retroalimentacion").text('Por favor, escriba su respuesta para continuar');	
		}
	}
	if(preguntas[contador-1].tipo==="audio"){
		//console.log("verificar tipo audio");
		turespuesta=document.getElementById("respuesta").value;
		
		correcta1=preguntas[contador-1].correcta
//		console.log('CORRECTA UNO ', correcta1);
		correcta1=correcta1.trim().toLowerCase();
//		console.log('CORRECTA UNO TRIM', correcta1);
		correcta2=preguntas[contador-1].contraida
		if(correcta2!=null){
//		console.log('CORRECTA DOS ', correcta2);
		correcta2=correcta2.trim().toLowerCase();
//		console.log('CORRECTA DOS TRIM ', correcta2);
        }
		//console.log('Tu respuesta: ', turespuesta);
		//console.log('Correcta 1: ', preguntas[contador-1].correcta)
		//console.log('Correcta 2: ', preguntas[contador-1].contraida)
		if(turespuesta==="" || turespuesta===null){
			var y = document.getElementById("retroalimentacion");
				y.classList.remove("alert-success");
				y.classList.remove("alert-danger");
				y.classList.add("alert");
				y.classList.add("alert-info");
				y.style.display = "block";
				$("#retroalimentacion").text('Por favor, contesta la pregunta para poder verificar');	
		}else{
			turespuesta=turespuesta.trim().toLowerCase();
			if(turespuesta===correcta1 || turespuesta===correcta2){
				
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
				}else{
					numerrores = numerrores+1;
					if (numerrores < 3){
						var y = document.getElementById("retroalimentacion");
						y.classList.add("alert");
						y.classList.remove("alert-info");
						y.classList.remove("alert-success");
						y.classList.add("alert-danger");
						y.style.display = "block";
						$("#retroalimentacion").text('Respuesta incorrecta, intentelo de nuevo');
					}
					else{
					    if(correcta2!=null){
					        $("#retroalimentacion").text('La respuesta correcta es '+correcta1+' o '+ correcta2);}
	                   else{
	                        $("#retroalimentacion").text('La respuesta correcta es '+correcta1);
	                    }
					//	$("#retroalimentacion").text('La respuesta correcta es '+preguntas[contador-1].correcta);
					}
			}
		}
	}
	if (numerrores < 3){
		//console.log("incorrecta");
	}
	else{
		var y = document.getElementById("espacio_video");
		y.style.display = "block";
		y.classList.add('mx-auto');
		//console.log("video");
		}
	
}
function quitarAcentos(cadena){
	const acentos = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};
	return cadena.split('').map( letra => acentos[letra] || letra).join('').toString();	
}

function progressBar(contador){
	
	let contadorr = contador
	//console.log('entro a progreso contador', contadorr)
	let barra = document.getElementById('barra');
	let cantidad = barra.getAttribute('valor')
	//console.log('entro a progreso',cantidad)
	cantidad = (100/num_preguntas)*(contadorr+1);
	barra.style.width = cantidad +'%';
}
function generarAudio(texto,velocidad){
	oracion = new SpeechSynthesisUtterance(texto) 
	oracion.lang = "en-US";
	oracion.rate = velocidad;
	speechSynthesis.speak(oracion);
}