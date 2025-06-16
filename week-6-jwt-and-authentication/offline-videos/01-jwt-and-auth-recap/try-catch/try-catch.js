/*undefined 
let a;
console.log(a.length);

console.log("hi there"); // this never get printed because the compiler get panicked here what to do after a.length in which a is undefined
*/

//using try catch
try {
  let a;
  console.log(a.length);
  console.log("inside try block");
} catch (e) {
  console.log("inside catch block");
}

console.log("hi there");

//* Note
// When an exception is raised in javascript, the process exits since the js program doesn't want to proceed anymore
