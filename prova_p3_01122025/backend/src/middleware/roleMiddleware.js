import { Request, Response, NextFunction } from "express";
export const isAdmin = (req, res, next) => {
    const user = req.user;
    if (!user)
        return res.status(401).json({ error: "Não autenticado" });
    if (user.role !== "admin")
        return res.status(403).json({ error: "Acesso negado" });
    return next();
};
export default isAdmin;
//# sourceMappingURL=roleMiddleware.js.map