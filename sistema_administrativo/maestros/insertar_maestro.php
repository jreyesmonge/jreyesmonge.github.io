<?php
$servername = "localhost";
$username = "id15403956_sistemaadmin";
$password = "FmBNu+34sgf1D_(U";
$dbname = "id15403956_sistemaadministrativo";

//Recibir los valores por post
$apellido1 = $_POST['apellidopat'];
$apellido2 = $_POST['apellidomat'];
$nombre = $_POST['nom'];
$fecha = new DateTime($_POST['nacimiento']);
$fecha_nacimiento = $fecha->format('Y-m-d');
$correo = $_POST['mail'];
$pass = $_POST['contra'];
$materia = $_POST['materia'];
$turno = $_POST['turno'];
// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
      die("Connection failed: " . mysqli_connect_error());
}
 
 
$sql = "INSERT INTO maestros (nombre, apellido1, apellido2, fecha_nacimiento, correo, pass, materia, turno) VALUES ('".$nombre."','".$apellido1."','".$apellido2."','".$fecha_nacimiento."','".$correo."','".$pass."','".$materia."','".$turno."')";
if (mysqli_query($conn, $sql)) {
    header('location:../maestros.php');
} else {
      header('location:menu.php');
}
mysqli_close($conn);

?>