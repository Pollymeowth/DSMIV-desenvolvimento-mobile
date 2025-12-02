"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const router = (0, express_1.Router)();
// Admin can assign or remove a course from a user
router.put("/:id/course", authMiddleware_1.authMiddleware, roleMiddleware_1.isAdmin, userController_1.assignCourseToUser);
exports.default = router;
//# sourceMappingURL=user.routes.js.map