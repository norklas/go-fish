const User = require('./User');
const Post = require('./Post');
const Image = require('./Image')
const Comment = require('./Comment');
const Vote = require('./Vote');

// user-post associations
User.hasMany(Post, {
  foreignKey: 'user_id'
}),
Post.belongsTo(User, {
  foreignKey: 'user_id'
});

// user-image associations
User.hasMany(Image, {
  foreignKey: 'user_id'
}),
Image.belongsTo(User, {
  foreignKey: 'user_id'
});

// post-comment associations
Post.hasMany(Comment, {
  foreignKey: 'post_id'
});
Comment.belongsTo(Post, {
  foreignKey: 'post_id'
});

// user-comment associations
User.hasMany(Comment, {
  foreignKey: 'user_id'
});
Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

// user-vote associations
User.hasMany(Vote, {
  foreignKey: 'user_id'
});
Vote.belongsTo(User, {
  foreignKey: 'user_id'
});

// post-vote associations
Post.hasMany(Vote, {
  foreignKey: 'post_id'
});
Vote.belongsTo(Post, {
  foreignKey: 'post_id'
});
User.belongsToMany(Post, {
  through: Vote, 
  as: 'voted_posts',
  foreignKey: 'post_id"'
});
Post.belongsToMany(User, {
  through: Vote, 
  as: 'voted_posts',
  foreignKey: 'post_id"'
});

// image-vote associations
Image.hasMany(Vote, {
  foreignKey: 'image_id'
});
Vote.belongsTo(Image, {
  foreignKey: 'image_id'
});
User.belongsToMany(Post, {
  through: Vote, 
  as: 'voted_images',
  foreignKey: 'image_id"'
});
Post.belongsToMany(User, {
  through: Vote, 
  as: 'voted_images',
  foreignKey: 'image_id"'
});

module.exports = { User, Post, Image, Vote, Comment };