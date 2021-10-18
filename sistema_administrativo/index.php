<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</head>

<body>
    <h1 style="text-align: center;">Sistema de Administrativo</h1>
    <div class="contenedor" style="border-radius: 10px;">
        <img src="img/user.png" alt="usuario" width="300" height="300">
        <form class="formulario" action="validar.php" method="POST" enctype="">

            <label for="nombre">Nombre</label>
            <input type="text" id="nombre" name="nombre" class="form-control">
            <label for="pass">Contraseña</label>
            <input type="password" id="pass" name="pass" class="form-control"><br>
            <input type="submit" id="btnEnviar" name="btnEnviar" class="btn btn-primary">
        </form>
    </div>
</body>

</html>