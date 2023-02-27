const router = require("express").Router();
const Company = require("../../models/company/company.model");
const Student = require("../../models/student/student.model");
const verifyAdmin = require("../../middleware/verifyAdmin");
const mongoose = require("mongoose");

const {
  NO_EMAIL,
  NO_UID,
  DUPLICATE_STUDENT,
} = require("../../constants/constantsMessages");

const {
  setStudentsElligibility,
  isElligible,
} = require("../../utils/company.utils");

router.get("/", (req, res) => {
  const { name, website, email, id } = req.query;

  if (id) {
    return Company.findOne({ _id: id })
      .then((result) => res.json({ success: true, data: result }))
      .catch((err) => res.json({ success: false, err }));
  }

  // regex documentations -> https://www.mongodb.com/docs/manual/reference/operator/query/regex/
  // i - case insensitivity
  Company.find({
    $and: [
      {
        name: {
          $regex: name ? ".*" + name + "*." : ".*.",
          $options: "i",
        },
      },
    ],
  })
    .then((foundCompany) => {
      return res.json({ success: true, data: foundCompany });
    })
    .catch((error) => {
      return res.json({ success: false, error });
    });
});

// register new Company
router.post("/new", async (req, res) => {
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
      res.json({ success: false, error });
    });
});

// update the existing company
router.put("/update", async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.json({ success: false, msg: "Company Id is required" });
  }

  const { name, website, email, forBatch, description, address, roles } =
    req.body;

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
    },
    { new: true }
  )
    .then((updatedCompany) => {
      return res.json({ success: true, data: updatedCompany });
    })
    .catch((error) => {
      return res.json({ success: false, error });
    });
});

// apply to company via company id , student id if not already, role id
router.put("/apply-to/:companyId/for/:roleId/:stuId", async (req, res) => {
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
});

module.exports = router;
