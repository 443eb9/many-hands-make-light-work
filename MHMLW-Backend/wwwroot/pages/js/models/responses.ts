export interface ProcessResult<T> {
    isSuccess: boolean
    data: T
}

export interface AuthInfo {
    userId: number
    authId: string
    expireAt: number
}

export interface LoginResponse {
    message: string
    authInfo: AuthInfo
}

export interface GetUserResponse {
    user: User
}

export interface GetPostsPreviewResponse {
    previews: PostPreview[]
}

export interface MessageResponse {
    message: string
}