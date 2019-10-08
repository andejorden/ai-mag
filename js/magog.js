var dataBase = [];
var homePage = "/ai-mag/index.html";
var productPage = "/ai-mag/product-page.html";
var cartPage = "/ai-mag/cart.html";
var adminPage = "/ai-mag/admin.html";
var size = 0;
var header = `<hgroup>
    <h1 class="text-success"><a href="index.html" class="card-link"><i class="fas fa-eye"></i> <strong>AI-Mag</strong></a> - <small>My First Online Virtual Shop</small></h1>
    <h2 class="text-info">The Final Project</h2>
    <h3>HTML5, Bootstrap & Javascript</h3>
</hgroup>`;
var footer = `<footer class="jumbotron text-center rounded">
    <div>
        <p><i class="fas fa-copyright"></i> <strong>AI Copyright</strong> - All rights reserved!</p>
    </div>
</footer>`;

class Produs{
    constructor(id, name, price, count){
        this.id = id,
        this.name = name,
        this.price = price,
        this.count = count;
    }
}

/**
 * functia Remove Item
 */

 async function removeProductsItem(i){
    if(confirm(`Sigur vrei sa stergi din lista produsul ${dataBase.produse[i].name}`)){
        response = await fetch(`https://magog-products.firebaseio.com/produse/${i}.json`, {method:"delete"});
        document.querySelector("div.alert").classList.remove("d-none");
        document.querySelector("div.alert").innerHTML = `<strong>${dataBase.produse[i].name}</strong> a fost sters din lista!`;
        setTimeout(function(){ display(); }, 3000);
    }
 }

/**
 * functia Cancel FORM
 */

 function adminFormReset(){
     location.replace(adminPage);
 }

 /**
  * save New Product in the list
  */

  async function saveNewProduct(form, event){
    event.preventDefault();
    var obj = {
       description: document.querySelector("[name='Datalii']").value,
       image: document.querySelector("[name='Imagine']").value,
       name: document.querySelector("[name='Nume']").value,
       price: document.querySelector("[name='Pret']").value,
       stoc: document.querySelector("[name='Stoc']").value
    };
    response = await fetch(`https://magog-products.firebaseio.com/produse/.json`, {method:"post", body:JSON.stringify(obj)});
    document.querySelector("div.alert").classList.remove("d-none");
    document.querySelector("div.alert").innerHTML = `<strong>SUCCES</strong> produsul a fost adaugat in lista!`;
    form.reset();
    setTimeout(function(){ display(); }, 3000);
  }

 /**
  * functia care aduce produce noi in lista
  */

 function addNewProductForm(){
    document.querySelector("#adminForm").setAttribute("onSubmit", "saveNewProduct(this, event)");
    document.querySelector("article").classList.add("d-none");
    document.querySelector("section").classList.remove("d-none");
  }

/**
 * functia care editeaza produsele din magazin
 */

 async function adminEditSubmit(form, event){
     event.preventDefault();
     var i = window.location.hash.substring(1);
     var obj = {
         description: document.querySelector("[name='Datalii']").value,
         image: document.querySelector("[name='Imagine']").value,
         name: document.querySelector("[name='Nume']").value,
         price: document.querySelector("[name='Pret']").value,
         stoc: document.querySelector("[name='Stoc']").value

     };
     response = await fetch(`https://magog-products.firebaseio.com/produse/${i}.json`, {method:"put", body:JSON.stringify(obj)});
     document.querySelector("div.alert").classList.remove("d-none");
     document.querySelector("div.alert").innerHTML = `<strong>Produsul</strong> a fost modificat cu succes!`;
     form.reset();
     setTimeout(function(){ adminFormReset(); }, 3000);
 }

/**
 * Functia Edit Item - aduce datele produsului in formularul de editare
 */

 function editItem(i){
     document.querySelector("article").classList.add("d-none");
     document.querySelector("section").classList.remove("d-none");
     document.querySelector("[name='Imagine']").value = dataBase.produse[i].image;
     document.querySelector("[name='Nume']").value = dataBase.produse[i].name;
     document.querySelector("[name='Datalii']").value = dataBase.produse[i].description;
     document.querySelector("[name='Pret']").value = dataBase.produse[i].price;
     document.querySelector("[name='Stoc']").value = dataBase.produse[i].stoc;
 }

/**
 * incarca pagina de ADMIN
 */

