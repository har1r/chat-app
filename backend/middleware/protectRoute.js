import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
    try {
         const token = req.cookies.jwt;

         if(!token) {
            return res.status(401).json({error: "Unauthorized - No Token Provided"});
         }

         const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //  HASIL DARI decoded
        //  {
        //     userId: '6735aabc34993d8b26c93ec0',
        //     iat: 1731650525,
        //     exp: 1732946525
        //   }
         if(!decoded) {
            return res.status(401).json({error: "Unauthorized - Invalid Token"});
         }

         const user = await User.findById(decoded.userId).select("-password"); //.select() digunakan untuk menentukan field (kolom) mana yang ingin Anda sertakan atau hilangkan dari hasil query MongoDB.

         if(!user) {
            return res.status(404).json({error: "User not found"});
         }

         req.user = user; // set property user ke req

         next();

    } catch (error) {
        console.log("Error in protectRoute controller", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
};

export default protectRoute;