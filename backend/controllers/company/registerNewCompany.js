const Company = require("../../models/company/company.model");
const Student = require("../../models/student/student.model");

const registerNewCompany = async (req, res) => {
  const { name, website, email, forBatch, description, roles, address } =
    req.body;

  await setStudentsElligibility(roles, forBatch);

  const tempCompany = new Company({
    name,
    website,
    email,
    forBatch,
    description,
    address,
    roles,
  });

  tempCompany
    .save()
    .then((savedCompany) => {
      res.json({ success: true, data: savedCompany });
    })
    .catch((error) => {
      res.json({ success: false, msg: "Could not register company" });
    });
};

module.exports = { registerNewCompany };
