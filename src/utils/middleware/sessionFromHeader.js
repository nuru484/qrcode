const sessionFromHeader = (req, res, next) => {
  const sessionIdFromHeader = req.headers['x-session-id'];
  console.log('Session from header: ' + sessionIdFromHeader);

  console.log('Session Id before: ' + req.sessionID);

  if (sessionIdFromHeader) {
    req.sessionID = sessionIdFromHeader;
  }
  next();
};

export default sessionFromHeader;
