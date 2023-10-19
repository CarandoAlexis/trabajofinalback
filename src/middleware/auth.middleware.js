const authMdw = (req, res, next) => {
  console.log(req.session);
  if (req.session?.user) {
    req.userRole = req.session.user.role;
    return next();
}

  return res.redirect("/login");
};

export default authMdw;