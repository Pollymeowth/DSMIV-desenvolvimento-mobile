import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";
export const authMiddleware = (req, res, next) => {
    const header = req.headers.authorization;
    if (!header)
        return res.status(401).json({ error: "Token ausente" });
    const [, token] = header.split(" ");
    if (!token)
        return res.status(401).json({ error: "Token inválido" });
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        return res.status(401).json({ error: "Token inválido" });
    }
};
//# sourceMappingURL=authMiddleware.js.map