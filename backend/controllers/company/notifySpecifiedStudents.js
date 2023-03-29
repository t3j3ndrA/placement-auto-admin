const Company = require("../../models/company/company.model");
const Student = require("../../models/student/student.model");

const notifySpecifiedStudents = async (req, res) => {
  const { companyId, roleId, selectedStudents } = req.body;

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
};

module.exports = { notifySpecifiedStudents };
