const session = require("express-session");

const verifyStudent = (req, res, next) => {
  if (req.session.isStudent && req.session.studentId) {
    next();
  } else {
    return res.redirect("/login");
  }
};

module.exports = verifyStudent;
