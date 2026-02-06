// vote.js
// 🔐 VOTER PAGE PROTECTION
const token = localStorage.getItem("token");

if (!token) {
    alert("Please login first");
    window.location.href = "login.html";
}

async function loadCandidates() {
    try {
        const candidates = await apiRequest("/candidate", "GET", null, true);

        const list = document.getElementById("candidateList");
        list.innerHTML = "";

        candidates.forEach(c => {
            const div = document.createElement("div");
            div.classList.add("candidate-card");
            div.innerHTML = `
                <h3>${c.name}</h3>
                <p>Party: ${c.party}</p>
                <p>Age: ${c.age}</p>
                <p>Votes: ${c.voteCount}</p>
                <button onclick="vote('${c._id}')">Vote</button>
            `;
            list.appendChild(div);
        });

    } catch (err) {
        alert(err.message);
    }
}

async function vote(candidateId) {
    try {
        const response = await apiRequest(`/candidate/vote/${candidateId}`, "POST", null, true);
        alert(response.message);
        loadCandidates(); // vote count update
    } catch (err) {
        alert(err.message);
    }
}

function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html"; // ya signup.html
}

// Auto load candidates on page open
window.onload = loadCandidates;
