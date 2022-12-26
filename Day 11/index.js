const inputText = "input.txt";

fetch(inputText)
  .then((res) => res.text())
  .then((data) => {
    const input = data.split("\r\n\r\n").map((row) => row.split("\r\n"));
    // rearrange each monkey's data into more accessible format
    const monkeys = input.map(monkey => {
      return {
        starting: monkey[1].split(/: |, /).slice(1).map((num) => Number(num)),
        operation: monkey[2].slice(19).split(" "),
        divisibleBy: Number(monkey[3].split(" ")[5]),
        correct: Number(monkey[4].slice(-1)),
        wrong: Number(monkey[5].slice(-1)),
      };
    });

    console.log(part1(monkeys));
  });

const part1 = (monkeys) => {
  const items = new Array(monkeys.length);
  monkeys.forEach((monkey, i) => (items[i] = monkey.starting));
  const numberOfInspections = new Array(monkeys.length).fill(0);

  for (let k = 0; k < 20; k++) {
    items.forEach((monkeyItems, i) => {
      // copy monkeyItems array as length will change as items are passed between monkeys
      [...monkeyItems].forEach(item => {
        // increase inspection count for inspecting monkey for each item
        numberOfInspections[i]++;
        const operator = monkeys[i].operation[1];
        // if num === "old", set it to the current item
        const num = Number(monkeys[i].operation[2]) || item;
        let worryLevel = operator === "+" ? item + num : item * num;
        worryLevel = Math.floor(worryLevel / 3);
        const nextMonkey = worryLevel % monkeys[i].divisibleBy === 0
          ? monkeys[i].correct
          : monkeys[i].wrong;
        
        // throw item to next monkey, remove item from current array
        items[nextMonkey].push(worryLevel);
        items[i].shift();
      });
    });
  }
  return numberOfInspections
    .sort((a, b) => a - b)
    .slice(-2)
    .reduce((a, b) => a * b);
};
