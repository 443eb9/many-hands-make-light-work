import { Api, apiMapper, siteApi, aesIv, cryptoKey } from "./constants.js";
import { AUTH_ID } from "./cookies.js";

export async function request(api: Api, data: string) {
    return fetch(siteApi + apiMapper[api], {
        method: "POST",
        headers: getHeaders(),
        body: await encryptData(data)
    }).then(async (response) => {
        return JSON.parse(await decryptData(await response.json()));
    });
}

function getHeaders() {
    let headers: HeadersInit = {
        "auth-id": AUTH_ID,
    };
    return headers;
}

async function encryptData(data: string): Promise<string> {
    const textEncoder = new TextEncoder();
    const encodedData = textEncoder.encode(data);

    let iv = aesIv;
    const encrypted = await crypto.subtle.encrypt({ name: 'AES-CBC', iv }, cryptoKey, encodedData);

    return btoa(String.fromCharCode(...new Uint8Array(encrypted)));
}

async function decryptData(encryptedData: string): Promise<string> {
    const encryptedBuffer = new Uint8Array(atob(encryptedData).split('').map(char => char.charCodeAt(0)));

    let iv = aesIv;
    const decrypted = await crypto.subtle.decrypt({ name: 'AES-CBC', iv }, cryptoKey, encryptedBuffer);

    const textDecoder = new TextDecoder();
    return textDecoder.decode(decrypted);
}