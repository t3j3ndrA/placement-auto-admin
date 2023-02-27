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
const studentModel = require("../../models/student/student.model");

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

router.get("/:companyId/role/:roleId", async (req, res) => {
  const { companyId, roleId } = req.params;
  const {
    // personal details filter
    id,
    firstName,
    middleName,
    lastName,
    gender,
    // college details filter
    collegeID,
    rollNumber,
    passingYear,
    collegeEmail,
    personalPhoneNumber,
    // result filter
    minCPI,
    maxCPI,
    minTwelfthPerc,
    maxTwelfthPerc,
    minTenthPerc,
    maxTenthPerc,
    minDiplomaPerc,
    maxDiplomaPerc,
    // cp filters
    cpPlatforms, // of [{platform, minStars, maxStars, minRatings, maxRatings}]
    // address filtring
    city,
    state,
    postalCode,
  } = req.query;

  const company = await Company.findOne(
    { _id: companyId, "roles._id": roleId },
    { name: 1, "roles.$": 1 }
  );

  const role = company.roles[0];

  let data = {
    name: company.name,
    role: role,
    applications: [],
    elligibles: [],
  };

  const applications = await Student.find(
    {
      $and: [
        { _id: { $in: role.applications } },
        {
          firstName: {
            $regex: firstName ? firstName : ".*.",
            $options: "i",
          },
        },
        {
          middleName: {
            $regex: middleName ? middleName : ".*.",
            $options: "i",
          },
        },
        {
          lastName: {
            $regex: lastName ? lastName : ".*.",
            $options: "i",
          },
        },
        // // collegeEmail
        {
          collegeEmail: {
            $regex: collegeEmail ? collegeEmail : ".*.",
            $options: "i",
          },
        },
        // // collegeId
        {
          collegeID: {
            $regex: collegeID ? collegeID : ".*.",
            $options: "i",
          },
        },
        // // roll Number
        {
          rollNumber: {
            $regex: rollNumber ? rollNumber : ".*.",
            $options: "i",
          },
        },
        // gender
        {
          gender: {
            $regex: gender ? "^" + gender + "$" : ".*.",
            $options: "i",
          },
        },
        // {
        //   passingYear: passingYear,
        // },
        {
          personalPhoneNumber: {
            $regex: personalPhoneNumber
              ? personalPhoneNumber.toString()
              : ".*.",
            $options: "i",
          },
        },
        // address
        {
          "address.city": {
            $regex: city ? city : ".*.",
            $options: "i",
          },
        },
        {
          "address.state": {
            $regex: state ? state : ".*.",
            $options: "i",
          },
        },
        // results
        {
          "result.cpi": {
            $gte: minCPI ? minCPI : 0,
            $lte: maxCPI ? maxCPI : 10,
          },
        },
        {
          "result.twelfthPerc": {
            $gte: minTwelfthPerc ? minTwelfthPerc : 0,
            $lte: maxTwelfthPerc ? maxTwelfthPerc : 100,
          },
        },
        {
          "result.tenthPerc": {
            $gte: minTenthPerc ? minTenthPerc : 0,
            $lte: maxTenthPerc ? maxTenthPerc : 100,
          },
        },
        {
          "result.diplomaPerc": {
            $gte: minDiplomaPerc ? minDiplomaPerc : 0,
            $lte: maxDiplomaPerc ? maxDiplomaPerc : 100,
          },
        },
      ],
    },
    {
      _id: 1,
      firstName: 1,
      lastName: 1,
      middleName: 1,
      collegeEmail: 1,
      collegeId: 1,
      gender: 1,
    }
  );
  const elligibles = await Student.find(
    {
      $and: [
        { _id: { $in: role.elligibles } },
        {
          firstName: {
            $regex: firstName ? firstName : ".*.",
            $options: "i",
          },
        },
        {
          middleName: {
            $regex: middleName ? middleName : ".*.",
            $options: "i",
          },
        },
        {
          lastName: {
            $regex: lastName ? lastName : ".*.",
            $options: "i",
          },
        },
        // // collegeEmail
        {
          collegeEmail: {
            $regex: collegeEmail ? collegeEmail : ".*.",
            $options: "i",
          },
        },
        // // collegeId
        {
          collegeID: {
            $regex: collegeID ? collegeID : ".*.",
            $options: "i",
          },
        },
        // // roll Number
        {
          rollNumber: {
            $regex: rollNumber ? rollNumber : ".*.",
            $options: "i",
          },
        },
        // gender
        {
          gender: {
            $regex: gender ? "^" + gender + "$" : ".*.",
            $options: "i",
          },
        },
        // {
        //   passingYear: passingYear,
        // },
        {
          personalPhoneNumber: {
            $regex: personalPhoneNumber
              ? personalPhoneNumber.toString()
              : ".*.",
            $options: "i",
          },
        },
        // address
        {
          "address.city": {
            $regex: city ? city : ".*.",
            $options: "i",
          },
        },
        {
          "address.state": {
            $regex: state ? state : ".*.",
            $options: "i",
          },
        },
        // results
        {
          "result.cpi": {
            $gte: minCPI ? minCPI : 0,
            $lte: maxCPI ? maxCPI : 10,
          },
        },
        {
          "result.twelfthPerc": {
            $gte: minTwelfthPerc ? minTwelfthPerc : 0,
            $lte: maxTwelfthPerc ? maxTwelfthPerc : 100,
          },
        },
        {
          "result.tenthPerc": {
            $gte: minTenthPerc ? minTenthPerc : 0,
            $lte: maxTenthPerc ? maxTenthPerc : 100,
          },
        },
        {
          "result.diplomaPerc": {
            $gte: minDiplomaPerc ? minDiplomaPerc : 0,
            $lte: maxDiplomaPerc ? maxDiplomaPerc : 100,
          },
        },
      ],
    },
    {
      _id: 1,
      firstName: 1,
      lastName: 1,
      middleName: 1,
      collegeEmail: 1,
      collegeId: 1,
      gender: 1,
    }
  );

  data.applications = applications;
  data.elligibles = elligibles;

  return res.json({ success: true, data: data });
});

module.exports = router;
