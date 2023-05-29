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

const getPlacedOfRole = async (req, res) => {
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
    {
      _id: companyId,
      "roles._id": roleId,
    }, { 
      "roles.$" : 1, 
      "name" : 1
    }
  );

  if (!company) {
    return res
      .status(INVALID_REQUEST_DATA_CODE)
      .json({ success: false, msg: INVALID_REQUEST_DATA });
  }

  const roles = company?.roles;
  if (roles) {
    const placedIDs = roles[0].placed;
    try {
      const students = await Student.find({ _id: { $in: placedIDs } });
      let data = {
        name: company.name,
        role: roles[0],
        placed : students
      };
      return res.json({ success: true, data});
    } catch (err) {
      console.log(err )
      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .json({ success: false, msg: INTERNAL_SERVER_ERROR, err });
    }
  } else {
    return res
      .status(INVALID_REQUEST_DATA_CODE)
      .json({ success: false, msg: INVALID_REQUEST_DATA });
  }
};

module.exports = { getPlacedOfRole };
