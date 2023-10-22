const User = require('../models/User'); 

getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

updateUser = async (req, res) => {
    try {
      const userId = req.params.id;
      const updatedUserData = req.body;
  
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
        if (updatedUserData.email) {
        const emailExists = await User.findOne({ email: updatedUserData.email });
  
        if (emailExists && emailExists._id.toString() !== userId) {
          return res.status(400).json({ message: 'Email already exists' });
        }
      }
  
      updatedUserData.role = user.role;
  
      const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });
      res.status(200).json({ updatedUser });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndRemove(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}