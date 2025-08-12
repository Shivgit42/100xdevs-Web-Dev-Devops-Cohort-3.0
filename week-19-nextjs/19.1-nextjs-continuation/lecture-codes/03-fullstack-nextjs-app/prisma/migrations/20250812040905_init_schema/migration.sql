-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "Username" TEXT NOT NULL,
    "Password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
