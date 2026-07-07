// =====================================================
// DATOS DEL PROYECTO
// Arreglo de objetos para representar información
// Posteriormente podría venir desde Flask y una BD
// =====================================================


let productos = [

    {
        nombre: "Laptop",
        categoria: "Tecnología",
        estado: "Disponible"
    },

    {
        nombre: "Celular Samsung",
        categoria: "Tecnología",
        estado: "Disponible"
    },

    {
        nombre: "Audífonos",
        categoria: "Accesorios",
        estado: "Agotado"
    }

];




// =====================================================
// MOSTRAR PRODUCTOS DINÁMICAMENTE
// Uso de estructura repetitiva
// =====================================================


function mostrarProductos(){


    const contenedor = document.getElementById("contenedorProductos");


    if(!contenedor) return;


    contenedor.innerHTML="";



    productos.forEach(producto => {



        let mensajeEstado = "";



        // Condición según estado del producto

        if(producto.estado === "Disponible"){

            mensajeEstado = 
            `<span class="badge bg-success">
            Disponible
            </span>`;

        }else{

            mensajeEstado = 
            `<span class="badge bg-danger">
            Agotado
            </span>`;

        }




        contenedor.innerHTML += `


        <div class="col-md-4 mb-4">


            <div class="card p-3 h-100">


                <h4>
                ${producto.nombre}
                </h4>


                <p>
                Categoría:
                ${producto.categoria}
                </p>


                <p>
                Estado:
                ${mensajeEstado}
                </p>


            </div>


        </div>


        `;



    });



}





// =====================================================
// REGISTRO DE NUEVOS PRODUCTOS
// =====================================================


const formularioProducto = 
document.getElementById("formularioProducto");



if(formularioProducto){



formularioProducto.addEventListener("submit", function(e){


e.preventDefault();



const nombreProducto =
document.getElementById("nombreProducto").value.trim();


const categoriaProducto =
document.getElementById("categoriaProducto").value.trim();


const estadoProducto =
document.getElementById("estadoProducto").value;



let valido=true;



if(nombreProducto.length < 3){

document.getElementById("errorNombre").textContent =
"El nombre debe tener mínimo 3 caracteres";

valido=false;

}else{

document.getElementById("errorNombre").textContent="";

}



if(categoriaProducto===""){

document.getElementById("errorCategoria").textContent =
"Debe ingresar una categoría";

valido=false;

}else{

document.getElementById("errorCategoria").textContent="";

}



if(estadoProducto===""){


document.getElementById("errorEstado").textContent =
"Seleccione un estado";


valido=false;


}else{

document.getElementById("errorEstado").textContent="";


}




if(valido){



productos.push({

nombre:nombreProducto,

categoria:categoriaProducto,

estado:estadoProducto

});



mostrarProductos();



mostrarRegistros();



formularioProducto.reset();



alert("Producto registrado correctamente");



}



});



}







// =====================================================
// MOSTRAR REGISTROS Y MENSAJES
// =====================================================


function mostrarRegistros(){


const mensaje =
document.getElementById("mensajeEstado");



if(!mensaje) return;



if(productos.length > 0){


mensaje.className="alert alert-success";


mensaje.textContent =
"Existen " + productos.length +
" registros disponibles";


}else{


mensaje.className="alert alert-warning";


mensaje.textContent =
"No existen registros";


}



}







// =====================================================
// VALIDACIÓN DEL FORMULARIO DE CONTACTO
// (Conservamos Semana 6)
// =====================================================


const form = document.getElementById("formularioContacto");


if(form){


const nombre =
document.getElementById("nombre");


const correo =
document.getElementById("correo");


const asunto =
document.getElementById("asunto");


const mensaje =
document.getElementById("mensaje");



[nombre,correo,asunto,mensaje].forEach(input=>{


input.addEventListener("input",()=>{

validar(input);

});


input.addEventListener("blur",()=>{

validar(input);

});


});



function validar(input){


let valor=input.value.trim();

let valido=true;



if(valor==="")
valido=false;



if(input===nombre && valor.length<3)
valido=false;



if(input===correo && !valor.includes("@"))
valido=false;



if(input===asunto && valor.length<3)
valido=false;



if(input===mensaje && valor.length<10)
valido=false;



if(valido){

input.classList.add("is-valid");
input.classList.remove("is-invalid");


}else{


input.classList.add("is-invalid");
input.classList.remove("is-valid");


}


}



}







// Cargar información inicial

mostrarProductos();

mostrarRegistros();