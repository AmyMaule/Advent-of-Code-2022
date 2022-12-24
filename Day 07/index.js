const inputText = "input.txt";

fetch(inputText)
  .then(res => res.text())
  .then(data => {
    const input = data.split("\r\n");
    const inputLines = [];
    // stack contains ints that represent the directory history
    const stack = [];
    const directories = {};

    // add all inputLines containing files or that change directory to the inputLines array
    for (let line of input) {
      if (!line.startsWith("$ ls") && !line.startsWith("dir")) {
        inputLines.push(line);
      }
    }
    
    inputLines.forEach((line, i) => {
      if (line.startsWith("$ cd")) {
        if (line === "$ cd ..") {
          stack.pop();
        } else {
          // add the int representing the directory to the stack
          stack.push(i);
          // with each directory change, add a directory with size 0 to the directories object
          directories[i] = 0;
        }
      } else {
        // for files only
        let fileSize = Number(line.split(" ")[0]);
        for (let directory of stack) {
          directories[directory] += fileSize;
        }
      }
    });
    
    console.log(part1(directories));
    console.log(part2(directories));
  });

  const part1 = directories => {
    let totalSize = 0;
    for (let size in directories) {
      if (directories[size] <= 100000) totalSize += directories[size];
    }
    return totalSize;
  }

  const part2 = directories => {
    // sort directory sizes in ascending order, then select the smallest needed to free up the neededSpace
    const directorySizes = Object.values(directories).sort((a, b) => a - b);
    const homeDirectory = directorySizes[directorySizes.length - 1];
    const remainingSpace = 70000000 - homeDirectory;
    const neededSpace = 30000000 - remainingSpace;
    
    for (let i = 0; i < directorySizes.length; i++) {
      if (directorySizes[i] >= neededSpace && directorySizes[i - 1] < neededSpace) {
        return directorySizes[i];
      }
    }
  }
  