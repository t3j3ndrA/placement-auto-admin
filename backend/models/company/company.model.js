const mongoose = require("mongoose");

const CompanySchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: "" },
  website: { type: String, required: true },
  email: { type: String },
  packageInLPA: { type: Number, required: true },
  openPositions: { type: [String], required: true },
  expectedSkills: { type: [String], required: true },
  minAvgSPIReq: { type: Number },
  minCPIReq: { type: Number },
  jobLocation: { type: [String] },
  jobMode: { type: String, require: true, enum: ["remote", "office", "mixed"] },
  bondInYears: { type: Number, required: true, default: 0 },
  forBranch: {
    type: String,
    required: true,
    enum: ["it", "ce", "ch", "me", "ec", "ic"],
  },
  forBatches: {
    type: [String],
    default: [new Date().getFullYear().toString()],
  },
  tentetiveInterviewDate: { type: Date, default: new Date() },
  officeAddress: { type: String, default: "" },
  city: { type: String, default: "" },
});

module.exports = mongoose.model("companies", CompanySchema);
