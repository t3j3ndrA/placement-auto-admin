const Student = require("../../models/student/student.model");
const { sendVerificationEmail } = require("../../utils/sendVerificationEmail");
const generator = require("generate-password");
const {
  INVALID_REQUEST_DATA_CODE,
  INVALID_REQUEST_DATA,
  INTERNAL_SERVER_ERROR_CODE,
  INTERNAL_SERVER_ERROR,
} = require("../../constants/constantsMessages");

const registerNewStudentWithEmail = async (req, res) => {
  const { collegeEmails } = req.body;

  if (!collegeEmails) {
    return res
      .status(INVALID_REQUEST_DATA_CODE)
      .json({ success: false, msg: INVALID_REQUEST_DATA });
  }

  let students = [];
  let alreadyRegistered = [];
  let incorrectEmails = [];
  let successfullyRegistered = [];

  for (let i = 0; i < collegeEmails.length; ++i) {
    try {
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
            address: {},
            result: {},
            placementStatus: {},
            internshipStatus: {},
          })
        );
        try {
          sendVerificationEmail(collegeEmails[i], password);
          successfullyRegistered.push(collegeEmails[i]);
        } catch (err) {
          incorrectEmails.push(collegeEmails[i]);
        }
      } else {
        alreadyRegistered.push(foundStudent.collegeEmail);
      }
    } catch (err) {
      console.log("/new >> ", err);
      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .json({ success: false, msg: INTERNAL_SERVER_ERROR, err });
    }
  }

  try {
    const savedStudents = await Student.bulkSave(students);
    return res.json({
      success: true,
      data: { alreadyRegistered, successfullyRegistered, incorrectEmails },
    });
  } catch (err) {
    console.log("/new >> ", err);
    return res
      .status(INTERNAL_SERVER_ERROR_CODE)
      .json({ success: false, msg: INTERNAL_SERVER_ERROR, err });
  }
};

module.exports = { registerNewStudentWithEmail };
