// ================= LOGIN FUNCTION =================
async function login() {

    const aadharCardNumber =
        document.getElementById("aadhar").value;

    const password =
        document.getElementById("password").value;

    try {

        const response =
            await apiRequest(
                "/user/login",
                "POST",
                { aadharCardNumber, password }
            );

        // Save token
        localStorage.setItem(
            "token",
            response.token
        );

        // Get profile
        const profile =
            await apiRequest(
                "/user/profile",
                "GET",
                null,
                true
            );

        const role =
            profile.user.role;

        // Redirect based on role
        if (role === "admin") {

            window.location.href =
                "admin.html";

        } else {

            window.location.href =
                "vote.html";

        }

    } catch (err) {

        alert(err.message);

    }
}



// ================= SIGNUP FUNCTION =================
async function signup() {

    const data = {

        name:
            document.getElementById("name").value,

        age:
            document.getElementById("age").value,

        address:
            document.getElementById("address").value,

        email:
            document.getElementById("email")?.value || "",

        mobile:
            document.getElementById("mobile")?.value || "",

        aadharCardNumber:
            document.getElementById("aadhar").value,

        password:
            document.getElementById("password").value,

        role:
            document.getElementById("role").value

    };

    // Required fields validation
    if (
        !data.name ||
        !data.age ||
        !data.address ||
        !data.aadharCardNumber ||
        !data.password
    ) {

        alert("All required fields must be filled");

        return;

    }

    try {

        const response =
            await apiRequest(
                "/user/signup",
                "POST",
                data
            );

        // Save token
        localStorage.setItem(
            "token",
            response.token
        );

        alert("Signup successful ✅");

        window.location.href =
            "vote.html";

    } catch (err) {

        alert(err.message);

    }
}



// ================= NAVBAR ADMIN HIDE/SHOW =================
async function checkAdminNavbar() {

    const token =
        localStorage.getItem("token");

    // If no login → hide admin
    if (!token) {

        const adminLinks =
            document.querySelectorAll(".admin-only");

        adminLinks.forEach(link => {

            link.style.display = "none";

        });

        return;
    }

    try {

        const profile =
            await apiRequest(
                "/user/profile",
                "GET",
                null,
                true
            );

        const role =
            profile.user.role;

        const adminLinks =
            document.querySelectorAll(".admin-only");

        if (role === "admin") {

            adminLinks.forEach(link => {

                link.style.display = "inline";

            });

        } else {

            adminLinks.forEach(link => {

                link.style.display = "none";

            });

        }

    } catch (err) {

        console.log("Navbar role check failed");

    }

}


// Run navbar check when page loads
window.onload = checkAdminNavbar;