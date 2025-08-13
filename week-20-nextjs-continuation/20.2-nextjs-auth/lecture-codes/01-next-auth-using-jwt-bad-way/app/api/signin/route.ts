import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { username, password } = body;

  const token = await jwt.sign(
    {
      username,
      password,
    },
    "SECRET"
  );

  return NextResponse.json({
    token,
  });
}
