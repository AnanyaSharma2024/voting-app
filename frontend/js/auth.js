// Login function
async function login() {
    const aadharCardNumber = document.getElementById("aadhar").value;
    const password = document.getElementById("password").value;

    try {
        const response = await apiRequest("/user/login", "POST", { aadharCardNumber, password });

        localStorage.setItem("token", response.token);

        const profile = await apiRequest("/user/profile", "GET", null, true);
        const role = profile.user.role;

        if (role === "admin") window.location.href = "admin.html";
        else window.location.href = "vote.html";
    } catch (err) {
        alert(err.message);
    }
}

// Signup function
async function signup() {
    const data = {
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        address: document.getElementById("address").value,
        aadharCardNumber: document.getElementById("aadhar").value,
        password: document.getElementById("password").value,
        role: document.getElementById("role").value
    };

    if (!data.name || !data.age || !data.address || !data.aadharCardNumber || !data.password) {
        alert("All fields are required");
        return;
    }

    try {
        const response = await apiRequest("/user/signup", "POST", data);
        localStorage.setItem("token", response.token);
        alert("Signup successful");
        window.location.href = "vote.html";
    } catch (err) {
        alert(err.message);
    }
}
