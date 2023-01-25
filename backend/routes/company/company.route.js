const router = require("express").Router();
const Company = require("../../models/company/company.model");

const {
  NO_EMAIL,
  NO_UID,
  DUPLICATE_STUDENT,
} = require("../../constants/constantsMessages");

router.get("/", (req, res) => {
  const {
    name,
    email,
    minPackageInLPA,
    maxPackageInLPA,
    minAvgSPIReq,
    minCPIReq,
    jobMode,
    forBranch,
    city,
  } = req.query;
  console.log(req.query);
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
      // {
      //   city: {
      //     $regex: city ? ".*" + city + "*." : ".*.",
      //     $options: "i",
      //   },
      // },
      // {
      //   minCPIReq: {
      //     $gte: minCPIReq ? minCPIReq : 0,
      //   },
      // },
      // {
      //   minAvgSPIReq: {
      //     $gte: minAvgSPIReq ? minAvgSPIReq : 0,
      //   },
      // },
      {
        packageInLPA: {
          $gte: minPackageInLPA ? minPackageInLPA : 0,
          $lte: maxPackageInLPA ? maxPackageInLPA : Number.MAX_VALUE,
        },
      },
      {
        forBranch: {
          $regex: forBranch ? forBranch : ".*.",
          $options: "i",
        },
      },
      {
        jobMode: {
          $regex: jobMode ? "^" + jobMode + "$" : ".*.",
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

// register new student with email
router.post("/", async (req, res) => {
  const {
    name,
    description,
    website,
    email,
    packageInLPA,
    openPositions,
    expectedSkills,
    minCPIReq,
    minAvgSPIReq,
    jobLocation,
    jobMode,
    bondInYears,
    forBranch,
    forBatches,
    tentetiveInterviewDate,
    officeAddress,
    city,
  } = req.body;

  const tempCompany = new Company({
    name,
    description,
    website,
    email,
    packageInLPA,
    openPositions,
    expectedSkills,
    minCPIReq,
    minAvgSPIReq,
    jobLocation,
    jobMode,
    bondInYears,
    forBranch,
    forBatches,
    tentetiveInterviewDate,
    officeAddress,
    city,
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
router.put("/:id", (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.json({ success: false, msg: "Company Id param is empty" });
  }

  const {
    name,
    description,
    website,
    email,
    packageInLPA,
    openPositions,
    expectedSkills,
    minCPIReq,
    minAvgSPIReq,
    jobLocation,
    jobMode,
    bondInYears,
    forBranch,
    forBatches,
    tentetiveInterviewDate,
    officeAddress,
    city,
  } = req.body;

  Company.findOneAndUpdate(
    { _id: id },
    {
      name,
      description,
      website,
      email,
      packageInLPA,
      openPositions,
      expectedSkills,
      minCPIReq,
      minAvgSPIReq,
      jobLocation,
      jobMode,
      bondInYears,
      forBranch,
      forBatches,
      tentetiveInterviewDate,
      officeAddress,
      city,
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

module.exports = router;
