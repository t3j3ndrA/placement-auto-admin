const mongoose = require("mongoose");
const studentModel = require("../student/student.model");

const CompanySchema = mongoose.Schema({
  name: { type: String, required: true },
  website: { type: String, required: true },
  email: { type: String, required: true },
  forBatch: { type: Number, required: true },
  description: { type: String },
  roles: {
    type: [
      mongoose.Schema({
        name: { type: String, required: true },
        // in LPA
        avgPackage: { type: Number },
        type: { type: String, enum: ["full-time", "internship"] },
        mode: { type: String, enum: ["remote", "on-site", "hybrid"] },
        // in months
        bonds: { type: Number, required: true, default: 0 },
        deadline: { type: Date, required: true },
        interviewDate: { type: Date, required: true },
        interviewMode: { type: String, enum: ["online", "offline"] },

        requirements: {
          type: mongoose.Schema({
            cpi: { type: Number, defualt: 0 },
            twelfthPerc: { type: Number, default: 0 },
            tenthPerc: { type: Number, default: 0 },
            diplomaPerc: { type: Number, default: 0 },
            competitiveCoding: {
              type: [
                mongoose.Schema({
                  platform: { type: String, required: true },
                  stars: { type: Number, default: 0 },
                  ratings: { type: Number, default: 0 },
                }),
              ],
            },
            expectedSkills: { type: String },
          }),
        },
        applications: [mongoose.Types.ObjectId],
        elligibles: [mongoose.Types.ObjectId],
        // key will be student id
        // students: [
        //   mongoose.Schema({
        //     // student ID
        //     _id: { type: mongoose.Types.ObjectId },
        //     isElligible: { type: Boolean, default: false },
        //     hasApplied: { type: Boolean, default: false },
        //   }),
        // ],
      }),
    ],
  },
  address: {
    type: mongoose.Schema({
      city: { type: String, default: "" },
      district: { type: String, default: "" },
      state: { type: String, default: "" },
      postalCode: { type: Number, default: 0 },
      completeAddress: { type: String, default: "" },
    }),
  },
});

module.exports = mongoose.model("companies", CompanySchema);
