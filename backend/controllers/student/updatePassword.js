const Student = require("../../models/student/student.model");
const Company = require("../../models/company/company.model");
const { default: mongoose } = require("mongoose");
const {
  INVALID_REQUEST_DATA_CODE,
  INVALID_REQUEST_DATA,
} = require("../../constants/constantsMessages");

const updatePassword = async (req, res) => {
  const { password, stuId } = req.body;

  if (!mongoose.isValidObjectId(stuId) || !password) {
    return res
      .status(INVALID_REQUEST_DATA_CODE)
      .json({ success: false, msg: INVALID_REQUEST_DATA });
  }

  Student.findOneAndUpdate(
    { _id: stuId },
    {
      password: password,
    },
    { new: true }
  )
    .then((updatedStudent) =>
      res.json({ success: true, msg: "Password updated" })
    )
    .catch((err) => {
      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .json({ success: false, msg: INTERNAL_SERVER_ERROR, err });
    });
};

module.exports = { updatePassword };
