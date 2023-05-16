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

const updateCompany = async (req, res) => {
  const { id } = req.body;
  if (!mongoose.isValidObjectId(id)) {
    return res
      .status(INVALID_REQUEST_DATA_CODE)
      .json({ success: false, msg: INVALID_REQUEST_DATA });
  }

  const {
    name,
    website,
    email,
    forBatch,
    description,
    address,
    roles,
    isActive,
  } = req.body;

  // if there is update in role then also update the corresponding elligibile students in a document
  if (forBatch && roles) {
    await setStudentsElligibility(roles, forBatch);
  } else if (forBatch) {
    const foundCompany = await Company.findOne({ _id: id });
    await setStudentsElligibility(foundCompany.roles, forBatch);
  } else if (roles) {
    const foundCompany = await Company.findOne({ _id: id });
    if (foundCompany.forBatch)
      await setStudentsElligibility(roles, foundCompany.forBatch);
  }

  Company.findOneAndUpdate(
    { _id: id },
    {
      name,
      website,
      email,
      forBatch,
      description,
      address,
      roles,
      isActive,
    },
    { new: true }
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

module.exports = { updateCompany };
