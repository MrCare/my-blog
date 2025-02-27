/*
 * @Author: Mr.Car
 * @Date: 2025-02-26 21:26:06
 */
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { content, postId, macId } = await request.json();

  const comment = await prisma.comment.create({
    data: {
      content,
      postId: Number(postId),
      macId: macId || `guest-${Date.now()}`, // 简单替代方案
    },
  });

  return NextResponse.json(comment, { status: 201 });
}