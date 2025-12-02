"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.me = exports.login = exports.register = void 0;
const prismaClient_1 = __importDefault(require("../prismaClient"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const hash_1 = require("../utils/hash");
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";
const register = async (req, res) => {
    try {
        const { email, password, role = "aluno" } = req.body;
        if (!email || !password)
            return res.status(400).json({ error: "Email e senha são obrigatórios" });
        const exists = await prismaClient_1.default.user.findUnique({ where: { email } });
        if (exists)
            return res.status(409).json({ error: "Usuário já existe" });
        const passwordHash = await (0, hash_1.hashPassword)(password);
        const user = await prismaClient_1.default.user.create({
            data: { email, password: passwordHash, role },
            select: { id: true, email: true, role: true }
        });
        return res.status(201).json({ user });
    }
    catch (err) {
        return res.status(500).json({ error: "Erro ao registrar" });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prismaClient_1.default.user.findUnique({ where: { email } });
        if (!user)
            return res.status(401).json({ error: "Credenciais inválidas" });
        const valid = await (0, hash_1.comparePassword)(password, user.password);
        if (!valid)
            return res.status(401).json({ error: "Credenciais inválidas" });
        const token = jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: "8h" });
        return res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
    }
    catch (err) {
        return res.status(500).json({ error: "Erro ao fazer login" });
    }
};
exports.login = login;
const me = async (req, res) => {
    const user = req.user;
    const info = await prismaClient_1.default.user.findUnique({
        where: { id: user.userId },
        select: { id: true, email: true, role: true }
    });
    return res.json({ user: info });
};
exports.me = me;
//# sourceMappingURL=authController.js.map