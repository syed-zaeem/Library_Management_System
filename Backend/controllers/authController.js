const User = require('../models/User');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const misc = require('../utils/misc')
require('dotenv').config({ path: '../.env' });

const authController = {
signup : async (req, res) => {
    try {
        const { name, email, password, userType } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({
            name,
            email,
            password,
            userType
        });

        await user.save();

        logger.logUserAction(user, '', 'create')
        const token = misc.generateToken(user._id, user.userType)
        res.status(201).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
},

login : async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (password != user.password) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = misc.generateToken(user._id, user.userType)
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
}
module.exports = authController