/*
 * Assignment: Homework Assignment #12: Object Oriented Programming.
 * Description: Construct objects for an online book store system.
 */

// User Object Constructor
function User(username, password) {
    this.username = username;
    this.password = password;
    this.isLoggedIn = false;
}

User.prototype.login = function() {
    this.isLoggedIn = true;
    console.log("Successfully logged in.");
}

User.prototype.logout = function() {
    this.isLoggedIn = false;
    console.log("Successfully logged out.");
}

User.prototype.checkLoggedInStatus = function() {
    console.log("user logged in status: ", this.isLoggedIn);
}

// Address Object Constructor
function Address(street, city, state, postalCode) {
    this.street = street; 
    this.city = city;
    this.state = state;
    this.postalCode = postalCode;
}

// Customer Object Constructor
function Customer(cusId, firstName, lastName, email, username, password,) {
    User.call(this, username, password);
    
    this.cusId = cusId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.registeredDate = new Date();
    this.shippingAddress = null;
    this.billingAddress = null;
}

Customer.prototype = Object.create(User.prototype);
Customer.prototype.constructor = Customer;

Customer.prototype.register = function() {
    console.log(this.firstName, " ", this.lastName, " registered successfully.");
};

Customer.prototype.updateProfile = function() {
    console.log("Profile updated successfully.");
};

Customer.prototype.setBillingAddress = function(address) {
    this.billingAddress = address;
    console.log("Updated billing address successfully.");
};

Customer.prototype.setShippingAddress = function(address) {
    this.shippingAddress = address;
    console.log("Updated shipping address successfully.");
};

// Book Object Constructor
function Book(bookId, title, description, authors, category, isbn, releaseDate, publisher, price) {
   this.bookId = bookId;
   this.title  = title;
   this.description = description;
   this.authors = authors;
   this.category = category;
   this.isbn = isbn;
   this.releaseDate = releaseDate;
   this.publisher = publisher;
   this.price = price; 
}

// Cart Object Constructor
function Cart(cartId, items) {
    this.cartId = cartId;
    this.items = [];
}

Cart.prototype.addItems = function(book, qty) {
    console.log(book.title ," added to the cart successfully.");
};

Cart.prototype.removeItems = function(book) {
    console.log(book.title ," removed successfully.");
};

Cart.prototype.updateQty = function(book, qty) {
    console.log(book.title ," quantity updated successfully.");
};

// Order Object Constructor
function Order(orderId, shippingFee, cartId, items) {
    Cart.call(this, cartId, items);
    this.orderId = orderId;
    this.date = new Date();
    this.shippingFee = shippingFee;
}

Order.prototype = Object.create(Cart.prototype);
Order.prototype.constructor = Order;

Order.prototype.checkout = function() {
    console.log("Checkout successfully.");
};

// Create new customer.
const customerObj01 = new Customer(101, "John", "Smith", "john@domain.com", "john.smith", "ad2#1");

// Register new customer.
customerObj01.register();

// Update customer profile.
customerObj01.updateProfile();

const billingAddress = new Address("A4", "London", "", "WC2N 5DU");
const shippingAddress = new Address("A4", "London", "", "WC2N 5DU");

// Set billing address.
customerObj01.setBillingAddress(billingAddress);

// Set shipping address.
customerObj01.setShippingAddress(shippingAddress);

// Create new user.
const userObj01 = new User("john.smith", "ad2#1");

const bookObj01 = new Book(304, "All About Cake", "", ["Christina Tosi"], "Baking", "978-0451499523", "October 2008",  "Clarkson Potter", 23.50);
const bookObj02 = new Book(305, "Sea Prayer","", ["Khaled Hosseini"], "Novel", "978-0525539094", "September 2018", "Riverhead Books", 10.50);
const bookObj03 = new Book(306, "Learning Swift"," Building Apps for macOS, iOS, and beyond", ["Paris Buttfield-Addison", "Jonathon Manning", "Tim Nugent"], "Computer Science", "978-1491987575", "April 2008",  "O'Reily Media", 35);

userObj01.login();
userObj01.checkLoggedInStatus();

const cartObj01 = new Cart(110, []);

// Add items.
cartObj01.addItems(bookObj01, 2);
cartObj01.addItems(bookObj02, 1);
cartObj01.addItems(bookObj03, 1);

// Remove items.
cartObj01.removeItems(bookObj03, 1);

// Change quantity.
cartObj01.updateQty(bookObj03, 1);

// Create order.
const orderObj01 = new Order(112, 50, cartObj01.cartId, cartObj01.items);

// Checkout order.
orderObj01.checkout();

// User logged out.
userObj01.logout();