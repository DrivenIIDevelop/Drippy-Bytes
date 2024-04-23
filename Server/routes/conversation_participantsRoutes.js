const express = require('express');
const router = express.Router({ mergeParams: true }); // Enable params to be merged, allowing access to :conversationId
const db = require('../db/db');

// GET all participants for a specific conversation
router.get('/', async (req, res) => {
  const conversationId = req.params.conversationId; // Corrected to use req.params.conversationId directly
  try {
    const { rows } = await db.query(
      'SELECT u.user_id, u.username, u.email FROM users u INNER JOIN conversation_participants cp ON u.user_id = cp.participant_id WHERE cp.conversation_id = $1',
      [conversationId]
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching participants:', error);
    res.status(500).send('Server Error');
  }
});

// POST a new participant to a conversation
router.post('/', async (req, res) => {
  const conversationId = req.params.conversationId;
  const { participant_id } = req.body;
  try {
    const { rows } = await db.query(
      'INSERT INTO conversation_participants (conversation_id, participant_id) VALUES ($1, $2) RETURNING *',
      [conversationId, participant_id]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error adding participant:', error);
    if (error.code === '23505') { // Handle unique constraint violation, e.g., adding the same participant again
      res.status(409).send('Participant already added');
    } else {
      res.status(500).send('Server Error');
    }
  }
});

// DELETE a participant from a conversation
router.delete('/:participantId', async (req, res) => {
  const { conversationId, participantId } = req.params;
  try {
    const { rows } = await db.query(
      'DELETE FROM conversation_participants WHERE conversation_id = $1 AND participant_id = $2 RETURNING *',
      [conversationId, participantId]
    );
    if (rows.length === 0) {
      return res.status(404).send('Participant not found');
    }
    res.send('Participant removed successfully');
  } catch (error) {
    console.error('Error removing participant:', error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
