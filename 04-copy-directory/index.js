const fs = require('fs');
const path = require('path');

const copyFilesFolder = 'files-copy';

fs.access(path.join(__dirname, copyFilesFolder), (err) => {
  if (!err) {
    fs.readdir(path.join(__dirname, copyFilesFolder), (err, files) => {
      files.forEach((file) => {
        fs.unlink(path.join(__dirname, copyFilesFolder, file), (err) => {
          if (err) {
            console.log(err);
            return;
          }
          copyFiles();
        });
      });
    });
    // console.log('Directory exists');
    // return;
  }

  if (err?.code === 'ENOENT') {
    fs.mkdir(path.join(__dirname, copyFilesFolder), (error) => {
      if (error) {
        console.log(error);
        return;
      }

      copyFiles();
    });
  }
});

function copyFiles() {
  fs.readdir(path.join(__dirname, 'files'), (err, files) => {
    if (err) {
      console.log(err);
      return;
    }

    files.forEach((file) => {
      const src = path.join(__dirname, 'files', file);
      const dest = path.join(__dirname, copyFilesFolder, file);

      fs.copyFile(src, dest, (err) => {
        if (err) {
          console.log(err);
          return;
        }
      });
    });
  });
}
