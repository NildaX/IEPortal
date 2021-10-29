var objeto_alumno_clase=0;
var obj = 0;
var separado=0;
var id_eliminar=0;
var id_tema_tabla=0;
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
	boton8.addEventListener('click', Agregar_tema);
	let select1 = document.getElementById("select_orden");
	select1.addEventListener('change', mostrar_entretemas);
	}
  )
  function mostrar_entretemas(){
	  let select1 = document.getElementById("select_orden");
	  //console.log("valor del select");
	  //console.log(select1.value);
	  let m = document.getElementById("entre_temas");
	  if(select1.value==3){
		m.style.display="block";
	  }
	  else{
		m.style.display="none";
	  }
  }
  function agregar_temas_intermedios(){
	let temas = document.getElementById("select_entre_temas1");
	let temas2 = document.getElementById("select_entre_temas2");
	temas.innerHTML="";
	temas2.innerHTML="";
	temas.innerHTML=`<option selected="true" value="0"  selected class="formulario__input formulario__input--chico2">Seleccione tema</option>`;		
	temas2.innerHTML=`<option selected="true" value="0"  selected class="formulario__input formulario__input--chico2">Seleccione tema</option>`;		
	for (let i in obj){
				temas.innerHTML += `<option value="${obj[i].id},${i}">${obj[i].nombre}</option>`;	
				temas2.innerHTML += `<option value="${obj[i].id},${i}">${obj[i].nombre}</option>`;	
		}
  }
  function llenar_tabla(){
	let x = document.getElementById("tabla_temas");
	x.innerHTML = "";
	$.ajax({
		url: "ajax/pedir_temascompletos.php", //url de donde obtener los datos
		dataType: 'json', //tipo de datos retornados
		type: 'post' //enviar variables como post
	}).done(function (data){
		let json_string = JSON.stringify(data);
		obj = $.parseJSON(json_string);
		//console.log(obj);
		let fila = x.insertRow();
		let celda1=fila.insertCell();
		celda1.innerHTML = `<strong>Numero de tema</strong>`;
		let celda2=fila.insertCell();
		celda2.innerHTML = `<strong>Nombre</strong>`;
		let celda3=fila.insertCell();
		celda3.innerHTML = `<strong>Link video</strong>`;
		let celda4=fila.insertCell();
		celda4.innerHTML = `<strong>Video</strong>`;
		let celda5=fila.insertCell();
		celda5.innerHTML = `<strong>Imagen</strong>`;
		let celda6=fila.insertCell();
		celda6.innerHTML = `<strong>Acciones</strong>`;
		let valor="";
		for (let i in obj){
		  let fila = x.insertRow();
		  fila.classList.remove('table-warning');
		  if(obj[i].habilitado=="0"){
			  fila.classList.add('table-warning');
			  valor="Habilitar tema";
			  valorico="fi-rr-check";
		  }
		  else{
			  fila.classList.add('table-default');
			  valor="Deshabilitar tema";
			  valorico="fi-rr-ban";
		  }
		  let celda1=fila.insertCell();
		  celda1.classList.add('align-middle');
		  celda1.innerHTML = `<input type="text" disabled required name="orden"  size="5" value="${obj[i].orden}">`;		  
		  let celda2=fila.insertCell();
		  celda2.classList.add('align-middle');
		  celda2.innerHTML = `<input type="text" disabled required name="nombre"  size="30" value="${obj[i].nombre}"> `;
		  let celda3=fila.insertCell();
		  celda3.classList.add('align-middle');
		  celda3.innerHTML = `<input type="text" disabled required name="descripcion" required  size="30" value="${obj[i].video}">`;
		  let celda4=fila.insertCell();
		  celda4.classList.add('align-middle');
		  celda4.innerHTML = `<iframe width="250" height="215" src=${obj[i].video}  frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
		  let celda6=fila.insertCell();
		  celda6.classList.add('align-middle');
		  celda6.innerHTML = `
		  <img src='../alumno/${obj[i].imgtema}' name="mostrar_imagen_tema" width="200" height="200">
		  
		  <div style="text-align:center;" class="mt-1">
		        <label for="imagefile${obj[i].id}" class="boton boton--pequeno centrado">
    				<i class="fi-rr-file-add"></i> Subir Foto
				</label>
		    <input class="centrado custom-file-upload" data-buttonText="Logo" disabled type="file" id="imagefile${obj[i].id}" name="imagefile_tema">
		  </div>`;
		  let celda5=fila.insertCell();
		  celda5.classList.add('align-middle');
		  celda5.innerHTML = `<button id="${obj[i].id},${i}" name="boton_editar1" onclick=Editar_tema(this.id) class="boton boton--pequeno mb-2"><i class="fi-rr-edit"></i><label name="boton_editar" for="boton_editar1">Editar tema</label></button>
		  <button id="${obj[i].id},${i}" onclick=Eliminar_tema(this.id) class="boton boton--pequeno"> <i class="${valorico}"></i> ${valor}</button>
		  <input name="boton_eliminar" type="hidden" value="${valor}">`;
		}
		agregar_temas_intermedios();
	});
  }
  function Eliminar_tema(id_el) {
	  //console.log("elimianr 2");
	  //console.log(id_el);
	  id_eliminar=id_el;
	  let separado=id_el.split(",");
	  let m0 = document.getElementsByName("boton_eliminar");
	  let m1 = document.getElementById("titulo_habilitar");
	  let m2 = document.getElementById("botonEliminar");
	  let m3 = document.getElementById("confirmar");
	  
	   if(m0[separado[1]].value=="Habilitar tema"){
		   m1.innerHTML="Habilitar tema";
		   m3.innerHTML="¿Esta seguro que desea habilitar este tema?";
		   m2.innerHTML="Habilitar";
	   }
	   else{
		   m1.innerHTML="Deshabilitar tema";
		   m3.innerHTML="¿Esta seguro que desea deshabilitar este tema?";
		   m2.innerHTML="Deshabilitar";
	   }
	   let m = document.getElementById("Modal_eliminarT");
	  m.style.display="block";	
	  
	  
  }
  function Eliminar_base() {
	  //console.log("eliminar base");
	  //console.log(id_eliminar);
	  let id2=id_eliminar.split(",");
	  let resultados = document.getElementById("resultados_modal");
	  resultados.innerHTML = "";
	  habilitar=0;
	  let m0 = document.getElementsByName("boton_eliminar");
	  if(m0[id2[1]].value=="Habilitar tema"){
		  habilitar=1;
	   }
	  var parametros = {
			'id_eliminar': id2[0],
			'habilitar': habilitar,
			};
			//console.log(parametros);
			$.ajax({
				data: parametros, //ajuntamos los parametros con los datos
				url: "ajax/eliminar_tema.php", //url de donde obtener los datos
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
  function Editar_tema(id_ed) {
	  //console.log("editar");
	  //console.log(id_ed);
	  separado=id_ed.split(",");
	  let m = document.getElementsByName("boton_editar");
	  let m1 = document.getElementsByName("nombre");
	  let m2 = document.getElementsByName("descripcion");
	  let m4 = document.getElementsByName("orden");
	  let imagen_="imagefile"+separado[0];
	  console.log(imagen_)
	  let m5 = document.getElementById(imagen_);
	  let m7 = document.getElementById("resultados_editar");
	  if(m[separado[1]].innerHTML=="Editar tema"){
	      console.log(m5.disabled)
		  m[separado[1]].innerHTML="Guardar Cambios";
		  m1[separado[1]].disabled = false;
		  m2[separado[1]].disabled = false;
		  m4[separado[1]].disabled = false;
		  m5.disabled = false;
		  m7.innerHTML = "";
	  }
	  else{
	      console.log(m5.disabled)
		  let data = new FormData();
		  if(m1[separado[1]].value.trim() != "" && m2[separado[1]].value.trim() != "" && m4[separado[1]].value.trim() != ""){ //&& m3[separado[1]].value.trim() != ""){// && m6[separado[1]].value.trim() != ""){
			  //console.log("enviando...");
			  data.append("id_tema", separado[0]);
			  data.append("nombre", m1[separado[1]].value);
			  data.append("video", m2[separado[1]].value);
			  data.append("orden", m4[separado[1]].value);
			  if(m5.value.trim() != ""){
				    data.append("contieneImagen",1);
					data.append("fileEditar", m5.files[0]);
			  }
			  else{
				  data.append("contieneImagen",0);
			  }
	          $.ajax({
				url: "ajax/editar_temas.php", //url de donde obtener los datos
				type: 'post', //enviar variables como post,
				data: data,
				contentType: false,       
				cache: false,             
				processData:false,
			  success: function (data){
				  m7.innerHTML=data;
				  llenar_tabla();
			  },
			  error: function (error) {
					//console.log(error);
				}
			});
		  }
		  else{
			  //console.log("complete");
			  m7.innerHTML = `<div class="alert alert-danger" role="alert">
					<button type="button" class="close" data-dismiss="alert">&times;</button>
						Complete el formulario para continuar
					</div>`;
			  m[separado[1]].innerHTML="Guardar Cambios";
		  }
	  }
	  
  }
   function quitar_modal() {
	  //console.log("quitar_modal");
	  let m = document.getElementById("Modal_eliminarT");
	  m.style.display="none";
	  let resultados = document.getElementById("resultados_modal");
	  resultados.innerHTML = "";
  }

	function Agregar_tema(){
		//console.log("agregar verbo");
		let m2 = document.getElementById("Modal_agregarT");
		m2.style.display="block";
		
	}
	function Agregar_base(){
		//console.log("agregar base");
		let resultados = document.getElementById("resultados_modalA");
		resultados.innerHTML = "";
		let t1 = document.getElementById("nuevo_ntema");
		let t2 = document.getElementById("nuevo_videot");
		let t3 = document.getElementById("select_orden");
		let t4 = document.getElementById("nueva_imagen_t");
		let data = new FormData();
		if(t1.value.trim() != "" && t2.value.trim() != "" && t3.value!=0 && t4.value.trim() != ""){
			let pasa=1;
			let orden1=0;
			if(t3.value==3){
				let temas = document.getElementById("select_entre_temas1");
				let temas2 = document.getElementById("select_entre_temas2");
				if(temas.value!=0 && temas2.value!=0 && (temas.value!=temas2.value)){
					let s=(temas2.value).split(",");
					orden1=obj[s[1]].orden;	
				}
				else{
					pasa=0;
					resultados.innerHTML =`<div class="alert alert-danger" role="alert">
					<button type="button" class="close" data-dismiss="alert">&times;</button>
						Complete el formulario para continuar
					</div>`;
				}
			}
			if(pasa==1){
				if(t3.value==2){
						//al final
						//console.log("ultimo elemento");
						//console.log(obj[obj.length-1].orden);
						orden1=obj[obj.length-1].orden;
						
				}
				data.append("nombre", t1.value);
				data.append("video", t2.value);
				data.append("tipo_orden", t3.value);
				data.append("orden1", orden1);
				data.append("file", nueva_imagen_t.files[0]);
			//	var parametros = {
				//		'nombre': t1.value,
				//		'video':t2.value,
				//		'tipo_orden':t3.value,
				//		'orden1':orden1,
				//		};
				//	//console.log(parametros);
					$.ajax({
						url: "ajax/agregar_temas.php", //url de donde obtener los datos
						type: 'post', //enviar variables como post,
						data: data,
						contentType: false,       
						cache: false,             
					    processData:false,
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
			resultados.innerHTML =`<div class="alert alert-danger" role="alert">
					<button type="button" class="close" data-dismiss="alert">&times;</button>
						Complete el formulario para continuar
					</div>`;
		}
	}
    function quitar_modalA() {
	  //console.log("quitar_modal");
	  let m = document.getElementById("Modal_agregarT");
	  m.style.display="none";
	  let resultados = document.getElementById("resultados_modalA");
	  resultados.innerHTML = "";
	  let t1 = document.getElementById("nuevo_ntema");
	  t1.value = "";
	  let t2 = document.getElementById("nuevo_videot");
	  t2.value = "";
	  let m2 = document.getElementById("entre_temas");
	  m2.style.display="none";
	  let select1 = document.getElementById("select_orden");
	  select1.value=0;
	  
	  
  }
