/*
 * @Author: Mr.Car
 * @Date: 2025-02-26 22:08:25
 */
"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Session, Post, Comment } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";

export default function AdminPanel() {
  const { data: session } = useSession() as { data: Session | null };
  const [posts, setPosts] = useState<Post[]>([]); // 添加状态来存储帖子

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await fetch('/api/posts') // 调用 API 获取帖子
        .then(response => response.json());
      setPosts(fetchedPosts); // 更新状态
    };

    fetchPosts(); // 调用获取帖子函数
  }, []); // 仅在组件挂载时运行

  if (!session || session.user.role !== "ADMIN") {
    return <div className="min-h-screen bg-gray-100 text-black flex items-center justify-center">仅管理员可访问此页面</div>;
  }

  async function deleteComment(commentId: number) {
    await fetch(`/api/comments/${commentId}`, { method: "DELETE" });
    window.location.reload(); // 刷新当前页面
    // 这里可以添加删除后更新状态的逻辑
    window.location.reload(); // 刷新当前页面
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <Heading className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
        评论管理
      </Heading>
      <div className="grid gap-6">
        {posts.map((post: Post) => (
          <Card key={post.id} className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <CardTitle className="text-xl font-semibold mb-4">{post.title}</CardTitle>
            {post?.comments && post.comments.map((comment: Comment) => (
              <CardContent key={comment.id} className="p-4 bg-slate-100 rounded-md mb-4 flex justify-between items-center">
                <div>
                  <p>{comment.content}</p>
                  <p className="text-sm">由 {comment.macId} 发表</p>
                </div>
                <Button onClick={() => deleteComment(comment.id)} className="bg-red-600 hover:underline font-medium">删除</Button>
              </CardContent>
            ))}
          </Card>
        ))}
      </div>
    </div>
  );
}