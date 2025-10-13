const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let maxLen;
const minVal = 1;
const maxVal = 100;
let arr = [];
let count = 0;

// Helper to read input as a promise
function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => resolve(answer));
  });
}

async function main() {
  // Get valid array size
  while (true) {
    const input = await ask("Enter maximum array size: ");
    maxLen = Number(input);
    if (!Number.isNaN(maxLen) && maxLen > 0) break;
    console.log("Invalid input! Enter a positive number.");
  }

  console.log(`Enter up to ${maxLen} unique numbers between ${minVal} and ${maxVal}:`);

  while (count < maxLen) {
    const input = await ask(`Number ${count + 1}: `);
    const temp = Number(input);

    if (Number.isNaN(temp)) {
      console.log("Invalid input! Enter a numeric value.");
      continue;
    }

    if (temp < minVal || temp > maxVal) {
      console.log(`Out of range! Must be between ${minVal} and ${maxVal}.`);
      continue;
    }

    if (arr.includes(temp)) {
      console.log("Duplicate detected! Try again.");
      continue;
    }

    arr.push(temp);
    count++;
  }

  console.log("\nFinal array:", arr.join(" "));
  rl.close();
}

main();
