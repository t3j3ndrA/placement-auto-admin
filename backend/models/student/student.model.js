const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema({
  // personal information
  firstName: { type: String, default: "" },
  middleName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  gender: { type: String, enum: ["male", "female", "other", ""], default: "" },
  dateOfBirth: { type: Date },

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
      sem1: { type: Number, min: 0, max: 10, default: 0 },
      sem2: { type: Number, min: 0, max: 10, default: 0 },
      sem3: { type: Number, min: 0, max: 10, default: 0 },
      sem4: { type: Number, min: 0, max: 10, default: 0 },
      sem5: { type: Number, min: 0, max: 10, default: 0 },
      sem6: { type: Number, min: 0, max: 10, default: 0 },
      sem7: { type: Number, min: 0, max: 10, default: 0 },
      sem8: { type: Number, min: 0, max: 10, default: 0 },
      cpi: { type: Number, min: 0, max: 10, default: 0 },
      twelfthPerc: { type: Number, default: 0 },
      tenthPerc: { type: Number, default: 0 },
      diplomaPerc: { type: Number, default: 0 },
    }),
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
      selected: { type: String, enum: ["yes", "no"] },
      companyName: { type: String },
      duration: { type: Number, defualt: 0 },
      package: { type: Number, default: 0 },
      joiningDate: { type: Date },
      mode: { type: String, enum: ["remote", "on-site"] },
    }),
  },

  // internship details
  internshipStatus: {
    type: mongoose.Schema({
      selected: { type: String, enum: ["yes", "no"] },
      companyName: { type: String },
      duration: { type: Number, defualt: 0 },
      stipend: { type: Number, default: 0 },
      joiningDate: { type: Date },
      mode: { type: String, enum: ["remote", "onsite"] },
    }),
  },

  // applied to companies
  // key will be company id
  // roles can be multiple
  appliedTo: {
    type: Map,
    of: mongoose.Schema({
      role: { type: [String] },
    }),
  },
});

module.exports = mongoose.model("students", StudentSchema);
