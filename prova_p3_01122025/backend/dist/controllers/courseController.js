"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCourse = exports.updateCourse = exports.createCourse = exports.getCourse = exports.listCourses = void 0;
const prismaClient_1 = __importDefault(require("../prismaClient"));
const listCourses = async (req, res) => {
    try {
        const courses = await prismaClient_1.default.course.findMany({ orderBy: { createdAt: "desc" } });
        return res.json({ courses });
    }
    catch (err) {
        return res.status(500).json({ error: "Erro ao listar cursos" });
    }
};
exports.listCourses = listCourses;
const getCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await prismaClient_1.default.course.findUnique({ where: { id: Number(id) } });
        if (!course)
            return res.status(404).json({ error: "Curso não encontrado" });
        return res.json({ course });
    }
    catch (err) {
        return res.status(500).json({ error: "Erro ao buscar curso" });
    }
};
exports.getCourse = getCourse;
const createCourse = async (req, res) => {
    try {
        const { name, area, duration, coordinator } = req.body;
        if (!name)
            return res.status(400).json({ error: "Nome do curso é obrigatório" });
        const course = await prismaClient_1.default.course.create({
            data: { name, area, duration: duration ? Number(duration) : null, coordinator }
        });
        return res.status(201).json({ course });
    }
    catch (err) {
        return res.status(500).json({ error: "Erro ao criar curso" });
    }
};
exports.createCourse = createCourse;
const updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, area, duration, coordinator } = req.body;
        const course = await prismaClient_1.default.course.findUnique({ where: { id: Number(id) } });
        if (!course)
            return res.status(404).json({ error: "Curso não encontrado" });
        const updated = await prismaClient_1.default.course.update({
            where: { id: Number(id) },
            data: { name, area, duration: duration !== undefined ? Number(duration) : course.duration, coordinator }
        });
        return res.json({ course: updated });
    }
    catch (err) {
        return res.status(500).json({ error: "Erro ao atualizar curso" });
    }
};
exports.updateCourse = updateCourse;
const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await prismaClient_1.default.course.findUnique({ where: { id: Number(id) } });
        if (!course)
            return res.status(404).json({ error: "Curso não encontrado" });
        await prismaClient_1.default.course.delete({ where: { id: Number(id) } });
        return res.json({ message: "Curso removido" });
    }
    catch (err) {
        return res.status(500).json({ error: "Erro ao remover curso" });
    }
};
exports.deleteCourse = deleteCourse;
exports.default = { listCourses: exports.listCourses, getCourse: exports.getCourse, createCourse: exports.createCourse, updateCourse: exports.updateCourse, deleteCourse: exports.deleteCourse };
//# sourceMappingURL=courseController.js.map