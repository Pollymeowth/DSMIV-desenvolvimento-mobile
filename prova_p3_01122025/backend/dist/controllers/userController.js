"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignCourseToUser = void 0;
const prismaClient_1 = __importDefault(require("../prismaClient"));
const assignCourseToUser = async (req, res) => {
    try {
        const { id } = req.params; // user id
        const { courseId } = req.body;
        const user = await prismaClient_1.default.user.findUnique({ where: { id: Number(id) } });
        if (!user)
            return res.status(404).json({ error: "Usuário não encontrado" });
        if (courseId !== null && courseId !== undefined) {
            const course = await prismaClient_1.default.course.findUnique({ where: { id: Number(courseId) } });
            if (!course)
                return res.status(400).json({ error: "Curso inválido" });
        }
        const updated = await prismaClient_1.default.user.update({
            where: { id: Number(id) },
            data: { courseId: courseId !== undefined ? (courseId === null ? null : Number(courseId)) : user.courseId },
            select: { id: true, email: true, role: true, courseId: true }
        });
        return res.json({ user: updated });
    }
    catch (err) {
        return res.status(500).json({ error: "Erro ao atribuir curso" });
    }
};
exports.assignCourseToUser = assignCourseToUser;
exports.default = { assignCourseToUser: exports.assignCourseToUser };
//# sourceMappingURL=userController.js.map