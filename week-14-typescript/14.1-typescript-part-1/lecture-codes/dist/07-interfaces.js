"use strict";
function greet2(user2) {
    console.log(`Hello ${user2.firstname} ${user2.lastName}, you are ${user2.age} year old `);
}
let user2 = {
    firstname: "shivam",
    lastName: "rana",
    age: 21,
};
greet2(user2);
