// Create variables to store our data

let allProducts = [];  // stores all products from the API
let shoppingCart = [];  // stores items added to cart

//When the page loads, start our app

document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded! Starting One Stop Shop');

    // To Call startApp function finnised writing rest of he code.
});

// Main function that starts everything

function startApp() {

    // this function is going to do some callbacks to  
}

// Get products from the Fake Store API
function getProductsFromAPI() {

    console.log('Getting products from Fake Store API...');
    
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())  
        .then(products => {
            console.log('Got products:', products);
            allProducts = products;  
            // Create a function for the tems to display on the page and call it     
        })
        .catch(error => {
            console.log('Error getting products:', error);
            // create a function to show error message and call it 
        });
}

// Display products on the webpage

// This Function is to be called in the getProduct API 
function showProductsOnPage() {
    console.log('Showing products on page...');
    
    // Get the container where we want to put products
    const container = document.querySelector('.products-container');
    
    // create a variable that Clears any existing content in the html

    container.innerHTML = '';    
    
    //variable that Shows only first 12 products

    const productsToShow = allProducts.slice(0, 12);

    
    //Loop for each product and create HTML for it

    productsToShow.forEach(product => {
    const productHTML = createProductHTML(product);
    container.appendChild(productHTML);
    
    });

}

// Creating HTML for one product

function createProductHTML(product) {

    // Create a new div element

    const productDiv = document.createElement('article');
    productDiv.className = 'product-card';
    
    // Convert price from dollars to Kenyan shillings

    const priceInKsh = Math.round(product.price * 130);
       
    // Create the HTML content

    productDiv.innerHTML = `
        <div class="product-image-container">
            <img class="product-image" src="${product.image}" alt="${product.title}">
        </div>
        <div class="product-info">
            <h3 class="product-name">${shortTitle}</h3>
            <p class="product-price">Ksh ${priceInKsh}</p>
            <div class="product-rating">
                ${createStars(product.rating.rate)}
            </div>
        </div>
        <button class="add-to-cart">
            <i class="fa-solid fa-cart-shopping"></i>
            Add to Cart
        </button>
    `;
    
    return productDiv;
}
// Create star rating display
function createStars(currentRating = 0, productId) {

    let stars = '';
    const fullStars = Math.floor(currentRating);
    
    for (let i = 1; i <= 5; i++) {
        const starClass = i <= fullStars ? 'fa-solid' : 'fa-regular';
        const starColor = i <= fullStars ? '#FFD700' : '#ccc';
                //  To add some event listeners on this line of code after including them on my file
        stars += `<i class="${starClass} fa-star"></i>`;
    }
    
    return stars;
}

// Handle user rating when they click a star
function rateProduct(productId, rating) {
    console.log(`User rated product ${productId} with ${rating} stars`);
    
    // Find the product and update its rating

    const product = allProducts.find(p => p.id === productId);
    if (product) {

        // Update the product's rating
        product.rating.rate = rating;
        
        // To Update the display immediately
        
        
        // To Show confirmation message by a module

        
        

    }
}

// Visual feedback when hovering over stars
function highlightStars(productId, hoverRating) {

    // Find the product card

    const productCard = document.querySelector(`[data-product-id="${productId}"]`);

    if (!productCard) return;
    
    // Find all star elements for this product

    const stars = productCard.querySelectorAll('.fa-star');
    
    // Update star appearance based on hover

    stars.forEach((star, index) => {
        if (index < hoverRating) {
            star.className = 'fa-solid fa-star';
            star.style.color = '#FFD700'; 
        } else {
            star.className = 'fa-regular fa-star';
            star.style.color = '#ccc';
        }
    });
}

// Reset stars when mouse leaves
function resetStars(productId, originalRating) {

    updateProductStarDisplay(productId, originalRating);
}

// Update star display after rating

