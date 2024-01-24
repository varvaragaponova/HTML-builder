const fs = require('fs');
const path = require('path');

const writeStream = fs.createWriteStream(
  path.join(__dirname, 'project-dist', 'bundle.css'),
);

fs.readdir(
  path.join(__dirname, 'styles'),
  { withFileTypes: true },
  (err, files) => {
    if (err) {
      console.log(err);
      return;
    }

    for (let file of files) {
      if (!file.isFile() || file.name.split('.')[1].toLowerCase() !== 'css') {
        continue;
      }

      const readStream = fs.createReadStream(
        path.join(__dirname, 'styles', file.name),
      );

      readStream.on('data', (chunk) => {
        writeStream.write(chunk.toString() + '\n');
      });
    }
  },
);
