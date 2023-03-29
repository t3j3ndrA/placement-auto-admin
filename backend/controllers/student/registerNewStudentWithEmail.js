const Student = require("../../models/student/student.model");
const { sendVerificationEmail } = require("../../utils/sendVerificationEmail");

const registerNewStudentWithEmail = async (req, res) => {
  const { collegeEmails } = req.body;

  if (!collegeEmails) {
    return res
      .status(400)
      .json({ success: false, msg: "No emails were provided" });
  }

  let students = [];
  let alreadyRegistered = [];

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
          })
        );

        sendVerificationEmail(collegeEmails[i], password);
      } else {
        alreadyRegistered.push(foundStudent.collegeEmail);
      }
    } catch (err) {
      console.log("/new >> ", err);
      return res
        .status(500)
        .json({ success: false, msg: "DB searching error." });
    }
  }

  try {
    const savedStudents = await Student.bulkSave(students);
    return res.json({ success: true, data: alreadyRegistered });
  } catch (err) {
    console.log("/new >> ", err);
    return res
      .status(500)
      .json({ success: false, msg: "Could not save students" });
  }
};

module.exports = { registerNewStudentWithEmail };
