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


/* HANDLE REDIRECT LOGIN */
msalInstance.handleRedirectPromise().then(response => {

    let account = null;

    if (response !== null) {
        account = response.account;
    } else {
        const accounts = msalInstance.getAllAccounts();
        if (accounts.length > 0) {
            account = accounts[0];
        }
    }

    if (!account) return;

    const role = sessionStorage.getItem("loginRole");
    const email = account.username.toLowerCase();

    if (role === "student" && email.endsWith("@fairview.sti.edu.ph")) {
        window.location.replace("student_dashboard.html");
        return;
    }

    if (role === "admin" && email.endsWith("@fairview.sti.edu.ph")) {
        window.location.replace("admin_dashboard.html");
        return;
    }

}).catch(err => console.error(err));


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