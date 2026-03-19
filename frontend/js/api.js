// frontend/js/api.js

// 🌐 Backend ka base URL (live deployed server)
const API_URL = "https://voting-app-backend-0w9j.onrender.com"; // live backend

// 🔁 Generic API request function (har API call ke liye reusable)
async function apiRequest(endpoint, method = "GET", data = null, auth = false) {

    // 🧾 Default headers (JSON data send/receive karne ke liye)
    const headers = { "Content-Type": "application/json" };

    // 🔐 Agar auth = true hai, toh token attach karo
    if (auth) {
        // Local storage se JWT token nikaal rahe hain
        const token = localStorage.getItem("token");

        // Agar token exist karta hai, toh Authorization header me add karo
        if (token) headers["Authorization"] = `Bearer ${token}`;
    }

    // ⚙️ Request configuration object
    const config = { method, headers };

    // 📦 Agar data hai (POST/PUT requests), toh body me JSON string add karo
    if (data) config.body = JSON.stringify(data);

    // 📡 Backend ko request bhej rahe hain (endpoint + base URL)
    const response = await fetch(`${API_URL}${endpoint}`, config);

    // 📥 Response ko JSON me convert kar rahe hain
    const resData = await response.json();

    // ❌ Agar response ok nahi hai (error status code)
    if (!response.ok)
        // Backend se aaya error message throw kar rahe hain
        throw new Error(resData.error || resData.message || "API Error");

    // ✅ Agar sab sahi hai, toh response data return karo
    return resData;
}