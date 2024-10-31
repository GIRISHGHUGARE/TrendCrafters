import User from "../models/user.model.js";
import bcrypt from "bcryptjs"; /* Library used for hashing the password */
import jwt from "jsonwebtoken"


export const signup = async(req,res)=>{ /* async to handle multiple request priority */
    try {
        /* Requesting fields from databse */
        const{name,username,email,password}=req.body;

        if(!name || !username || !email || !password){
            return res.status(400).json({message:"All fields are required"});
        }

        /* finding same email */
        const existingEmail =  await User.findOne({email});
        if (existingEmail) {
            return res.status(400).json({message : "Email already exists"});
        }

        /* finding same username */
        const existingUsername =  await User.findOne({email});
        if (existingUsername) {
            return res.status(400).json({message : "Username already exists"});
        }
       
        /* authentication of 6 characters password */
        if (password.length < 6) {
            return res.status(400).json({message : "Password must be at least 6 characters"});
        }

        /* Use of hash code password */
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);

        /* creation of new user with the following hashPassword */
        const user = new User({
            name,
            email,
            password:hashPassword,
            username,
        });

        await user.save();

        const token = jwt.sign({userId :user._id},process.env.JWT_SECRET,{expiresIn:"3d"}); /* expiresIn 3 days */

        res.cookie("jwt-VarkariSampraday",token,{
            httpOnly: true, /*prevent XSS attack*/
            maxAge: 3 * 24  * 60 * 60 * 1000,
            sameSite: "strict", /* prevent CSRF attack */
            secure: process.env.NODE_ENV === "production" /* prevent man-in-the-middle attacks */
        });

        res.status(201).json({message:"User registered successfully"});

        const profileUrl = process.env.CLIENT_URL + "/profile/" + user.username;
        // SEND WELCOME EMAIL
        // try{
        //     await sendWelcomeEmail(user.email, user.name, profileUrl)
        // }catch(emailError){
        //     console.error("Error sending welcome Email",emailError)
        // }

    } catch (error) {
        console.log("Error in SigningUp",error.message);
        res.status(500).json({message:"Internal server error"});
    }
}
export const login = async (req, res) => {
	try {
		const { username, password } = req.body;

		// Check if user exists
		const user = await User.findOne({ username });
		if (!user) {
			return res.status(400).json({ message: "Invalid credentials" });
		}

		// Check password
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: "Invalid credentials" });
		}

		// Create and send token
		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "3d" });
		await res.cookie("jwt-linkedin", token, {
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
	res.clearCookie("jwt-VarkariSampraday");
	res.json({ message: "Logged out successfully" });
};

export const getCurrentUser = async (req, res) => {
	try {
		res.json(req.user);
	} catch (error) {
		console.error("Error in getCurrentUser controller:", error);
		res.status(500).json({ message: "Server error" });
	}
};