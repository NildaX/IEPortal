var objeto_alumno_clase=0;

document.addEventListener("DOMContentLoaded", function(event) {
	//console.log("primero");
	
	let gr = document.getElementById("grupo");
	let al = document.getElementById("alumno");
	let gr_al = document.getElementById("clase_alumno");
	let reg = document.getElementById("dar_registro");
	gr.addEventListener('change', cambio_opcion);
	al.addEventListener('change', cambio_opcion);
	gr_al.addEventListener('change', cambio_clase_a);
	reg.addEventListener('click', MostrarRegistro);
	  
  }
  )
 function cambio_clase_a(alumno){
	 let ra = document.getElementsByName("tipo");
	if(ra[1].checked){
		//console.log("alumno 2");
	//console.log(alumno.srcElement.value);
	let select_2 = document.getElementById("clase_");
	let seleccionar2="";
	select_2.innerHTML="";
	select_2.style.display = "block";
	seleccionar2="Seleccione una clase";
	select_2.innerHTML += "<option value='"+0+"'>"+seleccionar2+"</option>"; 
	var parametros = {
			'alumno':alumno.srcElement.value
			};
	$.ajax({
		    data:parametros,
			url: "ajax/pedir_clases_alumno.php", //url de donde obtener los datos
			dataType: 'json', //tipo de datos retornados
			type: 'post' //enviar variables como post
		}).done(function (data){
			let json_string = JSON.stringify(data);
		    let obj = $.parseJSON(json_string);
			let nombre="";
			objeto_alumno_clase=obj;
			//console.log("clases de alumnos");
			//console.log(obj);
			let array_id=[];
			for (let i in obj){
				if(!array_id.includes(obj[i].ids)){
					select_2.innerHTML += "<option value='"+obj[i].ids+"'>"+obj[i].nombre+"</option>"; 
					array_id.push(obj[i].ids);
				}
			}
		});
	}
	
 }
