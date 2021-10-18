<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
    <title>Document</title>
    <style>
        div { 
            margin : 5 px ;
            float: left;
            padding-left: 10px;
            padding-right: 10px;
            text-align: center;
            color:steelblue;
        }
        #links{
            white-space: pre;
            padding:  5px;
            margin: 5 px;
        }
        #botones{
            white-space: pre;
            padding:  5px;
            margin: 5 px;
        }
    </style>
    <script>
       
        
        
        function ejemplo1(){
            document.getElementById("cFuente").value="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
        }
        function ejemplo2(){
            document.getElementById("cFuente").value='public class Test { static void main(String[] args){ 	System.out.println("Hello World"); } }';
        }
        
        
        function descargarFuente(){
            var guardarText = document.getElementById("cFuente").value;
            var descargaTextFile = document.createElement("a");
            
            descargaTextFile.setAttribute("href","data:text/plain;charset=utf8,"+encodeURIComponent(guardarText));
            descargaTextFile.setAttribute("download","codigoFuente.txt");
            descargaTextFile.style.display="none";
            document.body.appendChild(descargaTextFile);
            descargaTextFile.click();
            document.body.removeChild(descargaTextFile);
        }
        function abrirArchivo(evento){
                
                let archivo = evento.target.files[0];

                if(archivo){
                    let reader = new FileReader();

                    reader.onload = function(e){
                        
                        let contenido = e.target.result;

                        document.getElementById('cFuente').value = contenido+"\n";
                    }
                    reader.readAsText(archivo);
                } else{
                    document.getElementById('mensajes').innerText = 'no se ha seleccionado un archivo.';
                } 
            }
            window.addEventListener('load', () =>{
                document.getElementById('archivoTexto').addEventListener('change',abrirArchivo);
            });
       

    </script>
</head>

<body>
    <h1 > Jesus Reyes Analizador</h1>
    <form action="" method="post"> 
    <div id="codigoFuente">
        Codigo Fuente<br>
        <textarea style="resize: none;" name="textoriginal" id="cFuente" cols="40" rows="20"></textarea><br>
        <br>
        <button type="button" class="btn btn-success" onclick="descargarFuente()">
            <span class = "glyphicon glyphicon-download-alt"> Descargar codigo fuente</span>
        </button><br>
        <br>
        <input type="file" id="archivoTexto" class="btn btn-success">
        <p id="mensajes"></p>
            
    </div>
    
    </form>

    <div id="links">
        <a href="ejemplo1.txt" download>Ejemplo 1: c++</a>
        <a href="ejemplo2.txt" download>Ejemplo 2: c#</a>
        <a href="ejemplo3.txt" download>Ejemplo 3: ensamblador</a>
    </div>

    <div id="botones">
        <button type="button" class="btn btn-primary" value="Ejemplo 1" onclick="ejemplo1()">Ejemplo 1</button><br>
        <button type="button" class="btn btn-primary" value="Ejemplo 2" onclick="ejemplo2()">Ejemplo 2</button>
    </div>
    
    
</body>
</html>