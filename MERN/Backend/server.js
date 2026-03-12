const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const workoutRouter = require("./router/workoutRouter");
const userRouter = require("./router/userRouter");

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();


app.use("/api/workouts", workoutRouter);
app.use("/api/user", userRouter);

mongoose.connect(process.env.MONGO_URL)
    .then(() =>
        app.listen(process.env.PORT, () =>
            console.log("DB Connection Successfull & listening on port " + process.env.PORT)))
    .catch((err) => console.error(err));