function cambio_opcion(id_1){
	//console.log("cambio opcion");
	//console.log(id_1.srcElement.value);
	let select_ = document.getElementById("clase_alumno");
	let seleccionar="";
	select_.innerHTML="";
	if(id_1.srcElement.value==="alumno"){
		//console.log("es alumno");
		seleccionar="Seleccione un alumno";
		select_.innerHTML += "<option value='"+0+"'>"+seleccionar+"</option>"; 
		$.ajax({
			url: "ajax/pedir_alumnos_asistencia.php", //url de donde obtener los datos
			dataType: 'json', //tipo de datos retornados
			type: 'post' //enviar variables como post
		}).done(function (data){
			let json_string = JSON.stringify(data);
		    let obj = $.parseJSON(json_string);
			let nombre="";
			//console.log("clases");
			//console.log(obj);
			for (let i in obj){
				select_.innerHTML += "<option value='"+obj[i].ids+"'>"+obj[i].nombre+"</option>"; 
			}
			
		});
	}
	else{
		let select_2 = document.getElementById("clase_");
		select_2.style.display = "none";
		//console.log("es grupo");
		seleccionar="Seleccione una clase";
		select_.innerHTML += "<option value='"+0+"'>"+seleccionar+"</option>"; 
		$.ajax({
			url: "ajax/pedir_clases.php", //url de donde obtener los datos
			dataType: 'json', //tipo de datos retornados
			type: 'post' //enviar variables como post
		}).done(function (data){
			let json_string = JSON.stringify(data);
		    let obj = $.parseJSON(json_string);
			let nombre="";
			//console.log("clases");
			//console.log(obj);
			for (let i in obj){
				nombre=obj[i].tipo+"-"+obj[i].dias+"-"+obj[i].horas;
				select_.innerHTML += "<option value='"+obj[i].ids+"'>"+nombre+"</option>"; 
			}
		});
	}
	
	select_.style.display = "block";
		
	
}
function MostrarRegistro() {
	//console.log("mostrar registro");
	ra = document.getElementsByName("tipo");
	let select_ = document.getElementById("clase_alumno");
	let inicio = document.getElementById("inicio");
	let final_ = document.getElementById("final");
	let select_2 = document.getElementById("clase_");
	let y = document.getElementById("resultados");
	let x = document.getElementById("alumnos_tabla");
	y.style.display = "block";
				
	if((ra[0].checked || ra[1].checked)&& select_.value!=0 && inicio.value!="" && final_.value!="" && inicio.value<final_.value){
		//por clase
		if(ra[0].checked){
			y.innerHTML = "";
			x.innerHTML = "";
				var parametros = {
				'tipo': 1,
				'fecha_inicio': inicio.value,
				'fecha_final':final_.value,
				'clase_alumno':select_.value
				};
			  $.ajax({
				data: parametros, //ajuntamos los parametros con los datos
				url: "ajax/sacar_asistencia.php", //url de donde obtener los datos
				type: 'post', //enviar variables como post
				dataType: 'json',
			  success: function (data){
				  let json_string = JSON.stringify(data);
				  let obj = $.parseJSON(json_string);
				  //console.log(obj);
				  //console.log("es tipo 1 7");
				  //console.log((obj.columnas_fecha).length);
				  let fila = x.insertRow();
				  let celda1 = fila.insertCell();
				  celda1.innerHTML = `Nombre`;	
				  for(let i=0;i<(obj.columnas_fecha).length;i++){
					  //console.log(obj.columnas_fecha[i]);
					  (fila.insertCell()).innerHTML = `${obj.columnas_fecha[i]}`;	;
				  }
				  let bandera__=0;
				  let unavez=0;
				  var celda_=0;
				  fila = x.insertRow();
				  for (let i=0;i<(obj.diferentes_alumnos).length;i++){
					  bandera__=0;
					  unavez=0;
					  for (let ii in obj){
						  if(obj.diferentes_alumnos[i]===obj[ii].ID_alumno && bandera__<(obj.columnas_fecha).length){
							  if(unavez===0){
							   (fila.insertCell()).innerHTML = `${obj[ii].Nombre}`;
							   unavez=1;
							  }
							  
							  for(let j=0;j<(obj.columnas_fecha).length;j++){
								   if(obj[ii].Fecha === obj.columnas_fecha[j]){
										celda_=fila.insertCell();
										celda_.innerHTML = `  `;
										if(obj[ii].Asistencia==="0"){
											celda_.style.backgroundColor="#FF0000";
										}
										else{
											celda_.style.backgroundColor="#00FF00";
										}
										bandera__+=1;
								   }
							  } 
						  }
						  if(bandera__===(obj.columnas_fecha).length){
							  fila = x.insertRow();
						  }
					  }
				  }
				},
				error: function (error) {
					//console.log(error);
				}
				});
		}
		//por alumno
		else{
            if(select_2.value!=0){
				y.innerHTML = "";
				x.innerHTML = "";
				//console.log("es por alumno");
				var parametros = {
					'tipo': 2,
					'fecha_inicio': inicio.value,
					'fecha_final':final_.value,
					'clase_alumno':select_.value,
					'clase':select_2.value,
					};
				  $.ajax({
					data: parametros, //ajuntamos los parametros con los datos
					url: "ajax/sacar_asistencia.php", //url de donde obtener los datos
					type: 'post', //enviar variables como post
					dataType: 'json',
				  success: function (data){
					  let json_string = JSON.stringify(data);
					  let obj = $.parseJSON(json_string);
					  //console.log(obj);
					  let fila = x.insertRow();
					  let celda1 = fila.insertCell();
					  celda1.innerHTML = `Nombre`;	
					  for(let i=0;i<(obj.columnas_fecha).length;i++){
						  //console.log(obj.columnas_fecha[i]);
						  (fila.insertCell()).innerHTML = `${obj.columnas_fecha[i]}`;	;
					  }
					  fila = x.insertRow();
					  (fila.insertCell()).innerHTML = `${obj[0].Nombre}`;
					  let bandera__=0;
					  let unavez=0;
					  var celda_=0;
						  for (let ii in obj){
								  for(let j=0;j<(obj.columnas_fecha).length;j++){
									   if(obj[ii].Fecha === obj.columnas_fecha[j]){
											celda_=fila.insertCell();
											celda_.innerHTML = `  `;
											if(obj[ii].Asistencia==="0"){
												celda_.style.backgroundColor="#FF0000";
											}
											else{
												celda_.style.backgroundColor="#00FF00";
											}
									   }
								  } 
							  }
							 
						  
					  
					  },
					error: function (error) {
						//console.log(error);
					}
					});
			}	
            else{
				y.innerHTML = `<div class="alert alert-danger" role="alert">
						<button type="button" class="close" data-dismiss="alert">&times;</button>
							Seleccione una clase para continuar
					</div>`;
				x.innerHTML = "";
			}			
		}
		
	}
	else{
		y.innerHTML = `<div class="alert alert-danger" role="alert">
				<button type="button" class="close" data-dismiss="alert">&times;</button>
					Seleccione clase/alumno y fechas para continuar
			</div>`;
		x.innerHTML = "";
		
	}
}