function drawAdminPage(){
    var str = "";
    for( var i in dataBase.produse){
        str += `<tr>
            <td><img src="/ai-mag/${dataBase.produse[i].image}" alt="${dataBase.produse[i].name}" class="img-thumbnail"></td>
            <td><h3><a href="#${i}" onclick="editItem('${i}', event)" title="Edit this Item">${dataBase.produse[i].name}</a></h3></td>
            <td><p>${dataBase.produse[i].description.substring(0, 100)}...</p></td>
            <td><p>${dataBase.produse[i].price} <i class="fas fa-dollar-sign"></i></p></td>
            <td><p>${dataBase.produse[i].stoc}</p></td>
            <td><p><a class="btn btn-danger" href="javascript:removeProductsItem('${i}')" title="Remove Item"><i class="fas fa-trash-alt"></i></a></p></td>
        </tr>`;
    }
    document.querySelector("tbody").innerHTML = str;
}

/**
 * incarca pagina DETALII
 */

function drawProductDetails(){
    var str = "";
        var i = window.location.search.substring(4);
        str = `<div class="container">
        <div class="row">
            <div class="col-lg-6 col-xl-7 pt-4 order-2 order-lg-1 photoswipe-gallery">
                <img src="/ai-mag/${dataBase.produse[i].image}" alt="${dataBase.produse[i].name}" class="img-thumbnail">
            </div>
            <div class="col-lg-6 col-xl-4 pt-4 order-1 order-lg-2 ml-lg-auto">
                <h2><strong>${dataBase.produse[i].name}</strong></h2><hr>
                <h3 class="text-base mb-1">About the product</h3>
                <p>${dataBase.produse[i].description}</p>
                <hr>
                <ul class="list-unstyled">
                    <li>Price: <i class="fas fa-dollar-sign"></i> ${dataBase.produse[i].price}</li>
                    <li>Stock: ${dataBase.produse[i].stoc} items.</li>
                </ul>
                <form onsubmit="addToCart('${i}', event)">
                    <input name="count" type="number" value="1" class="btn detail-quantity" min="1" max="${dataBase.produse[i].stoc}">
                    <input type="submit" value="Add to Cart" class="btn btn-secondary">
                </form>
            </div>
        </div>
        </div>`;
    document.querySelector("article").innerHTML = str;
}

/**
 * incarca produsele in Main pe Prima Pagina 
 */

function drawProductList(){
    var str = "";
    for(var i in dataBase.produse){
        str += `<div class="col-xl-2 col-lg-3 col-md-4 col-6">
        <div class="product">
            <div class="product-image">
                <img src="/ai-mag/${dataBase.produse[i].image}" alt="${dataBase.produse[i].name}" class="img-thumbnail">
            </div>
            <div class="info-box">
                <h3 class="text-base mb-1"><a href="product-page.html?id=${i}" class="text-dark">${dataBase.produse[i].name}</a></h3>
                <p class="text-secondary"><i class="fas fa-dollar-sign"></i> ${dataBase.produse[i].price}</p>
            </div>
        </div>
    </div>`;
    }
    document.querySelector("div.row").innerHTML = str;    
}

/**
 * incarca Cosul de Cumparaturi
 */
    
function drawCart(){
    var total = 0;
    var subtotal = 0;
    var str = "";
    var info = "";
    for(var i in dataBase.cart){
        var item = dataBase.cart[i].id;
        subtotal = (dataBase.cart[i].price * dataBase.cart[i].count).toFixed(2);
        total += Number(subtotal);
        str += `<tr>
            <th scope="row">${item}</th>
            <th><a href="${productPage}?id=${item}">${dataBase.cart[i].name}</a></th>
            <td>${dataBase.cart[i].price}$</td>
            <td><input type="number" value="${dataBase.cart[i].count}" name="produsIndex" min="0" max="${dataBase.produse[item].stoc}" onkeydown="return false" onchange="more(this, '${i}')" class="input text-centred"></td>
            <td>${subtotal}$</td>
            <td><a href="#" onclick="remove('${i}')" class="btn btn-link">Replace</a></td>
        </tr>`;
    };
    info = `<hr>
    <ul class="list-unstyled">
        <li><strong>Numar produse:</strong> ${size}</li>
        <li><strong>TVA:</strong> ${valoareTVA(total).toFixed(2)}$</li>
        <li><strong>Transport:</strong> 0$</li>
    </ul>
    <hr>
    <h2 class="text-important"><strong>Total:</strong> <small class="text-success">${(total + valoareTVA(total)).toFixed(2)}$</small></h2>
    <hr>
    <button type="button" class="btn btn-primary" onClick="orderList()">Trimite comanda</button>`;
    document.querySelector("tbody").innerHTML = str;
    document.querySelector("article").insertAdjacentHTML("beforeend", `${info}`);
}

/**
 * functia Trimite Comanda
 */

async function orderList(){
    for(var i in dataBase.cart){
        var j = dataBase.cart[i].id;
        var restStoc = dataBase.produse[j].stoc - dataBase.cart[i].count;
        if(size === 0){
            return;
        }else{
            response = await fetch(`https://magog-products.firebaseio.com/produse/${j}/stoc/.json`,{method:"put", body:JSON.stringify(restStoc)});
            response = await fetch(`https://magog-products.firebaseio.com/cart/${i}/.json`,{method:"delete"});
        }
    }
    document.querySelector("div.alert").classList.remove("d-none");
    document.querySelector("div.alert").innerHTML = `<strong>Comanda</strong> a fost trimisa cu succes!`;
    setTimeout(function(){ display(); }, 3000);
}

