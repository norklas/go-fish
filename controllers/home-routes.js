const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");
const { session } = require("passport");
const router = require("express").Router();

// Rendering all posts to homepage
router.get("/", (req, res) => {
  Post.findAll({
    attributes: [
      "id",

      "post_text",
      "created_at",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)"
        ),
        "vote_count",
      ],
    ],
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
        attributes: ["username", "id"],
      },
    ],
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));

      // defining login status
      let loginStatus;
      if (typeof req.session.passport != "undefined") {
        loginStatus = req.session.passport.user;
      } else {
        loginStatus = false;
      }
      // passing a single post object into homepage template
      res.render("newsfeed", { posts, loggedIn: loginStatus }); // this will need a loggedIn check if we want to hide posts unless logged in, so it would be { posts, loggedIn: req.session.loggedIn }
      // res.json(posts);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// placeholder redirect route, redirects to homepage once they log in. will not work until we get session implemented
router.get("/login", (req, res) => {
  // if (req.session.loggedIn) {
  //   res.redirect("/newsfeed");
  //   return;
  // }
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/posts/:id", (req, res) => {
  console.log("single-post route called");
  console.log(req.params);
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      "id",
      "post_text",
      "created_at",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)"
        ),
        "vote_count",
      ],
    ],
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
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }

      // serialize the data
      const post = dbPostData.get({ plain: true });

      // defining log-in status
      let loginStatus;
      if (typeof req.session.passport != "undefined") {
        loginStatus = req.session.passport.user;
      } else {
        loginStatus = false;
      }

      // pass data to template
      res.render("single-post", { post, loggedIn: loginStatus });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
