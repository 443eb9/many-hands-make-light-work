import { Api, apiMapper, siteApi, RequestType, requestTypeMapper } from "./constants.js";
import { AUTH_ID } from "./cookies.js";

export async function request(api: Api, requestType: RequestType, data: string) {
    return fetch(siteApi + apiMapper.get(api) + requestTypeMapper.get(requestType), {
        method: "POST",
        headers: getHeaders(),
        body: data
    }).then(async (response) => {
        return JSON.parse(await response.json());
    });
}

function getHeaders() {
    let headers: HeadersInit = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "authId": AUTH_ID,
    };
    return headers;
}

// async function encryptData(data: string): Promise<string> {
//     const textEncoder = new TextEncoder();
//     const encodedData = textEncoder.encode(data);

//     let iv = aesIv;
//     const encrypted = await crypto.subtle.encrypt({ name: 'AES-CBC', iv }, cryptoKey, encodedData);

//     return btoa(String.fromCharCode(...new Uint8Array(encrypted)));
// }

// async function decryptData(encryptedData: string): Promise<string> {
//     const encryptedBuffer = new Uint8Array(atob(encryptedData).split('').map(char => char.charCodeAt(0)));

//     let iv = aesIv;
//     const decrypted = await crypto.subtle.decrypt({ name: 'AES-CBC', iv }, cryptoKey, encryptedBuffer);

//     const textDecoder = new TextDecoder();
//     return textDecoder.decode(decrypted);
// }