require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const upload = require('./config/multerConfig');
const path = require('path');

if(process.env.TEST){

}
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// Import route modules
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');

const taskUserRoutes = require('./routes/task_userRoutes');
const taskMessagesUserRoutes = require('./routes/task_messagesUserRoutes');
const userRoutes = require('./routes/userRoutes');
const fileUploadRoutes = require('./routes/fileUploadRoutes');
const conversationRoutes = require('./routes/conversationsRoutes');
const conversationParticipantsRoutes = require('./routes/conversation_participantsRoutes');
const conversationMessagesRoutes = require('./routes/conversation_messagesRoutes'); // Import the new route module for conversation messages

const projectUserRoutes = require('./routes/project_userRoutes');
const fileRoutes = require('./routes/fileRoutes');
const fileViewsRoutes = require('./routes/fileViewsRoutes');
const authRoutes = require('./routes/auth');
const searchRoutes = require('./routes/searchRoutes');



// Use route modules
app.use('/projects', projectRoutes);
app.use('/tasks', taskRoutes);
app.use('/task-to-user', taskUserRoutes);
app.use('/task-messages-to-user', taskMessagesUserRoutes);
app.use('/users', userRoutes);
app.use('/files/upload', fileUploadRoutes);
app.use('/conversations', conversationRoutes);
app.use('/conversations/:conversationId/participants', conversationParticipantsRoutes); // Add new route for conversation participants
app.use('/conversations/:conversationId/messages', conversationMessagesRoutes); // Add new route for conversation messages
app.use('/projects-to-user', projectUserRoutes);
app.use('/files', fileRoutes);
app.use('/file/views', fileViewsRoutes);
app.use('/auth', authRoutes); // Mount the auth routes at /auth base URL
app.use('/search', searchRoutes);




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
