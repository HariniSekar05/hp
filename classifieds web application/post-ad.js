// Back to ads button event
document.getElementById('back-btn').addEventListener('click', function() {
    window.location.href = 'index.html'; // Navigate to main page
});

// Post ad form submit event
document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const location = document.getElementById('location').value;
    const mobile = document.getElementById('mobile').value;

    const imageInput = document.getElementById('image');
    const imageFile = imageInput.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const ads = JSON.parse(localStorage.getItem('ads')) || []; // Ensure ads array is initialized
        const username = localStorage.getItem('loggedInUser');

        const newAd = {
            title: title,
            description: description,
            price: price,
            image: event.target.result, // Store image as base64
            location: location,
            mobile: mobile,
            username: username,
            sold: false,
            soldTo: ''
        };

        ads.push(newAd);
        localStorage.setItem('ads', JSON.stringify(ads));

        alert('Ad posted successfully!');
        window.location.href = 'index.html'; // Redirect to main page after posting ad
    };

    reader.readAsDataURL(imageFile);
});
