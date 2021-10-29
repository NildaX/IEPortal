var objeto_alumno_clase=0;

document.addEventListener("DOMContentLoaded", function(event) {
	//console.log("primero");
	let boton_ = document.getElementById("asig_al");
	boton_.addEventListener('click',cambiar_clase);
	let boton_1 = document.getElementById("asig_al_conv");
	boton_1.addEventListener('click',cambiar_clase2);
	let ag = document.getElementById("alumnos_gramatical");
	let ac = document.getElementById("alumnos_conversacional");
	let cg = document.getElementById("clases_gramatical");
	let cc = document.getElementById("clases_conversa");
	
	$.ajax({
			url: "ajax/pedir_alumnos2.php", //url de donde obtener los datos
			dataType: 'json', //tipo de datos retornados
			type: 'post' //enviar variables como post
		}).done(function (data){
			let json_string = JSON.stringify(data);
		    let obj = $.parseJSON(json_string);
			//console.log(obj);
			for(let i=0;i<(obj.ids_alumnos_gramatical).length;i++){
				ag.innerHTML += "<option value='"+obj.ids_alumnos_gramatical[i]+"'>"+obj.Nombres_alumnos_gramatical[i]+"</option>";
			}
			for(let i=0;i<(obj.ids_alumnos_conversacional).length;i++){
				ac.innerHTML += "<option value='"+obj.ids_alumnos_conversacional[i]+"'>"+obj.Nombres_alumnos_conversacional[i]+"</option>";
			}
			for(let i=0;i<(obj.ids_gramatical).length;i++){
				cg.innerHTML += "<option value='"+obj.ids_gramatical[i]+"'>"+obj.Clases_gramatical[i]+"</option>";
			}
			for(let i=0;i<(obj.ids_conversacional).length;i++){
				cc.innerHTML += "<option value='"+obj.ids_conversacional[i]+"'>"+obj.Clases_conversacional[i]+"</option>";
			}
			});
			
/*	let gr = document.getElementById("grupo");
	let al = document.getElementById("alumno");
	let gr_al = document.getElementById("clase_alumno");
	let reg = document.getElementById("dar_registro");
	gr.addEventListener('change', cambio_opcion);
	al.addEventListener('change', cambio_opcion);
	gr_al.addEventListener('change', cambio_clase_a);
	reg.addEventListener('click', MostrarRegistro);
	  */
	  
  }
  )
  
 function cambiar_clase(){
	//console.log("cambiar clase"); 
	let ag = document.getElementById("alumnos_gramatical");
	let cg = document.getElementById("clases_gramatical");
	let resultados = document.getElementById("resultados");
	if(ag.value!=0 && cg.value!=0){
		//console.log("todos sin 0");
		var parametros = {
				'id_alumno': ag.value,
				'id_clase_gra': cg.value,
				};
			  $.ajax({
				data: parametros, //ajuntamos los parametros con los datos
				url: "ajax/cambiar_clase.php", //url de donde obtener los datos
				type: 'post', //enviar variables como post
			  success: function (data){
				  resultados.innerHTML=data;
				  },
				error: function (error) {
					//console.log(error);
				}
				});
	}
	else{
		//console.log("un 0");
		resultados.innerHTML = `<div class="alert alert-danger" role="alert">
						<button type="button" class="close" data-dismiss="alert">&times;</button>
							Complete el formulario para continuar
					</div>`;
	}
	
 }
 
 function cambiar_clase2(){
	//console.log("cambiar clase2"); 
	let ag = document.getElementById("alumnos_conversacional");
	let cc = document.getElementById("clases_conversa");
	let resultados = document.getElementById("resultados_conver");
	if(ag.value!=0 && cc.value!=0){
		//console.log("todos sin 0");
		var parametros = {
				'id_alumno': ag.value,
				'id_clase_conve':cc.value
				};
			  $.ajax({
				data: parametros, //ajuntamos los parametros con los datos
				url: "ajax/cambiar_clase2.php", //url de donde obtener los datos
				type: 'post', //enviar variables como post
			  success: function (data){
				  resultados.innerHTML=data;
				  },
				error: function (error) {
					console.log(error);
				}
				});
	}
	else{
		//console.log("un 0");
		resultados.innerHTML = `<div class="alert alert-danger" role="alert">
						<button type="button" class="close" data-dismiss="alert">&times;</button>
							Complete el formulario para continuar
					</div>`;
	}
	
 }