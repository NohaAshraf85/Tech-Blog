const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
// create a new comment
    try {
        const commentData = await Comment.create({
            ...req.body,
            blog_id: req.session.blog_id,
        });
        res.status(200).json(commentData);
    }
    catch (err) {
        res.status(400).json(err);
    }
});

module.exports = Comment;

