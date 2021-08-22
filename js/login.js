//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

//document.getElementById("log").addEventListener("click", myFunction);

function myFunction() {
    var usuario = document.getElementById("inputEmail").value;
    var contrasenia = document.getElementById("inputPassword").value;
    if (usuario != "" && contrasenia != "") {
        window.location.href = "home.html";
    } else {
        alert("Debe completar los datos");
    }


}


// document.addEventListener("DOMContentLoaded", function (e) {
//     myFunction();
// });