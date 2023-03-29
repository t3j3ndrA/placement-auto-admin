const Company = require("../../models/company/company.model");
const Student = require("../../models/student/student.model");

const getRoleDetails = async (req, res) => {
  const { companyId, roleId } = req.params;

  const company = await Company.findOne(
    { _id: companyId, "roles._id": roleId },
    { name: 1, "roles.$": 1 }
  );
  let data = {
    name: company.name,
    role: company.roles[0],
  };
  return res.json({ success: true, data });
};

module.exports = { getRoleDetails };
