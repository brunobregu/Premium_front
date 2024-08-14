// move-build.js
const fs = require('fs-extra');
const path = require('path');

// Source and destination directories
const sourceDir = path.join(__dirname, '.next');
const destinationDir = path.join(process.env.HOMEDRIVE, process.env.HOMEPATH, 'Desktop', '.next'); // Path to Desktop

// Copy the .next folder to the Desktop
fs.copy(sourceDir, destinationDir, { overwrite: true })
  .then(() => console.log('.next folder copied successfully to Desktop!'))
  .catch(err => console.error('Error copying .next folder:', err));
