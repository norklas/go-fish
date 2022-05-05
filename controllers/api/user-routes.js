const router = require("express").Router();
const { User, Post, Vote, Comment } = require("../../models");
const passportAuth = require("../../utils/auth");
const passport = require("../../utils/passport");
const LocalStrategy = require("passport-local").Strategy;

router.get("/", (req, res) => {
  User.findAll({
    attributes: { exclude: ["[password"] },
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Post,
        attributes: ["id", "post_text", "created_at"],
      },
      {
        model: Comment,
        attributes: ["id", "comment_text", "created_at"],
      },
      {
        model: Post,
        attributes: ["post_text"],
        through: Vote,
        as: "voted_posts",
      },
    ],
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  }).then((dbUserData) => {
    res.redirect("/login");
  });
});

// login using passport methods
router.post("/login", passport.authenticate("local"), function (req, res) {
  res.render("newsfeed", { loggedIn: req.session.passport.user.id });
});

// router.post("/login", (req, res) => {
//   User.findOne({
//     where: {
//       email: req.body.email,
//     },
//   }).then((dbUserData) => {
//     if (!dbUserData) {
//       res.status(400).json({ message: `No user found for ${req.body.email}` });
//       return;
//     }
//     res.json({ user: dbUserData, message: "Login successful" });
//   });
// });

// Logout using passport methods
router.post("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

module.exports = router;
