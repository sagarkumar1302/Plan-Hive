import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        unique: [true, "It must be unique."],
        lowercase: true,
        index: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: [true, "It must be unique."],
        lowercase: true,
        index: true,
        trim: true,
    },
    avatar: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: [true, "Password must be mandatory."],
    },
    refreshToken: {
        type: String,
    },
},
    {
        timestamps: true,
    });
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}
userSchema.methods.generateAccessToken = async function () {
    return jwt.sign({
        _id: this._id,
        username: this.username,
        email: this.email,
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
        // expiresIn: "15s",
    })
}
userSchema.methods.generateRefreshToken = async function () {
    return jwt.sign({
        _id: this._id,
    }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
    })
}
export const User = mongoose.model("User", userSchema);