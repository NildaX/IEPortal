var obj = 0;
var id_clase=0;
var id_profesor=0;
document.addEventListener("DOMContentLoaded", function(event) {
	//console.log("primero");
    llenar_tabla();
	}
  )
  
  function llenar_tabla(){
	let x = document.getElementById("tabla_mostraralumnos");
	x.innerHTML = "";
	$.ajax({
		url: "ajax/pedir_alumnos_mostrar.php", //url de donde obtener los datos
		dataType: 'json', //tipo de datos retornados
		type: 'post' //enviar variables como post
	}).done(function (data){
		let json_string = JSON.stringify(data);
		obj = $.parseJSON(json_string);
		//console.log(obj);
		let fila = x.insertRow();
		(fila.insertCell()).innerHTML = `<strong>Nombre del alumno</strong>`;	
		(fila.insertCell()).innerHTML = `<strong>Correo</strong>`;
		(fila.insertCell()).innerHTML = `<strong>Acciones</strong>`;
		let valor="";
		for (let i in obj){
		  let fila = x.insertRow();
		  fila.classList.remove('table-warning');
	//	  fila.classList.add('w-100');
		  if(obj[i].habilitado=="0"){
			  fila.classList.add('table-warning');
			  valor="Habilitar";
			  valorico="fi-rr-check";
		  }
		  else{
			  fila.classList.add('table-default');
			  valor="Deshabilitar";
			  valorico="fi-rr-ban";
		  }
		  let celda1=fila.insertCell();
		  celda1.classList.add('align-middle');
		  celda1.innerHTML = `${obj[i].nombre}`;	
		  let celda2=fila.insertCell();
		  celda2.classList.add('align-middle');
		  celda2.innerHTML = `${obj[i].correo}`;	
	//	  let celda3=fila.insertCell();
	//	  celda3.classList.add('align-middle');
	//	  celda3.innerHTML = `${obj[i].horas}`;
		  let celda4=fila.insertCell();
		  celda4.classList.add('align-middle');
		  celda4.innerHTML = `
		  <button id="${obj[i].id},${i}" onclick=Editar_alumno(this.id) class="boton boton--pequeno"> <i class="${valorico}"></i> ${valor}</button>
		  <input name="boton_editar" type="hidden" value="${valor}">`;
		}
	});
  }
  function Editar_alumno(id_ed) {
	  //console.log("habilitar deshabilitar");
	  let id2=id_ed.split(",");
	  let resultados = document.getElementById("resultados_alumnos");
	  resultados.innerHTML = "";
	  let habilitar=0;
	  let m0 = document.getElementsByName("boton_editar");
	  if(m0[id2[1]].value=="Habilitar"){
		  habilitar=1;
	   }
	  var parametros = {
			'id_alumno':id2[0],
			'habilitado': habilitar,
			};
		//console.log(parametros);
		$.ajax({
			data: parametros, //ajuntamos los parametros con los datos
			url: "ajax/editar_alumno.php", //url de donde obtener los datos
			type: 'post', //enviar variables como post,
		  success: function (data){
			  resultados.innerHTML=data;
			  llenar_tabla();
		  },
		  error: function (error) {
				//console.log(error);
			}
		});
  }