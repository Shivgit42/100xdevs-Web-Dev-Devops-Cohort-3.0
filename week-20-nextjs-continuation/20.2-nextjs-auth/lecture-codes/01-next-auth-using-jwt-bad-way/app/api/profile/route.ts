import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function GET(req: NextRequest) {
  const token = req.headers.get("authorization");

  const user = jwt.verify(token as unknown as string, "SECRET");

  if (user) {
    return NextResponse.json({
      avatarUrl: "http://images.google.com/cat.png",
    });
  }
}
