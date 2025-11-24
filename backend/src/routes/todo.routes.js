import { Router } from "express";
import verifyJwt from "../middleware/auth.middleware.js";
import { addTodo, deleteTodo, getAllTodoOfTheUser, updateTodo } from "../controllers/todo.controller.js";
const router = Router();
router.route("/add").post(verifyJwt, addTodo);
router.route("/get-todo").get(verifyJwt, getAllTodoOfTheUser);
router.route("/delete-todo/:todoId").delete(verifyJwt, deleteTodo);
router.route("/update-todo/:todoId").patch(verifyJwt, updateTodo);
export default router;