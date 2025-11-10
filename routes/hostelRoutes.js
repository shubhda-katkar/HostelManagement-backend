const express = require("express");
const { 
  getFreeRooms,
  getAllocatedRooms,
  allocateRoom,
  freeRoom
} = require("../controllers/hostelController");

const router = express.Router();

router.get("/free", getFreeRooms);
router.get("/allocated", getAllocatedRooms);
router.post("/allocate", allocateRoom);
router.post("/free", freeRoom);

module.exports = router;
