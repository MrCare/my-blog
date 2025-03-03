/*
 * @Author: Mr.Car
 * @Date: 2025-03-03 22:00:48
 */
// components/ui/heading.tsx
import { cn } from "@/lib/utils";

interface HeadingProps {
  children: React.ReactNode;
  className?: string;
}

export function Heading({ children, className }: HeadingProps) {
  return (
    <h1
      className={cn(
        "text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight",
        className
      )}
    >
      {children}
    </h1>
  );
}