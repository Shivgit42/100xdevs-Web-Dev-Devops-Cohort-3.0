// even function
function isEven(num: number): boolean {
  return num % 2 == 0;
}

let checkisEven = isEven(6);
console.log(checkisEven);

// greet function
function greet(name: string): string {
  return "Hlelooo" + name;
}

let greeting = greet("Shivam");
console.log(greeting);

// sum function
function sum(a: number, b: number): number {
  return a + b;
}

let result = sum(1, 2);
console.log(result);
