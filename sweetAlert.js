
document.addEventListener('DOMContentLoaded', function () {
    const buttonsAddToCart = document.querySelectorAll('.add-to-cart');

    buttonsAddToCart.forEach(function (button) {
        button.addEventListener('click', function () {
           
            const productId = button.getAttribute('data-product-id');

           
            addToCart(productId);

           
            Swal.fire({
                title: 'Producto agregado al carrito',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            });
        });
    });
});

function addToCart(productId) {
   
    const cartCountElement = document.getElementById('cart-count');
    const currentCount = parseInt(cartCountElement.textContent);
    const newCount = currentCount + 1;
    cartCountElement.textContent = newCount;

}

