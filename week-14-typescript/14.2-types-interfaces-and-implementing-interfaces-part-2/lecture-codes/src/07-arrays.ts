interface Address1 {
  city: string;
  pincode: string;
}

interface User5 {
  name: string;
  age: number;
  address: Address1[];
}

let user5: User5 = {
  name: "shivam",
  age: 21,
  address: [],
};

interface User6 {
  firstName: string;
  lastName: string;
  age: number;
}

function filteredUsers(users: User6[]) {
  return users.filter((x) => x.age >= 18);
}

console.log(
  filteredUsers([
    {
      firstName: "shivam",
      lastName: "rana",
      age: 21,
    },
    {
      firstName: "sonal",
      lastName: "rana",
      age: 21,
    },
  ])
);
