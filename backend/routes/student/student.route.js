const router = require("express").Router();
const Student = require("../../models/student/student.model");
const Company = require("../../models/company/company.model");

const {
  NO_EMAIL,
  NO_UID,
  DUPLICATE_STUDENT,
} = require("../../constants/constantsMessages");
const verifyAdmin = require("../../middleware/verifyAdmin");
const { sendVerificationEmail } = require("../../utils/sendVerificationEmail");
const {
  registerNewStudentWithEmail,
} = require("../../controllers/student/registerNewStudentWithEmail");
const {
  updateStudentDetails,
} = require("../../controllers/student/updateStudentDetails");
const { getStudent } = require("../../controllers/student/getStudents");
const {
  getStudentApplications,
} = require("../../controllers/student/getStudentApplications");
const { updatePassword } = require("../../controllers/student/updatePassword");
const {
  deleteStudentById,
} = require("../../controllers/student/deleteStudentById");
const { forgetPassword } = require("../../controllers/student/forgetPassword");
const {
  uploadProfilePic,
} = require("../../controllers/student/uploadProfilePic");
const { uploadResume } = require("../../controllers/student/uploadResume");

router.get("/", getStudent);
router.delete("/:stuId", deleteStudentById);

// register new student with email
router.post("/new", registerNewStudentWithEmail);

// update the existing user
router.put("/update", updateStudentDetails);

// update password
router.put("/updatePassword", updatePassword);

// get student's applications with roles
router.get("/:stuId/applications", getStudentApplications);

router.post("/forgot-password", forgetPassword);

router.post("/profile-pic", uploadProfilePic);
router.post("/resume", uploadResume);

module.exports = router;
