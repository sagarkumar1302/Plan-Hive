import { Todo } from "../models/todo.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addTodo = asyncHandler(async (req, res) => {
    const { title, description, isCompleted, priority, deadline } = req.body;
    if (!title ) {
        throw new ApiError(401, "Please fill title")
    }
    // if (!isCompleted) {
    //     throw new ApiError(401, "Please fill it is completed or not.")
    // }
    if (!priority ) {
        throw new ApiError(401, "Please fill priority")
    }
    if (!deadline) {
        throw new ApiError(401, "Please fill deadline")
    }
    const userId = req?.user?._id;
    const todo = await Todo.create({
        title,
        description: description ? description : "",
        isCompleted,
        priority,
        deadline,
        owner: userId
    })
    if (!todo) {
        throw new ApiError(401, "Todo is not created.")
    }
    return res.status(200).json(new ApiResponse(200, "Todo is created.", todo))
})
const getAllTodoOfTheUser = asyncHandler(async (req, res)=>{
    const userId = req?.user?._id;
    const allTodo = await Todo.find({owner: userId})
    if(!allTodo){
        throw new ApiError(404, "No todos found.")
    }
    return res.status(200).json(new ApiResponse(200, "All todo for this user", allTodo))
})
export {addTodo, getAllTodoOfTheUser}