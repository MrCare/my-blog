/*
 * @Author: Mr.Car
 * @Date: 2025-03-01 11:22:36
 */
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { AuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";

export const authOptions: AuthOptions = {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "text" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          if (!credentials?.email || !credentials?.password) return null;
  
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });
  
          if (!user || !bcrypt.compareSync(credentials.password, user.password)) {
            return null;
          }
  
          return { id: user.id.toString(), email: user.email, role: user.role };
        },
      }),
    ],
    // 明确指定使用 JWT
    session: {
      strategy: "jwt",
      maxAge: 30 * 24 * 60 * 60, // 30天过期
    },
  
    // JWT 配置
    jwt: {
      secret: process.env.NEXTAUTH_SECRET,
      maxAge: 30 * 24 * 60 * 60, // 30天过期
    },
    
    callbacks: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async jwt({ token, user }: { token: any; user: any }) {
        if (user) {
          token.role = user.role;
          token.id = user.id;
        }
        return token;
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async session({ session, token }: { session: any; token: JWT }) {
        if (session.user && typeof token.role === 'string') {
          session.user.role = token.role;
        }
        if (session.user && typeof token.id === 'string') {
          session.user.id = token.id;
        }
        return session;
      },
    },
    pages: {
      signIn: "/auth/signin",
    },
  };
  