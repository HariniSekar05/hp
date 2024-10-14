// Initialize users and ads in local storage if not present
if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([]));
}

if (!localStorage.getItem('ads')) {
    localStorage.setItem('ads', JSON.stringify([]));
}

// Load the appropriate page on refresh
window.onload = function() {
    const currentPage = localStorage.getItem('currentPage') || 'login';
    loadPage(currentPage);
};

document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username && u.password === password);
    
    // Debugging output
    console.log('Logging in with:', { username, password });
    console.log('Registered users:', users);
    
    if (user) {
        localStorage.setItem('loggedInUser', username);
        loadUserDashboard();
    } else {
        alert('Invalid login credentials. Please try again.');
    }
});

// Register button logic
document.getElementById('register-btn').addEventListener('click', function() {
    loadPage('register');
});

document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const newUsername = document.getElementById('new-username').value;
    const newPassword = document.getElementById('new-password').value;
    
    const users = JSON.parse(localStorage.getItem('users'));
    const existingUser = users.find(u => u.username === newUsername);
    
    if (existingUser) {
        alert('Username already exists!');
    } else {
        users.push({ username: newUsername, password: newPassword });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registration successful! You can now log in.');
        loadPage('login');
    }
});

document.getElementById('back-to-login-btn').addEventListener('click', function() {
    loadPage('login');
});

document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const imageInput = document.getElementById('image');
    const location = document.getElementById('location').value;
    const mobile = document.getElementById('mobile').value;

    // Create a FileReader to read the uploaded image
    const reader = new FileReader();
    reader.onload = function(event) {
        const imageDataUrl = event.target.result;
        
        const username = localStorage.getItem('loggedInUser');
        const ads = JSON.parse(localStorage.getItem('ads'));
        
        // Get the current date and time
        const currentDateTime = new Date().toLocaleString();
        
        ads.push({ title, description, price, username, image: imageDataUrl, location, mobile, dateTime: currentDateTime });
        localStorage.setItem('ads', JSON.stringify(ads));

        loadAds();
        document.getElementById('form').reset();
    };
    
    // Read the uploaded file
    if (imageInput.files.length > 0) {
        reader.readAsDataURL(imageInput.files[0]);
    }
});

document.getElementById('logout-btn').addEventListener('click', function() {
    localStorage.removeItem('loggedInUser');
    loadPage('login');
});

function loadPage(page) {
    localStorage.setItem('currentPage', page);
    
    // Hide all sections
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('register-section').style.display = 'none';
    document.getElementById('ad-form').style.display = 'none';
    document.getElementById('ads').style.display = 'none';
    
    // Show the requested section
    if (page === 'login') {
        document.getElementById('auth-section').style.display = 'block';
    } else if (page === 'register') {
        document.getElementById('register-section').style.display = 'block';
    } else if (page === 'dashboard') {
        document.getElementById('ad-form').style.display = 'block';
        document.getElementById('ads').style.display = 'block';
        document.getElementById('user-info').innerText = `Logged in as: ${localStorage.getItem('loggedInUser')}`;
        document.getElementById('logout-btn').style.display = 'inline-block';
        loadAds();
    }
}

function loadAds() {
    const ads = JSON.parse(localStorage.getItem('ads'));
    const adList = document.getElementById('ad-list');
    adList.innerHTML = '';

    ads.forEach((ad, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${ad.title}</strong><br>
            ${ad.image ? `<img src="${ad.image}" alt="${ad.title}" style="max-width: 200px; max-height: 150px;"><br>` : ''}
            ${ad.description}<br>
            <em>Price: ₹${ad.price}</em><br>
            <small>Posted by: ${ad.username} on ${ad.dateTime}</small><br>
            <small>Location: ${ad.location}</small><br>
            <small>Mobile: ${ad.mobile}</small>
        `;
        
        const buyButton = document.createElement('button');
        buyButton.className = 'buy-button';
        buyButton.innerText = 'Buy';
        buyButton.onclick = () => buyAd(index);
        
        li.appendChild(buyButton);
        adList.appendChild(li);
    });
}

function buyAd(index) {
    const ads = JSON.parse(localStorage.getItem('ads'));
    const ad = ads[index];

    if (confirm(`Are you sure you want to buy "${ad.title}" for ₹${ad.price}?`)) {
        getDeliveryDetails(ad);
    }
}

function getDeliveryDetails(ad) {
    const deliveryName = prompt("Please enter your name:");
    const deliveryAddress = prompt("Please enter your delivery address:");
    const deliveryPhone = prompt("Please enter your phone number:");

    if (deliveryName && deliveryAddress && deliveryPhone) {
        // Show order summary
        const summaryDetails = document.getElementById('summary-details');
        summaryDetails.innerHTML = `
            <strong>Item:</strong> ${ad.title}<br>
            <strong>Price:</strong> ₹${ad.price}<br>
            <strong>Delivery Name:</strong> ${deliveryName}<br>
            <strong>Delivery Address:</strong> ${deliveryAddress}<br>
            <strong>Phone:</strong> ${deliveryPhone}<br>
            <strong>Posted User Mobile:</strong> ${ad.mobile}<br>
            <strong>Location:</strong> ${ad.location}
        `;

        document.getElementById('order-summary').style.display = 'block';
    } else {
        alert("Purchase canceled. Delivery details are required.");
    }
}

document.getElementById('close-summary-btn').addEventListener('click', function() {
    document.getElementById('order-summary').style.display = 'none';
});

// Load the login page on initial load
loadPage('login');
