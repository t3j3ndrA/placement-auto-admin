const { default: mongoose } = require("mongoose");
const {
  INTERNAL_SERVER_ERROR_CODE,
  INTERNAL_SERVER_ERROR,
  INVALID_REQUEST_DATA,
  INVALID_REQUEST_DATA_CODE,
} = require("../../constants/constantsMessages");

const Company = require("../../models/company/company.model");
const Student = require("../../models/student/student.model");

const getApplicationsAndElligibles = async (req, res) => {
  const { companyId, roleId } = req.params;
  if (
    !mongoose.isValidObjectId(companyId) ||
    !mongoose.isValidObjectId(roleId)
  ) {
    return res
      .status(INVALID_REQUEST_DATA_CODE)
      .json({ success: false, msg: INVALID_REQUEST_DATA });
  }

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

  if (!company || !company.roles) {
    return res
      .status(INVALID_REQUEST_DATA_CODE)
      .json({ success: false, msg: INVALID_REQUEST_DATA });
  }

  const role = company.roles[0];

  let data = {
    name: company.name,
    role: role,
    applications: [],
    elligibles: [],
  };

  try {
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
  } catch (err) {
    return res
      .status(INTERNAL_SERVER_ERROR_CODE)
      .json({ success: false, msg: INTERNAL_SERVER_ERROR });
  }
};

module.exports = { getApplicationsAndElligibles };
