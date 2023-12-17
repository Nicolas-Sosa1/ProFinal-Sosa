

// Zona new products (cambiar de imagen al pasar el cursor)

document.querySelectorAll('.product-card').forEach((card) => {
    const carousel = card.querySelector('.carousel');

    card.addEventListener('mouseenter', async () => {
        if (carousel) {       
            await new Promise((resolve) => setTimeout(resolve, 200)); 
            new bootstrap.Carousel(carousel).next();
        }
    });

    card.addEventListener('mouseleave', async () => {
        if (carousel) {  
            await new Promise((resolve) => setTimeout(resolve, 200)); 
            const carouselInstance = new bootstrap.Carousel(carousel);
            carouselInstance.to(0);
        }
    });
});
  





//Zona de iniciarSesion

const enlaceInicioSesion = document.getElementById('iniciar-sesion');
let usuarioIniciado = false;
function mostrarVentanaEmergente() {
    if (!usuarioIniciado) {
      Swal.fire({
        title: '<img src="../IMG/logo_negro.png" style="width: 100px; height: auto; display: block; margin: 0 auto;">',
        html:
          '<div style="margin: 0 auto; text-align: left; width: 80%;">' +
            '<label for="nombre-usuario">Nombre de Usuario:</label>' +
            '<input type="text" id="nombre-usuario" required style="margin-bottom: 10px; display: block; width: 100%;">' +
            '<label for="contrasena">Contraseña:</label>' +
            '<input type="password" id="contrasena" required style="margin-bottom: 10px; display: block; width: 100%;">' +
          '</div>' +
          '<p id="mensaje-error" class="mensaje-error"></p>',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Iniciar Sesión',
        cancelButtonText: 'Cancelar',
        preConfirm: () => {
          const nombreUsuario = document.getElementById('nombre-usuario').value;
          const contrasena = document.getElementById('contrasena').value;
          const isValid = validarInicioSesion(nombreUsuario, contrasena);
  
          if (!isValid) {
            Swal.showValidationMessage('Debes llenar ambos campos');
          }
  
          return { nombreUsuario, contrasena, isValid };
        },
        customClass: {
          popup: 'custom-swal',
          confirmButton: 'custom-swal-confirm',
          cancelButton: 'custom-swal-cancel',
        },
      }).then((result) => {
        if (result.isConfirmed && result.value.isValid) {
          const nombreUsuario = result.value.nombreUsuario;
          mostrarNombreEnIcono(nombreUsuario);
          usuarioIniciado = true;
          actualizarOpcionesInicioSesion();
          Swal.fire({
            title: '¡Inicio de sesión exitoso!',
            icon: 'success',
            confirmButtonColor: 'black',
            confirmButtonText: 'OK',
            customClass: {
              confirmButton: 'custom-swal-confirm-hover',
            },
          });
        } else if (result.dismiss === Swal.DismissReason.cancel || result.dismiss === Swal.DismissReason.close) {
          Swal.fire({
            title: '¡No has podido iniciar sesión!',
            text: 'Inténtalo de nuevo.',
            icon: 'error',
            confirmButtonColor: 'black',
            confirmButtonText: 'OK',
            customClass: {
              confirmButton: 'custom-swal-confirm-hover',
            },
          });
        }
      });
    }
  }
  
  


function validarInicioSesion(nombreUsuario, contrasena) {
    const mensajeError = document.getElementById('mensaje-error');
  
    if (nombreUsuario.trim() === '' || contrasena.trim() === '') {
      mensajeError.textContent = 'Debes llenar ambos campos';
      return false;
    }
  
    const nombreUsuarioRegex = /^[a-zA-Z]+$/;
    if (!nombreUsuarioRegex.test(nombreUsuario)) {
      mensajeError.textContent = 'El nombre de usuario solo debe contener letras';
      return false;
    }
  
    if (contrasena.includes(' ')) {
      mensajeError.textContent = 'La contraseña no puede contener espacios';
      return false;
    }
  
    mensajeError.textContent = '';
    return true;
  }
  

enlaceInicioSesion.addEventListener('click', mostrarVentanaEmergente);

function cerrarSesion() {
  usuarioIniciado = false;
  actualizarOpcionesInicioSesion();
  Swal.fire('¡Sesión cerrada!', '', 'success');
}

