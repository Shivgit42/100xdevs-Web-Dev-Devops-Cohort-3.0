import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

async function seedDummyUsers() {
  await client.user.create({
    data: {
      username: "john",
      password: "johndoe",
      age: 21,
      city: "USA",
      todos: {
        create: {
          title: "study hard",
          description: "do study regularly",
          done: false,
        },
      },
    },
  });
}

seedDummyUsers();
