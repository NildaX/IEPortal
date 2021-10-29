var idalumno=0;
var alumnosglobal;
var temasglobal;
var preguntasglobal = [];

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
		//console.log('objeto de alumnos global',alumnosglobal);
		for (let i in obj) {
			let fila = x.insertRow();
			let celda1 = fila.insertCell();
			celda1.innerHTML = `${obj[i].apellido} ${obj[i].apellido2} ${obj[i].nombre}`;
			let celda2 = fila.insertCell();
			celda2.innerHTML = `${obj[i].correo}`;
			let celda3 = fila.insertCell();
			celda3.innerHTML = `<button class="boton boton--pequeno" type="button" id=${obj[i].ids} onclick=MostrarGraficas(this.id)>Mostrar detalles</td>`;
		}
	});
}

function cambioTipo(e){
	//console.log(e.target.value);
	resetCanvas();
	var parametros = {
		'buscar_id': idalumno,
		'buscar_tema': 0
	};
	switch (e.target.value) {
	case '0':
		numerotema.style.display = 'none';
		resetCanvas();
		break;
	case 'preguntas':
		resetCanvas();
		$.ajax({
			data: parametros, //ajuntamos los parametros con los datos
			url: "ajax/pedir_todos_temas.php", //url de donde obtener los datos
			dataType: 'json', //tipo de datos retornados
			type: 'post' //enviar variables como post
		}).done(function (data) {
			let json_string = JSON.stringify(data);
			let obj = $.parseJSON(json_string);
			//console.log('TODOS TEMAS: ',obj);
			let objeto = new Object;
			objeto.id=0;
			objeto.Nombre='';
			objeto.cantidad='';
			
			let resultados_sumados_temas=new Array();
			let ids=new Array();
			for(let i=0;i<obj.length;i++){
				//console.log(i);
				if(ids.includes(obj[i].ID_tema)==false){
				   ids.push(obj[i].ID_tema);
				}
			}
			
			//console.log("finales");
			let nombre='';
			let total='';
			for(let i=0;i<ids.length;i++){
				//console.log(ids[i]);
				for(let j=0;j<obj.length;j++){
					if(ids[i]===obj[j].ID_tema){
					  total+=obj[j].resultados+'_';
					  nombre = obj[j].Nombre;
					}
				}
				let objeto = new Object;
				objeto.id=ids[i];
				objeto.Nombre=nombre;
				objeto.cantidad=total;
				total='';
				resultados_sumados_temas[i]=objeto;
				//console.log('i ',i);
			}
			//console.log("finaleeeeeeeeeees 2");
			for(let i=0;i<resultados_sumados_temas.length;i++){
				//console.log(resultados_sumados_temas[i]);
				asumar = resultados_sumados_temas[i].cantidad.split('_');
				let suma=0;
				for(let k in asumar){
					suma+=Number(asumar[k]);
				}
				resultados_sumados_temas[i].cantidad=suma;
			}
			//console.log("completos 2");
			for(let i=0;i<resultados_sumados_temas.length;i++){
				//console.log(resultados_sumados_temas[i]);
			}
			pintarGrafica(resultados_sumados_temas,'Errores por Tema','bar');
		});

		$.ajax({
			data: parametros, //ajuntamos los parametros con los datos
			url: "ajax/pedir_temas.php", //url de donde obtener los datos
			dataType: 'json', //tipo de datos retornados
			type: 'post' //enviar variables como post
		}).done(function (data) {
			let json_string = JSON.stringify(data);
			let obj = $.parseJSON(json_string);
			//console.log('OBJETO DE TEMAS: ',obj)
			temasglobal = obj;
			//console.log('TEMAS GLOBAL', temasglobal);
			numerotema.innerHTML = '';
			numerotema.innerHTML += `<option value="0" selected>Selecciona un tema </option> `
			 for (let i in obj) {
				numerotema.innerHTML += `<option value="${obj[i].ID_tema}">${obj[i].Nombre} </option> `;
			}
		});
		
		numerotema.style.display = 'block';
		//console.log('TEMA SELECCIONADO: ',numerotema.value)
        break;
    case 'verbos':
        numerotema.style.display = 'none';
        resetCanvas()
        $.ajax({
			data: parametros, //ajuntamos los parametros con los datos
			url: "ajax/pedir_resultados_verbos.php", //url de donde obtener los datos
			dataType: 'json', //tipo de datos retornados
			type: 'post' //enviar variables como post
		}).done(function (data) {
			let json_string = JSON.stringify(data);
			let obj = $.parseJSON(json_string);
			//console.log('Todos los verbos del alumno: ', parametros.buscar_id);	
			$.ajax({
				
				url: "ajax/pedir_todos_verbos.php", //url de donde obtener los datos
				dataType: 'json', //tipo de datos retornados
				type: 'post' //enviar variables como post
			}).done(function (data) {
				let json_string = JSON.stringify(data);
				let verbosLista = $.parseJSON(json_string);
				cambiarVerbos(obj,verbosLista);
			});
           // cambiarVerbos(obj);
        });
        break;

   }
}


