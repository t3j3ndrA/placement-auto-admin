const Student = require("../../models/student/student.model");
const Company = require("../../models/company/company.model");
const reader = require("xlsx");
const excel = require("exceljs");
const moment = require("moment");
const flat = require("flat");
const path = require("path");

const downloadPlacedStudentReport = async (req, res) => {
  const { companyId } = req.params;
  const company = await Company.findOne({ _id: companyId });

  let excdata = [];
  let srNo = 1;

  for (let i = 0; i < company.roles.length; ++i) {
    const placedIDs = company.roles[i].placed;

    const students = await Student.find({
      _id: { $in: placedIDs },
    }).sort({ rollNumber: "asc" });

    let roleExcData = students.map((s) => {
      return {
        "Sr. No": srNo++,
        "Roll No": s.rollNumber?.toUpperCase(),
        "Student ID": s.collegeID?.toUpperCase(),
        Name: s?.firstName + " " + s?.middleName + " " + s?.lastName,
        Gender: s.gender,
        "SSC Result in Percentage (%)": s.result.tenthPerc,
        "SSC Board": s.result.tenthBoardType,
        "HSC Result in Percentage (%)": s.result.twelfthPerc,
        "HSC Board": s.result.twelfthBoardType,
        "Diploma Result in Percentage (%)": s.result.diplomaPerc,
        "Sem 1 (SPI)": s.result.sem1,
        "Sem 2 (SPI)": s.result.sem2,
        "Sem 3 (SPI)": s.result.sem3,
        "Sem 4 (SPI)": s.result.sem4,
        "Sem 5 (SPI)": s.result.sem5,
        "Sem 6 (SPI)": s.result.sem6,
        "Sem 7 (SPI)": s.result.sem7,
        "Sem 8 (SPI)": s.result.sem8,
        CPI: s.result.cpi,
        DOB: moment(s.dateOfBirth).calendar(),
        "College Email": s.collegeEmail,
        "Personal Email": s.personalEmail,
        "Personal Phone": s.personalPhoneNumber,
        City: s.address.city,
        "Placed role": company.roles[i].name,
        "Package" : s.placementStatus.package
      };
    });

    excdata = excdata.concat(roleExcData);
  }

  try {
    let workBook = reader.utils.book_new();

    let title = [["Dharamsinh Desai University"]];
    const workSheet = reader.utils.aoa_to_sheet([[]]);

    reader.utils.sheet_add_aoa(workSheet, title, {
      origin: "E1",
    });

    reader.utils.sheet_add_aoa(workSheet, [[company.name]], {
      origin: "E2",
    });
    reader.utils.sheet_add_aoa(workSheet, [["Batch : " + company.forBatch]], {
      origin: "E3",
    });

    reader.utils.sheet_add_aoa(workSheet, [["Branch : " + "IT"]], {
      origin: "G3",
    });

    reader.utils.sheet_add_json(workSheet, excdata, {
      origin: "A5",
      cellStyles: {},
    });
    // const workSheet = reader.utils.json_to_sheet(excdata);
    reader.utils.book_append_sheet(workBook, workSheet);
    let exportFileName = `${__dirname}/placed-students.xls`;

    reader.writeFile(workBook, exportFileName);

    return res.sendFile(path.join(__dirname, `placed-students.xls`));
  } catch (error) {
    console.log("error >> ", error);
    return res.json({ success: false, msg: error });
  }
};

module.exports = { downloadPlacedStudentReport };
