/*
 * @Author: Mr.Car
 * @Date: 2025-02-27 15:28:32
 */
'use client';

import { signOut } from "next-auth/react";

interface LogoutButtonProps {
  children: React.ReactNode;
}

function LogoutButton({ children }: LogoutButtonProps) {
  const handleLogout = () => {
    signOut({ callbackUrl: "/" }); // 登出后跳转到首页
  };

  return <button onClick={handleLogout}>{ children }</button>;
}

export default LogoutButton; // 导出 LogoutButton 组件