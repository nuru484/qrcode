import passport from 'passport';

export const login = async (req, res, next) => {
  try {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err); // Pass error to the error handler
      }
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        // Save user ID in the session
        req.session.userId = user.id;
        return res.status(200).json({ message: 'Login successful.' });
      });
    })(req, res, next);
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    req.logout((err) => {
      if (err) {
        return next(err); // Pass error to error handler
      }

      // Destroy session
      req.session.destroy((err) => {
        if (err) {
          return next(err); // Pass error to error handler
        }

        // Send successful logout response
        return res.status(200).json({ message: 'Logout successful.' });
      });
    });
  } catch (error) {
    next(error); // Any unexpected errors
  }
};
