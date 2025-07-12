interface Manager {
  name: string;
  age: number;
}

interface Employee {
  name: string;
  department: string;
}

type TeamLead = Manager & Employee;

let t: TeamLead = {
  name: "shivam",
  age: 21,
  department: "cse",
};

console.log(t);

// type SumInput = string | number

// function sum(a: SumInput, b: SumInput){
//   return a + b
// }
