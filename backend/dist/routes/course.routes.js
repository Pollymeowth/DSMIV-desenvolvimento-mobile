"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const courseController_1 = require("../controllers/courseController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const router = (0, express_1.Router)();
router.get("/", courseController_1.listCourses);
router.get("/:id", courseController_1.getCourse);
router.post("/", authMiddleware_1.authMiddleware, roleMiddleware_1.isAdmin, courseController_1.createCourse);
router.put("/:id", authMiddleware_1.authMiddleware, roleMiddleware_1.isAdmin, courseController_1.updateCourse);
router.delete("/:id", authMiddleware_1.authMiddleware, roleMiddleware_1.isAdmin, courseController_1.deleteCourse);
exports.default = router;
//# sourceMappingURL=course.routes.js.map