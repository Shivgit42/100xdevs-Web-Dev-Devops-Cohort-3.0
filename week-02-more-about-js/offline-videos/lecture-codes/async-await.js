// Async - await -The syntax in JavaScript provides a way to write asynchronous code that looks and behaves like synchronous code, making it easier to read and maintain.

// Q: Write code using async-await
// 1.logs hi after 1 second
// 2.logs hello 3 seconds after step 1
// 3.logs heyy there 5 seconds after step 2

function setTimeoutPromisified(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

async function solve() {
  await setTimeoutPromisified(1000);
  console.log("Hi");

  await setTimeoutPromisified(3000);
  console.log("Hello");

  await setTimeoutPromisified(5000);
  console.log("Heyy");
}

solve();

console.log("Outside the Solve block");

// Note:
// If we now execute the file then "Outside the Solve block" will get print fisrt becuase it appears like a synchronous code but actually async-await promise used to write a cleaner code which is way of handling asynchronous code

//? Under the hood, async-await is using promise only, the aysnc await gets converted to promise, that's why async await is just a syntatic sugar on top of the promises

//* Here is how under the hood the solve function gets executed
/*
function solve() {
  setTimeoutPromisified(1000)
    .then(() => {
      console.log("hi");
      return setTimeoutPromisified(3000);
    })
    .then(() => {
      console.log("hello");
      return setTimeoutPromisified(5000);
    })
    .then(() => {
      console.log("heyy");
    });
}

solve();

console.log("Outside the Solve block");
*/
