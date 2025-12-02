import { Request, Response } from "express";
import prisma from "../prismaClient";
export const listCourses = async (req, res) => {
    try {
        const courses = await prisma.course.findMany({ orderBy: { createdAt: "desc" } });
        return res.json({ courses });
    }
    catch (err) {
        return res.status(500).json({ error: "Erro ao listar cursos" });
    }
};
export const getCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await prisma.course.findUnique({ where: { id: Number(id) } });
        if (!course)
            return res.status(404).json({ error: "Curso não encontrado" });
        return res.json({ course });
    }
    catch (err) {
        return res.status(500).json({ error: "Erro ao buscar curso" });
    }
};
export const createCourse = async (req, res) => {
    try {
        const { name, area, duration, coordinator } = req.body;
        if (!name)
            return res.status(400).json({ error: "Nome do curso é obrigatório" });
        const course = await prisma.course.create({
            data: { name, area, duration: duration ? Number(duration) : null, coordinator }
        });
        return res.status(201).json({ course });
    }
    catch (err) {
        return res.status(500).json({ error: "Erro ao criar curso" });
    }
};
export const updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, area, duration, coordinator } = req.body;
        const course = await prisma.course.findUnique({ where: { id: Number(id) } });
        if (!course)
            return res.status(404).json({ error: "Curso não encontrado" });
        const updated = await prisma.course.update({
            where: { id: Number(id) },
            data: { name, area, duration: duration !== undefined ? Number(duration) : course.duration, coordinator }
        });
        return res.json({ course: updated });
    }
    catch (err) {
        return res.status(500).json({ error: "Erro ao atualizar curso" });
    }
};
export const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await prisma.course.findUnique({ where: { id: Number(id) } });
        if (!course)
            return res.status(404).json({ error: "Curso não encontrado" });
        await prisma.course.delete({ where: { id: Number(id) } });
        return res.json({ message: "Curso removido" });
    }
    catch (err) {
        return res.status(500).json({ error: "Erro ao remover curso" });
    }
};
export default { listCourses, getCourse, createCourse, updateCourse, deleteCourse };
//# sourceMappingURL=courseController.js.map