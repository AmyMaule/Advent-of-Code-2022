const inputText = "input.txt";

fetch(inputText)
  .then(res => res.text())
  .then(data => {
    // split data by line break, then remove , and - so 2-4,6-8 becomes [2, 4, 6, 8]
    let input  = data.split("\r\n").map(row => row.split(/[,-]/).map(num => Number(num)));
    
    console.log(part1(input));
    console.log(part2(input));
  });

const part1 = input => {
  let duplicatePairs = 0;
  input.forEach(pair => {
    // check if 2nd pair contains 1st pair or vice versa
    if ((pair[0] <= pair[2] && pair[1] >= pair[3]) || (pair[2] <= pair[0] && pair[3] >= pair[1])) {
      duplicatePairs++;
    }
  });
  return duplicatePairs;
}

const part2 = input => {
  let overlappingPairs = 0;
  input.forEach(pair => {
    // if the minimum number in pair 2 is less than the min in pair 1, swap them
    if (pair[2] < pair[0]) pair = [pair[2], pair[3], pair[0], pair[1]];
    
    // pairs overlap if either of pair 1 is equal to either of pair 2, or if the min in pair 2 is less than the max of pair 1
    if (pair[0] === pair[2] || pair[0] === pair[3] || pair[1] === pair[2] || pair[1] === pair[3] || pair[2] < pair[1]) {
      overlappingPairs++;
    }
  });
  return overlappingPairs;
}
