var idalumno=0;
var grupoglobal, grupoglobal2;
var idgrupoglobal;
var temasglobal;
var banderadeentrada=0;
var RespuestasVerbos, ListaVerbos;
var preguntasglobaltema = [];

document.addEventListener("DOMContentLoaded", function (event) {
	//console.log("primero");
	
    let tipo = document.getElementById("tipodegrafica_grupo");
	let numerotema = document.getElementById("numerotema_grupo");

	$.ajax({
		url: "ajax/pedir_clases.php", //url de donde obtener los datos
		dataType: 'json', //tipo de datos retornados
		type: 'post' //enviar variables como post
	}).done(function (data) {
		let json_string = JSON.stringify(data);
		let obj = $.parseJSON(json_string);
		let x = document.getElementById("tabla_clases_grupo");
		//console.log('OBJETO GRUPO DESDE GRUPO ',obj)
		for (let i in obj) {
			let fila = x.insertRow();
			let celda1 = fila.insertCell();
			celda1.innerHTML = `${obj[i].tipo}`;
			let celda2 = fila.insertCell();
			celda2.innerHTML = `${obj[i].nombre} ${obj[i].apellido_p} ${obj[i].apellido_m}`;
			let celda3 = fila.insertCell();
			celda3.innerHTML = `${obj[i].dias}`;
			let celda4 = fila.insertCell();
			celda4.innerHTML = `${obj[i].horas}`;
			let celda5 = fila.insertCell();
			celda5.innerHTML = `<button type="button" class="boton boton--pequeno" id=${obj[i].ids} onclick=MostrarAlumnosGrupo(this.id)>Ver detalles`;
		}

	});
   }
)

function MostrarAlumnosGrupo(id_c1) {
	//console.log('ID DEL GRUPO',id_c1);
    idgrupoglobal= id_c1;
	let y = document.getElementById("alumnos_grupo");
	y.style.display = "block";
	let x = document.getElementById("tabla_alumnos_grupo");
	x.innerHTML = "";
	let parametros = {
		'buscar_id': id_c1
	};
	$.ajax({
		data: parametros, //ajuntamos los parametros con los datos
		url: "ajax/pedir_info_grupo.php", //url de donde obtener los datos
		dataType: 'json', //tipo de datos retornados
		type: 'post' //enviar variables como post
	}).done(function (data) {
		
		let json_string = JSON.stringify(data);
		let obj = $.parseJSON(json_string);
		const respuesta = obj;
		//console.log('OBJETO RESPUESTA', respuesta)
		grupoglobal = respuesta;
		
		
		//console.log('objeto de alumnos global, desde grupo',grupoglobal);
        MostrarGraficasGrupo([...grupoglobal])
       
		
	});
  }

function MostrarGraficasGrupo(grupoAlumnos) {
	resetCanvasGrupo()
	
	////console.log('GRUPO EN MOSTRAR GRAFICAS GRUPO :',grupoAlumnos);
	let tipo = document.getElementById("tipodegrafica_grupo");

	let y = document.getElementById("graficas_grupo");

	y.style.display = "none";
	y.style.display = "block";
	numerotema.style.display= "none";

	tipo.addEventListener("change",cambioTipoGrupo);


  }

function cambioTipoGrupo(tipo){
	let numerotema = document.getElementById("numerotema_grupo");
	resetCanvasGrupo()
	switch (tipo.target.value){
		case '0':
			//console.log('CASO 0')
			
			break;
		case 'preguntas':
			//console.log('CASO preguntas')
			numerotema.addEventListener("change",cambioTipoTema);
			numerotema.style.display= "block";
			tipoTemas([...grupoglobal]);
			break;
		case 'verbos':
			
			//console.log('CASO verbos')
			let parametros = {
				'buscar_id': idgrupoglobal
			};
			$.ajax({
				data: parametros, //ajuntamos los parametros con los datos
				url: "ajax/pedir_verbos_grupo.php", //url de donde obtener los datos
				dataType: 'json', //tipo de datos retornados
				type: 'post' //enviar variables como post
			}).done(function (data) {
				
				let json_string = JSON.stringify(data);
				let RespuestasVerbos = $.parseJSON(json_string);
				 $.ajax({
					data: parametros, //ajuntamos los parametros con los datos
					url: "ajax/pedir_todos_verbos.php", //url de donde obtener los datos
					dataType: 'json', //tipo de datos retornados
					type: 'post' //enviar variables como post
				}).done(function (data) {
					
					let json_string = JSON.stringify(data);
					let ListaVerbos = $.parseJSON(json_string);
					tipoVerbos(RespuestasVerbos, ListaVerbos)
				});
			});
		
			;
			break;
	}
  }
