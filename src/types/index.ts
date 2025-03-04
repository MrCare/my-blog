/*
 * @Author: Mr.Car
 * @Date: 2025-02-27 17:50:37
 */
export interface User {
    role: string;
    id: string;
}

export interface Session {
    user: User;
}

export interface Post {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
    comments?: { id: number; content: string; macId: string; createdAt: Date }[];
}
export interface Comment {
    id: number; // 评论的唯一标识符
    content: string; // 评论内容
    macId: string; // 发表评论的用户标识符
    createdAt: Date
}