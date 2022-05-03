const router = require("express").Router();
const { User, Post, Vote, Comment } = require("../../models");

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
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(dbUserData => {
    if (!dbUserData) {
      res.status(400).json({ message: `No user found for ${req.body.email}`});
      return;
    }

    // validate password with helper
    // session code goes here

    res.json({ user: dbUserData, message: 'Login successful' });
  });
});

router.post('/logout', (req, res) => {
  console.log('logout');
  // if (req.session.loggedIn) {
  //   req.session.destroy(() => {
  //     res.status(204).end();
  //   });
  // }
  // else {
  //   res.status(404).end();
  // }
});

module.exports = router;
