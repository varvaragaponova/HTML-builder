const fs = require('fs');
const path = require('path');

const projectDistFolder = 'project-dist';

fs.mkdir(path.join(__dirname, projectDistFolder), (err) => {
  if (err) {
    fs.rm(
      path.join(__dirname, projectDistFolder, 'assets'),
      { recursive: true },
      copyAssetsFolder,
    );
  } else {
    copyAssetsFolder();
  }

  const writeStream = fs.createWriteStream(
    path.join(__dirname, projectDistFolder, 'style.css'),
  );

  fs.readdir(
    path.join(__dirname, 'styles'),
    { withFileTypes: true },
    (err, cssFiles) => {
      for (let cssFile of cssFiles) {
        const readStream = fs.createReadStream(
          path.join(__dirname, 'styles', cssFile.name),
        );

        readStream.on('data', (chunk) => {
          writeStream.write(chunk + '\n');
        });
      }
    },
  );

  fs.readdir(
    path.join(__dirname, 'components'),
    { withFileTypes: true },
    (err, components) => {
      const readTemplateStream = fs.createReadStream(
        path.join(__dirname, 'template.html'),
      );
      const writeIndexHtmlStream = fs.createWriteStream(
        path.join(__dirname, projectDistFolder, 'index.html'),
      );
      let htmlContent = '';
      readTemplateStream.on('data', (chunk) => {
        htmlContent = chunk.toString();
        let readComponentStream;
        for (let component of components) {
          readComponentStream = fs.createReadStream(
            path.join(__dirname, 'components', component.name),
          );
          readComponentStream.on('data', (componentContent) => {
            htmlContent = htmlContent.replace(
              `{{${component.name.split('.')[0]}}}`,
              componentContent.toString(),
            );
          });
        }

        readComponentStream.on('end', () => {
          writeIndexHtmlStream.write(htmlContent);
        });
      });
    },
  );
});

function copyAssetsFolder() {
  fs.mkdir(path.join(__dirname, projectDistFolder, 'assets'), (err) => {
    if (err) {
      console.log(err);
      return;
    }

    fs.readdir(
      path.join(__dirname, 'assets'),
      { withFileTypes: true, recursive: true },
      (err, files) => {
        for (let file of files) {
          if (file.isDirectory()) {
            const dirPath = path.join(
              __dirname,
              projectDistFolder,
              'assets',
              file.name,
            );
            fs.mkdir(dirPath, () => {
              fs.readdir(
                path.join(__dirname, 'assets', file.name),
                { withFileTypes: true },
                (err, copiedFiles) => {
                  for (let copiedFile of copiedFiles) {
                    const src = path.join(
                      __dirname,
                      'assets',
                      file.name,
                      copiedFile.name,
                    );
                    fs.copyFile(
                      src,
                      path.join(dirPath, copiedFile.name),
                      () => {},
                    );
                  }
                },
              );
            });
          }
        }
      },
    );
  });
}
