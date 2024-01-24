const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface(process.stdin);

const writeStream = fs.createWriteStream(path.join(__dirname, 'text.txt'));
console.log('Write text:');

rl.on('line', (input) => {
  if (input.toLowerCase() === 'exit') {
    console.log('Program finished');
    rl.close();
    writeStream.end();
    return;
  }

  writeStream.write(input + '\n');
});

process.on('SIGINT', () => {
  console.log('Program finished');
  rl.close();
  writeStream.end();
});
