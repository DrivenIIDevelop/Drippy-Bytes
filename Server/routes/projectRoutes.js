const express = require('express');
const router = express.Router();
const db = require('../db/db');

// GET all projects
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM projects');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).send('Server Error');
  }
});

// POST a new project
router.post('/', async (req, res) => {
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
router.get('/:projectId', async (req, res) => {
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
router.put('/:projectId', async (req, res) => {
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
router.delete('/:projectId', async (req, res) => {
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

module.exports = router;

