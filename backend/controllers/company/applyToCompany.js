const Company = require("../../models/company/company.model");
const Student = require("../../models/student/student.model");
const { isElligible } = require("../../utils/company.utils");

const applyToCompany = async (req, res) => {
  const { companyId, roleId, stuId } = req.params;

  if (!companyId || !roleId || !stuId) {
    console.log("companyId", companyId);
    console.log("stuId", stuId);
    console.log("roleId", roleId);
    return res.json({ msg: "Insufficient data" });
  }

  const check = await isElligible(companyId, roleId, stuId);
  console.log("Check = ", check);
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
      console.log(err);
    });
};

module.exports = { applyToCompany };
