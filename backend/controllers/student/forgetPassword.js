const Student = require("../../models/student/student.model");
const Company = require("../../models/company/company.model");
const { default: mongoose } = require("mongoose");
const {
  INVALID_REQUEST_DATA_CODE,
  INVALID_REQUEST_DATA,
  INTERNAL_SERVER_ERROR_CODE,
  INTERNAL_SERVER_ERROR,
} = require("../../constants/constantsMessages");
const {
  sendForgotPasswordEmail,
} = require("../../utils/sendForgotPasswordEmail");

const forgetPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(INVALID_REQUEST_DATA_CODE)
      .json({ success: false, msg: INVALID_REQUEST_DATA });
  }

  Student.findOne({ collegeEmail: email })
    .then((foundStudent) => {
      if (foundStudent) {
        sendForgotPasswordEmail(
          foundStudent.collegeEmail,
          foundStudent.password
        );
        return res.json({ success: true });
      } else res.json({ success: false });
    })
    .catch((err) => {
      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .json({ success: false, msg: INTERNAL_SERVER_ERROR, err });
    });
};

module.exports = { forgetPassword };
