var categoriasglobales;
function MostrarNombres(id_c) {
  //console.log(id_c);
  var x = document.getElementById("Nombres");
  var y = document.getElementById("Documento");
  y.style.display = "none";
  x.innerHTML = '';
  var parametros = {
            'buscar_id': categoriasglobales[id_c].Categoria
          };
  //console.log('PARAMETROS',parametros);
  $.ajax({
    data: parametros, //ajuntamos los parametros con los datos
    url: "ajax/sacardatos.php", //url de donde obtener los datos
    dataType: 'json', //tipo de datos retornados
    type: 'post' //enviar variables como post
  }).done(function (data){
      var json_string = JSON.stringify(data);
      var obj = $.parseJSON(json_string);
      //console.log('SUBCATEGORIAS',obj)
      for (var i in obj){
          x.innerHTML += "<button type='button' id="+obj[i]['url']+" onclick=MostrarDocumentos(this.id) class='categoria categoria--subcategoria animate__animated animate__fadeIn'>"
                          +obj[i]['nombre']+
                          "</button>";
      }
    });
   }
   
 function MostrarDocumentos(id_c1) {
  //console.log(id_c1);
  var x = document.getElementById("Documento");
  x.innerHTML = '';
  x.style.display = "block";
  x.innerHTML += `<iframe 
                      src='https://docs.google.com/viewer?srcid=${id_c1}&pid=explorer&efh=false&a=v&chrome=false&embedded=true#view=fith' 
                      >
                  </iframe>`;

  }
document.addEventListener("DOMContentLoaded", function(event) {
//console.log("primero que se ejecuta");
$.ajax({
    url: "ajax/conconv.php", //url de donde obtener los datos
    type: 'post',
    dataType: 'json', //tipo de datos retornados
    success: function (data){
    //console.log("termino");
    var json_string = JSON.stringify(data);
    var obj = $.parseJSON(json_string);
    categoriasglobales=obj;
    //console.log('CATEGORIAS',categoriasglobales);
    var conte = document.getElementById('contenedor_categoria');
    conte.innerHTML = `<ul >`;
    for (let i in obj) {
      conte.innerHTML +=`<li style="list-style:none;">
                          <a id=${i} onclick="MostrarNombres(this.id)" class='categoria'> ${obj[i].Categoria} </a>`;
    }
    conte.innerHTML +=	`</ul>`;
    },
    error: function (error) {
    //console.log(error);
    }
  });	
})