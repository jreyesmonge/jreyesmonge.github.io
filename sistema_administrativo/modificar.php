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

$sql = "SELECT * FROM usuarios WHERE id = '$id'";
$resultado = $conn->query($sql);
$row = $resultado->fetch_array(MYSQLI_ASSOC);

?>
<html lang="es">

<head>

    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
</head>

<body>
    <div class="container">
        <div class="row">
            <h3 style="text-align:center">MODIFICAR REGISTRO</h3>
        </div>

        <form class="form-horizontal" method="POST" action="update.php" autocomplete="off">
            <div class="form-group">
                <label for="nombre" class="col-sm-2 control-label">Nombre</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="nombre" name="nombre" placeholder="Nombre" value="<?php echo $row['nombre']; ?>" required>
                </div>
            </div>

            <input type="hidden" id="id" name="id" value="<?php echo $row['id']; ?>" />

            <div class="form-group">
                <label for="apellido1" class="col-sm-2 control-label">Apellido1</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="apellido1" name="apellido1" placeholder="Apellido Paterno" value="<?php echo $row['apellido1']; ?>" required>
                </div>
            </div>

            <div class="form-group">
                <label for="apellido2" class="col-sm-2 control-label">Apellido2</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="apellido2" name="apellido2" placeholder="Apellido Materno" value="<?php echo $row['apellido2']; ?>" required>
                </div>
            </div>

            <div class="form-group">
                <label for="correo" class="col-sm-2 control-label">Correo</label>
                <div class="col-sm-10">
                    <input type="email" class="form-control" id="correo" name="correo" placeholder="Correo" value="<?php echo $row['correo']; ?>">
                </div>
            </div>


            <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10">
                    <a href="alumnos.php" class="btn btn-default">Regresar</a>
                    <button type="submit" class="btn btn-primary">Guardar</button>
                </div>
            </div>
        </form>
    </div>
</body>

</html>