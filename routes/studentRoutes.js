const express = require("express");
const {
  registerStudent,
  loginStudent,
  submitComplaint,
  requestRoom
} = require("../controllers/studentController");

const router = express.Router();
const Student = require("../models/Student");

// ✅ Get all students
router.get("/all", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

router.get("/all", async (req, res) => {
  try {
    const students = await Student.find(
      {},
      { name: 1, allocatedRoom: 1, _id: 0 }
    ); 

    res.json(students);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Find one student by name (used for requestedRoom + allocatedRoom display)
router.get("/find/:name", async (req, res) => {
  try {
    const student = await Student.findOne({ name: req.params.name });

    if (!student) return res.json({}); // return empty object if not found

    res.json(student);
  } catch (err) {
    res.status(500).json({ error: "Error finding student" });
  }
});

router.post("/register", registerStudent);
router.post("/login", loginStudent);
router.post("/complaint", submitComplaint);
router.post("/request-room", requestRoom);

module.exports = router;
