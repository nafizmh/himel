// Mock product data
const products = [
  {
    id: 1,
    title: "Modern Desk Lamp",
    description: "Sleek, adjustable desk lamp with touch controls and multiple lighting modes.",
    price: 79.99,
    images: [
      "./assest/img1.jpg",
      "./assest/img2.jpg",
      "./assest/img3.jpg",
    ],
    specs: {
      Material: "Aluminum, Silicone",
      Dimensions: "15 × 6 × 18 inches",
      Weight: "2.4 lbs",
      Color: "Matte Black",
    },
    fullDescription:
      "This modern desk lamp combines functionality with elegant design. The adjustable arm and head allow you to direct light exactly where you need it. With touch-sensitive controls, you can easily switch between three brightness levels and color temperatures. The built-in USB port provides convenient charging for your devices.",
  },
  {
    id: 2,
    title: "Wireless Earbuds",
    description: "Premium wireless earbuds with noise cancellation and crystal-clear sound quality.",
    price: 129.99,
    images: [
      "./assest/img4.jpg",
      "./assest/img5.jpg",
      "./assest/img6.jpg",
    ],
    specs: {
      "Battery Life": "Up to 8 hours (24 with case)",
      Connectivity: "Bluetooth 5.2",
      "Water Resistance": "IPX5",
      "Noise Cancellation": "Active",
    },
    fullDescription:
      "Experience immersive sound with these premium wireless earbuds. The active noise cancellation technology blocks out ambient noise, allowing you to focus on your music or calls. With touch controls, you can easily manage playback, adjust volume, and activate your voice assistant. The compact charging case provides up to 24 hours of total battery life.",
  },
  {
    id: 3,
    title: "Smart Watch",
    description: "Feature-packed smartwatch with health monitoring and smartphone notifications.",
    price: 199.99,
    images: [
      "./assest/img7.jpg",
      "./assest/img8.jpg",
      "./assest/img9.jpg",
    ],
    specs: {
      Display: '1.4" AMOLED',
      Battery: "Up to 14 days",
      "Water Resistance": "5 ATM",
      Sensors: "Heart rate, SpO2, Accelerometer",
    },
    fullDescription:
      "This advanced smartwatch helps you stay connected and monitor your health. Track your heart rate, sleep quality, stress levels, and blood oxygen saturation. Receive notifications from your smartphone, control music playback, and use the built-in GPS for accurate workout tracking. With over 100 workout modes and 14-day battery life, this watch is perfect for active lifestyles.",
  },
  {
    id: 4,
    title: "Minimalist Backpack",
    description: "Stylish, water-resistant backpack with multiple compartments for everyday use.",
    price: 89.99,
    images: [
      "./assest/img3.jpg",
      "./assest/img2.jpg",
      "./assest/img1.jpg",
    ],
    specs: {
      Material: "Water-resistant polyester",
      Capacity: "22L",
      Dimensions: "18 × 12 × 6 inches",
      "Laptop Compartment": 'Up to 15.6"',
    },
    fullDescription:
      "This minimalist backpack combines style and functionality for your everyday adventures. The water-resistant exterior keeps your belongings safe in light rain, while the padded laptop compartment protects your devices. With multiple pockets and compartments, you can organize everything from your water bottle to your small electronics. The ergonomic design and padded straps ensure comfort even during long days.",
  },
  {
    id: 5,
    title: "Portable Bluetooth Speaker",
    description: "Compact, waterproof speaker with powerful sound and 20-hour battery life.",
    price: 149.99,
    images: [
      "./assest/img6.jpg",
      "./assest/img5.jpg",
      "./assest/img4.jpg",
    ],
    specs: {
      "Battery Life": "Up to 20 hours",
      "Waterproof Rating": "IPX7",
      Connectivity: "Bluetooth 5.1, AUX",
      Dimensions: "7.5 × 2.8 × 2.8 inches",
    },
    fullDescription:
      "Take your music anywhere with this portable Bluetooth speaker. The rugged, waterproof design makes it perfect for outdoor adventures, while the powerful drivers deliver rich, room-filling sound. Connect two speakers for stereo sound, or use the built-in microphone for hands-free calls. With up to 20 hours of playtime, you can enjoy your favorite music all day long.",
  },
  {
    id: 6,
    title: "Coffee Maker",
    description: "Programmable coffee maker with thermal carafe and customizable brewing options.",
    price: 119.99,
    images: [
      "./assest/img9.jpg",
      "./assest/img8.jpg",
      "./assest/img7.jpg",
    ],
    specs: {
      Capacity: "10 cups",
      Carafe: "Double-wall stainless steel",
      Programs: "Regular, Bold, 1-4 Cups",
      Timer: "24-hour programmable",
    },
    fullDescription:
      "Enjoy barista-quality coffee at home with this programmable coffee maker. The precision brewing technology ensures optimal temperature and extraction time for perfect flavor. The double-wall thermal carafe keeps your coffee hot for hours without a warming plate, preserving the fresh-brewed taste. With customizable strength settings and a small-batch option, you can brew coffee exactly how you like it.",
  },
]

