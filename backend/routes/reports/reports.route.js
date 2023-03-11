const router = require("express").Router();
const Student = require("../../models/student/student.model");
const Company = require("../../models/company/company.model");

router.get("/placed-ratio", async (req, res) => {
  const { year, limit } = req.query;
  const malePlaced = await Student.find({
    "placementStatus.selected": "yes",
    gender: "male",
    passingYear: year,
  });

  const maleNotPlaced = await Student.find({
    "placementStatus.selected": "no",
    gender: "male",
    passingYear: year,
  });

  const femalePlaced = await Student.find({
    "placementStatus.selected": "yes",
    gender: "female",
    passingYear: year,
  });

  const femaleNotPlaced = await Student.find({
    "placementStatus.selected": "no",
    gender: "female",
    passingYear: year,
  });

  return res.json({
    success: true,
    data: {
      malePlaced: malePlaced.length,
      maleNotPlaced: maleNotPlaced.length,
      femalePlaced: femalePlaced.length,
      femaleNotPlaced: femaleNotPlaced.length,
      totalPlaced: malePlaced.length + femalePlaced.length,
      totalNotPlaced: maleNotPlaced.length + femaleNotPlaced.length,
    },
  });
});

router.get("/placed", async (req, res) => {
  const { year, limit } = req.query;
  const students = await Student.find({
    "placementStatus.selected": "yes",
    passingYear: year,
  })
    .sort({ "placementStatus.package": "desc" })
    .limit(limit || 10);
  return res.json({ success: true, data: students });
});

router.get("/yearly-placed", async (req, res) => {
  const { year, limit } = req.query;

  const students = await Student.find({
    "placementStatus.selected": "yes",
    passingYear: year,
  })
    .sort({ rollNumber: "asc" })
    .limit(limit || 2000);
  return res.json({ success: true, data: students });
});

router.get("/yearly-not-placed", async (req, res) => {
  const { year, limit } = req.query;

  const students = await Student.find({
    "placementStatus.selected": "no",
    passingYear: year,
  })
    .sort({ rollNumber: "asc" })
    .limit(limit || 2000);
  return res.json({ success: true, data: students });
});

module.exports = router;
