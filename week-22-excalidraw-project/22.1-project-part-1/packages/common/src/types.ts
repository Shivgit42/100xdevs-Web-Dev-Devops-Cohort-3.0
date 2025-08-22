import { string, z } from "zod";

export const SignUpSchema = z.object({
  username: z.string(),
  password: z.string(),
  name: string(),
});

export const SignInSchema = z.object({
  username: z.string(),
  pasword: z.string(),
});

export const CreateRoomSchema = z.object({
  name: z.string(),
});
