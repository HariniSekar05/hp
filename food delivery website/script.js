const restaurantMenus = {
    'The Garden of Eat’n': [
        { name: 'Margherita Pizza', price: 8.99, img: 'images/margherita.jpg' },
        { name: 'Pasta Alfredo', price: 12.99, img: 'images/alfredo.jpg' },
        { name: 'Caesar Salad', price: 7.99, img: 'images/caesar_salad.jpg' },
        { name: 'Minestrone Soup', price: 5.99, img: 'images/minestrone.jpg' }
    ],
    'Basic B Burgers': [
        { name: 'Butter Chicken', price: 10.99, img: 'images/butter_chicken.jpg' },
        { name: 'Spicy Paneer', price: 9.49, img: 'images/spicy_paneer.jpg' },
        { name: 'Grilled Chicken Burger', price: 11.49, img: 'images/grilled_burger.jpg' },
        { name: 'Loaded Nachos', price: 6.99, img: 'images/nachos.jpg' }
    ],
    'Haute Dog Diner': [
        { name: 'Chicken Noodles', price: 7.99, img: 'images/chicken_noodles.jpg' },
        { name: 'Fried Rice', price: 6.49, img: 'images/fried_rice.jpg' },
        { name: 'Shrimp Tempura', price: 12.99, img: 'images/shrimp_tempura.jpg' },
        { name: 'Spring Rolls', price: 4.99, img: 'images/spring_rolls.jpg' }
    ],
    'Bread & Spread': [
        { name: 'Cheeseburger', price: 9.99, img: 'images/cheeseburger.jpg' },
        { name: 'Fries', price: 3.99, img: 'images/fries.jpg' },
        { name: 'Chicken Sandwich', price: 8.49, img: 'images/chicken_sandwich.jpg' },
        { name: 'Mozzarella Sticks', price: 5.49, img: 'images/mozzarella_sticks.jpg' }
    ],
    'Pizza Paradise': [
        { name: 'Pepperoni Pizza', price: 10.49, img: 'images/pepperoni_pizza.jpg' },
        { name: 'BBQ Chicken Pizza', price: 11.99, img: 'images/bbq_chicken_pizza.jpg' },
        { name: 'Veggie Delight', price: 9.49, img: 'images/veggie_pizza.jpg' },
        { name: 'Four Cheese Pizza', price: 12.49, img: 'images/four_cheese_pizza.jpg' }
    ],
    'Sushi Sensation': [
        { name: 'California Roll', price: 8.99, img: 'images/california_roll.jpg' },
        { name: 'Spicy Tuna Roll', price: 9.99, img: 'images/spicy_tuna_roll.jpg' },
        { name: 'Tempura Uramaki', price: 10.99, img: 'images/tempura_uramaki.jpg' },
        { name: 'Salmon Nigiri', price: 7.99, img: 'images/salmon_nigiri.jpg' }
    ],
    'Taco Town': [
        { name: 'Chicken Tacos', price: 8.49, img: 'images/chicken_tacos.jpg' },
        { name: 'Beef Tacos', price: 9.49, img: 'images/beef_tacos.jpg' },
        { name: 'Vegetarian Tacos', price: 7.99, img: 'images/vegetarian_tacos.jpg' },
        { name: 'Fish Tacos', price: 10.49, img: 'images/fish_tacos.jpg' }
    ],
    'Pasta Palace': [
        { name: 'Spaghetti Bolognese', price: 12.99, img: 'images/spaghetti_bolognese.jpg' },
        { name: 'Penne Arrabbiata', price: 10.99, img: 'images/penne_arrabbiata.jpg' },
        { name: 'Fettuccine Alfredo', price: 11.49, img: 'images/fettuccine_alfredo.jpg' },
        { name: 'Lasagna', price: 13.99, img: 'images/lasagna.jpg' }
    ],
    'Curry Corner': [
        { name: 'Butter Chicken Curry', price: 12.99, img: 'images/butter_chicken_curry.jpg' },
        { name: 'Vegetable Biryani', price: 10.49, img: 'images/vegetable_biryani.jpg' },
        { name: 'Paneer Tikka Masala', price: 11.49, img: 'images/paneer_tikka_masala.jpg' },
        { name: 'Lamb Rogan Josh', price: 13.99, img: 'images/lamb_rogan_josh.jpg' }
    ],
    'Dessert Haven': [
        { name: 'Chocolate Lava Cake', price: 5.99, img: 'images/chocolate_lava_cake.jpg' },
        { name: 'Tiramisu', price: 6.49, img: 'images/tiramisu.jpg' },
        { name: 'Fruit Tart', price: 4.99, img: 'images/fruit_tart.jpg' },
        { name: 'Cheesecake', price: 6.99, img: 'images/cheesecake.jpg' }
    ]
};

// Adding restaurant locations and ratings
const restaurantInfo = {
    'The Garden of Eat’n': { rating: 4.5, location: '25 Rosewood Lane, Trichy' },
    'Basic B Burgers': { rating: 4.3, location: ' 42 Oak Street, Trichy' },
    'Haute Dog Diner': { rating: 4.6, location: '78 Maple Avenue, Trichy' },
    'Bread & Spread': { rating: 4.1, location: '12 Almond Road, Trichy' },
    'Pizza Paradise': { rating: 4.4, location: '55 Cedar Drive, Trichy' },
    'Sushi Sensation': { rating: 4.7, location: '89 Willow Street, Trichy' },
    'Taco Town': { rating: 4.2, location: '37 Birch Lane, Trichy' },
    'Pasta Palace': { rating: 4.3, location: '64 Elm Street, Trichy' },
    'Curry Corner': { rating: 4.8, location: '22 Pine Boulevard, Trichy' },
    'Dessert Haven': { rating: 4.6, location: '10 Spruce Way, Trichy' }
};

