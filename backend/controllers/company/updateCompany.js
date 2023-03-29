const Company = require("../../models/company/company.model");
const Student = require("../../models/student/student.model");
const { setStudentsElligibility } = require("../../utils/company.utils");

const updateCompany = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.json({ success: false, msg: "Company Id is required" });
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
    console.log("for-batch", foundCompany.forBatch);
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
    .catch((error) => {
      return res.json({ success: false, error });
    });
};

module.exports = { updateCompany };
