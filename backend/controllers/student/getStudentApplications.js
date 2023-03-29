const Student = require("../../models/student/student.model");
const Company = require("../../models/company/company.model");
const { default: mongoose } = require("mongoose");
const {
  INVALID_REQUEST_DATA_CODE,
  INVALID_REQUEST_DATA,
  INTERNAL_SERVER_ERROR_CODE,
  INTERNAL_SERVER_ERROR,
} = require("../../constants/constantsMessages");

const getStudentApplications = async (req, res) => {
  const { stuId } = req.params;
  if (!mongoose.isValidObjectId(stuId))
    return res
      .status(INVALID_REQUEST_DATA_CODE)
      .json({ success: false, msg: INVALID_REQUEST_DATA });

  const student = await Student.findOne({ _id: stuId });

  if (!student)
    return res
      .status(INVALID_REQUEST_DATA_CODE)
      .json({ success: false, msg: INVALID_REQUEST_DATA });
  try {
    const companies = await Company.find({ forBatch: student.passingYear });

    // const comapny = await Company.findOne({ _id: id });
    let result = [];

    companies.forEach((company) => {
      let roles = company?.roles?.filter((role) => {
        return role?.applications?.includes(stuId);
      });
      if (roles.length > 0) {
        result.push({ ...company._doc, roles });
      }
    });

    return res.json({ success: true, data: result });
  } catch (err) {
    return res
      .status(INTERNAL_SERVER_ERROR_CODE)
      .json({ success: false, msg: INTERNAL_SERVER_ERROR, err });
  }
};

module.exports = { getStudentApplications };
