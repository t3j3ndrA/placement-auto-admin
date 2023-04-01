const Student = require("../../models/student/student.model");
const Company = require("../../models/company/company.model");

const getAllPlacedByYear = async (req, res) => {
  const { year, limit } = req.query;

  const students = await Student.find({
    "placementStatus.selected": "yes",
    passingYear: year,
  })
    .sort({ rollNumber: "asc" })
    .limit(limit || 2000);

  return res.json({ success: true, data: students });
};

module.exports = { getAllPlacedByYear };
