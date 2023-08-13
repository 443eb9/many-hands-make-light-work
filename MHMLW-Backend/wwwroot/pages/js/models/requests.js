export class LoginRequest {
    username;
    password;
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}
export class RegisterRequest {
    username;
    password;
    email;
    verifCode;
    province;
    constructor(username, password, email, verifCode, province) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.verifCode = verifCode;
        this.province = province;
    }
}
export class RetrieveRequest {
    email;
    verifCode;
    newPassword;
    constructor(email, verifCode, newPassword) {
        this.email = email;
        this.verifCode = verifCode;
        this.newPassword = newPassword;
    }
}
export class SendVerifCodeRequest {
    email;
    constructor(email) {
        this.email = email;
    }
}
export class GetUserRequest {
    userId;
    constructor(userId) {
        this.userId = userId;
    }
}
export class GetPostsPreviewRequest {
    offset;
    length;
    exludedProvinces;
    expectMethods;
    constructor(offset, exludedProvinces, expectMethods) {
        this.offset = offset;
        this.length = 15;
        this.exludedProvinces = exludedProvinces;
        this.expectMethods = expectMethods;
    }
}
export class GetPostRequest {
    postId;
    constructor(postId) {
        this.postId = postId;
    }
}
