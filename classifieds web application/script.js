window.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('loggedInUser')) {
        loadAdsPage();  // Load ads directly if user is already logged in
    } else {
        loadLoginPage(); // Otherwise, load the login page
    }
});

// Toggle between login and register sections
document.getElementById('register-btn').addEventListener('click', function() {
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('register-section').style.display = 'block';
});
document.getElementById('back-to-login-btn').addEventListener('click', function() {
    document.getElementById('auth-section').style.display = 'block';
    document.getElementById('register-section').style.display = 'none';
});

// Login form event
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        localStorage.setItem('loggedInUser', username);
        loadAdsPage();
    } else {
        alert('Incorrect username or password');
    }
});

// Registration form event
document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const newUsername = document.getElementById('new-username').value;
    const newPassword = document.getElementById('new-password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (!users.some(u => u.username === newUsername)) {
        users.push({ username: newUsername, password: newPassword });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registration successful! Please log in.');
        loadLoginPage();
    } else {
        alert('Username already exists');
    }
});

// Load the login page
function loadLoginPage() {
    document.getElementById('auth-section').style.display = 'block';
    document.getElementById('register-section').style.display = 'none';
    document.getElementById('ads').style.display = 'none';
    document.getElementById('logout-btn').style.display = 'none';
    document.getElementById('sell-product-btn').style.display = 'none';
    document.getElementById('user-info').innerText = '';
}

// Load the ads page
function loadAdsPage() {
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('register-section').style.display = 'none';
    document.getElementById('ads').style.display = 'block';
    document.getElementById('logout-btn').style.display = 'inline';
    document.getElementById('sell-product-btn').style.display = 'inline';
    document.getElementById('user-info').innerText = `Welcome, ${localStorage.getItem('loggedInUser')}`;
    loadAds();
}

// Logout
document.getElementById('logout-btn').addEventListener('click', function() {
    localStorage.removeItem('loggedInUser');
    loadLoginPage();
    window.location.reload();
});

// Load ads
function loadAds() {
    const adList = document.getElementById('ad-list');
    adList.innerHTML = '';
    const ads = JSON.parse(localStorage.getItem('ads')) || [];

    ads.forEach((ad, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${ad.title}</strong><br>
            ${ad.image ? `<img src="${ad.image}" alt="${ad.title}" style="max-width: 200px; max-height: 150px;"><br>` : ''}
            ${ad.description}<br>
            <em>Price: ₹${ad.price}</em><br>
            <small>Posted by: ${ad.username}</small><br>
            <small>Location: ${ad.location}</small><br>
            <small>Contact: ${ad.mobile}</small><br>
            ${ad.sold ? `<strong style="color:red;">Sold to ${ad.soldTo}</strong><br>` : ''}
        `;

        if (ad.username === localStorage.getItem('loggedInUser')) {
            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Delete';
            deleteButton.onclick = () => deleteAd(index);
            li.appendChild(deleteButton);
        } else if (!ad.sold) {
            const buyButton = document.createElement('button');
            buyButton.innerText = 'Buy';
            buyButton.onclick = () => buyAd(index);
            li.appendChild(buyButton);
        }
        adList.appendChild(li);
    });
}

// Buy ad
function buyAd(index) {
    const ads = JSON.parse(localStorage.getItem('ads'));
    const buyerUsername = localStorage.getItem('loggedInUser');

    const buyerName = prompt('Enter your full name:');
    const buyerPhone = prompt('Enter your phone number:');
    const buyerAddress = prompt('Enter your address:');

    if (buyerName && buyerPhone && buyerAddress) {
        ads[index].sold = true;
        ads[index].soldTo = buyerUsername;
        ads[index].buyerDetails = {
            name: buyerName,
            phone: buyerPhone,
            address: buyerAddress
        };

        localStorage.setItem('ads', JSON.stringify(ads));
        loadAds();
        showOrderSummary(index);
    } else {
        alert('Please provide all details to complete the purchase.');
    }
}

// Show order summary
function showOrderSummary(index) {
    const ads = JSON.parse(localStorage.getItem('ads'));
    const ad = ads[index];

    const summary = document.getElementById('summary-content');
    summary.innerHTML = `
        <h2>Order Summary</h2>
        <p><strong>Product:</strong> ${ad.title}</p>
        <p><strong>Price:</strong> ₹${ad.price}</p>
        <p><strong>Seller:</strong> ${ad.username}</p>
        <p><strong>Buyer Name:</strong> ${ad.buyerDetails.name}</p>
        <p><strong>Phone:</strong> ${ad.buyerDetails.phone}</p>
        <p><strong>Address:</strong> ${ad.buyerDetails.address}</p>
    `;

    document.getElementById('order-summary').style.display = 'block';
}

// Close order summary
function closeOrderSummary() {
    document.getElementById('order-summary').style.display = 'none';
}

// Delete ad
function deleteAd(index) {
    const ads = JSON.parse(localStorage.getItem('ads'));
    ads.splice(index, 1);
    localStorage.setItem('ads', JSON.stringify(ads));
    loadAds();
}
