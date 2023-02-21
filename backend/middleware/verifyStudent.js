const session = require("express-session");

const verifyStudent = (req, res, next) => {
  if (req.session.isStudent && req.session.studentId) {
    next();
  } else {
    return res.json({ msg: "student not logged in" });
    // student login page
    res.redirect("http://localhost:3000/login");
  }
};

module.exports = verifyStudent;
