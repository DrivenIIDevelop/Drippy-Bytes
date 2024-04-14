const express = require('express');
const router = express.Router({ mergeParams: true }); // Enable params to be merged, allowing access to :projectId
const db = require('../db/db');

// GET all tasks for a specific project
router.get('/', async (req, res) => {
  const projectId = req.params.projectId;
  try {
    const { rows } = await db.query('SELECT * FROM tasks WHERE project_id = $1', [projectId]);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).send('Server Error');
  }
});

// POST a new task within a project
router.post('/', async (req, res) => {
  const projectId = req.params.projectId;
  const { title, description, status, priority, assignee_id, start_date, due_date } = req.body;
  try {
    const { rows } = await db.query(
      'INSERT INTO tasks (project_id, title, description, status, priority, assignee_id, start_date, due_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [projectId, title, description, status, priority, assignee_id, start_date, due_date]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).send('Server Error');
  }
});

// GET a single task by ID
router.get('/:taskId', async (req, res) => {
  const taskId = req.params.taskId;
  try {
    const { rows } = await db.query('SELECT * FROM tasks WHERE task_id = $1', [taskId]);
    if (rows.length === 0) {
      return res.status(404).send('Task not found');
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).send('Server Error');
  }
});

// PUT/update a task by ID
router.put('/:taskId', async (req, res) => {
  const taskId = req.params.taskId;
  const { title, description, status, priority, assignee_id, start_date, due_date } = req.body;
  try {
    const { rows } = await db.query(
      'UPDATE tasks SET title = $1, description = $2, status = $3, priority = $4, assignee_id = $5, start_date = $6, due_date = $7 WHERE task_id = $8 RETURNING *',
      [title, description, status, priority, assignee_id, start_date, due_date, taskId]
    );
    if (rows.length === 0) {
      return res.status(404).send('Task not found');
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).send('Server Error');
  }
});

// DELETE a task by ID
router.delete('/:taskId', async (req, res) => {
  const taskId = req.params.taskId;
  try {
    const { rows } = await db.query('DELETE FROM tasks WHERE task_id = $1 RETURNING *', [taskId]);
    if (rows.length === 0) {
      return res.status(404).send('Task not found');
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
