interface Address {
  city: string;
  country: string;
  pincode: number;
}

interface User {
  name: string;
  age: number;
  address?: Address;
}

interface Office {
  address: Address;
}

let user: User = {
  name: "shivam",
  age: 21,
  address: {
    city: "surat",
    country: "Delhi",
    pincode: 192933,
  },
};

let user2: User = {
  name: "mayank",
  age: 21,
};

function isLegal(user: User): boolean {
  return user.age >= 18;
}

const ans = isLegal(user);
console.log(ans);

interface People {
  name: string;
  age: number;
  greet: () => string;
}

let person: People = {
  name: "shivam",
  age: 21,
  greet: () => {
    return "hi";
  },
};

let greeting1 = person.greet();
console.log(greeting1);
