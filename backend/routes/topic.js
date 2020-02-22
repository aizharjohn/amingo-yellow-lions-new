const express = require('express');
const router = express.Router();
const Topic = require('../models/Topic');

router.post('/create', (req, res) => {
  const topicData = {
    topic: req.body.topic
  };

  const newTopic = new Topic(topicData);
  newTopic.save();

  res.send('Topic Created');
});

module.exports = router;
