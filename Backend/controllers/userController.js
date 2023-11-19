const User = require('./userModel'); // Assuming this is your Mongoose User model

const userController = {
  getAllActiveUsers: async (req, res) => {
    try {
      const activeUsers = await User.find({ active: true });
      res.json(activeUsers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { email } = req.body;

      // Check if the updated email exists for another user
      const existingUserWithEmail = await User.findOne({ email, _id: { $ne: id } });
      if (existingUserWithEmail) {
        return res.status(400).json({ message: 'Email already exists for another user' });
      }

      // If the email is unique, proceed with the update
      const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
      res(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  softDeleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedUser = await User.findByIdAndUpdate(id, { active: false }, { new: true });
      res.status(200).json(deletedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

};

module.exports = userController;
