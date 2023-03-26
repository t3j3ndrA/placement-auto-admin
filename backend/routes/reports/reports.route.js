const router = require("express").Router();
const Student = require("../../models/student/student.model");
const Company = require("../../models/company/company.model");
const reader = require("xlsx");
const excel = require("exceljs");
const moment = require("moment");
const flat = require("flat");
const path = require("path");

router.get("/placed-ratio", async (req, res) => {
  const { year, limit } = req.query;
  const malePlaced = await Student.find({
    "placementStatus.selected": "yes",
    gender: "male",
    passingYear: year,
  });

  const maleNotPlaced = await Student.find({
    "placementStatus.selected": "no",
    gender: "male",
    passingYear: year,
  });

  const femalePlaced = await Student.find({
    "placementStatus.selected": "yes",
    gender: "female",
    passingYear: year,
  });

  const femaleNotPlaced = await Student.find({
    "placementStatus.selected": "no",
    gender: "female",
    passingYear: year,
  });

  return res.json({
    success: true,
    data: {
      malePlaced: malePlaced.length,
      maleNotPlaced: maleNotPlaced.length,
      femalePlaced: femalePlaced.length,
      femaleNotPlaced: femaleNotPlaced.length,
      totalPlaced: malePlaced.length + femalePlaced.length,
      totalNotPlaced: maleNotPlaced.length + femaleNotPlaced.length,
    },
  });
});

router.get("/placed", async (req, res) => {
  const { year, limit } = req.query;
  const students = await Student.find({
    "placementStatus.selected": "yes",
    passingYear: year,
  })
    .sort({ "placementStatus.package": "desc" })
    .limit(limit || 10);
  return res.json({ success: true, data: students });
});

router.get("/yearly-placed", async (req, res) => {
  const { year, limit } = req.query;

  const students = await Student.find({
    "placementStatus.selected": "yes",
    passingYear: year,
  })
    .sort({ rollNumber: "asc" })
    .limit(limit || 2000);

  return res.json({ success: true, data: students });
});

router.get("/yearly-not-placed", async (req, res) => {
  const { year, limit } = req.query;

  const students = await Student.find({
    "placementStatus.selected": "no",
    passingYear: year,
  })
    .sort({ rollNumber: "asc" })
    .limit(limit || 2000);
  return res.json({ success: true, data: students });
});

router.get("/yearly/download", async (req, res) => {
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
});

router.get("/comparision", async (req, res) => {
  let yearWise = [];
  const { minYear, maxYear } = req.query;
  const INF = 1000000000;

  for (let i = minYear; i <= maxYear; ++i) {
    const studentsOfYear = await Student.find({ passingYear: i });
    let placedCount = 0,
      totalPackage = 0,
      minPackage = INF,
      maxPackage = 0;

    studentsOfYear.forEach((s) => {
      if (s?.placementStatus?.selected == "yes") {
        placedCount++;
        totalPackage += s.placementStatus.package;
        minPackage = Math.min(minPackage, s.placementStatus.package);
        maxPackage = Math.max(maxPackage, s.placementStatus.package);
      }
    });

    yearWise.push({
      name: "" + i,
      "Min Package": minPackage === INF ? 0 : minPackage,
      "Max Package": maxPackage,
      "Avg Package": totalPackage / placedCount || 0,
    });
  }

  return res.json({ success: true, data: yearWise });
});

module.exports = router;
