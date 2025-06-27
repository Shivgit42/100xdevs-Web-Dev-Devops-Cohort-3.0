// File cleaner
// Read a file, remove all the extra spaces and write it back to the same file.

// For example, if the file input was-
// hello     world    my    name   is       raman

// After the program runs, the output should be-
// hello world my name is raman

const fs = require("fs");
const path = require("path");

const data = "hello     world    my    name   is       raman";
const removedSpacesData = data.replace(/\s+/g, " ");

const filePath = path.join(__dirname, "a.txt");

fs.writeFile(filePath, removedSpacesData, (err) => {
  if (err) {
    console.error("error in writing the file");
    return;
  }

  console.log("Removed all the extra spaces");
});
