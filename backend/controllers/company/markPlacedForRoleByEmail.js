const { default: mongoose } = require("mongoose");
const {
  INTERNAL_SERVER_ERROR,
  INTERNAL_SERVER_ERROR_CODE,
  INVALID_REQUEST_DATA,
  INVALID_REQUEST_DATA_CODE,
} = require("../../constants/constantsMessages");
const Company = require("../../models/company/company.model");
const Student = require("../../models/student/student.model");
const { isElligible } = require("../../utils/company.utils");

const markPlacedForRoleByEmail = async (req, res) => {
  const { companyId, roleId } = req.params;

  // emails of placed students
  const { emails } = req.body;

  if (
    !mongoose.isValidObjectId(companyId) ||
    !mongoose.isValidObjectId(roleId) ||
    !emails
  ) {
    return res
      .status(INVALID_REQUEST_DATA_CODE)
      .json({ success: false, msg: INVALID_REQUEST_DATA });
  }

  const allStudents = await Student.find({ collegeEmail: { $in: emails } });

  let invalidEmailSet = new Set(emails);

  const allStudIds = allStudents.map((student) => {
    invalidEmailSet.delete(student.collegeEmail);
    return student._id;
  });

  
  Company.findOneAndUpdate(
    {
      _id: companyId,
      "roles._id": roleId,
    },
    {
      $addToSet: {
        "roles.$.placed": allStudIds,
      },
    },
    {
      new: true,
    }
  )
    .then((updatedCompany) => {
      return res.json({
        success: true,
        invalidEmails: Array.from(invalidEmailSet),
      });
    })
    .catch((err) => {
      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .json({ success: false, msg: INTERNAL_SERVER_ERROR, err });
    });
};

module.exports = { markPlacedForRoleByEmail };
