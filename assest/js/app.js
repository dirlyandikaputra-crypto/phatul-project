// Data Katalog Produk
const PRODUCTS_DATA = [
  {
    id: 1,
    name: "Kemeja Oversized Linen Casual",
    category: "baju",
    price: 189000,
    originalPrice: 249000,
    rating: 4.8,
    reviews: 124,
    image: "assets/images/kemeja-linen.jpg",
    description: "Kemeja linen bergaya oversized yang sejuk dan nyaman untuk dipakai sehari-hari. Cocok untuk tampilan santai maupun semi-formal.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Beige", "Olive"],
    isNew: true,
    bestSeller: false
  },
  {
    id: 2,
    name: "Sneakers Streetwear Minimalis",
    category: "sepatu",
    price: 459000,
    originalPrice: 599000,
    rating: 4.9,
    reviews: 210,
    image: "assets/images/sneakers-streetwear.jpg",
    description: "Sneakers kulit sintetis premium dengan sol empuk. Desain bersih dan serbaguna untuk padu padan busana apapun.",
    sizes: ["39", "40", "41", "42", "43"],
    colors: ["White/Black", "Full White"],
    isNew: false,
    bestSeller: true
  },
  {
    id: 3,
    name: "Jaket Denim Vintage Classic",
    category: "baju",
    price: 329000,
    originalPrice: 399000,
    rating: 4.7,
    reviews: 89,
    image: "assets/images/jaket-denim.jpg",
    description: "Jaket denim tebal berkualitas tinggi dengan efek washing vintage. Tahan lama dan tak pernah ketinggalan zaman.",
    sizes: ["M", "L", "XL"],
    colors: ["Blue Wash", "Dark Blue"],
    isNew: false,
    bestSeller: false
  },
  {
    id: 4,
    name: "Sepatu Lari Slip-On Responsive",
    category: "sepatu",
    price: 389000,
    originalPrice: 489000,
    rating: 4.8,
    reviews: 156,
    image: "assets/images/sepatu-lari.jpg",
    description: "Sepatu olahraga ringan dengan bantalan responsif. Ideal untuk joging harian maupun aktivitas berintensitas tinggi.",
    sizes: ["38", "39", "40", "41", "42", "43"],
    colors: ["Red/White", "All Black"],
    isNew: true,
    bestSeller: true
  },
  {
    id: 5,
    name: "Kaos Polo Cotton Pique",
    category: "baju",
    price: 129000,
    originalPrice: 169000,
    rating: 4.6,
    reviews: 78,
    image: "assets/images/kaos-polo.jpg",
    description: "Kaos polo berbahan katun pique 100% yang menyerap keringat dengan baik. Tampil rapi tanpa mengorbankan kenyamanan.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Navy", "Black", "Maroon"],
    isNew: false,
    bestSeller: false
  },
  {
    id: 6,
    name: "Sepatu Loafers Kulit Formal",
    category: "sepatu",
    price: 529000,
    originalPrice: 699000,
    rating: 4.9,
    reviews: 95,
    image: "assets/images/sepatu-loafers.jpg",
    description: "Loafers elegan dari bahan kulit asli. Pilihan sempurna untuk acara formal, kantor, maupun gaya smart-casual.",
    sizes: ["40", "41", "42", "43", "44"],
    colors: ["Brown", "Black"],
    isNew: true,
    bestSeller: false
  },
  {
    id: 7,
    name: "Hoodie Fleece Essential Minimalis",
    category: "baju",
    price: 249000,
    originalPrice: 299000,
    rating: 4.9,
    reviews: 310,
    image: "assets/images/hoodie-fleece.jpg",
    description: "Hoodie hangat dari bahan cotton fleece tebal dan lembut. Dilengkapi kantong kangguru dan tali serut tahan lama.",
    sizes: ["M", "L", "XL"],
    colors: ["Grey", "Black", "Sage Green"],
    isNew: false,
    bestSeller: true
  },
  {
    id: 8,
    name: "Sepatu High-Top Canvas Retro",
    category: "sepatu",
    price: 299000,
    originalPrice: 379000,
    rating: 4.7,
    reviews: 142,
    image: "assets/images/sepatu-canvas.jpg",
    description: "Sepatu kanvas model tinggi bergaya klasik retro. Sol karet fleksibel dengan daya cengkeram kuat.",
    sizes: ["37", "38", "39", "40", "41", "42"],
    colors: ["Black/White", "Navy"],
    isNew: false,
    bestSeller: false
  }
];

// State Aplikasi
let currentCategory = 'all';
let currentSearch = '';
let currentSort = 'featured';
let cart = [];

// Helper Formatting
const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(number);
};

