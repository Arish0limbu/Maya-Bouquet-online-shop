const bouquets = [
   {
    id: 1,
    name: "Rose Silk Elegance with Golden Ribbon",
    price: 1500,
    img: "goden.png",
    description: "Elegant arrangement of 24 premium silk roses with golden ribbon accents. Perfect for lasting elegance that never fades.",
    features: ["24 Silk Roses", "Golden Ribbon Wrap", "Premium Plastic Stems", "Long-lasting Design"]
  },
  {
    id: 2,
    name: "Spring Tulip Mix with Ribbon Bow",
    price: 1200,
    img: "spring.png",
    description: "Vibrant mix of 20 artificial tulips in spring colors with delicate ribbon bow. Brings timeless freshness to any space.",
    features: ["20 Plastic Tulips", "Ribbon Bow Decoration", "Fade-proof Colors", "Eco-friendly Packaging"]
  },
  {
    id: 3,
    name: "Sunflower Sunshine Collection",
    price: 1000,
    img: "sunfloer.png",
    description: "Bright artificial sunflower arrangement with 15 pieces. Radiates warmth and happiness with lasting golden beauty.",
    features: ["15 Silk Sunflowers", "Golden Petals", "Premium Stems", "Dust-resistant"]
  },
  {
    id: 4,
    name: "Orchid Luxury Premium Set",
    price: 2500,
    img: "https://i.imgur.com/zTtIYxL.jpeg",
    description: "Luxurious arrangement of 12 exotic artificial orchids in premium vase. The ultimate symbol of lasting elegance.",
    features: ["12 Silk Orchids", "Premium Vase Included", "Ribbon Details", "Professional Arrangement"]
  },
  {
    id: 5,
    name: "Cherry Blossom Dream with Pink Ribbon",
    price: 1100,
    img: "https://i.imgur.com/U5j6mzL.jpeg",
    description: "Delicate pink artificial blossoms combined with baby's breath and pink ribbon. Creates an ethereal atmosphere.",
    features: ["Pink Silk Blossoms", "Baby's Breath Filler", "Pink Ribbon Accent", "Elegant Vase"]
  },
  {
    id: 6,
    name: "Lavender Serenity Plastic Collection",
    price: 900,
    img: "https://i.imgur.com/kR8wXmQ.jpeg",
    description: "Soothing purple artificial lavender arrangement perfect for any room. Maintains its beauty forever without care.",
    features: ["Purple Plastic Lavender", "No Maintenance", "Eco Packaging", "Never Fades"]
  },
  {
    id: 7,
    name: "Gerbera Daisy Vibrant Mix",
    price: 1350,
    img: "https://i.imgur.com/pqL2nWK.jpeg",
    description: "Colorful mix of 20 artificial gerbera daisies with ribbon embellishments. Brings cheerfulness forever.",
    features: ["20 Silk Daisies", "Multi-color Mix", "Ribbon Bow Included", "Professional Quality"]
  },
  {
    id: 8,
    name: "White Lily Premium Arrangement",
    price: 1800,
    img: "https://i.imgur.com/E7xF3dD.jpeg",
    description: "Pure white silk lilies with elegant details. Perfect for weddings, anniversaries, and formal celebrations.",
    features: ["Premium White Lilies", "Hypoallergenic", "Luxury Vase", "Gift Wrap Included"]
  },
  {
    id: 9,
    name: "Peony Paradise Deluxe",
    price: 2200,
    img: "https://i.imgur.com/jMpQ9rS.jpeg",
    description: "Luxurious pink and red artificial peonies with ribbon details. Symbolizes lasting prosperity and beauty.",
    features: ["Silk Peonies", "Ribbon Embellishments", "Premium Packaging", "Eternal Beauty"]
  },
  {
    id: 10,
    name: "Carnation Celebration Bundle",
    price: 850,
    img: "https://i.imgur.com/tY4KnPx.jpeg",
    description: "Vibrant carnation mix in multiple colors with decorative ribbon. Economical yet beautiful permanent decoration.",
    features: ["25 Plastic Carnations", "Mixed Colors", "Ribbon Bow", "Budget Friendly"]
  }
];


