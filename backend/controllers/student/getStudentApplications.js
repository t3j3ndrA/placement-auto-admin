const Student = require("../../models/student/student.model");
const Company = require("../../models/company/company.model");

const getStudentApplications = async (req, res) => {
  const { stuId } = req.params;
  const student = await Student.findOne({ _id: stuId });

  if (!student) return res.json({ success: false, msg: "Invalid students" });

  const companies = await Company.find({ forBatch: student.passingYear });

  // const comapny = await Company.findOne({ _id: id });
  let result = [];

  companies.forEach((company) => {
    let roles = company.roles.filter((role) => {
      return role?.applications?.includes(stuId);
    });
    if (roles.length > 0) {
      result.push({ ...company._doc, roles });
    }
  });

  return res.json({ success: true, data: result });
};

module.exports = { getStudentApplications };
