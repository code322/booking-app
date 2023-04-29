export const isAuthorized = (req, res, next) => {
  const userId = parseInt(req.params.id);
  const currentUser = req.user;
  if (userId === currentUser.id || currentUser.isAdmin) {
    next();
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
