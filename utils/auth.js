// withAuth confirms login status when using only session
const withAuth = (req, res, next) => {
  if (!req.session.user_id) {
    res.redirect("/login");
  } else {
    next();
  }
};

module.exports = withAuth;

// passportAuth verifies that a user is loggedIn using session.passport instead of just session
const passportAuth = (req, res, next) => {
  if (req.user) {
    return next();
  }
  return res.redirect("/newsfeed");
};

module.exports = passportAuth;
