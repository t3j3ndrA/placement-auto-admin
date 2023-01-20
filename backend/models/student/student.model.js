const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema({
  rollNumber: { type: String, default: "" },
  studentId: { type: String, default: "" },
  firstName: { type: String, default: "" },
  middleName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  gender: { type: String, enum: ["male", "female"] },
  password: { type: String, required: true },
  trainingCompanyStatus: { type: String, default: "" },
  salary: { type: Number, default: 0.0 },
  SSCInPercentage: { type: Number, default: 0.0 },
  SSCBoard: { type: Number, default: 0.0 },
  HSCInPercentage: { type: Number, default: 0.0 },
  HSCBoard: { type: Number, default: 0.0 },
  diplomaInPercentage: { type: Number, default: 0.0 },
  sem1SPI: { type: Number, default: 0.0 },
  sem2SPI: { type: Number, default: 0.0 },
  sem3SPI: { type: Number, default: 0.0 },
  sem4SPI: { type: Number, default: 0.0 },
  sem5SPI: { type: Number, default: 0.0 },
  sem6SPI: { type: Number, default: 0.0 },
  sem7SPI: { type: Number, default: 0.0 },
  sem8SPI: { type: Number, default: 0.0 },
  averageSPI: { type: Number, default: 0.0 },
  averageCPI: { type: Number, default: 0.0 },
  dateOfBirth: { type: Date, default: new Date() },
  email: { type: String, unique: true, required: true },
  studentPhoneNumber: { type: Number, default: 0 },
  parentPhoneNumber: { type: Number, default: 0 },
  address1: { type: String, default: "" },
  address2: { type: String, default: "" },
  address3: { type: String, default: "" },
  city: { type: String, default: "" },
  pincode: { type: Number, default: 0 },
  registrationStatus: { type: Boolean, default: false },
});

module.exports = mongoose.model("students", StudentSchema);