// DOM elements
const productsContainer = document.getElementById("products-container")
const modal = document.getElementById("product-modal")
const modalTitle = document.getElementById("modal-title")
const modalPrice = document.getElementById("modal-price")
const modalDescription = document.getElementById("modal-description")
const modalSpecs = document.getElementById("modal-specs")
const currentImage = document.getElementById("current-image")
const thumbnailsContainer = document.getElementById("thumbnails")
const closeModal = document.querySelector(".close-modal")

// Render all products
function renderProducts() {
  productsContainer.innerHTML = ""

  products.forEach((product) => {
    const productCard = document.createElement("div")
    productCard.className = "product-card"

    productCard.innerHTML = `
      <img src="${product.images[0]}" alt="${product.title}" class="product-image">
      <div class="product-info">
        <h2 class="product-title">${product.title}</h2>
        <p class="product-description">${product.description}</p>
        <p class="product-price">$${product.price.toFixed(2)}</p>
        <div class="product-actions">
          <button style='width:100%; padding:10px 5px'; class="btn btn-secondary view-product" data-id="${product.id}">View</button>
        </div>
      </div>
    `

    productsContainer.appendChild(productCard)
  })

  // Add event listeners to view buttons
  document.querySelectorAll(".view-product").forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = Number.parseInt(e.target.getAttribute("data-id"))
      openProductModal(productId)
    })
  })
}

// Open product modal
function openProductModal(productId) {
  const product = products.find((p) => p.id === productId)

  if (!product) return

  // Set modal content
  modalTitle.textContent = product.title
  modalPrice.textContent = `$${product.price.toFixed(2)}`
  modalDescription.innerHTML = `<p>${product.fullDescription}</p>`

  // Set specs
  modalSpecs.innerHTML = ""
  for (const [key, value] of Object.entries(product.specs)) {
    const specItem = document.createElement("div")
    specItem.className = "spec-item"
    specItem.innerHTML = `
      <span class="spec-label">${key}:</span>
      <span class="spec-value">${value}</span>
    `
    modalSpecs.appendChild(specItem)
  }

  // Set main image
  currentImage.src = product.images[0]
  currentImage.alt = product.title

  // Set thumbnails
  thumbnailsContainer.innerHTML = ""
  product.images.forEach((image, index) => {
    const thumbnail = document.createElement("img")
    thumbnail.src = image
    thumbnail.alt = `${product.title} - Image ${index + 1}`
    thumbnail.className = index === 0 ? "thumbnail active" : "thumbnail"

    thumbnail.addEventListener("click", () => {
      currentImage.src = image
      document.querySelectorAll(".thumbnail").forEach((thumb) => {
        thumb.classList.remove("active")
      })
      thumbnail.classList.add("active")
    })

    thumbnailsContainer.appendChild(thumbnail)
  })

  // Show modal
  modal.style.display = "block"
  document.body.style.overflow = "hidden" // Prevent scrolling
}

// Close modal
function closeProductModal() {
  modal.style.display = "none"
  document.body.style.overflow = "auto" // Re-enable scrolling
}

// Event listeners
closeModal.addEventListener("click", closeProductModal)
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeProductModal()
  }
})

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.style.display === "block") {
    closeProductModal()
  }
})

// Initialize the app
renderProducts()
