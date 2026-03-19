// Login function
async function login() {

    // 📥 Input fields se user credentials le rahe hain
    const aadharCardNumber = document.getElementById("aadhar").value;
    const password = document.getElementById("password").value;

    try {
        // 📡 Backend ko login request bhej rahe hain (POST)
        const response = await apiRequest("/user/login", "POST", { aadharCardNumber, password });

        // 🔐 Login successful hone par JWT token localStorage me save kar rahe hain
        localStorage.setItem("token", response.token);

        // 👤 Login ke baad user ka profile fetch kar rahe hain (auth = true → token use hoga)
        const profile = await apiRequest("/user/profile", "GET", null, true);

        // 🧠 User ka role nikaal rahe hain (admin ya normal user)
        const role = profile.user.role;

        // 🔀 Role ke basis pe redirect kar rahe hain
        if (role === "admin") 
            window.location.href = "admin.html"; // Admin dashboard
        else 
            window.location.href = "vote.html"; // Voting page
    } catch (err) {
        // ❌ Agar login fail ho gaya toh error show karo
        alert(err.message);
    }
}

// Signup function
async function signup() {

    // 📥 Form se saari user details collect kar rahe hain
    const data = {
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        address: document.getElementById("address").value,
        aadharCardNumber: document.getElementById("aadhar").value,
        password: document.getElementById("password").value,
        role: document.getElementById("role").value
    };

    // ⚠️ Validation: koi field empty nahi honi chahiye
    if (!data.name || !data.age || !data.address || !data.aadharCardNumber || !data.password) {
        alert("All fields are required");
        return; // Aage execution stop
    }

    try {
        // 📡 Backend ko signup request bhej rahe hain
        const response = await apiRequest("/user/signup", "POST", data);

        // 🔐 Signup ke baad bhi token milta hai → usko store kar rahe hain
        localStorage.setItem("token", response.token);

        // ✅ Success message
        alert("Signup successful");

        // 🔀 Signup ke baad user ko voting page pe bhej rahe hain
        window.location.href = "vote.html";
    } catch (err) {
        // ❌ Error handling (jaise user already exist, etc.)
        alert(err.message);
    }
}