function valoareTVA(pere){
  return (19/100) * pere;
}

/**
 * Functia care aduce produse in cos sau scoate produsul atunci cand valoarea e ZERO
 */

async function more(el, produs){
    var elNumeric = Number(el.value);
    if(elNumeric === 0){
        response = await fetch(`https://magog-products.firebaseio.com/cart/${produs}/.json`,{method:"delete"});
        display();
    }else{
        response = await fetch(`https://magog-products.firebaseio.com/cart/${produs}/count/.json`,{method:"put", body:JSON.stringify(elNumeric)});
        display();
    }
}

async function remove(item){
    if(confirm(`Sigur vrei sa stergi ${dataBase.cart[item].name}?`)){
        response = await fetch(`https://magog-products.firebaseio.com/cart/${item}/.json`,{method:"delete"});
    }
    display();
}

/**
 * Functia care creaza produsele sau le modifica cantitatea din COS CUMPARATURI
 */

async function addToCart(i, event){
    event.preventDefault();
    var response = await fetch("https://magog-products.firebaseio.com/cart/.json");
    window.dataBase.cart = await response.json();

    var quantity = document.querySelector("[name='count']").value;
    var quantityNumeric = Number(quantity);
    var produs = new Produs(i, dataBase.produse[i].name, dataBase.produse[i].price, quantityNumeric);

    for(var item in dataBase.cart){
        if(dataBase.cart[item].id === i){
            quantityNumeric += dataBase.cart[item].count;
            response = await fetch(`https://magog-products.firebaseio.com/cart/${item}/count/.json`,{method:"put", body:JSON.stringify(quantityNumeric)});
            document.querySelector("div.alert").classList.remove("d-none");
            document.querySelector("div.alert").innerHTML = `<strong>${dataBase.produse[i].name}</strong> a fost adaugat in cos!`;
            setTimeout(function(){ display(); }, 3000);
            return;
        }
    }

    response = await fetch("https://magog-products.firebaseio.com/cart/.json",{method:"post", body:JSON.stringify(produs)});
    document.querySelector("div.alert").classList.remove("d-none");
    document.querySelector("div.alert").innerHTML = `<strong>${dataBase.produse[i].name}</strong> a fost adaugat in cos!`;
    setTimeout(function(){ display(); }, 3000);
}

function cartItemsNumber(){
    if(dataBase.cart === undefined){
        size = 0;
    }else{
        size = Object.keys(dataBase.cart).length;
    }
}

function hideNull(){
    if(size === 0){
        document.querySelector("#cartTable").classList.add("d-none");
    }
}

/**
 *  Functia DRAW - incarca datele in pagina HOME PAGE
 */

