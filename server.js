<<<<<<< HEAD
const path = require("path");
const express = require("express");
const sequelize = require("./config/connection");
const routes = require("./controllers");
const exphbs = require("express-handlebars");
=======
const path = require('path');
const express = require('express');
const sequelize = require('./config/connection');
const routes = require('./controllers');
const exphbs = require('express-handlebars');
>>>>>>> 9fc4371e95035e804d486aba28fd7b7ccc3596a4

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create();

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
<<<<<<< HEAD
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
=======
  app.listen(PORT, ()=> console.log(`Now listening on port ${PORT}`));
>>>>>>> 9fc4371e95035e804d486aba28fd7b7ccc3596a4
});
