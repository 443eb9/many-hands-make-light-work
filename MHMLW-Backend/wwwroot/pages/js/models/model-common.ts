interface PostPreview {
    postId: number
    author: User
    postTime: string,
    preview: string
}

interface User {
    id: number
    name: string
    level: number
    province: number
    helped: number
    beingHelped: number
}

interface HypertextLink {
    name: string
    dest: string
}

interface Post {
    author: User
    content: string
    classInfo: string[]
    methodInfo: string[][]
}