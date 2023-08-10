import { sendVerifCode, userLogin, userRegister, userRetrieve } from "./web-api.js";

let currentPage = 0;
let pageToPanel: HTMLElement[] = [
    document.querySelector(".login-panel"),
    document.querySelector(".regisiter-panel"),
    document.querySelector(".retrieve-panel")
];
let strToPage = new Map<string, number>([
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
}

const usernameFieldLogin: HTMLElement = document.querySelector(".login-panel .username");
const passwordFieldLogin: HTMLElement = document.querySelector(".login-panel .password");

const usernameFieldReg: HTMLElement = document.querySelector(".register-panel .username");
const passwordFieldReg: HTMLElement = document.querySelector(".register-panel .password");
const emailFieldReg: HTMLElement = document.querySelector(".register-panel .email");
const verifCodeFieldReg: HTMLElement = document.querySelector(".register-panel .verif-code");

const emailFieldRet: HTMLElement = document.querySelector(".retrieve-panel .email");
const verifCodeFieldRet: HTMLElement = document.querySelector(".retrieve-panel .verif-code");

function registerButtonEvents() {
    let switchA: HTMLElement = document.querySelector("#switch-a");
    let switchB: HTMLElement = document.querySelector("#switch-b");
    switchA.onclick = () => {
        let to = strToPage.get(switchA.innerHTML);
        switchA.innerHTML = pageToStr[currentPage];
        switchPages(to);
    }
    switchB.onclick = () => {
        let to = strToPage.get(switchB.innerHTML);
        switchB.innerHTML = pageToStr[currentPage];
        switchPages(to);
    }

    let submit: HTMLElement = document.querySelector("#submit");
    submit.onclick = () => {
        switch (currentPage) {
            case 0:
                userLogin(usernameFieldLogin.innerText, passwordFieldLogin.innerText);
                break;
            case 1:
                userRegister(usernameFieldReg.innerText, passwordFieldReg.innerText,
                    emailFieldReg.innerText, verifCodeFieldReg.innerText);
                break;
            case 2:
                // userRetrieve(emailFieldRet.innerText, verifCodeFieldRet.innerText);
                break;
        }
    }

    let sendCodeBtns: NodeListOf<HTMLElement> = document.querySelectorAll(".send-verif-code");
    sendCodeBtns.forEach(btn => {
        btn.onclick = () => {
            let email = currentPage == 1 ? emailFieldReg : emailFieldRet;
            sendVerifCode(email.innerText);
        }
    });
}

function switchPages(to: number) {
    pageToPanel[currentPage].style.display = "none";
    pageToPanel[to].style.display = "block";
    currentPage = to;
}