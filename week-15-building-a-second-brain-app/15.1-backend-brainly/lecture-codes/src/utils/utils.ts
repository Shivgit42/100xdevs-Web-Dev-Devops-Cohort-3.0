export function random(len: number) {
  let options = "abcdefghijklmnopqrstuvwxyz";

  let ans = "";

  for (let i = 0; i < len; i++) {
    ans += options[Math.floor(Math.random() * options.length)];
  }
  return ans;
}
