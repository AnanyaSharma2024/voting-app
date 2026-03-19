// frontend/script.js

// Wait until full HTML page is loaded
document.addEventListener("DOMContentLoaded", () => {

    // ===== Login Form Handling =====

    // Get login form element by its ID
    const loginForm = document.getElementById("loginForm");

    // Check if login form exists on the page
    if (loginForm) {

        // Add event listener for form submission
        loginForm.addEventListener("submit", (e) => {

            e.preventDefault(); // prevent page reload on submit

            login(); // call login function (defined elsewhere)
        });
    }

    // ===== Signup Form Handling =====

    // Get signup form element by its ID
    const signupForm = document.getElementById("signupForm");

    // Check if signup form exists on the page
    if (signupForm) {

        // Add event listener for form submission
        signupForm.addEventListener("submit", (e) => {

            e.preventDefault(); // prevent page reload

            signup(); // call signup function
        });
    }
});