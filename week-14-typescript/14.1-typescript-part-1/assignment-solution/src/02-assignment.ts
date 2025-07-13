// Write a function that return true or false based on if a user is 18+

function isUser(age: number): boolean {
  // if (age >= 18) {
  //   return true;
  // } else {
  //   return false;
  // }

  return age >= 18;
}

const isAdult = isUser(19);
console.log(isAdult);
