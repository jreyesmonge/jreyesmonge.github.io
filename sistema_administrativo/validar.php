<?php
$nombre = $_POST['nombre'];
$pass = $_POST['pass'];

$servername = "localhost";
$username = "id15403956_sistemaadmin";
$password = "FmBNu+34sgf1D_(U";
$dbname = "id15403956_sistemaadministrativo";


/* Attempt MySQL server connection. Assuming you are running MySQL
server with default setting (user 'root' with no password) */
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) die("Connection failed: " . $conn->connect_error);


$sql = "SELECT id, apellido1, apellido2, nombre FROM usuarios WHERE nombre = '".$nombre."' AND pass = '".$pass."'";

$result = $conn->query($sql);


if ($result->num_rows > 0) {

    while ($row = $result->fetch_assoc()) {
        session_start();
        $_SESSION["nombre"] = $row["nombre"];
        header("location:menu.php");
    }
} else {
    header("location:index.php");
}
$conn->close();

?>