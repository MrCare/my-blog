/*
 * @Author: Mr.Car
 * @Date: 2025-02-26 16:05:27
 */
import { prisma } from "@/lib/prisma";
import { Post } from "@/types";
import Link from "next/link";

export default async function Home() {
  const posts:Post[] = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });

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
              key={post.id}
              className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {post.title}
              </h2>
              <p className="text-sm text-gray-500">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
              {post?.comments?.length > 0 && (
                <p className="text-dune-sand/90 mt-2">{post.comments.length} 条评论</p>
              )}
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}