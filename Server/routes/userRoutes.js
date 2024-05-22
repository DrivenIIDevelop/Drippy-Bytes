const express = require('express');
const router = express.Router();
const db = require('../db/db');
const bcrypt = require('bcrypt');

// Hash password function
const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw error;
  }
};


//Create a new user
router.post('/', async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  try {
    const hashedPassword = await hashPassword(password); // Hash the password
    const { rows } = await db.query(
      'INSERT INTO users (first_name, last_name, email, hashed_password) VALUES ($1, $2, $3, $4) RETURNING *',
      [first_name, last_name, email, hashedPassword] // Store the hashed password in the database
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Server Error');
  }
});





// GET all users
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM users');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Server Error');
  }
});



// GET a single user by ID
router.get('/:userId', async (req, res) => {
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
router.put('/:userId', async (req, res) => {
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
router.delete('/:userId', async (req, res) => {
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

// Route to retrieve all notes for a specific user
router.get('/:user_id/notes', async (req, res) => {
  const userId = req.params.user_id;

  try {
    // Query the database to fetch all notes for the specified user
    const { rows } = await db.query('SELECT * FROM notes WHERE user_id = $1', [userId]);

    res.json(rows); // Send the fetched notes as a JSON response
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});


// POST route for creating a new note for a specific user

router.post('/:userId/notes', async (req, res) => {
  const userId = req.params.userId;
  const { title, content } = req.body;

  try {
    const { rows } = await db.query(
      'INSERT INTO notes (title, content, user_id) VALUES ($1, $2, $3) RETURNING *',
      [title, content, userId]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).send('Server Error');
  }
});


// PUT route for updating a specific note for a specific user
router.put('/:userId/notes/:noteId', async (req, res) => {
  const userId = req.params.userId;
  const noteId = req.params.noteId;
  const { title, content } = req.body;

  try {
    const { rows } = await db.query(
      'UPDATE notes SET title = $1, content = $2 WHERE note_id = $3 AND user_id = $4 RETURNING *',
      [title, content, noteId, userId]
    );

    if (rows.length === 0) {
      return res.status(404).send('Note not found for the user');
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).send('Server Error');
  }
});


// DELETE route for deleting a specific note for a specific user
router.delete('/:userId/notes/:noteId', async (req, res) => {
  const userId = req.params.userId;
  const noteId = req.params.noteId;

  try {
    const { rows } = await db.query(
      'DELETE FROM notes WHERE note_id = $1 AND user_id = $2 RETURNING *',
      [noteId, userId]
    );

    if (rows.length === 0) {
      return res.status(404).send('Note not found for the user');
    }

    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