async function display(){
    console.log(window.location);
    var response = await fetch("https://magog-products.firebaseio.com/.json");
    window.dataBase = await response.json();
    var main = "";
    main = `<div class="alert alert-success w-100 position-fixed fixed-top rounded-0 text-center d-none"><strong>Success!</strong> Indicates a successful or positive action.</div>
    <div class="container">
        <header class="mt-3 mb-3">
            ${header}
            <nav>
                <button type="button" class="btn btn-primary" onclick="window.location.href='cart.html'"><i class="fas fa-shopping-cart"></i> Shopping Cart</button>
                <button type="button" class="btn btn-light"onclick="window.location.href='admin.html'"><i class="fas fa-lock"></i> Admin</button>
            </nav>
        </header>
        <article>
            <h2><strong>The Product List</strong></h2>
            <hr>
            <div class="row">
            </div>
            <hr>
        </article>
        ${footer}
    </div>`;
    document.querySelector("main").innerHTML = main;
/**
 * Randeaza pagina de HOME
 */
    if(document.location.pathname === homePage || document.location.pathname === "/ai-mag/"){
        document.querySelector("header").insertAdjacentHTML("afterend", `<hr>${bootstrapSlideShow}<hr>`);
        drawProductList();
/**
 * Randeaza pagina DETALII
 */
    }else if(window.location.href.indexOf(productPage) > -1){
    drawProductDetails();
/**
 * Randeaza pagina COS (CART PAGE)
 */
    }else if(window.location.pathname === cartPage){
        main = `<div class="alert alert-success w-100 position-fixed fixed-top rounded-0 text-center d-none"><strong>Success!</strong> Indicates a successful or positive action.</div>
        <div class="container">
            <header class="mt-3 mb-3">
                ${header}
                <nav>
                    <button type="button" class="btn btn-primary disabled"><i class="fas fa-shopping-cart"></i> Shopping Cart</button>
                    <button type="button" class="btn btn-light"onclick="window.location.href='admin.html'"><i class="fas fa-lock"></i> Admin</button>
                </nav>
            </header>
            <article class="container">
                <h2><strong>Shopping Cart</strong></h2>
                <div id="cartTable" class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">id#</th>
                                <th scope="col">Nume Produs</th>
                                <th scope="col">Pret</th>
                                <th scope="col">Cantitate</th>
                                <th scope="col" colspan="2">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </article>
            ${footer}
        </div>`;
        document.querySelector("main").innerHTML = main;
        cartItemsNumber();
        drawCart();
        hideNull();

/**
 * Randeaza pagina de ADMIN
 */

    }else if(window.location.pathname === adminPage){
        main = `<div class="alert alert-success w-100 position-fixed fixed-top rounded-0 text-center d-none"><strong>Success!</strong> Indicates a successful or positive action.</div>
        <div class="container">
            <header class="mt-3 mb-3">
                ${header}
                <nav>
                    <button type="button" class="btn btn-primary" onclick="window.location.href='cart.html'"><i class="fas fa-shopping-cart"></i> Shopping Cart</button>
                    <button type="button" class="btn btn-light disabled"><i class="fas fa-lock"></i> Admin</button>
                </nav>
            </header>
            <article>
                <h2><strong>Admin Page</strong><small class="text-success"> - Edit, Add/Remove</small></h2>
                    <div id="cartTable" class="table-responsive-sm">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col" class="w-25 col-sm-2">Image</th>
                                    <th scope="col" class="w-25 col-sm-2">Item Name</th>
                                    <th scope="col" class="w-25 col-sm-2">Description</th>
                                    <th scope="col">Price <i class="fas fa-dollar-sign"></i></th>
                                    <th scope="col">Stock</th>
                                    <th scope="col" class="text-center"><a class="btn btn-primary" href="javascript:addNewProductForm()" title="Add New Item"><i class="fas fa-plus"></i></a></th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                <hr>
            </article>
            <section class="container w-50 p-3 d-none">
                <h2><strong>Add New Products in The Store</strong></h2>
                <hr>
                <form id="adminForm" onsubmit="adminEditSubmit(this, event)">
                    <div class="form-group">
                        <label for="FormControlInput1"><strong>Name:</strong></label>
                        <input type="text" class="form-control" id="FormControlInput1" name="Nume" placeholder="Name">
                    </div>
                    <div class="form-group">
                        <label for="FormControlInput2"><strong>Image:</strong></label>
                        <input type="text" class="form-control" id="FormControlInput2" name="Imagine" placeholder="Image">
                    </div>
                    <div class="form-group">
                        <label for="FormControlTextarea1"><strong>Details:</strong></label>
                        <textarea class="form-control" id="FormControlTextarea1" name="Datalii" rows="3"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="FormControlInput3"><strong>Price:</strong></label>
                        <input type="number" class="form-control" id="FormControlInput3" name="Pret" placeholder="Price" step=".01">
                    </div>
                    <div class="form-group">
                        <label for="FormControlInput4"><strong>Stoc:</strong></label>
                        <input type="number" class="form-control" id="FormControlInput4" name="Stoc" placeholder="Stock">
                    </div>
                    <div class="form-group">
                    <input type="submit" value="Save!" class="btn btn-primary">
                    <input type="reset" value="Cancel" class="btn btn-secondary" onclick="adminFormReset()">
                    </div>
                </form>
                <hr>
            </section>
            ${footer}
        </div>`;
        document.querySelector("main").innerHTML = main;
        drawAdminPage();
    }
}

var bootstrapSlideShow = `<div id="demo" class="carousel slide" data-ride="carousel">

  <!-- Indicators -->
  <ul class="carousel-indicators">
    <li data-target="#demo" data-slide-to="0" class="active"></li>
    <li data-target="#demo" data-slide-to="1"></li>
    <li data-target="#demo" data-slide-to="2"></li>
  </ul>
  
  <!-- The slideshow -->
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="/img/slide01.jpg" alt="Los Angeles" width="1100" height="500">
    </div>
    <div class="carousel-item">
      <img src="/img/slide02.jpg" alt="Chicago" width="1100" height="500">
    </div>
    <div class="carousel-item">
      <img src="/img/slide03.jpg" alt="New York" width="1100" height="500">
    </div>
  </div>
  
  <!-- Left and right controls -->
  <a class="carousel-control-prev" href="#demo" data-slide="prev">
    <span class="carousel-control-prev-icon"></span>
  </a>
  <a class="carousel-control-next" href="#demo" data-slide="next">
    <span class="carousel-control-next-icon"></span>
  </a>
</div>`;
