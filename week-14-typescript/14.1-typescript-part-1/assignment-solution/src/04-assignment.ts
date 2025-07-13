// Create a function isLegal that returns true or false if a user is above 18. It takes a user as an input.

interface User {
  name: string;
  age: number;
}

function isLegal(user: User): boolean {
  return user.age >= 18;
}

const user: User = {
  name: "shivam",
  age: 21,
};

const ans = isLegal(user);
console.log(ans);
