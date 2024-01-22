import { SHA256 as sha256 } from "crypto-js";

// Prisma will help handle and catch errors
import { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { validateEmail } from "@/lib/utils";
import { getServerSession } from "next-auth/";

export const hashPassword = (string: string) => {
  return sha256(string).toString();
};
// function to create user in our database
export async function POST(req: Request, res: Response) {
  const { password, email } = await req.json();

  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return NextResponse.json(
      {
        success: false,
        message: "email already exist",
      },
      { status: 400 }
    );
  }

  if (password.length < 6) {
    return NextResponse.json(
      {
        success: false,
        message: "password length should be more than 6 characters",
      },
      { status: 400 }
    );
  }

  if (!validateEmail(email)) {
    return NextResponse.json(
      {
        success: false,
        message: "email is invalid",
      },
      { status: 400 }
    );
  }

  try {
    const user = await db.user.create({
      data: { email, password: hashPassword(password) },
    });

    return NextResponse.json({ success: true, message: user }, { status: 201 });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return NextResponse.json(
          { success: false, message: e.message },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { success: false, message: e.message },
        { status: 400 }
      );
    }
  }
}
