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

//? The above code will give compile time error, as typescript does not understand whether a and b are both strings or both numbers.

type SumInput = string | number;

function sum2(a: SumInput, b: SumInput) {
  if (typeof a === "number" && typeof b === "number") {
    return a + b;
  }
  return a.toString() + b.toString();
}
