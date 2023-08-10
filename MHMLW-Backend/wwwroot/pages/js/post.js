import { provinces } from "./constants";
import { CUR_USER_ID } from "./cookies";
import { getUser, getUserAvatarUrl, sendSolidarity } from "./web-api";
let postAuthor;
let detailedPost;
async function fetchAuthorInfo() {
    let path = window.location.pathname.split('/');
    // url looks like:
    // xxx.com/xxx/xxx/posts/123-456.html
    // 123: user id
    // 456: post id
    postAuthor = await getUser(path[path.length - 1].split('.')[0].split('-')[0]);
    document.querySelector(".personal-info").insertAdjacentHTML("beforeend", `
    <h1 class="title">求助人</h1>
    <img class="avatar" src="` + getUserAvatarUrl(postAuthor.id) + `"></img>
    <h1 class="username">` + postAuthor.name + `</h1>
    <h2 class="level">Lv. ` + postAuthor.level + `</h2>
    <h3 class="province">` + provinces[postAuthor.province][0] + `省</h3>
    <h4 class="helped">ta已帮助过` + postAuthor.helped + `人</h4>
    <h4 class="being-helped">ta被帮助过` + postAuthor.beingHelped + `次</h4>
    <button class="request card">发起互助</button>
    `);
}
window.onload = () => {
    fetchAuthorInfo();
    fetchDetailedPost();
};
async function fetchDetailedPost() {
    document.querySelector(".post-container .content").innerHTML = detailedPost.content;
    document.querySelector(".info-table .school").innerHTML = detailedPost.classInfo[0];
    document.querySelector(".info-table .address").innerHTML = detailedPost.classInfo[1];
    document.querySelector(".info-table .fee").innerHTML = detailedPost.classInfo[2];
    document.querySelector(".info-table .time").innerHTML = detailedPost.classInfo[3];
    let methodTable = document.querySelector(".method-table");
    for (let i = 0; i < detailedPost.methodInfo.length; ++i) {
        methodTable.insertAdjacentHTML("beforeend", `
        <tr>
            <td>` + detailedPost.methodInfo[i][0] + `</td>
            <td>` + detailedPost.methodInfo[i][1] + `</td>
            <td>` + detailedPost.methodInfo[i][2] + `</td>
        </tr>
        `);
    }
}
function requestSolidarity() {
    sendSolidarity(CUR_USER_ID, postAuthor.id);
}
