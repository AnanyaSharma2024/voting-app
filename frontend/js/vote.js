// vote.js

// 🔐 VOTER PAGE PROTECTION

// 🔑 Local storage se token nikaal rahe hain
const token = localStorage.getItem("token");

// ❌ Agar token nahi hai → user logged in nahi hai
if (!token) {
    alert("Please login first");
    window.location.href = "login.html"; // Login page pe redirect
}

// 📥 Candidates load karne ka function
async function loadCandidates() {
    try {
        // 📡 Backend se candidates ki list fetch kar rahe hain (auth = true)
        const candidates = await apiRequest("/candidate", "GET", null, true);

        // 🧾 HTML container select kar rahe hain
        const list = document.getElementById("candidateList");

        // 🧹 Purani list clear kar di
        list.innerHTML = "";

        // 🔁 Har candidate ke liye card create kar rahe hain
        candidates.forEach(c => {
            const div = document.createElement("div");
            div.classList.add("candidate-card");

            // 🧩 Candidate ki details + Vote button
            div.innerHTML = `
                <h3>${c.name}</h3>
                <p>Party: ${c.party}</p>
                <p>Age: ${c.age}</p>
                <p>Votes: ${c.voteCount}</p>
                <button onclick="vote('${c._id}')">Vote</button>
            `;

            // 📌 Card ko DOM me add kar diya
            list.appendChild(div);
        });

    } catch (err) {
        // ❌ Error handling
        alert(err.message);
    }
}

// 🗳️ Vote karne ka function
async function vote(candidateId) {
    try {
        // 📡 Backend ko vote request bhej rahe hain (POST)
        const response = await apiRequest(`/candidate/vote/${candidateId}`, "POST", null, true);

        // ✅ Backend se success message show kar rahe hain
        alert(response.message);

        // 🔄 Vote count update karne ke liye candidates reload kar rahe hain
        loadCandidates();
    } catch (err) {
        // ❌ Agar vote already diya ya koi error aaya
        alert(err.message);
    }
}

// 🚪 Logout function
function logout() {
    // 🔐 Token remove → user logout
    localStorage.removeItem("token");

    // 🔀 Login page pe redirect
    window.location.href = "login.html"; // ya signup.html
}

// ⚡ Page load hote hi candidates automatically load ho jayenge
window.onload = loadCandidates;