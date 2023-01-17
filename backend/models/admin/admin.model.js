const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, enum: ["male", "female"] },
  password: { type: String, required: true },
  department: { type: String, required: true },
  designation: { type: String, default: "professor" },
  dateOfBirth: { type: Date, default: new Date() },
  email: { type: String, unique: true, required: true },
  phoneNumber: { type: Number, required: true },
  address1: { type: String, default: "" },
  address2: { type: String, default: "" },
  address3: { type: String, default: "" },
  city: { type: String, default: "" },
  pincode: { type: Number, default: 0 },
  isVerified: { type: Boolean, default: false },
});

module.exports = mongoose.model("admins", AdminSchema);
