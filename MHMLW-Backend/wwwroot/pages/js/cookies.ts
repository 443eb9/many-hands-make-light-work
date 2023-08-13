export let AUTH_ID: string;
export let CUR_USER_ID: number;
export let PROVINCE_EXCLUDED_STR: string;
export let PROVINCE_EXCLUDED: number[] = [];
export let EXPECTED_METHOD_STR: string;
export let EXPECTED_METHOD: number[] = [];

loadCookies();

export function loadCookies() {
    AUTH_ID = getCookie("AUTH_ID");
    CUR_USER_ID = Number.parseInt(getCookie("CUR_USER_ID"));

    PROVINCE_EXCLUDED = [];
    PROVINCE_EXCLUDED_STR = getCookie("PROVINCE_EXCLUDED");
    if (PROVINCE_EXCLUDED_STR != null) {
        let provs = PROVINCE_EXCLUDED_STR.split(",");
        for (let i = 0; i < provs.length; ++i) {
            PROVINCE_EXCLUDED.push(Number.parseInt(provs[i]));
        }
    }

    EXPECTED_METHOD = [];
    EXPECTED_METHOD_STR = getCookie("EXPECTED_METHOD");
    if (EXPECTED_METHOD_STR != null) {
        let methods = EXPECTED_METHOD_STR.split(",");
        for (let i = 0; i < methods.length; ++i) {
            EXPECTED_METHOD.push(Number.parseInt(methods[i]));
        }
    }
}

export function setCookie(name: string, value: string, days: number) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
    const expires = expirationDate.toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

export function getCookie(name: string): string | null {
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith(name))
        ?.split('=')[1];
    return cookieValue ? decodeURIComponent(cookieValue) : null;
}

export function updateCookie(name: string, newValue: string, days: number) {
    deleteCookie(name);
    setCookie(name, newValue, days);
}

export function deleteCookie(name: string) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}