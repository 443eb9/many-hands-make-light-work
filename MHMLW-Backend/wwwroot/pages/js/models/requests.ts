export class LoginRequest {
    username: string
    password: string

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}

export class RegisterRequest {
    username: string
    password: string
    email: string
    verifCode: string
    province: number

    constructor(username: string, password: string, email: string, verifCode: string, province: number) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.verifCode = verifCode;
        this.province = province;
    }
}

export class RetrieveRequest {
    email: string
    verifCode: string
    newPassword: string

    constructor(email: string, verifCode: string, newPassword: string) {
        this.email = email;
        this.verifCode = verifCode;
        this.newPassword = newPassword;
    }
}

export class SendVerifCodeRequest {
    email: string

    constructor(email: string) {
        this.email = email;
    }
}

export class GetUserRequest {
    userId: number

    constructor(userId: number) {
        this.userId = userId;
    }
}

export class GetPostsPreviewRequest {
    offset: number
    length: number
    exludedProvinces: number[]
    expectMethods: number[]

    constructor(offset: number, exludedProvinces: number[], expectMethods: number[]) {
        this.offset = offset;
        this.length = 15;
        this.exludedProvinces = exludedProvinces;
        this.expectMethods = expectMethods;
    }
}

export class GetPostRequest {
    postId: number

    constructor(postId: number) {
        this.postId = postId;
    }
}