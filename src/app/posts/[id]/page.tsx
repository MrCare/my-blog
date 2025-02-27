/*
 * @Author: Mr.Car
 * @Date: 2025-02-26 16:22:02
 */
"use client";

import { notFound } from "next/navigation";
import React, { FormEvent, Usable } from "react";
import { useState, useEffect } from "react";
import { Post } from "@/types"
import MDEditor from "@uiw/react-md-editor"; // 导入 MDEditor

export default function PostDetail({ params }: { params: Usable<{ id: string }> }) {
  const [post , setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  
  // 使用 React.use() 解包 params
  const { id } = React.use(params) as { id:string };

  useEffect(() => {
    async function loadPost() {
      const res = await fetch(`/api/posts/${id}`); // 使用解包后的 id
      if (!res.ok) notFound();
      const data = await res.json();
      setPost(data);
      setLoading(false);
    }
    loadPost();
  }, [id]);

  if (loading) return (
    <main className="min-h-screen bg-dune-base">
      <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-pulse flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-4 border-dune-accent border-t-transparent rounded-full animate-spin"></div>
            <h1 className="text-dune-sand">加载中...</h1>
          </div>
        </div>
      </div>
    </main>
  );
  if (!post) return null;

  async function handleCommentSubmit(e: FormEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const content = form.content.value;
    const macId = `guest-${Date.now()}`; // 简单替代 MAC

    const res = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ content, postId: post?.id, macId }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      form.reset();
      // 重新获取帖子数据以更新评论列表
      const postRes = await fetch(`/api/posts/${id}`); // 使用解包后的 id
      if (postRes.ok) {
        const updatedPost = await postRes.json();
        setPost(updatedPost);
      }
    }
  }

  return (
    <main className="min-h-screen bg-dune-base">
      <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <article className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-wide">{post.title}</h1>
          <p className="text-sm text-gray-600 mb-6">{new Date(post.createdAt).toLocaleDateString()}</p>
          <div className="prose text-gray-800 mb-8">
            <MDEditor.Markdown source={post.content} /> {/* 使用 MDEditor 的解析器 */}
          </div>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">评论</h2>
            {post.comments?.map((comment: { id: number; content: string; macId: string; createdAt: string }) => (
              <div key={comment.id} className="p-4 bg-gray-50 rounded-md mb-4">
                <p className="text-gray-800">{comment.content}</p>
                <p className="text-sm text-gray-600">由 {comment.macId} 于 {new Date(comment.createdAt).toLocaleString()} 发表</p>
              </div>
            ))}
            <form onSubmit={handleCommentSubmit} className="mt-6 space-y-4">
              <textarea 
                name="content" 
                required 
                className="w-full p-3 bg-white border border-gray-300 rounded-md text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-24" 
              />
              <button 
                type="submit" 
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-all"
              >
                发表评论
              </button>
            </form>
          </section>
        </article>
      </div>
    </main>
  );
}