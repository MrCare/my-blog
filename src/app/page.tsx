/*
 * @Author: Mr.Car
 * @Date: 2025-02-26 16:05:27
 */
import { prisma } from "@/lib/prisma";
import { Post } from "@/types";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default async function Home() {
  const posts:Post[] = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { comments: true }
  })

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
          Life Blog
        </h1>
        <div className="grid gap-6">
          {posts.map((post) => (
            <Link
              href={`/posts/${post.id}`}
              key={post.id.toString()}
            >
              <Card className="hover:shadow-lg transition-shadow duration-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    {post.createdAt.toLocaleDateString()}
                  </p>
                  <Separator className="my-2" />
                  {post?.comments && post.comments.length > 0 && (
                    <Badge className="bg-slate-950" variant="secondary">{post.comments.length} 条评论</Badge>
                  )}
                  <Separator className="my-2" />
                  {/* 可选：添加按钮 */}
                  <Button variant="link" className="mt-4 p-0 h-auto text-gray-600">
                    查看详情
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}