export default (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res
    .status(401)
    .json({ message: 'Unauthorized: Please log in to access this resource.' });
};
