/*
 * @Author: Mr.Car
 * @Date: 2025-02-26 22:08:25
 */
"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function AdminPanel() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]); // 添加状态来存储帖子

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await fetch('/api/posts') // 调用 API 获取帖子
        .then(response => response.json());
      setPosts(fetchedPosts); // 更新状态
    };

    fetchPosts(); // 调用获取帖子函数
  }, []); // 仅在组件挂载时运行

  if (!session || session.user.role !== "ADMIN") {
    return <div className="min-h-screen bg-dune-dark text-dune-sand flex items-center justify-center">仅管理员可访问此页面</div>;
  }

  async function deleteComment(commentId: number) {
    await fetch(`/api/comments/${commentId}`, { method: "DELETE" });
    // 这里可以添加删除后更新状态的逻辑
  }

  return (
    <main className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-extrabold text-dune-accent mb-12 text-center tracking-tight">管理面板</h1>
      {posts.map((post) => (
        <div key={post.id} className="mb-8 p-6 bg-dune-dark/90 rounded-lg shadow-lg border border-dune-muted">
          <h2 className="text-2xl font-semibold text-dune-sand mb-4">{post.title}</h2>
          <h3 className="text-lg text-dune-sand/70 mb-2">评论</h3>
          {post.comments.map((comment) => (
            <div key={comment.id} className="p-4 bg-dune-muted/50 rounded-md mb-4 flex justify-between items-center">
              <div>
                <p className="text-dune-sand">{comment.content}</p>
                <p className="text-sm text-dune-sand/70">由 {comment.macId} 发表</p>
              </div>
              <button onClick={() => deleteComment(comment.id)} className="text-dune-accent hover:text-dune-sand">删除</button>
            </div>
          ))}
        </div>
      ))}
    </main>
  );
}