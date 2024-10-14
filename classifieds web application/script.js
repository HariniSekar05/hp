// Check login status
function checkLogin() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
        // Redirect to login if not logged in
        alert("You must be logged in to access this page.");
        window.location.href = 'login.html'; // Assuming you have a login.html
    }
}

// Function to save current page and inputs to localStorage and scroll position to sessionStorage
function saveState() {
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        localStorage.setItem(input.name, input.value);
    });
    
    // Save the current scroll position
    sessionStorage.setItem('scrollPosition', window.scrollY);
}

// Function to load saved state from localStorage and scroll position from sessionStorage
function loadState() {
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        const savedValue = localStorage.getItem(input.name);
        if (savedValue) {
            input.value = savedValue;
        }
    });
    
    // Restore the scroll position
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition, 10));
    }
}

// Function to post product
function postProduct(event) {
    event.preventDefault();

    const productName = document.querySelector('input[name="productName"]').value;
    const description = document.querySelector('input[name="description"]').value;
    const price = document.querySelector('input[name="price"]').value;
    const location = document.querySelector('input[name="location"]').value;
    const mobile = document.querySelector('input[name="mobile"]').value;

    const productList = document.getElementById('productList');
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <strong>${productName}</strong>
        <p>${description}</p>
        <p>Price: $${price}</p>
        <p>Location: ${location}</p>
        <p>Contact: ${mobile}</p>
        <button onclick="buyProduct('${productName}', '${price}', '${mobile}', '${location}')">Buy</button>
    `;
    productList.appendChild(listItem);

    // Clear form inputs
    document.getElementById('postForm').reset();
    saveState(); // Save state after posting
}

// Function to handle buying a product
function buyProduct(name, price, mobile, location) {
    const summary = document.getElementById('order-summary');
    const summaryDetails = document.getElementById('summary-details');
    summaryDetails.innerHTML = `
        <strong>Product:</strong> ${name}<br>
        <strong>Price:</strong> $${price}<br>
        <strong>Contact:</strong> ${mobile}<br>
        <strong>Location:</strong> ${location}
    `;
    summary.style.display = 'block';
}

// Event listeners
const form = document.getElementById('postForm');
form.addEventListener('submit', postProduct);
window.addEventListener('load', () => {
    loadState();
    checkLogin(); // Check if the user is logged in
});
window.addEventListener('beforeunload', saveState);
