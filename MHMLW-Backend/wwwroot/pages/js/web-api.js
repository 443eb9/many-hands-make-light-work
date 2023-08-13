import { Api, RequestType, siteAvatarUrl } from "./constants.js";
import { request } from "./request.js";
import { GetPostsPreviewRequest, LoginRequest, RegisterRequest, RetrieveRequest, SendVerifCodeRequest } from "./models/requests.js";
export function getUserAvatarUrl(id) {
    return siteAvatarUrl + id + ".jpg";
}
export async function getUser(id) {
    return await request(Api.User, RequestType.Get, `
    {
        "userId":` + id + `
    }
    `);
}
export async function userLogin(username, password) {
    const req = new LoginRequest(username, password);
    return await request(Api.User, RequestType.Login, JSON.stringify(req));
}
export async function userRegister(username, password, email, verifCode, province) {
    const req = new RegisterRequest(username, password, email, verifCode, province);
    return await request(Api.User, RequestType.Register, JSON.stringify(req));
}
export async function userRetrieve(email, verifCode, newPassword) {
    const req = new RetrieveRequest(email, verifCode, newPassword);
    return await request(Api.User, RequestType.Retrieve, JSON.stringify(req));
}
export async function getNavBar() {
    return await request(Api.GetNavBar, RequestType.Get, "");
}
export async function getPostsPreview(offset, exludedProvinces, expectMethods) {
    const req = new GetPostsPreviewRequest(offset, exludedProvinces, expectMethods);
    return await request(Api.Post, RequestType.Get, JSON.stringify(req));
}
export async function sendVerifCode(linkedEmail) {
    const req = new SendVerifCodeRequest(linkedEmail);
    return await request(Api.ThirdParty, RequestType.VerificationCode, JSON.stringify(req));
}
export async function sendSolidarity(requesterId, receiverId) {
    return await request(Api.RequestSolidarity, RequestType.Send, `
    {
        "requesterId":` + requesterId + `,
        "receiverId":` + receiverId + `,
        "requestTime":` + Date.now() + `
    }
    `);
}
