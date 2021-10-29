
document.addEventListener("DOMContentLoaded", function(event) {
	  //console.log("primero");
	  
  }
  )
function cambio_opcion(id_1){
	//console.log("cambio opcion");
	//console.log(id_1);
	let select_ = document.getElementById("clase_alumno");
	let seleccionar="";
	select_.innerHTML="";
	if(id_1==="alumno"){
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
	let ra = document.getElementsByName("tipo");
	let bandera=0;
	let tipo=0;
	if(ra[0].checked){
		//console.log("por grupo");
		tipo=1;
	}
	else{
		if(ra[1].checked){
		 //console.log("por alumno");
		 tipo=2;
	    }
		else{
			//console.log("ninguno");
			bandera=1;
		}
	}
	let select_ = document.getElementById("clase_alumno");
	let valor_select=0;
	valor_select=select_.value;
	//console.log("seleecionado en clase/alumno");
	//console.log(select_.value);
	if(valor_select==="0"){
		bandera=1;
		//console.log("select es 0");
	}
	 
	let inicio = document.getElementById("inicio");
	let final_ = document.getElementById("final");
	if (inicio.value!="" && final_.value!=""){
		//console.log("no es vacio");
	}
	else{
		bandera=1;
	}
	if(bandera===1){
		//console.log("seleccione grupo/alumno y fechas");
		let y = document.getElementById("resultados");
	    y.style.display = "block";
		y.innerHTML += `<div class="alert alert-danger" role="alert">
				<button type="button" class="close" data-dismiss="alert">&times;</button>
					Seleccione grupo/alumno y fechas para continuar
			</div>`;	
	}
	else{
		let y = document.getElementById("resultados");
	    y.style.display = "block";
		let x = document.getElementById("alumnos_tabla");
		x.innerHTML = "";
	//	y.innerHTML = `<div class="alert alert-success" role="alert">
		//		<button type="button" class="close" data-dismiss="alert">&times;</button>
			//		Mostrando asistencia
		//	</div>`;
			var parametros = {
			'tipo': tipo,
			'fecha_inicio': inicio.value,
			'fecha_final':final_.value,
			'clase_alumno':valor_select
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
			  if(tipo===1){
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
			  }
			  else{ 
			      //console.log((obj.desc_clases).length);
				  for(let i=0;i<(obj.desc_clases).length;i++){
					  //console.log(obj.desc_clases[i]);
					  fila = x.insertRow();
					  (fila.insertCell()).innerHTML = `Clase: ${obj.desc_clases[i]}`;
					  fila = x.insertRow();
					  (fila.insertCell()).innerHTML = `Nombre`;
					  for(let j=0;j<(obj.columnas_fecha).length;j++){
						//console.log(obj.columnas_fecha[j]);
						(fila.insertCell()).innerHTML = `${obj.columnas_fecha[j]}`;	;
					  }
					  fila = x.insertRow();
					  (fila.insertCell()).innerHTML = `${obj[0].Nombre}`;
					  for(let j=0;j<(obj.columnas_fecha).length;j++){
						 for (let ii in obj){		 
							 if(ii!='columnas_fecha' && ii!='desc_clases' &&  ii!='diferentes_clases' ){
								  if(obj.diferentes_clases[i]===obj[ii].ID_clase && obj.columnas_fecha[j]===obj[ii].Fecha){
									//  (fila.insertCell()).innerHTML = `${obj[ii].Asistencia}`;
									    celda_=fila.insertCell();
										celda_.innerHTML = `  `;
										if(obj[ii].Asistencia==="0"){
											celda_.style.backgroundColor="#FF0000";
										}
										else{
											celda_.style.backgroundColor="#00FF00";
										}
								  }
								  else{
									  if(obj.columnas_fecha[j]===obj[ii].Fecha){
									  (fila.insertCell()).innerHTML = `---`;
									  }
								  }
						    }
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

	//console.log(inicio.value); console.log(final_.value);
}