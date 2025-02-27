/*
 * @Author: Mr.Car
 * @Date: 2025-02-27 09:16:43
 */
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const post = await prisma.post.findUnique({
    where: { id: Number(params.id) },
    include: { comments: true }, // 包含评论数据
  });

  if (!post) {
    return NextResponse.json({ error: "博客不存在" }, { status: 404 });
  }

  return NextResponse.json(post);
}