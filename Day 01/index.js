const inputText = "input.txt";

fetch(inputText)
  .then(res => res.text())
  .then(data => {
    // split data into 'elves' by double new line
    elfInput  = data.split("\r\n\r\n");
    elfInput = elfInput.map(input => {
      // split each elf's input by new line
      if (input.indexOf("\r\n") !== -1) return input.split("\r\n");
      return [input];
    });
    // convert calorie strings to numbers
    input = elfInput.map(elf => elf.map(package => Number(package)))
    
    console.log(part1(input));
    console.log(part2(input));
  })

const sortInput = input => {
  return input
    .map(elf => elf.reduce((acc, current) => acc + current))
    .sort((a, b) => b - a);
}

const part1 = input => {
  return sortInput(input)[0];
}

const part2 = input => {
  const sortedInput = sortInput(input);
  return sortedInput[0] + sortedInput[1] + sortedInput[2];
}
