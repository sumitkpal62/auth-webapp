import userSchema from "../models/userModel.js";

const registerUser = async(req,res)=>{
    res.json({
        message: "The user is registered successfully."
    })
}

export {registerUser};