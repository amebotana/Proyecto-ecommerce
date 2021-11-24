let infoCarrito = [] // creando esta variable, podemos acceder desde todo lados.

let radiocreditCard = document.getElementById("radioCC")
let radioBank = document.getElementById("radioBank")
let bankaccNumber = document.getElementById("inputBankacc").value
let cardNumber = document.getElementById("inputCardNumber").value
let vencimientoCard = document.getElementById("inputDateCard").value
let ccvCode = document.getElementById("inputPinCard").value

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

    let radioTarjeta = document.getElementById("radioCC")
    let radioCuenta = document.getElementById("radioBank")
    let formTarjeta = document.getElementById("opcionCC")
    let formCuenta = document.getElementById("opcionBank")

    radioTarjeta.addEventListener("click", function () {
        formTarjeta.removeAttribute("disabled")
        formCuenta.setAttribute("disabled", "")
    })
    radioCuenta.addEventListener("click", function () {
        formCuenta.removeAttribute("disabled")
        formTarjeta.setAttribute("disabled", "")
    })

});

let moneda = "UYU"

function mostrarCarrito() { // encontramos el contenedor, lo vacío y con un for insertamos la plantilla 

    let contenedor = document.getElementById("contenedorCarrito")
    contenedor.innerHTML = ""
    for (let i = 0; i < infoCarrito.length; i++) {
        const cartItem = infoCarrito[i];
        contenedor.innerHTML += `<div class="row p-2 elementoCarrito">
        <div class="col-2"><img src="${cartItem.src}" class="img-fluid"></div>
        <div class="col-4"><p class="mt-4">${cartItem.name}</p></div>
        <div class="col-2"><h5 class="text-center mt-4">${cartItem.currency +" "+ numberWithCommas(cartItem.unitCost)}</h5></div>
        <div class="col-1"><input id= "contador${i}" name= "${i}" onchange= "actualizarCarrito(this.value,this.name)" type="number" min="1" max="99" value="${cartItem.count}" class="mt-4"></div> 
        <div class="col-2"><h5 class="text-center mt-4 subtotal">${cartItem.currency +" "+ numberWithCommas(cartItem.count * cartItem.unitCost)}</h5></div>
        <div class="col-1 align-items-center">
        <button type="button" class="btn-danger" onclick="borrarProducto(${i})" ><i class="fas fa-trash-alt"></i></button>
        </div>
        </div>
    
`
        // el value del input se define a través del JSON. en ese input tenemos el atributo onchange, en la funcion actualizarCarrito, que recibe el valor(value) y el name(id de producto)
    }
}

function actualizarCarrito(valor, id) { //recibe un valor y un id
    let idDelContador = "contador" + id
    let cantidad = valor
    if (valor <= 0) {
        document.getElementById(idDelContador).value = 1
        cantidad = 1

    }
    let items = document.getElementsByClassName("elementoCarrito") // guarda todos los items del carrito en un array.
    let itemClickeado = items[id] // elige el item seleccionado (del array el que tenga el indice "id")
    infoCarrito[id].count = cantidad // seteamos el nuevo value del item
    let itemSubtotal = cantidad * infoCarrito[id].unitCost // calculamos el subtotal
    itemClickeado.getElementsByClassName("subtotal")[0].innerHTML = infoCarrito[id].currency + " " + numberWithCommas(itemSubtotal); // dentro del item clickeado, buscamos el contenedor del subtotal y le insertamos moneda + subtotal
    actualizarSubtotal(); // ejecutamos la funcion actualizarSubtotal.
}

