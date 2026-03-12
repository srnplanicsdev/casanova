import mongoose from "mongoose"
import bcrypt from "bcrypt"
const userSchema = new mongoose.Schema({
    name: {
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true,
        select:false
    },
}, {timestamps: true})

userSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.pre("save", async function(){
    if(!this.isModified("password")){
        return 
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  
})

const User = mongoose.model("User", userSchema)

export default User
