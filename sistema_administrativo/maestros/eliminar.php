<?php
	
    $servername = "localhost";
    $username = "id15403956_sistemaadmin";
    $password = "FmBNu+34sgf1D_(U";
    $dbname = "id15403956_sistemaadministrativo";


    /* Attempt MySQL server connection. Assuming you are running MySQL
server with default setting (user 'root' with no password) */
    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) die("Connection failed: " . $conn->connect_error);
 
	$id = $_GET['id'];
	
	$sql = "DELETE FROM maestros WHERE id = '$id'";
	$resultado = $conn->query($sql);
	
?>
 
<html lang="es">
	<head>
		
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link href="css/bootstrap.min.css" rel="stylesheet">
		<link href="css/bootstrap-theme.css" rel="stylesheet">
		<script src="js/jquery-3.1.1.min.js"></script>
		<script src="js/bootstrap.min.js"></script>	
	</head>
	
	<body>
		<div class="container">
			<div class="row">
				<div class="row" style="text-align:center">
				<?php if($resultado) { ?>
				<h3>REGISTRO ELIMINADO</h3>
				<?php } else { ?>
				<h3>ERROR AL ELIMINAR</h3>
				<?php } ?>
				
				<a href="../maestros.php" class="btn btn-primary">Regresar</a>
				
				</div>
			</div>
		</div>
	</body>
</html>