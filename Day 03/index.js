const inputText = "input.txt";

fetch(inputText)
  .then(res => res.text())
  .then(data => {
    input  = data.split("\r\n");

    console.log(part1(input));
    console.log(part2(input));
  });

const part1 = input => {
  // each array in splitInput contains the contents of 1 rucksack split into compartments
  const rucksacks = new Array(input.length).fill([]);
  input.forEach((item, i) => {
    rucksacks[i] = [item.slice(0, item.length/2).split(""), item.slice(item.length/2).split("")];
  })

  // find item common to both compartments
  const commonItems = [];
  rucksacks.forEach(rucksack => {
    let commonItem;
    rucksack[0].some(item => {
      if (rucksack[1].includes(item)) {
        commonItem = item;
      }
    });
    // only push commonItem so no duplicates are added where one item appears multiple times in the first group
    commonItems.push(commonItem);
  })

  // assign priority value: lowercase a-z have priorities 1 - 26, uppercase A-Z have priorities 27 - 52.
  // ascii codes for a-z are 97 - 122, for A-Z are 65 - 90
  return commonItems
    .map(item => {
      // if lowercase, return the charCode minus 96 (a = 97, priority value is 1), for uppercase, A = 65, priority value is 27
      if (item > item.toUpperCase()) {
        return item.charCodeAt(0) - 96;
      } else return item.charCodeAt(0) - 38;
    })
    .reduce((acc, currentValue) => acc + currentValue, 0);
}

const part2 = input => {
  // groups holds arrays of 3 backpacks
  const groups = [];
  for (let i = 0; i < input.length; i += 3) {
    groups.push([input[i].split(""), input[i+1].split(""), input[i+2].split("")]);
  }

  const commonItems = [];
  groups.forEach(group => {
    let commonItem;
    group[0].some(item => {
      if (group[1].includes(item) && group[2].includes(item)) {
        commonItem = item;
      }
    })
    commonItems.push(commonItem);
  })

  return commonItems
    .map(item => {
      if (item > item.toUpperCase()) {
        return item.charCodeAt(0) - 96;
      } else return item.charCodeAt(0) - 38;
    })
    .reduce((acc, currentValue) => acc + currentValue, 0);
}
