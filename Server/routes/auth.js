const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db/db');

const router = express.Router();


// POST route for login
router.post('/login', async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  console.log('Received login request with username/email:', usernameOrEmail);
  console.log('Received password:', password);

  try {
    // Check if usernameOrEmail is a valid username or email
    const user = await db.query(
      'SELECT * FROM users WHERE username = $1 OR email = $1',
      [usernameOrEmail]
    );

    if (user.rows.length === 0) {
      // User not found, return error
      return res.status(404).json({ error: 'User not found' });
    }

    const userData = user.rows[0];
    // Compare the provided password with the hashed password from the database
    const passwordMatch = await bcrypt.compare(password, userData.hashed_password);

    if (!passwordMatch) {
      // Incorrect password, return error
      return res.status(401).json({ error: 'Incorrect password' });
    }

    // Passwords match, return success response
    res.json({ message: 'Login successful', userId: userData.user_id });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
