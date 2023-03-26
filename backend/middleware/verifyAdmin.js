const session = require("express-session");

const verifyAdmin = (req, res, next) => {
  if (req.session.isAdmin && req.session.adminId) {
    req.body.adminId = req.session.adminId;
    next();
  } else {
    return res.redirect("/admin/login");
  }
};

module.exports = verifyAdmin;
