import { provinces } from "./constants.js";
import { getNavBar } from "./web-api.js";

const navBar: HTMLElement = document.querySelector(".nav");
const msgContainer: HTMLElement = document.querySelector(".msg-container");

// fetchNavBar();

// async function fetchNavBar() {
//     let navLinks: HypertextLink[] = await getNavBar();
//     for (let i = 0; i < navLinks.length; ++i) {
//         navBar.insertAdjacentHTML("beforeend", `
//     <a href="`+ navLinks[i].dest + `" class="button">"` + navLinks[i].name + `"</a>
//     `);
//     }
// }

export function getProvinceOptions(): string {
    let result = "";
    for (let i = 0; i < provinces.length; i++) {
        result += `<option value="${i}">${provinces[i][0]}</option>`;
    }
    return result;
}

export async function createMessage(content: string, isError: boolean) {
    msgContainer.insertAdjacentHTML("beforeend", `
    <div class="msg msg-display `+ (isError ? `error` : `info`) + `">
        ${content}
    </div>
    `);
    let msg = msgContainer.lastElementChild;
    await new Promise(resolve => setTimeout(resolve, 2000));
    msg.classList.remove("msg-display");
    await new Promise(resolve => setTimeout(resolve, 1000));
    msg.remove();
}