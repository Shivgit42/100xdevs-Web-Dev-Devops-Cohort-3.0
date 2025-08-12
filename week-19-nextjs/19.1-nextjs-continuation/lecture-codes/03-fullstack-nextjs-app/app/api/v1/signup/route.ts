import { NextRequest, NextResponse } from "next/server";
import client from "../../../db/index";

export async function POST(req: NextRequest) {
  const data = await req.json();

  if (!data.username || !data.password) {
    return NextResponse.json(
      {
        message: "Username and password are required",
      },
      {
        status: 400,
      }
    );
  }

  try {
    await client.user.create({
      data: {
        username: data.username,
        password: data.password,
      },
    });

    return NextResponse.json({
      message: "You have successfully signed up",
    });
  } catch (err) {
    console.error("Error creating user", err);
    return NextResponse.json(
      {
        message: "Failed to sign up",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET() {
  const user = await client.user.findFirst();

  if (!user) {
    return NextResponse.json(
      {
        message: "No user found",
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json({
    username: user?.username,
    password: user?.password,
  });
}
