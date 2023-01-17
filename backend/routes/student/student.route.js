const router = require("express").Router();
const Student = require("../../models/student/student.model");
const generator = require("generate-password");
const {
  NO_EMAIL,
  NO_UID,
  DUPLICATE_STUDENT,
} = require("../../constants/constantsMessages");

router.get("/:id", (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.json({ success: false, msg: NO_UID });
  }

  Student.findOne({ _id: id })
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
    averageCPI,
    dateOfBirth,
    email,
    studentPhoneNumber,
    parentPhoneNumber,
    address1,
    address2,
    address3,
    city,
    pincode,
    registrationStatus,
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
      averageCPI,
      dateOfBirth,
      studentPhoneNumber,
      parentPhoneNumber,
      address1,
      address2,
      address3,
      city,
      pincode,
      registrationStatus,
    },
    { new: true }
  )
    .then((updatedStudent) => res.json({ success: true, data: updatedStudent }))
    .catch((error) => res.json({ success: false, error }));
});

module.exports = router;
