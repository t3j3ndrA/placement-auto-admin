const router = require("express").Router();
const Admin = require("../../models/admin/admin.model");
const Student = require("../../models/student/student.model");

const {
  NO_EMAIL,
  NO_PASSWORD,
  WRONG_CREDENTIALS,
} = require("../../constants/constantsMessages");

router.get("/get-session", (req, res) => {
  return res.json({ session: req.session });
});

router.post("/admin/login", (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.json({ success: false, msg: NO_EMAIL });
  if (!password) return res.json({ success: false, msg: NO_PASSWORD });

  Admin.findOne({ email: email, password: password })
    .then((foundAdmin) => {
      if (!foundAdmin)
        return res.json({ success: false, msg: WRONG_CREDENTIALS });
      req.session.studentId = null;
      req.session.email = foundAdmin.email;
      req.session.isAdmin = true;
      req.session.isStudent = false;
      req.session.adminId = foundAdmin._id;
      const user = {
        adminId: foundAdmin._id,
      };
      return res.json({ success: true, data: user });
    })
    .catch((error) => {
      return res.json({ success: false, error: error });
    });
});

router.post("/student/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.json({ success: false, msg: NO_EMAIL });
  if (!password) return res.json({ success: false, msg: NO_PASSWORD });

  Student.findOne({ collegeEmail: email, password: password })
    .then((foundStudent) => {
      if (!foundStudent)
        return res.json({ success: false, msg: WRONG_CREDENTIALS });
      // destroy the prev session
      // req.session.destroy();
      // req.session = null;
      req.session.email = foundStudent.collegeEmail;
      req.session.isAdmin = false;
      req.session.isStudent = true;
      req.session.studentId = foundStudent._id;
      req.session.adminId = null;

      const user = {
        studentId: foundStudent._id,
        isVerified: foundStudent.isVerified,
      };

      return res.json({ success: true, data: user });
    })
    .catch((error) => {
      console.log(error);
      return res.json({ success: false, error: error });
    });
});

router.post("/logout", (req, res) => {
  req.session.destroy();
  return res.json({ success: true });
});

module.exports = router;
