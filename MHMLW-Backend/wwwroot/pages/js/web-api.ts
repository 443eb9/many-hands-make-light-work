import { Api, RequestType, siteAvatarUrl } from "./constants.js";
import { EXPECTED_METHOD_STR, PROVINCE_EXCLUDED_STR } from "./cookies.js";
import { request } from "./request.js";
import { GetPostsPreviewRequest, LoginRequest, RegisterRequest, RetrieveRequest, SendVerifCodeRequest } from "./models/requests.js";
import { LoginResponse, MessageResponse, ProcessResult } from "./models/responses.js";

export function getUserAvatarUrl(id: string) {
    return siteAvatarUrl + id + ".jpg";
}

export async function getUser(id: string) {
    return await request(Api.User, RequestType.Get, `
    {
        "userId":`+ id + `
    }
    `);
}

export async function userLogin(username: string, password: string): Promise<ProcessResult<LoginResponse>> {
    const req = new LoginRequest(username, password);
    return await request(Api.User, RequestType.Login, JSON.stringify(req));
}

export async function userRegister(username: string, password: string, email: string, verifCode: string, province: number): Promise<ProcessResult<MessageResponse>> {
    const req = new RegisterRequest(username, password, email, verifCode, province);
    return await request(Api.User, RequestType.Register, JSON.stringify(req));
}

export async function userRetrieve(email: string, verifCode: string, newPassword: string): Promise<ProcessResult<MessageResponse>> {
    const req = new RetrieveRequest(email, verifCode, newPassword);
    return await request(Api.User, RequestType.Retrieve, JSON.stringify(req));
}

export async function getNavBar() {
    return await request(Api.GetNavBar, RequestType.Get, "");
}

export async function getPostsPreview(offset: number, exludedProvinces: number[], expectMethods: number[]) {
    const req = new GetPostsPreviewRequest(offset, exludedProvinces, expectMethods);
    return await request(Api.Post, RequestType.Get, JSON.stringify(req));
}

export async function sendVerifCode(linkedEmail: string): Promise<ProcessResult<MessageResponse>> {
    const req = new SendVerifCodeRequest(linkedEmail);
    return await request(Api.ThirdParty, RequestType.VerificationCode, JSON.stringify(req));
}

export async function sendSolidarity(requesterId: string, receiverId: string) {
    return await request(Api.RequestSolidarity, RequestType.Send, `
    {
        "requesterId":`+ requesterId + `,
        "receiverId":`+ receiverId + `,
        "requestTime":`+ Date.now() + `
    }
    `);
}