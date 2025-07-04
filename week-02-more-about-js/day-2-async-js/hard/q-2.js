/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 * the function should return a promise just like before
 */

function sleep(milliseconds) {
  return new Promise((resolve) => {
    const start = Date.now();
    while (Date.now() - start < milliseconds) {}
    console.log(`${milliseconds / 1000} seconds JS thread was halted`);
    resolve();
  });
}

sleep(3000).then(() => {
  console.log("Heavy operation done");
});
