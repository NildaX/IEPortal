document.addEventListener("DOMContentLoaded", function(event) {
	//console.log("primero que se ejecuta");
	//console.log('Segundo ajaax');
	$.ajax({
		url: "../alumno/ajax/atemascompletos.php", //url de donde obtener los datos
		type: 'post',
		dataType: 'json', //tipo de datos retornados
		success: function (data){
		  //console.log("termino");
		  var json_string = JSON.stringify(data);
		  var obj = $.parseJSON(json_string);
		  //console.log(obj);
	      let completos = obj[0].temasCompletos.split('_');
		  //console.log(completos);
		  $.ajax({
			url: "../alumno/ajax/atemas.php", //url de donde obtener los datos
			type: 'post',
			dataType: 'json', //tipo de datos retornados
			success: function (data){
			  //console.log("termino");
			  var json_string = JSON.stringify(data);
			  var obj = $.parseJSON(json_string);
			  //console.log(obj);
			  var conte = document.getElementById('contenido');
			  conte.innerHTML = "";
			  for (let i in obj) {
				  //console.log("entr");
				  conte.innerHTML += ` 
				  <a href="http://www.internationalenglish.co/IEPortal/alumno/preguntas.php?id=${obj[i].idt}" class="tema animate__animated animate__fadeIn ">
				  <div class="card border-primary text-center mt-1 mb-2 mx-2" style="max-width: 300px">

					  <img class="card-img blancoynegro" src="${obj[i].imgtema}" alt="${obj[i].nombre}" id="${obj[i].idt}">
					
				  </div>
				  </a>
				  `;
				if(completos.includes(obj[i].idt)){
					//console.log('lo encontro', obj[i].idt);
					document.getElementById(obj[i].idt).classList.remove('blancoynegro')
				}
			  }

		  	
			},
			error: function (error) {
			  //console.log(error);
			}
		  });
		  
		},
		error: function (error) {
		  //console.log(error);
		}
	  });


	 
	
	 

	})