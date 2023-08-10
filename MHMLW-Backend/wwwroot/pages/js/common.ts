import { getNavBar } from "./web-api.js";

const navBar: HTMLElement = document.querySelector(".nav");

fetchNavBar();

async function fetchNavBar() {
    let navLinks: HypertextLink[] = await getNavBar();
    for (let i = 0; i < navLinks.length; ++i) {
        navBar.insertAdjacentHTML("beforeend", `
    <a href="`+ navLinks[i].dest + `" class="button">"` + navLinks[i].name + `"</a>
    `);
    }
}