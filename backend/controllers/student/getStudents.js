const Student = require("../../models/student/student.model");

const getStudent = async (req, res) => {
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
      // passing year
      {
        passingYear: passingYear ? { $eq: passingYear } : { $gte: 0 },
      },
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
};

module.exports = { getStudent };
