const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { default: toast } = require('react-hot-toast');

// Define the input and output directories
const inputDir = './input';
const outputDir = './output';

// Create the output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Function to convert an image to WebP format
function convertToWebP(inputFilePath, outputFilePath) {
  sharp(inputFilePath)
    .webp()
    .toFile(outputFilePath, (err, info) => {
    });
}

// Read the files in the input directory
fs.readdir(inputDir, (err, files) => {
  if (err) {
    return;
  }

  // Filter only JPG and PNG files
  const imageFiles = files.filter((file) => /\.(jpg|jpeg|png)$/i.test(file));

  // Convert each image to WebP format
  imageFiles.forEach((file) => {
    const inputFilePath = path.join(inputDir, file);
    const outputFilePath = path.join(
      outputDir,
      path.basename(file, path.extname(file)) + '.webp'
    );
    convertToWebP(inputFilePath, outputFilePath);
  });
});
