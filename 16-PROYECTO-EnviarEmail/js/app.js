//Variables
const BtnEnviar = document.querySelector('#enviar');
const formulario = document.querySelector('#enviar-mail')
const BtnReset = document.querySelector('#resetBtn');

//Variables para campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListeners();
function eventListeners(){
    //Cuando la app arranca
    document.addEventListener('DOMContentLoaded', iniciarApp);

    //Campos del formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    //Reiniciar el formulario
    BtnReset.addEventListener('click', resetearFormulario);

    //Enviar email
    formulario.addEventListener('submit', enviarEmail);
}


//Funciones
function iniciarApp(){
    BtnEnviar.disabled = true;
    BtnEnviar.classList.add('cursor-not-allowed','opacity-50');
}

function validarFormulario(e){
    //muestra que tipo de input es
    //console.log(e.target.type);

    if(e.target.value.length > 0){

        //Elimina los errores...
        const error = document.querySelector('p.error');
        if(error){
            error.remove();
        }
        

        e.target.classList.remove('border','border-red-500');
        e.target.classList.add('border','border-green-500');
    }
    else{
        //e.target.style.borderBottomColor = 'red';
        e.target.classList.remove('border','border-green-500');
        e.target.classList.add('border','border-red-500');

        mostrarError('Todos los campos son obligatorios');
    }

    if(e.target.type === 'email'){
        
        
        if(er.test(e.target.value)){
            //Elimina los errores...
            const error = document.querySelector('p.error');
            if(error){
                error.remove();
            }
            

            e.target.classList.remove('border','border-red-500');
            e.target.classList.add('border','border-green-500');
        }else{
            e.target.classList.remove('border','border-green-500');
            e.target.classList.add('border','border-red-500');

            mostrarError('El email no tiene un formato correcto');
        }
    }

    if(er.test(email.value) !== '' && asunto.value !== '' && mensaje.value !== ''){
        BtnEnviar.disabled = false;
        BtnEnviar.classList.remove('cursor-not-allowed');
    }
}

function mostrarError(mensaje){
    const mensajeError = document.createElement('p');
    //Le agrega texto al parrafo
    mensajeError.textContent = mensaje;
    //Agrega propiedades al parrafo
    mensajeError.classList.add('border','border-red-500','backgorund-red-100','text-red-500','p-3','mt-5','text-center','error');
    //se crea una variable para saber si ya existe la clase error
    const errores = document.querySelectorAll('.error');
    //Valida si hay mas de un error
    if(errores.length === 0){
        //Se agrega un mensaje de error al formulario padre //El segundo parametro sirve para saber donde ubicar el elemento se se va agregar al formulario
        //formulario.insertBefore(mensajeError, document.querySelector('.mb-10'));
        formulario.appendChild(mensajeError);
    }
}

//Envia el email
function enviarEmail(e){
    e.preventDefault();
    console.log("El email fue enviado...")

    //Mostrar el spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    //Despues de 3 segundos ocultar el spinner y mostrar el mensaje
    setTimeout(() => {
        spinner.style.display = 'none';

        //Mensaje que se envio correctamente
        const parrafo = document.createElement('p');
        parrafo.textContent = "El mensaje se envio correctamente";
        parrafo.classList.add('text-center','my-10','p-2','bg-green-500','text-white','font-bolt','uppercase')

        //Inserta el parrafo antes del spinner
        formulario.insertBefore(parrafo,spinner);

        //Eliminar el examen de exito
        setTimeout(() => {
            parrafo.remove();
        },3000);
    }, 3000);
    //Se ejecuta cada 3 segundos
    setInterval(() => {
        console.log("Ejecucion intermitente...");
    }, 3000);
    resetearFormulario();
}

function resetearFormulario(){
    formulario.reset();
    iniciarApp();
}