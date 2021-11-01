//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

});

//Realizar una petición web a una URL donde se encuentra una colección de productos en formato JSON, 
//con la información básica (precio, nombre, breve descripción) respectiva a cada producto, y mostrar el 
//listado en HTML.


const ORDER_ASC_BY_COST = "19";
const ORDER_DESC_BY_COST = "91";
const ORDER_BY_PROD_COUNT = "Cant.";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_COST){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

/**
 *recorre los productos y los lleva al HTML
 */
function showProductsList(){

    let buscadorInput = document.getElementById("buscador").value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let product = currentProductsArray[i];

/**Filtros:
 */
        if ((((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount)))&&((product.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(buscadorInput)||(product.description.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(buscadorInput))))){
/**
 * Aqui se agrega todo al HTML:
 */
            // htmlContentToAppend += `
            //  <a href="product-info.html" class="list-group-item list-group-item-action">
            //     <div class="row">
            //         <div class="col-3">
            //             <img src="${product.imgSrc}" alt="" class="img-thumbnail">
            //         </div>
            //         <div class="col">
            //             <div class="d-flex w-100 justify-content-between">
            //                 <h4 class="mb-1">${product.name}</h4>
            //                 <small class="text-muted">${product.soldCount} artículos</small>
            //             </div>
            //             <p class="mb-1">${product.description}</p>                    
            //             <p class="mb-1">${product.currency} ${product.cost}</p>
                        
            //         </div>
            //     </div>
            // </a>
            
            htmlContentToAppend += `          
            <div class= "col-md-4">
            <a href="product-info.html" class="card mb-4 shadow-sm custom-card">
                
            <div class="card">
            <img src="${product.imgSrc}" class="card-img-top" alt="${product.description}">
            <div class="card-body">
            <h4 class="card-title">${product.name}</h4>
            <small class="text-muted">${product.soldCount} artículos</small>

            <p class="card-text">${product.description}</p>
            <strong><p class="mb-1">${product.currency} ${product.cost}</p></strong>
            <a href="product-info.html" class="btn btn-primary">Ver producto</a>
            </a>
            </div>
            </div>
            </div>
            `
        }

        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowProducts(sortCriteria, productsArray){ // esta función ordena una lista, y los ordena según el criterio
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro las categorías ordenadas
    showProductsList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts(ORDER_ASC_BY_COST, resultObj.data);
        }
    });
            showProductsList();

    document.getElementById("sortAsc").addEventListener("click", function(){//ordeno la lista según ASC
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){//ordeno la lista según DESC
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){//ordeno la lista según COUNT
        sortAndShowProducts(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){//función que sirve para limpiar la búsqueda
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

    showProductsList();
    }
    );

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showProductsList();
    });
});
