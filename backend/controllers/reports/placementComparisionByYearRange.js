const Student = require("../../models/student/student.model");
const Company = require("../../models/company/company.model");

const placementComparisionByYearRange = async (req, res) => {
  let yearWise = [];
  const { minYear, maxYear } = req.query;
  const INF = 1000000000;

  for (let i = minYear; i <= maxYear; ++i) {
    const studentsOfYear = await Student.find({ passingYear: i });
    let placedCount = 0,
      totalPackage = 0,
      minPackage = INF,
      maxPackage = 0;

    studentsOfYear.forEach((s) => {
      if (s?.placementStatus?.selected == "yes") {
        placedCount++;
        totalPackage += s.placementStatus.package;
        minPackage = Math.min(minPackage, s.placementStatus.package);
        maxPackage = Math.max(maxPackage, s.placementStatus.package);
      }
    });

    yearWise.push({
      name: "" + i,
      "Min Package": minPackage === INF ? 0 : minPackage,
      "Max Package": maxPackage,
      "Avg Package": totalPackage / placedCount || 0,
    });
  }

  return res.json({ success: true, data: yearWise });
};

module.exports = { placementComparisionByYearRange };
