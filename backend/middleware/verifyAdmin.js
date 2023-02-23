const session = require("express-session");

const verifyAdmin = (req, res, next) => {
  // console.log("Verifying adming for  : ", req.session);
  if (req.session.isAdmin && req.session.adminId) {
    req.body.adminId = req.session.adminId;
    next();
  } else {
    return res.json({ msg: "admin not logged in" });
    // adming login page
    res.redirect("http://localhost:3000/login");
  }
};

module.exports = verifyAdmin;
