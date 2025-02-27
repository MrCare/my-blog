/*
 * @Author: Mr.Car
 * @Date: 2025-02-26 20:59:26
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
async function seed() {
  await prisma.user.create({
    data: {
      email: "admin@example.com",
      password: bcrypt.hashSync("admin123", 10),
      role: "ADMIN",
    },
  });
}

seed();