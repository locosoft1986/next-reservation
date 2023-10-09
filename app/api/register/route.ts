import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";

export async function POST(
  request: Request,
) {
  const body = await request.json();
  const {
      email,
      firstName,
      lastName,
      mobile,
      password,
   } = body;

   const hashedPassword = await bcrypt.hash(password, 12);

   const usersCount = await prisma.user.count();

   const user = await prisma.user.create({
        data: {
            email,
            firstName,
            lastName,
            mobile,
            hashedPassword,
            isAdmin: usersCount === 0 // initialise the first user as admin
        }
  });

  return NextResponse.json(user);
}
