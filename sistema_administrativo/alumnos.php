<?php
session_start();
if (empty($_SESSION['nombre'])) {
    header("location:index.php");
}
include './inc/functions.php';
?>
<html>

<head>
    <link rel="stylesheet" href="./css/styles.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>

</head>

<body>
    <?php
    menu();
    ?>
    <br>
    <?php
        $servername = "localhost";
        $username = "id15403956_sistemaadmin";
        $password = "FmBNu+34sgf1D_(U";
        $dbname = "id15403956_sistemaadministrativo";
    
    
        /* Attempt MySQL server connection. Assuming you are running MySQL
    server with default setting (user 'root' with no password) */
        $conn = new mysqli($servername, $username, $password, $dbname);
    
        if ($conn->connect_error) die("Connection failed: " . $conn->connect_error);
    
    
        $result = $conn->query("SELECT * FROM usuarios");
    ?>
    <div class="row table-responsive" style="overflow: scroll; height: 500px; width: 100%; margin-left: 5px;">
        <table class="table">
            <thead class="thead-dark">
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Apellido1</th>
                    <th>apellido2</th>
                    <th>Correo</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                <?php while ($row = $result->fetch_array(MYSQLI_ASSOC)) { ?>
                    <tr>
                        <td><?php echo $row['id']; ?></td>
                        <td><?php echo $row['nombre']; ?></td>
                        <td><?php echo $row['apellido1']; ?></td>
                        <td><?php echo $row['apellido2']; ?></td>
                        <td><?php echo $row['correo']; ?></td>
                        
                        <td><a href="modificar.php?id=<?php echo $row['id']; ?>"><span class="glyphicon glyphicon-pencil"></span></a></td>
                        <td><a href="#" data-href="eliminar.php?id=<?php echo $row['id']; ?>" data-toggle="modal" data-target="#confirm-delete"><span class="glyphicon glyphicon-trash"></span></a></td>
                    </tr>
                <?php } 
                $conn->close()?>
            </tbody>
        </table>
    </div>
    <div class="modal fade" id="confirm-delete" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title" id="myModalLabel">Eliminar Registro</h4>
					</div>
					
					<div class="modal-body">
						¿Desea eliminar este registro?
					</div>
					
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
						<a class="btn btn-danger btn-ok">Delete</a>
					</div>
				</div>
			</div>
	</div>
    <script>
			$('#confirm-delete').on('show.bs.modal', function(e) {
				$(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));
				
				$('.debug-url').html('Delete URL: <strong>' + $(this).find('.btn-ok').attr('href') + '</strong>');
			});
	</script>

    
    <br>
    <div class="contenedor" style="border-radius: 10px;">
        <h2>Agregar Alumno</h2>
        <form class="formulario" action="insertar.php" method="POST">

            <label for="apellidopat">Apellido Paterno:</label><br>
            <input type="text" id="apellidopat" name="apellidopat" class="form-control" style="">

            <label for="apellidomat">Apellido Materno:</label><br>
            <input type="text" id="apellidomat" name="apellidomat" class="form-control">

            <label for="nom">Nombre:</label><br>
            <input type="text" id="nom" name="nom" class="form-control">

            <label for="mail">Correo</label><br>
            <input type="email" id="mail" name="mail" class="form-control">

            <label for="nacimiento">Fecha de Nacimiento:</label>
            <input type="date" id="nacimiento" name="nacimiento" class="form-control">

            <label for="contra">Contraseña</label><br>
            <input type="password" id="contra" name="contra" class="form-control"><br>

            <input type="submit" value="Enviar" class="btn btn-primary">

        </form>
    </div>
    <br>

</body>

</html>