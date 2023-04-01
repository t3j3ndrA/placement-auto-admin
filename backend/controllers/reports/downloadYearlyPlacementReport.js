const Student = require("../../models/student/student.model");
const Company = require("../../models/company/company.model");
const reader = require("xlsx");
const excel = require("exceljs");
const moment = require("moment");
const flat = require("flat");
const path = require("path");

const downloadYearlyPlacementReports = async (req, res) => {
  const { year, limit } = req.query;
  const students = await Student.find({
    passingYear: year,
  }).sort({ rollNumber: "asc" });

  const excdata = students.map((s) => {
    return {
      "First Name": s.firstName,
      "Last Name": s.lastName,
      Gender: s.gender,
      DOB: moment(s.dateOfBirth).calendar(),
      "College ID": s.collegeID?.toUpperCase(),
      "Roll No.": s.rollNumber?.toUpperCase(),
      "College Email": s.collegeEmail,
      "Personal Email": s.personalEmail,
      "Personal Phone": s.personalPhoneNumber,
      "Parent's Phone": s.parentsPhoneNumber,
      "Sem-1": s.result.sem1,
      "Sem-2": s.result.sem2,
      "Sem-3": s.result.sem3,
      "Sem-4": s.result.sem4,
      "Sem-5": s.result.sem5,
      "Sem-6": s.result.sem6,
      "Sem-7": s.result.sem7,
      "Sem-8": s.result.sem8,
      CPI: s.result.cpi,
      "12th %": s.result.twelfthPerc,
      "10th %": s.result.tenthPerc,
      "Diploma %": s.result.diplomaPerc,
      "Placement Selected": s.placementStatus.selected?.toUpperCase(),
      "Placement Company": s.placementStatus.companyName,
      "Job Duration (in months)": s.placementStatus.duration,
      Package: s.placementStatus.package,
      "Joining Date": moment(s.placementStatus.joiningDate).calendar(),
      "Job Mode": s.placementStatus.mode?.toUpperCase(),
      "Internship Selected": s.internshipStatus.selected?.toUpperCase(),
      "Internship Company": s.internshipStatus.company,
      "Internship Duration (in months)": s.internshipStatus.duration,
      "Internship Stipend": s.internshipStatus.stipend,
      "Internship Joining Date": s.internshipStatus.joiningDate,
      "Internship Mode": s.internshipStatus.mode?.toUpperCase(),
    };
  });

  try {
    let workBook = reader.utils.book_new();
    let title = [["Dharamsinh Desai University"]];
    const workSheet = reader.utils.aoa_to_sheet([[]]);

    reader.utils.sheet_add_aoa(workSheet, title, {
      origin: "E1",
    });

    reader.utils.sheet_add_aoa(workSheet, [["Placements Reports"]], {
      origin: "E2",
    });
    reader.utils.sheet_add_aoa(workSheet, [["Year : " + year]], {
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
    let exportFileName = `${__dirname}/Placement-Report-${year || "all"}.xls`;

    reader.writeFile(workBook, exportFileName);

    return res.sendFile(
      path.join(__dirname, `Placement-Report-${year || "all"}.xls`)
    );
  } catch (error) {
    console.log("error >> ", error);
    return res.json({ success: false, msg: error });
  }
};

module.exports = { downloadYearlyPlacementReports };
