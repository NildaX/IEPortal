var obj = 0;
var id_clase=0;
var id_profesor=0;
var cambiar_clase_alumno=0;
var tipo_clase_ver=0;
document.addEventListener("DOMContentLoaded", function(event) {
	//console.log("primero");
    mostrar_profesores();
	let boton1 = document.getElementById("botonQuitar1");
	boton1.addEventListener('click', quitar_modal);
	let boton2 = document.getElementById("botonQuitar2");
	boton2.addEventListener('click', quitar_modal);
	let boton3 = document.getElementById("botonQuitar3");
	boton3.addEventListener('click', quitar_modalA);
	let boton4 = document.getElementById("botonQuitar4");
	boton4.addEventListener('click', quitar_modalA);
	let boton6 = document.getElementById("botonCambiar");
	boton6.addEventListener('click', cambiar_base);
	let boton7 = document.getElementById("botonAgregar");
	boton7.addEventListener('click', enviar_clase);
	let boton8 = document.getElementById("Agregar");
	boton8.addEventListener('click', Agregar_clase);
	let boton9 = document.getElementById("botonQuitar5");
	boton9.addEventListener('click', quitar_modalCam);
	let boton10 = document.getElementById("botonQuitar6");
	boton10.addEventListener('click', quitar_modalCam);
	let boton11 = document.getElementById("botonCambiarC");
	boton11.addEventListener('click', cambiar_base_clase);
	let select1 = document.getElementById("select_profesor");
	select1.addEventListener('change', cambiar_profesor);
	let gr = document.getElementById("dias_a");
	gr.addEventListener('change', cambio_dias);
	}
  )
  function cambio_dias(alumno){
	 let m_d = document.getElementById("mostrar_dias");
	//console.log(alumno.srcElement.value);
	let contador=alumno.srcElement.value;
	m_d.innerHTML="Dias a asignar";
	for(let i=0;i<contador;i++){
	m_d.innerHTML+=`
	            <select name="dias_1" >
				<option value="0" selected="true" disabled="disabled">Seleccione el día</option>	
				<option value="Lunes" >Lunes</option>	
				<option value="Martes" >Martes</option>	
				<option value="Miercoles" >Miercoles</option>	
				<option value="Jueves" >Jueves</option>	
				<option value="Viernes" >Viernes</option>	
				<option value="Sabado" >Sábado</option>	
			</select>
			`;
	}
	m_d.innerHTML+=`<br>
	        Horas asignadas
			<div id="horas">
			<input type="time" name="h1_" step="3600">
			-
			<input type="time" name="h1_" step="3600">
			</div>`;
 }
 function enviar_clase(){
	//console.log("enviar registro");
	let resultados = document.getElementById("resultados_agregar");
	let tipo_clase = document.getElementById("tipo_clase");
	let profesor = document.getElementById("profesor_a");
	let cantidad_dias = document.getElementById("dias_a");
	let dias_ = document.getElementsByName("dias_1");
	let horas_ = document.getElementsByName("h1_");
	let bandera=0;
	let j=0;
	//console.log("cantidad de horas");
	//console.log(dias_);
	//console.log(horas_);
	if(profesor.value!=0 && cantidad_dias.value!=0 && horas_[0].value!="" && horas_[1].value!="" && horas_[0].value!=horas_[1].value){
		let cantidad = cantidad_dias.value;
		let dias=[];
		let horas=[];
		horas.push(horas_[0].value);
		horas.push(horas_[1].value);
		//console.log("checar dias y horas");
		for(let i=0;i<cantidad_dias.value;i++){
			if(dias_[i].value==0 || dias.includes(dias_[i].value)){
				bandera=1;
			}
			dias.push(dias_[i].value);
			j=j+2;
		}
		if(bandera===1){
			resultados.innerHTML = `<div class="alert alert-danger" role="alert">
						<button type="button" class="close" data-dismiss="alert">&times;</button>
							Complete el formulario para continuar, seleccione días diferentes y horas razonables
					</div>`;
		}
		else{	
			var parametros = {
				'tipo': tipo_clase.value,
				'cantidad_dias': cantidad,
				'id_profesor':profesor.value,
				'dias':dias,
				'horas':horas,
				};
			//console.log(parametros);
			$.ajax({
				data: parametros, //ajuntamos los parametros con los datos
				url: "ajax/guardar_clase.php", //url de donde obtener los datos
				type: 'post', //enviar variables como post,
			  success: function (data){
				  resultados.innerHTML=data;
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
							Complete el formulario para continuar,seleccione días diferentes y horas razonables
					</div>`;
	}
}

  function mostrar_profesores(){
	  let select1 = document.getElementById("select_profesor");
	  let select2 = document.getElementById("profesor_a");
	  let select3 = document.getElementById("profesor_a2");
	  //console.log("valor del select");
	  //console.log(select1.value);
	  select1.innerHTML=`<option selected="true" value="0"  selected class="formulario__input formulario__input--chico2">Seleccione un profesor</option>`;
	  
	  $.ajax({
		url: "ajax/pedir_profesores.php", //url de donde obtener los datos
		dataType: 'json', //tipo de datos retornados
		type: 'post' //enviar variables como post
	}).done(function (data){
		let json_string = JSON.stringify(data);
		obj = $.parseJSON(json_string);
		//console.log('Profesores: ',obj);
		for (let i in obj){
				select1.innerHTML += `<option value="${obj[i].ID_profesor},${i}">${obj[i].Nombre}</option>`;
				select2.innerHTML += `<option value="${obj[i].ID_profesor},${i}">${obj[i].Nombre}</option>`;
				select3.innerHTML += `<option value="${obj[i].ID_profesor},${i}">${obj[i].Nombre}</option>`;				
		}
	});
  }
  function cambiar_profesor(){
      	let y = document.getElementById("alumnos");
		y.style.display = "none";
	  let select1 = document.getElementById("select_profesor");
	  id_profesor=select1.value;
	  llenar_tabla();
  }
  
  function llenar_tabla(){
	let x = document.getElementById("tabla_mostrarclases");
	x.innerHTML = "";
	var parametros = {
			'id_profesor_buscar': id_profesor,
			};
	$.ajax({
		data: parametros,
		url: "ajax/pedir_clases_profesor.php", //url de donde obtener los datos
		dataType: 'json', //tipo de datos retornados
		type: 'post' //enviar variables como post
	}).done(function (data){
		let json_string = JSON.stringify(data);
		obj = $.parseJSON(json_string);
		//console.log(obj);
		let fila = x.insertRow();
		(fila.insertCell()).innerHTML = `<strong>Tipo de clase</strong>`;	
		(fila.insertCell()).innerHTML = `<strong>Dias</strong>`;
		(fila.insertCell()).innerHTML = `<strong>Horas</strong>`;
		(fila.insertCell()).innerHTML = `<strong>Acciones</strong>`;
		let valor="";
		for (let i in obj){
		  let fila = x.insertRow();
		  fila.classList.remove('table-warning');
		  fila.classList.add('w-100');
		  let celda1=fila.insertCell();
		  celda1.classList.add('align-middle');
		  celda1.innerHTML = `${obj[i].tipo}`;	
		  let celda2=fila.insertCell();
		  celda2.classList.add('align-middle');
		  celda2.innerHTML = `${obj[i].dias}`;	
		  let celda3=fila.insertCell();
		  celda3.classList.add('align-middle');
		  celda3.innerHTML = `${obj[i].horas}`;
		  let celda4=fila.insertCell();
		  celda4.classList.add('align-middle');
		  if(obj[i].tipo=="Gramatical"){
			celda4.innerHTML = `<button id="${obj[i].id}" name="boton_editar" onclick=Editar_clase(this.id) class="boton boton--pequeno mb-2"><i class="fi-rr-edit"></i> Cambiar profesor</button>
		  					<button id="gram,${obj[i].id}" name="mostrar_alumnos" onclick=mostrar_alumnos(this.id) class="boton boton--pequeno mb-2"><i class="fi-rr-edit"></i> Mostrar Alumnos</button>`;
		  }
		  else{
			celda4.innerHTML = `<button id="${obj[i].id}" name="boton_editar" onclick=Editar_clase(this.id) class="boton boton--pequeno mb-2"><i class="fi-rr-edit"></i> Cambiar profesor</button>
		  					<button id="conv,${obj[i].id}" name="mostrar_alumnos" onclick=mostrar_alumnos(this.id) class="boton boton--pequeno mb-2"><i class="fi-rr-edit"></i> Mostrar Alumnos</button>`;
		  }
		   
		}
	});
  }
  function actualizar_alumnos(){
      let y = document.getElementById("alumnos");
	y.style.display = "block";
	let x = document.getElementById("tabla_alumnos");
	x.innerHTML = "";
	let parametros = {
		'buscar_id': id_clase
	};
	$.ajax({
		data: parametros, //ajuntamos los parametros con los datos
		url: "ajax/pedir_alumnos_copy2.php", //url de donde obtener los datos
		dataType: 'json', //tipo de datos retornados
		type: 'post' //enviar variables como post
	}).done(function (data) {
		let fila = x.insertRow();
		let celda1 = fila.insertCell();
		celda1.innerHTML = `Nombre`;
		let celda2 = fila.insertCell();
		celda2.innerHTML = `Correo`;
		let celda3 = fila.insertCell();
		celda3.innerHTML = `Detalles`;
		let json_string = JSON.stringify(data);
		let obj = $.parseJSON(json_string);
		alumnosglobal = obj;
		console.log('objeto de alumnos global',alumnosglobal);
		for (let i in obj) {
			let fila = x.insertRow();
			let celda1 = fila.insertCell();
			celda1.innerHTML = `${obj[i].apellido} ${obj[i].apellido2} ${obj[i].nombre}`;
			let celda2 = fila.insertCell();
			celda2.innerHTML = `${obj[i].correo}`;
			let celda3 = fila.insertCell();
			celda3.innerHTML = `<button class="boton boton--pequeno" type="button" id="${tipo_clase_ver},${obj[i].ids}" onclick=cambiarClase(this.id)>Cambiar de clase</td>`;
		}
	});
	
  }
  function mostrar_alumnos(id_cla) {
//	console.log("obtener alumnos");
//	console.log('id de la clase:', id_cla);
	id_cla=id_cla.split(",");
	id_clase=id_cla[1];
	tipo_clase_ver=id_cla[0];
	actualizar_alumnos();
}
function cambiarClase(id_al){
	   console.log(id_al);
	   id_al=id_al.split(",");
	   cambiar_clase_alumno=id_al;
	   let clase = document.getElementById("clases_para_cambiar");
	   console.log(id_al[0])
	   if(id_al[0]=="gram"){
		 //  console.log("es tipo gramatical");
		   clase.innerHTML =`<option elected="true" value="0" disabled="disabled" selected>Seleccione una clase gramatical</option>`;
		   
	   }
	   else{
	//	   console.log("es tipo conversacional");
		   clase.innerHTML =`<option elected="true" value="0" disabled="disabled" selected>Seleccione una clase conversacional</option>`;
	   }
	   $.ajax({
			url: "ajax/pedir_alumnos2.php", //url de donde obtener los datos
			dataType: 'json', //tipo de datos retornados
			type: 'post' //enviar variables como post
		}).done(function (data){
			let json_string = JSON.stringify(data);
		    let obj = $.parseJSON(json_string);
		//	console.log(obj);
			if(id_al[0]=="gram"){
				for(let i=0;i<(obj.ids_gramatical).length;i++){
				clase.innerHTML += "<option value='"+obj.ids_gramatical[i]+"'>"+obj.Clases_gramatical[i]+"</option>";
				}
			}
			else{
				for(let i=0;i<(obj.ids_conversacional).length;i++){
				clase.innerHTML += "<option value='"+obj.ids_conversacional[i]+"'>"+obj.Clases_conversacional[i]+"</option>";
				}
			}
		});
	   let m = document.getElementById("Modal_cambiarclase");
	   m.style.display="block";
		
   }
   function cambiar_base_clase(){
	let clase = document.getElementById("clases_para_cambiar");
    let resultados = document.getElementById("resultados_cambiar_clase");
    resultados.innerHTML = "";
	if(clase.value!=0){
		var parametros = {
			'id_alumno': cambiar_clase_alumno[1],
			'id_clase': clase.value,
			'tipo':cambiar_clase_alumno[0],
			};
	//	console.log(parametros);
		$.ajax({
			data: parametros, //ajuntamos los parametros con los datos
			url: "ajax/editar_clase_alumno.php", //url de donde obtener los datos
			type: 'post', //enviar variables como post,
		    success: function (data){
			  resultados.innerHTML=data;
			  actualizar_alumnos();
			  setTimeout(function () {
					quitar_modalCam();
				  }, 3000);
		    },
		    error: function (error) {
				console.log(error);
			}
		});
	  }
	  else{
		  resultados.innerHTML = `<div class="alert alert-danger" role="alert">
						<button type="button" class="close" data-dismiss="alert">&times;</button>
							Seleccione una clase para continuar
					</div>`;
	  }
   }
  function Editar_clase(id_ed) {
	  //console.log("editar");
	  //console.log(id_ed);
	  id_clase=id_ed;
	  let m = document.getElementById("Modal_cambiarprofesor");
	  m.style.display="block";
  }
  function cambiar_base(){
	  //console.log("cambiar base");
	  let m = document.getElementById("profesor_a2");
	  let resultados = document.getElementById("resultados_cambiarprofesor");
	  resultados.innerHTML = "";
	  if(m.value!=0){
		  var parametros = {
			    'id_clase': id_clase,
				'id_profesor': m.value,
				};
			//console.log(parametros);
			$.ajax({
				data: parametros, //ajuntamos los parametros con los datos
				url: "ajax/editar_clase.php", //url de donde obtener los datos
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
	  else{
		  resultados.innerHTML = `<div class="alert alert-danger" role="alert">
						<button type="button" class="close" data-dismiss="alert">&times;</button>
							Seleccione un nuevo profesor para continuar
					</div>`;
	  }
  }
   function quitar_modal() {
	  //console.log("quitar_modal");
	  let m = document.getElementById("Modal_cambiarprofesor");
	  m.style.display="none";
	  let resultados = document.getElementById("resultados_cambiarprofesor");
	  resultados.innerHTML = "";
	  let t1 = document.getElementById("profesor_a2");
	  t1.value=0;
  }

	function Agregar_clase(){
		//console.log("agregar verbo");
		let m2 = document.getElementById("Modal_agregarT");
		m2.style.display="block";
	}
    function quitar_modalA() {
	  //console.log("quitar_modal");
	  let m = document.getElementById("Modal_agregarT");
	  m.style.display="none";
	  let resultados = document.getElementById("resultados_agregar");
	  resultados.innerHTML = "";
	  let t1 = document.getElementById("profesor_a");
	  t1.value=0;
	  let t2 = document.getElementById("dias_a");
	  t2.value=0;
	  let m2 = document.getElementById("mostrar_dias");
	  m2.style.display="none";
  }
  function quitar_modalCam() {
	//  console.log("quitar_modal de cambiar");
	  let m = document.getElementById("Modal_cambiarclase");
	  m.style.display="none";
	  let resultados = document.getElementById("resultados_cambiar_clase");
	  resultados.innerHTML = "";
	  let t1 = document.getElementById("clases_para_cambiar");
	  t1.value=0;	
	}

	