require('dotenv').config();
const express = require('express');
const app = express();
const upload = require('./config/multerConfig');
const path = require('path');


app.use(express.json()); // Middleware to parse JSON bodies

// Import route modules
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');

// Use route modules
app.use('/projects', projectRoutes);
app.use('/projects/:projectId/tasks', taskRoutes); // Correct mounting for task routes
app.use('/users', userRoutes);

// Route to handle file uploads using Multer
app.post('/upload', upload.single('file'), (req, res) => {
  res.send('File uploaded successfully');
});

// Define a simple route to test
app.get('/', (req, res) => {
  res.send('Hello, ProjectPulse!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
