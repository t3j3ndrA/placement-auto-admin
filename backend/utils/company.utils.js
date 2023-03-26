const companyModel = require("../models/company/company.model");
const studentModel = require("../models/student/student.model");

const setStudentsElligibility = async (roles, forBatch) => {
  let allStudents = await studentModel.find({ passingYear: { $eq: forBatch } });

  roles?.forEach((role, index) => {
    let students = new Map();
    allStudents?.forEach((student) => {
      if (
        student.placementStatus.selected === "no" &&
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
              reqItem.platform.toLowerCase() ===
                stuItem.platform.toLowerCase() &&
              stuItem.stars >= reqItem.stars &&
              stuItem.ratings >= reqItem.ratings
            ) {
              isSubSatisfies = true;
            }
          });
          isSatisfies = isSatisfies && isSubSatisfies;
        });
        if (isSatisfies) students.set(student._id, { isElligible: true });
        // else students.set(student._id, { isElligible: false });
      }
      // else {
      //   students.set(student._id, { isElligible: false });
      // }
    });
    // prepare list out of HashMap
    let stuList = [];
    students.forEach((val, key) => {
      stuList.push(key);
    });
    // console.log("stuList : ", stuList);
    roles[index].elligibles = stuList;
    roles[index].applications = [];
  });
};

const isElligible = async (companyId, roleId, stuId) => {
  const company = await companyModel.findOne({
    _id: companyId,
    "roles._id": roleId,
  });
  let check = false;
  company.roles.forEach((role) => {
    if (role._id == roleId) {
      role.elligibles.forEach((elliId) => {
        // console.log("elliId = ", elliId);
        // console.log("elliId == stuId", elliId == stuId);
        if (elliId == stuId) check = true;
      });
    }
  });

  return check;
};

module.exports = { isElligible, setStudentsElligibility };
