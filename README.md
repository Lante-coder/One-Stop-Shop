# 🛒 One Stop Online Shop
A modern, responsive e-commerce web application built with vanilla JavaScript, HTML5, and CSS3. This project demonstrates a complete online shopping experience with product browsing, cart management, and checkout functionality.

# 🌟 Features

### Core Functionality

- Product Catalog: Browse products fetched from FakeStore API
- Search & Filter: Real-time product search by title
- Shopping Cart: Add, remove, and modify item quantities
- Interactive Ratings: Click-to-rate products with visual star feedback
- Real-time Updates: Dynamic cart counter and total calculations

### User Experience
- Smooth Animations: Hover effects and transitions throughout
- Visual Feedback: Toast messages for user actions
- Empty State Handling: Graceful empty cart and error states
- Currency Localization: Prices displayed in Kenyan Shillings (KSH)
- Accessibility: Semantic HTML and keyboard navigation support

# 💻 Technologies Used
- Frontend: HTML5, CSS3, Vanilla JavaScript (ES6+)
- API: FakeStore API
- Icons: Font Awesome 6.4.0
- Design: Custom CSS with modern gradient backgrounds and glassmorphism effects

# 🛠️ Installation & Setup
Clone the repository
git clone https://github.com/yourusername/one-stop-shop.git
cd one-stop-shop
Open in browser

# 📱 Key Features Breakdown
### Product Management
- Fetches real product data from FakeStore API
- Displays first 12 products for optimal loading
- Product cards with images, titles, prices, and ratings
- Truncated titles for consistent card layout
### Shopping Cart System
- Add products with single click
- Quantity management (increase/decrease)
- Remove items functionality
- Persistent cart state during session
- Real-time price calculations including tax and shipping
### Search Functionality
- Live search as you type
- Searches product titles
- "No results found" state with helpful messaging
### Rating System
- Interactive 5-star rating system
- Visual hover effects
- lick to rate functionality
- Immediate visual feedback
### Checkout Process
- Order summary with itemized pricing
- Tax calculation (16% VAT)
- Shipping fee (KSH 500 for orders > 0)
- Confirmation dialog before processing

# 🔧 Code Architecture
### JavaScript Organization
- Modular Functions: Each feature separated into focused functions
- Event-Driven: Proper event listener setup and management
- Error Handling: Graceful API error handling with user feedback
- State Management: Clean cart state management without external libraries
# CSS Methodology
- Component-Based: Organized by UI components
- Modern Features: CSS Grid, Flexbox, custom properties
- Progressive Enhancement: Fallbacks for older browsers
- Performance: Optimized selectors and minimal repaints

# 📝 API Reference
This project uses the FakeStore API for product data:

# javascript
// Get all products
GET https://fakestoreapi.com/products

# 🤝 Contributing
- Fork the project
- Create your feature branch (git checkout -b feature/AmazingFeature)
- Commit your changes (git commit -m 'Add some AmazingFeature')
- Push to the branch (git push origin feature/AmazingFeature)

# 📄 License
This project for Educational Purposes at Moringa School

# 👨‍💻 Author
Allan mwangi 

# 🙏 Acknowledgments
FakeStore API for providing the product data
Font Awesome for the beautiful icons
Inspiration from modern e-commerce platforms




