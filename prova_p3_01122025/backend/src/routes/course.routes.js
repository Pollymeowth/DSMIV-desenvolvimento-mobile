import { Router } from "express";
import { listCourses, getCourse, createCourse, updateCourse, deleteCourse, } from "../controllers/courseController";
import { authMiddleware } from "../middleware/authMiddleware";
import { isAdmin } from "../middleware/roleMiddleware";
const router = Router();
router.get("/", listCourses);
router.get("/:id", getCourse);
router.post("/", authMiddleware, isAdmin, createCourse);
router.put("/:id", authMiddleware, isAdmin, updateCourse);
router.delete("/:id", authMiddleware, isAdmin, deleteCourse);
export default router;
//# sourceMappingURL=course.routes.js.map