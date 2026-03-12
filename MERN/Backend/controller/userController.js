const User = require("../model/userModel")
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

const createToken = (_id)=>{
    return jwt.sign({_id}, process.env.SECRET, {expiresIn:'3d'})
}

const register = async (req, res) => {
    const{email,password} = req.body
    
    if(!validator.isEmail(email)){
        return res.status(400).json({error: "Invalid email formate"})
    }
    if(!validator.isStrongPassword(password)){
        return res.status(400).json({error: "password is not strong enough"})
    }
    const match = await User.findOne({email})
     if(match){
        return res.status(400).json({error: "Email is already exist"})
     }

     const salt = await bcrypt.genSalt(10)
     const hash = await bcrypt.hash(password, salt)
     try{
         const user = await User.create({email, password:hash})
         const token = createToken(user._id)
         res.status(200).json({email, token})
     }catch(error){
        res.status(400).json({error: error.message})
     }

}

const login = async(req,res)=>{
    const{email,password} = req.body
    
    if(!validator.isEmail(email)){
        return res.status(400).json({error: "Invalid email formate"})
    }
    const user = await User.findOne({email})
     if(!user){
        return res.status(400).json({error: "Incorrect Email"})
     }

     const match = await bcrypt.compare(password, user.password)
     if(!match){
        return res.status(400).json({error: 'Incorrect Password'})
     }
     try{
         const token = createToken(user._id)
         res.status(200).json({email, token})
     }catch(error){
        res.status(400).json({error: error.message})
     }

}

module.exports={
    register,login
}