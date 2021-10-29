function MostrarAlumnos(id_c1) {
  //console.log(id_c1);
  let y = document.getElementById("alumnos");
  y.style.display = "block";
  let x = document.getElementById("tabla_alumnos");
  x.innerHTML = "";
  let parametros = {
            'buscar_id': id_c1
          };
  $.ajax({
    data: parametros, //ajuntamos los parametros con los datos
    url: "ajax/pedir_alumnos.php", //url de donde obtener los datos
    dataType: 'json', //tipo de datos retornados
    type: 'post' //enviar variables como post
  }).done(function (data){
	  let fila = x.insertRow();
	  let celda1 = fila.insertCell();
	  celda1.innerHTML = `Nombre`;	
	  let celda2 = fila.insertCell();
	  celda2.innerHTML = `Correo`;
	  let celda3 = fila.insertCell();
	  celda3.innerHTML = `Detalles`;
      let json_string = JSON.stringify(data);
      let obj = $.parseJSON(json_string);
      for (let i in obj){
		  let fila = x.insertRow();
		  let celda1 = fila.insertCell();
		  celda1.innerHTML = `${obj[i].apellido} ${obj[i].apellido2} ${obj[i].nombre}`;	
		  let celda2 = fila.insertCell();
		  celda2.innerHTML = `${obj[i].correo}`;
          let celda3 = fila.insertCell();
		  celda3.innerHTML = `<button type="button" id=${obj[i].ids} onclick=MostrarGraficas(this.id)>Mostrar detalles</td>`;		  
		}
    });
  }
function MostrarGraficas(id_c) {
	  //console.log(id_c);
	  let tipo = document.getElementById("tipodegrafica")
	  let y = document.getElementById("graficas");
	  y.style.display = "block";
	  tipo.addEventListener("change", function(){
		//console.log(tipo.value);
		let parametros = {
            'buscar_id': id_c
          };
  		$.ajax({
    		data: parametros, //ajuntamos los parametros con los datos
    		url: "ajax/pedir_resultados.php", //url de donde obtener los datos
    		dataType: 'json', //tipo de datos retornados
    		type: 'post' //enviar variables como post
  				}).done(function (data){
      			let json_string = JSON.stringify(data);
      			let obj = $.parseJSON(json_string);
				//console.log(obj);
				let resultados_sumados = [{
					id: 0,
					cantidad: 0
				}];
				for (let i in obj){
					let preguntas = obj[i].ids_preguntas.split('_');
					let errores = obj[i].num_errores.split('_');
					// console.log(preguntas);
					// console.log(errores);
					// console.log('acaba renglon', preguntas.length);
					for (let j in preguntas){
						//console.log(preguntas[j]);
						// console.log(errores[j]);
						// console.log('acaba renglon j')
						//let found = resultados_sumados.some(item => item.id === preguntas[j])
						let index = resultados_sumados.findIndex(x => x.id === preguntas[j]);
						//console.log(index);
						if(index!=-1){
							//console.log('lo encontro sumando')
							resultados_sumados[index].cantidad = Number(resultados_sumados[index].cantidad) + Number(errores[j]);
						}else{
							objeto = {
								id: preguntas[j],
								cantidad: Number(errores[j])
							}
							resultados_sumados.push(objeto);
						}
						
					}
				}
				resultados_sumados.sort( (a,b) => (a.id > b.id ) ? 1 : -1 )
				//console.log(resultados_sumados);
    		});		
	  	});
	  
 }
  
  document.addEventListener("DOMContentLoaded", function(event) {
	  //console.log("primero");
	  $.ajax({
		url: "ajax/pedir_clases.php", //url de donde obtener los datos
		dataType: 'json', //tipo de datos retornados
		type: 'post' //enviar variables como post
	  }).done(function (data){
		  let json_string = JSON.stringify(data);
		  let obj = $.parseJSON(json_string);
          let x = document.getElementById("tabla_clases");
		  
		  for (let i in obj){
			  let fila = x.insertRow();
			  let celda1 = fila.insertCell();
			  celda1.innerHTML = `${obj[i].tipo}`;	
			  let celda2 = fila.insertCell();
			  celda2.innerHTML = `${obj[i].dias}`;
			  let celda3 = fila.insertCell();
			  celda3.innerHTML = `${obj[i].horas}`;	
              let celda4 = fila.insertCell();
			  celda4.innerHTML = `<button type="button" id=${obj[i].ids} onclick=MostrarAlumnos(this.id)>Mostrar Alumnos`;
		  }
		  
		});
  }
  )
