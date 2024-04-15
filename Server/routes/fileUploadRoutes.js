const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const express = require('express');
const multer = require('multer');
const db = require('../db/db'); // Assuming this imports your database connection
const path = require('path');
const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Function to generate UUIDs
function generateUUID() {
  return uuidv4();
}

// File Upload Endpoint
router.post('/upload', upload.single('file'), async (req, res) => {
  const { originalname } = req.file;
  const fileUUID = generateUUID(); // Generate a UUID for the file

  // Store file metadata in the database
  try {
    const query = `
      INSERT INTO files (file_name, file_path, uuid)
      VALUES ($1, $2, $3)
      RETURNING file_id`;
    const values = [originalname, req.file.path, fileUUID]; // Use req.file.path for the file path
    const { rows } = await db.query(query, values);
    const fileId = rows[0].file_id;

    res.status(201).json({ fileId, message: 'File uploaded and metadata stored successfully' });
  } catch (error) {
    console.error('Error storing file metadata:', error);
    res.status(500).send('Server Error');
  }
});

// File Download Endpoint
router.get('/download/:fileId', async (req, res) => {
  const fileId = req.params.fileId;

  try {
    const query = `
      SELECT file_name, file_path FROM files WHERE file_id = $1`;
    const { rows } = await db.query(query, [fileId]);
    const file = rows[0];

    if (!file) {
      return res.status(404).send('File not found');
    }

    const filePath = path.join(__dirname, '..', file.file_path); // Remove 'uploads' from the file path
    const fileStream = fs.createReadStream(filePath);

    fileStream.on('error', (error) => {
      console.error('Error reading file:', error);
      res.status(500).send('Error reading file');
    });

    fileStream.pipe(res);
  } catch (error) {
    console.error('Error fetching file metadata:', error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

