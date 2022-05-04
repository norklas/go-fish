const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");
const { Op } = require("sequelize");

router.get("/:post_text", (req, res) => {
  Post.findAll({
    limit: 10,
    where: {
      post_text: {
        [Op.like]: "%" + req.params.post_text + "%", // we haven't seen this code yet, but Op stands for Operator,  it will find post_text like %whateverissearched%
      },
    },
    attributes: [
      "id",
      "post_text",
      "user_id",
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
          attributes: ["username", "id"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbSearchData) => {
      if (!dbSearchData) {
        res
          .status(404)
          .json({ message: "No post found with this search criteria" });
        return;
      }

      const posts = dbSearchData.map((post) => post.get({ plain: true }));
      res.render("search", { posts }); // again we should check loggedIn status here if we want to
      // res.json(posts);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
