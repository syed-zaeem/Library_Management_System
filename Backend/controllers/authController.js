const User = require('../models/User');
const logger = require('../utils/logger');
const misc = require('../utils/misc');
const logException = require('../utils/logger'); // Import your exception logging function here
require('dotenv').config({ path: '../.env' });

const authController = {
  signup: async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const user = new User({
        name,
        email,
        password,
        role,
      });

      await user.save();
      const token = misc.generateToken(user._id, user.role);
      res.status(201).json({ user, token });
    } catch (error) {
      // Log the exception
      logException('authController.js', 'signup', error.message);

      // Send response
      res.status(500).json({ message: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (password !== user.password) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      const token = misc.generateToken(user._id, user.role);
      res.status(200).json({ user, token });
    } catch (error) {
      // Log the exception
      logException('authController.js', 'login', error.message);

      // Send response
      res.status(500).json({ message: error.message });
    }
  },
  verify: async (req, res) => {
    try {
      const userData = req.user
      const user = await User.findById(userData.userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ user });
    } catch (error) {
      // Log the exception
      logException('authController.js', 'verify', error.message);

      // Send response
      console.log(error)
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = authController;
