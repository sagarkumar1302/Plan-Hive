import { Todo } from "../models/todo.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addTodo = asyncHandler(async (req, res) => {
    const { title, description, isCompleted, priority, deadline } = req.body;
    if (!title) {
        throw new ApiError(401, "Please fill title")
    }
    // if (!isCompleted) {
    //     throw new ApiError(401, "Please fill it is completed or not.")
    // }
    if (!priority) {
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
const getAllTodoOfTheUser = asyncHandler(async (req, res) => {
    const userId = req?.user?._id;
    const allTodo = await Todo.find({ owner: userId })
    if (!allTodo) {
        throw new ApiError(404, "No todos found.")
    }
    return res.status(200).json(new ApiResponse(200, "All todo for this user", allTodo))
})
const deleteTodo = asyncHandler(async (req, res) => {
    const { todoId } = req.params;

    if (!todoId) {
        throw new ApiError(400, "Todo ID is required.");
    }

    const userId = req?.user?._id;

    // Find todo and check if it belongs to the logged-in user
    const todo = await Todo.findOne({ _id: todoId, owner: userId });

    if (!todo) {
        throw new ApiError(404, "Todo not found or unauthorized.");
    }

    await Todo.deleteOne({ _id: todoId });

    return res
        .status(200)
        .json(new ApiResponse(200, "Todo deleted successfully", {}));
});
const updateTodo = asyncHandler(async (req, res) => {
    const { todoId } = req.params;
    const { title, description, isCompleted, priority, deadline } = req.body;

    if (!todoId) {
        throw new ApiError(400, "Todo ID is required.");
    }

    const userId = req.user?._id;

    // Find todo and check if owner is correct
    const todo = await Todo.findOne({ _id: todoId, owner: userId });

    if (!todo) {
        throw new ApiError(404, "Todo not found or you are not authorized.");
    }

    // Build update object dynamically (only update fields that are provided)
    const updateFields = {};

    if (title !== undefined) updateFields.title = title;
    if (description !== undefined) updateFields.description = description;
    if (isCompleted !== undefined) updateFields.isCompleted = isCompleted;
    if (priority !== undefined) updateFields.priority = priority;
    if (deadline !== undefined) updateFields.deadline = deadline;

    // Update todo
    const updatedTodo = await Todo.findByIdAndUpdate(
        todoId,
        { $set: updateFields },
        { new: true }
    );

    return res
        .status(200)
        .json(new ApiResponse(200, "Todo updated successfully", updatedTodo));
});



export { addTodo, getAllTodoOfTheUser, deleteTodo, updateTodo }