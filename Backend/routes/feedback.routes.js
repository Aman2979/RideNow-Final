// const express  = require('express');
import express from 'express';
import { Router } from 'express';
import Feedback from '../models/Feedback.models.js';

const router = express.Router();

// POST /api/feedback
router.post('/createfeedback', async (req, res) => {
  try {
    const { name, email, message, rating } = req.body;

    if (!name || !email || !message || !rating)
      return res.status(400).json({ error: 'All fields are required' });

    if (rating < 1 || rating > 5)
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });

    const feedback = await Feedback.create({ name, email, message, rating });
    res.status(201).json({ success: true, feedback });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/feedback
router.get('/getfeedback', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// module.exports = router;
export default router;