document.getElementById('cerrar-sesion').addEventListener('click', cerrarSesion);

function mostrarNombreEnIcono(nombreUsuario) {
  const nombreUsuarioSpan = document.getElementById('nombre-usuario-span');
  nombreUsuarioSpan.textContent = ` ${nombreUsuario}`;
  document.getElementById('sesion-iniciada').style.display = 'flex';
}

function actualizarOpcionesInicioSesion() {
  const iniciarSesionElement = document.getElementById('iniciar-sesion');
  const cerrarSesionElement = document.getElementById('cerrar-sesion');
  const sesionIniciadaElement = document.getElementById('sesion-iniciada');

  if (usuarioIniciado) {
    iniciarSesionElement.style.display = 'none';
    cerrarSesionElement.style.display = 'block';
    sesionIniciadaElement.style.display = 'flex';
  } else {
    iniciarSesionElement.style.display = 'block';
    cerrarSesionElement.style.display = 'none';
    sesionIniciadaElement.style.display = 'none';
  }
}

function cerrarSesion() {
  usuarioIniciado = false;

  document.getElementById('nombre-usuario').value = '';
  document.getElementById('contrasena').value = '';

  enlaceInicioSesion.innerHTML = '<i class="fas fa-user"></i> Iniciar Sesión';
  document.getElementById('sesion-iniciada').style.display = 'none';
  document.getElementById('cerrar-sesion').style.display = 'none';
  document.getElementById('iniciar-sesion').style.display = 'block';
}

enlaceInicioSesion.addEventListener('click', mostrarVentanaEmergente);

document.getElementById('cerrar-sesion').addEventListener('click', cerrarSesion);

actualizarOpcionesInicioSesion();




  


//Zona de carrito

