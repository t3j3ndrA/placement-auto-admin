const { default: mongoose, mongo } = require("mongoose");
const {
  INTERNAL_SERVER_ERROR_CODE,
  INTERNAL_SERVER_ERROR,
  INVALID_REQUEST_DATA_CODE,
  INVALID_REQUEST_DATA,
} = require("../../constants/constantsMessages");
const Company = require("../../models/company/company.model");
const Student = require("../../models/student/student.model");

const getCompany = async (req, res) => {
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
    if (!mongoose.isValidObjectId(id) || !mongoose.isValidObjectId(stuId)) {
      return res
        .status(INVALID_REQUEST_DATA_CODE)
        .json({ success: false, msg: INVALID_REQUEST_DATA });
    }

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
    if (!mongoose.isValidObjectId(id)) {
      return res
        .status(INVALID_REQUEST_DATA_CODE)
        .json({ success: false, msg: INVALID_REQUEST_DATA });
    }

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
    ],
  })
    .then((foundCompanies) => {
      return res.json({ success: true, data: foundCompanies });
    })
    .catch((error) => {
      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .json({ success: false, msg: INTERNAL_SERVER_ERROR, err });
    });
};

module.exports = { getCompany };
