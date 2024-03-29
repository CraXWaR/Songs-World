const User = require('../models/User');
const bcrypt = require('bcryptjs');
const server = require('../enviroment');
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
        _id: user._id,
        username: user.username,
        city: user.city,
        email: user.email,
        personalInfo: user.personalInfo,
        avatar: user.avatar,
    };

    const accessToken = jwt.sign(payload, server.SECRET_KEY);
    return {
        username: user.username,
        city: user.city,
        email: user.email,
        personalInfo: user.personalInfo,
        avatar: user.avatar,
        accessToken,
        _id: user._id
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

const login = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Invalid email or password!');
    }

    const isUser = await bcrypt.compare(password, user.password);

    if (isUser) {
        let userToReturn = createAccessToken(user);
        return userToReturn;

    } else {
        throw new Error('Invalid email or password!');
    }
}

const updateUser = async (id, data) => {
    try {
        return await User.findByIdAndUpdate(id, { ...data }, { runValidators: true });
    } catch (error) {
        return error;
    }
}

const updateSongs = async (_id, songId) => {
    try {
        const user = await User.findById(_id);
        let arr = user.songs;
        arr.push(songId);
        await User.findByIdAndUpdate(_id, { songs: arr });
    } catch (error) {
        throw new Error(error)
    }
}

const logout = async (token) => {
    await blacklisted.create({ token });
}

module.exports = {
    validateToken,
    createAccessToken,
    register,
    login,
    updateUser,
    updateSongs,
    logout

}