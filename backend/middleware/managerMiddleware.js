const managerMiddleware = (req, res, next) => {
    if (req.user.role !== "manager") {
        return res.status(403).json({
            msg: "Access Denied. Managers only."
        });
    }

    next();
};

module.exports = managerMiddleware;