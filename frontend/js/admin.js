// admin.js
// 🔐 ADMIN PAGE PROTECTION
(async function () {
    try {
        const profile = await apiRequest(
            "/user/profile",
            "GET",
            null,
            true
        );

        if (profile.user.role !== "admin") {
            alert("Unauthorized access ❌");
            window.location.href = "index.html";
        }
    } catch (err) {
        alert("Session expired. Please login again");
        window.location.href = "login.html";
    }
})();

async function loadAdminCandidates() {
    try {
        const candidates = await apiRequest("/candidate", "GET", null, true);
        const list = document.getElementById("adminCandidateList");
        list.innerHTML = "";

        candidates.forEach(c => {
            const div = document.createElement("div");
            div.classList.add("candidate-card");
            div.innerHTML = `
                <h3>${c.name}</h3>
                <p>Party: ${c.party}</p>
                <p>Age: ${c.age}</p>
                <p>Votes: ${c.voteCount}</p>
                <button onclick="deleteCandidate('${c._id}')">Delete</button>
            `;
            list.appendChild(div);
        });
    } catch (err) {
        alert(err.message);
    }
}

async function addCandidate() {
    const name = document.getElementById("cName").value;
    const party = document.getElementById("cParty").value;
    const age = document.getElementById("cAge").value;

    if (!name || !party || !age) {
        alert("All fields are required");
        return;
    }

    try {
        const response = await apiRequest("/candidate", "POST", { name, party, age }, true);
        alert("Candidate added successfully ✅");
        document.getElementById("cName").value = "";
        document.getElementById("cParty").value = "";
        document.getElementById("cAge").value = "";
        loadAdminCandidates();
        loadResults();
    } catch (err) {
        alert(err.message);
    }
}

async function deleteCandidate(candidateId) {
    try {
        await apiRequest(`/candidate/${candidateId}`, "DELETE", null, true);
        alert("Candidate deleted ✅");
        loadAdminCandidates();
        loadResults();
    } catch (err) {
        alert(err.message);
    }
}

async function loadResults() {
    try {
        const results = await apiRequest("/candidate/vote/count", "GET", null, true);
        const container = document.getElementById("adminResults");
        container.innerHTML = "";

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

function logout() {
    localStorage.removeItem("token");
    window.location.href = "index.html";
}

// Auto load
window.onload = () => {
    loadAdminCandidates();
    loadResults();
};
