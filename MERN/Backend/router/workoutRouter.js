const express = require("express");
const router = express.Router();
const { getWorkouts, getWorkout,createWorkout,updateWorkout,deleteWorkout } = require("../controller/workoutController");
const protect = require("../middleware/protect");

router.use(protect)
router.get("/", getWorkouts);
router.get("/:id", getWorkout);
router.post("/", createWorkout);
router.put("/:id", updateWorkout);
router.delete("/:id", deleteWorkout);

module.exports = router;