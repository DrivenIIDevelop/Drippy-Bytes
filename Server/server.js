require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

// Import route modules
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');

// Use route modules
app.use('/projects', projectRoutes);
app.use('/projects/:projectId/tasks', taskRoutes); // Correct mounting for task routes
app.use('/users', userRoutes);

// Define a simple route to test
app.get('/', (req, res) => {
  res.send('Hello, ProjectPulse!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

