import { createMessage, getProvinceOptions } from "./common.js";
import { setCookie } from "./cookies.js";
import { sendVerifCode, userLogin, userRegister, userRetrieve } from "./web-api.js";
let currentPage = 0;
let pageToPanel = [
    document.querySelector(".login-panel"),
    document.querySelector(".register-panel"),
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
    document.querySelector(".register-panel .province").insertAdjacentHTML("beforeend", getProvinceOptions());
    registerButtonEvents();
};
const usernameFieldLogin = document.querySelector(".login-panel .username");
const passwordFieldLogin = document.querySelector(".login-panel .password");
const usernameFieldReg = document.querySelector(".register-panel .username");
const passwordFieldReg = document.querySelector(".register-panel .password");
const emailFieldReg = document.querySelector(".register-panel .email");
const verifCodeFieldReg = document.querySelector(".register-panel .verif-code");
const provinceFieldReg = document.querySelector(".register-panel .province");
const emailFieldRet = document.querySelector(".retrieve-panel .email");
const verifCodeFieldRet = document.querySelector(".retrieve-panel .verif-code");
const newPasswordFieldRet = document.querySelector(".retrieve-panel .new-password");
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
    submit.onclick = onSubmit;
    let sendCodeBtns = document.querySelectorAll(".send-verif-code");
    sendCodeBtns.forEach(btn => {
        btn.onclick = sendVerificationCode;
    });
}
function switchPages(to) {
    pageToPanel[currentPage].style.display = "none";
    pageToPanel[to].style.display = "block";
    currentPage = to;
}
async function onSubmit() {
    switch (currentPage) {
        case 0:
            login();
            break;
        case 1:
            register();
            break;
        case 2:
            retrieve();
            break;
    }
}
async function sendVerificationCode() {
    let email = currentPage == 1 ? emailFieldReg : emailFieldRet;
    let result = await sendVerifCode(email.value);
    createMessage(result.data.message, !result.isSuccess);
}
async function login() {
    let result = await userLogin(usernameFieldLogin.value, passwordFieldLogin.value);
    let response = result.data;
    if (result.isSuccess) {
        createMessage(response.message, false);
        setCookie("AUTH_ID", response.authInfo.authId, response.authInfo.expireAt);
        setCookie("CUR_USER_ID", response.authInfo.userId.toString(), 30);
        window.location.pathname = "";
    }
    else {
        createMessage(response.message, true);
    }
}
async function register() {
    let result = await userRegister(usernameFieldReg.value, passwordFieldReg.value, emailFieldReg.value, verifCodeFieldReg.value, Number.parseInt(provinceFieldReg.value));
    createMessage(result.data.message, !result.isSuccess);
}
async function retrieve() {
    let result = await userRetrieve(emailFieldRet.value, verifCodeFieldRet.value, newPasswordFieldRet.value);
    createMessage(result.data.message, !result.isSuccess);
}
