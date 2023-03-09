const verifyLoggedIn = (req, res, next) => {
  if (req.session.isStudent || req.session.isAdmin) {
    next();
  } else {
    return res.json({ msg: "Not Logged In" });
    // student login page
    res.redirect("http://localhost:3000/login");
  }
};

module.exports = verifyLoggedIn;
