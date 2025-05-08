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
const contenedorTotal = document.getElementById("total");

// Carrito del localStorage o iniciarlo vacío (ahora con cantidad)
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

document.addEventListener('DOMContentLoaded', () => {
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

  // Mostrar carrito al cargar
  actualizarCarrito();
});

// Agregar producto al carrito (maneja la cantidad)
function agregar(id) {
  const prodExistente = carrito.find(item => item.id === id);
  if (prodExistente) {
      prodExistente.cantidad++;
  } else {
      const prod = productos.find(p => p.id === id);
      if (prod) {
          carrito.push({ ...prod, cantidad: 1 });
      }
  }
  Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Producto agregado",
      showConfirmButton: false,
      timer: 1000
  });
  actualizarCarrito();
}

// Eliminar producto del carrito (elimina el item completo)
function eliminarProducto(index) {
  Swal.fire({
      title: "¿Quieres eliminar este producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar"
  }).then((result) => {
      if (result.isConfirmed) {
          carrito.splice(index, 1);
          actualizarCarrito();
          Swal.fire(
              'Eliminado!',
              'El producto ha sido eliminado del carrito.',
              'success'
          )
      }
  });
}

// Disminuir cantidad
function disminuirCantidad(index) {
  if (carrito[index].cantidad > 1) {
      carrito[index].cantidad--;
      actualizarCarrito();
  } else {
      eliminarProducto(index); // Si la cantidad es 1, eliminar el producto
  }
}

// Aumentar cantidad
function aumentarCantidad(index) {
  carrito[index].cantidad++;
  actualizarCarrito();
}

// Actualizar carrito
function actualizarCarrito() {
  const carritoElement = document.getElementById("carrito");
  const totalElement = document.getElementById("total");

  if (!carritoElement || !totalElement) {
      console.error("No se encontraron los elementos del carrito en el DOM.");
      return;
  }

  carritoElement.innerHTML = "";
  let precioTotalCarrito = 0;

  if (carrito.length === 0) {
      carritoElement.innerHTML = "<p>Carrito vacío</p>";
      totalElement.textContent = "";
      const botonComprarExistente = carritoElement.querySelector(".boton-comprar");
      if (botonComprarExistente) {
          botonComprarExistente.remove();
      }
  } else {
      carrito.forEach((item, index) => {
          const div = document.createElement("div");
          div.className = "carrito-item";
          div.innerHTML = `
              <h4>${item.nombre}</h4>
              <p class="carrito-item-descripcion">${item.descripcion}</p>
              <div class="carrito-item-details">
                  <div class="carrito-item-quantity">
                      <button onclick="disminuirCantidad(${index})">-</button>
                      <span>${item.cantidad}</span>
                      <button onclick="aumentarCantidad(${index})">+</button>
                  </div>
                  <p class="carrito-item-precio">$${item.precio * item.cantidad}</p>
                  <button class="carrito-item-eliminar" onclick="eliminarProducto(${index})"><i class="fas fa-trash-alt"></i></button>
              </div>
          `;
          carritoElement.appendChild(div);
          precioTotalCarrito += item.precio * item.cantidad;
      });

      const botonComprar = document.createElement("button");
      botonComprar.textContent = "Comprar";
      botonComprar.className = "boton-comprar";
      botonComprar.onclick = () => {
          Swal.fire({
              title: "Pedido realizado",
              html: "Su pedido ha sido registrado.<br>El pago se realizará en efectivo al recibir.",
              icon: "success",
              confirmButtonText: "Entendido"
          });
          // No vaciamos el carrito aquí para que el usuario vea su pedido
          // carrito = [];
          // actualizarCarrito();
      };
      carritoElement.appendChild(botonComprar);

      totalElement.textContent = `Precio total: $${precioTotalCarrito}`;
      totalElement.className = "total-carrito";
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Mostrar secciones (catálogo / quienes somos)
function mostrarSeccion(seccionId) {
  const secciones = document.querySelectorAll("main > section");
  secciones.forEach(seccion => {
      seccion.style.display = (seccion.id === seccionId) ? "block" : "none";
  });
}

// Mostrar contacto con SweetAlert2
function mostrarContacto() {
  Swal.fire({
      title: "Contacto",
      html: `<p><strong>Tel:</strong> 1158002948<br><strong>Email:</strong> ramirez.jesica2016@gmail.com</p>`,
      icon: "info",
      confirmButtonText: "Cerrar"
  });
}