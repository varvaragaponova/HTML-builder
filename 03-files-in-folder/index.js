const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'secret-folder'), (error, files) => {
  if (error) {
    console.log(error);
    return;
  }

  files.forEach((file) => {
    fs.stat(path.join(__dirname, 'secret-folder', file), (err, stats) => {
      if (err) {
        console.log(err);
        return;
      }

      if (stats.isDirectory()) {
        return;
      }

      const name = file.split('.')[0];
      const extention = file.split('.')[1];
      console.log(`${name}-${extention}-${Math.ceil(stats.size / 1024)}`);
    });
  });
});
