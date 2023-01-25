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
    email,
    studentId,
    firstName,
    lastName,
    middleName,
    minCPI,
    maxCPI,
    gender,
    rollNumber,
    placementStatus,
    passingYear,
    branch,
    city,
  } = req.query;

  console.log("passing year : " + passingYear);

  // regex documentations -> https://www.mongodb.com/docs/manual/reference/operator/query/regex/
  // i - case insensitivity
  Student.find({
    $and: [
      {
        firstName: {
          $regex: firstName ? ".*" + firstName + "*." : ".*.",
          $options: "i",
        },
      },
      {
        middleName: {
          $regex: middleName ? ".*" + middleName + "*." : ".*.",
          $options: "i",
        },
      },
      {
        lastName: {
          $regex: lastName ? ".*" + lastName + "*." : ".*.",
          $options: "i",
        },
      },
      {
        email: {
          $regex: email ? ".*" + email + "*." : ".*.",
          $options: "i",
        },
      },
      {
        studentId: {
          $regex: studentId ? ".*" + studentId + "*." : ".*.",
          $options: "i",
        },
      },
      {
        rollNumber: {
          $regex: rollNumber ? ".*" + rollNumber + ".*" : ".*.",
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
        city: {
          $regex: city ? ".*" + city + "*." : ".*.",
          $options: "i",
        },
      },
      {
        CPI: {
          $gte: minCPI ? minCPI : 0,
          $lte: maxCPI ? maxCPI : 10,
        },
      },
      {
        branch: {
          $regex: branch ? branch : ".*.",
          $options: "i",
        },
      },
      {
        passingYear: {
          $regex: passingYear ? passingYear.toString() : ".*.",
        },
      },
      {
        placementStatus: {
          $regex: placementStatus ? ".*" + placementStatus + "*." : ".*.",
          $options: "i",
        },
      },
    ],
  })
    .then((foundStudent) => {
      return res.json({ success: true, data: foundStudent });
    })
    .catch((error) => {
      return res.json({ success: false, error });
    });
});

// register new student with email
router.post("/", async (req, res) => {
  const { email } = req.body;

  if (!email) return res.json({ success: false, msg: NO_EMAIL });

  const studentFound = await Student.findOne({ email: email });

  if (studentFound) {
    return res.json({ success: false, msg: DUPLICATE_STUDENT });
  }

  const password = generator.generate({
    length: 10,
    lowercase: true,
    uppercase: true,
    symbols: true,
    numbers: true,
    strict: true,
  });

  const tempStudent = new Student({ email, password });

  if (email) {
    tempStudent
      .save()
      .then((savedStudent) => res.json({ success: true, data: savedStudent }))
      .catch((error) => res.json({ success: false, error: error }));
  }
});

// update the existing user
router.put("/", (req, res) => {
  const {
    rollNumber,
    studentId,
    firstName,
    middleName,
    lastName,
    gender,
    trainingCompanyStatus,
    salary,
    SSCInPercentage,
    SSCBoard,
    HSCInPercentage,
    HSCBoard,
    diplomaInPercentage,
    sem1SPI,
    sem2SPI,
    sem3SPI,
    sem4SPI,
    sem5SPI,
    sem6SP,
    sem7SPI,
    sem8SPI,
    averageSPI,
    CPI,
    branch,
    placementStatus,
    passingYear,
    dateOfBirth,
    email,
    studentPhoneNumber,
    parentPhoneNumber,
    address1,
    address2,
    address3,
    city,
    pincode,
    isRegistrationPending,
  } = req.body;

  if (!email) return res.json({ success: false, msg: NO_EMAIL });

  Student.findOneAndUpdate(
    { email },
    {
      rollNumber,
      studentId,
      firstName,
      middleName,
      lastName,
      gender,
      trainingCompanyStatus,
      salary,
      SSCInPercentage,
      SSCBoard,
      HSCInPercentage,
      HSCBoard,
      diplomaInPercentage,
      sem1SPI,
      sem2SPI,
      sem3SPI,
      sem4SPI,
      sem5SPI,
      sem6SP,
      sem7SPI,
      sem8SPI,
      averageSPI,
      CPI,
      branch,
      placementStatus,
      dateOfBirth,
      studentPhoneNumber,
      parentPhoneNumber,
      address1,
      address2,
      address3,
      city,
      pincode,
      isRegistrationPending,
      passingYear,
    },
    { new: true, upsert: true }
  )
    .then((updatedStudent) => res.json({ success: true, data: updatedStudent }))
    .catch((error) => res.json({ success: false, error }));
});

module.exports = router;