function cambiarVerbos(objeto,todos){
    let resultados_sumados_verbos = [{
        Nombre: '',
        id: 0,
        cantidad: 0
    }];
    //console.log('Todos los verbos');
    //console.log(objeto);
	//console.log('LISTA VERBOS')
	//console.log(todos);// todos los verbos, nombre, id, habilitado


    for (let i in objeto) {
        let verbos = objeto[i].ids_verbos.split('_');
        //console.log(verbos)
        let errores = objeto[i].num_errores.split('_');
        //console.log(errores)

         for (let j in verbos) {
             let index = resultados_sumados_verbos.findIndex(x => x.id === verbos[j]);
             //console.log(index);
               if (index != -1) {
                  //console.log('lo encontro sumando')
                 resultados_sumados_verbos[index].cantidad = Number(resultados_sumados_verbos[index].cantidad) + Number(errores[j]);
              } else {
				  //console.log('id del verbo: ', verbos[j], 'habilitado: ',todos[verbos[j]-1].Habilitado)
                  objetoNuevo = {
                       Nombre: ` ${todos[verbos[j]-1].Espanol}`,
                       id: verbos[j],
                      cantidad: Number(errores[j])
                   }
                   if(Number(todos[verbos[j]-1].Habilitado)===1){
					resultados_sumados_verbos.push(objetoNuevo);
				   }
                   
              }

         }
    }
      resultados_sumados_verbos.sort((a, b) => (Number(a.id) > Number(b.id)) ? 1 : -1)
      resultados_sumados_verbos.shift()
    
          pintarGrafica(resultados_sumados_verbos,'Errores por Verbo','line');
}



