/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  //1
  let convertedstr = str.toLowerCase();
  let left = 0,
    right = str.length - 1;
  while (left < right) {
    if (convertedstr[left] !== convertedstr[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;

  /* 2
  const lowerStr = str.toLowerCase();
  const reversedStr = lowerStr.split("").reverse().join("");
  return lowerStr === reversedStr;
  */
}

console.log(isPalindrome("madam"));
