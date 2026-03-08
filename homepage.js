
const loginBtn = document.getElementById("loginBtn");
const mainModal = document.getElementById("loginModal");

loginBtn.onclick = () => mainModal.style.display = "flex";

/* MSAL CONFIG */
const msalConfig = {
    auth: {
        clientId: "8301da4c-08bd-4aed-bcce-67a766ba3367",
        authority: "https://login.microsoftonline.com/common",
        redirectUri: "https://yukiiii231.github.io/SUPPORT-Q/homepage.html"
    }
};

const msalInstance = new msal.PublicClientApplication(msalConfig);


/* HANDLE REDIRECT AFTER MICROSOFT LOGIN */
msalInstance.handleRedirectPromise().then(() => {

    const account = msalInstance.getAllAccounts()[0];
    const role = sessionStorage.getItem("loginRole");

    if (!account) return;

    const email = account.username.toLowerCase();

    if (role === "student" && email.endsWith("@fairview.sti.edu.ph")) {
        window.location.href = "student_dashboard.html";
    }

    if (role === "admin" && email.endsWith("@fairview.sti.edu.ph")) {
        window.location.href = "admin_dashboard.html";
    }

}).catch(err => console.log(err));


/* STUDENT LOGIN */
function loginStudent(){

    sessionStorage.setItem("loginRole","student");

    msalInstance.loginRedirect({
        scopes:["user.read"]
    });

}


/* ADMIN LOGIN */
function loginAdmin(){

    sessionStorage.setItem("loginRole","admin");

    msalInstance.loginRedirect({
        scopes:["user.read"]
    });

}


function closeAll(){
    document.querySelectorAll(".modal").forEach(m => m.style.display = "none");
}
