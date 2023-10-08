import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    console.log(name);
    console.log(email);
    console.log(password);
    return NextResponse.json({ message: "User registered" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error while registering the user" },
      { status: 500 }
    );
  }
}
