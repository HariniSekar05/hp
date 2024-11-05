document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const imageFile = document.getElementById('image').files[0];
    const location = document.getElementById('location').value;
    const mobile = document.getElementById('mobile').value;

    const reader = new FileReader();
    reader.onload = function(event) {
        const imageDataUrl = event.target.result;

        const ads = JSON.parse(localStorage.getItem('ads')) || [];
        ads.push({
            title,
            description,
            price,
            image: imageDataUrl,
            location,
            mobile,
            username: localStorage.getItem('loggedInUser'),
            sold: false
        });

        localStorage.setItem('ads', JSON.stringify(ads));
        alert('Ad posted successfully!');
        window.location.href = 'index.html';
    };

    if (imageFile) {
        reader.readAsDataURL(imageFile);
    } else {
        alert('Please upload an image.');
    }
});

// Function for Back to Ads button
function backToAds() {
    if (localStorage.getItem('loggedInUser')) {
        window.location.href = 'index.html';
    } else {
        alert("Please log in to view available ads.");
    }
}
