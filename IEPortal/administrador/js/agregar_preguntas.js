var objeto_alumno_clase=0;

document.addEventListener("DOMContentLoaded", function(event) {
	//console.log("primero");
	let temas = document.getElementById("lista_temas");
	let tipo = document.getElementById("tipo_pregunta");
	let bp = document.getElementById("boton_a");
	tipo.addEventListener('change', cambiar_imagen);
	bp.addEventListener('click', agregar_pregunta);
/*	let ag = document.getElementById("alumnos_gramatical");
	let cg = document.getElementById("clases_gramatical");
	let ac = document.getElementById("alumnos_conversa");
	let cc = document.getElementById("clases_conversa");
	*/
	$.ajax({
			url: "ajax/pedir_temas.php", //url de donde obtener los datos
			dataType: 'json', //tipo de datos retornados
			type: 'post' //enviar variables como post
		}).done(function (data){
			let json_string = JSON.stringify(data);
		    let obj = $.parseJSON(json_string);
			//console.log(obj);
			for (let i in obj){
					temas.innerHTML += "<option value='"+obj[i].id_t+"'>"+obj[i].Nombre+"</option>"; 	
			}
			});
	
  }
  )
  
 function cambiar_imagen(v_im){
	//console.log("cambiar imagenes"); 
	let parte_imagenes = document.getElementById("m_imagen");
	let requisitos = document.getElementById("requisitos");
	let resultados = document.getElementById("resultados");
	resultados.innerHTML="";
	//console.log(v_im.srcElement.value);
	parte_imagenes.innerHTML="Ejemplo de pregunta: <br>";
	switch (v_im.srcElement.value) {
		case 'opciones':
			//console.log("opciones");
			parte_imagenes.innerHTML+=`<img src='assets/img/preguntas/opciones.jpg' class="imagen-responsiva">`;
			requisitos.innerHTML=`
			<p class="formulario__parrafo">Ingrese la pregunta, indicando con guiones bajos(____) la parte a contestar:</p>
			<br>
			<input type="text" id="pregunta" name="pregunta" required minlength="4" maxlength="500" size="100" class="formulario__input">
			<br>
			<p class="formulario__parrafo">Ingrese la respuesta correcta:</p>
			<br>
			<input type="text" id="respuesta_c" name="respuesta_c" required minlength="4" maxlength="500" size="30" class="formulario__input">
			<br>
			<p class="formulario__parrafo">Ingrese las tres respuestas incorrectas:</p>
			<br>
			<div class="d-flex justify-content-between">
			<input type="text"  name="incorrectas" required minlength="4" maxlength="500" size="30" class="formulario__input formulario__input--chico" >
			<input type="text"  name="incorrectas" required minlength="4" maxlength="500" size="30" class="formulario__input formulario__input--chico" >
			<input type="text"  name="incorrectas" required minlength="4" maxlength="500" size="30" class="formulario__input formulario__input--chico" >
			</div>
		
			
			`;
			break;
		case 'imagenes':
			//console.log("imagenes");
			parte_imagenes.innerHTML+=`<img src='assets/img/preguntas/imagenes.jpg' class="imagen-responsiva" >`;
			break;
		case 'completar':
			//console.log("completar");
			parte_imagenes.innerHTML+=`<img src='assets/img/preguntas/completar.jpg' class="imagen-responsiva" >`;
			requisitos.innerHTML=`
			<p class="formulario__parrafo">Ingrese la oración:</p>
			<br>
			<input type="text" id="pregunta" name="pregunta" required minlength="4" maxlength="500" size="100" class="formulario__input">
			<br>
			`;
			
			break;
		case 'traduccion':
			//console.log("traduccion");
			parte_imagenes.innerHTML+=`<img src='assets/img/preguntas/traduccion.jpg' class="imagen-responsiva">`;
			requisitos.innerHTML=`
			<p class="formulario__parrafo">Ingrese la oración en español:</p>
			<br>
			<input type="text" id="pregunta" name="pregunta" required minlength="4" maxlength="500" size="100" class="formulario__input">
			<br>
			<p class="formulario__parrafo">Ingrese la oración en ingles:</p>
			<br>
			<input type="text" id="preguntai" name="preguntai" required minlength="4" maxlength="500" size="100" class="formulario__input">
			<br>
			<p class="formulario__parrafo">Ingrese palabras extras en español, separadas por , (coma):</p>
			<br>
			<input type="text" id="extras" name="extras" required minlength="4" maxlength="500" size="100" class="formulario__input">
			<br>
			<p class="formulario__parrafo">Ingrese palabras extras en inglés, separadas por , (coma):</p>
			<br>
			<input type="text" id="extrasi" name="extrasi" required minlength="4" maxlength="500" size="100" class="formulario__input">
			<br>
			
			`;
			break;
		default:
			//console.log('default');
	}
 }
 function agregar_pregunta(){
	 //console.log("agregar pregunta");
	 let resultados = document.getElementById("resultados");
	 let temas = document.getElementById("lista_temas");
	 let tipo = document.getElementById("tipo_pregunta");
	 let correcta=0;let incorrectas=0;let array_incorrectas=Array();let p_ingles=0;
	 let extras=0; let extras_i=0;
	 let tipo_enviar=0;
	 if(tipo.value!=0 && temas.value!=0){
		  let pr = document.getElementById("pregunta");
		  if(pr.value!=""){
			  switch (tipo.value) {
				case 'opciones':
					correcta = document.getElementById("respuesta_c");
					incorrectas= document.getElementsByName("incorrectas");
					if(correcta.value!="" && (pr.value).includes("_") && incorrectas[0].value!=0 && incorrectas[1].value!=0 && incorrectas[2].value!=0 && incorrectas[0].value!=incorrectas[1].value && incorrectas[1].value!=incorrectas[2].value && incorrectas[0].value!=incorrectas[2].value ){
						resultados.innerHTML = `<div class="alert alert-success" role="alert">
						<button type="button" class="close" data-dismiss="alert">&times;</button>
							Enviando...
						</div>`;
						tipo_enviar=1;
						array_incorrectas[0]=incorrectas[0].value;
						array_incorrectas[1]=incorrectas[1].value;
						array_incorrectas[2]=incorrectas[2].value;
					}
					else{
						resultados.innerHTML = `<div class="alert alert-danger" role="alert">
						<button type="button" class="close" data-dismiss="alert">&times;</button>
							Complete el formulario para continuar
						</div>`;
					}
					break;
				case 'completar':
				    //console.log("completar");
					tipo_enviar=2;
					break;
				case 'traduccion':
					//console.log("traduccion");
					p_ingles = document.getElementById("preguntai");
					extras = document.getElementById("extras");
					extras_i = document.getElementById("extrasi");
					if(p_ingles.value!="" && extras.value!="" && extras_i.value!="" && pr.value!=p_ingles.value && extras.value!=extras_i.value && (extras.value).includes(",") && (extras_i.value).includes(",") ){
						resultados.innerHTML = `<div class="alert alert-success" role="alert">
						<button type="button" class="close" data-dismiss="alert">&times;</button>
							Enviando...
						</div>`;
						tipo_enviar=3;
					}
					else{
						resultados.innerHTML = `<div class="alert alert-danger" role="alert">
						<button type="button" class="close" data-dismiss="alert">&times;</button>
							Complete el formulario para continuar
						</div>`;
					}
					break;
			}
			if(tipo_enviar!=0){
				//ajax
				var parametros = {
				'tipo': tipo_enviar,
				'pregunta': pr.value,
				'op_correcta':correcta.value,
				'incorrectas':array_incorrectas,
				'pregunta_ingles':p_ingles.value,
				'extras':extras.value,
				'extras_ingles':extras_i.value,
				'id_tema':temas.value,
				};
				//console.log(parametros);
				$.ajax({
					data: parametros, //ajuntamos los parametros con los datos
					url: "ajax/agregar_pregunta.php", //url de donde obtener los datos
					type: 'post', //enviar variables como post,
				  success: function (data){
					  resultados.innerHTML=data;
				  },
				  error: function (error) {
						//console.log(error);
					}
				});
			}
		  }
		  else{
			  resultados.innerHTML = `<div class="alert alert-danger" role="alert">
						<button type="button" class="close" data-dismiss="alert">&times;</button>
							Complete el formulario para continuar
					</div>`;
		  }
		 
		 
	 }
	 else{
		 resultados.innerHTML = `<div class="alert alert-danger" role="alert">
						<button type="button" class="close" data-dismiss="alert">&times;</button>
							Complete el formulario para continuar
					</div>`;
	 }
 }