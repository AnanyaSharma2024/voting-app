// result.js

// 📊 Voting results load karne ka function
async function loadResults() {
    try {
        // 📡 Backend se vote count data fetch kar rahe hain (auth = true → token use hoga)
        const results = await apiRequest("/candidate/vote/count", "GET", null, true);

        // 🧾 HTML container select kar rahe hain jahan results show honge
        const container = document.getElementById("resultsContainer");

        // 🧹 Purane results clear kar diye
        container.innerHTML = "";

        // 🔁 Har candidate/party ke liye ek card bana rahe hain
        results.forEach(c => {
            const div = document.createElement("div");
            div.classList.add("candidate-card");

            // 🧩 Party name aur vote count display kar rahe hain
            div.innerHTML = `
                <h3>${c.party}</h3>
                <p>Votes: ${c.count}</p>
            `;

            // 📌 Card ko container me add kar diya
            container.appendChild(div);
        });
    } catch (err) {
        // ❌ Agar API error aata hai toh alert show karo
        alert(err.message);
    }
}

// 🚪 Logout function
function logout() {
    // 🔐 Token remove kar diya → user logout
    localStorage.removeItem("token");

    // 🔀 User ko home page pe redirect kar diya
    window.location.href = "index.html";
}

// ⚡ Page load hote hi automatically results load ho jayenge
window.onload = loadResults;