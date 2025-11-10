const Hostel = require("../models/Hostel");
const Student = require("../models/Student");

// ✅ Get free rooms
exports.getFreeRooms = async (req, res) => {
  const rooms = await Hostel.find({ allocatedTo: "" });
  res.json(rooms);
};

// ✅ Get allocated rooms
exports.getAllocatedRooms = async (req, res) => {
  const rooms = await Hostel.find({ allocatedTo: { $ne: "" } });
  res.json(rooms);
};

// ✅ Allocate room
exports.allocateRoom = async (req, res) => {
  const { name, roomNumber } = req.body;

  try {
    const student = await Student.findOne({ name });
    const room = await Hostel.findOne({ roomNumber });

    if (!room) return res.status(404).json({ error: "Room not found" });

    // Remove student from old room
    await Hostel.updateOne(
      { allocatedTo: name },
      { $set: { allocatedTo: "" } }
    );

    // Allocate new room
    room.allocatedTo = name;
    await room.save();

    student.allocatedRoom = roomNumber;
    await student.save();

    res.json({ message: "✅ Room allocated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Allocation error" });
  }
};

// ✅ Free room
exports.freeRoom = async (req, res) => {
  const { name } = req.body;

  try {
    await Hostel.updateOne(
      { allocatedTo: name },
      { $set: { allocatedTo: "" } }
    );

    await Student.updateOne(
      { name },
      { $set: { allocatedRoom: "" } }
    );

    res.json({ message: "✅ Room freed" });
  } catch (err) {
    res.status(500).json({ error: "Free error" });
  }
};
