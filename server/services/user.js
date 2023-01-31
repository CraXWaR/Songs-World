const User = require('../models/User');
const bcrypt = require('bcryptjs');
const server = require('../environment');
const jwt = require('jsonwebtoken');
const blacklisted = require('../models/Blacklisted');

const validateToken = (token) => {
    try {
        const data = jwt.verify(token, server.SECRET_KEY);
        return data;
    } catch (error) {
        throw new Error('Invalid access token!');
    }
}

const createAccessToken = (user) => {
    const payload = {
        id: user._id,
        username: user.username,
        email: user._email
    }

    const accessToken  = jwt.sign(payload, server.SECRET_KEY);

    return {
        id: user._id,
        username: user.username,
        email: user.email,
        accessToken
    };

}

const register = async (data) => {
    const existingUsername = await User.findOne({ username: data.username }); 
    const existingEmail = await User.findOne({ email: data.email }); 

    if (existingUsername) {
        throw new Error('Username already exists!');
    }

    if (existingEmail) {
        throw new Error('Email already exists!');
    }

    const user = await User.create(data);
    return createAccessToken(user);

}