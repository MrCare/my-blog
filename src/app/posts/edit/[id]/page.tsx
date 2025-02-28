/*
 * @Author: Mr.Car
 * @Date: 2025-02-28 16:24:09
 */
"use client"

import PostEditor from "@/components/PostEditer";
import { useParams } from "next/navigation";

export default function NewPostPage() {
    const params = useParams()
    return <PostEditor mode="edit" id={params.id as string} />;
}