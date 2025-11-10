const express = require("express");
const router = express.Router();

const {
  addAdmin,
  loginAdmin,
  deleteAdmin
} = require("../controllers/adminController");

// ✅ Get all admins
router.get("/all", async (req, res) => {
  const Admin = require("../models/Admin");
  const admins = await Admin.find();
  res.json(admins);
});

// ✅ Add admin
router.post("/add", addAdmin);

// ✅ Login admin
router.post("/login", loginAdmin);

// ✅ Delete admin
router.delete("/delete/:name", deleteAdmin);

// ✅ Fetch all student complaints
router.get("/complaint", async (req, res) => {
  try {
    const Student = require("../models/Student");

    const complaints = await Student.find(
      { complaint: { $exists: true, $ne: "" } },
      { name: 1, complaint: 1 }
    );

    res.json(complaints);
  } catch (error) {
    console.error("Complaint Fetch Error:", error);
    res.status(500).json({ error: "Error loading complaints" });
  }
});

module.exports = router;
