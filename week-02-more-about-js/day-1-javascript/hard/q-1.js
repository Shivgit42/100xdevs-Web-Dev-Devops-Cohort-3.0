/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
*/

class Calculator {
  constructor() {
    this.result = 0;
  }
  add(num) {
    this.result += num;
  }
  subtract(num) {
    this.result -= num;
  }
  multiply(num) {
    this.result *= num;
  }
  divide(num) {
    if (num === 0) {
      throw new Error("cannot divide by zero");
    }
    this.result /= num;
  }
  clear() {
    this.result = 0;
  }
  getResult() {
    return this.result;
  }
  calculate(exp) {
    try {
      //remove extra space
      const cleanedExp = exp.replace(/\s+/g, "");

      //validate the exp to allow only numbers, operators, and parentheses
      if (!/^[0-9+\-*/().]+$/.test(cleanedExp)) {
        throw new Error("Invalid characters in expression");
      }

      const evaluatedResult = new Function(`return ${cleanedExp}`)();

      if (typeof evaluatedResult !== "number" || isNaN(evaluatedResult)) {
        throw new Error("Invalid result");
      }
      this.result = evaluatedResult;
    } catch (err) {
      throw new Error("Invalid expression");
    }
  }
}

const calc = new Calculator();
calc.add(10);
calc.multiply(2);
console.log(calc.getResult());

calc.clear();
calc.calculate("10 +   2 *    (   6 - (4 + 1) / 2) + 7");
console.log(calc.getResult());

//! note
//* Maybe you wouldn't have understand below line,
//? const evaluatedResult = new Function(`return ${cleanedExp}`)();

/*
let's understand by taking example which is exactly same as doing above thing,
function temp(){
return 10 + 2 * (6 - (4 + 1) / 2) + 7;
}
const evaluatedExp = temp()
*/

//? const evaluatedResult = new Function(`return ${cleanedExp}`)();  - what this line do?
// We are creating a new function with the body(return 10+2*(6-(4+1)/2)+7)
// Immediately calling that function using () to get the result

//! Why use new Function()?
/*
Because:

You can't directly evaluate a string as an expression using return

You need to evaluate a dynamic mathematical expression passed as a string

It's similar to using eval(), but slightly safer and more restricted in scope.
*/

//? You can also do with eval, it's more simpler but less safe
// const evaluatedResult = eval(cleanedExp); // 👈 using eval here
