//Variables

const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners(){

    //Cuando agregas un curso presionando "Agregar al Carrito"
    listaCursos.addEventListener('click', agregarCurso);

    //Elimina curso del carrito
    carrito.addEventListener('click', eliminaCurso);

    //Vaciar el Carrito
    vaciarCarrito.addEventListener('click', () => {
        articulosCarrito = []; //reseteamos el arreglo
        limpiaHTML(); //Eliminamos todo el HTML
    });

}

//Funciones
function agregarCurso(e){
    e.preventDefault(); // evita que de momento nos vayamos hacia arriba

    if(e.target.classList.contains('agregar-carrito')){
        const CursoSeleccionado = e.target.parentElement.parentElement;//recorre 2 hacia atras y selecciona todo el CARD

        leerDatosCurso(CursoSeleccionado);
    }
}

//Eliminar curso del carrito
function eliminaCurso(e){
    if(e.target.classList.contains("borrar-curso")){
        const cursoId = e.target.getAttribute('data-id');

        //Elimina del arreglo por el data-ID
        articulosCarrito = articulosCarrito.filter(c => c.id !== cursoId);
        carritoHTML(); //Iterar sobre al carrito y mostrar su HTML

    }
}

//Lee el contendio HMTL al que le diste click(el curso) y extraemos la Informacion

function leerDatosCurso(curso){
    

    //Crear un Objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Revisa si un Elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);

    if(existe){
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; //retorna el objeto actualizado
            }else{
                return curso; // retorna objetos que no son duplicados
            }
        });

        articulosCarrito = [...cursos];

    }else{
         //Agrega Elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    console.log(articulosCarrito);
    carritoHTML();
}


//Muestra el carrito de compras en el HTML
function carritoHTML(){
    //Limpiar el HTML para evitar duplicados
    limpiaHTML();

    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso => {
        const {imagen, titulo, precio, cantidad, id} = curso;

        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src = "${imagen}" width = "100">
        </td>

        <td> ${titulo}</td>
        <td> ${precio}</td>
        <td> ${cantidad}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}"> X </a> 
        </td>
        
        `;

        //Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });
}

//Elimina los cursos del tbody
function limpiaHTML(){
    //Forma lenta
    //contenedorCarrito.innerHTML = "";

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

