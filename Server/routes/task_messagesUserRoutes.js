const express = require('express');
const router = express.Router();
const db = require('../db/db');


// GET all task-message-to-user mappings
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM task_messages_to_user');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching task-message-to-user mappings:', error);
    res.status(500).send('Server Error');
  }
});

// GET a specific task-message-to-user mapping by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await db.query('SELECT * FROM task_messages_to_user WHERE task_message_to_user_id = $1', [id]);
    if (rows.length === 0) {
      return res.status(404).send('Task-message-to-user mapping not found');
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching task-message-to-user mapping:', error);
    res.status(500).send('Server Error');
  }
});

// POST a new task-message-to-user mapping
router.post('/', async (req, res) => {
  const { task_message_id, user_id } = req.body;
  try {
    const { rows } = await db.query(
      'INSERT INTO task_messages_to_user (task_message_id, user_id) VALUES ($1, $2) RETURNING *',
      [task_message_id, user_id]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error creating task-message-to-user mapping:', error);
    res.status(500).send('Server Error');
  }
});

// DELETE a task-message-to-user mapping by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await db.query('DELETE FROM task_messages_to_user WHERE task_message_to_user_id = $1 RETURNING *', [id]);
    if (rows.length === 0) {
      return res.status(404).send('Task-message-to-user mapping not found');
    }
    res.json({ message: 'Task-message-to-user mapping deleted successfully' });
  } catch (error) {
    console.error('Error deleting task-message-to-user mapping:', error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