function actualizarSubtotal() {

    let subtotal = 0 //definimos el contador del subototal
    for (let index = 0; index < infoCarrito.length; index++) { //recorre todos los productos del carrito, calcula su subtotal (count x unitcost) y lo acumula en la variable subtotal.
        const producto = infoCarrito[index];
        let suma = producto.unitCost * producto.count
        subtotal += suma
    }

    // calculadora de envío
    let envio = document.querySelector('input[name="gridRadios"]:checked').value; //obtiene el valor del radiobutton
    let costodeEnvio = 0 // inicializamos la variable en 0.
    if (envio == "premium") { //identificamos el tipo de envio en html
        costodeEnvio = (15 * parseInt(subtotal)) / 100 // se calcula el porcentaje del envio
        document.getElementById("costoEnvio").innerHTML = moneda + " " + numberWithCommas(costodeEnvio) // insertamos en el html el costoenvio
        document.getElementById("tipoEnvio").innerHTML = "Premium" // insertamos en el html el tipo de envio
    } else if (envio == "express") {
        costodeEnvio = (7 * parseInt(subtotal)) / 100
        document.getElementById("costoEnvio").innerHTML = moneda + " " + numberWithCommas(costodeEnvio)
        document.getElementById("tipoEnvio").innerHTML = "Express"
    } else if (envio == "standard") {
        costodeEnvio = (5 * parseInt(subtotal)) / 100
        document.getElementById("costoEnvio").innerHTML = moneda + numberWithCommas(costodeEnvio)
        document.getElementById("tipoEnvio").innerHTML = "Standard"

    }
    let total = costodeEnvio + subtotal // calcula el total
    document.getElementById("total").innerHTML = moneda + " " + numberWithCommas(total) // insertamos la moneda + el total
    document.getElementById("subtotal").innerHTML = moneda + " " + numberWithCommas(subtotal) // insertamos  moneda + subtotal en el resumen de compra.

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

function checkAddress() {

    let direccion = document.getElementById("inputAddress").value
    let esquina = document.getElementById("inputAddress2").value
    let telefono = document.getElementById("inputTelephone").value
    let ciudad = document.getElementById("inputCity").value
    let pais = document.getElementById("inputCountry").value
    let codigoPostal = document.getElementById("inputZip").value
    let obligatorioEnvio = document.getElementsByClassName("obligatorio-envio")
    
//tomamos todos los inputs y checkeamos si están llenos o no.
    if (direccion != "" && esquina != "" && telefono != "" && ciudad != "" && pais != "" && codigoPostal != "") {
        return true
    } else { //
        for (let i = 0; i < obligatorioEnvio.length; i++) {
            const small = obligatorioEnvio[i];
            small.classList.remove("d-none")
        }
        return false
    }

}

function checkPayment() {

    let radiocreditCard = document.getElementById("radioCC")
    let radioBank = document.getElementById("radioBank")
    let bankaccNumber = document.getElementById("inputBankacc").value
    let cardNumber = document.getElementById("inputCardNumber").value
    let vencimientoCard = document.getElementById("inputDateCard").value
    let ccvCode = document.getElementById("inputPinCard").value
    let campoObligatorioCC = document.getElementsByClassName("obligatorio-cc")
    let campoObligatorioBank = document.getElementsByClassName("obligatorio-bank")


    if (radiocreditCard.checked) {
        if (cardNumber != "" && vencimientoCard != "" && ccvCode != "") {
            return true
        } else { //si no está lleno con un for recorremos los elementos y mostramos el elemento small
            for (let i = 0; i < campoObligatorioCC.length; i++) {
                const small = campoObligatorioCC[i];
                small.classList.remove("d-none")
                console.log(small)
            }
            return false
        }
    }

    if (radioBank.checked) {
        if (bankaccNumber != "") {
            return true
        } else {
            for (let i = 0; i < campoObligatorioBank.length; i++) {
                const small = campoObligatorioBank[i];
                small.classList.remove("d-none")
            }
            return false
        
        }
    }
}

function checkFinal() {

    let modalBody = document.getElementById("compraBody")
    let modalHeader = document.getElementById("compraHeader")

    if (checkAddress() && checkPayment()) {
        modalBody.innerHTML = "Gracias por tu compra!"
        modalHeader.innerHTML = "Compra realizada con éxito ;)"
    }

    if (!checkAddress()) {
        modalBody.innerHTML = "Por favor, revisa los datos de tu dirección de envío."
        modalHeader.innerHTML = "Ups! Hubo un inconveniente con tu compra :'("
    }

    if (!checkPayment()) {
        modalBody.innerHTML += "<br>Por favor, revisa los datos de tu pago."
        modalHeader.innerHTML = "Ups! Hubo un inconveniente con tu compra :'("
    }

    $("#compraModal").modal("show")
}

//cuando hacen click en el radiobutton... 
radiocreditCard.addEventListener("click", function (evento) { 
// agregamos la leyenda 
    document.getElementById("metodoSeleccionado").innerHTML = (evento.target.value)

})

document.getElementById("inputCardNumber").addEventListener("change", function (evento) {

    document.getElementById("metodoSeleccionado").innerHTML = "Tarjeta de Crédito"

})

radioBank.addEventListener("click", function (evento) {

    document.getElementById("metodoSeleccionado").innerHTML = (evento.target.value)

})

//desafiate entrega 7
function borrarProducto(i){ //agregue un boton que ejecuta esta funcion
infoCarrito.splice(i,1) // recibe cual elemento tiene que eliminar, y lo saca del array del carrito.
mostrarCarrito() // vuelvo a mostrar el carrito.
}

