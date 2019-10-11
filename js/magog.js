var dataBase = [];
var size = 0;

class Produs{
    constructor(id, cartStoc, name, price, count){
        this.id = id,
        this.cartStoc = cartStoc,
        this.name = name,
        this.price = price,
        this.count = count;
    }
}

/**
 * verifica daca formularele sunt valide
 */

function formValidation(){
    let theForm = document.querySelector("form");
    if(theForm.checkValidity() === false){
        console.log("NOT VALID!!!");
        theForm.classList.add('was-validated');
    }
}

/**
 * functia Remove Item
 */

async function removeProductsItem(i){
    if(confirm(`Sigur vrei sa stergi din lista produsul ${dataBase.produse[i].name}`)){
        response = await fetch(`https://magog-products.firebaseio.com/produse/${i}.json`, {method:"delete"});
        document.querySelector("div.alert").classList.add("alert-success");
        document.querySelector("div.alert").classList.remove("d-none");
        document.querySelector("div.alert").innerHTML = `<strong>${dataBase.produse[i].name}</strong> a fost sters din lista!`;
        setTimeout(function(){ display(); }, 2000);
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
    if(obj.description === "" || obj.image === "" || obj.name === "" || obj.stoc === ""){
       document.querySelector("div.alert").classList.add("alert-danger");
       document.querySelector("div.alert").classList.remove("d-none");
       document.querySelector("div.alert").innerHTML = `<strong>Completeaza toate datele necesare!!!</strong>`;
        return;
    }else{
    response = await fetch(`https://magog-products.firebaseio.com/produse/.json`, {method:"post", body:JSON.stringify(obj)});
    document.querySelector("div.alert").classList.add("alert-success");
    document.querySelector("div.alert").classList.remove("d-none");
    document.querySelector("div.alert").innerHTML = `<strong>SUCCES</strong> produsul a fost adaugat in lista!`;
    form.reset();
    setTimeout(function(){ display(); }, 2000);
    }
  }

 /**
  * functia care aduce produse noi in lista
  */

 function addNewProductForm(){
    document.querySelector("#adminForm").setAttribute("onSubmit", "saveNewProduct(this, event)");
    document.querySelector("#adminTable").classList.add("d-none");
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
     if(obj.description === "" || obj.image === "" || obj.name === "" || obj.stoc === ""){
        document.querySelector("div.alert").classList.add("alert-danger");
        document.querySelector("div.alert").classList.remove("d-none");
        document.querySelector("div.alert").innerHTML = `<strong>Produsul nu poate fi modificat!</strong> Completeaza toate datele necesare!!!`;
         return;
     }else{
        response = await fetch(`https://magog-products.firebaseio.com/produse/${i}.json`, {method:"put", body:JSON.stringify(obj)});
        document.querySelector("div.alert").classList.add("alert-success");
        document.querySelector("div.alert").classList.remove("d-none");
        document.querySelector("div.alert").innerHTML = `<strong>Produsul</strong> a fost modificat cu succes!`;
        form.reset();
        setTimeout(function(){ adminFormReset(); }, 2000);
     }
 }

/**
 * Functia Edit Item - aduce datele produsului in formularul de editare
 */

 function editItem(i){
     document.querySelector("#adminTable").classList.add("d-none");
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
            <td><img src="${dataBase.produse[i].image}" alt="${dataBase.produse[i].name}" class="img-thumbnail"></td>
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
 * draw Pagina DETALII
 */

function drawProductDetails(){
    var str = "";
    var i = window.location.search.substring(4);
    str = `<div class="col-lg-6 col-xl-7 pt-4 order-2 order-lg-1">
        <img src="${dataBase.produse[i].image}" alt="${dataBase.produse[i].name}" class="img-thumbnail">
    </div>
    <div class="col-lg-6 col-xl-4 pt-4 order-1 order-lg-2 ml-lg-auto">
        <h2><strong>${dataBase.produse[i].name}</strong></h2><hr>
        <h3 class="text-base mb-1">About the product</h3>
        <p>${dataBase.produse[i].description}</p>
        <hr>
        <ul class="list-unstyled">
            <li><strong>Price:</strong> <i class="fas fa-dollar-sign"></i> ${dataBase.produse[i].price}</li>
            <li><strong>Stock:</strong> ${dataBase.produse[i].stoc} items.</li>
        </ul>
        <form onsubmit="addToCart('${i}', event)">
            <input name="count" type="number" value="1" class="btn detail-quantity" min="1" max="${dataBase.produse[i].stoc}">
            <input type="submit" value="Add to Cart" class="btn btn-secondary">
        </form>
    </div>`;
    document.querySelector("div.row").innerHTML = str;
}

/**
 * draw Lista de Produse
 */

function drawProductList(){
    var str = "";
    for(var i in dataBase.produse){
        str += `<div class="col-xl-2 col-lg-3 col-md-4 col-6">
        <div class="product">
            <div class="product-image">
                <img src="${dataBase.produse[i].image}" alt="${dataBase.produse[i].name}" class="img-thumbnail">
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
 * DRAW Cosul de Cumparaturi
 */
    
function drawCart(){
    var total = 0;
    var subtotal = 0;
    var str = "";
    var tableData = "";
    console.log(dataBase.cart);
    
    for(var i in dataBase.cart){
        var item = dataBase.cart[i].id;
        subtotal = (dataBase.cart[i].price * dataBase.cart[i].count).toFixed(2);
        total += Number(subtotal);
        tableData += `<tr>
            <th scope="row">${item}</th>
            <th><a href="${productPage}?id=${item}">${dataBase.cart[i].name}</a></th>
            <td>${dataBase.cart[i].price}$</td>
            <td><input type="number" value="${dataBase.cart[i].count}" min="0" max="${dataBase.produse[item].stoc}" onchange="more(this, '${i}')" class="form-control btn btn-light" required></td>
            <td>${subtotal}$</td>
            <td><a href="#" onclick="remove('${i}')" class="btn btn-link">Replace</a></td>
        </tr>`;
    }
        
    str=`<h2><strong>Shopping Cart</strong></h2>
    <form onsubmit="orderList(event)">
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
                ${tableData}
                </tbody>
            </table>
        </div>
        <hr>
        <ul class="list-unstyled">
            <li><strong>Numar produse:</strong>  ${size}</li>
            <li><strong>TVA:</strong> ${valoareTVA(total).toFixed(2)}$</li>
            <li><strong>Transport:</strong> 0$</li>
        </ul>
        <hr>
        <h3 class="text-important"><strong>Total:</strong> <small class="text-success">${(total + valoareTVA(total)).toFixed(2)}$</small></h3>
        <hr>
        <button type="submit" class="btn btn-primary">Trimite comanda</button>
    </form>`;
    document.querySelector("article").innerHTML = str;
}

/**
 * functia Trimite Comanda
 */

async function orderList(){
    event.preventDefault();
    for(var i in dataBase.cart){
        var j = dataBase.cart[i].id;
        var restStoc = dataBase.produse[j].stoc - dataBase.cart[i].count;
        if(size === 0){
            console.log(restStoc);
            return;
        }else{
            response = await fetch(`https://magog-products.firebaseio.com/produse/${j}/stoc/.json`,{method:"put", body:JSON.stringify(restStoc)});
            response = await fetch(`https://magog-products.firebaseio.com/cart/${i}/.json`,{method:"delete"});
            document.querySelector("div.alert").classList.add("alert-success");
            document.querySelector("div.alert").classList.remove("d-none");
            document.querySelector("div.alert").innerHTML = `<strong>Comanda</strong> a fost trimisa cu succes!`;
            setTimeout(function(){ display(); }, 2000);
        }
        if(restStoc === 0){
            response = await fetch(`https://magog-products.firebaseio.com/produse/${j}/.json`,{method:"delete"});
        }
    }
}

function valoareTVA(pere){
  return (19/100) * pere;
}

/**
 * Functia care aduce produse in cos sau scoate produsul atunci cand valoarea e ZERO
 */

async function more(el, produs){
    console.log(el.classList);
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
    let response = await fetch("https://magog-products.firebaseio.com/cart/.json");
    window.dataBase.cart = await response.json();

    let quantity = Number(document.querySelector("[name='count']").value);
    let produs = new Produs(i, dataBase.produse[i].stoc, dataBase.produse[i].name, dataBase.produse[i].price, quantity);
    if(dataBase.cart === null){
        response = await fetch("https://magog-products.firebaseio.com/cart/.json",{method:"post", body:JSON.stringify(produs)});
        document.querySelector("div.alert").classList.add("alert-success");
        document.querySelector("div.alert").classList.remove("d-none");
        document.querySelector("div.alert").innerHTML = `<strong>${dataBase.produse[i].name}</strong> a fost adaugat in cos!`;
        setTimeout(function(){ display(); }, 2000);
    }else{
        for(let item in dataBase.cart){
            if(dataBase.cart[item].id === i){
                if(quantity + dataBase.cart[item].count <= dataBase.produse[i].stoc){
                    quantity += dataBase.cart[item].count;
                    console.log(quantity);
                    response = await fetch(`https://magog-products.firebaseio.com/cart/${item}/count/.json`,{method:"put", body:JSON.stringify(quantity)});
                    document.querySelector("div.alert").classList.add("alert-success");
                    document.querySelector("div.alert").classList.remove("d-none");
                    document.querySelector("div.alert").innerHTML = `<strong>${dataBase.produse[i].name}</strong> a fost adaugat in cos!`;
                    setTimeout(function(){ display(); }, 2000);
                }else{
                    document.querySelector("div.alert").classList.add("alert-danger");
                    document.querySelector("div.alert").classList.remove("d-none");
                document.querySelector("div.alert").innerHTML = `Ai deja in cos ${dataBase.cart[item].count} produse <strong>${dataBase.produse[i].name}</strong> Mai poti adauga doar ${dataBase.produse[i].stoc - dataBase.cart[item].count} produse.`;
                }
                return;
            }
        }
    }
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
    console.log("draw...");
    var response = await fetch("https://magog-products.firebaseio.com/.json");
    window.dataBase = await response.json();
    var str = "";
    str = `${main}`;
    document.querySelector("main").innerHTML = str;
/**
 * Randeaza Lista Produse in Home
 */
    if(document.location.pathname === homePage || document.location.pathname === "/" || document.location.pathname === "/ai-mag/"){
        document.querySelector("header").insertAdjacentHTML("afterend",`${bootstrapSlideShow}`);
        drawProductList();
/**
 * Randeaza pagina DETALII
 */
    }else if(window.location.href.indexOf(productPage) > -1){
        document.querySelector("article h2 > strong").innerHTML = "The Product Page";
        drawProductDetails();
/**
 * Randeaza pagina COS (CART PAGE)
 */
    }else if(window.location.pathname === cartPage){
        cartItemsNumber();
        drawCart();
        hideNull();
        formValidation();

/**
 * Randeaza pagina de ADMIN
 */

    }else if(window.location.pathname === adminPage){
        str = `<h2><strong>Admin Page</strong><small class="text-success"> - Edit, Add/Remove</small></h2>
        <hr>
        <div id="adminTable" class="table-responsive-sm">
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
        <section class="container w-50 p-3 d-none">
            <h2><strong>Add/Edit New Products in The Store</strong></h2>
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
        </section>`;
        document.querySelector("article").innerHTML = str;
        drawAdminPage();
    }
}
