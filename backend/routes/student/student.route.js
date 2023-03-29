const router = require("express").Router();
const Student = require("../../models/student/student.model");
const Company = require("../../models/company/company.model");
const generator = require("generate-password");
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

router.get("/", getStudent);

// register new student with email
router.post("/new", registerNewStudentWithEmail);

// update the existing user
router.put("/update", updateStudentDetails);

// get student's applications with roles
router.get("/:stuId/applications", getStudentApplications);

module.exports = router;
