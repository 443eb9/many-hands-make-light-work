import { Api } from "./constants.js";
import { request } from "./request.js";
const navBar = document.querySelector(".nav");
fetchNavBar();
async function fetchNavBar() {
    let navLinks = await request(Api.GetNavBar, "");
    for (let i = 0; i < navLinks.length; ++i) {
        navBar.insertAdjacentHTML("beforeend", `
    <a href="` + navLinks[i].dest + `" class="button">"` + navLinks[i].name + `"</a>
    `);
    }
}
