// vote.js

// 🔥 SOCKET CONNECT 
const socket = io("http://localhost:3000", {
    transports: ["websocket"]
});

// 🔐 VOTER PAGE PROTECTION
const token = localStorage.getItem("token");

if (!token) {
    alert("Please login first");
    window.location.href = "login.html";
}

// 📥 Load Candidates
async function loadCandidates() {
    try {

        const candidates = await apiRequest(
            "/candidate",
            "GET",
            null,
            true
        );

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

// 🗳️ Vote
async function vote(candidateId) {

    try {

        const response = await apiRequest(
            `/candidate/vote/${candidateId}`,
            "POST",
            null,
            true
        );

        alert(response.message);

        loadCandidates();

    } catch (err) {

        alert(err.message);

    }

}

// 🚪 Logout
function logout() {

    localStorage.removeItem("token");

    window.location.href = "login.html";

}

// ⚡ Auto Load
window.onload = loadCandidates;


// 🔥 LIVE UPDATE
socket.on("voteUpdated", () => {

    console.log("Live vote update received");

    loadCandidates();

});