const fs = require('fs');
const path = require('path');

// Function to delete files from a directory
function deleteFilesInDirectory(directoryPath) {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(directoryPath, file);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
        } else {
          console.log('File deleted successfully:', filePath);
        }
      });
    });
  });
}

// Example usage: delete files in the 'uploads' directory
const uploadsDirectory = path.join(__dirname, 'uploads');
deleteFilesInDirectory(uploadsDirectory);

