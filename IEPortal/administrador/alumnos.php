			<div class="contenedor contenedor--grande contenedor--minimo contenedor--sombra animate__animated animate__fadeIn" >
			  <div class="table-responsive p-3"">
			  <table  id="tabla_clases" class="table table-bordered table-striped table-condensed" >
			  <tr>
			  <th >Tipo de clase</th>
			  <th >Profesor</th>
			  <th>Dias asignados</th>
			  <th>Horario</th>
			  <th>---</th>
			  </tr>
			  </table>
			  </div>
			<div id="alumnos"  style="display: none;">
			<table id="tabla_alumnos" class="table table-bordered table-striped table-condensed p-3"">
			</table>
			</div>

			<div id="graficas"  style="display: none;">
				<div class="d-flex">
					<select name="select" id="tipodegrafica" class="formulario__input">
						<option value="0" selected>No ver nada</option>
  						<option value="preguntas">Preguntas</option>
  						<option value="verbos" >Verbos</option>			
					</select>
					<select name="temas" id="numerotema" style="display: none;" class="formulario__input">
						<option value="0" selected>Selecciona un Tema</option>
					</select>

					<!-- <button class="boton" id="generar">Generar Gráfica</button> -->
				</div>
			<div class="row centrado" style="overflow-x: scroll; width:95%; height:700px !important;">
				<div class="chart-container centrado" id="chart-container" style="position: relative; width:1920px; height:600px !important;">
        			<canvas id="myChart" ></canvas>
    			</div>
			</div>
				
			</div>
		</div>

        <script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns" crossorigin="anonymous"></script>
    <script src="js/chart.min.js"></script>
	<script src="js/clases_funcion.js"></script>