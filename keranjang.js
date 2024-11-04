// Ambil keranjang dari localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update tampilan keranjang saat halaman dimuat
window.onload = updateCartDisplay;

// Fungsi untuk menambahkan item ke keranjang
function addExampleItem() {
    let product = {
        name: "Produk Contoh",
        price: 50000,
        quantity: 1
    };

    addToCart(product);
}

// Fungsi untuk menambahkan produk ke keranjang
function addToCart(product) {
    let existingProduct = cart.find(item => item.name === product.name);
    
    if (existingProduct) {
        existingProduct.quantity += product.quantity;
    } else {
        cart.push(product);
    }

    // Simpan keranjang ke localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update tampilan keranjang
    updateCartDisplay();
}

// Fungsi untuk memperbarui tampilan keranjang
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceContainer = document.getElementById('total-price');
    const emptyMessage = document.getElementById('empty-message');
    
    cartItemsContainer.innerHTML = ''; // Kosongkan item sebelumnya
    let totalPrice = 0;

    if (cart.length > 0) {
        emptyMessage.style.display = 'none'; // Sembunyikan pesan keranjang kosong

        cart.forEach((product, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            
            itemDiv.innerHTML = `
                <p>${product.name} - Rp. ${product.price.toLocaleString()} x ${product.quantity}</p>
                <button onclick="removeFromCart(${index})" class="bg-red-500 text-white px-2 py-1 rounded">Hapus</button>
            `;

            cartItemsContainer.appendChild(itemDiv);
            totalPrice += product.price * product.quantity;
        });

        totalPriceContainer.innerHTML = `<strong>Total: Rp. ${totalPrice.toLocaleString()}</strong>`;
    } else {
        emptyMessage.style.display = 'block'; // Tampilkan pesan keranjang kosong
    }
}

// Fungsi untuk menghapus produk dari keranjang
function removeFromCart(index) {
    cart.splice(index, 1);

    // Simpan perubahan ke localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update tampilan keranjang
    updateCartDisplay();
}
