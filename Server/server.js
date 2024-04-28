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
const fileUploadRoutes = require('./routes/fileUploadRoutes');
const conversationRoutes = require('./routes/conversationsRoutes');
const conversationParticipantsRoutes = require('./routes/conversation_participantsRoutes');
const conversationMessagesRoutes = require('./routes/conversation_messagesRoutes'); // Import the new route module for conversation messages
const projectUserRoutes = require('./routes/project_userRoutes');
const authRoutes = require('./routes/auth');


// Use route modules
app.use('/projects', projectRoutes);
app.use('/tasks', taskRoutes);
app.use('/users', userRoutes);
app.use('/files', fileUploadRoutes);
app.use('/conversations', conversationRoutes);
app.use('/conversations/:conversationId/participants', conversationParticipantsRoutes); // Add new route for conversation participants
app.use('/conversations/:conversationId/messages', conversationMessagesRoutes); // Add new route for conversation messages
app.use('/projects/:userId', projectUserRoutes);
app.use('/auth', authRoutes); // Mount the auth routes at /auth base URL



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
