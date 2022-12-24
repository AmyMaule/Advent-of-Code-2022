const inputText = "input.txt";

fetch(inputText)
  .then(res => res.text())
  .then(data => {
    const input = data
      .split("\r\n")
      .map(instruction => instruction.startsWith("addx") ? instruction.split(" ") : instruction)
      .flat();
    
    part1(input);
    part2(input);
  });

const part1 = input => {
  const specialSignals = [20, 60, 100, 140, 180, 220];
  let total = 1;
  let totalSpecialSignals = 0;

  input.forEach((instruction, i) => {
    // check during each cycle - use i + 1 as array is zero based
    if (specialSignals.indexOf(i + 1) !== -1) {
      totalSpecialSignals += (i + 1) * total;
    };

    // if the instruction is not "noop" or "addx", add to total
    if (!isNaN(Number(instruction))) {
      total += Number(instruction);
    }
  });

  console.log(totalSpecialSignals);
  return totalSpecialSignals;
}

const part2 = input => {
  let total = 1;
  const pixels = new Array(240);

  input.forEach((instruction, i) => {
    // apply a multiplier to each line that goes up by the length of each line (0 for top line, then 40, 80, etc)
    let multiplier;
    for (let j = 0; j < input.length; j += 40) {
      if (i >= j) multiplier = j;
    }

    let currentSpritePosition = [total + multiplier - 1, total + multiplier, total + multiplier + 1];

    // if set has length 4 after sprite and current pixel are added, the sprite does not overlap the current pixel
    const currentSpriteOverlap = new Set(currentSpritePosition);
    currentSpriteOverlap.add(i);

    // if current pixel is not occupied by sprite, fill with space, otherwise fill with #
    pixels[i] = currentSpriteOverlap.size === 4 ? " " : "#";

    // like in part1, if the instruction is not "noop" or "addx", add to total
    if (!isNaN(Number(instruction))) {
      total += Number(instruction);
    }
  });

  const output = [];
  for (let j = 0; j < input.length; j += 40) {
    output.push(pixels.slice(j, j + 40))
  }
  output.forEach(arr => console.log(...arr));
}
