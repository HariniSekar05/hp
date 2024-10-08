const restaurantMenus = {
    'The Garden of Eat’n': [
        { name: 'Margherita Pizza', price: 8.99, img: 'images/margherita.jpg' },
        { name: 'Pasta Alfredo', price: 12.99, img: 'images/alfredo.jpg' }
    ],
    'Basic B Burgers': [
        { name: 'Butter Chicken', price: 10.99, img: 'images/butter_chicken.jpg' },
        { name: 'Spicy Paneer', price: 9.49, img: 'images/spicy_paneer.jpg' }
    ],
    'Haute Dog Diner': [
        { name: 'Chicken Noodles', price: 7.99, img: 'images/chicken_noodles.jpg' },
        { name: 'Fried Rice', price: '6.49', img: 'images/fried_rice.jpg' }
    ],
    'Bread & Spread': [
        { name: 'Cheeseburger', price: 9.99, img: 'images/cheeseburger.jpg' },
        { name: 'Fries', price: 3.99, img: 'images/fries.jpg' }
    ]
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
        const card = document.createElement("div");
        card.className = "restaurant-card";
        card.innerHTML = `
            <h3>${restaurant}</h3>
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
                <strong>${item.name}</strong> - $${item.price.toFixed(2)}
            </div>
            <button onclick="addToCart('${item.name}', ${item.price})">Add to Cart</button>
        `;
        menuItems.appendChild(menuItem);
    });

    menuContainer.style.display = "block"; // Show menu
}

function closeMenu() {
    document.getElementById("menuContainer").style.display = "none"; // Hide menu
}

function addToCart(itemName, price) {
    // Add item to cart
    cart.push({ name: itemName, price: price });
    updateCart();
}

function updateCart() {
    const cartItemsContainer = document.getElementById("cartItems");
    cartItemsContainer.innerHTML = ""; // Clear previous items

    let total = 0;

    cart.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.innerHTML = `${item.name} - $${item.price.toFixed(2)}`;
        cartItemsContainer.appendChild(cartItem);
        total += item.price;
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
        orderSummary.innerHTML += `${item.name} - $${item.price.toFixed(2)}<br>`;
        total += item.price;
    });

    orderSummary.innerHTML += `<strong>Total: $${total.toFixed(2)}</strong><br><br>`;
    orderSummary.innerHTML += `
        <label for="deliveryAddress">Delivery Address:</label>
        <input type="text" id="deliveryAddress" placeholder="Enter your address" required><br><br>
        <button id="confirmOrderButton" onclick="confirmOrder()">Confirm Order</button>
    `;
    
    orderSummaryContainer.style.display = "block"; // Show order summary
}

function confirmOrder() {
    const deliveryAddress = document.getElementById("deliveryAddress").value;
    if (!deliveryAddress) {
        alert("Please enter a delivery address.");
        return;
    }
    
    // Confirm order logic (for example, clear cart, send order to backend, etc.)
    alert(`Order confirmed! Thank you for your purchase.\nDelivery Address: ${deliveryAddress}`);
    cart = []; // Clear cart
    updateCart(); // Update cart display
    document.getElementById("orderSummaryContainer").style.display = "none"; // Hide order summary
}
