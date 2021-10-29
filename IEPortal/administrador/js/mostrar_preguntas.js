var objeto_alumno_clase=0;
var obj = 0;
var separado=0;
var id_eliminar=0;
var id_tema_tabla=0;
var preguntasglobal=[];
document.addEventListener("DOMContentLoaded", function(event) {
	//console.log("primero");
    agregar_temas();	
	let tipo = document.getElementById("tipo_pregunta");
	tipo.addEventListener('change', cambiar_imagen);
	let select1 = document.getElementById("lista_temas_mostrar");
	select1.addEventListener('change', llenar_tabla_tema);
	let boton1 = document.getElementById("botonQuitar1");
	boton1.addEventListener('click', quitar_modal);
	let boton2 = document.getElementById("botonQuitar2");
	boton2.addEventListener('click', quitar_modal);
	let boton3 = document.getElementById("botonQuitar3");
	boton3.addEventListener('click', quitar_modalA);
	let boton4 = document.getElementById("botonQuitar4");
	boton4.addEventListener('click', quitar_modalA);
	let boton5 = document.getElementById("botonEditar");
	boton5.addEventListener('click', Editar_base);
	let boton6 = document.getElementById("botonEliminar");
	boton6.addEventListener('click', Eliminar_base);
	let boton7 = document.getElementById("botonAgregar");
	boton7.addEventListener('click', Agregar_base);
	let boton8 = document.getElementById("Agregar");
	boton8.addEventListener('click', Agregar_ejercicio);
	let buscar = document.getElementById("buscar");
	buscar.addEventListener('input', buscar_pregunta);
	}
  )

  
    function llenar_tabla(){
	let x = document.getElementById("tabla_ejercicios");
	x.innerHTML = "";
	var parametros = {
			'id_tema_buscar': id_tema_tabla,
			};
	$.ajax({
		data: parametros,
		url: "ajax/pedir_preguntas.php", //url de donde obtener los datos
		dataType: 'json', //tipo de datos retornados
		type: 'post' //enviar variables como post
	}).done(function (data){
		let json_string = JSON.stringify(data);
		obj = $.parseJSON(json_string);
		//console.log(obj);
		preguntasglobal = obj;

		var table = document.getElementById("tabla_ejercicios");
		var head = table.createTHead();
		var row = head.insertRow(0); 
		row.style.textAlign = "center";
		var cell = row.insertCell(0);
		cell.style.width = "10%";
		cell.innerHTML ='<strong># Numero</strong>';
		var cell = row.insertCell(1);
		cell.style.width = "10%";
		cell.innerHTML ='<strong># Tipo</strong>';
		var cell = row.insertCell(2);
		cell.style.width = "70%";
		cell.innerHTML ='<strong>Pregunta</strong>';
		var cell = row.insertCell(3);
		cell.style.width = "30%";
		cell.innerHTML ='<strong>Acciones</strong>';
		var body = table.createTBody();
		let valor="";
		for (let i in obj){
		  let fila = body.insertRow();
		  fila.classList.remove('table-warning');
		  fila.classList.add('w-100');
		  if(obj[i].habilitado=="0"){
			  fila.classList.add('table-warning');
			  valor="Habilitar pregunta";
			  valorico="fi-rr-check";
		  }
		  else{
			  fila.classList.add('table-default');
			  valor="Deshabilitar pregunta";
			  valorico="fi-rr-ban";
		  }
		  let celda1=fila.insertCell();
		  celda1.classList.add('align-middle');
		  celda1.innerHTML = `${obj[i].id}`;	
		  let celda4=fila.insertCell();
		  celda4.classList.add('align-middle');
		  celda4.innerHTML = `${obj[i].tipo}`;	
		  let celda2=fila.insertCell();
		  celda2.classList.add('align-middle');
		  celda2.innerHTML = `${obj[i].descripcion}`;	
		  let celda3=fila.insertCell();
		  celda3.classList.add('align-middle');
		  celda3.innerHTML = `<button id="${obj[i].id},${i}" name="boton_editar" onclick=Editar_pregunta(this.id) class="boton boton--pequeno mb-2"><i class="fi-rr-edit"></i> Editar pregunta</button>
		  <button id="${obj[i].id},${i}" onclick=Eliminar_pregunta(this.id) class="boton boton--pequeno"> <i class="${valorico}"></i> ${valor}</button>
		  <input name="boton_eliminar" type="hidden" value="${valor}">
		  `;
		  obj[i].orden=i;
		}
		var table = document.getElementById("tabla_ejercicios");
		var footer = table.createTFoot();
		var row = footer.insertRow(0);     
		row.style.textAlign = "center";
		var cell = row.insertCell(0);
		cell.innerHTML = `<button class="boton boton--pequeno boton--linea" id="btnanterior"><i class="fi-rr-angle-left"></i>Anterior</button> <span id="indicador"></span> 					<button  class="boton boton--pequeno boton--linea" id="btnsiguiente">Siguiente <i class="fi-rr-angle-right"></button>`
		cell.colSpan = "3";
		
		 paginacion (obj);
	});
  }
   function paginacion( datos){
	   let resultadosporpagina=8;
	   let paginaactual=1;
	   let ultimapagina=0;
	   let totalderegistros=datos.length;

 	  ultimapagina = Math.ceil(totalderegistros/resultadosporpagina);
	
	  //console.log('Resultados por pagina :',resultadosporpagina,'PaginaActual: ',paginaactual, 'Ultima: ',ultimapagina, 'Totalreg: ',totalderegistros);

	  var cargarPagina = function(intPaginaP){
		//evaluar si la pagina a cargar es mayor que el numero de paginas o es menor que 1
		if(intPaginaP < 1){intPaginaP = 1;}
		if(intPaginaP > ultimapagina){intPaginaP = ultimapagina;}
		//ocultar todas las lineas
		$("#tabla_ejercicios>tbody>tr").addClass("linea_oculta");
		var primer_registro = (intPaginaP - 1) * resultadosporpagina;
		for (var i = primer_registro; i < (primer_registro + resultadosporpagina); i++){
			$("#tabla_ejercicios>tbody>tr").eq(i).removeClass("linea_oculta");
		}
		//indicar en qué pagina estamos
		paginaactual = intPaginaP;
		$("#indicador").html("Página: " + paginaactual + " / " + ultimapagina);
	}

	  	cargarPagina(paginaactual);

	  $("#btnanterior").click(function(){
		cargarPagina(paginaactual - 1);
	});
	$("#btnsiguiente").click(function(){
		cargarPagina(paginaactual + 1);
	});

	
   }
  function agregar_temas(){
	let cm = document.getElementById("cuerpo_modalA");
	cm.innerHTML=`
	Seleccione el tema perteneciente a la pregunta
		<select name="select" id="lista_temas" class="formulario__input">
			<option selected="true" value="0" disabled="disabled" selected>Seleccione un tema</option>						
		</select>
		<br>
		
		Seleccione tipo de pregunta
		<select name="select" id="tipo_pregunta"  class="formulario__input">
			<option selected="true" value="0" disabled="disabled" selected>Seleccione un tipo</option>
			<option  value="opciones"  >Opciones</option>
			<option  value="completar"  >Oración en desorden</option>
			<option  value="traduccion"  >Traducción</option>
			<option  value="escribir">Traducir escrita</option>
			<option  value="audio">Audio</option>
		</select>
		<br>
		<div id="m_imagen">
		</div>
		<br>
		<div id="requisitos">
		</div>
		
	`;
	let temas = document.getElementById("lista_temas");
	let temas2 = document.getElementById("lista_temas_mostrar");
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
				temas2.innerHTML += "<option value='"+obj[i].id_t+"'>"+obj[i].Nombre+"</option>"; 	
		}
		
		});
	  
  }
   function cambiar_imagen(v_im){
	//console.log("cambiar imagenes"); 
	let parte_imagenes = document.getElementById("m_imagen");
	let requisitos = document.getElementById("requisitos");
	let resultados = document.getElementById("resultados_modalA");
	resultados.innerHTML="";
	//console.log(v_im.srcElement.value);
	parte_imagenes.innerHTML="Ejemplo de pregunta: <br>";
	switch (v_im.srcElement.value) {
		case 'opciones':
			//console.log("opciones");
			parte_imagenes.innerHTML+=`<img src='assets/img/preguntas/opciones.JPG' width="450" height="200" >`;
			requisitos.innerHTML=`
			Ingrese la pregunta, indicando con guiones bajos(____) la parte a contestar:
			<br>
			<input type="text" id="preguntaa" required minlength="4" maxlength="500" class="formulario__input">
			<br>
			Ingrese la respuesta correcta:
			<br>
			<input type="text" id="respuesta_ca" required minlength="4" maxlength="500" class="formulario__input">
			<br>
			Ingrese las tres respuestas incorrectas:
			<br>
			<input type="text"  name="incorrectasa" required minlength="4" maxlength="500" class="formulario__input">
			<input type="text"  name="incorrectasa" required minlength="4" maxlength="500" class="formulario__input">
			<input type="text"  name="incorrectasa" required minlength="4" maxlength="500" class="formulario__input">
			
			`;
			break;
		case 'imagenes':
			//console.log("imagenes");
			parte_imagenes.innerHTML+=`<img src='assets/img/preguntas/imagenes.JPG' width="450" height="200" >`;
			break;
		case 'completar':
			//console.log("completar");
			parte_imagenes.innerHTML+=`<img src='assets/img/preguntas/completar.JPG' width="450" height="200" >`;
			requisitos.innerHTML=`
			Ingrese la oración:
			<br>
			<input type="text" id="preguntaa" required minlength="4" maxlength="500" class="formulario__input">
			<br>
			`;
			
			break;
		case 'traduccion':
			//console.log("traduccion");
			parte_imagenes.innerHTML+=`<img src='assets/img/preguntas/traduccion.JPG' width="450" height="200">`;
			requisitos.innerHTML=`
			Ingrese la oración en español:
			<br>
			<input type="text" id="preguntaa" required minlength="4" maxlength="500" class="formulario__input">
			<br>
			Ingrese la oración en ingles:
			<br>
			<input type="text" id="preguntaia" required minlength="4" maxlength="500" class="formulario__input">
			<br>
			Ingrese palabras extras en español, separadas por , (coma):
			<br>
			<input type="text" id="extrasaa" required minlength="4" maxlength="500" class="formulario__input">
			<br>
			Ingrese palabras extras en inglés, separadas por , (coma):
			<br>
			<input type="text" id="extrasia" required minlength="4" maxlength="500" class="formulario__input">
			<br>
			`;
			break;
		case 'escribir':
			//console.log("escribir");
			parte_imagenes.innerHTML+=`<img src='assets/img/preguntas/escribir.JPG' width="450" height="200" >`;
			requisitos.innerHTML=`Pregunta en ingles:
			<br>
			<input type="text" id="preguntaa" required minlength="4" maxlength="500" class="formulario__input">
			<br>
			Respuesta en español:
			<br>
			<input type="text" id="preguntai" name="preguntai" required minlength="4" maxlength="500" class="formulario__input">
			<br>
			`;
			break;
		case 'audio':
			//console.log("audio");
			parte_imagenes.innerHTML+=`<img src='assets/img/preguntas/audio.JPG' width="450" height="200" >`;
			requisitos.innerHTML=`Pregunta en ingles (sin contracciones):
			<br>
			<input type="text" id="preguntaa" required minlength="4" maxlength="500" class="formulario__input">
			<br>
			¿Contiene contracciones?
			<br>
			<input type="radio" name="contra_" onchange="contieneContracciones();" value="1">
			<label for="html">Si</label><br>
			<input type="radio" name="contra_" value="0" onchange="contieneContracciones();">
			<label for="html">No</label><br>
			<div id="contraccion" style="display: none;">
			Respuesta con contracción en inglés:
			<br>
			<input type="text" id="pregunta_extra_audio" name="pregunta_extra_audio" required minlength="4" maxlength="500" class="formulario__input">
			<br>
			</div>
			`;
		default:
			//console.log('default');
	}
 }
  function contieneContracciones(){
	 let ra=document.getElementsByName("contra_");
	 let co = document.getElementById("contraccion");
	 if(ra[0].checked==false){
		co.style.display="none";
	 }
	 else{
		 co.style.display="block";
	 }
 }
  function Eliminar_pregunta(id_el) {
	  //console.log("elimianr 2");
	  //console.log(id_el);
	  id_eliminar=id_el;
	  let separado=id_el.split(",");
	  let m0 = document.getElementsByName("boton_eliminar");
	  let ti = document.getElementById("titulo");
	  let cm = document.getElementById("cuerpo_modal");
	  let e = document.getElementById("botonEliminar");
	  
	   if(m0[separado[1]].value=="Habilitar pregunta"){
		   ti.innerHTML="Habilitar ejercicio";
		   cm.innerHTML="¿Esta seguro que desea habilitar este ejercicio?";
		   e.innerHTML="Habilitar";
	   }
	   else{
		   ti.innerHTML="Deshabilitar ejercicio";
		   cm.innerHTML="¿Esta seguro que desea deshabilitar este ejercicio?";
		   e.innerHTML="Deshabilitar";
	   }
	   
	  let ed = document.getElementById("botonEditar");
	  ed.style.display="none";
	  e.style.display="block";
	  let m = document.getElementById("Modal_editar");
	  m.style.display="block";	  
  }
  function Eliminar_base() {
	  //console.log("eliminar base");
	  //console.log(id_eliminar);
	  let id2=id_eliminar.split(",");
	  let resultados = document.getElementById("resultados_modal");
	  resultados.innerHTML = "";
	  let habilitar=0;
	  let m0 = document.getElementsByName("boton_eliminar");
	  if(m0[id2[1]].value=="Habilitar pregunta"){
		  habilitar=1;
	   }
	  var parametros = {
			'id_eliminar': id2[0],
			'habilitar': habilitar,
			};
			//console.log(parametros);
			$.ajax({
				data: parametros, //ajuntamos los parametros con los datos
				url: "ajax/eliminar_pregunta.php", //url de donde obtener los datos
				type: 'post', //enviar variables como post,
			  success: function (data){
				  resultados.innerHTML=data;
				  llenar_tabla();
				  setTimeout(function () {
							quitar_modal();
						  }, 3000);
			  },
			  error: function (error) {
					//console.log(error);
				}
			});
	  
  }
  function Editar_pregunta(id_ed) {
	  //console.log("editar");
	  //console.log(id_ed);
	  separado=id_ed.split(",");
	  let ti = document.getElementById("titulo");
	  ti.innerHTML="Editar ejercicio";
	  let cm = document.getElementById("cuerpo_modal");
	  let ed = document.getElementById("botonEditar");
	  ed.style.display="block";
	 switch (obj[separado[1]].tipo) {
		case 'opciones':
		//console.log("opciones");
		cm.innerHTML=`
						Pregunta:
						<br>
						<input type="text" id="pregunta" name="pregunta" required value="${obj[separado[1]].descripcion}" class="formulario__input">
						<br>
						Respuesta correcta:
						<br>
						<input type="text" id="respuesta_c" name="respuesta_c" required  class="formulario__input" value=${obj[separado[1]].correcta}>
						<br>
						Respuestas incorrectas:
						<br>
						<input type="text"  name="incorrectas" required  class="formulario__input" value=${obj[separado[1]].opcion1}>
						<input type="text"  name="incorrectas" required  class="formulario__input" value=${obj[separado[1]].opcion2}>
						<input type="text"  name="incorrectas" required  class="formulario__input" value=${obj[separado[1]].opcion3}>
						`;
		break;
		case 'completar':
			//console.log("completar");
			cm.innerHTML=`
			Pregunta:
			<br>
			<input type="text" id="pregunta" name="pregunta" required value="${obj[separado[1]].descripcion}" class="formulario__input">
			<br>
			`;
			break;
		case 'traduccion':
			//console.log("traduccion");
			cm.innerHTML=`
			Pregunta en ingles:
			<br>
			<input type="text" id="pregunta" name="pregunta" value="${obj[separado[1]].descripcion}" required minlength="4" maxlength="500" class="formulario__input">
			<br>
			Pregunta en español:
			<br>
			<input type="text" id="preguntai" name="preguntai" value="${obj[separado[1]].correcta}" required minlength="4" maxlength="500" class="formulario__input">
			<br>
			Palabras extras en español, separadas por , (coma):
			<br>
			<input type="text" id="extras" name="extras" value="${obj[separado[1]].extras_e}" required minlength="4" maxlength="500" class="formulario__input">
			<br>
			Palabras extras en inglés, separadas por , (coma):
			<br>
			<input type="text" id="extrasi" name="extrasi" value="${obj[separado[1]].extras_en}" required minlength="4" maxlength="500" class="formulario__input">
			<br>
			`;
			break;
			case 'escribir':
			//console.log("escribir");
			cm.innerHTML=`Pregunta en ingles:
			<br>
			<input type="text" id="pregunta" name="pregunta" value="${obj[separado[1]].descripcion}" required minlength="4" maxlength="500" class="formulario__input">
			<br>
			Respuesta en español:
			<br>
			<input type="text" id="preguntai" name="preguntai" value="${obj[separado[1]].correcta}" required minlength="4" maxlength="500" class="formulario__input">
			<br>
			`;
			break;
		case 'audio':
			//console.log("audio");
			if(obj[separado[1]].extras_en){
				cm.innerHTML=`Pregunta en ingles (sin contracciones):
			<br>
			<input type="text" id="pregunta" name="pregunta" value="${obj[separado[1]].descripcion}" required minlength="4" maxlength="500" class="formulario__input">
			<br>
			Respuesta con contracciones:
			<br>
			<input type="text" id="preguntai_con" name="preguntai_com" value="${obj[separado[1]].extras_en}" required minlength="4" maxlength="500" class="formulario__input">
			<br>
			`;
			}
			else{
				cm.innerHTML=`Pregunta en ingles:
			<br>
			<input type="text" id="pregunta" name="pregunta" value="${obj[separado[1]].descripcion}" required minlength="4" maxlength="500" class="formulario__input">
			<br>
			`;
			}
			
			break;
	 }  
	 let resultados = document.getElementById("resultados_modal");
	  resultados.innerHTML = "";
	  let e = document.getElementById("botonEliminar");
	  e.style.display="none";
	  let m = document.getElementById("Modal_editar");
	  m.style.display="block";
	  
  }
   function quitar_modal() {
	  //console.log("quitar_modal");
	  let m = document.getElementById("Modal_editar");
	  m.style.display="none";
	  let resultados = document.getElementById("resultados_modal");
	  resultados.innerHTML = "";
  }
  function Editar_base() {
	//console.log(separado);
	let resultados = document.getElementById("resultados_modal");
	let tipo = obj[separado[1]].tipo;
	let correcta=0;let incorrectas=0;let array_incorrectas=Array();let p_ingles=0;
	let extras=0; let extras_i=0;
	let tipo_enviar=0;
	let pr = document.getElementById("pregunta");
	if(pr.value!=""){
		  switch (tipo) {
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
				correcta = document.getElementById("preguntai");
				extras = document.getElementById("extras");
				extras_i = document.getElementById("extrasi");
				if(correcta.value.trim()!="" && extras.value.trim()!="" && extras_i.value.trim()!="" && pr.value!=p_ingles.value && extras.value!=extras_i.value && (extras.value).includes(",") && (extras_i.value).includes(",") ){
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
			case 'escribir':
				//console.log("escribir");
				correcta = document.getElementById("preguntai");
				if(correcta.value.trim()!=""){
					resultados.innerHTML = `<div class="alert alert-success" role="alert">
					<button type="button" class="close" data-dismiss="alert">&times;</button>
						Enviando...
					</div>`;
					tipo_enviar=4;
				}
				else{
					resultados.innerHTML = `<div class="alert alert-danger" role="alert">
					<button type="button" class="close" data-dismiss="alert">&times;</button>
						Complete el formulario para continuar
					</div>`;
				}
				break;
			case 'audio':
				//console.log("audio");
				if(obj[separado[1]].extras_en){
					extras = document.getElementById("preguntai_con");
					if(extras.value.trim()!=""){
						resultados.innerHTML = `<div class="alert alert-success" role="alert">
						<button type="button" class="close" data-dismiss="alert">&times;</button>
							Enviando...
						</div>`;
						tipo_enviar=5;
					}
					else{
						resultados.innerHTML = `<div class="alert alert-danger" role="alert">
						<button type="button" class="close" data-dismiss="alert">&times;</button>
							Complete el formulario para continuar
						</div>`;
					}
				}
				else{
					resultados.innerHTML = `<div class="alert alert-success" role="alert">
					<button type="button" class="close" data-dismiss="alert">&times;</button>
						Enviando...
					</div>`;
					tipo_enviar=5;
				}
				break;
		}
		if(tipo_enviar!=0){
			//ajax
			var parametros = {
			'id_pregunta': separado[0],
			'tipo': tipo_enviar,
			'pregunta': pr.value,
			'op_correcta':correcta.value,
			'incorrectas':array_incorrectas,
			'extras':extras.value,
			'extras_ingles':extras_i.value,
			};
			//console.log(parametros);
			$.ajax({
				data: parametros, //ajuntamos los parametros con los datos
				url: "ajax/editar_pregunta.php", //url de donde obtener los datos
				type: 'post', //enviar variables como post,
			  success: function (data){
				  resultados.innerHTML=data;
				  llenar_tabla();
				  setTimeout(function () {
							quitar_modal();
						  }, 3000);
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
	function Agregar_ejercicio(){
		//console.log("agregar ejercicio");
		let m2 = document.getElementById("Modal_agregar");
		m2.style.display="block";
		
	}
    function quitar_modalA() {
	  //console.log("quitar_modal");
	  let m = document.getElementById("Modal_agregar");
	  m.style.display="none";
	  let resultados = document.getElementById("resultados_modalA");
	  resultados.innerHTML = "";
	  let requisitos = document.getElementById("requisitos");
	  requisitos.innerHTML="";
	  let parte_imagenes = document.getElementById("m_imagen");
	  parte_imagenes.innerHTML="";
	  let temas = document.getElementById("lista_temas");
	  temas.value=0;
	  let temas2 = document.getElementById("tipo_pregunta");
	  temas2.value=0;
  }
    function Agregar_base(){
		 //console.log("agregar pregunta");
		 let resultados = document.getElementById("resultados_modalA");
		 let temas = document.getElementById("lista_temas");
		 let tipo = document.getElementById("tipo_pregunta");
		 let correcta=0;let incorrectas=0;let array_incorrectas=Array();let p_ingles=0;
		 let extras=0; let extras_i=0;
		 let tipo_enviar=0;
		 if(tipo.value!=0 && temas.value!=0){
			  let pr = document.getElementById("preguntaa");
			  if(pr.value!=""){
				  switch (tipo.value) {
					case 'opciones':
						correcta = document.getElementById("respuesta_ca");
						incorrectas= document.getElementsByName("incorrectasa");
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
						p_ingles = document.getElementById("preguntaia");
						extras = document.getElementById("extrasaa");
						extras_i = document.getElementById("extrasia");
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
					case 'escribir':
						//console.log("escribir");
						correcta = document.getElementById("preguntai");
						if(correcta.value.trim()!=""){
							resultados.innerHTML = `<div class="alert alert-success" role="alert">
							<button type="button" class="close" data-dismiss="alert">&times;</button>
								Enviando...
							</div>`;
							tipo_enviar=4;
						}
						else{
							resultados.innerHTML = `<div class="alert alert-danger" role="alert">
							<button type="button" class="close" data-dismiss="alert">&times;</button>
								Complete el formulario para continuar
							</div>`;
						}
						break;
					case 'audio':
					        let con=document.getElementsByName("contra_")
							if(con[1].checked==false){
								extras = document.getElementById("pregunta_extra_audio");
								if(extras.value.trim()!=""){
									resultados.innerHTML = `<div class="alert alert-success" role="alert">
									<button type="button" class="close" data-dismiss="alert">&times;</button>
										Enviando...
									</div>`;
									tipo_enviar=5;
								}
								else{
									resultados.innerHTML = `<div class="alert alert-danger" role="alert">
									<button type="button" class="close" data-dismiss="alert">&times;</button>
										Complete el formulario para continuar
									</div>`;
								}
							}
							else{
								resultados.innerHTML = `<div class="alert alert-success" role="alert">
								<button type="button" class="close" data-dismiss="alert">&times;</button>
									Enviando...
								</div>`;
								tipo_enviar=5;
								
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
						  llenar_tabla();
						  setTimeout(function () {
							quitar_modalA();
						  }, 3000);
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
	function llenar_tabla_tema(){
		//console.log("por tema");
		let select1 = document.getElementById("lista_temas_mostrar");
		//console.log(select1.value);
		id_tema_tabla=select1.value;
		llenar_tabla();
	}
	
	
		function buscar_pregunta(){
		let termino = document.getElementById("buscar").value
		console.log('entro a buscar');
		console.log('Buscando: ', termino);
		let sinfiltrar = [...preguntasglobal];
		let preguntasFiltradas = sinfiltrar.filter(pregunta => pregunta.descripcion.includes(termino))

		let x = document.getElementById("tabla_ejercicios");
		x.innerHTML = "";
		console.log('Preguntas Buscador: ',preguntasFiltradas);
	
			var table = document.getElementById("tabla_ejercicios");
			var head = table.createTHead();
			var row = head.insertRow(0); 
			row.style.textAlign = "center";
			var cell = row.insertCell(0);
			cell.style.width = "10%";
			cell.innerHTML ='<strong># Numero</strong>';
			var cell = row.insertCell(1);
			cell.style.width = "10%";
			cell.innerHTML ='<strong># Tipo</strong>';
			var cell = row.insertCell(2);
			cell.style.width = "70%";
			cell.innerHTML ='<strong>Pregunta</strong>';
			var cell = row.insertCell(3);
			cell.style.width = "30%";
			cell.innerHTML ='<strong>Acciones</strong>';
			var body = table.createTBody();
			let valor="";
	 		for (let i in preguntasFiltradas){
	 		  let fila = body.insertRow();
	 		  fila.classList.remove('table-warning');
	 		  fila.classList.add('w-100');
	 		  if(preguntasFiltradas[i].habilitado=="0"){
	 			  fila.classList.add('table-warning');
	 			  valor="Habilitar pregunta";
	 			  valorico="fi-rr-check";
	 		  }
	 		  else{
	 			  fila.classList.add('table-default');
	 			  valor="Deshabilitar pregunta";
	 			  valorico="fi-rr-ban";
	 		  }
	 		  let celda1=fila.insertCell();
	 		  celda1.classList.add('align-middle');
	 		  celda1.innerHTML = `${preguntasFiltradas[i].id}`;
			  let celda4=fila.insertCell();
		  	  celda4.classList.add('align-middle');
		 	  celda4.innerHTML = `${preguntasFiltradas[i].tipo}`;		
	 		  let celda2=fila.insertCell();
	 		  celda2.classList.add('align-middle');
	 		  celda2.innerHTML = `${preguntasFiltradas[i].descripcion}`;	
	 		  let celda3=fila.insertCell();
	 		  celda3.classList.add('align-middle');
	 		  celda3.innerHTML = `<button id="${preguntasFiltradas[i].id},${preguntasFiltradas[i].orden}" name="boton_editar" onclick=Editar_pregunta(this.id) class="boton boton--pequeno mb-2"><i class="fi-rr-edit"></i> Editar pregunta</button>
	 		  <button id="${preguntasFiltradas[i].id},${i}" onclick=Eliminar_pregunta(this.id) class="boton boton--pequeno"> <i class="${valorico}"></i> ${valor}</button>
	 		  <input name="boton_eliminar" type="hidden" value="${valor}">
	 		  `;				  		  
	 		}
	 		var table = document.getElementById("tabla_ejercicios");
	 		var footer = table.createTFoot();
	 		var row = footer.insertRow(0);     
	 		row.style.textAlign = "center";
	 		var cell = row.insertCell(0);
	 		cell.innerHTML = `<a class="boton boton--pequeno boton--linea" id="btnanterior"><i class="fi-rr-angle-left"></i>Anterior</a> <span id="indicador"></span> 					<a class="boton boton--pequeno boton--linea" id="btnsiguiente">Siguiente <i class="fi-rr-angle-right"></a>`
	 		cell.colSpan = "3";
			
	 		 paginacion (preguntasFiltradas);
	}
