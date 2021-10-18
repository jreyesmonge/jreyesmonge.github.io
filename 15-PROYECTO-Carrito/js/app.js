const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListener();
function cargarEventListener(){
    //Cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click',agregarCurso);

    //Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso)

    //Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];
        limpiarHTML(); //Eliminar todo el html
    })
}


//Funciones
function agregarCurso(e){
    e.preventDefault();


    //selecciona en el contenedor solamente agregar carrito en lugar de seleccionar todo el div
    if( e.target.classList.contains('agregar-carrito') ){
        const cursosSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursosSeleccionado);
    }
}

//Eliminar curso del carrito
function eliminarCurso(e){
    
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        //Elimina del arreglo articulosCarrito
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);

        carritoHTML(); // Iterar sobre el carrito y mostrar su HTML
    }
}

//Lee el contenido del HTML al que le dimos click y extrae la informacion del curso
function leerDatosCurso(curso){
    //console.log(curso);

    //Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);
    if(existe){
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; //Retorna el objeto actualizado
            }
            else{
                return curso; //Retorna el objetos que no son duplicados
            }
        });
        articulosCarrito = [...cursos];
    }else{
        //Agrega elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    

    console.log(articulosCarrito);
    carritoHTML();
}

//Muestra el carrito de compras en el html
function carritoHTML(){

    //Limpiar el HTML
    limpiarHTML();

    //Recorrer el carrito y generar el html
    articulosCarrito.forEach(curso => {
        const {imagen,titulo,precio,cantidad,id}=curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td> 
            <a href="#" class="borrar-curso" data-id="${id}"></a>
            </td>
        `;

        //Agrega el html del carrito en tbody
        contenedorCarrito.appendChild(row);
    })
}

function limpiarHTML(){
    contenedorCarrito.innerHTML = '';
}