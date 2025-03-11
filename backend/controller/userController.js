import userModel from '../models//userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';


// login user
const loginUser = async(req,res) => {
    try{
        const {email , password} = req.body;
// check if user exist
const user = await userModel.findOne({email});
if(!user){
    return res.status(400).json({succes:false , message:"User Not Found"});
}

// compare the password
const isMatch = await bcrypt.compare(password,user.password);
// if password is not match
if(!isMatch){
    return res.status(400).json({success:false , message:"Invalid Credentials"});
}
// generate jwt token
const token = createToken(user._id);

res.json({success:true , token , message:"Login Successful"});
    }catch(error){
        console.log("Login Error :",error);
        res.status(500).json({ success: false, message: "Server error" });
    }

}

const createToken = (id) => {
    return jwt.sign({id} , process.env.JWT_SECRET)
}

// register user
const registerUser = async(req,res) => {

    try{
        const {name ,email , password} = req.body;
    // check if user exist
    const users = await userModel.findOne({email});
    if(users){
        return res.status(400).json({success:false , message:"User Already Exist"});
        }

        // validating email and strong password
        if(!validator.isEmail(email)){
            return res.status(400).json({succes:false , message:"Invalid Email"});
            }

            if (!validator.isStrongPassword(password)) {
                return res.status(400).json({ success: false, message: "Password must include uppercase, lowercase, numbers, and symbols." });
            }
            

            if(password.length < 8){
                return res.status(400).json({succes:false , message:"Password must be at least 8 characters"});
            }
            

        // hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name:name ,
            email:email ,
            password:hashedPassword
            });
            // saving user to database
            const user = await newUser.save();
            // creating token
            const token = createToken(user._id);
            // sending token to user
            // res.json({succes:true , token});

            res.status(201).json({
                success:true ,
                message:"User Created Successfully",
                token:token,
                user: { _id: user._id, name: user.name, email: user.email }
                
            })
    }catch(error){
        console.error("Registration Error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
            
}

export {loginUser , registerUser};