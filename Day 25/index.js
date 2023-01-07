const inputText = "input.txt";

fetch(inputText)
  .then((res) => res.text())
  .then((data) => {
    const snafuToDecimal = {
      "=": -2,
      "-": -1,
      "0": 0,
      "1": 1,
      "2": 2
    };

    // replace - with -1, = with -2 and reverse resulting array
    const input = data.split("\r\n").map((nums) => nums.split("").map((num => snafuToDecimal[num])).reverse());

    console.log(part1(input));
  });

const part1 = (input) => {
  const decimalToSnafu = {
    "-2": "=",
    "-1": "-",
    "0": "0",
    "1": "1",
    "2": "2",
  };

  let total = 0;
  input.forEach(arr => total += arr.map((num, i) => num *(5**i)).reduce((a, b) => a + b));

  let finalSnafu = "";

  const getFinalSnafu = total => {
    // divide by 5 to give remainder from 0 to 4; add 2 before using modulo, then minus 2 after calculating to give remainder from -2 to 2
    const remainder = (total + 2) % 5 - 2;
    if (total > 0) {
      // total becomes the previous total divided by 5, minus the remainder using Math.floor
      total = Math.floor((total + 2) / 5);
      // add the remainder to finalSnafu
      finalSnafu = decimalToSnafu[remainder] + finalSnafu;
      // recursively call getFinalSnafu until total is 0
      getFinalSnafu(total);
    }
  }
  getFinalSnafu(total);

  return finalSnafu;
};
