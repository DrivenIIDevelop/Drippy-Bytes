require('doenv').config();
const express = require('express');
const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

// Define a simple route to test
app.get('/', (req, res) => {
  res.send('Hello, ProjectPulse!');
});

// Example of using the database connection to fetch data
app.get('/projects', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM projects');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).send('Server Error');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
