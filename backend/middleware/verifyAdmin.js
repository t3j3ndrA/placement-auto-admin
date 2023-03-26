const session = require("express-session");

const verifyAdmin = (req, res, next) => {
  // console.log("Verifying adming for  : ", req.session);
  if (req.session.isAdmin && req.session.adminId) {
    console.log("Admin loggedin");
    req.body.adminId = req.session.adminId;
    next();
  } else {
    // return res.json({ msg: "admin not logged in" });
    // adming login page
    console.log("Admin not loggedin");
    return res.redirect("/login");
  }
};

module.exports = verifyAdmin;
