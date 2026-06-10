import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signupUser = async (req,res)=>{
    try {
        const {name, email , password} = req.body;
        // User hai ki nhi cheak kar liya ...
        const userExist = await User.findOne({email});
        if(userExist){
            return res.send(401)
            .json("User already exist");
        }
        // password hash kar diya 
        const hashPassword = await bcrypt.hash(password,10);

        //User bana liya 
        await User.create({
            name,
            email,
            password:hashPassword
        });
        res.json({message:"User Register Sucessfully !!"});

    } catch (error) {
        res.status(500)
        .json("Server Error",error);
    }
}


export const loginUser= async (req,res) => {
    try {
        const {email,password} = req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.send(401)
            .json("User not exist");
        }

        const match = await bcrypt.compare(password,user.password);
        if(!match){
            return res.status(400)
            .json({message:"Invalid Credentials"});
        }

        const token= jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        );

        res.json({
            message:"Login Sucessfull",
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email
            }
        });

    } catch (
        error) {
        res.status(500)
        .json({message:"Server Error",error});
    }
};