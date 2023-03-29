const Company = require("../../models/company/company.model");
const Student = require("../../models/student/student.model");

const getCompaniesForStudent = async (req, res) => {
  const { studentId } = req.params;
  const student = await Student.findOne({ _id: studentId });
  if (!student) return res.json({ success: false, msg: "No student found" });

  const companies = await Company.find({
    forBatch: student.passingYear,
    isActive: true,
  });

  let resCompanies = [];

  companies.forEach((c) => {
    let roles = c.roles.map((role) => {
      console.log("role... > ", { ...role });
      if (role?.elligibles.includes(studentId)) {
        return { ...role._doc, isElligible: true };
      } else {
        return { ...role._doc, isElligible: false };
      }
    });
    if (roles) {
      resCompanies.push({ ...c._doc, roles });
    }
  });

  return res.json({ success: true, data: resCompanies });
};

module.exports = { getCompaniesForStudent };