let cart = [];
const list = document.getElementById("bouquetList");
const modal = document.getElementById("productModal");
const closeBtn = document.querySelector(".close-btn");
const cartCount = document.getElementById("cartCount");
const sidebar = document.querySelector(".sidebar");
const toggleSidebarBtn = document.getElementById("toggleSidebar");
const closeSidebarBtn = document.getElementById("closeSidebar");

// Sidebar toggle
toggleSidebarBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  sidebar.classList.toggle("active");
});

closeSidebarBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  sidebar.classList.remove("active");
});

// Close sidebar when clicking outside
document.addEventListener("click", (e) => {
  if (sidebar.classList.contains("active") && !sidebar.contains(e.target) && !toggleSidebarBtn.contains(e.target)) {
    sidebar.classList.remove("active");
  }
});

// Sidebar navigation
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    sidebar.classList.remove("active");
    const target = link.getAttribute("href");
    handleNavigation(target);
  });
});

function handleNavigation(target) {
  document.querySelectorAll(".content-section").forEach(sec => sec.style.display = "none");
  
  if (target === "#home") {
    document.getElementById("home").style.display = "block";
    window.scrollTo(0, 0);
  } else if (target === "#products") {
    document.getElementById("products").style.display = "block";
    window.scrollTo(0, 0);
  } else if (target === "#cart") {
    document.getElementById("cart-section").style.display = "block";
    loadCartModal();
    window.scrollTo(0, 0);
  } else if (target === "#contact") {
    document.getElementById("contact").style.display = "block";
    window.scrollTo(0, 0);
  } else if (target === "#about") {
    document.getElementById("about").style.display = "block";
    window.scrollTo(0, 0);
  }
}

// Render bouquets
bouquets.forEach((item) => {
  list.innerHTML += `
    <div class="card" onclick="openModal(${item.id})">
      <div class="card-image">
        <img src="${item.img}" alt="${item.name}">
      </div>
      <h3 class="card-name">${item.name}</h3>
      <p class="price-under">Rs. ${item.price}</p>
    </div>
  `;
});

// Open product modal
function openModal(id) {
  const product = bouquets.find(item => item.id === id);
  document.getElementById("modalImg").src = product.img;
  document.getElementById("modalName").textContent = product.name;
  document.getElementById("modalPrice").textContent = `Rs. ${product.price}`;
  document.getElementById("modalDesc").textContent = product.description;

  const featuresList = document.getElementById("features");
  featuresList.innerHTML = product.features.map(feature => `<li>${feature}</li>`).join('');

  document.getElementById("qtyInput").value = 1;
  document.getElementById("productId").value = id;
  updatePrice();

  modal.classList.add("show");
  document.body.style.overflow = "hidden";
}

// Close modal
closeBtn.addEventListener("click", () => {
  modal.classList.remove("show");
  document.body.style.overflow = "auto";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("show");
    document.body.style.overflow = "auto";
  }
});

// Update total price
function updatePrice() {
  const qty = parseInt(document.getElementById("qtyInput").value) || 1;
  const productId = parseInt(document.getElementById("productId").value);
  const product = bouquets.find(item => item.id === productId);
  const total = product.price * qty;
  document.getElementById("totalPrice").textContent = `Rs. ${total}`;
}

document.getElementById("qtyInput").addEventListener("change", updatePrice);
document.getElementById("qtyInput").addEventListener("input", updatePrice);

// Quantity controls
function increaseQty() {
  const input = document.getElementById("qtyInput");
  input.value = parseInt(input.value) + 1;
  updatePrice();
}

function decreaseQty() {
  const input = document.getElementById("qtyInput");
  if (parseInt(input.value) > 1) {
    input.value = parseInt(input.value) - 1;
    updatePrice();
  }
}

// Add to cart
function addToCart() {
  const qty = parseInt(document.getElementById("qtyInput").value);
  const productId = parseInt(document.getElementById("productId").value);
  const product = bouquets.find(item => item.id === productId);

  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.qty += qty;
  } else {
    cart.push({ ...product, qty });
  }

  updateCartCount();
  showNotification(`${qty} × ${product.name} added! 🎉`);
  modal.classList.remove("show");
  document.body.style.overflow = "auto";
}

