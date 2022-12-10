const inputText = "input.txt";

fetch(inputText)
  .then(res => res.text())
  .then(data => {
    // split data into 'elves' by double new line
    input  = data.split("\r\n\r\n");
    input = input.map(input => {
      // split each elf's input by new line
      if (input.indexOf("\r\n") !== -1) return input.split("\r\n");
      return [input];
    });
    // convert calorie strings to numbers
    input = input.map(elf => elf.map(package => Number(package)))
    
    console.log(part1(input));
    console.log(part2(input));
  })

const part1 = input => {
  input = input
    .map(elf => elf.reduce((acc, currentValue) => acc + currentValue))
    .sort((a, b) => b - a);
  return input[0];
}

const part2 = input => {
  input = input
    .map(elf => elf.reduce((acc, currentValue) => acc + currentValue))
    .sort((a, b) => b - a);
  return input[0] + input[1] + input[2];
}
