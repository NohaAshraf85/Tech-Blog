const router = require('express').Router();
const { BlogPost } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  // create a new blogpost
  try {
    const blogpostData = await BlogPost.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(blogpostData);
  } 
  catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a blogpost by its `id` value
  try {
    const blogpostData = await BlogPost.update(
      {blogPost_title: req.body.category_name},
      {returning: true, where: {id: req.params.id}}
    )
    console.log(blogpostData);
    res.status(200).json(blogpostData[1]);
  }
  catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
    // delete a blogpost by its `id` value
  try {
    const blogpostData = await BlogPost.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogpostData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(blogpostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = BlogPost;
