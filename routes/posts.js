const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

//get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().limit(10);
        res.json(posts); 
    } catch(err) {
        res.json({ message: err });
    }
});

//submit post
router.post('/', async (req, res) => {
    //create new post object
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    //save it to DB and then echo the results on the page
    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch(err) {
        res.json({ message: err });
    }
});

//get a specific post
router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch(err) {
        res.json({ message: err }); 
    }
});

//delete a post
router.delete('/:postId', async (req, res) => {
    try {
        const removedPost = await Post.remove({ _id: req.params.postId });
        res.json(removedPost);
    } catch(err) {
        res.json({ message: err });
    }
});

//update a post 
router.patch('/:postId', async (req, res) => {
   try {
        const updatedPost = await Post.updateOne(
            { _id: req.params.postId }, 
            { $set: {title: req.body.title}}
        );
        res.json(updatedPost);
   } catch(err) {
        res.json({ message: err });
   }
});

module.exports = router;