const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");
const router = require("express").Router();

// Rendering all posts to homepage
router.get("/", (req, res) => {
  Post.findAll({
    attributes: ["id", "title", "post_text", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true })); // passing a single post object into homepage template
      res.render("homepage", { posts }); // this will need a loggedIn check if we want to hide posts unless logged in, so it would be { posts, loggedIn: req.session.loggedIn }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// placeholder redirect route, redirects to homepage once they log in. will not work until we get session implemented
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});
