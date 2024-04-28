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

// Route to retrieve all messages(conversations) for a specific task
router.get('/:taskId/comments', async (req, res) => {
  const taskId = req.params.taskId;

  try {
    // Query the database to fetch only the message column for the specified task
    const { rows } = await db.query('SELECT message FROM task_messages WHERE task_id = $1', [taskId]);

    res.json(rows); // Send the fetched messages as a JSON response
  } catch (error) {
    console.error('Error fetching task messages:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});


// creating a new comment for a specific task

router.post('/:taskId/comments', async (req, res) => {
  const taskId = req.params.taskId;
  const { messenger_id, message } = req.body; // Assuming messenger_id is provided in the request body

  try {
    // Insert the new comment into the task_messages table
    const { rows } = await db.query(
      'INSERT INTO task_messages (task_id, messenger_id, message, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *',
      [taskId, messenger_id, message]
    );

    res.status(201).json(rows[0]); // Send the newly created comment as a JSON response
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).send('Server Error');
  }
});


// Updating a specific comment for a specific task
// PUT route for updating a specific comment for a specific task
router.put('/:taskId/comments/:commentId', async (req, res) => {
  const taskId = req.params.taskId;
  const commentId = req.params.commentId;
  const { message } = req.body;

  try {
    // Query the database to update the specific comment for the specified task
    const { rows } = await db.query(
      'UPDATE task_messages SET message = $1 WHERE task_id = $2 AND task_message_id = $3 RETURNING *',
      [message, taskId, commentId]
    );

    if (rows.length === 0) {
      return res.status(404).send('Comment not found for the task');
    }

    res.json(rows[0]); // Send the updated comment details as a JSON response
  } catch (error) {
    console.error('Error updating comment:', error);
    res.status(500).send('Server Error');
  }
});

// DELETE route for deleting a specific comment for a specific task
router.delete('/:taskId/comments/:commentId', async (req, res) => {
  const taskId = req.params.taskId;
  const commentId = req.params.commentId;

  try {
    // Query the database to delete the specific comment for the specified task
    const { rows } = await db.query(
      'DELETE FROM task_messages WHERE task_id = $1 AND task_message_id = $2 RETURNING *',
      [taskId, commentId]
    );

    if (rows.length === 0) {
      return res.status(404).send('Comment not found for the task');
    }

    res.json({ message: 'Comment deleted successfully' }); // Send a success message as a JSON response
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).send('Server Error');
  }
});


module.exports = router;
