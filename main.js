// Lista de pastas
const productos = [
  { id: 1, nombre: "HULK", descripcion: "fideos de espinaca, 100 gramos", precio: 5000, imagen: "imagenes/hulk.jpg" },
  { id: 2, nombre: "IRON MAN", descripcion: "fideos de morrón, 100 gramos", precio: 5000, imagen: "imagenes/ironman.jpg" },
  { id: 3, nombre: "VECTOR", descripcion: "fideos de zanahoria, 100 gramos", precio: 5000, imagen: "imagenes/vector.jpg" },
  { id: 4, nombre: "MINIONS", descripcion: "fideos al huevo, 100 gramos", precio: 5000, imagen: "imagenes/minions.jpg" },
  { id: 5, nombre: "SORRENTINOS B", descripcion: "sorrentinos de bondiola braseada, 16 unidades", precio: 8000, imagen: "imagenes/sorrentino.jpg" },
  { id: 6, nombre: "SORRENTINOS EM", descripcion: "sorrentinos de espinaca y mozzarella, 16 unidades", precio: 8000, imagen: "imagenes/sorrentino.jpg" },
  { id: 7, nombre: "SORRENTINOS PR", descripcion: "sorrentinos de panceta y ricota, 16 unidades", precio: 8000, imagen: "imagenes/sorrentino.jpg" },
  { id: 8, nombre: "SORRENTINOS JM", descripcion: "sorrentinos de jamón crudo y mozzarella, 16 unidades", precio: 8000, imagen: "imagenes/sorrentino.jpg" }
];

// DOM
const contenedorProductos = document.getElementById("productos");
const contenedorCarrito = document.getElementById("carrito");

// Carrito del localStorage o iniciarlo vacío
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Mostrar productos
productos.forEach(p => {
  const div = document.createElement("div");
  div.className = "producto";
  div.innerHTML = `
    <img src="${p.imagen}" alt="${p.nombre}" class="imagen-producto">
    <h3>${p.nombre}</h3>
    <p>${p.descripcion}</p>
    <p>Precio: $${p.precio}</p>
    <button onclick="agregar(${p.id})">Agregar</button>
  `;
  contenedorProductos.appendChild(div);
});

// Agregar producto al carrito
function agregar(id) {
  const prod = productos.find(p => p.id === id);
  carrito.push(prod);
  actualizarCarrito();
}

// Eliminar producto del carrito
function eliminar(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

// Actualizar carrito
function actualizarCarrito() {
  contenedorCarrito.innerHTML = "";

  if (carrito.length === 0) {
    contenedorCarrito.innerHTML = "<p>Carrito vacío</p>";
  } else {
    carrito.forEach((p, i) => {
      const div = document.createElement("div");
      div.className = "carrito-item";
      div.innerHTML = `
        <h4>${p.nombre}</h4>
        <p>${p.descripcion}</p>
        <p>$${p.precio}</p>
        <button onclick="eliminar(${i})">Eliminar</button>
      `;
      contenedorCarrito.appendChild(div);
    });

    // Botón Comprar
    const botonComprar = document.createElement("button");
    botonComprar.textContent = "Comprar";
    botonComprar.className = "boton-comprar";
    botonComprar.onclick = () => {
      alert("¡Gracias por tu compra!");
      carrito = [];
      actualizarCarrito();
    };
    contenedorCarrito.appendChild(botonComprar);
  }

  // Guardar carrito en localStorage
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Mostrar carrito al cargar
actualizarCarrito();
