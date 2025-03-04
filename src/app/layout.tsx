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
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, Smile } from "lucide-react";

type NavItem = {
  label: string;
  href?: string;
  component?: React.ReactNode;
  adminOnly?: boolean;
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session: Session | null = await getServerSession(authOptions);
  // 定义导航项
  const navItems: NavItem[] = [
    { label: "主页", href: "/" },
    { label: "新建日志", href: "/posts/new", adminOnly: true },
    { label: "评论管理", href: "/admin", adminOnly: true },
    session
      ? { label: "登出", component: <LogoutButton className="w-full text-left">登出</LogoutButton> }
      : { label: "登录", href: "/auth/signin" },
  ];
  return (
    <html lang="zh">
      <body>
        <Providers>
          <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
              <Link
                href="/"
                className="flex items-center text-xl font-bold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Smile/><span className="ml-1">Life Blog</span>
              </Link>

              {/* 导航容器 */}
              <div>
                {/* 桌面端导航（md 及以上） */}
                <div className="hidden md:flex items-center space-x-2 sm:space-x-4">
                  {navItems.map((item, index) =>
                    (!item.adminOnly || (session?.user.role === "ADMIN" && item.adminOnly)) && (
                      <Button
                        key={index}
                        asChild
                        variant="link"
                        size="default"
                      >
                        {item.href ? <Link href={item.href}>{item.label}</Link> : item.component}
                      </Button>
                    )
                  )}
                </div>

                {/* 移动端下拉菜单（md 以下） */}
                <div className="md:hidden">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="link" size="icon">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">菜单</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {navItems.map((item, index) =>
                        (!item.adminOnly || (session?.user.role === "ADMIN" && item.adminOnly)) && (
                          <DropdownMenuItem key={index} asChild>
                            {item.href ? (
                              <Link href={item.href} className="w-full">
                                {item.label}
                              </Link>
                            ) : (
                              item.component
                            )}
                          </DropdownMenuItem>
                        )
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </nav>
          <main className="bg-gray-100 dark:bg-gray-800 h-[calc(100vh-5rem)] w-screen shadow-md">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}