// Show notification
function showNotification(message) {
  const popup = document.getElementById("popupBox");
  popup.textContent = message;
  popup.classList.add("show");

  setTimeout(() => {
    popup.classList.remove("show");
  }, 3000);
}

// Update cart count
function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  cartCount.textContent = count;
  cartCount.style.display = count > 0 ? "flex" : "none";
}

// Load cart display
function loadCartModal() {
  const cartContent = document.getElementById("cartContent");
  
  if (cart.length === 0) {
    cartContent.innerHTML = `
      <div class="empty-cart">
        <p>🛒 Your cart is empty</p>
        <p style="font-size: 0.9rem; color: #999;">Add some beautiful bouquets to get started!</p>
      </div>
    `;
    document.getElementById("checkoutBtn").style.display = "none";
    return;
  }

  let cartHTML = '<div class="cart-items">';
  let total = 0;
  
  cart.forEach((item, index) => {
    const subtotal = item.price * item.qty;
    total += subtotal;
    cartHTML += `
      <div class="cart-item">
        <img src="${item.img}" alt="${item.name}">
        <div class="item-details">
          <h4>${item.name}</h4>
          <p>Rs. ${item.price} × ${item.qty} = Rs. ${subtotal}</p>
        </div>
        <button class="remove-btn" onclick="removeFromCart(${index})">✕</button>
      </div>
    `;
  });
  
  cartHTML += '</div>';
  cartContent.innerHTML = cartHTML;
  
  document.getElementById("cartTotal").textContent = `Rs. ${total}`;
  document.getElementById("checkoutBtn").style.display = "block";
}

// Remove from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartCount();
  loadCartModal();
  showNotification("Item removed from cart");
}

// Checkout function
function checkout() {
  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }
  
  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  document.getElementById("checkoutModal").classList.add("show");
  document.getElementById("orderTotal").textContent = `Rs. ${total}`;
}

// Close checkout modal
document.getElementById("closeCheckout").addEventListener("click", () => {
  document.getElementById("checkoutModal").classList.remove("show");
});

// Proceed to payment
function proceedToPayment() {
  const name = document.getElementById("custName").value.trim();
  const phone = document.getElementById("custPhone").value.trim();
  const address = document.getElementById("custAddress").value.trim();

  if (!name || !phone || !address) {
    alert("Please fill in all fields!");
    return;
  }

  document.getElementById("paymentModal").classList.add("show");
  document.getElementById("checkoutModal").classList.remove("show");
}

// Close payment modal
document.getElementById("closePayment").addEventListener("click", () => {
  document.getElementById("paymentModal").classList.remove("show");
});

// Back button handler for modals
function handleBack() {
  // If payment modal is open, go back to checkout
  if (document.getElementById("paymentModal").classList.contains("show")) {
    document.getElementById("paymentModal").classList.remove("show");
    document.getElementById("checkoutModal").classList.add("show");
    return;
  }

  // If checkout modal is open, go back to cart view
  if (document.getElementById("checkoutModal").classList.contains("show")) {
    document.getElementById("checkoutModal").classList.remove("show");
    handleNavigation("#cart");
    return;
  }

  // If product modal is open, close it and return to products
  if (modal.classList && modal.classList.contains("show")) {
    modal.classList.remove("show");
    document.body.style.overflow = "auto";
    handleNavigation("#products");
    return;
  }
}

// Complete order
function completeOrder() {
  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const name = document.getElementById("custName").value;
  
  showNotification(`✅ Order placed successfully! Thank you ${name}!`);
  cart = [];
  updateCartCount();
  document.getElementById("paymentModal").classList.remove("show");
  
  setTimeout(() => {
    document.getElementById("custName").value = "";
    document.getElementById("custPhone").value = "";
    document.getElementById("custAddress").value = "";
    handleNavigation("#home");
  }, 2000);
}

// Contact form
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("contactName").value;
  showNotification(`Thank you ${name}! We'll get back to you soon.`);
  document.getElementById("contactForm").reset();
});

updateCartCount();
