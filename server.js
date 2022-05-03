<<<<<<< HEAD
const path = require('path');
const express = require('express');
const sequelize = require('./config/connection');
const routes = require('./controllers');
const exphbs = require('express-handlebars');
=======
const express = require("express");
const sequelize = require("./config/connection");
const routes = require("./controllers");
>>>>>>> e86e8e335371c04db01f4807a60238c4e850f9d5

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(routes);

<<<<<<< HEAD
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, ()=> console.log(`Now listening on port ${PORT}`));
});
=======
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
>>>>>>> e86e8e335371c04db01f4807a60238c4e850f9d5
