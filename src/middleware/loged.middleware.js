const loged = (req, res, next) => {
    if (req.session.user) {
        return res.redirect("api/session/current");
    }
    next();
};

export default loged;