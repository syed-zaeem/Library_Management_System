const jwt = require('jsonwebtoken');
require('dotenv').config('../.env')

authenticate = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Token is missing' });
  }
  
  const tokenString = token.replace('Bearer ', '');
  jwt.verify(tokenString, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized: Invalid or no token' });
    }
    req.user = user;
    next();
  });
};

authorize = (req, res, next) => {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: User is missing' });
    }
    if (user.role == 'admin') {
      next();
    } else {
      return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    }
  };

userAccessOwnData = (req, res, next) => {
  const userId = req.user.userId;
  const requestedUserId = req.params.id;
  console.log(userId, requestedUserId)
  if (req.user.role === 'admin' || userId === requestedUserId) {
    next();
  }
  else{
    return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
  }

};


addUserRole = (req, res, next) => {
  req.body.role = 'user';
  next();
};

module.exports = {
    authenticate,
    authorize,
    userAccessOwnData,
    addUserRole
}