function cambiarTemas(e){
	//console.log(e.target.value);
	resetCanvas();
	//console.log('TEMA SELECCIONADO 2: ',e.target.value)
	var parametros = {
		'buscar_id': idalumno,
		'buscar_tema': 0
	};
	parametros.buscar_id = idalumno;
	parametros.buscar_tema = e.target.value;
	
	//console.log('PARAMETROS A ENVIAR: ', parametros); // aca viene el tema del cual seleccionar todas las preguntas
	$.ajax({
		data: parametros, //ajuntamos los parametros con los datos
		url: "ajax/pedir_todas_preguntas.php", //url de donde obtener los datos
		dataType: 'json', //tipo de datos retornados
		type: 'post' //enviar variables como post
	}).done(function (data) {
		let json_string = JSON.stringify(data);
		preguntasglobal = $.parseJSON(json_string);
		//console.log('Preguntas globales',preguntasglobal);
		}
	)
	$.ajax({
		data: parametros, //ajuntamos los parametros con los datos
		url: "ajax/pedir_resultados.php", //url de donde obtener los datos
		dataType: 'json', //tipo de datos retornados
		type: 'post' //enviar variables como post
	}).done(function (data) {
		let json_string = JSON.stringify(data);
		let obj = $.parseJSON(json_string);
		//console.log(obj);
		let resultados_sumados = [{
			Nombre: '',
			id: 0,
			cantidad: 0
		}];
		for (let i in obj) {
			let preguntas = obj[i].ids_preguntas.split('_');
			let errores = obj[i].num_errores.split('_');

			for (let j in preguntas) {

				let index = resultados_sumados.findIndex(x => x.id === preguntas[j]);
				//console.log(index);
				if (index != -1) {
					//console.log('lo encontro sumando')
					resultados_sumados[index].cantidad = Number(resultados_sumados[index].cantidad) + Number(errores[j]);
				} else {
					objeto = {
						Nombre: `Pregunta ${preguntas[j]}`,
						id: preguntas[j],
						cantidad: Number(errores[j])
					}
					//console.log('Toca pregunta: ',objeto);
					let indexglobal = preguntasglobal.findIndex(x => x.ID_po === preguntas[j])
					//console.log('INDICE DE LA PREGUNTA QUE TOCA EN arrayglobal',indexglobal);
					if(Number(preguntasglobal[indexglobal].Habilitado)===1){
						resultados_sumados.push(objeto);
					}
					
				}

			}
		}
		resultados_sumados.sort((a, b) => (Number(a.id) > Number(b.id)) ? 1 : -1)
		resultados_sumados.shift()
		
			pintarGrafica(resultados_sumados,'Errores por Pregunta','bar');
	});			
}
function MostrarGraficas(id_c) {
	resetCanvas()
	idalumno = id_c;
	//console.log('ID ALUMNO :',idalumno);
	let tipo = document.getElementById("tipodegrafica");
	let numerotema = document.getElementById("numerotema");
	let y = document.getElementById("graficas");
	//let botonAccion = document.getElementById("generar");

	y.style.display = "none";
	y.style.display = "block";
	numerotema.style.display= "none";
	resetSelector(tipo);
	resetSelector(numerotema); 
	var parametros = {
		'buscar_id': idalumno,
		'buscar_tema': 0
	};
	//console.log('PARAMTROS DECLARADOS: ', parametros)
}
  
document.addEventListener("DOMContentLoaded", function (event) {
	//console.log("primero");
	
    let tipo = document.getElementById("tipodegrafica");
	let numerotema = document.getElementById("numerotema");
	tipo.addEventListener('change', cambioTipo);
	numerotema.addEventListener('change', cambiarTemas);
	
	
	$.ajax({
		url: "ajax/pedir_clases.php", //url de donde obtener los datos
		dataType: 'json', //tipo de datos retornados
		type: 'post' //enviar variables como post
	}).done(function (data) {
		let json_string = JSON.stringify(data);
		let obj = $.parseJSON(json_string);
		let x = document.getElementById("tabla_clases");
		
		for (let i in obj) {
			let fila = x.insertRow();
			let celda1 = fila.insertCell();
			celda1.innerHTML = `${obj[i].tipo}`;
			let celda2 = fila.insertCell();
			celda2.innerHTML = `${obj[i].dias}`;
			let celda3 = fila.insertCell();
			celda3.innerHTML = `${obj[i].horas}`;
			let celda4 = fila.insertCell();
			celda4.innerHTML = `<button class="boton boton--pequeno" type="button" id=${obj[i].ids} onclick=MostrarAlumnos(this.id) >Mostrar Alumnos`;
		}

	});
   }
)


  function pintarGrafica (informacion,tiutlo,tipo) {
	titulo= tiutlo;
	resetCanvas();

	let ctx = document.getElementById('myChart').getContext('2d');
	let myChart = new Chart(ctx, {
		type: tipo,
		data: {
			labels: informacion.map(function (a) { return a.Nombre; }),
			datasets: [{
				label: 'Cantidad de errores',
				data: informacion.map(function (b) { return b.cantidad; }),
				backgroundColor :'rgba(147,198,253, 1)',
			}]
		},
		options: {
			scales: {
				y: {
					beginAtZero: true
				}
			},
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				title: {
				display: true,
				text: titulo,
				}
			},  
		}
	});
	//console.log(myChart);   
	
  }

  function resetCanvas(){
	$("canvas#myChart").remove();
	$("div#chart-container").append('<canvas id="myChart"  style="position: relative; width:1920px; height:600px !important;""></canvas>');
  }

  function resetSelector(selector){
	selector.selectedIndex = 0;
  }
