// Create variables to store our data

let allProducts = [];  // stores all products from the API
let shoppingCart = [];  // stores items added to cart

//When the page loads, start our app

document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded! Starting One Stop Shop');

    startApp()
    
});

// Main function that starts everything

function startApp() {

    getProductsFromAPI();
    setupButtonClicks();
    updateCartNumber();
}

// Get products from the Fake Store API
function getProductsFromAPI() {

    console.log('Getting products from Fake Store API...');
    
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())  
        .then(products => {
            console.log('Got products:', products);
            allProducts = products;  
            showProductsOnPage();      
        })
        .catch(error => {
            console.log('Error getting products:', error);
            showErrorMessage();
        });
}

// Display products on the webpage

function showProductsOnPage() {
    console.log('Showing products on page...');
    
    // Get the container where we want to put products
    const container = document.querySelector('.products-container');


    if (!container) {
        console.log('Products container not found!');
        return;
    }
    
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

    productDiv.setAttribute('data-product-id', product.id);
    
    // Convert price from dollars to Kenyan shillings

    const priceInKsh = Math.round(product.price * 130);

    const shortTitle = product.title.length > 30 ? 
    product.title.substring(0, 30) + '...' : 
    product.title;
       
    // Create the HTML content

 productDiv.innerHTML = `
        <div class="product-image-container">
            <img class="product-image" src="${product.image}" alt="${product.title}">
        </div>
        <div class="product-info">
            <h3 class="product-name">${shortTitle}</h3>
            <p class="product-price">Ksh ${priceInKsh}</p>
            <div class="product-rating">
                ${createStars(product.rating.rate, product.id)}
            </div>
        </div>
        <button class="add-to-cart" onclick="addToCart(${product.id})">
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
        stars += `<i class="${starClass} fa-star" 
                     onclick="rateProduct(${productId}, ${i})" 
                     onmouseover="highlightStars(${productId}, ${i})"
                     onmouseleave="resetStars(${productId}, ${currentRating})"
                     style="cursor: pointer; color: ${starColor}; margin-right: 2px;"></i>`;
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
        updateProductStarDisplay(productId, rating);
        
        
        // To Show confirmation message by a module
        showMessage(`You rated this product ${rating} stars!`);   
        

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
        // Add event listener
        setupCartEventListeners();
    
    // Update the cart display
        updateCartNumber();
        showCartItems();
        showMessage(product.title + ' added to cart!'); 
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
    
    // Show or hide empty cart message 
        showOrHideEmptyCart();


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


        addCartItemEventListeners();
    // Update the total prices 
        updateCartTotals(); 
    
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
            <button class="quantity-btn" onclick="changeQuantity(${item.id}, -1)">−</button>
            <input type="number" class="quantity-input" value="${item.quantity}" readonly>
            <button class="quantity-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
        </div>
        <button class="delete-btn" onclick="removeFromCart(${item.id})">
            <i class="fa-solid fa-trash"></i>
            Remove
        </button>
    `;
    
    return cartDiv;
}

// Add function for cart event listener
function setupCartEventListeners() {
    // Quantity buttons
    document.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const cartItem = e.target.closest('.cart-item');
            const productId = parseInt(cartItem.getAttribute('data-product-id'));
            const action = e.target.getAttribute('data-action');
            const change = action === 'increase' ? 1 : -1;
            changeQuantity(productId, change);
        });
    });

    // Remove buttons

    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const cartItem = e.target.closest('.cart-item');
            const productId = parseInt(cartItem.getAttribute('data-product-id'));
            removeFromCart(productId);
        });
    });
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
    showMessage('Item removed from cart');

}

//Calculate and show cart totals

function updateCartTotals() {
    let subtotal = 0;
    
    // Calculate subtotal
    shoppingCart.forEach(item => {
        const priceInKsh = item.price * 130;
        subtotal += priceInKsh * item.quantity;
    });
    
    // Calculate other costs
    const shipping = subtotal > 0 ? 500 : 0;  // Shipping cost
    const tax = subtotal * 0.16;
    const total = subtotal + shipping + tax;
    
    // Update the display
    updateElement('subtotal', `Ksh ${Math.round(subtotal)}`);
    updateElement('shipping', `Ksh ${shipping}`);
    updateElement('tax', `Ksh ${Math.round(tax)}`);
    updateElement('total', `Ksh ${Math.round(total)}`);

}

// Function to update element text
function updateElement(id, text) {

    const element = document.getElementById(id);
    if (element) {
        element.textContent = text;
    }
}
// Show or hide empty cart message

function showOrHideEmptyCart() {
    
    const emptyCart = document.getElementById('empty-cart');
    const cartContent = document.getElementById('cart-content');
    
    if (shoppingCart.length === 0) {

        if (emptyCart) emptyCart.classList.remove('hidden');
        if (cartContent) cartContent.classList.add('hidden');
    } else {
    
        if (emptyCart) emptyCart.classList.add('hidden');
        if (cartContent) cartContent.classList.remove('hidden');
    }
}


function setupButtonClicks() {

    // Setting up search functionality

    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {

            searchProducts(e.target.value);
        });

    }
    
    // Setting up cart navigation button

    const cartButton = document.querySelector('.add-to-cart-nav');
    if (cartButton) {
        cartButton.addEventListener('click', function() {
            
            scrollToCart()
        });
    }
}

// Search for products
function searchProducts(searchText) {
    if (searchText.trim() === '') {

        // If search is empty, show all products
        showProductsOnPage();
        return;
    }
    
    // Filter products that match search

    const filteredProducts = allProducts.filter(product => {
        const titleMatch = product.title.toLowerCase().includes(searchText.toLowerCase());
        const categoryMatch = product.category.toLowerCase().includes(searchText.toLowerCase());
        return titleMatch || categoryMatch;
    });
    
    // Show filtered products to be updated
    showFilteredProducts(filteredProducts);

}

// Show filtered products

function showFilteredProducts(products) {
    const container = document.querySelector('.products-container');
    container.innerHTML = '';
    
    if (products.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
                <h3 style="color: #4C1D3D;">No products found</h3>
                <p style="color: #A33757;">Try searching for something else</p>
            </div>
        `;
        return;
    }
    
    products.forEach(product => {
        const productHTML = createProductHTML(product);
        container.appendChild(productHTML);
    });
}

// Scroll to cart section
function scrollToCart() {
    const cartSection = document.querySelector('.cart-header');
    if (cartSection) {
        cartSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Show messages to user

function showMessage(message) {

    // Create message box
    const messageBox = document.createElement('div');
    messageBox.textContent = message;
    messageBox.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #4C1D3D;
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        z-index: 1000;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;
    
    // Add to page
    document.body.appendChild(messageBox);
    

    setTimeout(() => {
        if (messageBox.parentNode) {
            messageBox.parentNode.removeChild(messageBox);
        }
    }, 2000);
}

//Show error message

function showErrorMessage() {
    const container = document.querySelector('.products-container');
    if (container) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
                <h3 style="color: #DC586D;">Oops! Something went wrong</h3>
                <p style="color: #A33757;">We couldn't load the products. Please try again later.</p>
                <button onclick="getProductsFromAPI()" style="
                    background-color: #4C1D3D;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    margin-top: 10px;
                    cursor: pointer;
                ">Try Again</button>
            </div>
        `;
    }
}
