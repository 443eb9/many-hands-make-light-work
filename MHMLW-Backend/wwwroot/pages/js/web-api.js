import { Api, siteAvatarUrl } from "./constants.js";
import { EXPECTED_METHOD_STR, PROVINCE_EXCLUDED_STR } from "./cookies.js";
import { request } from "./request.js";
export function getUserAvatarUrl(id) {
    return siteAvatarUrl + id + ".jpg";
}
export async function getUser(id) {
    return await request(Api.User, `
    {
        "requestType":"get",
        "userId":` + id + `
    }
    `);
}
export async function userLogin(username, password) {
    return await request(Api.User, `
    {
        "requestType":"login",
        "username":"` + username + `",
        "password":"` + password + `"
    }
    `);
}
export async function userRegister(username, password, email, verifCode) {
    return await request(Api.User, `
    {
        "requestType":"register",
        "username":"` + username + `",
        "password":"` + password + `",
        "email":"` + email + `",
        "verifCode":"` + verifCode + `"
    }
    `);
}
export async function userRetrieve(email, verifCode) {
    return await request(Api.User, `
    {
        "requestType":"retrieve",
        "email":"` + email + `",
        "verifCode":"` + verifCode + `"
    }
    `);
}
export async function getNavBar() {
    return await request(Api.GetNavBar, "");
}
export async function getPosts() {
    return await request(Api.Post, `
        {
            "requestType":"get",
            "isDetailed":false,
            "excludedProvince":[` + PROVINCE_EXCLUDED_STR + `],
            "expectedMethod":[` + EXPECTED_METHOD_STR + `]
        }
        `);
}
export async function sendVerifCode(linkedEmail) {
    return await request(Api.ThirdParty, `
    {
        "requestType":"sendVerifCode",
        "email":"` + linkedEmail + `"
    }
    `);
}
export async function sendSolidarity(requesterId, receiverId) {
    return await request(Api.RequestSolidarity, `
    {
        "requesterId":` + requesterId + `,
        "receiverId":` + receiverId + `,
        "requestTime":` + Date.now() + `
    }
    `);
}
