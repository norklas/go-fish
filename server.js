const express = require("express");
const sequelize = require("./config/connection");
const routes = require("./controllers");
const path = require("path");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const exphbs = require("express-handlebars");
const hbs = exphbs.create();

const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 3001;

const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
  secret: "project2 secret very secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
