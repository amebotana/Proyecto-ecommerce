let infoCarrito = [] // creando esta variable, podemos acceder desde todo lados.

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            infoCarrito = resultObj.data.articles;
            cambiarMoneda(true);
            mostrarCarrito();


        }
    });
});
let moneda 

function mostrarCarrito() { // encontramos el contenedor, lo vacío y con un for insertamos la plantilla 

    let contenedor = document.getElementById("contenedorCarrito")
    contenedor.innerHTML = ""
    for (let i = 0; i < infoCarrito.length; i++) {
        const cartItem = infoCarrito[i];
        contenedor.innerHTML += `<div class="row p-2 elementoCarrito">
        <div class="col-2"><img src="${cartItem.src}" class="img-fluid"></div>
        <div class="col-5"><p class="mt-4">${cartItem.name}</p></div>
        <div class="col-2"><h5 class="text-center mt-4">${cartItem.currency +" "+ cartItem.unitCost}</h5></div>
        <div class="col-1"><input name= "${i}" onchange= "actualizarCarrito(this.value,this.name)" type="number" min="1" max="99" value="${cartItem.count}" class="mt-4"></div> 
        <div class="col-2"><h5 class="text-center mt-4 subtotal">${cartItem.currency + cartItem.count * cartItem.unitCost}</h5></div>
      </div>`
// el value del input se define a través del JSON. en ese input tenemos el atributo onchange, en la funcion actualizarCarrito, que recibe el valor(value) y el name(id de producto)
    }
}

function actualizarCarrito(valor, id) { //recibe un valor y un id
    let items = document.getElementsByClassName("elementoCarrito") // guarda todos los items del carrito en un array.
    let itemClickeado = items[id] // elige el item seleccionado (del array el que tenga el indice "id")
    infoCarrito[id].count = valor // seteamos el nuevo value del item
    let itemSubtotal = valor * infoCarrito[id].unitCost // calculamos el subtotal
    itemClickeado.getElementsByClassName("subtotal")[0].innerHTML = infoCarrito[id].currency + itemSubtotal; // dentro del item clickeado, buscamos el contenedor del subtotal y le insertamos moneda + subtotal
    actualizarSubtotal(); // ejecutamos la funcion actualizarSubtotal.
}

function actualizarSubtotal(){

let subtotal = 0 //definimos el contador del subototal
for (let index = 0; index < infoCarrito.length; index++) { //recorre todos los productos del carrito, calcula su subtotal (count x unitcost) y lo acumula en la variable subtotal.
    const producto = infoCarrito[index];
let suma = producto.unitCost * producto.count
subtotal += suma
}

document.getElementById("subtotal").innerHTML = moneda + numberWithCommas(subtotal) // insertamos  moneda + subtotal en el resumen de compra.

}

function cambiarMoneda(swichMoneda) { //su funcionamiento se basa en un checkbox, trabaja con un booleano (true/false)
    if (swichMoneda === true) { //si recibe un true, es $, si recibe un false es usd
        moneda = "UYU"
    } else {
        moneda = "USD"
    }
    for (let i = 0; i < infoCarrito.length; i++) { // cambia o actualiza la moneda general del carrito, según la que esté seleccionada en el checkbox.
        const producto = infoCarrito[i];
        if (producto.currency != moneda && producto.currency === "UYU") {
            producto.currency = "USD"
            producto.unitCost = producto.unitCost / 40
 
        }
        if (producto.currency != moneda && producto.currency === "USD") {
            producto.currency = "UYU"
            producto.unitCost = producto.unitCost * 40

        }
    }
    mostrarCarrito();
    actualizarSubtotal();

}