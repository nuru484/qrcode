const sessionFromHeader = (req, res, next) => {
  const sessionIdFromHeader = req.headers['x-session-id']; // Custom header
  if (sessionIdFromHeader) {
    req.sessionID = sessionIdFromHeader; // Set the session ID for Passport
  }
  next();
};

export default sessionFromHeader;
