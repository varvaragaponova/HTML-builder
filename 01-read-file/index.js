const fs = require('fs');
const path = require('path');

fs.readFile(path.resolve(__dirname, 'text.txt'), (error, data) => {
  if (error) console.error(error);
  else console.log(data.toString());
});
