//Variables
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');

//Eventos
eventListeners();
function eventListeners(){
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);

    formulario.addEventListener('submit',agregarGasto);
}

//Clases
class Presupuesto {
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }

    nuevoGasto(gasto){
        //Agregar un gasto al arreglo gastos por medio de spread operator
        this.gastos = [...this.gastos, gasto];
        this.calcularRestante();

    }

    calcularRestante() {
        const gastado = this.gastos.reduce( (total, gasto) => total + gasto.cantidad, 0);
        this.restante = this.presupuesto - gastado;

        console.log(this.restante);
    }

    eliminarGasto(id){
        this.gastos = this.gastos.filter( gasto => gasto.id !== id);
        this.calcularRestante();
    }
    
}

class UI{
    //Metodo
    insertarPresupuesto(cantidad){
        //Extrayendo los valores
        const {presupuesto,restante} = cantidad;

        //Agregar al html
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;
    }

    imprimirAlerta(mensaje, tipo) {
        //Crear el div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');

        //Validar que tipo de error es
        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success')
        }

        //Agregar mensaje de error
        divMensaje.textContent = mensaje;

        //Insertar en el html
        document.querySelector('.primario').insertBefore(divMensaje, formulario);

        //Quitar el html
        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }

    mostrarGasto(gastos){
        //Iterar sobre los gastos
        this.limpiarHTML();//Elimina el html previo
        gastos.forEach( gasto => {
            const { cantidad, nombre, id} = gasto;
            
            //Crear un LI
            const nuevoGasto = document.createElement('li');
            nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
            nuevoGasto.dataset.id = id;
            console.log(nuevoGasto);
            //Agergar el HTML del gasto
            nuevoGasto.innerHTML = `${nombre} <span class="badge badge-primary badge-pill"> $ ${cantidad}</span>


            `
            //Boton para borrar el gasto
            const btnBorrar = document.createElement('button');
            //Se agrega una clase y un diseño gracias boostrap
            btnBorrar.classList.add('btn','btn-danger','borrar-gasto');
            //Se agrega al nuevo gasto el boton
            nuevoGasto.appendChild(btnBorrar);
            //Se agrega el texto de borrar al boton con una entidad que sirve para que aparezca una X
            btnBorrar.innerHTML = 'Borrar &times;'
            btnBorrar.onclick = () => {
                eliminarGasto(id);
            }
            //Agregar el html
            gastoListado.appendChild(nuevoGasto);
        });
    }

    limpiarHTML(){
        //Si gastoListado tiene algo entonces...
        while( gastoListado.firstChild){
            gastoListado.removeChild(gastoListado.firstChild)
        }
    }

    actualizarRestante(restante){
        document.querySelector('#restante').textContent = restante;
    }

    comprobarPresupuesto(presupuestObj){
        const { presupuesto, restante } = presupuestObj;
        const restanteDiv = document.querySelector('.restante');

        //Comprobar 25%
        if((presupuesto / 4) > restante){
            //Quita el estilo de la clase success
            restanteDiv.classList.remove('alert-success','alert-warning');
            restanteDiv.classList.add('alert-danger');
        }else if((presupuesto / 2) > restante){
            restanteDiv.classList.remove('alert-success');
            restanteDiv.classList.add('alert-warning');
        }else{
            restanteDiv.classList.remove('alert-danger','alert-warning');
            restanteDiv.classList.add('alert-success');
        }


        //Si el total es menor a 0
        if(restante <= 0){
            ui.imprimirAlerta("El presupuesto se ha agotado","error");
            formulario.querySelector('button[type="submit"]').disabled = true;
        }
    }
    
}

//Instanciar
const ui = new UI();

let presupuesto;


//Funciones
function preguntarPresupuesto(){
    const presupuestoUsuario = prompt('Cual es tu presupuesto?');

    //Validar lo quue se ingrese en el prompt
    if(presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0){
        //Recarga la ventana actual
        window.location.reload();
    }

    //Presupuesto valido
    presupuesto = new Presupuesto(presupuestoUsuario);
    

    ui.insertarPresupuesto(presupuesto)
}

//Agregar gastos
function agregarGasto(e){
    e.preventDefault();


    //Leer los datos del formulario
    const nombre = document.querySelector('#gasto').value;
    //Convierte el valor en un numero utilizando Number
    const cantidad = Number(document.querySelector('#cantidad').value);

    //Validar

    if(nombre === '' || cantidad === '' ){
        ui.imprimirAlerta('Ambos campos son obligatorios','error');

        return;
    }else if(cantidad <= 0 || isNaN(cantidad)){
        ui.imprimirAlerta('Cantidad no valida','error')

        return;
    }

    console.log('Agregando gasto');

    //Generar un objeto con el gasto
    //Esto es lo contrareo de un destructuring ya que el destructuring extra el valor de un objeto, este une y crea
    //objeto
    //se le llama object literal hans
    const gasto = { nombre, cantidad, id: Date.now()};

    //Añade un nuevo gasto
    presupuesto.nuevoGasto( gasto );
    
    //Mensaje de todo bien
    ui.imprimirAlerta('Gasto agregado correctamente');

    //Imprimir los gastos
    const { gastos, restante } = presupuesto;
    ui.mostrarGasto(gastos);

    ui.actualizarRestante(restante);

    ui.comprobarPresupuesto(presupuesto);

    //reinicio de formulario
    formulario.reset();

}

function eliminarGasto(id){
    presupuesto.eliminarGasto(id);
    const { gastos, restante } = presupuesto;
    ui.mostrarGasto(gastos)

    ui.actualizarRestante(restante);
    ui.comprobarPresupuesto(presupuesto);
}