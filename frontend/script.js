// frontend/script.js

document.addEventListener("DOMContentLoaded", () => {
    // Example: login page
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            login();
        });
    }

    // Example: signup page
    const signupForm = document.getElementById("signupForm");
    if (signupForm) {
        signupForm.addEventListener("submit", (e) => {
            e.preventDefault();
            signup();
        });
    }
});
