const sequelize = require('../config/connection');
const { User, BlogPost, Comment } = require('../models');

const userData = require('./userData.json');
const blogPostData = require('./blogPostData.json');
const commentData = require('./commentData.json')

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
  
    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    for (const blog of blogPostData) {
        await BlogPost.create({
          ...blog,
          user_id: users[Math.floor(Math.random() * users.length)].id,
        });
      }

    for (const comment of commentData) {
      await Comment.create({
        ...comment,
        user_id: users[Math.floor(Math.random() * users.length)].id,
        blog_id: users[Math.floor(Math.random() * users.length)].id,
      });
    }

      process.exit(0);
    };
    
    seedDatabase();