import { provinces } from "./constants.js";
import { CUR_USER_ID, EXPECTED_METHOD, PROVINCE_EXCLUDED } from "./cookies.js";
import { getPosts, getUser, getUserAvatarUrl } from "./web-api.js";
const postContainer = document.querySelector(".posts-container");
const personalInfo = document.querySelector(".personal-info");
const provinceSelecter = document.querySelector("#all-province");
const excludedProvince = document.querySelector(".exluded-prov-container");
const expectedMethods = [
    document.querySelector("#phone"),
    document.querySelector("#petition")
];
window.onload = () => {
    fetchPosts();
    fetchMyInfo();
    readAllProvinces();
    setFilter();
};
async function fetchPosts() {
    let posts = await getPosts();
    for (let i = 0; i < posts.length; ++i) {
        postContainer.insertAdjacentHTML("beforeend", `
        <div class="post">
            <div class="info">
                <div class="user-info">
                    <img src="` + getUserAvatarUrl(posts[i].author.id) + `" class="avatar"></img>
                    <div class="basic-info">
                        <h2 class="level">Lv. ` + posts[i].author.level + `</h2>
                        <h1 class="username">` + posts[i].author.name + `</h1>
                    </div>
                </div>
                <div class="post-info">
                    <h3 class="province">` + posts[i].author.province + `</h3>
                    <h3 class="post-time">` + posts[i].postTime + `</h3>
                </div>
            </div>
            <hr>
            <a href="#" class="preview">`
            + posts[i].preview +
            `</a>
        </div>`);
    }
}
async function fetchMyInfo() {
    let me = await getUser(CUR_USER_ID);
    personalInfo.insertAdjacentHTML("beforeend", `
    <img class="avatar" src="` + me.id + `.jpg"></img>
    <h1 class="username">` + me.name + `</h1>
    <h2 class="level">Lv. ` + me.level + `</h2>
    <h3 class="province">` + me.province + `</h3>
    `);
}
function readAllProvinces() {
    for (let i = 0; i < provinces.length; ++i) {
        provinceSelecter.insertAdjacentHTML("beforeend", `
    <option class="` + provinces[i][1] + `">` + provinces[i][0] + `</option>
    `);
    }
}
async function setFilter() {
    for (let i = 0; i < PROVINCE_EXCLUDED.length; ++i) {
        excludedProvince.insertAdjacentHTML("beforeend", `
        <div class="exluded-prov card">
            <h4 class="prov-name">` + PROVINCE_EXCLUDED[i][0] + `</h4>
            <button class="cancel"><i>&#xec7b;</i></button>
        </div>
        `);
    }
    for (let i = 0; i < EXPECTED_METHOD.length; ++i) {
        expectedMethods[Number.parseInt(EXPECTED_METHOD[i])].checked = true;
    }
}
