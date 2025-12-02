import { Request, Response } from "express";
import prisma from "../prismaClient";
export const assignCourseToUser = async (req, res) => {
    try {
        const { id } = req.params; // user id
        const { courseId } = req.body;
        const user = await prisma.user.findUnique({ where: { id: Number(id) } });
        if (!user)
            return res.status(404).json({ error: "Usuário não encontrado" });
        if (courseId !== null && courseId !== undefined) {
            const course = await prisma.course.findUnique({ where: { id: Number(courseId) } });
            if (!course)
                return res.status(400).json({ error: "Curso inválido" });
        }
        const updated = await prisma.user.update({
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
export default { assignCourseToUser };
//# sourceMappingURL=userController.js.map