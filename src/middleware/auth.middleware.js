const authMdw = (req, res, next) => {
  console.log(req.session);
  if (req.session?.user) {
    return next();
}

  return res.redirect("/login");
};

export default authMdw;