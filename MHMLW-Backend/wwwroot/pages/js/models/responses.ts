export interface ProcessResult<T> {
    isSuccess: boolean
    data: T
}

export interface AuthInfo {
    authId: string
    expireAt: number
}

export interface LoginResponse {
    message: string
    authInfo: AuthInfo
}

export interface MessageResponse {
    message: string
}