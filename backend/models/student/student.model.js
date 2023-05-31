const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema({
  // personal information
  profilePic: {
    type: String,
    default: "https://cdn.onlinewebfonts.com/svg/img_516635.png",
  },
  resume: {
    type: String,
  },
  firstName: { type: String, default: "" },
  middleName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  gender: { type: String, enum: ["male", "female", "other", ""], default: "" },
  dateOfBirth: { type: String },
  isVerified: { type: Boolean, default: false },

  // college information
  collegeID: { type: String, default: "" },
  rollNumber: { type: String, default: "" },
  branch: { type: String, enum: ["it", "ce", "ch", "me", "ec", "ic"] },
  passingYear: { type: Number },

  // contact information
  collegeEmail: { type: String, required: true },
  personalEmail: { type: String, default: "" },
  personalPhoneNumber: { type: String, default: "" },
  parentsPhoneNumber: { type: String, default: "" },

  // credential
  password: { type: String, required: true },

  // academic performance
  result: {
    type: mongoose.Schema({
      sem1: {
        type: Number,
        min: 0,
        max: 10,
        default: 0,
      },
      sem2: { type: Number, min: 0, max: 10, default: 0 },
      sem3: { type: Number, min: 0, max: 10, default: 0 },
      sem4: { type: Number, min: 0, max: 10, default: 0 },
      sem5: { type: Number, min: 0, max: 10, default: 0 },
      sem6: { type: Number, min: 0, max: 10, default: 0 },
      sem7: { type: Number, min: 0, max: 10, default: 0 },
      sem8: { type: Number, min: 0, max: 10, default: 0 },
      cpi: { type: Number, min: 0, max: 10, default: 0 },

      twelfthPerc: { type: Number, default: 0 },
      twelfthBoardType: { type: String, default: "" },
      twelfthBoardPassingYear: { type: Number, default: 0 },

      tenthPerc: { type: Number, default: 0 },
      tenthBoardType: { type: String, default: "" },
      tenthBoardPassingYear: { type: Number, default: 0 },

      diplomaPerc: { type: Number, default: 0 },
      diplomaBoardType: { type: String, default: "" },
      diplomaBoardPassingYear: { type: Number, default: 0 },

      // year gaps
      academicGap: { type: Number, default: 0 },
      academicGapReason: { type: String, default: 0 },

      // backlogs
      totalBacklogs: { type: Number, default: 0 },
      activeBacklogs: { type: Number, default: 0 },
    }),
  },

  // skills, hobby
  technicalSkills: {
    type: String,
  },

  hobbies: {
    type: String,
  },

  // competitive coding
  competitiveCoding: {
    type: [
      mongoose.Schema({
        platform: { type: String, required: true },
        stars: { type: Number, default: 0 },
        ratings: { type: Number, default: 0 },
        profile: { type: String, default: "" },
      }),
    ],
  },

  // address
  address: {
    type: mongoose.Schema({
      city: { type: String, default: "" },
      district: { type: String, default: "" },
      subDistrict: { type: String, default: "" },
      state: { type: String, default: "" },
      postalCode: { type: String, default: 0 },
      completeAddress: { type: String, default: "" },
    }),
  },

  // placement details
  placementStatus: {
    type: mongoose.Schema({
      selected: { type: String, enum: ["yes", "no"], default: "no" },
      companyName: { type: String, default: "" },
      role : {type : String, default : ""},
      duration: { type: Number, defualt: 0 },
      package: { type: Number, default: 0 },
      joiningDate: { type: String },
      mode: { type: String, enum: ["remote", "on-site"], default: "on-site" },
    }),
    default: {},
  },

  // internship details
  internshipStatus: {
    type: mongoose.Schema({
      selected: { type: String, enum: ["yes", "no"], default: "no" },
      companyName: { type: String, default: "" },
      role : {type : String, default : ""},
      duration: { type: Number, defualt: 0 },
      stipend: { type: Number, default: 0 },
      joiningDate: { type: String },
      mode: { type: String, enum: ["remote", "on-site"] },
    }),
    default: {},
  },

  appliedTo: {
    type: Map,
    of: mongoose.Schema({
      role: { type: [String] },
    }),
  },
});

module.exports = mongoose.model("students", StudentSchema);
