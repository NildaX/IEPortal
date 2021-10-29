var objeto_alumno_clase=0;

document.addEventListener("DOMContentLoaded", function(event) {
	//console.log("primero");
	let gr = document.getElementById("dias_a");
	gr.addEventListener('change', cambio_dias);
	let boton_ = document.getElementById("reg_clase");
	boton_.addEventListener('click', enviar_clase);
	let select_2 = document.getElementById("profesor_a");
	
	$.ajax({
			url: "ajax/pedir_profesores.php", //url de donde obtener los datos
			dataType: 'json', //tipo de datos retornados
			type: 'post' //enviar variables como post
		}).done(function (data){
			let json_string = JSON.stringify(data);
		    let obj = $.parseJSON(json_string);
			//console.log(obj);
			for (let i in obj){
					select_2.innerHTML += "<option value='"+obj[i].ID_profesor+"'>"+obj[i].Nombre+"</option>"; 	
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
//	for(let i=0;i<contador;i++){
		
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
	let resultados = document.getElementById("resultados");
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
