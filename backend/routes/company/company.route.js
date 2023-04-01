const router = require("express").Router();
const Company = require("../../models/company/company.model");
const Student = require("../../models/student/student.model");
const verifyAdmin = require("../../middleware/verifyAdmin");
const mongoose = require("mongoose");

const {
  setStudentsElligibility,
  isElligible,
} = require("../../utils/company.utils");

const { getCompany } = require("../../controllers/company/getCompany");
const {
  getCompaniesForStudent,
} = require("../../controllers/company/getCompaniesForStudent");
const {
  registerNewCompany,
} = require("../../controllers/company/registerNewCompany");
const { updateCompany } = require("../../controllers/company/updateCompany");
const { applyToCompany } = require("../../controllers/company/applyToCompany");
const { getRoleDetails } = require("../../controllers/company/getRoleDetails");
const {
  getApplicationsAndElligibles,
} = require("../../controllers/company/getApplicationsAndElligibles");
const {
  notifySpecifiedStudents,
} = require("../../controllers/company/notifySpecifiedStudents");

router.get("/", getCompany);

router.get("/of/:studentId", getCompaniesForStudent);

// register new Company
router.post("/new", verifyAdmin, registerNewCompany);

// update the existing company
router.put("/update", verifyAdmin, updateCompany);

// apply to company via company id , student id if not already, role id
router.put("/apply-to/:companyId/for/:roleId/:stuId", applyToCompany);

// get company & role detail using rid & cid
router.get("/:companyId/role/:roleId/basic", getRoleDetails);

// get applications & elligibles students
router.get("/:companyId/role/:roleId", getApplicationsAndElligibles);

router.put("/notify", verifyAdmin, notifySpecifiedStudents);

module.exports = router;
