const jwt = require('jsonwebtoken');

function generateToken(userId, userType) {
  const payload = { userId, userType };
  const secretKey = process.env.SECRET_KEY;
  const expiresIn = '8h';

  const token = jwt.sign(payload, secretKey, { expiresIn });

  return token;
}

module.exports = {
    generateToken,
};
