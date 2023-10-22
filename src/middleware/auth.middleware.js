import logger from "../config/logger.js";
const authMdw = (req, res, next) => {
  logger.info(req.session);
  if (req.session?.user) {
    req.userRole = req.session.user.role;
    return next();
  }

  return res.redirect("/login");
};

export default authMdw;
