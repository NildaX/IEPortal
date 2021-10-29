
    function ActualizarImagen() {
		let inputFileImage = document.getElementById("imagefile");
					  let file = inputFileImage.files[0];
					  if( (typeof file === "object") && (file !== null) )
					  {
						  $("#load_img").text('Cargando...');	
						  let data = new FormData();
						  data.append('imagefile',file);
						  $.ajax({
							  url: "ajax/imagen_ajax.php",      
							  type: "POST",             
							  data: data, 			  
							  contentType: false,       
							  cache: false,             
							  processData:false,        
							  success: function(data)   
							  {
								  $("#load_img").html(data);
								  
							  }
						  });	
					  }
		 }
	  
	  $( "#perfil" ).submit(function( event ) {
	   //console.log("submit");
	   let parametros = $(this).serialize();
		   $.ajax({
				  type: "POST",
				  url: "ajax/editar_perfil.php",
				  data: parametros,
				   beforeSend: function(objeto){
					  $("#resultados_ajax").html("Mensaje: Cargando...");
					},
				  success: function(datos){
				  $("#resultados_ajax").html(datos);
				}
		  });
		 event.preventDefault();
	  });

document.addEventListener("DOMContentLoaded", function(event) {
	//console.log("primero que se ejecuta");
	$.ajax({
		url: "ajax/llenar_perfil.php", //url de donde obtener los datos
		type: 'post',
		dataType: 'json', //tipo de datos retornados
		success: function (data){
			//console.log("termino");
			let json_string = JSON.stringify(data);
			let obj = $.parseJSON(json_string);
			let perf = document.getElementById('perfil');
			let hm=` <img class="animate__animated animate__fadeIn img-responsive contenedor__avatar centrado" src=${obj.foto} alt="Logo" style="max-width:200px;max-height:200px">`;
			$("#load_img").html(hm);
			perf.innerHTML =` 
			<label for="nombre">Nombre: </label>
			<input type="text" class="formulario__input" name="nombre" value=${obj.nombre} required>
			<label for="apellido_p">Apellido Paterno: </label>
			<input type="text" class="formulario__input" name="apellido_p" value=${obj.apellido_p} required>
			<label for="apellido_m">Apellido Materno: </label>
			<input type="text" class="formulario__input" name="apellido_m" value=${obj.apellido_m} required>
			<label for="correo">Correo: </label>
			<input type="email" class="formulario__input" name="correo" value=${obj.correo} required disabled>
			<label for="telefono">Telefono: </label>
			<input type="text" class="formulario__input" name="telefono" value="${obj.telefono}" pattern="[0-9]{9,}" title="Un numero de telefono valido consiste en 9 digitos">
			<label for="edad">Edad: </label>
			<input type="text" class="formulario__input" required name="edad" value=${obj.edad}>
			<label for="sexo">Sexo:</label>
			<input type="text" class="formulario__input" name="sexo" value=${obj.sexo} required>

			<div  id="resultados_ajax"> </div>	

			<input type="submit" class="boton" value="Actualizar">
			`;
			if (obj.tipo==="alumno"){
				//console.log("alumno");
				let espacio=document.getElementById("espacio_horarios");
				espacio.style.display = "block";
				let tabla=document.getElementById("tabla_horarios");
				let i = 0;
				(obj.arreglo_horario).forEach(function(elemento) {
					//console.log(elemento);
					let fila = tabla.insertRow();
					let celda1 = fila.insertCell();
					celda1.innerHTML = `${obj.arreglo_ids[i]}`;
                    let celda2 = fila.insertCell();
					celda2.innerHTML = `${obj.arreglo_profesores[i]}`;	
                    let celda3 = fila.insertCell();
					celda3.innerHTML = `${obj.arreglo_dias[i]}`;	
                    let celda4 = fila.insertCell();
					celda4.innerHTML = `${obj.arreglo_horario[i]}`;
                    i = i+1;					
				});
			}
			//console.log("termino llenar perfil2");
       },
	    error: function (error) {
			//console.log(error);
        }
  });	
})
