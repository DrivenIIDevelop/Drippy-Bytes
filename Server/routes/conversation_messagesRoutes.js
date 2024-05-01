const express = require('express');
const router = express.Router({ mergeParams: true }); // Enable params to be merged, allowing access to :conversationId
const db = require('../db/db');

// GET all messages in a specific conversation
router.get('/', async (req, res) => {
  const { conversationId } = req.params;
  try {
    const { rows } = await db.query('SELECT * FROM conversation_messages WHERE conversation_id = $1', [conversationId]);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).send('Server Error');
  }
});

// POST a new message to a specific conversation
router.post('/', async (req, res) => {
  const { conversationId } = req.params;
  const { messenger_id, message } = req.body;
  try {
    const { rows } = await db.query(
      'INSERT INTO conversation_messages (conversation_id, messenger_id, message) VALUES ($1, $2, $3) RETURNING *',
      [conversationId, messenger_id, message]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error posting message:', error);
    res.status(500).send('Server Error');
  }
});

// GET a single message by ID
router.get('/:messageId', async (req, res) => {
  const { conversationId, messageId } = req.params;
  try {
    const { rows } = await db.query('SELECT * FROM conversation_messages WHERE conversation_message_id = $1 AND conversation_id = $2', [messageId, conversationId]);
    if (rows.length === 0) {
      return res.status(404).send('Message not found');
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching message:', error);
    res.status(500).send('Server Error');
  }
});

// PUT/update a message by ID
router.put('/:messageId', async (req, res) => {
  const { conversationId, messageId } = req.params;
  const { message } = req.body;
  try {
    const { rows } = await db.query(
      'UPDATE conversation_messages SET message = $1 WHERE conversation_message_id = $2 AND conversation_id = $3 RETURNING *',
      [message, messageId, conversationId]
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

// DELETE a message by ID
router.delete('/:messageId', async (req, res) => {
  const { conversationId, messageId } = req.params;
  try {
    const { rows } = await db.query('DELETE FROM conversation_messages WHERE conversation_message_id = $1 AND conversation_id = $2 RETURNING *', [messageId, conversationId]);
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