function cambioTipoTema(){
	resetCanvasGrupo()
	//console.log('funcion de temas')
	let parametros = {
		'buscar_id': idgrupoglobal
	};
	$.ajax({
		data: parametros, //ajuntamos los parametros con los datos
		url: "ajax/pedir_info_grupo.php", //url de donde obtener los datos
		dataType: 'json', //tipo de datos retornados
		type: 'post' //enviar variables como post
	}).done(function (data) {
		
		let json_string = JSON.stringify(data);
		let obj = $.parseJSON(json_string);
		const respuesta = obj;
		//console.log('OBJETO RESPUESTA', respuesta)
		 
		let grupoModificarTema = respuesta;
		let valoralmomento =  document.getElementById('numerotema_grupo').value
	
		//console.log('A ENCONTRAR TEMA ', grupoModificarTema)
		//console.log('VALOR AL MOMENTO', valoralmomento)

	 	let objetoTemaEspecifico = grupoModificarTema.filter(grupo => grupo.Nombre === valoralmomento);
		//console.log('RESULTADOS TEMA ',objetoTemaEspecifico)
		let preguntas = '';
		for(let i in objetoTemaEspecifico){
			
			preguntas += objetoTemaEspecifico[i].ids_preguntas +'_';
		}
		//console.log('Cadena preguntas', preguntas);
		let separados = preguntas.split('_');
		let PreguntasUnicos = [...new Set(separados)];
		let PreguntasUnicosTexto = []

		let parametros = {
			'buscar_id': valoralmomento
		};	
		$.ajax({
			data: parametros, //ajuntamos los parametros con los datos
			url: "ajax/pedir_todas_preguntas_cadena.php", //url de donde obtener los datos
			dataType: 'json', //tipo de datos retornados
			type: 'post' //enviar variables como post
		}).done(function (data) {
			let json_string = JSON.stringify(data);
			preguntasglobaltema = $.parseJSON(json_string);
			//console.log('Preguntas globales grupo',preguntasglobaltema);
			for(let i in PreguntasUnicos){
				
				PreguntasUnicos[i] = Number(PreguntasUnicos[i])
			
			}
		
			PreguntasUnicos.sort((a, b) => a> b ? 1 : -1)
			PreguntasUnicos.shift();
			preguntastemporal=[];
			 for(let i in PreguntasUnicos){
			 	indicepregunta = preguntasglobaltema.findIndex(x => Number(x.ID_po) === PreguntasUnicos[i]);	
			 	//console.log('indice que le corresponde ', indicepregunta, 'numpregunta', PreguntasUnicos[i])
				if(Number(preguntasglobaltema[indicepregunta].Habilitado)===1){
			 		preguntastemporal.push(Number(PreguntasUnicos[i]))
				}
			 }
			 //console.log('iNDICES PREGUNTAS LIMPIOS',preguntastemporal)
			 PreguntasUnicos=preguntastemporal;
			for(let i in PreguntasUnicos){
				PreguntasUnicosTexto.push(`Pregunta ${PreguntasUnicos[i]}`);
			}
			//console.log('PREGUNTAS UNICOS', PreguntasUnicos);
		//----------------------------------
			arregloVacio = [];
			for(let i in PreguntasUnicos){
				arregloVacio.push(0);
			}
	
			let colores = ['rgba(38, 254, 203, 0.8)','rgba(45, 76, 38, 0.8)','rgba(247, 106, 48, 0.8)','rgba(186, 238, 105, 0.8)','rgba(238, 41, 68, 0.8)'];
			//console.log(arregloVacio);
			datasets = [{
				type: 'bar',
				label: 'Alumno',
				id: 0,
				data: arregloVacio
			}]
			
			let idsincludos = [];
			for ( let i in objetoTemaEspecifico ){
			
			if(!idsincludos.includes(objetoTemaEspecifico[i].ID_alumno)){
				objeto = new Object;
				objeto.type = 'bar';
				objeto.label = `Alumno ${objetoTemaEspecifico[i].NombreAlumno}`;
				objeto.id = objetoTemaEspecifico[i].ID_alumno;
				objeto.data = [...arregloVacio];
				objeto.backgroundColor = colores[objetoTemaEspecifico[i].ID_alumno-1];
				
				datasets.push(objeto);
				idsincludos.push(objetoTemaEspecifico[i].ID_alumno);
				
			}
	
		}
		//console.log('DATASETS TEMA', datasets)
	
		for(let i in objetoTemaEspecifico){
			idspreguntas = objetoTemaEspecifico[i].ids_preguntas.split('_');
			idsrespuestas = objetoTemaEspecifico[i].Num_errores.split('_');
			
			for(let j in idspreguntas){
				let indice = datasets.findIndex( x => x.id === objetoTemaEspecifico[i].ID_alumno );
				let indicedata = PreguntasUnicos.findIndex(x=> x === Number(idspreguntas[j]));
				
				datasets[indice].data[indicedata] += Number(idsrespuestas[j])
			}
		}
		datasets.shift();
		//console.log('DATASETS TEMAS INFORMACION', datasets)
		
		pintarGraficaGrupo(datasets,`Graficas del tema ${valoralmomento}`,PreguntasUnicosTexto)
			}
		)
       

	
		})
}

