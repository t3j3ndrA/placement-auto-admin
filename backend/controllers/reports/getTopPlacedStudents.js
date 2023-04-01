const Student = require("../../models/student/student.model");
const Company = require("../../models/company/company.model");

const getTopPlacedStudents = async (req, res) => {
  const { year, limit } = req.query;
  const students = await Student.find({
    "placementStatus.selected": "yes",
    passingYear: year,
  })
    .sort({ "placementStatus.package": "desc" })
    .limit(limit || 10);
  return res.json({ success: true, data: students });
};

module.exports = { getTopPlacedStudents };
