interface User {
  name: string;
  age: number;
  address: {
    city: string;
    country: string;
    pincode: number;
  };
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

function isLegal(user: User): boolean {
  return user.age >= 18;
}

const ans = isLegal(user);
console.log(ans);
