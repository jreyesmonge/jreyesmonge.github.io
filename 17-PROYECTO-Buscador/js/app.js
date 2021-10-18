//Vatiables
const year = document.querySelector('#year');
const marca = document.querySelector('#marca');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

//Contenedor para los resultados
const resultado = document.querySelector('#resultado');



const max = new Date().getFullYear();
const min = max - 10;

//Generar un objeto con la busqueda
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: ''
} 
//Eventos
document.addEventListener('DOMContentLoaded', ()=>{
    mostrarAutos(autos);//Muestra los automoviles al cargar la pagina

    //Llena las opciones de año
    llenarSelect();
});

//Event listener para los select de busqueda
marca.addEventListener('change', e =>{
    datosBusqueda.marca = e.target.value;
    filtrarAuto();
});
year.addEventListener('change', e =>{
    datosBusqueda.year = parseInt(e.target.value);
    filtrarAuto();
})
minimo.addEventListener('change', e =>{
    datosBusqueda.minimo = parseFloat(e.target.value);
    filtrarAuto();
})
maximo.addEventListener('change', e =>{
    datosBusqueda.maximo = e.target.value;
    filtrarAuto();
})
puertas.addEventListener('change', e =>{
    datosBusqueda.puertas = parseInt(e.target.value);
    filtrarAuto();
})
transmision.addEventListener('change', e =>{
    datosBusqueda.transmision = e.target.value;
    filtrarAuto();
})
color.addEventListener('change', e =>{
    datosBusqueda.color = e.target.value;
    filtrarAuto();
})


//Funciones
function mostrarAutos(autos){
    //Elimina el html previo
    limpiarHTML();
    //Recorre el arreglo autos del archivo db.js
    autos.forEach(auto =>{
        //destructuring de auto
        const {marca,modelo,year,puertas,transmision,precio,color} = auto;
        //se crea un parrafo
        const autoHTML = document.createElement('p');
        //devuelve el contenidos de un texto de un nodo
        autoHTML.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} puertas - transmision: ${transmision} - Precio: ${precio} - Color: ${color}
            

        `;

        //Insertar en el html
        resultado.appendChild(autoHTML);
    })
}



//limpiar HTML
function limpiarHTML(){
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }
}

function llenarSelect(){
    
    for (let i = max; i >= min; i--) {
        const opciones = document.createElement('option');
        opciones.value = i;//Agregandole un valor
        opciones.textContent = i;//Agregandole un texto al option
        year.appendChild(opciones);//añadiendo las opciones al padre select
        
    }
}

//Funcion que filtra en base a la busqueda
function filtrarAuto(){
    //Funcion de alto nivel ya que contiene otra funcion
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(
        filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);

    if(resultado.length){
        mostrarAutos(resultado);
    }
    else{
        noResultado();
    }
}

function filtrarMarca(auto){
    const {marca} = datosBusqueda
    if( marca ){
        return auto.marca === marca;
    }
    return auto
}

function filtrarYear(auto){
    const {year} = datosBusqueda
    if( year ){
        return auto.year === year;
    }
    return auto
}

function filtrarMinimo(auto){
    const {minimo} = datosBusqueda
    if( minimo ){
        return auto.precio >= minimo;
    }
    return auto
}

function filtrarMaximo(auto){
    const {maximo} = datosBusqueda
    if( maximo ){
        return auto.precio <= maximo;
    }
    return auto
}

function filtrarPuertas(auto){
    const {puertas} = datosBusqueda
    if( puertas ){
        return auto.puertas === puertas;
    }
    return auto
}

function filtrarTransmision(auto){
    const {transmision} = datosBusqueda
    if( transmision ){
        return auto.transmision === transmision;
    }
    return auto
}

function filtrarColor(auto){
    const {color} = datosBusqueda
    if( color ){
        return auto.color === color;
    }
    return auto
}

function noResultado(){
    limpiarHTML();
    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta','error');
    noResultado.textContent = 'No hay resultados, Intenta con otros terminos de busqueda';
    resultado.appendChild(noResultado);
}