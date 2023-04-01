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

const applyToCompany = async (req, res) => {
  const { companyId, roleId, stuId } = req.params;

  if (
    !mongoose.isValidObjectId(companyId) ||
    !mongoose.isValidObjectId(roleId) ||
    !mongoose.isValidObjectId(stuId)
  ) {
    return res
      .status(INVALID_REQUEST_DATA_CODE)
      .json({ success: false, msg: INVALID_REQUEST_DATA });
  }

  const check = await isElligible(companyId, roleId, stuId);

  if (!check) {
    return res.json({ success: false, msg: "You are not elligibel" });
  }

  Company.findOneAndUpdate(
    {
      _id: companyId,
      "roles._id": roleId,
    },
    {
      $addToSet: {
        "roles.$.applications": stuId,
      },
    },
    {
      new: true,
    }
  )
    .then((updatedCompany) => {
      return res.json({ success: true, data: updatedCompany });
    })
    .catch((err) => {
      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .json({ success: false, msg: INTERNAL_SERVER_ERROR, err });
    });
};

module.exports = { applyToCompany };
