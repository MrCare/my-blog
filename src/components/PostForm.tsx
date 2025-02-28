/*
 * @Author: Mr.Car
 * @Date: 2025-02-28 14:00:46
 */
"use client";

import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";

type PostFormProps = {
  initialTitle?: string;
  initialContent?: string;
  onSubmit: (data: { title: string; content: string }) => void;
  isPending: boolean;
  submitText?: string;
};

export default function PostForm({
  initialTitle = "",
  initialContent = "",
  onSubmit,
  isPending,
  submitText = "发表",
}: PostFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ title, content });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          标题
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          value={title}
          disabled={isPending} // 提交时禁用
          onChange={(e) => setTitle(e.target.value || "")}
          className="mt-1 block w-full max-w-5xl h-12 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 pl-4"
        />
      </div>
      <div className="flex flex-col">
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700"
        >
          内容
        </label>
        <MDEditor
          value={content}
          onChange={(value) => setContent(value || "")} // 更新 Markdown 内容
          height={500}
          // disabled={isPending} // 提交时禁用
          className="mt-1 block w-full max-w-5xl"
        />
      </div>
      <div className="flex">
        <button
          type="submit"
          disabled={isPending} // 提交时禁用
          className="rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
        >
          {isPending ? "保存中..." : submitText}
        </button>
      </div>
    </form>
  );
}
