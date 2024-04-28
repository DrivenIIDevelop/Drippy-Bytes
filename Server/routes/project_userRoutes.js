const express = require('express');
const router = express.Router();
const db = require('../db/db');


// GET all project-to-user mappings for a specific user
router.get('/', async (req, res) => {
  const userId = req.params.userId;
  try {
    const { rows } = await db.query('SELECT * FROM project_to_user WHERE user_id = $1', [userId]);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching project-to-user mappings:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

// GET a specific project-to-user mapping by ID for a specific user
router.get('/:id', async (req, res) => {
  const userId = req.params.userId;
  const id = req.params.id;
  try {
    const { rows } = await db.query('SELECT * FROM project_to_user WHERE user_id = $1 AND project_to_user_id = $2', [userId, id]);
    if (rows.length === 0) {
      return res.status(404).send('Project-to-user mapping not found');
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching project-to-user mapping:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

// POST a new project-to-user mapping for a specific user
router.post('/', async (req, res) => {
  const userId = req.params.userId;
  const { project_id, user_id, notification_type } = req.body;
  try {
    const { rows } = await db.query(
      'INSERT INTO project_to_user (project_id, user_id, notification_type) VALUES ($1, $2, $3) RETURNING *',
      [project_id, userId, notification_type]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error creating project-to-user mapping:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
