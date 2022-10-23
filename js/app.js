const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrtiBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners(){
    carrito.addEventListener('click', eliminarCurso);
    contenedorCarrito.addEventListener('click', agregarCurso);
    listaCursos.addEventListener('click', agregarCurso);

    vaciarCarrtiBtn.addEventListener('click', () =>{
        articulosCarrito = [];
        limpiarHTML();
    });
}

function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const idCurso = e.target.getAttribute('data-id');
        const indice = articulosCarrito.findIndex( articulo => articulo.id === idCurso );
        articulosCarrito.splice(indice,1);
        carrtitoHTML();
    }
    
}

function agregarCurso(e){
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        const infoCurso = leerDatosCurso(cursoSeleccionado);
        actualizarCantidad(infoCurso)
        carrtitoHTML();
    }
}

function leerDatosCurso(cursoSeleccionado){
  
    const infoCurso = {
        imagen: cursoSeleccionado.querySelector('img').src,
        titulo: cursoSeleccionado.querySelector('h4').textContent,
        precio: cursoSeleccionado.querySelector('.precio span').textContent,
        id: cursoSeleccionado.querySelector('a').getAttribute('data-id'),
        cantidad: 1

    }

    return infoCurso;
}

function carrtitoHTML(){

    limpiarHTML();

    articulosCarrito.forEach( articulo => {
        const {imagen, titulo, precio, id,cantidad} = articulo;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td> <img src = '${imagen}' width = '100'> </td>
            <td> ${titulo} </td>
            <td> ${precio} </td>
            <td> ${cantidad} </td>
            <td> <a href = '#' class = 'borrar-curso' data-id = '${id}' > X </a> </td>
        `;

        contenedorCarrito.appendChild(row);
    })
}

function limpiarHTML(){
    while(contenedorCarrito.firstChild)
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    
}

function actualizarCantidad(infoCurso){
    const indice = articulosCarrito.findIndex( articulo => articulo.id === infoCurso.id )

    if(indice != -1)
        articulosCarrito[indice].cantidad++;    
    else
        articulosCarrito = [...articulosCarrito, infoCurso];
}