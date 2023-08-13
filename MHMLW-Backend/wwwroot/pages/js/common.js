import { provinces } from "./constants.js";
const navBar = document.querySelector(".nav");
const msgContainer = document.querySelector(".msg-container");
// fetchNavBar();
// async function fetchNavBar() {
//     let navLinks: HypertextLink[] = await getNavBar();
//     for (let i = 0; i < navLinks.length; ++i) {
//         navBar.insertAdjacentHTML("beforeend", `
//     <a href="`+ navLinks[i].dest + `" class="button">"` + navLinks[i].name + `"</a>
//     `);
//     }
// }
export function getProvinceOptions() {
    let result = "";
    for (let i = 0; i < provinces.length; i++) {
        result += `<option value="${i}">${provinces[i][0]}</option>`;
    }
    return result;
}
export async function createMessage(content, isError) {
    msgContainer.insertAdjacentHTML("beforeend", `
    <div class="msg msg-display ` + (isError ? `error` : `info`) + `">
        ${content}
    </div>
    `);
    let msg = msgContainer.lastElementChild;
    await new Promise(resolve => setTimeout(resolve, 2000));
    msg.classList.remove("msg-display");
    await new Promise(resolve => setTimeout(resolve, 1000));
    msg.remove();
}
