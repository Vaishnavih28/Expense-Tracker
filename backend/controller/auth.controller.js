import bcrypt from 'bcryptjs'
import User from '../models/user.model.js'
import generateTokenAndSetCookie from '../utils/generateToken.js';

export const signup = async (req,res)=>{
    try {
        const {fullname,email,password, confirmPassword } = req.body;
        if( password != confirmPassword){
            return res.status(400).json({
                error: "Passwords do not match"
            })
            
        }

        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                error : "Account already exists"
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const profilePic = `https://avatar.iran.liara.run/username?username=${fullname}&bold=false&length=1`

        const newUser = new User({
            fullname,
            email,
            password : hashedPassword,
            profilePic
        })

        if(newUser){

            generateTokenAndSetCookie(newUser._id,res)
            await newUser.save()

            res.status(201).json({
                _id:newUser._id,
                fullname : newUser.fullname,
                email : newUser.email,
                profilePic : newUser.profilePic
            })

        }
        else{
            res.status(400).json({error:"Invalid user data"})
        }
        
    } catch (error) {
        console.log("Error while signing up",error.message);
        res.status(500).json({error : "Internal server error"})
    }

}

export const login = async(req,res)=>{
    try {

        const { email, password} = req.body;
        const user = await User.findOne({email});
        const isPassowrdCorrect = await bcrypt.compare(password,user?.password || "")
        if(!user || !isPassowrdCorrect){
            return res.status(400).json({
                error : "Invalid email or Password"
            })
        }
        generateTokenAndSetCookie(user._id,res);

        res.status(200).json({
            _id: user._id,
            fullname : user.fullname,
            email : user.email,
            profilePic : user.profilePic
        })
        
    } catch (error) {
        console.log("Error while login",error.message)
        res.status(500).json({error:"Internal server error"})
        
    }
}

export const logout = (req,res)=>{
    try {
        res.cookie("jwt","",{
            maxAge : 0
        })
        res.status(200).json({
            message: "Logged out successfully"
        })


        
    } catch (error) {
        console.log("Error while logout",error.message);
        res.status(500).json({error:"Internal server error"})
        
    }
}