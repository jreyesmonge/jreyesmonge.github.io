<?php
$servername = "localhost";
$username = "id15403956_sistemaadmin";
$password = "$09L2ZZVq]A/W5{3";
$dbname = "id15403956_sistemaadministrativo";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT id, apellido1, nombre FROM usuarios";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
    echo "id: " . $row["id"]. " - Name: " . $row["apellido1"]. " " . $row["nombre"]. "<br>";
  }
} else {
  echo "0 results";
}
$conn->close();
?>