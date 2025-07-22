// type Employee1 = {
//   name: string;
//   startDate: string;
// };

// type Manager1 = {
//   name: string;
//   department: string;
// };

// type TeamLead = Employee1 & Manager1;

// let e: Employee1 = {
//   name: "shivam",
//   startDate: "15-07-2001",
// };

// let m: Manager1 = {
//   name: "shivam",
//   department: "computer science",
// };

// let t: TeamLead = {
//   name: "shivam",
//   startDate: "15-07-2001",
//   department: "computer science",
// };

type GoodUser = {
  name: string;
  gift: string;
};

type BadUser = {
  name: string;
  ip: string;
};

type User2 = GoodUser | BadUser;

function greet2(user4: User2) {
  console.log(user4.name);
}

let user4: User2 = {
  name: "shivam",
  gift: "watch",
  ip: "jsis",
};
