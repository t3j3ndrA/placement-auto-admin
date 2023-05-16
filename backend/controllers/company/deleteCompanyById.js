const { default: mongoose } = require("mongoose");
const {
  INVALID_REQUEST_DATA_CODE,
  INVALID_REQUEST_DATA,
  INTERNAL_SERVER_ERROR_CODE,
  INTERNAL_SERVER_ERROR,
} = require("../../constants/constantsMessages");
const Company = require("../../models/company/company.model");
const Student = require("../../models/student/student.model");
const { setStudentsElligibility } = require("../../utils/company.utils");

const deleteCompanyById = async (req, res) => {
  const { cid } = req.params;
  if (!cid || !mongoose.isValidObjectId(cid)) {
    return res
      .status(INVALID_REQUEST_DATA_CODE)
      .json({ success: false, msg: INVALID_REQUEST_DATA });
  }

  Company.findOneAndDelete({ _id: cid })
    .then((result) => {
      return res.status(200).json({ success: true, msg: "Company deleted." });
    })
    .catch((err) => {
      console.log("Err >> ", err);
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json({ success: false, msg: "Server error", err });
    });
};

module.exports = { deleteCompanyById };
