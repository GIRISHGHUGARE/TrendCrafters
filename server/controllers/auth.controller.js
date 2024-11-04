import User from "../models/user.model.js";
import bcrypt from "bcryptjs"; /* Library used for hashing the password */
import jwt from "jsonwebtoken"

export const signup = async(req,res)=>{
    try{
        const{name,email,password}=req.body;

        // Validations condition statements
        if(!name||!email||!password){
            return res.status(400).json({message:"All fields are required!!"});
        }
        const existingEmail = await User.findOne({email});
        if(existingEmail){
            return res.status(400).json({message:"Email already exists!!"});
        }
        if(password.length < 8){
            return res.status(400).json({message:"Password must be at least 8 characters"});
        }

        //creation of new user
        const hashPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            password:hashPassword
        })
        await user.save();

        const token = jwt.sign({userId :user._id},process.env.JWT_SECRET,{expiresIn:"3d"}); /* expiresIn 3 days */
        res.cookie("jwt-TrendCrafters",token,{
            httpOnly: true, /*prevent XSS attack*/
            maxAge: 3 * 24  * 60 * 60 * 1000,
            sameSite: "strict", /* prevent CSRF attack */
            secure: process.env.NODE_ENV === "production" /* prevent man-in-the-middle attacks */
        });

        res.status(201).json({message:"User registered successfully"});
    }
    catch(error){
        console.log("Error in SigningUp",error.message);
        res.status(500).json({message:"Internal server error"});
    }
}

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		// Check if user exists
		const user = await User.findOne({ email });
		if(!user){
            return res.status(400).json({message:"Email does not exist!!"})
        }

		// Check password
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: "Invalid credentials" });
		}

		// Create and send token
		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "3d" });
		await res.cookie("jwt-TrendCrafters", token, {
			httpOnly: true,
			maxAge: 3 * 24 * 60 * 60 * 1000,
			sameSite: "strict",
			secure: process.env.NODE_ENV === "production",
		});

		res.json({ message: "Logged in successfully" });
	} catch (error) {
		console.error("Error in login controller:", error);
		res.status(500).json({ message: "Server error" });
	}
};

export const logout = (req, res) => {
	res.clearCookie("jwt-TrendCrafters");
	res.json({ message: "Logged out successfully" });
};

export const getCurrentUser  = async (req, res) => {
    try {
        // Ensure req.user is populated by the authenticate middleware
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        res.json(req.user);
    } catch (error) {
        console.error("Error in getCurrentUser  controller:", error);
        res.status(500).json({ message: "Server error" });
    }
};