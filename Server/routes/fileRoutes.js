const express = require('express');
const router = express.Router();
const db = require('../db/db');


// GET all files
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM files');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).send('Server Error');
  }
});

// GET a file by ID
router.get('/:fileId', async (req, res) => {
  const fileId = req.params.fileId;
  try {
    const { rows } = await db.query('SELECT * FROM files WHERE file_id = $1', [fileId]);
    if (rows.length === 0) {
      return res.status(404).send('File not found');
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching file:', error);
    res.status(500).send('Server Error');
  }
});

// POST a new file
router.post('/', async (req, res) => {
  const { file_name, file_path, uuid, upload_date, user_id } = req.body;
  try {
    const { rows } = await db.query(
      'INSERT INTO files (file_name, file_path, uuid, upload_date, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [file_name, file_path, uuid, upload_date, user_id]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error creating file:', error);
    res.status(500).send('Server Error');
  }
});

// DELETE a file by ID
router.delete('/:fileId', async (req, res) => {
  const fileId = req.params.fileId;

  try {
    // Check if the file exists
    const { rows } = await db.query('SELECT * FROM files WHERE file_id = $1', [fileId]);
    if (rows.length === 0) {
      return res.status(404).send('File not found');
    }

    // Check if there are associated views in file_views table
    const viewsCount = await db.query('SELECT COUNT(*) FROM file_views WHERE file_id = $1', [fileId]);
    if (viewsCount.rows[0].count > 0) {
      return res.status(400).send('File has associated views. Cannot delete.');
    }

    // Delete the file from the database
    await db.query('DELETE FROM files WHERE file_id = $1', [fileId]);

    res.status(204).send(); // No content response for successful deletion
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
