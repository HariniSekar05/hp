let users = JSON.parse(localStorage.getItem('users')) || [];
let posts = JSON.parse(localStorage.getItem('posts')) || [];
let currentUser = null;
let currentPostId = null;

// Signup/Login function
function signup() {
    const usernameInput = document.getElementById('username');
    const username = usernameInput.value.trim();

    if (username) {
        currentUser = users.find(user => user.username === username);
        if (!currentUser) {
            currentUser = { id: Date.now(), username: username, likedPosts: [], following: [] };
            users.push(currentUser);
            localStorage.setItem('users', JSON.stringify(users));
        }
        usernameInput.value = '';
        document.getElementById('user-id').innerText = currentUser.username;
        showPage('home-page');
        displayFeed();
        displayOtherUsers();
    } else {
        alert("Please enter a username.");
    }
}

// Logout function
function logout() {
    currentUser = null;
    showPage('login-page');
}

// Show the desired page
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.style.display = 'none';
    });
    document.getElementById(pageId).style.display = 'block';
}

// Display feed
function displayFeed() {
    const feedDiv = document.getElementById('feed');
    feedDiv.innerHTML = '';

    posts.forEach(post => {
        const postDiv = createPostDiv(post);
        feedDiv.appendChild(postDiv);
    });

    updateUserStats();
}

// Update user stats (followers and following count)
function updateUserStats() {
    const followingCount = currentUser.following.length; // Count of following
    const followerCount = users.filter(user => user.following.includes(currentUser.id)).length; // Count of followers

    document.getElementById('follower-count').innerText = followerCount;
    document.getElementById('following-count').innerText = followingCount;
}

// Create post div
function createPostDiv(post) {
    const postDiv = document.createElement('div');
    postDiv.className = 'post';
    postDiv.innerHTML = `
        <h4>${post.username} <small>${post.date}</small></h4>
        <p>${post.text}</p>
        ${post.image ? `<img src="${post.image}" alt="Post Image">` : ''}
        <button onclick="likePost(${post.id})">Like (${post.likes})</button>
        <button onclick="showComments(${post.id})">Comment</button>
        ${post.userId === currentUser.id ? `<button onclick="deletePost(${post.id})">Delete</button>` : ''}
    `;
    return postDiv;
}

// Create a post
function createPost() {
    const postText = document.getElementById('post-text').value;
    const postImage = document.getElementById('post-image').files[0];

    const reader = new FileReader();
    reader.onload = function(e) {
        const post = {
            id: Date.now(),
            userId: currentUser.id,
            username: currentUser.username,
            text: postText,
            image: e.target.result,
            likes: 0,
            comments: [],
            date: new Date().toLocaleString()
        };
        posts.push(post);
        localStorage.setItem('posts', JSON.stringify(posts));
        displayFeed();
        showAlert('Post created successfully!');
    };

    if (postImage) {
        reader.readAsDataURL(postImage);
    } else {
        const post = {
            id: Date.now(),
            userId: currentUser.id,
            username: currentUser.username,
            text: postText,
            image: null,
            likes: 0,
            comments: [],
            date: new Date().toLocaleString()
        };
        posts.push(post);
        localStorage.setItem('posts', JSON.stringify(posts));
        displayFeed();
        showAlert('Post created successfully!');
    }

    document.getElementById('post-text').value = '';
    document.getElementById('post-image').value = '';
    showPage('home-page');
}

// Show comments for a post
function showComments(postId) {
    currentPostId = postId;
    const post = posts.find(p => p.id === postId);
    const commentSection = document.getElementById('comment-section');
    commentSection.innerHTML = '';

    post.comments.forEach(comment => {
        const commentDiv = document.createElement('div');
        commentDiv.innerText = comment;
        commentSection.appendChild(commentDiv);
    });

    showPage('comments');
}

// Add comment
function addComment(postId) {
    const commentInput = document.getElementById('new-comment');
    const commentText = commentInput.value.trim();

    if (commentText) {
        const post = posts.find(p => p.id === postId);
        post.comments.push(commentText);
        localStorage.setItem('posts', JSON.stringify(posts));
        showComments(postId);
        commentInput.value = '';
        showAlert('Comment added!');
    }
}

// Like post
function likePost(postId) {
    const post = posts.find(p => p.id === postId);
    if (!currentUser.likedPosts.includes(postId)) {
        currentUser.likedPosts.push(postId);
        post.likes += 1;
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('posts', JSON.stringify(posts));
        displayFeed();
        showAlert('Post liked!');
    } else {
        showAlert('You already liked this post!');
    }
}

// Delete post
function deletePost(postId) {
    posts = posts.filter(p => p.id !== postId);
    localStorage.setItem('posts', JSON.stringify(posts));
    displayFeed();
    showAlert('Post deleted!');
}

// Follow users
function displayOtherUsers() {
    const followUsersList = document.getElementById('follow-users-list');
    followUsersList.innerHTML = '';

    users.forEach(user => {
        if (user.id !== currentUser.id) {
            const userDiv = document.createElement('div');
            userDiv.innerHTML = `
                <span>${user.username}</span>
                <button onclick="followUser(${user.id})">Follow</button>
            `;
            followUsersList.appendChild(userDiv);
        }
    });
}

// Follow a user
function followUser(userId) {
    if (!currentUser.following.includes(userId)) {
        currentUser.following.push(userId);
        localStorage.setItem('users', JSON.stringify(users));
        showAlert('You are now following this user!');
    } else {
        showAlert('You are already following this user!');
    }
}

// Delete account
function deleteAccount() {
    if (confirm('Are you sure you want to delete your account?')) {
        users = users.filter(user => user.id !== currentUser.id);
        posts = posts.filter(post => post.userId !== currentUser.id);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('posts', JSON.stringify(posts));
        logout();
        showAlert('Account deleted successfully!');
    }
}

// Show alert
function showAlert(message) {
    const alertBox = document.getElementById('alert-box');
    alertBox.innerText = message;
    alertBox.style.display = 'block';
    setTimeout(() => {
        alertBox.style.display = 'none';
    }, 3000);
}

// Initial display
showPage('login-page');
