const hbs = require('handlebars')

const template = hbs.compile(`
<!DOCTYPE html>
<html>
	<head>
		<title></title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

		<style>
			.texto{
			    margin: 0cm 2cm ;
			    font-size: 30;
			}

			.barra-horizontal  {
				height: 90px;
				background: red url('top.png') repeat-x;

			}
			.margem {
				top: -30px;
			}
			.index {
				z-index: 100000;
			}

			.vazio {
				background: none !important;
			}


		</style>
	</head >
	<body>
 		<div class="container-fluid barra-horizontal">
 			<div class="row">
				<div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
				
				</div>
				<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 index">
					<h1> <img src="logo.png" class="img-responsive" /></h1>
				</div>

			</div>
 		</div>
		
		<div class="container-fluid">
			
			<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 margem">
				<div class="vazio">
				  <h3>Bem vindo ao time, {name}</h3>
				  <p>Seu cadastro foi concluido.<br>
				   Estamos anciosos para dar mais<br>
				   velocidade ao seu dia.</p>
				  <p>Equipe OnePetNow.</p>
				</div>
			</div>
		</div>

		<div class="container-fluid foolter barra-horizontal">
 			
 		</div> 		
	</body>
</html>`)
module.exports = template