let cart = []; // Array to hold cart items

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username && password) {
        localStorage.setItem("username", username);
        window.location.href = "restaurants.html";
    } else {
        alert("Please enter username and password.");
    }
}

window.onload = function() {
    const username = localStorage.getItem("username");
    
    if (username) {
        showUserInfo(username);
        loadRestaurants();
    }
};

function showUserInfo(username) {
    const userInfoContainer = document.getElementById("userInfo");
    userInfoContainer.innerHTML = `<h2>Welcome, ${username}!</h2>`;
    userInfoContainer.style.display = "block"; // Ensure this is visible
}

function loadRestaurants() {
    const restaurantList = document.getElementById("restaurantList");
    for (const restaurant in restaurantMenus) {
        const info = restaurantInfo[restaurant]; // Get the info (rating and location) for each restaurant
        const card = document.createElement("div");
        card.className = "restaurant-card";
        card.innerHTML = `
            <h3>${restaurant}</h3>
            <p>Rating: ${info.rating} ⭐</p>
            <p>Location: ${info.location}</p>
            <p>Click to see the menu</p>
            <button onclick="showMenu('${restaurant}')">View Menu</button>
        `;
        restaurantList.appendChild(card);
    }
}

function showMenu(restaurant) {
    const menuContainer = document.getElementById("menuContainer");
    const menuItems = document.getElementById("menuItems");
    menuItems.innerHTML = ""; // Clear previous menu items

    restaurantMenus[restaurant].forEach(item => {
        const menuItem = document.createElement("div");
        menuItem.className = "menu-item";
        menuItem.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <div>
                <strong>${item.name}</strong> - $${item.price.toFixed(2)} <br>
                <label for="quantity-${item.name}">Quantity:</label>
                <input type="number" id="quantity-${item.name}" min="1" value="1" style="width: 50px;">
            </div>
            <button onclick="addToCart('${item.name}', ${item.price}, document.getElementById('quantity-${item.name}').value)">Add to Cart</button>
        `;
        menuItems.appendChild(menuItem);
    });

    menuContainer.style.display = "block"; // Show menu
}

function closeMenu() {
    document.getElementById("menuContainer").style.display = "none"; // Hide menu
}

function addToCart(itemName, price, quantity) {
    // Add item to cart with the specified quantity
    const qty = parseInt(quantity); // Convert quantity to an integer
    if (qty > 0) {
        cart.push({ name: itemName, price: price, quantity: qty });
        updateCart();
    }
}

function updateCart() {
    const cartItemsContainer = document.getElementById("cartItems");
    cartItemsContainer.innerHTML = ""; // Clear previous items

    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity; // Calculate total for each item
        const cartItem = document.createElement("div");
        cartItem.innerHTML = `${item.name} - $${item.price.toFixed(2)} x ${item.quantity} = $${itemTotal.toFixed(2)}`;
        cartItemsContainer.appendChild(cartItem);
        total += itemTotal; // Add to total
    });

    document.getElementById("totalAmount").innerText = `Total: $${total.toFixed(2)}`;
}

function showOrderSummary() {
    const orderSummaryContainer = document.getElementById("orderSummaryContainer");
    const orderSummary = document.getElementById("orderSummary");
    const username = localStorage.getItem("username");

    // Clear previous content to avoid duplicate entries
    orderSummary.innerHTML = "";

    if (cart.length === 0) {
        alert("Your cart is empty. Please add items before proceeding.");
        return;
    }

    orderSummary.innerHTML += `
        <h4>Order Summary for ${username}</h4>
        <h5>Items:</h5>
    `;

    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity; // Calculate total for each item
        orderSummary.innerHTML += `${item.name} - $${item.price.toFixed(2)} x ${item.quantity} = $${itemTotal.toFixed(2)}<br>`;
        total += itemTotal; // Add to total
    });

    orderSummary.innerHTML += `<strong>Total: $${total.toFixed(2)}</strong><br><br>`;
    
    // Add delivery details, payment options, and mobile number input
    orderSummary.innerHTML += `
        <label for="mobileNumber">Mobile Number:</label>
        <input type="tel" id="mobileNumber" placeholder="Enter your mobile number" required><br><br>
        <label for="deliveryAddress">Delivery Address:</label>
        <input type="text" id="deliveryAddress" placeholder="Enter your address" required><br><br>
        <label for="paymentMode">Payment Mode:</label>
        <select id="paymentMode">
            <option value="credit_card">Credit Card</option>
            <option value="debit_card">Debit Card</option>
            <option value="paypal">PayPal</option>
            <option value="cash">Cash on Delivery</option>
        </select><br><br>
        <button id="confirmOrderButton" onclick="confirmOrder()">Confirm Order</button>
    `;
    
    orderSummaryContainer.style.display = "block"; // Show order summary
}

function confirmOrder() {
    const deliveryAddress = document.getElementById("deliveryAddress").value;
    const mobileNumber = document.getElementById("mobileNumber").value;
    const paymentMode = document.getElementById("paymentMode").value;

    if (!deliveryAddress || !mobileNumber) {
        alert("Please enter both delivery address and mobile number.");
        return;
    }
    
    // Confirm order logic (for example, clear cart, send order to backend, etc.)
    alert(`Order confirmed! Thank you for your purchase.\nDelivery Address: ${deliveryAddress}\nMobile Number: ${mobileNumber}\nPayment Mode: ${paymentMode}`);
    cart = []; // Clear cart
    updateCart(); // Update cart display
    document.getElementById("orderSummaryContainer").style.display = "none"; // Hide order summary
}
