const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'project-dist'), (err) => {
  if (err) {
    console.log(err);
    return;
  }

  fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), (err) => {
    if (err) {
      console.log(err);
      return;
    }

    fs.readdir(
      path.join(__dirname, 'assets'),
      { withFileTypes: true },
      (err, files) => {
        if (err) {
          console.log(err);
          return;
        }

        for (let file of files) {
          const src = path.join(file.path, file.name);
          const dist = path.join(__dirname, 'project-dist', 'assets');

          fs.copyFile(src, dist, () => {});
        }
      },
    );
  });
});
