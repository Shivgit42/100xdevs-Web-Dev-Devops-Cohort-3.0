// Create a function that takes another function as input, and runs it after 1 second.

function delayedFn(anotherFn: () => void) {
  setTimeout(anotherFn, 1000);
}

function anotherFn() {
  console.log("hi there");
}

delayedFn(anotherFn);
