import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh">
      <body>
        <nav className="bg-white shadow-md sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              我的博客
            </Link>
            <div className="space-x-4">
              <Link href="/" className="text-gray-600 hover:text-blue-600">
                主页
              </Link>
              <Link
                href="/posts/new"
                className="text-gray-600 hover:text-blue-600"
              >
                新建文章
              </Link>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}