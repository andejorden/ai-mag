var homePage = "/ai-mag/index.html";
var productPage = "/ai-mag/product-page.html";
var cartPage = "/ai-mag/cart.html";
var adminPage = "/ai-mag/admin.html";

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
      <img src="/ai-mag/img/slide01.jpg" alt="Los Angeles" width="1100" height="500">
    </div>
    <div class="carousel-item">
      <img src="/ai-mag/img/slide02.jpg" alt="Chicago" width="1100" height="500">
    </div>
    <div class="carousel-item">
      <img src="/ai-mag/img/slide03.jpg" alt="New York" width="1100" height="500">
    </div>
  </div>
  
  <!-- Left and right controls -->
  <a class="carousel-control-prev" href="#demo" data-slide="prev">
    <span class="carousel-control-prev-icon"></span>
  </a>
  <a class="carousel-control-next" href="#demo" data-slide="next">
    <span class="carousel-control-next-icon"></span>
  </a>
</div>
<hr>`;

var header = `<header class="mt-3 mb-3">
  <hgroup>
    <h1 class="text-success"><a href="index.html" class="card-link"><i class="fas fa-eye"></i> <strong>AI-Mag</strong></a> - <small>My First Online Shopping Cart</small></h1>
    <h2 class="text-info">The Final Project</h2>
    <h3>HTML5, Bootstrap & Javascript</h3>
  </hgroup>
  <hr>
  <nav>
      <button type="button" class="btn btn-primary" onclick="window.location.href='cart.html'"><i class="fas fa-shopping-cart"></i> Shopping Cart</button>
      <button type="button" class="btn btn-light"onclick="window.location.href='admin.html'"><i class="fas fa-lock"></i> Admin</button>
  </nav>
  <hr>
</header>`;

var footer = `<footer class="jumbotron text-center rounded">
  <div>
    <p><i class="fas fa-copyright"></i> <strong>AI Copyright</strong> - All rights reserved!</p>
  </div>
</footer>`;

var main = `<div class="alert w-100 position-fixed fixed-top rounded-0 text-center d-none"><strong>Success!</strong> Indicates a successful or positive action.</div>
<div class="container">
  ${header}
  <article>
    <h2><strong>The Product List</strong></h2>
    <hr>
    <div class="row"></div>
  </article>
  <hr>
  ${footer}
</div>`;
