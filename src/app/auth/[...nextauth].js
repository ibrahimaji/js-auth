import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          const findUser = await prisma.user.findUnique({
            where: {
              email,
            },
          });
          if (!findUser) {
            return NextResponse.json({ error: "User Not Found" });
          }
          const hashedPassword = findUser.password;
          const isPasswordValid = await bcrypt.compare(
            password,
            hashedPassword
          );
          if (!isPasswordValid) {
            return NextResponse.json({ error: "Wrong Password" });
          }
          const payload = {
            id: findUser.id,
            name: findUser.name,
            email: findUser.email,
          };
          const token = jwt.sign(
            {
              id: findUser.id,
              name: findUser.name,
              email: findUser.email,
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1d" }
          );
          const res = NextResponse.json({
            token: token,
            user: payload,
            message: "Login Successfully",
          });
          res.cookies.set("token", token);
          return res;
        } catch (error) {}
        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
