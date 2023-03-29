const Student = require("../../models/student/student.model");
const Company = require("../../models/company/company.model");

const getPlacementRatio = async (req, res) => {
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
};

module.exports = { getPlacementRatio };
