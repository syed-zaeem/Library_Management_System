const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../.env' });

function generateToken(userId, role) {
  const payload = { userId, role };
  const secretKey = process.env.SECRET_KEY;
  const expiresIn = '8h';

  const token = jwt.sign(payload, secretKey, { expiresIn });

  return token;
}

module.exports = {
    generateToken,
};
