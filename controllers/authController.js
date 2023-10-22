const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../.env' });

signup = async (req, res) => {
    try {
        const { name, email, password, dateOfBirth, role } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({
            name,
            email,
            password,
            dateOfBirth,
            role
        });

        await user.save();

        const token = jwt.sign({ email: user.email, userId: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.status(201).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (password != user.password) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ email: user.email, userId: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    login,
    signup
}