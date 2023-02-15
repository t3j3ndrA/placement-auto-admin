const router = require("express").Router();
const Student = require("../../models/student/student.model");
const generator = require("generate-password");
const {
  NO_EMAIL,
  NO_UID,
  DUPLICATE_STUDENT,
} = require("../../constants/constantsMessages");

router.get("/", (req, res) => {
  const {
    id,
    collegeEmail,
    collegeID,
    firstName,
    lastName,
    middleName,
    minCPI,
    maxCPI,
    gender,
    rollNumber,
    passingYear,
    city,
    cpPlatforms,
    cpStars,
    cpRatings,
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
      {
        collegeEmail: {
          $regex: collegeEmail ? collegeEmail : ".*.",
          $options: "i",
        },
      },
      {
        collegeID: {
          $regex: collegeID ? collegeID : ".*.",
          $options: "i",
        },
      },
      {
        rollNumber: {
          $regex: rollNumber ? rollNumber : ".*.",
          $options: "i",
        },
      },
      {
        gender: {
          $regex: gender ? "^" + gender + "$" : ".*.",
          $options: "i",
        },
      },
      {
        "address.city": {
          $regex: city ? city : ".*.",
          $options: "i",
        },
      },
      {
        "result.cpi": {
          $gte: minCPI ? minCPI : 0,
          $lte: maxCPI ? maxCPI : 10,
        },
      },
      // {
      //   competitiveCoding: { $in: { platforms: cpPlatforms } },
      // },
      // {
      //   "competitiveCoding.stars": { $gte: cpStars },
      // },
      // {
      //   "competitiveCoding.ratings": { $gte: cpRatings },
      // },
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
  const { collegeEmail } = req.body;

  if (!collegeEmail) return res.json({ success: false, msg: NO_EMAIL });

  const studentFound = await Student.findOne({ collegeEmail: collegeEmail });

  if (studentFound) {
    return res.json({ success: false, msg: DUPLICATE_STUDENT });
  }

  const password = generator.generate({
    length: 8,
  });

  const tempStudent = new Student({ collegeEmail, password });
  tempStudent
    .save()
    .then((savedStudent) => res.json({ success: true, data: savedStudent }))
    .catch((error) => res.json({ success: false, error: error }));
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

module.exports = router;
