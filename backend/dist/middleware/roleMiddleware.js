"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const isAdmin = (req, res, next) => {
    const user = req.user;
    if (!user)
        return res.status(401).json({ error: "Não autenticado" });
    if (user.role !== "admin")
        return res.status(403).json({ error: "Acesso negado" });
    return next();
};
exports.isAdmin = isAdmin;
exports.default = exports.isAdmin;
//# sourceMappingURL=roleMiddleware.js.map