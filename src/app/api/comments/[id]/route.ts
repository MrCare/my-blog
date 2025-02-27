/*
 * @Author: Mr.Car
 * @Date: 2025-02-26 22:09:31
 */
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { Session } from "@/types/index";

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const session : Session | null = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "无权限" }, { status: 403 });
  }

  await prisma.comment.delete({
    where: { id: Number(params.id) },
  });

  return NextResponse.json({ message: "评论已删除" });
}