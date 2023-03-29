const router = require("express").Router();
const Student = require("../../models/student/student.model");
const Company = require("../../models/company/company.model");

const {
  getPlacementRatio,
} = require("../../controllers/reports/getPlacementRatio");
const {
  getTopPlacedStudents,
} = require("../../controllers/reports/getTopPlacedStudents");
const {
  getAllPlacedByYear,
} = require("../../controllers/reports/getAllPlacedByYear");
const {
  getNotPlacedByYear,
} = require("../../controllers/reports/getNotPlacedByYear");
const {
  downloadYearlyPlacementReports,
} = require("../../controllers/reports/downloadYearlyPlacementReport");
const {
  placementComparisionByYearRange,
} = require("../../controllers/reports/placementComparisionByYearRange");

router.get("/placed-ratio", getPlacementRatio);

// get top placed students with limit (default = 10)
router.get("/placed", getTopPlacedStudents);

// get yearly placed students
router.get("/yearly-placed", getAllPlacedByYear);

// get yearly not placed students
router.get("/yearly-not-placed", getNotPlacedByYear);

router.get("/yearly/download", downloadYearlyPlacementReports);

router.get("/comparision", placementComparisionByYearRange);

module.exports = router;
