const products = [
    { id: 1, name: "Camiseta Chica", price: 19.99, image: "../img/camisetaChica1.jpeg", sizes: ["S", "M", "L", "XL"] },
    { id: 2, name: "Camiseta Chica", price: 19.99, image: "../img/camisetaChica2.jpeg", sizes: ["S", "M", "L", "XL"] },
    { id: 3, name: "Camiseta Chica", price: 19.99, image: "../img/camisetaChica3.jpeg", sizes: ["S", "M", "L", "XL"] },
    { id: 4, name: "Camiseta Chica", price: 19.99, image: "../img/camisetaChica4.jpeg", sizes: ["S", "M", "L", "XL"] },
    { id: 5, name: "Camiseta Chico", price: 19.99, image: "../img/camisetaChico1.jpeg", sizes: ["S", "M", "L", "XL"] },
    { id: 6, name: "Camiseta Chico", price: 19.99, image: "../img/camisetaChico2.jpeg", sizes: ["S", "M", "L", "XL"] },
    { id: 7, name: "Camiseta Chico", price: 19.99, image: "../img/camisetaChico3.jpeg", sizes: ["S", "M", "L", "XL"] },
    { id: 8, name: "Pantalón", price: 39.99, image: "../img/pantalon.jpeg", sizes: ["28", "30", "32", "34"] },
    { id: 9, name: "Pantalón", price: 29.99, image: "../img/pantalonPirata.jpeg", sizes: ["28", "30", "32", "34"] },
    { id: 10, name: "Vestido", price: 59.99, image: "../img/vestido1.jpeg", sizes: ["38", "39", "40", "41", "42"] },
    { id: 11, name: "Vestido", price: 49.99, image: "../img/vestido2.jpeg", sizes: ["38", "39", "40", "41", "42"] },
    { id: 12, name: "Vestido", price: 39.99, image: "../img/vestido3.jpeg", sizes: ["38", "39", "40", "41", "42"] },
];

const productosContainer = document.getElementById('products');
const itemsCarrito = document.getElementById('cart-items');
const mostrarCarrito = document.getElementById('toggle-cart');
const carrito = document.getElementById('cart');
const totalCarrito = document.getElementById('cart-total');
const contador = document.getElementById('contador');


let cartProductos = [];

function renderizarProductos(){
    productosContainer.innerHTML = products.map((producto) => 
        `
        <div class="product-card">
            <img src="${producto.image}" alt="${producto.name}" />
            <h3>${producto.name}</h3>
            <p>${producto.price.toFixed(2)} €</p>
            <select id="size-${producto.id}">
                ${producto.sizes.map(size => `<option value="${size}">${size}</option>`)}
            </select>
            <button class="addProducto" data-id="${producto.id}">Añadir al carrito</button>
        </div>
        `
    ).join('');
    const btnAddCarritoList = document.querySelectorAll('.addProducto')
    btnAddCarritoList.forEach(btnAdd => {
        btnAdd.addEventListener('click', addCarrito)
    });
}

function addCarrito(e){
    const productoId = parseInt(e.target.getAttribute('data-id'))
    const productoComprado = products.find(producto => producto.id === productoId);
    const size = document.getElementById(`size-${productoComprado.id}`).value;
    cartProductos.push({...productoComprado, size});
    updateCarrito();
}

function updateCarrito(){
    itemsCarrito.innerHTML = cartProductos.map((item, index) => `
    <div class="cart-item">
        <p>${item.name} ${item.size}</p>
        <div class="detalleCarrito">
            <p>${item.price.toFixed(2)} €</p> 
            <button class="btnRemove" data-id="${index}">🗑</button>
        </div>
    </div>
    `).join('');

    const btnRemoveCarritoList = document.querySelectorAll('.btnRemove')
    btnRemoveCarritoList.forEach(btnAdd => {
        btnAdd.addEventListener('click', eliminarDelCarrito)
    });

    const total = cartProductos.reduce((sum, item) => sum + item.price, 0);
    totalCarrito.textContent = `Total ${total.toFixed(2)} €`;
    if(cartProductos.length === 0){
        contador.textContent = '';
    }else{
        contador.textContent = cartProductos.length;
    }
    guardarCarrito();
}

function eliminarDelCarrito(event){
    const indice = parseInt(event.target.getAttribute('data-id'))
    cartProductos.splice(indice, 1);
    updateCarrito();
}


function guardarCarrito(){
    localStorage.setItem('carrito', JSON.stringify(cartProductos));
}

function cargarCarrito(){
    const carritoGuardado = localStorage.getItem('carrito');
    if(carritoGuardado){
        cartProductos = JSON.parse(carritoGuardado);
        updateCarrito();
    }
}

mostrarCarrito.addEventListener("click", () => {
    carrito.classList.toggle("open");
})

renderizarProductos();
cargarCarrito();

