const router = require("express").Router();
const Company = require("../../models/company/company.model");
const Student = require("../../models/student/student.model");

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

const setStudentsElligibility = async (roles, forBatch) => {
  let allStudents = await Student.find({ passingYear: { $eq: forBatch } });
  roles?.forEach((role, index) => {
    let students = new Map();
    allStudents?.forEach((student) => {
      if (
        student.result.cpi >= (role.requirements?.cpi || 0) &&
        ((student.result.twelfthPerc != 0 &&
          student.result.twelfthPerc >=
            (role.requirements?.twelfthPerc || 0)) ||
          (student.result.diplomaPerc != 0 &&
            student.result.diplomaPerc >=
              (role.requirements?.diplomaPerc || 0))) &&
        student.result.tenthPerc >= (role.requirements?.tenthPerc || 0)
      ) {
        let isSatisfies = true;
        role.requirements?.competitiveCoding?.forEach((reqItem, index) => {
          let isSubSatisfies = false;
          student?.competitiveCoding?.forEach((stuItem) => {
            if (
              reqItem.platform === stuItem.platform &&
              (stuItem.stars >= reqItem.stars ||
                stuItem.ratings >= reqItem.ratings)
            ) {
              isSubSatisfies = true;
            }
          });
          isSatisfies = isSatisfies && isSubSatisfies;
        });
        if (isSatisfies) students.set(student._id, { isElligible: true });
        else students.set(student._id, { isElligible: false });
      } else {
        students.set(student._id, { isElligible: false });
      }
    });

    roles[index].students = students;
  });
};

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

module.exports = router;
