// Initialize users in local storage if not present
if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([]));
}

// Initial setup for ads
if (!localStorage.getItem('ads')) {
    localStorage.setItem('ads', JSON.stringify([]));
}

// Login form submit event
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    const users = JSON.parse(localStorage.getItem('users'));
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        localStorage.setItem('loggedInUser', username);
        loadUserDashboard();
    } else {
        alert('Invalid login credentials');
    }
});

// Register button logic
document.getElementById('register-btn').addEventListener('click', function() {
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('register-section').style.display = 'block';
});

// Register form submit event
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
        document.getElementById('register-section').style.display = 'none';
        document.getElementById('auth-section').style.display = 'block';
        document.getElementById('register-form').reset();
    }
});

// Back to login button logic
document.getElementById('back-to-login-btn').addEventListener('click', function() {
    document.getElementById('register-section').style.display = 'none';
    document.getElementById('auth-section').style.display = 'block';
});

// Logout button event
document.getElementById('logout-btn').addEventListener('click', function() {
    localStorage.removeItem('loggedInUser');
    loadLoginPage();
});

function loadLoginPage() {
    document.getElementById('auth-section').style.display = 'block';
    document.getElementById('register-section').style.display = 'none';
    document.getElementById('ads').style.display = 'none';
    document.getElementById('user-info').innerText = '';
    document.getElementById('logout-btn').style.display = 'none';
    document.getElementById('sell-product-btn').style.display = 'none';
    document.getElementById('order-summary').style.display = 'none';
}

function loadUserDashboard() {
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('register-section').style.display = 'none';
    document.getElementById('ads').style.display = 'block';
    document.getElementById('user-info').innerText = `Logged in as: ${localStorage.getItem('loggedInUser')}`;
    document.getElementById('logout-btn').style.display = 'inline-block';
    document.getElementById('sell-product-btn').style.display = 'inline-block';
    loadAds();
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
            <small>Posted by: ${ad.username}</small><br>
            <small>Location: ${ad.location}</small><br>
            <small>Contact: ${ad.mobile}</small><br>
        `;

        // Add Delete button for the ad posted by the user
        if (ad.username === localStorage.getItem('loggedInUser')) {
            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Delete';
            deleteButton.onclick = () => deleteAd(index); // Pass the index to the deleteAd function
            li.appendChild(deleteButton);
        }

        if (ad.sold) {
            li.innerHTML += `<strong style="color:red;">Sold to ${ad.soldTo}</strong><br>`;
        } else {
            const buyButton = document.createElement('button');
            buyButton.className = 'buy-button';
            buyButton.innerText = 'Buy';
            buyButton.onclick = () => buyAd(index);
            li.appendChild(buyButton);
        }

        adList.appendChild(li);
    });
}

function deleteAd(index) {
    const ads = JSON.parse(localStorage.getItem('ads'));
    ads.splice(index, 1); // Remove the ad from the array
    localStorage.setItem('ads', JSON.stringify(ads)); // Save updated ads to local storage
    loadAds(); // Reload the ads list
}

function buyAd(index) {
    const ads = JSON.parse(localStorage.getItem('ads'));
    const ad = ads[index];

    if (confirm(`Are you sure you want to buy "${ad.title}"?`)) {
        ad.sold = true; // Mark ad as sold
        ad.soldTo = localStorage.getItem('loggedInUser'); // Store buyer's username
        localStorage.setItem('ads', JSON.stringify(ads)); // Update ads in local storage
        loadAds(); // Reload the ads list
        alert(`You have bought "${ad.title}"!`);
    }
}

// Sell Product button logic
document.getElementById('sell-product-btn').addEventListener('click', function() {
    window.location.href = 'post-ad.html'; // Redirect to post ad page
});

// Load the appropriate view on page load
if (localStorage.getItem('loggedInUser')) {
    loadUserDashboard();
} else {
    loadLoginPage();
}
