const express = require('express');
const router = express.Router();
const db = require('../db/db');

// Search route
router.get('/:searchString', async (req, res) => {
  const searchString = req.params.searchString;

  try {
    const { rows } = await db.query(`
      SELECT 'file' AS type, file_name AS name FROM files WHERE file_name ILIKE $1
      UNION ALL
      SELECT 'task' AS type, title AS name FROM tasks WHERE title ILIKE $1
      UNION ALL
      SELECT 'project' AS type, project_name AS name FROM projects WHERE project_name ILIKE $1
      UNION ALL
      SELECT 'conversation' AS type, name AS name FROM conversations WHERE name ILIKE $1
    `, [`%${searchString}%`]);

    res.json(rows);
  } catch (error) {
    console.error('Error searching:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
