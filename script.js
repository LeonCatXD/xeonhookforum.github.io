const users = JSON.parse(localStorage.getItem("users")) || [];
const posts = JSON.parse(localStorage.getItem("posts")) || [];

// Function to toggle between Register and Login forms
function toggleForms() {
    const registrationForm = document.getElementById("registrationForm");
    const loginForm = document.getElementById("loginForm");
    const isLoginVisible = loginForm.style.display === "block";

    registrationForm.style.display = isLoginVisible ? "block" : "none";
    loginForm.style.display = isLoginVisible ? "none" : "block";
    document.getElementById("toggleFormBtn").innerText = isLoginVisible ? "Switch to Login" : "Switch to Register";
}

// Function to register a new user
function register() {
    const username = document.getElementById("regUsername").value;
    const password = document.getElementById("regPassword").value;
    const inviteCode = document.getElementById("inviteCode").value;

    if (users.some(user => user.username === username)) {
        document.getElementById("regMessage").innerText = "Username already exists!";
        return;
    }

    users.push({ username, password, inviteCode });
    localStorage.setItem("users", JSON.stringify(users));
    document.getElementById("regMessage").innerText = "Registration successful! You can log in now.";
    document.getElementById("regUsername").value = "";
    document.getElementById("regPassword").value = "";
    document.getElementById("inviteCode").value = "";
}

// Function to log in a user
function login() {
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        document.getElementById("loginForm").style.display = "none";
        document.getElementById("forum").style.display = "block";
        displayPosts();
        document.getElementById("loginMessage").innerText = "";
    } else {
        document.getElementById("loginMessage").innerText = "Invalid username or password!";
    }
}

// Function to log out a user
function logout() {
    document.getElementById("forum").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
}

// Function to add a new post
function addPost() {
    const newPostContent = document.getElementById("newPost").value;
    if (newPostContent) {
        posts.push(newPostContent);
        localStorage.setItem("posts", JSON.stringify(posts));
        displayPosts();
        document.getElementById("newPost").value = "";
    }
}

// Function to display posts
function displayPosts() {
    const postsContainer = document.getElementById("posts");
    postsContainer.innerHTML = posts.map(post => `<div class="post">${post}</div>`).join("");
}

// Load existing posts on page load
document.addEventListener("DOMContentLoaded", displayPosts);
