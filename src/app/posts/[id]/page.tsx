/*
 * @Author: Mr.Car
 * @Date: 2025-02-26 16:22:02
 */
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function PostDetail({ params }: { params: { id: string } }) {
  const post = await prisma.post.findUnique({
    where: { id: Number(params.id) },
  });

  if (!post) {
    notFound(); // 如果文章不存在，返回 404
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <article className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
          <p className="text-sm text-gray-500 mb-6">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
          <div className="prose prose-lg text-gray-700 mb-8">
            {post.content}
          </div>
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            返回主页
          </Link>
        </article>
      </main>
    </div>
  );
}