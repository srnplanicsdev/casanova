import User from "../models/auth.js"
import { generateToken } from "../utils/auth.js"
const register = async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Please fill all the fields" })
    }
    const user = new User({ name, email, password })
    await user.save()
    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
    })
}

const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ message: "Please fill all the fields" })
    }
    const user = await User.findOne({ email }).select("+password")
    if (user && (await user.matchPassword(password))) {
        return res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            password: password,
            token: generateToken(user._id)
        })

    } else {
        return res.status(401).json({ message: "Invalid credentials" })
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id)
    if (!user) {
        return res.status(404).json({ message: "User not Found" })
    }
    await user.deleteOne()
    res.json({ message: "User deleted" })

}

const getUsers = async (req, res) => {
    console.time("API")
    const users = await User.find()
    console.timeEnd("API")
    if (users) {
        res.json({ users })
    } else {
        return res.status(404).json({ message: "User not Found" })
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params
    const { email, password, name } = req.body
    const user = await User.findById(id)

    if (!user) {
        return res.status(404).json({ message: "User not Found" })
    }
    user.name = name || user.name,
        user.email = email || user.email,
        user.password = password || user.password

    await user.save()
    return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password
    })
}

export { register, login, deleteUser, getUsers, updateUser }