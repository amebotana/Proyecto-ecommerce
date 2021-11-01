let currentProduct = []

function ShowProductInfo(productInfo) {
  if (productInfo != undefined) {
    currentProduct = productInfo // si el producto está definido, va a estar en el array
  }

  let contenedorProduct = document.getElementById("ProductInfo")
  document.title = `${currentProduct.name}`; // cambio el titulo de la ventana por el nombre del producto
  //inserto nombre del producto, costo, moneda y descripción y cantidad de vendidos, tambien botones de comprar ahora y agregar al carrito:
  contenedorProduct.innerHTML = `
  <div class="col-md-6">
  <div id="carouselProducto" class="carousel slide" data-ride="carousel">
  <div class="carousel-inner">

  </div>
  </div>
  </div>
  <div class="col-md-6 col-xs-12">
  <h1 class="text-center mt-4 mb-1">${currentProduct.name}</h1>
  <h2 class="text-center">${"Precio: " + currentProduct.cost + " " + currentProduct.currency}</h2>
    <p id="parrafo" class="mt-4 mb-5">${currentProduct.description}</p>
    <h6>Categoría: <a href="category-info.html">${currentProduct.category}</a></h6>
    <h6 class="mb-5">Cantidad de vendidos: ${currentProduct.soldCount}</h6>
    <button class="btn btn-primary skin-light btn-light" id="botonlight"><i class="fas fa-shopping-cart"></i> Agregar al carrito</button>
    
    <button class="btn btn-primary ml-3" id="botonblue">Comprar ahora</button>
  </div>
  `
  // mostrar fotos del producto  
  let contenedorSlider = document.getElementsByClassName("carousel-inner")[0] // identifico el contenedor del slider

  for (let index = 0; index < currentProduct.images.length; index++) { //recorro las imagenes y las inserto una por una en el html.
    const imagen = currentProduct.images[index];
    contenedorSlider.innerHTML += `
        <div class="carousel-item">
        <img src="${imagen}" class="d-block w-100" alt="...">
      </div>
  `
  }
  // bootstrap exige que la primera imagen tenga la clase "active"
  let imagenes = document.getElementsByClassName("carousel-item") // obtenemos todas las imagenes insertadas
  imagenes[0].className += " active" //a la primer imagen le agregamos la clase "active"
  //inserto los controles del slider
  contenedorSlider.innerHTML += `
    </div>
    <a class="carousel-control-prev" href="#carouselProducto" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselProducto" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
  `

}

// mostrar las opiniones 
function mostrarComentarios(comments) {
  for (let index = 0; index < comments.length; index++) {
    const comentario = comments[index];

    let fecha = new Date(comentario.dateTime).toLocaleString();
    let puntuacion = comentario.score;
    let texto = comentario.description;
    let usuario = comentario.user;

    let contenedorComentarios = document.getElementById("comentarios");

    let estrellas = ""
    if (puntuacion > 0) {
      for (let i = 0; i < puntuacion; i++) {
        estrellas += '<span class="fa fa-star checked"></span>'
      }
      for (let i = 0; i < 5 - puntuacion; i++) {
        estrellas += '<span class="fa fa-star"></span>'
      }
    }
    contenedorComentarios.innerHTML += `
  <div class="comentario">
  <h4>${usuario}</h4>
  ${estrellas}
  <p>${texto}</p>
  <p>${fecha}</p>
  </div>
  
  `
  }
}
// mostrar productos relacionados
function mostrarProductosRelated(productos) { //recibe todos los productos
  for (let index = 0; index < currentProduct.relatedProducts.length; index++) { //el for se repite segun la cantidad de elementos que tenga relatedProducts
    //obtengo el primer indice del relacionado
    let indiceRelacionado = currentProduct.relatedProducts[index]
    //obtengo el producto [indice]
    let relacionado = productos[indiceRelacionado]
    // del producto relacionado obtenemos los atributos
    let nombre = relacionado.name;
    let costo = relacionado.currency + " " + relacionado.cost;
    let imagen = relacionado.imgSrc;
    //definimos el contenedor HTML donde se van a mostrar los productos relacionados
    let contenedorRelatedProducts = document.getElementById("productosRelated");
    //a ese contenedor le insertamos la plantilla
    contenedorRelatedProducts.innerHTML += `
  <div class="card m-2" style="width: 18rem;">
  <img src="${imagen}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${nombre}</h5>
    <p class="card-text">${costo}</p>
    <a href="#" class="btn btn-primary">Ver producto</a>
  </div>
</div>
  `

  }
}

function pintarEstrellas() {

  let estrellas = document.getElementById("estrellas").getElementsByClassName("fa fa-star") //busca todas las estrellas del id estrellas y de ese id, la clase que contiene las estrellas pintadas

  for (let i = 0; i < estrellas.length; i++) { //recorro el array de estrellas
    const estrella = estrellas[i];
    console.log(typeof estrellas)
    estrella.addEventListener("mouseover", function () { //a cada una le agregamos un eventlistener y que se ejecute la funcion
      for (let index = 0; index < estrellas.length; index++) {
        const estrellaPintada = estrellas[index];
        estrellaPintada.classList.remove("checked") //a la que esta pintada le eliminamos la clase checked es decir la despinto
      }
      for (let index = 0; index < estrella.getAttribute("data-index"); index++) {
        const estrella = estrellas[index];
        estrella.classList.toggle("checked") //accede al span de la estrella, pone/saca la clase checked

      }
    })

  }
}

function publicarComentario() {
  let usuario = sessionStorage.getItem("Usuario");
  let texto = document.getElementById("textoInput").value;
  let fecha = new Date().toLocaleString()
  let score = document.getElementById("estrellas").getElementsByClassName("fa fa-star checked").length;
  console.log(usuario + texto + fecha + score)

  let contenedorComentarios = document.getElementById("comentarios");
  let estrellas = ""
  if (score >= 0) {
    for (let i = 0; i < score; i++) {
      estrellas += '<span class="fa fa-star checked"></span>'
    }
    for (let i = 0; i < 5 - score; i++) {
      estrellas += '<span class="fa fa-star"></span>'
    }
  }
  contenedorComentarios.innerHTML += `
  <div class="comentario">
  <h4>${usuario}</h4>
   ${estrellas}
  <p>${texto}</p>
  <p>${fecha}</p>
</div>

  `
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCT_INFO_URL).then(function (resultObj) { //descarga los datos de la URL y los guarda en el resultObj
    if (resultObj.status === "ok") { //el resultObj tiene 2 atributos, 1) el status, si salio ok o no
      ShowProductInfo(resultObj.data); //2)el data, donde contiene toda la info. Ejecutamos la funcion showproductinfo pasandole la info del json
      getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
          mostrarProductosRelated(resultObj.data);
        }
      });
    }
  });
  getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      mostrarComentarios(resultObj.data);
    }
  });


  pintarEstrellas();


  document.getElementById("resetEstrellas").addEventListener("click", function () {
    let estrellas = document.getElementById("estrellas").getElementsByClassName("fa fa-star")
    for (let index = 0; index < estrellas.length; index++) {
      const estrellaPintada = estrellas[index];
      estrellaPintada.classList.remove("checked")
    }
  })

});