export const provinces = [
    ["安徽", "anhui"],
    ["北京", "beijing"],
    ["重庆", "chongqing"],
    ["福建", "fujian"],
    ["甘肃", "gansu"],
    ["广东", "guangdong"],
    ["广西", "guangxi"],
    ["贵州", "guizhou"],
    ["海南", "hainan"],
    ["河北", "hebei"],
    ["河南", "henan"],
    ["黑龙江", "heilongjiang"],
    ["湖北", "hubei"],
    ["湖南", "hunan"],
    ["吉林", "jilin"],
    ["江苏", "jiangsu"],
    ["江西", "jiangxi"],
    ["辽宁", "liaoning"],
    ["内蒙古", "neimenggu"],
    ["宁夏", "ningxia"],
    ["青海", "qinghai"],
    ["山东", "shandong"],
    ["山西", "shan1xi"],
    ["陕西", "shan3xi"],
    ["上海", "shanghai"],
    ["四川", "sichuan"],
    ["天津", "tianjin"],
    ["西藏", "xizang"],
    ["新疆", "xinjiang"],
    ["云南", "yunnan"],
    ["浙江", "zhejiang"],
    ["香港", "xianggang"],
    ["澳门", "aomen"],
    ["台湾", "taiwan"]
];

export enum Api {
    GetNavBar,
    Post,
    User,
    ThirdParty,
    RequestSolidarity
};

export const apiMapper = new Map<Api, string>([
    [Api.GetNavBar, "navBar/"]
    [Api.Post, "posts/"],
    [Api.User, "user/"],
    [Api.ThirdParty, "thirdParty/"],
    [Api.RequestSolidarity, "solidarity/"]
]);

export enum RequestType {
    Get,
    Send,
    Login,
    Register,
    Retrieve
}

export const requestTypeMapper = new Map<RequestType, string>([
    [RequestType.Get, "get/"],
    [RequestType.Send, "send/"],
    [RequestType.Login, "login/"],
    [RequestType.Register, "register/"],
    [RequestType.Retrieve, "retrieve/"]
]);

export const aesKey = "123456";
export const aesIv = new Uint8Array([2, 51, 32, 47, 10, 52, 33]);
export const cryptoKey = await crypto.subtle.importKey('raw', new TextEncoder().encode(aesKey), 'AES-CBC', false, ['encrypt']);

export const siteAvatarUrl = "http://127.0.0.1:5500/front-end/assets/images/avatars/";
export const siteApi = "http://127.0.0.1/api/";