function tipoTemas(grupo){
	resetCanvasGrupo()
	let grupoModificar = grupo;
	let temas = [];
	let id_temas=[];
	for(let i in grupoModificar){
		temas = temas.concat(grupoModificar[i].Nombre)
	}
	let TemasUnicos = [...new Set(temas)];
	//console.log('TEMAS', TemasUnicos)
	temasglobal=TemasUnicos;
	anadirTemas(TemasUnicos);
	let unavez=0;
	for(let i=0;i<TemasUnicos.length;i++){
		unavez=0;
		for( let j in grupoModificar){
			 if(grupoModificar[j].Nombre==TemasUnicos[i] && unavez==0){
				 id_temas.push(grupoModificar[j].ID_tema);
				 unavez=1;
			 }
		}
	}
	//console.log("ID DE LOS TEMAAAAAAAAAAAAAAAAAAAAAS");
	//console.log(id_temas);
	let arregloVacio = new Array();
//	arregloVacio = [];
    //console.log("longitud");
	//console.log(TemasUnicos.length);
	for(let i=0;i<TemasUnicos.length;i++){
		arregloVacio.push(0);
	}
	const arregloVacio3=arregloVacio;
	//console.log("arregloVacio3");
	//console.log(arregloVacio3);
	//let arregloVacio2=arregloVacio;
	let colores = ['rgba(38, 254, 203, 0.8)','rgba(45, 76, 38, 0.8)','rgba(247, 106, 48, 0.8)','rgba(186, 238, 105, 0.8)','rgba(238, 41, 68, 0.8)'];
	//console.log('Cuantos ceros hay',arregloVacio);
	let datasets = [{
		type: 'bar',
		label: 'Alumno',
		id: 0,
		data: arregloVacio
	}];
	let idsincludos = [];
	//console.log('arreglovacio luego de creacion datasets', arregloVacio)
	if(banderadeentrada===0){
		for( let i in grupoModificar){
			let respuestas = grupoModificar[i].Num_errores;
			//console.log('respuestas',respuestas)
			let respuestasArreglo = respuestas.split('_');
			////console.log( respuestasArreglo,'CONTADOR i: ', i);
			let acumulador = 0;
			 for ( let j in respuestasArreglo ) {
				 acumulador = acumulador + Number(respuestasArreglo[j]);
			 }
			 ////console.log('SUMA RESPUESTAS: ', acumulador, 'TEMA Y ALUMNO', grupoModificar[i].Nombre, grupoModificar[i].ID_alumno);
			grupoModificar[i].Num_errores = acumulador;
		}
	}
	banderadeentrada=1;
	//console.log('GRUPOMODIFICAR SUMADO', grupoModificar)
	
    //console.log("arregloVacio3");
	//console.log(arregloVacio3);
	for ( let i in grupoModificar ){
		////console.log('ID ALUMNO ACTUAL ', grupoModificar[i].ID_alumno)
		if(!idsincludos.includes(grupoModificar[i].ID_alumno)){
			let objeto = new Object;
			objeto.type = 'bar';
			objeto.label = `Alumno ${grupoModificar[i].NombreAlumno}`;
			objeto.id = grupoModificar[i].ID_alumno;
			objeto.data = [...arregloVacio3];
			objeto.backgroundColor = colores[grupoModificar[i].ID_alumno-1];
			//let indice = grupoModificar[i].ID_tema -1;
			datasets.push(objeto);
			idsincludos.push(grupoModificar[i].ID_alumno);
			////console.log('ID INCLUIDOS ',idsincludos)	
		}

	}
	////console.log('aaaaaaaaaa')
	//console.log('OBJETO DATASET tecnicamente vacio v', datasets);

	for( let i in grupoModificar ){
		let indice = datasets.findIndex( x => x.id === grupoModificar[i].ID_alumno );
		let indicedata=0;
		for(let kk=0;kk<id_temas.length;kk++){
			if(grupoModificar[i].ID_tema==id_temas[kk]){
				indicedata=kk;
			}
		}
	//	let indicedata = grupoModificar[i].ID_tema;
		////console.log('INDICE DATASET: ', indice);
		////console.log('INDICE DENTO DE DATASET DATA: ', indicedata);
		////console.log('DATO A INSERTAR: ', grupoModificar[i].Num_errores);
		datasets[indice].data[indicedata] += grupoModificar[i].Num_errores;
		////console.log('DATASET EN PASOS: ', i, 'Datasets:', datasets)
	}
	datasets.shift();
	//console.log('OBJETO DATASET CON INFORMACION kk', datasets);
	pintarGraficaGrupo(datasets,'Grafica por temas',TemasUnicos)
	
  }
