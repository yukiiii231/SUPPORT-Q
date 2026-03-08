// homepage.js

const loginBtn = document.getElementById("loginBtn");
const mainModal = document.getElementById("loginModal");

loginBtn.onclick = () => mainModal.style.display = "flex";

const msalConfig = {
    auth: {
        clientId: "8301da4c-08bd-4aed-bcce-67a766ba3367",
        authority: "https://login.microsoftonline.com/common",
        redirectUri: "https://yukiiii231.github.io/SUPPORT-Q/auth.html"
    }
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

function loginStudent() {
    // FIX: Save the role to localStorage BEFORE redirecting
    localStorage.setItem("loginRole", "student");
    
    msalInstance.loginRedirect({
        scopes: ["user.read"],
        state: "student"
    });
}

function loginAdmin() {
    // FIX: Save the role to localStorage BEFORE redirecting
    localStorage.setItem("loginRole", "admin");
    
    msalInstance.loginRedirect({
        scopes: ["user.read"],
        state: "admin"
    });
}

function closeAll() {
    document.querySelectorAll(".modal").forEach(m => m.style.display = "none");
}
