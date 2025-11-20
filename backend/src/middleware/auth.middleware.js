import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
const verifyJwt = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        // console.log("Token ",req.cookies);

        if (!token) {
            throw new ApiError(406, "Unauthorized User");
        }
        const decodedUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedUser._id).select("-password -refreshToken");
        if (!user) {
            throw new ApiError(406, "Invalid or Expired Token");
        }
        req.user = user;
        next();
    } catch (error) {
        // throw new ApiError(406, error?.message || "Invalid Access Token")
        return res.status(406).json({
            success: false,
            message: "Token expired",
        });
    }
})
export default verifyJwt;