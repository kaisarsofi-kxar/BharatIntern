
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Display all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.render('index', { posts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new post
router.post('/add', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });

  try {
    const newPost = await post.save();
    res.redirect('/');
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a post
router.post('/delete/:id', async (req, res) => {
  const id = req.params.id;

  try {
    await Post.findByIdAndDelete(id);
    res.redirect('/');
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
