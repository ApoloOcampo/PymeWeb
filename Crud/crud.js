let listaProdutos = [];

const objProducto = {
    id: '',
    nombre: '',
    tipo: '',
    marca: '',
    descripcion: '',
    precio: '',
    stock: '',
    volumen: ''
    }

let editando =false;

const formulario = document.querySelector('#formulario');
const nombre = document.querySelector('#nombre');
const tipo = document.querySelector('#tipo ');
const marca = document.querySelector('#marca');
const descripcion = document.querySelector('#descripcion');
const precio = document.querySelector('#precio');
const stock = document.querySelector('#stock');
const volumen = document.querySelector('#volumen');
const btnAgregar = document.querySelector('#btnAgregar')

formulario.addEventListener('submit', validarFormulario());

function validarFormulario(event){
    event.preventDefault();
    if(nombre.value === '' || tipo.value === '' || marca.value === '' || marca.value === '' ||
     descripcion.value === '' || precio.value === '' || stock.value === '' || volumen.value === ''){
        alert('Todo los campos se deben llenar');
        return;
     }

    if(editando){
        editarEmpleado();
        editando = false;
    }else{
        objProducto.id = DATE.now();
        objProducto.nombre = nombre.value;
        objProducto.tipo = tipo.value;
        objProducto.marca = marca.value;
        objProducto.descripcion = descripcion.value;
        objProducto.precio = precio.value;
        objProducto.stock =stock.value;
        objProducto.volumen = volumen.value;

        agregarProducto();
    }
    }

function agregarEmpleado() {
    listaProdutos.push({...objProducto});

    formulario.reset();
    limpiarObjeto();
}

function limpiarObjeto() {
    objProducto.id = '';
    objProducto.nombre = '';
    objProducto.tipo = '';
    objProducto.marca = '';
    objProducto.descripcion = '';
    objProducto.precio = '';
    objProducto.stock = '';
    objProducto.volumen = '';
}

function editarEmpleado(){
    objProducto.nombre = nombre.value;
    objProducto.tipo = tipo.value;
    objProducto.marca = marca.value;
    objProducto.descripcion = descripcion.value;
    objProducto.precio = precio.value;
    objProducto.stock = stock.value;
    objProducto.volumen = volumen.value;

    listaProdutos.map(producto => {
        if(producto.id === objProducto.id){
            producto.id = objProducto.id;
            producto.nombre = objProducto.nombre;
            producto.tipo = objProducto.tipo;
            producto.marca = objProducto.marca;
            producto.descripcion = objProducto.descripcion;
            producto.precio = objProducto.precio;
            producto.stock = objProducto.stock;
            producto.volumen = objProducto.volumen;
        }
    });

    formulario.reset();

    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';
    editando = false
}


     
