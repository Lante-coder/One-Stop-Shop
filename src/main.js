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