var objeto_alumno_clase=0;
var obj = 0;
var separado=0;
var id_eliminar=0;
var id_tema_tabla=0;
document.addEventListener("DOMContentLoaded", function(event) {
	console.log("primero");
    llenar_tabla();
	let boton1 = document.getElementById("botonQuitar1");
	boton1.addEventListener('click', quitar_modal);
	let boton2 = document.getElementById("botonQuitar2");
	boton2.addEventListener('click', quitar_modal);
	let boton3 = document.getElementById("botonQuitar3");
	boton3.addEventListener('click', quitar_modalA);
	let boton4 = document.getElementById("botonQuitar4");
	boton4.addEventListener('click', quitar_modalA);
	let boton5 = document.getElementById("botonEliminar");
	boton5.addEventListener('click', eliminar_base);
	let boton7 = document.getElementById("botonAgregar");
	boton7.addEventListener('click', Agregar_base);
	let boton8 = document.getElementById("Agregar");
	boton8.addEventListener('click', Agregar_verbo);
	}
  )
  function llenar_tabla(){
	let x = document.getElementById("tabla_verbos");
	x.innerHTML = "";
	$.ajax({
		url: "ajax/pedir_verbos.php", //url de donde obtener los datos
		dataType: 'json', //tipo de datos retornados
		type: 'post' //enviar variables como post
	}).done(function (data){
		let json_string = JSON.stringify(data);
		obj = $.parseJSON(json_string);
		console.log(obj);
		var table = document.getElementById("tabla_verbos");
		var head = table.createTHead();
		var row = head.insertRow(0); 
		row.style.textAlign = "center";
		var cell = row.insertCell(0);
		cell.style.width = "5%";
		cell.innerHTML ='<strong># Verbo</strong>';	
		var cell = row.insertCell(1);
		cell.style.width = "13.3%";
		cell.innerHTML ='<strong>Espa\u00F1ol</strong>';
		var cell = row.insertCell(2);
		cell.style.width = "13.3%";
		cell.innerHTML ='<strong>Ingl\u00E9s</strong>';;
		var cell = row.insertCell(3);
		cell.style.width = "13.3%";
		cell.innerHTML ='<strong>Pasado</strong>';;
		var cell = row.insertCell(4);
		cell.style.width = "13.3%";
		cell.innerHTML ='<strong>Participio</strong>';
		var cell = row.insertCell(5);
		cell.style.width = "13.3%";
		cell.innerHTML ='<strong>Gerundio</strong>';
		var cell = row.insertCell(6);
		cell.style.width = "13.3%";
		cell.innerHTML ='<strong>Im\u00E1gen</strong>';
		var cell = row.insertCell(7);
		cell.style.width = "13.3%";
		cell.innerHTML ='<strong>Acciones</strong>';
		var body = table.createTBody();
		let valor="";
		for (let i in obj){
			let fila = body.insertRow();
		  fila.classList.remove('table-warning');
		  if(obj[i].habilitado=="0"){
			  fila.classList.add('table-warning');
			  valor="Habilitar verbo";
			  valorico="fi-rr-check";
		  }
		  else{
			  fila.classList.add('table-default');
			  valor="Deshabilitar verbo";
			  valorico="fi-rr-ban";
		  }
		  let celda1=fila.insertCell();
		  celda1.innerHTML = `${obj[i].id}`;
		  celda1.classList.add('align-middle');
		  let celda2=fila.insertCell();	
		  celda2.classList.add('align-middle');	  
		  celda2.innerHTML = `<input type="text" disabled required name="espanol" required  size="10" value=${obj[i].espanol}> `;
		  let celda3=fila.insertCell();
		  celda3.classList.add('align-middle');
		  celda3.innerHTML = `<input type="text" disabled required name="presente" required  size="10" value=${obj[i].presente}>`;
		  let celda4=fila.insertCell();
		  celda4.classList.add('align-middle');
		  celda4.innerHTML = `<input type="text" disabled required name="pasado" required  size="10" value= ${obj[i].pasado}>`;
		  let celda5=fila.insertCell();
		  celda5.classList.add('align-middle');
		  celda5.innerHTML = `<input type="text" disabled required name="pasado_p" required  size="10" value=${obj[i].pasado_p}>`;
		  let celda6=fila.insertCell();
		  celda6.classList.add('align-middle');
		  celda6.innerHTML = `<input type="text" disabled required name="gerundio" required  size="10" value=${obj[i].gerundio}>`;	
		  let celda7=fila.insertCell();
		  celda7.classList.add('align-middle');
		  celda7.innerHTML = `<img src='../alumno/${obj[i].imagen}' name="mostrar_imagen" width="200" height="200">
		  
		  <div style="text-align:center;" class="mt-1">
		        <label for="imagefile${obj[i].id}" class="boton boton--pequeno centrado">
    				<i class="fi-rr-file-add"></i> Subir Foto
				</label>
		    <input class="centrado custom-file-upload" data-buttonText="Logo" disabled type="file" id="imagefile${obj[i].id}" name="imagefile">
		  </div>
		  `;
		  let celda8=fila.insertCell();
		  celda8.classList.add('align-middle');
		  celda8.innerHTML =`<button id="${obj[i].id},${i}" name="boton_editar1" onclick=Editar_verbo(this.id) class="boton boton--pequeno mb-2"><i class="fi-rr-edit"></i><label name="boton_editar" for="boton_editar1">Editar verbo</label></button>
		  <button id="${obj[i].id},${i}" onclick=Eliminar_verbo(this.id) class="boton boton--pequeno"> <i class="${valorico}"></i>  ${valor}</button>
		  <input name="boton_eliminar" type="hidden" value="${valor}">
		  `;				  
		  // <input type="button" id="${obj[i].id},${i}" name="boton_editar" onclick=Editar_verbo(this.id) class="boton" value="Editar verbo">
	//	  <input type="button" id="${obj[i].id},${i}" name="boton_eliminar" onclick=Eliminar_verbo(this.id) class="boton" value="${valor}">
			  
		}
		var table = document.getElementById("tabla_verbos");
		var footer = table.createTFoot();
		var row = footer.insertRow(0);     
		row.style.textAlign = "center";
		var cell = row.insertCell(0);
		cell.innerHTML = `<button class="boton boton--pequeno boton--linea" id="btnanterior"><i class="fi-rr-angle-left"></i>Anterior</button> <span id="indicador"></span> 	<button class="boton boton--pequeno boton--linea" id="btnsiguiente">Siguiente <i class="fi-rr-angle-right"></button>`
		cell.colSpan = "8";
		
		 paginacion (obj);
	});
  }

  function paginacion( datos){
	let resultadosporpagina=4;
	let paginaactual=1;
	let ultimapagina=0;
	let totalderegistros=datos.length;

	ultimapagina = Math.ceil(totalderegistros/resultadosporpagina);
 
   console.log('Resultados por pagina :',resultadosporpagina,'PaginaActual: ',paginaactual, 'Ultima: ',ultimapagina, 'Totalreg: ',totalderegistros);

   var cargarPagina = function(intPaginaP){
	 //evaluar si la pagina a cargar es mayor que el numero de paginas o es menor que 1
	 if(intPaginaP < 1){intPaginaP = 1;}
	 if(intPaginaP > ultimapagina){intPaginaP = ultimapagina;}
	 //ocultar todas las lineas
	 $("#tabla_verbos>tbody>tr").addClass("linea_oculta");
	 var primer_registro = (intPaginaP - 1) * resultadosporpagina;
	 for (var i = primer_registro; i < (primer_registro + resultadosporpagina); i++){
		 $("#tabla_verbos>tbody>tr").eq(i).removeClass("linea_oculta");
	 }
	 //indicar en què´± pagina estamos
	 paginaactual = intPaginaP;
	 $("#indicador").html("P\u00E1gina: " + paginaactual + " / " + ultimapagina);
 }

	   cargarPagina(paginaactual);

   $("#btnanterior").click(function(){
	 cargarPagina(paginaactual - 1);
 });
 $("#btnsiguiente").click(function(){
	 cargarPagina(paginaactual + 1);
 });

 
}
  function Eliminar_verbo(id_el) {
	  console.log("elimianr 2");
	  console.log(id_el);
	  id_eliminar=id_el;
	  let separado=id_el.split(",");
	  let m0 = document.getElementsByName("boton_eliminar");
	  let m1 = document.getElementById("titulo_habilitar");
	  let m2 = document.getElementById("botonEliminar");
	  let m3 = document.getElementById("confirmar");
	  
	   if(m0[separado[1]].value=="Habilitar verbo"){
		   m1.innerHTML="Habilitar Verbo";
		   m3.innerHTML="¬øEsta seguro que desea habilitar este verbo?";
		   m2.innerHTML="Habilitar";
	   }
	   else{
		   m1.innerHTML="Deshabilitar Verbo";
		   m3.innerHTML="¬øEsta seguro que desea deshabilitar este verbo?";
		   m2.innerHTML="Deshabilitar";
	   }
	  let m = document.getElementById("Modal_eliminar");
	  m.style.display="block";	  
  }
  function eliminar_base() {
	  console.log("eliminar base");
	  console.log(id_eliminar);
	  let id2=id_eliminar.split(",");
	  let resultados = document.getElementById("resultados_modal");
	  resultados.innerHTML = "";
	  let habilitar=0;
	  let m0 = document.getElementsByName("boton_eliminar");
	  if(m0[id2[1]].value=="Habilitar verbo"){
		  habilitar=1;
	   }
	  var parametros = {
			'id_eliminar': id2[0],
			'habilitar': habilitar,
			};
			console.log(parametros);
			$.ajax({
				data: parametros, //ajuntamos los parametros con los datos
				url: "ajax/eliminar_verbo.php", //url de donde obtener los datos
				type: 'post', //enviar variables como post,
			  success: function (data){
				  resultados.innerHTML=data;
				  llenar_tabla();
				  setTimeout(function () {
						quitar_modal();
					 }, 3000);
			  },
			  error: function (error) {
					console.log(error);
				}
			});
	  
  }
  function Editar_verbo(id_ed) {
	  console.log("editar");
	  console.log(id_ed);
	  separado=id_ed.split(",");
	  let m = document.getElementsByName("boton_editar");
	  let m1 = document.getElementsByName("espanol");
	  let m2 = document.getElementsByName("presente");
	  let m3 = document.getElementsByName("pasado");
	  let m4 = document.getElementsByName("pasado_p");
	  let m5 = document.getElementsByName("gerundio");
	//  let m6 = document.getElementsByName("imagefile");
	  let imagen_="imagefile"+separado[0];
	  let m6 = document.getElementById(imagen_);
	  let m7 = document.getElementById("resultados_editar");
	  if(m[separado[1]].innerHTML=="Editar verbo"){
		  m[separado[1]].innerHTML="Guardar Cambios";
		  m1[separado[1]].disabled = false;
		  m2[separado[1]].disabled = false;
		  m3[separado[1]].disabled = false;
		  m4[separado[1]].disabled = false;
		  m5[separado[1]].disabled = false;
		  m6.disabled = false;
		  m7.innerHTML = "";
	  }
	  else{
		  let data = new FormData();
		  if(m1[separado[1]].value.trim() != "" && m2[separado[1]].value.trim() != "" && m3[separado[1]].value.trim() != "" && m4[separado[1]].value.trim() != ""&& m5[separado[1]].value.trim() != ""){// && m6[separado[1]].value.trim() != ""){
			  console.log("enviando...");
			  data.append("id_verbo", separado[0]);
			  data.append("espanol", m1[separado[1]].value);
			  data.append("ingles", m2[separado[1]].value);
			  data.append("pasado", m3[separado[1]].value);
			  data.append("pasadop", m4[separado[1]].value);
			  data.append("gerundio", m5[separado[1]].value);
			  if(m6.value.trim() != ""){
				    data.append("contieneImagen",1);
					data.append("fileEditar", m6.files[0]);
			  }
			  else{
				  data.append("contieneImagen",0);
			  }
			$.ajax({
				url: "ajax/editar_verbo.php", //url de donde obtener los datos
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
					console.log(error);
				}
			});
		  }
		  else{
			  console.log("complete");
			  m7.innerHTML = `<div class="alert alert-danger" role="alert">
					<button type="button" class="close" data-dismiss="alert">&times;</button>
						Complete el formulario para continuar
					</div>`;
			  m[separado[1]].innerHTML="Guardar Cambios";
		  }
	  }
	  
  }
   function quitar_modal() {
	  console.log("quitar_modal");
	  let m = document.getElementById("Modal_eliminar");
	  m.style.display="none";
	  let resultados = document.getElementById("resultados_modal");
	  resultados.innerHTML = "";
  }
	function Agregar_verbo(){
		console.log("agregar verbo");
		let m2 = document.getElementById("Modal_agregarV");
		m2.style.display="block";
		
	}
    function quitar_modalA() {
	  console.log("quitar_modal");
	  let m = document.getElementById("Modal_agregarV");
	  m.style.display="none";
	  let resultados = document.getElementById("resultados_modalA");
	  resultados.innerHTML = "";
	  (document.getElementById("nuevo_espanol")).value="";
	  (document.getElementById("nuevo_ingles")).value="";
	  (document.getElementById("nuevo_pasado")).value="";
	  (document.getElementById("nuevo_pasadop")).value="";
	  (document.getElementById("nuevo_gerundio")).value="";
	  (document.getElementById("nuevo_imagen")).value="";
	  
  }
    function Agregar_base(){
		 console.log("agregar pregunta");
		 let resultados = document.getElementById("resultados_modalA");
		 let r1 = document.getElementById("nuevo_espanol");
		 let r2 = document.getElementById("nuevo_ingles");
		 let r3 = document.getElementById("nuevo_pasado");
		 let r4 = document.getElementById("nuevo_pasadop");
		 let r5 = document.getElementById("nuevo_gerundio");
		 let r6 = document.getElementById("nuevo_imagen");
		 let data = new FormData();
		 console.log(data);
		 if(r1.value.trim() != "" && r2.value.trim() != "" && r3.value.trim() != "" && r4.value.trim() != "" && r5.value.trim() != "" && r6.value.trim() != "" ){
					data.append("espanol", r1.value);
					data.append("ingles", r2.value);
					data.append("pasado", r3.value);
					data.append("pasadop", r4.value);
					data.append("gerundio", r5.value);
					data.append("file", nuevo_imagen.files[0]);
					$.ajax({
						url: "ajax/agregar_verbo.php", //url de donde obtener los datos
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
							console.log(error);
						}
					});
		 }
		 else{
			 resultados.innerHTML = `<div class="alert alert-danger" role="alert">
							<button type="button" class="close" data-dismiss="alert">&times;</button>
								Complete el formulario para continuar
						</div>`;
		 }
	}

	