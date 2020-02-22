const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const Feed = require('../models/Feed');
const Profile = require('../models/Profile');
const User = require('../models/User');
const Topic = require('../models/Topic');

router.get('/', (req, res) => {
  res.send('hello');
});

// Create a post
router.post(
  '/',
  [
    auth,
    [
      check('topic', 'Please select a topic')
        .not()
        .isEmpty(),
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      //const topic = await Topic.findById(req.topic.id);

      const newFeed = new Feed({
        topic: req.body.topic,
        text: req.body.text,
        username: user.username,
        avatar: user.avatar,
        user: req.user.id
      });

      const feed = await newFeed.save();

      res.json(feed);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// Get all feeds
router.get('/', auth, async (req, res) => {
  try {
    const feeds = await Feed.find().sort({ date: -1 });
    res.json(feeds);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//Get feed by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const feed = await Feed.findById(req.params.id);

    // Check for ObjectId format and post
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !feed) {
      return res.status(404).json({ msg: 'Feed not found' });
    }

    res.json(feed);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

//Get feed by topic
// router.get('/diabetes', async (req, res) => {
//   try {
//     const feed = await Feed.find({ topic: 'Diabetes' });

//     const getFeeds = (query={}, topic={}) => {
//       Feed.find(query, topic).exec().then
//     }

//     if (!feed) return res.status(400).json({ msg: "Topic doesn't exist" });

//     res.json(feed);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// Delete a feed
router.delete('/:id', auth, async (req, res) => {
  try {
    const feed = await Feed.findById(req.params.id);

    // Check for ObjectId format and feed
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !feed) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Check user
    if (feed.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await feed.remove();

    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// Like a feed
router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: 'Post already liked' });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Unlike a feed
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length ===
      0
    ) {
      return res.status(400).json({ msg: 'Post has not yet been liked' });
    }

    // Get remove index
    const removeIndex = post.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Comment on a feed
router.post(
  '/comment/:id',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };

      post.comments.unshift(newComment);

      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// Delete a comment
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Pull out comment
    const comment = post.comments.find(
      comment => comment.id === req.params.comment_id
    );

    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }

    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Get remove index
    const removeIndex = post.comments
      .map(comment => comment.id)
      .indexOf(req.params.comment_id);

    post.comments.splice(removeIndex, 1);

    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
