const { default: mongoose } = require("mongoose");
const {
  INVALID_REQUEST_DATA_CODE,
  INVALID_REQUEST_DATA,
} = require("../../constants/constantsMessages");
const Company = require("../../models/company/company.model");
const Student = require("../../models/student/student.model");

const getRoleDetails = async (req, res) => {
  const { companyId, roleId } = req.params;
  if (
    !mongoose.isValidObjectId(companyId) ||
    !mongoose.isValidObjectId(roleId)
  ) {
    return res
      .status(INVALID_REQUEST_DATA_CODE)
      .json({ success: false, msg: INVALID_REQUEST_DATA });
  }

  const company = await Company.findOne(
    { _id: companyId, "roles._id": roleId },
    { name: 1, "roles.$": 1 }
  );
  if (company && company.roles) {
    let data = {
      name: company.name,
      role: company.roles[0],
    };
    return res.json({ success: true, data });
  } else {
    return res
      .status(INVALID_REQUEST_DATA_CODE)
      .json({ success: false, msg: INVALID_REQUEST_DATA });
  }
};

module.exports = { getRoleDetails };
