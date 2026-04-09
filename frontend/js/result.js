// result.js

// 🔐 Check login

const token = localStorage.getItem("token");

if (!token) {

alert("Please login first");

window.location.href = "login.html";

}


// 📊 Load Results

async function loadResults() {

try {

const results = await apiRequest(
"/candidate/vote/count",
"GET",
null,
true
);

const container =
document.getElementById(
"resultsContainer"
);

container.innerHTML = "";

results.forEach(c => {

const div =
document.createElement("div");

div.classList.add(
"candidate-card"
);

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


// 🚪 Logout

function logout() {

localStorage.removeItem("token");

window.location.href = "login.html";

}


// Auto Load

window.onload = loadResults;