
// frontend/js/api.js

const API_URL = "https://voting-app-backend-0w9j.onrender.com"; // live backend

async function apiRequest(endpoint, method = "GET", data = null, auth = false) {
    const headers = { "Content-Type": "application/json" };

    if (auth) {
        const token = localStorage.getItem("token");
        if (token) headers["Authorization"] = `Bearer ${token}`;
    }

    const config = { method, headers };
    if (data) config.body = JSON.stringify(data);

    const response = await fetch(`${API_URL}${endpoint}`, config);
    const resData = await response.json();

    if (!response.ok) throw new Error(resData.error || resData.message || "API Error");

    return resData;
}
