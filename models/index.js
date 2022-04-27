const User = require('./User');
const Post = require('./Post');
const Image = require('./Image')
const Comment = require('./Comment');
const Like = require('./Like');

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

// user-like associations
User.hasMany(Like, {
  foreignKey: 'user_id'
});
Like.belongsTo(User, {
  foreignKey: 'user_id'
});

// post-like associations
Post.hasMany(Like, {
  foreignKey: 'post_id'
});
Like.belongsTo(Post, {
  foreignKey: 'post_id'
});
User.belongsToMany(Post, {
  through: Like, 
  as: 'liked_posts',
  foreignKey: 'post_id"'
});
Post.belongsToMany(User, {
  through: Like, 
  as: 'liked_posts',
  foreignKey: 'post_id"'
});

// image-like associations
Image.hasMany(Like, {
  foreignKey: 'image_id'
});
Like.belongsTo(Image, {
  foreignKey: 'image_id'
});
User.belongsToMany(Post, {
  through: Like, 
  as: 'liked_images',
  foreignKey: 'image_id"'
});
Post.belongsToMany(User, {
  through: Like, 
  as: 'liked_images',
  foreignKey: 'image_id"'
});

module.exports = { User, Post, Image, Like, Comment };