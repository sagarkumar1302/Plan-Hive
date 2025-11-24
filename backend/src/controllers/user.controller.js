import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
const options = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
};
const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        // console.log("User in g&r ",user);

        const accessToken = await user.generateAccessToken();
        // console.log("User in accessToken g&r ",accessToken);
        const refreshToken = await user.generateRefreshToken();
        // console.log("User in refreshToken g&r ",refreshToken);
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(
            500,
            "Error in generating refresh token and access token."
        );
    }
};
const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, username, email, password } = req.body || {};
    if ([firstName, lastName, username, email, password].some((field) => !field?.trim())) {
        throw new ApiError(400, "All fields are mandatory.");
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        throw new ApiError(402, "Please provide valid email.");
    }
    const existedUser = await User.findOne({
        $or: [{ email }, { username }]
    })
    if (existedUser) {
        throw new ApiError(409, "User already exist. Please login")
    }
    const avatarLocalPath = req.file?.path;
    console.log('Req file', req.file);

    if (!avatarLocalPath) {
        throw new ApiError(404, "Local path of the avatar not found.")
    }
    const avatar = await uploadCloudinary(avatarLocalPath);
    console.log("Avatar", avatar);

    if (!avatar) {
        throw new ApiError(404, "Avatar not found.")
    }
    const user = await User.create({
        firstName,
        lastName,
        username,
        password,
        avatar: avatar.url,
        email,
    })
    const createdUser = await User.findById(user._id).select("-password -refreshToken");
    if (!createdUser) {
        throw new ApiError(402, "Error in creating user.")
    }
    return res.status(200).json(new ApiResponse(200, "User created successfully", createdUser));
})
const loginUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username && !email) {
        throw new ApiError(402, "Please fill Username or Email.");
    }
    const user = await User.findOne({
        $or: [{ username }, { email }]
    })
    // console.log("User ",user);

    if (!user) {
        throw new ApiError(404, "User not found.")
    }
    const authorizeUser = await user.isPasswordMatched(password);
    // console.log("Authorize User ", authorizeUser);

    if (!authorizeUser) {
        throw new ApiError(402, "Invalid Credential.")
    }
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);
    // console.log("Access Token ", accessToken, refreshToken);

    const loginUser = await User.findById(user._id).select("-password -refreshToken");
    return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options).json(new ApiResponse(200, "Login Successfully.", { user: loginUser, accessToken, refreshToken }));
})
const currentUser = asyncHandler(async (req, res) => {
    const user = req.user;
    if (!user) {
        throw new ApiError(404, "Current User is not found.")
    }
    return res.status(200).json(new ApiResponse(200, "Current User Fetched Successfully", user))
})
const logout = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user?._id, {
        $set: {
            refreshToken: undefined,
        },
    });
    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, "User logout successfully", {}));
});
const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken =
        req.cookies.refreshToken || req.body.refreshToken;
    if (!incomingRefreshToken) {
        throw new ApiError(406, "Unauthorized Request")
    }
    try {
        const decoded = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
        if (!decoded) {

            throw new ApiError(406, "Unauthorized Request")
        }
        const user = await User.findById(decoded._id);
        if (!user) {
            throw new ApiError(404, "User not found with the token.");
        }
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(404, "Refresh Token is Invalid or Expired.");
        }
        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
            user._id
        );
        console.log('Refresh Token Function Triggered');

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(200, "Access Token Refreshed", {
                    accessToken,
                    refreshToken,
                })
            );
    } catch (error) {
        throw new ApiError(406, error?.message || "Invalid Refresh Token");

    }
})
const updateUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, username, email } = req.body;

    const userId = req.user?._id;
    if (!userId) {
        throw new ApiError(401, "Unauthorized: User not found.");
    }

    // Validate email format if provided
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new ApiError(400, "Invalid email format.");
    }

    // Prevent duplicate username or email
    if (email || username) {
        const existingUser = await User.findOne({
            _id: { $ne: userId },  // exclude current user
            $or: [
                email ? { email } : {},
                username ? { username } : {}
            ]
        });
        if (existingUser) {
            throw new ApiError(409, "Email or Username already taken.");
        }
    }

    const updateFields = {};

    if (firstName !== undefined) updateFields.firstName = firstName;
    if (lastName !== undefined) updateFields.lastName = lastName;
    if (username !== undefined) updateFields.username = username;
    if (email !== undefined) updateFields.email = email;

    // Avatar upload if user uploads new image
    // if (req.file?.path) {
    //     const uploadedAvatar = await uploadCloudinary(req.file.path);
    //     if (!uploadedAvatar) {
    //         throw new ApiError(500, "Failed to upload avatar.");
    //     }
    //     updateFields.avatar = uploadedAvatar.url;
    // }

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: updateFields },
        { new: true }
    ).select("-password -refreshToken");

    return res
        .status(200)
        .json(new ApiResponse(200, "User updated successfully", updatedUser));
});
const updateAvatar = asyncHandler(async (req, res) => {
    const avatarLocalPath = req.file?.path;
    console.log('Req file', req.file);

    if (!avatarLocalPath) {
        throw new ApiError(404, "Local path of the avatar not found.")
    }
    const avatarUpload = await uploadCloudinary(avatarLocalPath);
    console.log("Avatar", avatarUpload);

    if (!avatarUpload.url) {
        throw new ApiError(404, "Avatar not found.")
    }
    const userId = req.user?._id;

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: { avatar: avatarUpload.url } },
        { new: true }
    ).select("-password -refreshToken");
    return res.status(200).json(new ApiResponse(200, "User created successfully", updatedUser));
})
const updatePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        throw new ApiError(400, "Old password and new password are required.");
    }

    const user = await User.findById(req.user?._id);

    if (!user) {
        throw new ApiError(404, "User not found.");
    }

    // Match old password
    const isOldPasswordCorrect = await user.isPasswordMatched(oldPassword);

    if (!isOldPasswordCorrect) {
        throw new ApiError(401, "Old password is incorrect.");
    }

    // Update password
    user.password = newPassword;
    user.refreshToken = undefined; // Force re-login
    await user.save({ validateBeforeSave: true });
    return res.status(200).json(
        new ApiResponse(200, "Password updated successfully. Please login again.")
    );
});

export { registerUser, loginUser, currentUser, logout, refreshAccessToken, updateUser, updateAvatar, updatePassword };