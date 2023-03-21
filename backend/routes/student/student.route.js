const router = require("express").Router();
const Student = require("../../models/student/student.model");
const Company = require("../../models/company/company.model");
const generator = require("generate-password");
const {
  NO_EMAIL,
  NO_UID,
  DUPLICATE_STUDENT,
} = require("../../constants/constantsMessages");
const verifyAdmin = require("../../middleware/verifyAdmin");
const { sendVerificationEmail } = require("../../utils/sendVerificationEmail");

router.get("/", (req, res) => {
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

  if (id) {
    console.log("id found");
    Student.findOne({ _id: id })
      .then((foundStudent) => {
        return res.json({ success: true, data: foundStudent });
      })
      .catch((error) => {
        return res.json({ success: false, error });
      });
    return;
  }

  // regex documentations -> https://www.mongodb.com/docs/manual/reference/operator/query/regex/
  // i - case insensitivity
  Student.find({
    $and: [
      // name
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
          $regex: personalPhoneNumber ? personalPhoneNumber.toString() : ".*.",
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
  })
    .then((foundStudents) => {
      return res.json({ success: true, data: foundStudents });
    })
    .catch((error) => {
      return res.json({ success: false, error });
    });
});

// register new student with email
router.post("/new", async (req, res) => {
  const { collegeEmails } = req.body;

  let students = [];
  for (let i = 0; i < collegeEmails.length; ++i) {
    const foundStudent = await Student.findOne({
      collegeEmail: collegeEmails[i],
    });
    if (!foundStudent) {
      const password = generator.generate({
        length: 8,
        lowercase: true,
        uppercase: true,
        numbers: true,
      });

      students.push(
        new Student({
          collegeEmail: collegeEmails[i],
          password,
        })
      );
      sendVerificationEmail(collegeEmails[i], password);
    }
  }
  const savedStudents = await Student.bulkSave(students);
  return res.json({ success: true, data: savedStudents });
});

// update the existing user
router.put("/update", (req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    gender,
    dateOfBirth,
    collegeID,
    rollNumber,
    branch,
    passingYear,
    collegeEmail,
    personalEmail,
    personalPhoneNumber,
    parentsPhoneNumber,
    password,
    result,
    competitiveCoding,
    address,
    placementStatus,
    internshipStatus,
    appliedTo,
  } = req.body;

  if (!collegeEmail) return res.json({ success: false, msg: NO_EMAIL });

  Student.findOneAndUpdate(
    { collegeEmail },
    {
      firstName,
      middleName,
      lastName,
      gender,
      dateOfBirth,
      collegeID,
      rollNumber,
      branch,
      passingYear,
      personalEmail,
      personalPhoneNumber,
      parentsPhoneNumber,
      password,
      result,
      competitiveCoding,
      address,
      placementStatus,
      internshipStatus,
      appliedTo,
    },
    { new: true, upsert: true }
  )
    .then((updatedStudent) => res.json({ success: true, data: updatedStudent }))
    .catch((error) => res.json({ success: false, error }));
});

// get student's applications with roles
router.get("/:stuId/applications", async (req, res) => {
  const { stuId } = req.params;
  const student = await Student.findOne({ _id: stuId });

  if (!student) return res.json({ success: false, msg: "Invalid students" });

  const companies = await Company.find({ forBatch: student.passingYear });

  // const comapny = await Company.findOne({ _id: id });
  let result = [];

  companies.forEach((company) => {
    let roles = company.roles.filter((role) => {
      return role?.applications?.includes(stuId);
    });
    if (roles.length > 0) {
      result.push({ ...company._doc, roles });
    }
  });

  return res.json({ success: true, data: result });
});
module.exports = router;
