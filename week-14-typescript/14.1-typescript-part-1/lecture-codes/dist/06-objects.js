"use strict";
function greet(user) {
    console.log("learning typescript " + user.name, user.age);
}
// greet({
//   name: "shivam",
//   age: 21,
// });
let user = {
    name: "shivam",
    age: 19,
};
greet(user);
