import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";
import { prisma } from "@/utils/prisma";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    const createUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { data: createUser, message: "User registered" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error while registering the user" },
      { status: 500 }
    );
  }
}
