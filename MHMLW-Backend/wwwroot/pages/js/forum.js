import { createMessage, getProvinceOptions } from "./common.js";
import { provinces, siteBaseUrl } from "./constants.js";
import { CUR_USER_ID, EXPECTED_METHOD, PROVINCE_EXCLUDED, loadCookies, updateCookie } from "./cookies.js";
import { getPostsPreview, getUser, getUserAvatarUrl } from "./web-api.js";
const postContainer = document.querySelector(".posts-container");
const personalInfo = document.querySelector(".personal-info");
const provinceSelecter = document.querySelector("#all-province");
const excludedProvince = document.querySelector(".exluded-prov-container");
const expectedMethods = [
    document.querySelector("#phone"),
    document.querySelector("#petition")
];
const addExcludeBtn = document.querySelector(".filter #exclude-confirm");
let fetchedPosts = 0;
window.onload = () => {
    registerButtonEvents();
    fetchPosts();
    fetchMyInfo();
    initFilter();
};
function registerButtonEvents() {
    addExcludeBtn.onclick = onExcludedProvinceAdded;
    for (let i = 0; i < expectedMethods.length; i++) {
        expectedMethods[i].onchange = () => {
            if (!EXPECTED_METHOD.includes(i))
                EXPECTED_METHOD.push(i);
            else
                EXPECTED_METHOD.splice(EXPECTED_METHOD.indexOf(i), 1);
            updateFilter();
        };
    }
}
async function fetchPosts() {
    let postsProcessResult = await getPostsPreview(fetchedPosts, PROVINCE_EXCLUDED, EXPECTED_METHOD);
    if (!postsProcessResult.isSuccess)
        return;
    let posts = postsProcessResult.data.previews;
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
                    <h3 class="province">` + provinces[posts[i].author.province][0] + `省</h3>
                    <h3 class="post-time">` + posts[i].postTime + `</h3>
                </div>
            </div>
            <hr>
            <a href="` + siteBaseUrl + `pages/post.html?post_id=` + posts[i].postId + `" class="preview">`
            + posts[i].preview +
            `</a>
        </div>`);
    }
    fetchedPosts += posts.length;
}
async function fetchMyInfo() {
    let result = await getUser(CUR_USER_ID);
    if (!result.isSuccess) {
        // @ts-ignore
        createMessage(result.data);
        return;
    }
    let me = result.data.user;
    personalInfo.insertAdjacentHTML("beforeend", `
    <img class="avatar" src="` + getUserAvatarUrl(me.id) + `.jpg"></img>
    <h1 class="username">` + me.name + `</h1>
    <h2 class="level">Lv. ` + me.level + `</h2>
    <h3 class="province">` + provinces[me.province][0] + `省</h3>
    `);
}
function onExcludedProvinceAdded() {
    let newProvinceId = Number.parseInt(provinceSelecter.value);
    if (!PROVINCE_EXCLUDED.includes(newProvinceId)) {
        PROVINCE_EXCLUDED.push(newProvinceId);
        updateFilter();
    }
}
function onExcludedProvinceDeleted(index) {
    PROVINCE_EXCLUDED.splice(index, 1);
    updateFilter();
}
async function initFilter() {
    document.querySelector(".filter #all-province").insertAdjacentHTML("beforeend", getProvinceOptions());
    readFilterCookies();
}
function updateFilter() {
    updateCookie("PROVINCE_EXCLUDED", PROVINCE_EXCLUDED.toString(), 30);
    updateCookie("EXPECTED_METHOD", EXPECTED_METHOD.toString(), 30);
    readFilterCookies();
}
function readFilterCookies() {
    loadCookies();
    excludedProvince.innerHTML = ``;
    for (let i = 0; i < PROVINCE_EXCLUDED.length; ++i) {
        excludedProvince.insertAdjacentHTML("beforeend", `
        <div class="exluded-prov card">
            <h4 class="prov-name">${provinces[PROVINCE_EXCLUDED[i]][0]}</h4>
            <button class="cancel" value="${i}"><i>&#xec7b;</i></button>
        </div>
        `);
    }
    for (let i = 0; i < EXPECTED_METHOD.length; ++i) {
        expectedMethods[EXPECTED_METHOD[i]].checked = true;
    }
    for (let i = 0; i < excludedProvince.children.length; i++) {
        let deleteBtn = excludedProvince.children[i].lastElementChild;
        deleteBtn.onclick = () => {
            onExcludedProvinceDeleted(Number.parseInt(deleteBtn.value));
        };
    }
}
