/** This utility will watch the extensions src folder for changes,
 * and will automatically rebuild the extension whenever the source code changes */
const chokidar = require('chokidar'),
  { exec } = require('child_process');

chokidar.watch('src').on('change', () => {
  console.log(`building extension....`);
  exec('./scripts/build.sh', (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`${stdout}`);
  });
});
