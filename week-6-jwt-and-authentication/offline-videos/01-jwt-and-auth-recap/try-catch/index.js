function getLength(name) {
  return name.length;
}

const ans = getLength("shivam");
console.log(ans);

//try catch
function getLength(name) {
  return name.length;
}
try {
  const ans = getLength();
  console.log(ans);
} catch (e) {
  console.log("inside catch block means there is some error");
}

console.log("hi there");
