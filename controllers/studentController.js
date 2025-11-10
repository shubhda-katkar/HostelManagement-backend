const Student = require("../models/Student");
const bcrypt = require("bcryptjs");

// ✅ Register student
exports.registerStudent = async (req, res) => {
  const { name, password } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);
    const student = new Student({ name, password: hashed });

    await student.save();
    res.json({ message: "✅ Student registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error registering student" });
  }
};

// ✅ Student login
exports.loginStudent = async (req, res) => {
  const { name, password } = req.body;

  const student = await Student.findOne({ name });
  if (!student) return res.status(404).json({ error: "Student not found" });

  const match = await bcrypt.compare(password, student.password);
  if (!match) return res.status(401).json({ error: "Incorrect password" });

  res.json({ message: "✅ Login successful", student });
};

// ✅ Submit (overwrite) complaint
exports.submitComplaint = async (req, res) => {
  const { name, complaint } = req.body;

  try {
    const student = await Student.findOne({ name });

    student.complaint = complaint; // overwrite
    await student.save();

    res.json({ message: "✅ Complaint saved" });
  } catch (err) {
    res.status(500).json({ error: "Complaint error" });
  }
};

// ✅ Request room (overwrite)
exports.requestRoom = async (req, res) => {
  const { name, roomNumber } = req.body;

  try {
    const student = await Student.findOne({ name });

    student.requestedRoom = roomNumber; // overwrite
    await student.save();

    res.json({ message: "✅ Room request saved" });
  } catch (err) {
    res.status(500).json({ error: "Room request error" });
  }
};

