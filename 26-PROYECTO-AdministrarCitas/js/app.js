const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

//UI
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');

let editando;

class Citas {
  constructor(){
    this.citas = [];
  }

  agregarCita(cita){
    this.citas = [...this.citas,cita];
    console.log(this.citas);
  }

  eliminarCita(id){
    this.citas = this.citas.filter(cita => cita.id !== id );
  }

  editarCitas(citaActualizada){
    this.citas= this.citas.map( cita => cita.id === citaActualizada.id ? citaActualizada : cita )
  }
}

class UI{
  imprimirAlerta(mensaje, tipo){
    //Crear el div
    const divMensaje = document.createElement('div');
    //Agregarle clases
    divMensaje.classList.add('text-center','alert','d-block','col-12');

    //Agregar clase en base al tipo de error
    if(tipo === 'error'){
      divMensaje.classList.add('alert-danger')
    }else {
      divMensaje.classList.add('alert-success')
    }

    //Mensaje de error
    divMensaje.textContent = mensaje

    //Agregar al DOM
    document.querySelector('#contenido').insertBefore(divMensaje,document.querySelector('.agregar-cita'))

    //Quitar despues de 5 segundos
    setTimeout(() =>{
      divMensaje.remove();
    },5000)
  }

  imprimirCitas({citas}){

    this.limpiarHTML();

    citas.forEach(cita => {
      //Extraer la informacion de citaObj
      const {mascota,propietario,telefono,fecha,hora,sintomas,id} = cita;

      const divCita = document.createElement('div');
      divCita.classList.add('cita','p-3');
      divCita.dataset.id = id;

      //Scripting de los elementos de la cita
      const mascotaParrafo = document.createElement('h2');
      mascotaParrafo.classList.add('card-title','font-weight-bolder');
      mascotaParrafo.textContent = mascota;

      const propietarioParrafo = document.createElement('p');
      propietarioParrafo.innerHTML = `<span class="font-weight-bolder">Propietario: </span>${propietario}`;

      const telefonoParrafo = document.createElement('p');
      telefonoParrafo.innerHTML = `<span class="font-weight-bolder">Telefono: </span>${telefono}`;

      const fechaParrafo = document.createElement('p');
      fechaParrafo.innerHTML = `<span class="font-weight-bolder">Fecha: </span>${fecha}`;

      const horaParrafo = document.createElement('p');
      horaParrafo.innerHTML = `<span class="font-weight-bolder">Hora: </span>${hora}`;

      const sintomasParrafo = document.createElement('p');
      sintomasParrafo.innerHTML = `<span class="font-weight-bolder">Sintomas: </span>${sintomas}`;

      const idParrafo = document.createElement('p');
      idParrafo.innerHTML = `<span class="font-weight-bolder">ID: </span>${id}`;

      //Boton para eliminar Citas
      const btnEliminar = document.createElement('button');
      btnEliminar.classList.add('btn','btn-danger','mr-2');
      btnEliminar.innerHTML = 'Eliminar <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>';

      btnEliminar.onclick = () =>eliminarCita(id);

      //Añade un boton para eliminar
      const btnEditar = document.createElement('button');
      btnEditar.classList.add('btn','btn-info','mr-2');
      btnEditar.innerHTML = 'Editar <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>'
      btnEditar.onclick = () => cargarEdicion(cita);

      //Agregar los parrafos al divCita
      divCita.appendChild(mascotaParrafo);
      divCita.appendChild(propietarioParrafo);
      divCita.appendChild(telefonoParrafo);
      divCita.appendChild(fechaParrafo);
      divCita.appendChild(horaParrafo);
      divCita.appendChild(sintomasParrafo);
      divCita.appendChild(btnEliminar);
      divCita.appendChild(btnEditar);

      //Agregar las citas al HTML
      contenedorCitas.appendChild(divCita);

    });

  }

  limpiarHTML(){
    while(contenedorCitas.firstChild){
      contenedorCitas.removeChild(contenedorCitas.firstChild)
    }
  }
}

//Intanciar clases de manera global
const ui = new UI();
const administrarCitas = new Citas();

//Registrar eventos
eventListeners()
function eventListeners(){
  mascotaInput.addEventListener('input',datosCita);
  propietarioInput.addEventListener('input',datosCita);
  telefonoInput.addEventListener('input',datosCita);
  fechaInput.addEventListener('input',datosCita);
  horaInput.addEventListener('input',datosCita);
  sintomasInput.addEventListener('input',datosCita);

  formulario.addEventListener('submit', nuevaCita)
}

//Objeto con la informacion de la cita
const citaObj = {
  mascota: "",
  propietario: "",
  telefono: "",
  fecha: "",
  hora: "",
  sintomas: ""
}

//Agrega datos al objeto de citas
function datosCita(e){
  //Accediendo a las propiedades del objeto y agregandole un valor con el puntero(e)
  citaObj[e.target.name] = e.target.value;
}

//Valida y agrega una nueva cita a la clase de citas
function nuevaCita(e){
  
  e.preventDefault();

  //Extraer la informacion de citaObj
  const {mascota,propietario,telefono,fecha,hora,sintomas} = citaObj;

  //Validar
  if(mascota === "" || propietario === "" ||telefono === "" || fecha === "" || hora === "" || sintomas === ""){
    ui.imprimirAlerta('Todos los datos son obligatorios','error');
    //Para que ya no siga ejecutando la siguiente linea de codigo
    return;
  }

  if(editando){
    ui.imprimirAlerta('Editado correctamente');
  
    //Pasar el objeto de la cita a edicion
    administrarCitas.editarCitas({...citaObj})
    //Regresar el texto del boton a su estado original
    formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';

    editando = false;

  }else{
    //Agergar un id unico
    citaObj.id = Date.now();

    //SE agrega una copia del objeto citaObj
    administrarCitas.agregarCita({...citaObj});

    //Mensaje de agregado correctamente
    ui.imprimirAlerta("Se agrego correctamente");
  }

  //Reiniciar el objeto de validacion
  reiniciarObjeto();

  //Reiniciar el formulario
  formulario.reset();

  //Mostrar el HTML de las Citas
  ui.imprimirCitas(administrarCitas);
}


function reiniciarObjeto(){
  citaObj.mascota = '';
  citaObj.propietario = '';
  citaObj.telefono = '';
  citaObj.fecha = '';
  citaObj.hora = '';
  citaObj.sintomas = '';
}

function eliminarCita(id){
  //Eliminar la cita
  administrarCitas.eliminarCita(id);
  //Muestre un mensaje
  ui.imprimirAlerta('La cita se elimino correctamente');
  //Refrescar las citas
  ui.imprimirCitas(administrarCitas);
}

//Carga los datos y el modo edicion
function cargarEdicion(cita){
  const {mascota,propietario,telefono,fecha,hora,sintomas,id} = cita;

  //Llenar inputs
  mascotaInput.value = mascota;
  propietarioInput.value = propietario;
  telefonoInput.value = telefono;
  fechaInput.value = fecha;
  horaInput.value = hora;
  sintomasInput.value = sintomas;

  //Llenar el objeto
  citaObj.mascota = mascota;
  citaObj.propietario = propietario;
  citaObj.telefono = telefono;
  citaObj.fecha = fecha;
  citaObj.hora = hora;
  citaObj.sintomas = sintomas;
  citaObj.id = id;

  //Cambiar el texto del boton
  formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

  editando = true;
}