function tipoVerbos(respuestaVerbos, listaVerbos){
	resetCanvasGrupo()
	let respuestaVerbosG = respuestaVerbos;
	let listaVerbosG = listaVerbos;
	let verbos = '';
	//console.log('RESPUESTA VERBOS GRUPO', respuestaVerbosG)
	//console.log('LISTA DE VERBOS', listaVerbosG)
	
	for(let i in respuestaVerbosG){
		////console.log('Cadena de ids', respuestaVerbosG[i].ids_verbos)
		verbos += respuestaVerbosG[i].ids_verbos +'_';
	}
	//console.log('Cadena verbos', verbos);
	let separados = verbos.split('_');
	let VerbosUnicos = [...new Set(separados)];

	for(let i in VerbosUnicos){
		VerbosUnicos[i] = Number(VerbosUnicos[i])
	}
	//VerbosUnicos.shift();
	
	VerbosUnicos.sort((a, b) => a> b ? 1 : -1)
	VerbosUnicos.shift();
	//console.log('VERBOS UNICOS', VerbosUnicos);

	// aca ya tengo la lista de id de los verbos que aparecen falta revisar si estan habilitados o no
	unicosTemporal = [];
	for(let i in VerbosUnicos){
		if(Number(listaVerbosG[VerbosUnicos[i]-1].Habilitado)===1){
			unicosTemporal.push(VerbosUnicos[i]);
		}
	}
	//console.log('VERBOS UNICOS TEMPORAL ', unicosTemporal)
	VerbosUnicos= [];
	VerbosUnicos =unicosTemporal
	//console.log('VERBOS UNICOS LIMPIO', VerbosUnicos);
	//---------------------------------------------------------------------------------
	let VerbosUnicosTexto = [];
	for(let i in VerbosUnicos){
		VerbosUnicosTexto.push(listaVerbosG[VerbosUnicos[i]-1].Espanol);
	}
	//console.log('VERBOS UNICOS EN TEXTO',VerbosUnicosTexto );
	arregloVacio = [];
	for(let i in VerbosUnicosTexto){
		arregloVacio.push(0);
	}

	let colores = ['rgba(38, 254, 203, 0.8)','rgba(45, 76, 38, 0.8)','rgba(247, 106, 48, 0.8)','rgba(186, 238, 105, 0.8)','rgba(238, 41, 68, 0.8)'];
	//console.log(arregloVacio);
	datasets = [{
		type: 'line',
		label: 'Alumno',
		id: 0,
		data: arregloVacio
	}]

	let idsincludos = [];
	for ( let i in respuestaVerbosG ){
		////console.log('ID ALUMNO ACTUAL ', grupoModificar[i].ID_alumno)
		if(!idsincludos.includes(respuestaVerbosG[i].ID_alumno)){
			objeto = new Object;
			objeto.type = 'bar';
			objeto.label = `Alumno ${respuestaVerbosG[i].NombreAlumno}`;
			objeto.id = respuestaVerbosG[i].ID_alumno;
			objeto.data = [...arregloVacio];
			objeto.backgroundColor = colores[respuestaVerbosG[i].ID_alumno-1];
			//let indice = grupoModificar[i].ID_tema -1;
			datasets.push(objeto);
			idsincludos.push(respuestaVerbosG[i].ID_alumno);
			////console.log('ID INCLUIDOS ',idsincludos)	
		}

	}
	//console.log('DATASETS VERBOS', datasets)

	for(let i in respuestaVerbosG){
		idspreguntas = respuestaVerbosG[i].ids_verbos.split('_');
		idsrespuestas = respuestaVerbosG[i].Num_errores.split('_');
		////console.log('VERBOS',idspreguntas)
		////console.log('RESPUESTAS',idsrespuestas)
		for(let j in idspreguntas){
			let indice = datasets.findIndex( x => x.id === respuestaVerbosG[i].ID_alumno );
			let indicedata = VerbosUnicos.findIndex(x=> x === Number(idspreguntas[j]));
			// //console.log('INDICE DATASET: ', indice);
			// //console.log('INDICE DENTO DE DATASET DATA: ', indicedata);
			// //console.log('DATO A INSERTAR: ', Number(idsrespuestas[j]));
			datasets[indice].data[indicedata] += Number(idsrespuestas[j])
		}
	}
	datasets.shift();
	//console.log('DATASETS VERBOS INFORMACION', datasets)
	
	pintarGraficaGrupo(datasets,'Graficas por Verbos',VerbosUnicosTexto)
  }

function anadirTemas(temas){
	let temasanadir=temas;
	let numerotema = document.getElementById("numerotema_grupo");
	numerotema.innerHTML='';
	numerotema.innerHTML +=`<option value="0" selected>Selecciona un tema</option>`
	for(let i in temasanadir){
		numerotema.innerHTML +=`<option value="${temasanadir[i]}">${temasanadir[i]}</option>`
	}
}
function pintarGraficaGrupo (informacion,tiutlo,TemasUnicos) {
	titulo= tiutlo;
	resetCanvas();

	let ctx = document.getElementById('myChartGrupo').getContext('2d');
	let myChart = new Chart(ctx, {
		type: tipo,
		data: {
			labels: TemasUnicos,
			datasets: informacion
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
	////console.log(myChart);   
	
  }
function resetCanvasGrupo(){
	$("canvas#myChartGrupo").remove();
	$("div#chart-container_grupo").append('<canvas id="myChartGrupo"  style="position: relative; width:1920px; height:600px !important;"></canvas>');
  }
function resetSelectorGrupo(selector){
    selector.selectedIndex = 0;
  }