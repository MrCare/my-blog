/*
 * @Author: Mr.Car
 * @Date: 2025-02-27 09:16:43
 */
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { Session } from "@/types";

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

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const session: Session | null = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "无权限" }, { status: 403 });
  }
  const data = await request.json();
  const updatedPost = await prisma.post.update({
    where: { id: Number(params.id) },
    data: {
      title: data.title, 
      content: data.content,
      authorId: Number(data.authorId)
    },
  });
  return NextResponse.json(updatedPost);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const session: Session | null = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "无权限" }, { status: 403 });
  }

  await prisma.post.delete({
    where: { id: Number(params.id) },
  });

  return NextResponse.json({ message: "博客已删除" });
}