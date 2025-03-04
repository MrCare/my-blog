/*
 * @Author: Mr.Car
 * @Date: 2025-02-26 16:05:27
 */
import { prisma } from "@/lib/prisma";
import { Post } from "@/types";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/heading";

export default async function Home() {
  const posts:Post[] = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { comments: true }
  })

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <Heading className="mb-8 text-center">Life Blog</Heading>
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
                  <Badge className="mr-4" variant="default">{post.comments.length} 条评论</Badge>
                )}
                {/* 可选：添加按钮 */}
                <Badge variant="secondary" className="mt-4 p-0 h-auto text-gray-600">
                  查看详情
                </Badge>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}