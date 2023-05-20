const Student = require("../../models/student/student.model");
const Company = require("../../models/company/company.model");
const { default: mongoose } = require("mongoose");
const {
  INVALID_REQUEST_DATA_CODE,
  INVALID_REQUEST_DATA,
} = require("../../constants/constantsMessages");

const updateStudentDetails = async (req, res) => {
  const {
    _id: stuId,
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
    technicalSkills,
    hobbies,
    competitiveCoding,
    address,
    placementStatus,
    internshipStatus,
  } = req.body;

  if (!collegeEmail)
    return res
      .status(INVALID_REQUEST_DATA_CODE)
      .json({ success: false, msg: INVALID_REQUEST_DATA });

  try {
    const allCompanies = await Company.find({ forBatch: passingYear });

    if (allCompanies) {
      const allPromises = allCompanies.map((company) => {
        if (company.roles) {
          return company.roles.map((role) => {
            if (
              placementStatus.selected === "no" &&
              result.cpi >= (role.requirements?.cpi || 0) &&
              ((result.twelfthPerc != 0 &&
                result.twelfthPerc >= (role.requirements?.twelfthPerc || 0)) ||
                (result.diplomaPerc != 0 &&
                  result.diplomaPerc >=
                    (role.requirements?.diplomaPerc || 0))) &&
              result.tenthPerc >= (role.requirements?.tenthPerc || 0)
            ) {
              let isSatisfies = true;
              role.requirements?.competitiveCoding?.map((reqItem, index) => {
                let isSubSatisfies = false;
                competitiveCoding?.forEach((stuItem) => {
                  if (
                    reqItem?.platform.toLowerCase().trim() ===
                      stuItem?.platform.toLowerCase().trim() &&
                    stuItem.stars >= reqItem.stars &&
                    stuItem.ratings >= reqItem.ratings
                  ) {
                    isSubSatisfies = true;
                  }
                });
                isSatisfies = isSatisfies && isSubSatisfies;
              });
              if (isSatisfies) {
                return Company.findOneAndUpdate(
                  {
                    _id: company._id,
                    "roles._id": role._id,
                  },
                  {
                    $addToSet: {
                      "roles.$.elligibles": stuId,
                    },
                  },
                  {
                    new: true,
                  }
                ).then((updatedCompany) => {
                  // console.log("updatedCompany >>", updatedCompany);
                });
              } else {
                return Company.findOneAndUpdate(
                  {
                    _id: company._id,
                    "roles._id": role._id,
                  },
                  {
                    $pull: {
                      "roles.$.elligibles": stuId,
                    },
                  },
                  {
                    new: true,
                  }
                ).then((updatedCompany) => {
                  // console.log("del-updatedCompany >>", updatedCompany);
                });
              }
            } else {
              return Company.findOneAndUpdate(
                {
                  _id: company._id,
                  "roles._id": role._id,
                },
                {
                  $pull: {
                    "roles.$.elligibles": stuId,
                  },
                },
                {
                  new: true,
                }
              ).then((updatedCompany) => {
                // console.log("del-updatedCompany >>", updatedCompany);
              });
            }
          });
        }
      });
      Promise.all(allPromises)
        .then((response) => {})
        .catch((err) => {
          console.log("promise err >> .", err);
        });
    }
  } catch (err) {
    console.log("Err in checking elligibility >>", err);
  }
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
      technicalSkills,
      hobbies,
      competitiveCoding,
      address,
      placementStatus,
      internshipStatus,
      isVerified: true,
    },
    { new: true }
  )
    .then((updatedStudent) => res.json({ success: true, data: updatedStudent }))
    .catch((err) => {
      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .json({ success: false, msg: INTERNAL_SERVER_ERROR, err });
    });
};

module.exports = { updateStudentDetails };
