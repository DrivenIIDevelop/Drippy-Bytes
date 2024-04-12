require('doenv').config();
const express = require('express');
const app = express();
const db = require('./db/db')

app.use(express.json()); // Middleware to parse JSON bodies

// Define a simple route to test
app.get('/', (req, res) => {
  res.send('Hello, ProjectPulse!');
});

// GET all projects
app.get('/projects', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM projects');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).send('Server Error');
  }
});

// POST a new project
app.post('/projects', async (req, res) => {
  const { project_name, description, start_date, end_date, status } = req.body;
  try {
    const { rows } = await db.query(
      'INSERT INTO projects (project_name, description, start_date, end_date, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [project_name, description, start_date, end_date, status]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).send('Server Error');
  }
});

// GET a single project by ID
app.get('/projects/:projectId', async (req, res) => {
  const projectId = req.params.projectId;
  try {
    const { rows } = await db.query('SELECT * FROM projects WHERE project_id = $1', [projectId]);
    if (rows.length === 0) {
      return res.status(404).send('Project not found');
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).send('Server Error');
  }
});

// PUT/update a project by ID
app.put('/projects/:projectId', async (req, res) => {
  const projectId = req.params.projectId;
  const { project_name, description, start_date, end_date, status } = req.body;
  try {
    const { rows } = await db.query(
      'UPDATE projects SET project_name = $1, description = $2, start_date = $3, end_date = $4, status = $5 WHERE project_id = $6 RETURNING *',
      [project_name, description, start_date, end_date, status, projectId]
    );
    if (rows.length === 0) {
      return res.status(404).send('Project not found');
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).send('Server Error');
  }
});

// DELETE a project by ID
app.delete('/projects/:projectId', async (req, res) => {
  const projectId = req.params.projectId;
  try {
    const { rows } = await db.query('DELETE FROM projects WHERE project_id = $1 RETURNING *', [projectId]);
    if (rows.length === 0) {
      return res.status(404).send('Project not found');
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).send('Server Error');
  }
});

// GET all tasks for a specific project
app.get('/projects/:projectId/tasks', async (req, res) => {
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
app.post('/projects/:projectId/tasks', async (req, res) => {
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
app.get('/tasks/:taskId', async (req, res) => {
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
app.put('/tasks/:taskId', async (req, res) => {
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
app.delete('/tasks/:taskId', async (req, res) => {
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

// GET all users
app.get('/users', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM users');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Server Error');
  }
});


// POST a new user
app.post('/users', async (req, res) => {
  const { username, email, role } = req.body;
  try {
    const { rows } = await db.query(
      'INSERT INTO users (username, email, role) VALUES ($1, $2, $3) RETURNING *',
      [username, email, role]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Server Error');
  }
});

// GET a single user by ID
app.get('/users/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const { rows } = await db.query('SELECT * FROM users WHERE user_id = $1', [userId]);
    if (rows.length === 0) {
      return res.status(404).send('User not found');
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).send('Server Error');
  }
});


// PUT/update a user by ID
app.put('/users/:userId', async (req, res) => {
  const userId = req.params.userId;
  const { username, email, role } = req.body;
  try {
    const { rows } = await db.query(
      'UPDATE users SET username = $1, email = $2, role = $3 WHERE user_id = $4 RETURNING *',
      [username, email, role, userId]
    );
    if (rows.length === 0) {
      return res.status(404).send('User not found');
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send('Server Error');
  }
});

// DELETE a user by ID
app.delete('/users/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const { rows } = await db.query('DELETE FROM users WHERE user_id = $1 RETURNING *', [userId]);
    if (rows.length === 0) {
      return res.status(404).send('User not found');
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send('Server Error');
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
