function switchTab(tab) {
    document.getElementById('signInForm').style.display = (tab === 'signIn') ? 'block' : 'none';
    document.getElementById('signUpForm').style.display = (tab === 'signUp') ? 'block' : 'none';
    document.getElementById('signInTab').classList.toggle('active', tab === 'signIn');
    document.getElementById('signUpTab').classList.toggle('active', tab === 'signUp');
}


function showMessage(id, message, type) {
    let el = document.getElementById(id);
    el.innerHTML = message;
    el.className = "message " + type;
    el.style.display = "block";

    setTimeout(() => {
        el.style.display = "none";
    }, 3000);
}

function signUp() {
    let fullName = document.getElementById('fullName').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;

    if (!fullName || !email || !password || !confirmPassword) {
        showMessage("msgDisplay", "⚠️ Please fill all fields.", "error");
        return;
    }

    if (password !== confirmPassword) {
        showMessage("msgDisplay", "❌ Passwords do not match!", "error");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some(user => user.email === email)) {
        showMessage("msgDisplay", "📧 Email already registered!", "error");
        return;
    }

    users.push({ fullName, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    showMessage("msgDisplay", "✅ Account created successfully! Please sign in.", "success");
    setTimeout(() => switchTab('signIn'), 1500);
}

function login() {
    let email = document.getElementById('loginEmail').value;
    let password = document.getElementById('loginPassword').value;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let foundUser = users.find(user => user.email === email && user.password === password);

    if (foundUser) {
        showMessage("feedback", `✅ Welcome ${foundUser.fullName}! `, "success");
        localStorage.setItem("currentUser", JSON.stringify(foundUser));
        setTimeout(() => {
            window.location.href = "home.html"; 
        }, 2000);
    } else {
        showMessage("feedback", "❌ Invalid credentials. Please try again.", "error");
    }
}