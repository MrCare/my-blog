/*
 * @Author: Mr.Car
 * @Date: 2025-02-26 16:36:48
 */
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { User, Session } from "@/types";
import PostForm from "@/components/PostForm";
import Loading from "@/components/Loading";
// import { Heading } from "./ui/heading";

export default function PostEditer({mode, id}:{mode:string, id:string}) {
  const { data: session } = useSession() as {data: Session | null};
  const router = useRouter();
  const isEditMode = mode === "edit"; // 路由没有id的话就是编辑模式
  const [loading, setLoading] = useState(isEditMode); // 编辑模式才加载
  const [isPending, startTransition] = useTransition(); // React 19 并发特性
  const [initialTitle, setInitialTitle] = useState("");
  const [initialContent, setInitialContent] = useState("");

  // 加载编辑数据
  useEffect(() => {
    if (isEditMode) {
      async function fetchPost() {
        const res = await fetch(`/api/posts/${id}`);
        if (res.ok) {
          const post = await res.json();
          console.log("title:", post.title)
          setInitialTitle(post.title);
          setInitialContent(post.content);
        }
        setLoading(false);
      }
      fetchPost();
    }
  }, [id, isEditMode]);

  if (!session || (session.user as User).role !== "ADMIN") {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-900 flex items-center justify-center">
        仅管理员可访问此页面
      </div>
    );
  }  

  async function handleSubmit({ title, content }:{title:string, content:string}) {
    startTransition(async () => {
      const url = isEditMode ? `/api/posts/${id}` : "/api/posts";
      const method = isEditMode ? "PUT" : "POST";
      const res = await fetch(url, {
        method: method,
        body: JSON.stringify({
          title,
          content, // 使用状态中的 Markdown 内容
          authorId: Number(session?.user.id),
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        const redirectUrl = isEditMode ? `/posts/${id}` : "/";
        router.push(redirectUrl);
      } else {
        alert(`${isEditMode ? "更新" : "创建"}失败`);
      }
    });
  }

  if (loading) return <Loading/>;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* <Heading className="mb-8 text-center">{isEditMode ? "编辑日志" : "新建日志"}</Heading> */}
      <PostForm
        initialTitle={initialTitle}
        initialContent={initialContent}
        onSubmit={handleSubmit}
        isPending={isPending}
        submitText={isEditMode ? "保存" : "发表"}
      />
    </div>
  );
}