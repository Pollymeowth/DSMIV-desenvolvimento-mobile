import { Request, Response } from "express";
import prisma from "../prismaClient";
import jwt from "jsonwebtoken";
import { hashPassword, comparePassword } from "../utils/hash";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, role = "aluno" } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: "Email e senha são obrigatórios" });

    const exists = await prisma.user.findUnique({ where: { email } });

    if (exists) return res.status(409).json({ error: "Usuário já existe" });

    const passwordHash = await hashPassword(password);

    const user = await prisma.user.create({
      data: { email, password: passwordHash, role },
      select: { id: true, email: true, role: true }
    });

    return res.status(201).json({ user });

  } catch (err) {
    return res.status(500).json({ error: "Erro ao registrar" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return res.status(401).json({ error: "Credenciais inválidas" });

    const valid = await comparePassword(password, user.password);
    if (!valid) return res.status(401).json({ error: "Credenciais inválidas" });

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: "8h" }
    );

    return res.json({ token, user: { id: user.id, email: user.email, role: user.role } });

  } catch (err) {
    return res.status(500).json({ error: "Erro ao fazer login" });
  }
};

export const me = async (req: Request, res: Response) => {
  const user = (req as any).user;

  const info = await prisma.user.findUnique({
    where: { id: user.userId },
    select: { id: true, email: true, role: true }
  });

  return res.json({ user: info });
};
