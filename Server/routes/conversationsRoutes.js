const express = require('express');
const router = express.Router();
const db = require('../db/db');  

// GET all messages for a specific conversation
router.get('/:conversation_id', async (req, res) => {
  const { conversation_id } = req.params;
  try {
    const { rows } = await db.query('SELECT * FROM conversation_messages WHERE conversation_id = $1', [conversation_id]);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).send('Server Error');
  }
});

// POST a new conversation
router.post('/', async (req, res) => {
  const { owner_id, name } = req.body;
  try {
    const { rows } = await db.query(
      'INSERT INTO conversations (owner_id, name) VALUES ($1, $2) RETURNING *',
      [owner_id, name]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error creating conversation:', error);
    res.status(500).send('Server Error');
  }
});

// POST a new message to a conversation
router.post('/:conversation_id', async (req, res) => {
  const { conversation_id } = req.params;
  const { messenger_id, message } = req.body;
  try {
    const { rows } = await db.query(
      'INSERT INTO conversation_messages (conversation_id, messenger_id, message) VALUES ($1, $2, $3) RETURNING *',
      [conversation_id, messenger_id, message]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error posting message:', error);
    res.status(500).send('Server Error');
  }
});

// PUT/update a message in a conversation
router.put('/:conversation_id/messages/:message_id', async (req, res) => {
  const { conversation_id, message_id } = req.params;
  const { message } = req.body;
  try {
    const { rows } = await db.query(
      'UPDATE conversation_messages SET message = $1 WHERE conversation_message_id = $2 AND conversation_id = $3 RETURNING *',
      [message, message_id, conversation_id]
    );
    if (rows.length === 0) {
      return res.status(404).send('Message not found');
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error updating message:', error);
    res.status(500).send('Server Error');
  }
});

// DELETE a message from a conversation
router.delete('/:conversation_id/messages/:message_id', async (req, res) => {
  const { conversation_id, message_id } = req.params;
  try {
    const { rows } = await db.query(
      'DELETE FROM conversation_messages WHERE conversation_message_id = $1 AND conversation_id = $2 RETURNING *',
      [message_id, conversation_id]
    );
    if (rows.length === 0) {
      return res.status(404).send('Message not found');
    }
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
