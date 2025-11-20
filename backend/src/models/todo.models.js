import mongoose from "mongoose";
const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    isCompleted: {
        type: Boolean,
        default: false,
        required: true
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High"], 
        default: "Low", 
        required: true
    },
    deadline : {
        type: Date,
        required : true
    },
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
})
export const Todo = mongoose.model("Todo", todoSchema);