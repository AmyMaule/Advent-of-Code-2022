const inputText = "input.txt";

fetch(inputText)
  .then(res => res.text())
  .then(data => {
    input  = data.split("\r\n");

    console.log(part1(input));
    console.log(part2(input));
  })

  const part1 = (input) => {
    const scores = new Array(input.length).fill(0);

    // X beats C, Y beats A, Z beats B
    const wins = { X: "C", Y: "A", Z: "B"}
    const draws = { X: "A", Y: "B", Z: "C" }

    input.forEach((round, i) => {
      // 1 point for playing Rock, 2 for paper, 3 for scissors
      if (round[2] === "X") scores[i] += 1;
      if (round[2] === "Y") scores[i] += 2;
      if (round[2] === "Z") scores[i] += 3;

      // 6 points if you win, 3 points if you draw
      if (wins[round[2]] === round[0]) scores[i] += 6;
      if (draws[round[2]] === round[0]) scores[i] += 3;
    });

    return scores.reduce((acc, curr) => acc + curr, 0);
  }

  const part2 = (input) => {
    const scoring = {
      "X": { A: "Z", B: "X", C: "Y"}, // win
      "Y": { A: "X", B: "Y", C: "Z"}, // draw
      "Z": { A: "Y", B: "Z", C: "X"}, // lose
    }

    input = input.map(round => {
      // update round[2] with the shape you are playing instead of the instruction to win/lose/draw
      round = round.split("");
      round[2] = scoring[round[2]][round[0]];
      return round.join("");
    })
    return part1(input);
  }
