/*
 * @Author: Mr.Car
 * @Date: 2025-02-26 16:23:36
 */
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { title, content } = await request.json();
  const post = await prisma.post.create({
    data: { title, content },
  });
  return NextResponse.json(post);
}