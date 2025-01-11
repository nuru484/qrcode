export default (req, res, next) => {
  if (req.isAuthenticated()) {
    // If the user is authenticated, proceed to the next middleware or route handler
    return next();
  }
  // If the user is not authenticated, redirect them to the login page or send an error
  res
    .status(401)
    .json({ message: 'Unauthorized: Please log in to access this resource.' });
};
