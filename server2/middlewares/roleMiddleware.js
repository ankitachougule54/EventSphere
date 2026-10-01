
export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      // Check if user exists
      if (!req.user) {
        return res.status(401).json({
          message: "User authentication required.",
        });
      }

      // Check user's role
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          message: "Access denied. You don't have permission.",
        });
      }

      // Allow access
      next();

    } catch (error) {
      return res.status(500).json({
        message: "Authorization error.",
      });
    }
  };
};