//const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const CATEGORIES_URL = "http://localhost:3000/jsoncategories";
//const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const PUBLISH_PRODUCT_URL = "http://localhost:3000/jsonpublish"
//const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const CATEGORY_INFO_URL = "http://localhost:3000/jsoncategoryinfo";
// const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCTS_URL = "http://localhost:3000/jsonproducts";
// const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_URL = "http://localhost:3000/jsonproductinfo";
// const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const PRODUCT_INFO_COMMENTS_URL = "http://localhost:3000/jsonproductcomments";
// const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
const CART_INFO_URL = "http://localhost:3000/jsoncartinfo";
// const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";
const CART_BUY_URL = "http://localhost:3000/jsoncartbuy";

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  let traerUsuario = sessionStorage.getItem("Usuario");
  document.getElementById("nombreUsuario").innerHTML = "HOLA " + traerUsuario;

  if (traerUsuario == null){
    window.location.href = "index.html"
  }
  
});

function cerrarSesion(){
  sessionStorage.removeItem("Usuario");
  localStorage.clear()
  window.location.reload();
}

function seguirComprando(){
  window.location.href = "products.html"
}


function onSignIn(googleUser) {
  // Useful data for your client-side scripts:
  var profile = googleUser.getBasicProfile();
  console.log("ID: " + profile.getId()); // Don't send this directly to your server!
  console.log('Full Name: ' + profile.getName());
  console.log('Given Name: ' + profile.getGivenName());
  console.log('Family Name: ' + profile.getFamilyName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail());

  // The ID token you need to pass to your backend:
  var id_token = googleUser.getAuthResponse().id_token;
  console.log("ID Token: " + id_token);
}