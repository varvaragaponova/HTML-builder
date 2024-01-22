const fs = require('fs');
const path = require('path');

// fs.readFile(path.resolve(__dirname, 'text.txt'), (error, data) => {
//   if (error) console.error(error);
//   else console.log(data.toString());
// });

const readStream = fs.createReadStream(path.join(__dirname, 'text.txt'));

readStream.on('data', (text) => {
  console.log(text.toString());
});

readStream.on('error', (error) => {
  console.log('error:', error);
});

readStream.on('end', () => {
  readStream.close();
});
