const Student = require("../../models/student/student.model");
const Company = require("../../models/company/company.model");
const { default: mongoose } = require("mongoose");
const {
  INVALID_REQUEST_DATA_CODE,
  INVALID_REQUEST_DATA,
} = require("../../constants/constantsMessages");

const updateStudentDetails = async (req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    gender,
    dateOfBirth,
    collegeID,
    rollNumber,
    branch,
    passingYear,
    collegeEmail,
    personalEmail,
    personalPhoneNumber,
    parentsPhoneNumber,
    password,
    result,
    competitiveCoding,
    address,
    placementStatus,
    internshipStatus,
  } = req.body;

  if (!collegeEmail)
    return res
      .status(INVALID_REQUEST_DATA_CODE)
      .json({ success: false, msg: INVALID_REQUEST_DATA });

  Student.findOneAndUpdate(
    { collegeEmail },
    {
      firstName,
      middleName,
      lastName,
      gender,
      dateOfBirth,
      collegeID,
      rollNumber,
      branch,
      passingYear,
      personalEmail,
      personalPhoneNumber,
      parentsPhoneNumber,
      password,
      result,
      competitiveCoding,
      address,
      placementStatus,
      internshipStatus,
      isVerified: true,
    },
    { new: true }
  )
    .then((updatedStudent) => res.json({ success: true, data: updatedStudent }))
    .catch((err) => {
      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .json({ success: false, msg: INTERNAL_SERVER_ERROR, err });
    });
};

module.exports = { updateStudentDetails };
