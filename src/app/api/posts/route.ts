/*
 * @Author: Mr.Car
 * @Date: 2025-02-26 16:23:36
 */
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Session } from "@/types";


export async function GET() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { comments: true }, // 包含评论数据
  });

  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions) as Session;
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "无权限" }, { status: 403 });
  }

  const { title, content, authorId } = await request.json();
  const post = await prisma.post.create({
    data: { title, content, authorId: Number(authorId) },
  });

  return NextResponse.json(post, { status: 201 });
}