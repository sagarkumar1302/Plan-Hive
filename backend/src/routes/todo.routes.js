import { Router } from "express";
import verifyJwt from "../middleware/auth.middleware.js";
import { addTodo, getAllTodoOfTheUser } from "../controllers/todo.controller.js";
const router = Router();
router.route("/add").post(verifyJwt, addTodo);
router.route("/get-todo").get(verifyJwt, getAllTodoOfTheUser);
export default router;