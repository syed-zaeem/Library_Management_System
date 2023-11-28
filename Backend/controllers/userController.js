const User = require('../models/User'); // Assuming this is your Mongoose User model
const logException = require('../utils/logger'); // Import your exception logging function here

const userController = {
  getAllActiveUsers: async (req, res) => {
    try {
      const activeUsers = await User.find({ active: true });
      res.json(activeUsers);
    } catch (error) {
      logException('userController.js', 'getAllActiveUsers', error.message);

      res.status(500).json({ message: error.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;
  
      // Check if the updated email exists for another user
      const existingUserWithEmail = await User.findOne({ email, _id: { $ne: id } });
      if (existingUserWithEmail) {
        return res.status(400).json({ message: 'Email already exists for another user' });
      }
  
      // Create an object with fields to update (excluding 'role')
      const updatedFields = { name, email, password };
  
      // Update the user, explicitly excluding the 'role' field
      const updatedUser = await User.findByIdAndUpdate(id, updatedFields, { new: true });
  
      res.status(200).json(updatedUser);
    } catch (error) {
      logException('userController.js', 'updateUser', error.message);

      res.status(500).json({ message: error.message });
    }
  },

  softDeleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedUser = await User.findByIdAndUpdate(id, { active: false }, { new: true });
      res.status(200).json(deletedUser);
    } catch (error) {
      logException('userController.js', 'softDeleteUser', error.message);

      res.status(500).json({ message: error.message });
    }
  },

  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      res.status(200).json(user);
    } catch (error) {
      logException('userController.js', 'getUserById', error.message);

      res.status(500).json({ message: error.message });
    }
  },

};

module.exports = userController;
