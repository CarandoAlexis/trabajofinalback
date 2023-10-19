const checkAdminRole = (req, res, next) => {
    if (req.session.user && req.session.user.role === "admin") {
        return res
            .status(403)
            .json({ status: "error", message: "Acceso denegado para este rol" });
    }
    next();
};

const checkUserRole = (req, res, next) => {
    if (req.session.user && req.session.user.role === "usuario") {
        return res
            .status(403)
            .json({ status: "error", message: "Acceso denegado para este rol" });
    }
    next();
};

export { checkAdminRole, checkUserRole };
