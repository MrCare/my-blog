/*
 * @Author: Mr.Car
 * @Date: 2025-02-28 15:05:42
 */
import React from "react";

const Loading: React.FC = () => {
  return (
    <main className="min-h-screen bg-white"> {/* 修改背景颜色 */}
      <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-pulse flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-4 border-gray-500 border-t-transparent rounded-full animate-spin"></div> {/* 修改边框颜色 */}
            <h1 className="text-gray-800">加载中...</h1> {/* 修改文本颜色 */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Loading;