document.addEventListener("DOMContentLoaded", function () {
    const productos = [
        { id: 1, nombre: "Remera Hustlers Calavera", precio: 11, imagen: "IMG/fuego-calavera.png" },
        { id: 2, nombre: "Remera Hustlers The City", precio: 11, imagen: "IMG/remera-verde.png" },
        { id: 3, nombre: "Remera Hustlers Vesrion 2.0", precio: 10, imagen: "IMG/calavera-simple1.png" },
        { id: 4, nombre: "HOODIE SS 5 HOLES", precio: 45, imagen: "IMG/buzo1(1).jpg" },
        { id: 5, nombre: "THE BLACKSHEEP 2", precio: 50, imagen: "IMG/buzo2(1).jpg" },
        { id: 6, nombre: "HOODIE PLG666", precio: 45, imagen: "IMG/buzo3(1).jpg" },
        { id: 7, nombre: "JOGGING TRAPSTAR 1", precio: 20, imagen: "IMG/pantalon1(1).jpg" },
        { id: 8, nombre: "Jogging Trapstar 3", precio: 20, imagen: "IMG/pantalon2(1).jpg" },
        { id: 9, nombre: "JOGGING TRAPSTAR 2", precio: 38, imagen: "IMG/pantalon3(1).jpg" },
        { id: 10, nombre: "MANGA LARGA CAPAS TRAPSTAR 2", precio: 20, imagen: "IMG/remera-larga1(1).png" },
        { id: 11, nombre: "REMERA TRAPSTAR 3", precio: 23, imagen: "IMG/remera-larga2(1).png" },
        { id: 12, nombre: "MANGA LARGA CAPAS TRAPSTAR 3", precio: 20, imagen: "IMG/remera-larga3(1).png" },
    ];

    const endpointBTC = 'https://api.binance.com/api/v3/ticker/price';
    let datosBTC;

    fetch(endpointBTC)
        .then((respuesta) => respuesta.json())
        .then((datos) => {
            datosBTC = datos;
            carrito = obtenerCarritoDesdeLocalStorage();
            actualizarCarrito();
            agregarPrecioEnBTC();
        })
        .catch((e) => console.log(e));

    function obtenerPrecioEnBTC(precioUSD) {
        const precioBTC = (precioUSD / datosBTC.find((dato) => dato.symbol === 'BTCUSDT').price).toFixed(8);
        return precioBTC;
    }

    function agregarPrecioEnBTC() {
        const productosConPrecioBTC = productos.map((producto) => {
            const precioBTC = obtenerPrecioEnBTC(producto.precio);
            return { ...producto, precioBTC };
        });

        document.querySelectorAll(".product-price-btc").forEach((element, index) => {
            element.textContent = `$${productosConPrecioBTC[index].precioBTC} BTC`;
        });
    }

    let carrito = obtenerCarritoDesdeLocalStorage();
    const carritoLista = document.getElementById("carrito-lista");
    const totalElemento = document.getElementById("total");
    const carritoSection = document.getElementById("carrito");
    const cartCountElement = document.getElementById("cart-count");

    actualizarCarrito();

    function obtenerCarritoDesdeLocalStorage() {
        const carritoGuardado = localStorage.getItem('carrito');
        return carritoGuardado ? JSON.parse(carritoGuardado) : [];
    }

    function guardarCarritoEnLocalStorage() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function eliminarSeccionDelCarrito(id) {
        carrito = carrito.filter((producto) => producto.id !== id);
        actualizarCarrito();
        mostrarCarrito();
    }

    function eliminarUnidadDelCarrito(index) {
        const id = carrito[index].id;
        eliminarSeccionDelCarrito(id);
    }

    function actualizarCarrito() {
        carritoLista.innerHTML = "";
        let total = 0;

        if (carrito.length === 0) {
            carritoLista.innerHTML = '<p>Carrito vacío</p>';
            totalElemento.textContent = '0.00';
        } else {
            carrito.forEach((producto, index) => {
                const productoEnLista = productos.find((p) => p.id === producto.id);
                total += productoEnLista.precio * producto.cantidad;

                const productoElemento = document.createElement("div");
                productoElemento.classList.add("carrito-item", "d-flex");
                productoElemento.innerHTML = `
                    <img src="${productoEnLista.imagen}" alt="${productoEnLista.nombre}" class="carrito-imagen" style="height: 100px;">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title carrito-nombre">${productoEnLista.nombre}</h5>
                        <p class="card-text carrito-precio">$${productoEnLista.precio.toFixed(2)} x ${producto.cantidad}</p>
                        <div class="btn-group" role="group">
                            <button class="btn btn-secondary btn-manage-quantity" data-index="${index}" data-action="decrease">-</button>
                            <button class="btn btn-secondary btn-manage-quantity" data-index="${index}" data-action="increase">+</button>
                        </div>
                        <button class="btn btn-danger remove-from-cart" data-index="${index}">Eliminar</button>
                    </div>
                `;
                carritoLista.appendChild(productoElemento);
            });

            totalElemento.textContent = total.toFixed(2);
        }

        cartCountElement.textContent = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);

        guardarCarritoEnLocalStorage();
    }

    function manejarCantidad(index, action) {
        const producto = carrito[index];
        switch (action) {
            case "increase":
                producto.cantidad++;
                break;
            case "decrease":
                if (producto.cantidad > 1) {
                    producto.cantidad--;
                }
                break;
        }
        actualizarCarrito();
    }

    function agregarAlCarrito(id) {
        const productoExistente = carrito.find((producto) => producto.id === id);

        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            carrito.push({ id, cantidad: 1 });
        }

        actualizarCarrito();
        mostrarCarrito();
    }

    function mostrarCarrito() {
        carritoSection.classList.add("show-cart");
    }

    function cerrarCarrito() {
        carritoSection.classList.remove("show-cart");
    }

    document.getElementById("cart-icon").addEventListener("click", function () {
        carritoSection.classList.toggle("show-cart");
    });

    document.querySelectorAll(".add-to-cart").forEach((button, index) => {
        button.addEventListener("click", () => {
            agregarAlCarrito(productos[index].id);
        });
    });

    document.getElementById("btn-cerrar-carrito").addEventListener("click", cerrarCarrito);

    document.getElementById("vaciar-carrito").addEventListener("click", function () {
        carrito.length = 0;
        actualizarCarrito();
    });

    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("remove-from-cart")) {
            const index = event.target.dataset.index;
            eliminarUnidadDelCarrito(index);
        }

        if (event.target.classList.contains("btn-manage-quantity")) {
            const index = event.target.dataset.index;
            const action = event.target.dataset.action;
            manejarCantidad(index, action);
        }
    });
});
