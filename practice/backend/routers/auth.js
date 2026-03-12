import express from "express"
import { register, login, deleteUser, getUsers, updateUser } from "../controllers/auth.js"
import { protect } from "../utils/auth.js"
const router = express.Router()

router.post("/register", register)

router.post("/login", login)
router.delete("/:id", protect, deleteUser)
router.get("/", protect, getUsers)
router.put("/:id", protect, updateUser)
export default router