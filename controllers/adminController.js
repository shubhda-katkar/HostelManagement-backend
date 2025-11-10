const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");

// ✅ Register first admin (keep existing)
exports.registerAdmin = async (req, res) => {
  try {
    const { name, password } = req.body;

    const existing = await Admin.findOne({ name });
    if (existing) return res.status(400).json({ error: "Admin already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({ name, password: hashedPassword });
    await admin.save();
    res.json({ message: "✅ Admin registered successfully" });
  } catch (error) {
    console.error("Register Admin Error:", error);
    res.status(500).json({ error: "Error registering admin" });
  }
};

// ✅ Admin login
exports.loginAdmin = async (req, res) => {
  try {
    const { name, password } = req.body;

    const admin = await Admin.findOne({ name });
    if (!admin) return res.status(404).json({ error: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ error: "Incorrect password" });

    res.json({ message: "✅ Login successful" });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Login error" });
  }
};

// ✅ Add new admin (only by logged-in admin)
exports.addAdmin = async (req, res) => {
  try {
    const { name, password } = req.body;

    const existing = await Admin.findOne({ name });
    if (existing) return res.status(400).json({ error: "Admin already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ name, password: hashedPassword });

    await admin.save();
    res.json({ message: "✅ Admin added successfully" });
  } catch (error) {
    console.error("Add Admin Error:", error);
    res.status(500).json({ error: "Error adding admin" });
  }
};

// ✅ Delete admin (only by logged-in admin)
exports.deleteAdmin = async (req, res) => {
  try {
    const { name } = req.params;

    const result = await Admin.deleteOne({ name });
    if (result.deletedCount === 0) return res.status(404).json({ error: "Admin not found" });

    res.json({ message: "✅ Admin deleted successfully" });
  } catch (error) {
    console.error("Delete Admin Error:", error);
    res.status(500).json({ error: "Error deleting admin" });
  }
};

// ✅ List all admins (optional)
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select("-password"); // don't send passwords
    res.json(admins);
  } catch (error) {
    console.error("Get Admins Error:", error);
    res.status(500).json({ error: "Error fetching admins" });
  }
};
