// Let’s say you have a function that needs to return the first element of an array. Array can be of type either string or integer.

// function getFirstElement(arr: (string | number)[]) {
//   return arr[0];
// }

//* User can send different types of values in inputs, without any type errors
//* Typescript isn’t able to infer the right type of the return type

function getFirstElement<T>(arr: T[]) {
  return arr[0];
}

const el = getFirstElement<number>([1, 2, 3]);
console.log(el);

const el1 = getFirstElement<string>(["1", "2", "3"]);
console.log(el1);
