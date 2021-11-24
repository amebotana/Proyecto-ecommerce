//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
function myFunction() {
    var usuario = document.getElementById("inputEmail").value;
    var contrasenia = document.getElementById("inputPassword").value;

    if (usuario != "" && contrasenia != "") {
        sessionStorage.setItem("Usuario", usuario) //guardo el valor del ampo en sessionStorage
        window.location.href = "home.html"; //redirijo la página a home
    } else {
        alert("Debe completar los datos");
    }
    
}

function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log('Full Name: ' + profile.getName());
    sessionStorage.setItem("Usuario", profile.getName()) //guardo el valor del ampo en sessionStorage
    window.location.href = "home.html"; //redirijo la página a home
    
  }

// document.addEventListener("DOMContentLoaded", function (e) {
//     myFunction();
// });
