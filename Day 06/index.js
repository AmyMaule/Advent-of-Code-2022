const inputText = "input.txt";

fetch(inputText)
  .then(res => res.text())
  .then(data => {
    const input = data.split("");
    
    console.log("Part 1:", solution(input, 4));
    console.log("Part 2:", solution(input, 14));
  });

const solution = (input, numChars) => {
  for (let i = 3; i < input.length; i++) {
    const charSet = new Set();
    for (let j = 0; j < numChars; j++) {
      charSet.add(input[i-j]);
    }
    if (charSet.size === numChars) return i + 1;
  }
}
