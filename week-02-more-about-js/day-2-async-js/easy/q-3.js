// Reading the contents of a file
// Write code to read contents of a file and print it to the console. You can use the fs library to as a black box, the goal is to understand async tasks. Try to do an expensive operation below the file read and see how it affects the output. Make the expensive operation more and more expensive and see how it affects the output.

const fs = require("fs");
const path = require("path");
// 1st way
const filePath = "week-2-more-about-js/day-2-async-js/easy/a.txt";

/* 2nd way
const fileName = "a.txt";

----- path of file to read the file ------
const filepath = path.join(__dirname, fileName); 
*/

fs.readFile(filePath, "utf-8", (err, data) => {
  if (err) {
    console.log("Error in file :", err);
    return;
  }
  console.log("File content:", data);
});

function expensiveOperation() {
  let sum = 0;
  for (let index = 0; index < 1e8; index++) {
    //1e8 is scientific notation for 100,000,000
    sum = sum + index;
  }
  console.log("Expensive operation completed and its result : ", sum);
}
expensiveOperation();

// Note :
// This question is for understanding the concept of Async js
// where we are reading data from external file and we are performing expensive operation jisse ki like file read hote-hote bhi loop ka task hota rhega and after completing the fs reading task will be done
