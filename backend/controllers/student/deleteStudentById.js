const { default: mongoose } = require("mongoose");
const {
  INVALID_REQUEST_DATA_CODE,
  INVALID_REQUEST_DATA,
  INTERNAL_SERVER_ERROR_CODE,
  INTERNAL_SERVER_ERROR,
} = require("../../constants/constantsMessages");
const Company = require("../../models/company/company.model");
const Student = require("../../models/student/student.model");

const deleteStudentById = async (req, res) => {
  const { stuId } = req.params;

  if (!stuId || !mongoose.isValidObjectId(stuId)) {
    return res
      .status(INVALID_REQUEST_DATA_CODE)
      .json({ success: false, msg: INVALID_REQUEST_DATA });
  }

  Student.findOneAndDelete({ _id: stuId })
    .then((result) => {
      return res.status(200).json({ success: true, msg: "Student deleted." });
    })
    .catch((err) => {
      console.log("err >> ", err);
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json({ success: false, msg: "Server error", err });
    });
};

module.exports = { deleteStudentById };
