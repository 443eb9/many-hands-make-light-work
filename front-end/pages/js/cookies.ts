export let AUTH_ID: string;
export let CUR_USER_ID: string;
export let PROVINCE_EXCLUDED_STR: string;
export let PROVINCE_EXCLUDED: string[] = [];
export let EXPECTED_METHOD_STR: string;
export let EXPECTED_METHOD: string[] = [];

loadCookies();

function loadCookies() {
    AUTH_ID = getCookie("AUTH_ID");
    CUR_USER_ID = getCookie("CUR_USER_ID");
    PROVINCE_EXCLUDED_STR = getCookie("PROVINCE_EXLUDED");
    let provs = PROVINCE_EXCLUDED_STR.split(',');
    for (let i = 0; i < provs.length; ++i) {
        PROVINCE_EXCLUDED.push(provs[i]);
    }
    EXPECTED_METHOD_STR = getCookie("EXPECTED_METHOD_STR");
    let methods = EXPECTED_METHOD_STR.split(',')
    for (let i = 0; i < methods.length; ++i) {
        EXPECTED_METHOD.push(methods[i]);
    }
}

function setCookie(name: string, value: string, days: number) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
    const expires = expirationDate.toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

function getCookie(name: string): string | null {
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith(name))
        ?.split('=')[1];
    return cookieValue ? decodeURIComponent(cookieValue) : null;
}

function updateCookie(name: string, newValue: string, days: number) {
    deleteCookie(name);
    setCookie(name, newValue, days);
}

function deleteCookie(name: string) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}