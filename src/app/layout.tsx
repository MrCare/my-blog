/*
 * @Author: Mr.Car
 * @Date: 2025-02-26 17:23:24
 */
import "./globals.css";
import Link from "next/link";
import Providers from "@/components/Providers";
import LogoutButton from "@/components/LogoutButton"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Session } from "@/types";


export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session: Session | null = await getServerSession(authOptions);  
  return (
    <html lang="zh">
      <body>
        <Providers>
          <nav className="bg-white shadow-md sticky top-0 z-10">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
              <Link href="/" className="text-xl font-bold text-gray-900">
                Life Blog
              </Link>
              <div className="space-x-4">
                <Link href="/" className="text-gray-600 hover:text-blue-600">
                  主页
                </Link>
                {session?.user.role === "ADMIN" && (
                <>
                  <Link href="/posts/new" className="text-gray-600 hover:text-blue-600 transition-colors">新建日志</Link>
                  <Link href="/admin" className="text-gray-600 hover:text-blue-600 transition-colors">评论管理</Link>
                </>
              )}
              {session ? (
                <LogoutButton className="text-gray-600 hover:text-blue-600 transition-colors">登出</LogoutButton>
              ) : (
                <Link href="/auth/signin" className="text-gray-600 hover:text-blue-600 transition-colors">登录</Link>
              )}
              </div>
            </div>
          </nav>
          {children}
        </Providers>
      </body>
    </html>
  );
}