// Question :
// create a map function that takes 2 inputs
// an array and a tranformation function callback function
// and transforms the array into a new one using transformation function

function transform(n) {
  return n * 2;
}

function map(arr, transform) {
  let transformedArr = [];
  for (let i = 0; i < arr.length; i++) {
    transformedArr.push(transform(arr[i]));
  }
  return transformedArr;
}

const num = [1, 2, 3, 4, 5];
const ans = map(num, transform);
console.log(ans);

//* we can also pass like this
// const transformed = map([1, 2, 3], function (n) {
//   return n * 2;
// });
// console.log(transformed);

//? In a arrow function fashion
/*
const map = (arr, fn) => {
  const transformedArr = []
  for(let i=0;i<arr.length;i++){
    transformedArr.push(fn(arr[i]))
  }
  return transformedArr
}

const ans = map([1,2,3], function (n){
  return n * 2
})
console.log(ans);
*/

//! extra this in arrow vs traditional function

//? Traditonal function - they have their ownt this which is set at the time the function is called.

//? Arrow function - they do not have their own this. Instead, they lexically bind this. They capture the this value from the surrounding scope at the time the function is defined. Too many jargons right, let's understand lexically bind with the help of ex,

//* Comparing regular vs arrow function inside an object
/*
  const person = {
    name: "Shivam",
    greetRegular: function () {
      console.log("Hello from", this.name);
    },
    greetArrow: () => {
      console.log("Hello from", this.name);
    },
  };

  person.greetRegular();
  person.greetArrow();
*/

//! Why?
//* greetRegular is a regular function: this refers to person. greetArrow is an arrow function: this comes from the outer scope (likely window or undefined), so this.name is undefined.

//* Deeper Lexical binding

// function outer() {
//   this.name = "outer";

//   const regular = function () {
//     console.log("regular this.name:", this.name);
//   };

//   const arrow = () => {
//     console.log("arrow this.name:", this.name);
//   };

//   return { regular, arrow };
// }

// const obj = new outer();
// obj.regular();
// obj.arrow();

const person = {
  name: "Shivam",
  greetArrow: () => {
    console.log(this);
  },
};

person.greetArrow();
