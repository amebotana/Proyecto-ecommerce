let currentProduct = []

function ShowProductInfo(productInfo) {
    if (productInfo != undefined) {
        currentProduct = productInfo // si el producto está definido, va a estar en el array
    }

    let contenedorProduct = document.getElementById("ProductInfo")
    document.title = `${currentProduct.name}`; // cambio el titulo de la ventana por el nombre del producto
 //inserto nombre del producto, costo, moneda y descripción:
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
    let contenedorSlider = document.getElementsByClassName("carousel-inner")[0]// identifico el contenedor del slider

    for (let index = 0; index < currentProduct.images.length; index++) { //recorro las imagenes y las inserto una por una en el html.
        const imagen = currentProduct.images[index];
        contenedorSlider.innerHTML += `
        <div class="carousel-item">
        <img src="${imagen}" class="d-block w-100" alt="...">
      </div>
  `
    }
    let imagenes = document.getElementsByClassName("carousel-item")
    imagenes[0].className += " active"
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

    // Cambiar titulo de ventana por nombre de producto DONE
    // mostrar nombre del producto DONE 
    // mostrar fotos del producto DONE 

    // mostrar precio + currency DONE
    // mostrar descripción DONE
    // mostrar vendidos 
    // mostrar productos related DONE
    // mostrar boton añadir al carrito DONE / comprar ahora DONE/ agregar a favoritos 
    // mostrar comentarios DONE

}

function mostrarComentarios(comments){
  for (let index = 0; index < comments.length; index++) {
    const comentario = comments[index];
  
  let fecha = new Date(comentario.dateTime).toLocaleString();
  let puntuacion = comentario.score;
  let texto = comentario.description;
  let usuario = comentario.user;

  let contenedorComentarios = document.getElementById("comentarios");

  let estrellas = ""
  if (puntuacion > 0){
    for (let i = 0; i < puntuacion; i++) {
      estrellas += '<span class="fa fa-star checked"></span>'
    }
    for (let i = 0; i < 5-puntuacion; i++) {
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
function mostrarProductosRelated(productos){
  console.log(currentProduct)
  for (let index = 0; index < currentProduct.relatedProducts.length; index++) {
  productos[currentProduct.relatedProducts[index]]

  let relacionado = productos[currentProduct.relatedProducts[index]]
  console.log(relacionado)

  let nombre = relacionado.name;
  let costo = relacionado.currency + " " + relacionado.cost;
  let imagen = relacionado.imgSrc;

  let contenedorRelatedProducts = document.getElementById("productosRelated");

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
function pintarEstrellas(){

  let estrellas = document.getElementById("estrellas").getElementsByClassName("fa fa-star")
  
  for (let i = 0; i < estrellas.length; i++) {
    const estrella = estrellas[i];
    console.log(typeof estrellas)
    estrella.addEventListener("mouseover", function(){
      for (let index = 0; index < estrellas.length; index++) {
        const estrellaPintada = estrellas[index];
        estrellaPintada.classList.remove("checked")
      }
      for (let index = 0; index < estrella.getAttribute("data-index"); index++) {
        const estrella = estrellas[index];
        estrella.classList.toggle("checked") //accede al span de la estrella, pone/saca la clase checked

      }
    })
    
  }
}
function publicarComentario(){
  let usuario = sessionStorage.getItem("Usuario");
  let texto = document.getElementById("textoInput").value;
  let fecha = new Date().toLocaleString()
  let score = document.getElementById("estrellas").getElementsByClassName("fa fa-star checked").length;
  console.log(usuario + texto + fecha + score)
  
  let contenedorComentarios = document.getElementById("comentarios");
  let estrellas = ""
  if (score >= 0){
    for (let i = 0; i < score; i++) {
      estrellas += '<span class="fa fa-star checked"></span>'
    }
    for (let i = 0; i < 5-score; i++) {
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
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {//descarga los datos de la URL y los guarda en el resultObj
        if (resultObj.status === "ok") { //el resultObj tiene 2 atributos, 1) el status, si salio ok o no
            ShowProductInfo(resultObj.data); //2)el data, donde contiene toda la info. Ejecutamos la funcion showproductinfo pasandole la info del json

        }
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            mostrarComentarios(resultObj.data);
        }
    });
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
      if (resultObj.status === "ok") {
         mostrarProductosRelated(resultObj.data);
      }
  });

  pintarEstrellas();


document.getElementById("resetEstrellas").addEventListener("click", function(){
  let estrellas = document.getElementById("estrellas").getElementsByClassName("fa fa-star")
  for (let index = 0; index < estrellas.length; index++) {
    const estrellaPintada = estrellas[index];
    estrellaPintada.classList.remove("checked")
  }
})

});