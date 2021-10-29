var objeto_alumno_clase=0;
var obj = 0;
var separado=0;
var id_eliminar=0;
var id_categoria_tabla=0;
var index_categoria=0;
document.addEventListener("DOMContentLoaded", function(event) {
	//console.log("primero");
	llenar_tabla();
	let boton1 = document.getElementById("botonQuitar1");
	boton1.addEventListener('click', quitar_modal);
	let boton2 = document.getElementById("botonQuitar2");
	boton2.addEventListener('click', quitar_modal);
	let boton3 = document.getElementById("botonQuitar3");
	boton3.addEventListener('click', quitar_modalA);
	let boton4 = document.getElementById("botonQuitar4");
	boton4.addEventListener('click', quitar_modalA);
	let boton6 = document.getElementById("botonEliminar");
	boton6.addEventListener('click', Eliminar_base);
	let boton7 = document.getElementById("botonAgregar");
	boton7.addEventListener('click', Agregar_base);
	let boton8 = document.getElementById("Agregar");
	boton8.addEventListener('click', Agregar_voc);
	
	}
  )
   
  
  function llenar_tabla(){
	let x = document.getElementById("tabla_vocabulario");
	x.innerHTML = "";
	$.ajax({
		url: "ajax/pedir_vocabulario.php", //url de donde obtener los datos
		dataType: 'json', //tipo de datos retornados
		type: 'post' //enviar variables como post
	}).done(function (data){
		let json_string = JSON.stringify(data);
		obj = $.parseJSON(json_string);
		//console.log(obj);
		let fila = x.insertRow();
		let celda1=fila.insertCell();
		celda1.innerHTML = `Nombre`;
		let celda2=fila.insertCell();
		celda2.innerHTML = `Link del archivo`;
		let celda3=fila.insertCell();
		celda3.innerHTML = `Archivo`;
		let celda4=fila.insertCell();
		celda4.innerHTML = `Acciones`;
		let valorico="fi-rr-ban";
		for (let i in obj){
		  let fila = x.insertRow();
		  let celda1=fila.insertCell();
		  celda1.innerHTML = `<input type="text" disabled required name="nombre" required  size="20" value="${obj[i].nombre}">`;
		  let celda2=fila.insertCell();
		  celda2.innerHTML = `<input type="text" disabled required name="link_archivo" required  size="38" value="${obj[i].archivo}">`;
		  let celda3=fila.insertCell();
		  celda3.innerHTML = `<iframe 
                      src='https://docs.google.com/viewer?srcid=${obj[i].archivo}&pid=explorer&efh=false&a=v&chrome=false&embedded=true' 
                     width="400" height="315">
                  </iframe>`;
		  let celda4=fila.insertCell();
		  celda4.innerHTML = `<button id="${obj[i].id},${i}" name="boton_editar1" onclick=Editar_voc(this.id) class="boton boton--pequeno mb-2"><i class="fi-rr-edit"></i><label name="boton_editar" for="boton_editar1">Editar</label></button>
		  <button id="${obj[i].id},${i}" onclick=Eliminar_voc(this.id) class="boton boton--pequeno"> <i class="${valorico}"></i> Eliminar </button>`;
	//	  <input type="button" id="${obj[i].id},${i}" name="boton_editar" onclick=Editar_conv(this.id) class="boton" value="Editar">
	//	  <input type="button" id="${obj[i].id},${i}" name="boton_eliminar" onclick=Eliminar_conv(this.id) class="boton" value="Eliminar">
		  		  
		}
	});
  }
  function Eliminar_voc(id_el) {
	  //console.log("elimianr 2");
	  //console.log(id_el);
	  id_eliminar=id_el;
	  let m2 = document.getElementById("Modal_eliminarC");
	  m2.style.display="block";
	  
	  
  }
  function Eliminar_base() {
	  //console.log("eliminar base");
	  //console.log(id_eliminar);
	  let id2=id_eliminar.split(",");
	  let resultados = document.getElementById("resultados_modal");
	  resultados.innerHTML = "";
	  var parametros = {
			'id_eliminar': id2[0],
			};
			//console.log(parametros);
			$.ajax({
				data: parametros, //ajuntamos los parametros con los datos
				url: "ajax/eliminar_vocabulario.php", //url de donde obtener los datos
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
  function Editar_voc(id_ed) {
	  //console.log("editar");
	  //console.log(id_ed);
	  separado=id_ed.split(",");
	  let m = document.getElementsByName("boton_editar");
	  let m1 = document.getElementsByName("nombre");
	  let m2 = document.getElementsByName("link_archivo");
	  let m3 = document.getElementById("resultados_editar");
	  if(m[separado[1]].innerHTML=="Editar"){
		  m[separado[1]].innerHTML="Guardar Cambios";
		  m1[separado[1]].disabled = false;
		  m2[separado[1]].disabled = false;
		  m3.innerHTML = "";
	  }
	  else{
		  if(m1[separado[1]].value.trim() != "" && m2[separado[1]].value.trim() != ""){ //&& m3[separado[1]].value.trim() != ""){// && m6[separado[1]].value.trim() != ""){
			  //console.log("enviando...");
			  var parametros = {
				'id_vocabulario': separado[0],
				'nombre': m1[separado[1]].value,
				'archivo':m2[separado[1]].value,
				};
			//console.log(parametros);
			$.ajax({
				data: parametros, //ajuntamos los parametros con los datos
				url: "ajax/editar_vocabulario.php", //url de donde obtener los datos
				type: 'post', //enviar variables como post,
			  success: function (data){
				  m3.innerHTML=data;
				  llenar_tabla();
			  },
			  error: function (error) {
					//console.log(error);
				}
			});
		  }
		  else{
			  //console.log("complete");
			  m3.innerHTML = `<div class="alert alert-danger" role="alert">
					<button type="button" class="close" data-dismiss="alert">&times;</button>
						Complete el formulario para continuar
					</div>`;
			  m[separado[1]].innerHTML="Guardar Cambios";
		  }
	  }
	  
  }
   function quitar_modal() {
	  //console.log("quitar_modal");
	  let m = document.getElementById("Modal_eliminarC");
	  m.style.display="none";
	  let resultados = document.getElementById("resultados_modal");
	  resultados.innerHTML = "";
  }

	function Agregar_voc(){
		//console.log("agregar verbo");
		let m2 = document.getElementById("Modal_agregarC");
		m2.style.display="block";
		
	}
	function Agregar_base(){
		//console.log("agregar base");
		let resultados = document.getElementById("resultados_modalA");
		resultados.innerHTML = "";
		let t1 = document.getElementById("nuevo_nconver");
		let t2 = document.getElementById("nuevo_rutacon");	
		if(t1.value.trim() != "" && t2.value.trim() != ""){
				var parametros = {
					'nombre': t1.value,
					'archivo':t2.value,
					};
				//console.log(parametros);
				$.ajax({
					data: parametros, //ajuntamos los parametros con los datos
					url: "ajax/agregar_vocabulario.php", //url de donde obtener los datos
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
		else{
			resultados.innerHTML =`<div class="alert alert-danger" role="alert">
					<button type="button" class="close" data-dismiss="alert">&times;</button>
						Complete el formulario para continuar
					</div>`;
		}
	}
    function quitar_modalA() {
	  //console.log("quitar_modal");
	  let m = document.getElementById("Modal_agregarC");
	  m.style.display="none";
	  let resultados = document.getElementById("resultados_modalA");
	  resultados.innerHTML = "";
	  let t1 = document.getElementById("nuevo_nconver");
	  t1.value = "";
	  let t2 = document.getElementById("nuevo_rutacon");
	  t2.value = ""; 
	  
  }


	