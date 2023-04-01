const { default: mongoose } = require("mongoose");
const {
  INTERNAL_SERVER_ERROR_CODE,
  INTERNAL_SERVER_ERROR,
  INVALID_REQUEST_DATA_CODE,
  INVALID_REQUEST_DATA,
} = require("../../constants/constantsMessages");
const Company = require("../../models/company/company.model");
const Student = require("../../models/student/student.model");

const notifySpecifiedStudents = async (req, res) => {
  const { companyId, roleId, selectedStudents } = req.body;
  if (
    !mongoose.isValidObjectId(companyId) ||
    !mongoose.isValidObjectId(roleId)
  ) {
    return res
      .status(INVALID_REQUEST_DATA_CODE)
      .json({ success: false, msg: INVALID_REQUEST_DATA });
  }
  try {
    const updated = await Company.findOneAndUpdate(
      { _id: companyId, "roles._id": roleId },
      {
        $addToSet: {
          "roles.$.elligibles": selectedStudents,
        },
      },
      { new: true }
    );

    return res.json({ success: true, data: updated });
  } catch (err) {
    return res
      .status(INTERNAL_SERVER_ERROR_CODE)
      .json({ success: false, msg: INTERNAL_SERVER_ERROR, err });
  }
};

module.exports = { notifySpecifiedStudents };
