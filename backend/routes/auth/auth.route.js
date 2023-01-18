const router = require("express").Router();
const Admin = require("../../models/admin/admin.model");

const {
  NO_EMAIL,
  NO_PASSWORD,
  WRONG_CREDENTIALS,
} = require("../../constants/constantsMessages");

router.get("/get-session", (req, res) => {
  return res.json({ session: req.session });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.json({ success: false, msg: NO_EMAIL });
  if (!password) return res.json({ success: false, msg: NO_PASSWORD });

  Admin.findOne({ email: email, password: password })
    .then((foundAdmin) => {
      if (!foundAdmin)
        return res.json({ success: false, msg: WRONG_CREDENTIALS });

      // store the email of the logged in admin into session
      console.log("foundAdmin >> ", foundAdmin);
      req.session.email = foundAdmin.email;

      return res.json({ success: true });
    })
    .catch((error) => {
      return res.json({ success: false, error: error });
    });
});

router.post("/logout", (req, res) => {
  req.session.destroy();
  return res.json({ success: true });
});

module.exports = router;
