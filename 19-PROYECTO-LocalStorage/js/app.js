const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

eventListener()
function eventListener() {
    //Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit',agregarTweet)

    //Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        //Intenta buscar en localStorange los tweets y los convierto a JSON.parse y si marca null se asigna un arreglo vacio
        tweets = JSON.parse(localStorage.getItem('tweets') || []);
        console.log(tweets);

        crearHTML();
    });
}


function agregarTweet(e){
    e.preventDefault();

    const tweet = document.querySelector('#tweet').value;

    if(tweet === ''){
        mostrarError('Un mensaje no puede ir vacio');
        return;
    }

    //se crea un id y se asigna la fecha como un id y un texto con el resultado del tweet
    const tweetObj = {
        id: Date.now(),
        //si el nombre de la llave y el nombre del valor es igual puede ponerse uno solamente
        tweet
    }


    // Añadir al arreglo de tweets con spread operator
    tweets = [...tweets,tweetObj];
    
    //Una vez agregado vamos a crear el html
    crearHTML();

    //Reiniciar formulario
    formulario.reset();
}

//Mostrar mensaje de error

function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    //Agregar estilos de un css por medio se la clase error
    mensajeError.classList.add('error');
    
    //Insertarlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //Sirve para elimniar el error despues de 3 segundos
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

//Muestra un listado de los tweets
function crearHTML(){
    limpiarHTML();

    if(tweets.length > 0){
        tweets.forEach(tweet => {
            //Agregar un boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerHTML = 'X'

            //Añadir la funcion de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            //Crear el html
            const li = document.createElement('li');

            //Añadir el texto
            li.innerText = tweet.tweet;

            //Asignar el boton
            li.appendChild(btnEliminar)

            //Insertarlo en el html
            listaTweets.appendChild(li);
        });
    }

    sincronizarStorange();
}
//Agregar los tweets actuales a localStorange
function sincronizarStorange(){
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

//Elimina un tweet
function borrarTweet(id){
    tweets = tweets.filter(tweet => tweet.id !== id);

    crearHTML();
}

//Limpiar el html
function limpiarHTML(){
    //Miestras haya elementos
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

