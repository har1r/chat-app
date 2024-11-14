import bycrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender} = req.body;

        if(password !== confirmPassword) {
            return res.status(400).json({error: "Passwords don't match"});
        }

        const user = await User.findOne({username});

        if(user) {
            return res.status(400).json({error: "Username already exists"});
        }

        //  HASH PASSWORD HERE
        const salt = await bycrypt.genSalt(10); //the higher that number is, the slower the code will run
        const hashedPassword = await bycrypt.hash(password, salt);
        // https://avatar.iran.liara.run/
        const boyProfilPic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilPic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilPic: gender === "male" ? boyProfilPic : girlProfilPic
        });
        console.log(newUser)
        if(newUser) {
            // GENERATE JWT TOKEN HERE
            generateTokenAndSetCookie(newUser._id, res);
            
            await newUser.save();
    
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilPic: newUser.profilPic
            });
        }else {
            res.status(400).json({error: "Invalid user data"});
        }

    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
};

export const login = (req, res) => {
    res.send("Signup Route");
};

export const logout = (req, res) => {
    res.send("Signup Route");
};