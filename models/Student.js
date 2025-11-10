const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // unique student
  password: { type: String, required: true },

  // complaint overwrites old value
  complaint: { type: String, default: "" },

  // requested room overwrites old value
  requestedRoom: { type: String, default: "" },

  // actual allocated room
  allocatedRoom: { type: String, default: "" }
});

module.exports = mongoose.model("Student", studentSchema);
