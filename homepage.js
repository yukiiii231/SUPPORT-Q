const loginBtn = document.getElementById("loginBtn");
const mainModal = document.getElementById("loginModal");

loginBtn.onclick = () => mainModal.style.display = "flex";



/* --- 1. CONFIGURATION --- */
const msalConfig = {
    auth: {
        clientId: "8301da4c-08bd-4aed-bcce-67a766ba3367", 
        authority: "https://login.microsoftonline.com/common",
        redirectUri: "https://yukiiii321.github.io/your-repository-name/homepage.html" 
    }
};

const msalInstance = new msal.PublicClientApplication(msalConfig);
let isMsalReady = false;

msalInstance.initialize().then(() => {
    isMsalReady = true;
}).catch(err => console.error("MSAL Init Error:", err));

/* --- 2. AUTHENTICATION FUNCTIONS --- */

async function loginStudent() {
    try {
        // We use loginPopup, but we tell the popup to NOT stay open
        const response = await msalInstance.loginPopup({ 
            scopes: ["user.read"],
            prompt: "select_account" 
        });

        // This code only runs AFTER the popup closes successfully
        const email = response.account.username.toLowerCase();

        if (email.endsWith("@fairview.sti.edu.ph")) {
            sessionStorage.setItem("userRole", "student");
            // This line moves the MAIN window, not the popup
            window.location.href = "student_dashboard.html"; 
        } else {
            alert("Please use your STI email.");
        }
    } catch (err) {
        console.log("Login failed or popup blocked", err);
    }
}

/* --- UPDATED ADMIN LOGIN --- */
async function loginAdmin() {
    try {
        const response = await msalInstance.loginPopup({ scopes: ["user.read"] });
        const email = response.account.username.toLowerCase();

        if (email.endsWith("@fairview.sti.edu.ph")) {
            sessionStorage.setItem("userRole", "admin");
            // Move the MAIN window to admin dashboard
            window.location.href = "admin_dashboard.html"; 
        }
    } catch (err) {
        console.log("Login failed", err);
    }
}

function closeAll(){
    document.querySelectorAll(".modal").forEach(m => m.style.display = "none");
}


