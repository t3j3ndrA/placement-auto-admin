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

router.get("/", async (req, res) => {
  const {
    name,
    website,
    email,
    id,
    stuId,
    roleName,
    avgPackage,
    type,
    mode,
    bonds,
    deadline,
    interviewMode,
    cpi,
    twelfthPerc,
    tenthPerc,
    diplomaPerc,
    expectedSkills,
    isActive,
    forBatch,
  } = req.query;

  // to find the companies with elligibilities
  if (id && stuId) {
    const comapny = await Company.findOne({ _id: id });
    let roles = comapny.roles.map((role) => {
      if (role?.elligibles.includes(stuId) && role) {
        return {
          ...role._doc,
          isElligible: true,
          hasApplied: role?.applications.includes(stuId),
        };
      } else {
        return { ...role._doc, isElligible: false };
      }
    });

    return res.json({ success: true, data: { ...comapny._doc, roles } });
  }

  if (id) {
    const comapny = await Company.findOne({ _id: id });
    return res.json({
      success: true,
      data: {
        ...comapny._doc,
      },
    });
  }

  // regex documentations -> https://www.mongodb.com/docs/manual/reference/operator/query/regex/
  // i - case insensitivity
  Company.find({
    $and: [
      {
        name: {
          $regex: name ? name : ".*.",
          $options: "i",
        },
      },
      {
        website: {
          $regex: website ? website : ".*.",
          $options: "i",
        },
      },
      {
        email: {
          $regex: email ? email : ".*.",
          $options: "i",
        },
      },
      {
        isActive: isActive ? isActive : { $in: [true, false] },
      },
      {
        forBatch: forBatch ? { $eq: forBatch } : { $gte: 0 },
      },
      {
        "roles.name": {
          $regex: roleName ? roleName : ".*.",
          $options: "i",
        },
      },
      {
        "roles.avgPackage": {
          $gte: avgPackage ? avgPackage : 0,
        },
      },
      {
        "roles.type": {
          $regex: type ? type : ".*.",
          $options: "i",
        },
      },
      {
        "roles.mode": {
          $regex: mode ? mode : ".*.",
          $options: "i",
        },
      },
      {
        "roles.bonds": {
          $gte: bonds ? bonds : 0,
        },
      },
      {
        "roles.interviewMode": {
          $regex: interviewMode ? interviewMode : ".*.",
          $options: "i",
        },
      },
      {
        "roles.requirements.cpi": {
          $gte: cpi ? cpi : 0,
        },
      },
      {
        "roles.requirements.twelfthPerc": {
          $gte: twelfthPerc ? twelfthPerc : 0,
        },
      },
      {
        "roles.requirements.tenthPerc": {
          $gte: tenthPerc ? tenthPerc : 0,
        },
      },
      {
        "roles.requirements.diplomaPerc": {
          $gte: diplomaPerc ? diplomaPerc : 0,
        },
      },
      // address filtring
      // {
      //   "roles.requirements.expectedSkills": {
      //     $regex: expectedSkills ? expectedSkills : ".*.",
      //     $options: "i",
      //   },
      // },
    ],
  })
    .then((foundCompanies) => {
      return res.json({ success: true, data: foundCompanies });
    })
    .catch((error) => {
      return res.json({ success: false, error });
    });
});

router.get("/of/:studentId", async (req, res) => {
  const { studentId } = req.params;
  const student = await Student.findOne({ _id: studentId });
  if (!student) return res.json({ success: false, msg: "No student found" });

  const companies = await Company.find({ forBatch: student.passingYear });
  let resCompanies = [];
  companies.forEach((c) => {
    let roles = c.roles.map((role) => {
      console.log("role... > ", { ...role });
      if (role?.elligibles.includes(studentId)) {
        return { ...role._doc, isElligible: true };
      } else {
        return { ...role._doc, isElligible: false };
      }
    });
    if (roles) {
      resCompanies.push({ ...c._doc, roles });
    }
  });

  return res.json({ success: true, data: resCompanies });
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

// get company & role detail using rid & cid
router.get("/:companyId/role/:roleId/basic", async (req, res) => {
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
});

// get applications & elligibles students
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
      collegeID: 1,
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
      collegeID: 1,
      gender: 1,
    }
  );

  data.applications = applications;
  data.elligibles = elligibles;

  return res.json({ success: true, data: data });
});

router.put("/notify", async (req, res) => {
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
});

module.exports = router;
