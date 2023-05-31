const verifyLoggedIn = (req, res, next) => {
  if (req.session.isStudent || req.session.isAdmin) {
    next();
  } else {
    console.log("not loggedin")
    return res.redirect("/");
  }
};

module.exports = verifyLoggedIn;
