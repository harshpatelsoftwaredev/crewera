const jwt = require('jsonwebtoken');

// Require authentication
const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

// Optional auth — doesn't fail if no token, just sets req.user if present
const optionalAuth = (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      req.user = jwt.verify(token, process.env.JWT_SECRET);
    }
  } catch (_) { /* ignore */ }
  next();
};

// Require admin role
const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ success: false, message: 'Admin access required' });
  }
};

// Require agent or admin role
const agentMiddleware = (req, res, next) => {
  if (req.user && (req.user.role === 'admin' || req.user.role === 'agent')) {
    next();
  } else {
    return res.status(403).json({ success: false, message: 'Agent or Admin access required' });
  }
};

module.exports = { authMiddleware, optionalAuth, adminMiddleware, agentMiddleware };
