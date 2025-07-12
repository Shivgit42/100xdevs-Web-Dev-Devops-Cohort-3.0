function delayedFunction(fn: () => void) {
  // const name = "shivam";
  setTimeout(fn, 1000);
}

delayedFunction(function () {
  console.log("hi there");
});

// function greet(name: string) {
//   console.log("hello " + name);
// }

// delayedFunction(greet);
