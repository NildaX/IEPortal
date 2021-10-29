var clase_actual=0;
function MostrarAlumnos(id_c1) {
  //console.log(id_c1);
  clase_actual=id_c1;
  let y2 = document.getElementById("graficas");
  y2.style.display = "none";
  let y = document.getElementById("alumnos");
  y.style.display = "block";
  let x = document.getElementById("tabla_alumnos");
  let pasar_lista = document.getElementById("pasar_lista");
  let error_dia = document.getElementById("error_dia");
  x.innerHTML = "";
  let parametros = {
            'buscar_id': id_c1
          };
  $.ajax({
    data: parametros, //ajuntamos los parametros con los datos
    url: "ajax/pedir_alumnos_lista.php", //url de donde obtener los datos
    dataType: 'json', //tipo de datos retornados
    type: 'post' //enviar variables como post
  }).done(function (data){
      let json_string = JSON.stringify(data);
      let obj = $.parseJSON(json_string);
	  let e=obj['Error'];
	  //console.log("error");
	  //console.log(e);
	  
	  if(e===undefined){
		  let fila = x.insertRow();
		  let celda1 = fila.insertCell();
		  celda1.innerHTML = `Nombre`;	
		  let celda3 = fila.insertCell();
		  celda3.innerHTML = `Pase de lista`;
		  for (let i in obj){
			  let fila = x.insertRow();
			  let celda1 = fila.insertCell();
			  celda1.innerHTML = `${obj[i].apellido} ${obj[i].apellido2} ${obj[i].nombre}`;	
			  let celda3 = fila.insertCell();
			  celda3.innerHTML = `<input type="checkbox" name="asistencia" id=${obj[i].ids}>`;		  
			//  celda3.innerHTML = `<button type="button" id=${obj[i].ids} onclick=MostrarGraficas(this.id)>Mostrar detalles</td>`;		  
			}
		  
		  pasar_lista.style.display = "block";
		  error_dia.style.display = "none";
      }
      else{
		  
		  error_dia.style.display = "block";
		  error_dia.innerHTML=`<div class="alert alert-danger" role="alert">
				<button type="button" class="close" data-dismiss="alert">&times;</button>
					${e}
			</div>`;
		  pasar_lista.style.display = "none";
	  }
	  
	  
    });
  }
  function MostrarLista() {
	  //console.log();
	  let y = document.getElementById("graficas");
	  y.style.display = "block";
	  //console.log("asistencia");
	  let ra = document.getElementsByName("asistencia");
	  let ids=new Array();
	  let asistio=new Array();
	  for(let i=0;i<ra.length;i++){
		  //console.log(ra[i].id);
		  //console.log(ra[i].checked);
		  ids.push(ra[i].id);
		  if(ra[i].checked){
			  asistio.push(1);
		  }
		  else{
			  asistio.push(0);
		  }
		 // asistio.push(ra[i].checked);
	  }
	  //console.log("ajax");
	  var parametros = {
		'ids_alumnos': ids,
		'asistencia': asistio,
		'clase':clase_actual
		};
	  $.ajax({
		data: parametros, //ajuntamos los parametros con los datos
		url: "ajax/guardar_asistencia.php", //url de donde obtener los datos
		type: 'post', //enviar variables como post
	  success: function (data){
		  //console.log("termino");
		  $("#graficas").html(data);
	  },
	    error: function (error) {
			//console.log(error);
        }
		});
  }
  
  document.addEventListener("DOMContentLoaded", function(event) {
	  let boton = document.getElementById("pasar_lista");
	  boton.addEventListener('click', MostrarLista);
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