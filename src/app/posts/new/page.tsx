/*
 * @Author: Mr.Car
 * @Date: 2025-02-26 16:36:48
 */
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useTransition } from "react";
import { User, Session } from "@/types";
import MDEditor from "@uiw/react-md-editor";


export default function NewPost() {
  const { data: session } = useSession() as {data: Session | null};
  const router = useRouter();
  const [content, setContent] = useState(""); // 新增状态管理 Markdown 内容
  const [isPending, startTransition] = useTransition(); // React 19 并发特性

  if (!session || (session.user as User).role !== "ADMIN") {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-900 flex items-center justify-center">
        仅管理员可访问此页面
      </div>
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const title = form.title.value;

    startTransition(async () => {
      const res = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          title,
          content, // 使用状态中的 Markdown 内容
          authorId: Number(session?.user.id),
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        router.push("/");
      } else {
        alert("创建失败");
      }
    });
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">新建日志</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">标题</label>
            <input 
              id="title" 
              name="title" 
              type="text" 
              required 
              disabled={isPending} // 提交时禁用
              className="mt-1 block w-full max-w-5xl h-12 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 pl-4" 
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">内容</label>
            <MDEditor
              value={content}
              onChange={(value) => setContent(value || "")} // 更新 Markdown 内容
              height={500}
              // disabled={isPending} // 提交时禁用
              className="mt-1 block w-full max-w-5xl"
            />
          </div>
          <div className="flex">
            <button 
              type="submit" 
              disabled={isPending} // 提交时禁用
              className="rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
            >
              {isPending ? "提交中..." : "发表"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}