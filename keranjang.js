// Mendapatkan elemen-elemen penting
const cartItemsContainer = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
const emptyMessage = document.getElementById('empty-message');

// Fungsi untuk memperbarui tampilan keranjang
function updateCartDisplay() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartItemsContainer.innerHTML = ''; // Kosongkan kontainer item
    let totalPrice = 0;

    if (cart.length > 0) {
        emptyMessage.style.display = 'none';
        cart.forEach((item, index) => {
            totalPrice += item.price * item.quantity;
            // Buat elemen untuk setiap item
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <span>${item.name} - Rp${item.price.toLocaleString()} x ${item.quantity}</span>
                <div>
                    <button class="quantity-btn" onclick="decreaseQuantity(${index})">-</button>
                    <button class="quantity-btn" onclick="increaseQuantity(${index})">+</button>
                    <button class="remove-btn" onclick="removeItem(${index})">Hapus</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
        totalPriceElement.textContent = `Total Harga: Rp${totalPrice.toLocaleString()}`;
    } else {
        emptyMessage.style.display = 'block';
        totalPriceElement.textContent = '';
    }
}

// Fungsi untuk menambahkan item ke keranjang
function addToCart(item) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = cart.findIndex(cartItem => cartItem.name === item.name);
    
    if (existingItemIndex !== -1) {
        // Jika item sudah ada, tambahkan quantity
        cart[existingItemIndex].quantity += 1;
    } else {
        // Jika item belum ada, tambahkan sebagai item baru
        cart.push({ ...item, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// Fungsi untuk menghapus item dari keranjang
function removeItem(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); // Hapus item berdasarkan index
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// Fungsi untuk menambah quantity item
function increaseQuantity(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity += 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// Fungsi untuk mengurangi quantity item
function decreaseQuantity(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        removeItem(index); // Jika quantity 1 dan dikurangi, hapus item
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// Fungsi untuk menambahkan item contoh
function addExampleItem() {
    const exampleItem = { name: 'Whiskas Kitten, Dry Food, Mackerel 1.1kg', price: 59950 }; // Contoh item
    addToCart(exampleItem);
}

// Tampilkan keranjang saat halaman pertama kali dimuat
updateCartDisplay();
