const express = require('express');
const router = express.Router();
const db = require('../db/db');

// GET all file views
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM file_views');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching file views:', error);
    res.status(500).send('Server Error');
  }
});

// GET file views by user ID
router.get('/user/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const { rows } = await db.query('SELECT * FROM file_views WHERE user_id = $1', [userId]);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching file views by user ID:', error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
