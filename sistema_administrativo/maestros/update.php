<?php

$servername = "localhost";
$username = "id15403956_sistemaadmin";
$password = "FmBNu+34sgf1D_(U";
$dbname = "id15403956_sistemaadministrativo";


/* Attempt MySQL server connection. Assuming you are running MySQL
server with default setting (user 'root' with no password) */
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) die("Connection failed: " . $conn->connect_error);

$id = $_POST['id'];
$nombre = $_POST['nombre'];
$apellido1 = $_POST['apellido1'];
$apellido2 = $_POST['apellido2'];
$correo = $_POST['correo'];
$materia = $_POST['materia'];
$turno = $_POST['turno'];


$sql = "UPDATE maestros SET nombre='$nombre', apellido1='$apellido1', apellido2='$apellido2', correo='$correo', materia='$materia', turno='$turno' WHERE id = '$id'";
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
                <?php if ($resultado) { ?>
                    <h3>REGISTRO MODIFICADO</h3>
                <?php } else { ?>
                    <h3>ERROR AL MODIFICAR</h3>
                <?php } ?>

                <a href="../maestros.php" class="btn btn-primary">Regresar</a>

            </div>
        </div>
    </div>
</body>

</html>