// admin.js

// 🔐 ADMIN PAGE PROTECTION
// Ye self-invoking async function hai (page load hote hi run hota hai)
(async function () {
    try {
        // API call karke user ka profile fetch kar rahe hain (token ke saath)
        const profile = await apiRequest(
            "/user/profile",
            "GET",
            null,
            true
        );

        // Check kar rahe hain ki user admin hai ya nahi
        if (profile.user.role !== "admin") {
            alert("Unauthorized access ❌"); // Agar admin nahi hai toh alert
            window.location.href = "index.html"; // Home page pe redirect
        }
    } catch (err) {
        // Agar token expire ho gaya ya error aaya
        alert("Session expired. Please login again");
        window.location.href = "login.html"; // Login page pe bhej do
    }
})();

// 📥 Admin ke liye saare candidates load karna
async function loadAdminCandidates() {
    try {
        // Backend se candidates ki list fetch kar rahe hain
        const candidates = await apiRequest("/candidate", "GET", null, true);

        // HTML me jahan list show karni hai us element ko select kiya
        const list = document.getElementById("adminCandidateList");

        // Purani list clear kar di
        list.innerHTML = "";

        // Har candidate ke liye ek card bana rahe hain
        candidates.forEach(c => {
            const div = document.createElement("div");
            div.classList.add("candidate-card");

            // Candidate ki details show kar rahe hain
            div.innerHTML = `
                <h3>${c.name}</h3>
                <p>Party: ${c.party}</p>
                <p>Age: ${c.age}</p>
                <p>Votes: ${c.voteCount}</p>
                <button onclick="deleteCandidate('${c._id}')">Delete</button>
            `;

            // Card ko DOM me add kar diya
            list.appendChild(div);
        });
    } catch (err) {
        alert(err.message); // Error aaya toh show karo
    }
}

// ➕ Naya candidate add karna
async function addCandidate() {
    // Input fields se values le rahe hain
    const name = document.getElementById("cName").value;
    const party = document.getElementById("cParty").value;
    const age = document.getElementById("cAge").value;

    // Validation: sab fields filled hone chahiye
    if (!name || !party || !age) {
        alert("All fields are required");
        return;
    }

    try {
        // Backend ko POST request bhej rahe hain new candidate ke liye
        const response = await apiRequest("/candidate", "POST", { name, party, age }, true);

        alert("Candidate added successfully ✅");

        // Form fields clear kar diye
        document.getElementById("cName").value = "";
        document.getElementById("cParty").value = "";
        document.getElementById("cAge").value = "";

        // UI update kar rahe hain
        loadAdminCandidates(); // Updated candidate list
        loadResults(); // Updated results
    } catch (err) {
        alert(err.message);
    }
}

// ❌ Candidate delete karna
async function deleteCandidate(candidateId) {
    try {
        // Backend ko DELETE request bhej rahe hain
        await apiRequest(`/candidate/${candidateId}`, "DELETE", null, true);

        alert("Candidate deleted ✅");

        // UI refresh kar rahe hain
        loadAdminCandidates();
        loadResults();
    } catch (err) {
        alert(err.message);
    }
}

// 📊 Voting results load karna
async function loadResults() {
    try {
        // Backend se vote count fetch kar rahe hain
        const results = await apiRequest("/candidate/vote/count", "GET", null, true);

        // Result container select kiya
        const container = document.getElementById("adminResults");

        // Purane results clear kar diye
        container.innerHTML = "";

        // Har party ke vote count ka card bana rahe hain
        results.forEach(c => {
            const div = document.createElement("div");
            div.classList.add("candidate-card");

            div.innerHTML = `
                <h3>${c.party}</h3>
                <p>Votes: ${c.count}</p>
            `;

            container.appendChild(div);
        });
    } catch (err) {
        alert(err.message);
    }
}

// 🚪 Logout function
function logout() {
    // Local storage se token remove kar diya (user logout)
    localStorage.removeItem("token");

    // User ko home page pe bhej diya
    window.location.href = "index.html";
}

// ⚡ Page load hote hi ye functions automatically run honge
window.onload = () => {
    loadAdminCandidates(); // Candidates load
    loadResults(); // Results load
};