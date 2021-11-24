//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
cargarDatos()
});

function guardarDatos() {
    let datosUsuario = {} // creamos objeto vacío y cargamos las propiedades
    datosUsuario.nombre = document.getElementById("inputName").value
    datosUsuario.apellido = document.getElementById("inputLastname").value
    datosUsuario.email = document.getElementById("inputEmail").value
    datosUsuario.edad = document.getElementById("inputAge").value
    datosUsuario.telefono = document.getElementById("inputPhone").value
    datosUsuario.foto = document.getElementById("fotoPerfil").src

    localStorage.setItem("datosUsuario", JSON.stringify(datosUsuario)) // lo convertimos a string y guardo en LocalStorage.

    document.getElementById("mensajeDatos").innerHTML = "Has actualizado tus datos correctamente!"
    return false // previene la actualización de la pagina al enviarse los datos.
}

function cargarDatos() {
    let datosUsuario = JSON.parse(localStorage.getItem("datosUsuario")) // buscamos los datos de LocalStorage, y transformamos en string el objeto nuevamente
    //cambiamos el valor de los input, por los valores del objeto
    document.getElementById("inputName").value = datosUsuario.nombre || ""
    document.getElementById("inputLastname").value = datosUsuario.apellido || ""
    document.getElementById("inputEmail").value = datosUsuario.email || ""
    document.getElementById("inputAge").value = datosUsuario.edad || ""
    document.getElementById("inputPhone").value = datosUsuario.telefono || ""
    document.getElementById("fotoPerfil").src = datosUsuario.foto || ""
}

function fotoCargada(){
    let foto = document.getElementById("fotoPerfil") // identificamos el contenedor de la imagen
    let archivo = document.getElementById("inputPhoto").files[0] // obtenemos el archivo del input File

    let lector = new FileReader() // creamos el lector que lee la imagen como string

    if (archivo){
        lector.readAsDataURL(archivo) // cuando existe un archivo en el inputFile, se lee como dataURL

    } else {
        foto.src = "img\avatar.png" // si no, se carga una imagen por defecto.
    }

    lector.onload = function (){ // una vez que el archivo se carga. se asigna ese archivo al contenedor de imagen
        foto.src = lector.result
    }
}

