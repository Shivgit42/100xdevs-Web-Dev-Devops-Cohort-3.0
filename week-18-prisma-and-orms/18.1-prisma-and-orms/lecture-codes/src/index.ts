import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

async function getUser() {
  const user = await client.user.findFirst({
    where: {
      id: 1,
    },
    include: {
      todos: true,
    },
  });
  console.log(user);
}

getUser();

// async function createUser() {
//   const user = await client.user.create({
//     data: {
//       username: "username",
//       password: "pw",
//       age: 21,
//       city: "earth"
//     }
//   });
//   console.log(user);
// }

// createUser();

// async function updateUser() {
//   const user = await client.user.update({
//     where: {
//       id: 1,
//     },
//     data: {
//       username: "username2"
//     }
//   });
//   console.log(user);
// }

// updateUser();

// async function deleteUser() {
//   const user = await client.user.delete({
//     where: {
//       id: 1,
//     },
//   });
//   console.log(user);
// }

// deleteUser();

//function to create multiple users in the database

// async function createManyUsers() {
//   const user = await client.user.createMany({
//     data: [
//       {
//         username: "",
//         password: "",
//         age: 21,
//         city: "",
//       },
//       {
//         username: "",
//         password: "",
//         age: 21,
//         city: "",
//       },
//     ],
//   });
//   console.log(user);
// }

// createManyUsers();