function updateProductStarDisplay(productId, newRating) {

    const productCard = document.querySelector(`[data-product-id="${productId}"]`);
    if (!productCard) return;
    
    const ratingDiv = productCard.querySelector('.product-rating');
    if (ratingDiv) {
        ratingDiv.innerHTML = createStars(newRating, productId);
    }

}


// Add item to shopping cart
function addToCart(productId) {
    console.log('Adding product to cart:', productId);
    
    // Find the product with this ID
    const product = allProducts.find(p => p.id === productId);
    
    if (!product) {
        console.log('Product not found!');
        return;
    }
    
    // Check if product is already in cart
    const existingItem = shoppingCart.find(item => item.id === productId);
    
    if (existingItem) {

        // If already in cart, increase quantity

        existingItem.quantity += 1;
        console.log('Increased quantity for:', product.title);

    } else {

        // If not in cart, add it with quantity 1

        const cartItem = {
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: 1
        };
        shoppingCart.push(cartItem);
        console.log('Added new item to cart:', product.title);
    }
    
    // Update the cart display by calling some functions to be added 
}

//  Update the cart number in navigation

function updateCartNumber() {

    // Count total items in cart
    
    let totalItems = 0;
    shoppingCart.forEach(item => {
        totalItems += item.quantity;
    });
    
    // Update the counter in navigation
    const counter = document.querySelector('.counter');
    if (counter) {
        counter.textContent = `(${totalItems})`;
    }
    
    // Update cart summary text
    const cartSummary = document.getElementById('cart-summary');

    if (cartSummary) {
        cartSummary.textContent = `${totalItems} items in your cart`;
    }
    
    // Show or hide empty cart message to be updated 


}

// Show cart items in the cart section

function showCartItems() {

    const cartContainer = document.getElementById('cart-items');

    if (!cartContainer) return;
    
    // Clear existing items
    cartContainer.innerHTML = '';

    
    // Add each cart item
    shoppingCart.forEach(item => {
    const cartItemHTML = createCartItemHTML(item);
    cartContainer.appendChild(cartItemHTML);
    });

    
    // Update the total prices to be updated 
    
}

// Create HTML for cart item
function createCartItemHTML(item) {

    const cartDiv = document.createElement('div');
    cartDiv.className = 'cart-item';
    cartDiv.setAttribute('data-product-id', item.id);
    
    const priceInKsh = Math.round(item.price * 130);
    const shortTitle = item.title.length > 30 ? 
        item.title.substring(0, 30) + '...' : 
        item.title;
    
    cartDiv.innerHTML = `
        <div class="product-image-wrapper">
            <div class="product-image">
                <img src="${item.image}" alt="${item.title}">
            </div>
        </div>
        <div class="product-details">
            <h3 class="product-name">${shortTitle}</h3>
            <p class="product-description">Quality product from our store</p>
            <div class="product-price">Ksh ${priceInKsh}</div>
        </div>
        <div class="quantity-controls">
            <button class="quantity-btn">−</button>
            <input type="number" class="quantity-input" value="${item.quantity}" readonly>
            <button class="quantity-btn">+</button>
        </div>
        <button class="delete-btn">
            <i class="fa-solid fa-trash"></i>
            Remove
        </button>
    `;
    
    return cartDiv;
}

//Change quantity of item in cart

function changeQuantity(productId, change) {

    const item = shoppingCart.find(item => item.id === productId);
    
    if (item) {
        item.quantity += change;
        
        // Don't let quantity go below 1

        if (item.quantity < 1) {
            item.quantity = 1;
        }
        
        console.log('Changed quantity for:', item.title, 'New quantity:', item.quantity);
        
        // Update displays
        updateCartNumber();
        showCartItems();
    }
}


// Remove item from cart

function removeFromCart(productId) {

    // Filter out the item we want to remove

    shoppingCart = shoppingCart.filter(item => item.id !== productId);
    
    console.log('Removed item from cart');
    
    // Update displays

    updateCartNumber();
    showCartItems();
    //To add a show message Module after creating the function    
}