// Elements DOM
const productGrid = document.getElementById('product-grid');
const emptyState = document.getElementById('empty-state');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');
const cartBadge = document.getElementById('cart-badge');
const cartDrawerCount = document.getElementById('cart-drawer-count');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartTotalPrice = document.getElementById('cart-total-price');
const cartDrawer = document.getElementById('cart-drawer');
const productModal = document.getElementById('product-modal');
const modalContent = document.getElementById('modal-content');

// Toast Notification
function showToast(message) {
  toastMessage.textContent = message;
  toast.classList.remove('hidden');
  toast.classList.add('flex');
  setTimeout(() => {
    toast.classList.add('hidden');
    toast.classList.remove('flex');
  }, 3000);
}

// Render Produk
function renderProducts() {
  let filtered = PRODUCTS_DATA.filter(p => {
    const matchCategory = currentCategory === 'all' || p.category === currentCategory;
    const matchSearch = p.name.toLowerCase().includes(currentSearch.toLowerCase()) ||
                        p.description.toLowerCase().includes(currentSearch.toLowerCase());
    return matchCategory && matchSearch;
  });

  filtered.sort((a, b) => {
    if (currentSort === 'price-low') return a.price - b.price;
    if (currentSort === 'price-high') return b.price - a.price;
    if (currentSort === 'rating') return b.rating - a.rating;
    return b.id - a.id;
  });

  if (filtered.length === 0) {
    productGrid.innerHTML = '';
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');
  productGrid.innerHTML = filtered.map(p => `
    <div class="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group">
      <div class="relative aspect-square overflow-hidden bg-slate-100 cursor-pointer" onclick="openProductModal(${p.id})">
        <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div class="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          ${p.isNew ? `<span class="bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">Baru</span>` : ''}
          ${p.bestSeller ? `<span class="bg-amber-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">Terlaris</span>` : ''}
        </div>
      </div>
      <div class="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between text-xs mb-2">
            <span class="font-semibold text-indigo-600 uppercase tracking-wider text-[10px]">${p.category}</span>
            <div class="flex items-center space-x-1 text-amber-500">
              <i class="fa-solid fa-star text-xs"></i>
              <span class="font-bold text-slate-700">${p.rating}</span>
              <span class="text-slate-400">(${p.reviews})</span>
            </div>
          </div>
          <h3 onclick="openProductModal(${p.id})" class="font-bold text-slate-900 text-base hover:text-indigo-600 transition-colors line-clamp-2 cursor-pointer mb-2">${p.name}</h3>
        </div>
        <div class="pt-4 border-t border-slate-100 mt-3 flex items-center justify-between gap-2">
          <div>
            <div class="text-xs text-slate-400 line-through">${formatRupiah(p.originalPrice)}</div>
            <div class="text-lg font-extrabold text-slate-900">${formatRupiah(p.price)}</div>
          </div>
          <button onclick="addToCart(${p.id})" class="bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white p-3 rounded-xl transition-all duration-200">
            <i class="fa-solid fa-cart-plus text-base"></i>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// Keranjang Belanja
function addToCart(productId, size = null, color = null) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  const selectedSize = size || product.sizes[0];
  const selectedColor = color || product.colors[0];
  const cartItemId = `${product.id}-${selectedSize}-${selectedColor}`;

  const existingIndex = cart.findIndex(item => item.cartItemId === cartItemId);
  if (existingIndex > -1) {
    cart[existingIndex].quantity += 1;
  } else {
    cart.push({ ...product, cartItemId, selectedSize, selectedColor, quantity: 1 });
  }

  updateCartUI();
  showToast(`"${product.name}" ditambahkan ke keranjang!`);
}

function updateQuantity(cartItemId, delta) {
  const item = cart.find(i => i.cartItemId === cartItemId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter(i => i.cartItemId !== cartItemId);
  }
  updateCartUI();
}

function removeFromCart(cartItemId) {
  cart = cart.filter(i => i.cartItemId !== cartItemId);
  updateCartUI();
  showToast("Produk dihapus dari keranjang.");
}

function updateCartUI() {
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (totalCount > 0) {
    cartBadge.textContent = totalCount;
    cartBadge.classList.remove('hidden');
    cartBadge.classList.add('flex');
  } else {
    cartBadge.classList.add('hidden');
    cartBadge.classList.remove('flex');
  }

  cartDrawerCount.textContent = totalCount;
  cartTotalPrice.textContent = formatRupiah(totalPrice);

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="text-center py-16">
        <i class="fa-solid fa-cart-flatbed text-4xl text-slate-300 mb-3"></i>
        <p class="text-slate-500 font-medium text-sm">Keranjang Anda masih kosong</p>
      </div>
    `;
    return;
  }

  cartItemsContainer.innerHTML = cart.map(item => `
    <div class="flex space-x-4 p-3 bg-slate-50 rounded-2xl border border-slate-100 relative">
      <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded-xl bg-slate-200" />
      <div class="flex-1 flex flex-col justify-between">
        <div>
          <h4 class="font-bold text-slate-900 text-sm line-clamp-1">${item.name}</h4>
          <p class="text-xs text-slate-500 mt-0.5">Ukuran: ${item.selectedSize}</p>
        </div>
        <div class="flex items-center justify-between mt-2">
          <span class="font-extrabold text-slate-900 text-sm">${formatRupiah(item.price)}</span>
          <div class="flex items-center border border-slate-200 rounded-lg bg-white">
            <button onclick="updateQuantity('${item.cartItemId}', -1)" class="px-2 py-1 text-slate-600 text-xs"><i class="fa-solid fa-minus"></i></button>
            <span class="px-2 text-xs font-bold text-slate-800">${item.quantity}</span>
            <button onclick="updateQuantity('${item.cartItemId}', 1)" class="px-2 py-1 text-slate-600 text-xs"><i class="fa-solid fa-plus"></i></button>
          </div>
        </div>
      </div>
      <button onclick="removeFromCart('${item.cartItemId}')" class="text-slate-400 hover:text-rose-500 p-1 self-start">
        <i class="fa-solid fa-trash-can text-xs"></i>
      </button>
    </div>
  `).join('');
}

// Modal Detail Produk
function openProductModal(productId) {
  const p = PRODUCTS_DATA.find(prod => prod.id === productId);
  if (!p) return;

  modalContent.innerHTML = `
    <div class="aspect-square bg-slate-100">
      <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover" />
    </div>
    <div class="p-6 flex flex-col justify-between">
      <div>
        <span class="text-xs font-bold text-indigo-600 uppercase tracking-wider">${p.category}</span>
        <h2 class="text-xl font-bold text-slate-900 mt-1 mb-2">${p.name}</h2>
        <p class="text-xs text-slate-600 leading-relaxed mb-6">${p.description}</p>
        
        <div class="mb-4">
          <label class="block text-xs font-semibold text-slate-700 mb-2">Ukuran:</label>
          <div class="flex flex-wrap gap-2">
            ${p.sizes.map(size => `<span class="px-3 py-1.5 border border-slate-200 text-slate-700 rounded-lg text-xs font-medium">${size}</span>`).join('')}
          </div>
        </div>
      </div>

      <div>
        <div class="text-xl font-extrabold text-slate-900 mb-4">${formatRupiah(p.price)}</div>
        <button onclick="addToCart(${p.id}); closeProductModal();" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow-lg transition-all text-sm flex items-center justify-center space-x-2">
          <i class="fa-solid fa-cart-plus"></i>
          <span>Tambah ke Keranjang</span>
        </button>
      </div>
    </div>
  `;
  productModal.classList.remove('hidden');
}

function closeProductModal() {
  productModal.classList.add('hidden');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartUI();

  // Search
  const handleSearch = (e) => {
    currentSearch = e.target.value;
    renderProducts();
  };
  document.getElementById('search-input-desktop').addEventListener('input', handleSearch);
  document.getElementById('search-input-mobile').addEventListener('input', handleSearch);

  // Sorting
  document.getElementById('sort-select').addEventListener('change', (e) => {
    currentSort = e.target.value;
    renderProducts();
  });

  // Category Tabs
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.category-btn').forEach(b => {
        b.className = 'category-btn px-5 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap flex items-center space-x-2 bg-white text-slate-600 hover:bg-slate-100 border border-slate-200';
      });

      const button = e.currentTarget;
      button.className = 'category-btn active-tab px-5 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap flex items-center space-x-2 bg-slate-900 text-white shadow-md';
      
      currentCategory = button.getAttribute('data-category');
      renderProducts();
    });
  });

  // Hero Quick Filter
  document.getElementById('btn-hero-baju').addEventListener('click', () => {
    document.querySelector('[data-category="baju"]').click();
  });
  document.getElementById('btn-hero-sepatu').addEventListener('click', () => {
    document.querySelector('[data-category="sepatu"]').click();
  });

  // Cart Drawer Events
  document.getElementById('open-cart-btn').addEventListener('click', () => cartDrawer.classList.remove('hidden'));
  document.getElementById('close-cart-btn').addEventListener('click', () => cartDrawer.classList.add('hidden'));
  document.getElementById('cart-overlay').addEventListener('click', () => cartDrawer.classList.add('hidden'));

  // Checkout
  document.getElementById('checkout-btn').addEventListener('click', () => {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Terima kasih! Pesanan senilai ${formatRupiah(total)} berhasil diproses.`);
    cart = [];
    updateCartUI();
    cartDrawer.classList.add('hidden');
  });

  // Modal Events
  document.getElementById('close-modal-btn').addEventListener('click', closeProductModal);
  document.getElementById('reset-filter-btn').addEventListener('click', () => {
    currentSearch = '';
    currentCategory = 'all';
    document.getElementById('search-input-desktop').value = '';
    document.getElementById('search-input-mobile').value = '';
    document.querySelector('[data-category="all"]').click();
  });
});