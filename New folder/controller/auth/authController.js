import bcrypt from "bcrypt";
import User from "../../model/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import AgentProfile from "../../model/agentModel.js";
import { generateRefreshToken, generateToken, verifyRefreshToken } from "../../utils/generateTokens.js";
dotenv.config();

// Moved to dynamic access to avoid race conditions with dotenv
// const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export const register = async (req, res) => {
  try {
    const { name, email, password, role = "agent", phone } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      phone,
    });

    await newUser.save();

    if (role === "agent") {
      await AgentProfile.create({
        user: newUser._id,
        contactEmail: email,
        bio: "Add your bio",
        officeLocation: "Add office location",
        phone: phone,
      });
    }

    res.status(201).json({ message: "User created successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }
        const token = generateToken(user);
        const refreshToken = generateRefreshToken(user);

        res.status(200).json({ token, refreshToken, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 

export const refreshAccessToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        const decodedToken = verifyRefreshToken(refreshToken);
        const user = await User.findById(decodedToken.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const token = generateToken(user);
        const newRefreshToken = generateRefreshToken(user);
        res.status(200).json({ token, newRefreshToken, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};     