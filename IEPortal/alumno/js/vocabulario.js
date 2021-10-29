function MostrarDocumentos(id_c1) {
  //console.log(id_c1);
  var x = document.getElementById("Documento");
  x.innerHTML = '';
  x.style.display = "block";
  x.innerHTML += `<iframe 
                      src='https://docs.google.com/viewer?srcid=${obj[id_c1].ruta}&pid=explorer&efh=false&a=v&chrome=false&embedded=true#view=fith' 
                     >
                  </iframe>`;

  }
document.addEventListener("DOMContentLoaded", function(event) {
//console.log("primero que se ejecuta");
$.ajax({
    url: "ajax/pedir_vocabulario.php", //url de donde obtener los datos
    type: 'post',
    dataType: 'json', //tipo de datos retornados
    success: function (data){
    //console.log("termino");
    let json_string = JSON.stringify(data);
    obj = $.parseJSON(json_string);
    let conte = document.getElementById('Nombres');
    conte.innerHTML = ``;
    for (let i in obj) {
      conte.innerHTML +=`<button type='button' id=${i} onclick="MostrarDocumentos(this.id)" class='categoria'> ${obj[i].nombre} </button>`;
		}
    },
    error: function (error) {
    //console.log(error);
    }
  });	
})