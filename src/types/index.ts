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
    id: string;
    title: string;
    content: string;
    createdAt: string;
    comments: { id: number; content: string; macId: string; createdAt: string }[];
}