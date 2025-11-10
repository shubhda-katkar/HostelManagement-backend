const mongoose = require("mongoose");

const hostelSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true, unique: true },
  allocatedTo: { type: String, default: "" }  // student name
});

module.exports = mongoose.model("Hostel", hostelSchema);
