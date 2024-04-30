const express = require('express');
const router = express.Router();
const db = require('../db/db');


// GET all task-to-user mappings
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM task_to_user');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching task-to-user mappings:', error);
    res.status(500).send('Server Error');
  }
});


// GET a specific task-to-user mapping by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await db.query('SELECT * FROM task_to_user WHERE task_to_user_id = $1', [id]);
    if (rows.length === 0) {
      return res.status(404).send('Task-to-user mapping not found');
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching task-to-user mapping:', error);
    res.status(500).send('Server Error');
  }
});



// DELETE a task-to-user mapping by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await db.query('DELETE FROM task_to_user WHERE task_to_user_id = $1 RETURNING *', [id]);
    if (rows.length === 0) {
      return res.status(404).send('Task-to-user mapping not found');
    }
    res.json({ message: 'Task-to-user mapping deleted successfully' });
  } catch (error) {
    console.error('Error deleting task-to-user mapping:', error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
