<?php
$servername = "localhost";
$username = "id15403956_sistemaadmin";
$password = "FmBNu+34sgf1D_(U";
$dbname = "id15403956_sistemaadministrativo";

//Recibir los valores por post
$apellido1 = $_POST['apellidopat'];
$apellido2 = $_POST['apellidomat'];
$nombre = $_POST['nom'];
$correo = $_POST['mail'];
$fecha = new DateTime($_POST['nacimiento']);
$fecha_nacimiento = $fecha->format('Y-m-d');
$pass = $_POST['contra'];
// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
      die("Connection failed: " . mysqli_connect_error());
}
 
 
$sql = "INSERT INTO usuarios (apellido1, apellido2, nombre, correo, fecha_nacimiento, pass) VALUES ('".$apellido1."','".$apellido2."','".$nombre."','".$correo."','".$fecha_nacimiento."','".$pass."')";
if (mysqli_query($conn, $sql)) {
    header('location:alumnos.php');
} else {
      header('location:menu.php');
}
mysqli_close($conn);
