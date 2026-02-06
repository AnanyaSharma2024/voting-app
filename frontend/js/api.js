// Is file ka kaam

// Backend ka base URL

// JWT token automatically attach karna

// Common fetch helper
const BASE_URL = "http://localhost:3000";

// get token from localStorage
function getToken() {
    return localStorage.getItem("token");
}

// common fetch function
async function apiRequest(endpoint, method = "GET", body = null, auth = false) {
    const headers = {
        "Content-Type": "application/json",
    };

    if (auth) {
        const token = getToken();
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }
    }

    const options = {
        method,
        headers,
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
    }

    return data;
}
