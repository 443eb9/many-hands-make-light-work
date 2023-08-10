import { sendVerifCode, userLogin, userRegister, userRetrieve } from "./web-api.js";
let currentPage = 0;
let pageToPanel = [
    document.querySelector(".login-panel"),
    document.querySelector(".regisiter-panel"),
    document.querySelector(".retrieve-panel")
];
let strToPage = new Map([
    ["登录", 0],
    ["注册", 1],
    ["找回", 2]
]);
let pageToStr = [
    "登录",
    "注册",
    "找回"
];
window.onload = () => {
    registerButtonEvents();
};
const usernameFieldLogin = document.querySelector(".login-panel .username");
const passwordFieldLogin = document.querySelector(".login-panel .password");
const usernameFieldReg = document.querySelector(".register-panel .username");
const passwordFieldReg = document.querySelector(".register-panel .password");
const emailFieldReg = document.querySelector(".register-panel .email");
const verifCodeFieldReg = document.querySelector(".register-panel .verif-code");
const emailFieldRet = document.querySelector(".retrieve-panel .email");
const verifCodeFieldRet = document.querySelector(".retrieve-panel .verif-code");
function registerButtonEvents() {
    let switchA = document.querySelector("#switch-a");
    let switchB = document.querySelector("#switch-b");
    switchA.onclick = () => {
        let to = strToPage.get(switchA.innerHTML);
        switchA.innerHTML = pageToStr[currentPage];
        switchPages(to);
    };
    switchB.onclick = () => {
        let to = strToPage.get(switchB.innerHTML);
        switchB.innerHTML = pageToStr[currentPage];
        switchPages(to);
    };
    let submit = document.querySelector("#submit");
    submit.onclick = () => {
        switch (currentPage) {
            case 0:
                userLogin(usernameFieldLogin.innerText, passwordFieldLogin.innerText);
                break;
            case 1:
                userRegister(usernameFieldReg.innerText, passwordFieldReg.innerText, emailFieldReg.innerText, verifCodeFieldReg.innerText);
                break;
            case 2:
                userRetrieve(emailFieldRet.innerText, verifCodeFieldRet.innerText);
                break;
        }
    };
    let sendCodeBtns = document.querySelectorAll(".send-verif-code");
    sendCodeBtns.forEach(btn => {
        btn.onclick = () => {
            let email = currentPage == 1 ? emailFieldReg : emailFieldRet;
            sendVerifCode(email.innerText);
        };
    });
}
function switchPages(to) {
    pageToPanel[currentPage].style.display = "none";
    pageToPanel[to].style.display = "block";
    currentPage = to;
}
