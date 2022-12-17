const inputText = "input.txt";

fetch(inputText)
  .then(res => res.text())
  .then(data => {
    const input = data.split("\r\n\r\n");

    let cratesInput = input[0].split("\r\n");
    const crateNumbersArray = cratesInput.pop();
    // add one because each crate takes up 4 spaces except the last one which takes up 3
    const totalCrates = (crateNumbersArray.length + 1) / 4;
    // cannot use .fill([]) as this fills with multiple copies of the same array
    const crates = Array.from(new Array(totalCrates), () => []);

    // each stack is an array, add crates in order so that the newest is at the end of the array
    cratesInput.forEach(crate => {
      for (let i = 1; i < crate.length; i += 4) {
        if (crate[i].trim()) {
          crates[crateNumbersArray[i] - 1].unshift(crate[i]);
        }
      }
    });
    const instructions = input[1].split("\r\n").map(instruction => {
      instruction = instruction.split(" ");
      return [Number(instruction[1]), Number(instruction[3]), Number(instruction[5])];
    });
    
    console.log(part1(crates, instructions));
    console.log(part2(crates, instructions));
  });

const part1 = (crates, instructions) => {
  const part1Crates = JSON.parse(JSON.stringify(crates)); 
  instructions.forEach(instruction => {
    for (let i = 1; i <= instruction[0]; i++) {
      // remove crate from the stack at instruction[1] (minus 1 as crates is 0 based)
      const crateToMove = part1Crates[instruction[1]-1].pop();
      // add crate to stack at instruction[2]
      part1Crates[instruction[2]-1].push(crateToMove);
    }
  });
  return part1Crates.map(crate => crate[crate.length - 1]).join("");
}

const part2 = (crates, instructions) => {
  const part2Crates = JSON.parse(JSON.stringify(crates)); 
  instructions.forEach(instruction => {
    // remove crates from the stack at instruction[1] (minus 1 as crates is 0 based)
    const stackToRemoveFrom = part2Crates[instruction[1]-1];
    const cratesToMove = stackToRemoveFrom.splice(stackToRemoveFrom.length - instruction[0]);
    
    // add crate to stack at instruction[2]
    part2Crates[instruction[2]-1].push(...cratesToMove);

  });
  return part2Crates.map(crate => crate[crate.length - 1]).join("");
}
