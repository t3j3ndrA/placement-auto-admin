const Student = require("../../models/student/student.model");
const Company = require("../../models/company/company.model");

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
    return res.json({ success: false, msg: "College Email is required" });

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
    .catch((error) => res.json({ success: false, error }));
};

module.exports = { updateStudentDetails };
