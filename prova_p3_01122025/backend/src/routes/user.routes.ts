import { Router } from "express";
import { assignCourseToUser } from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";
import { isAdmin } from "../middleware/roleMiddleware";

const router = Router();

// Admin can assign or remove a course from a user
router.put("/:id/course", authMiddleware, isAdmin, assignCourseToUser);

export default router;
