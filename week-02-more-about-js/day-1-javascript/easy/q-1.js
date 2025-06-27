/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  const sortedstr1 = str1.toLowerCase().split("").sort().join("");
  const sortedstr2 = str2.toLowerCase().split("").sort().join("");

  if (sortedstr1 == sortedstr2) {
    return true;
  } else {
    return false;
  }
}
const a = isAnagram("shivam", "ivsham");
console.log(a);

//! Note

//* We can’t directly sort a string in JavaScript — strings don’t have a built-in sort method.

//? So, here’s how we do it step-by-step:
/*
First, convert the string to lowercase to ensure case doesn't affect sorting.

Then, use the .split('') method to turn the string into an array of characters.

Arrays have a .sort() method — use it to sort the characters alphabetically.

Once sorted, use .join('') to convert the array back into a string.

Now, you can easily compare the two sorted strings to check if they are equal.

*/
