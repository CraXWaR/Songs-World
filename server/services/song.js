const Song = require('../models/Song');
const User = require("../models/User");

require('dotenv').config();

const addSong = async (song, id) => {
    try {
        song.owner = id;
        return await Song.create({ ...song })
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

const getAllSongs = async () => {
    return await Song.find({});
}

const getMostExpensiveSongs = async () => {
    const songs = await Song.find({}).sort({ price: -1 }).limit(3);
    return songs
}

const getOneSong = async (id) => {
    return await Song.findById(id).populate('owner addedBy');
}

const deleteSong = async (id) => {
    return await Song.findByIdAndDelete(id);

}

const editSong = async (id, data) => {
    try {
        return await Song.findByIdAndUpdate(id, { ...data }, { runValidators: true });
    } catch (error) {
        throw new Error(error);
    }
}

const addToFavourite = async (userId, songId) => {
    try {
        const user = await User.findById(userId);
        let arr = user.favouriteSongs;
        arr.push(songId);
        await User.findByIdAndUpdate(userId, { favouriteSongs: arr });
    } catch (error) {
        throw new Error (error);
    }
}

module.exports = {
    addSong,
    getAllSongs,
    getMostExpensiveSongs,
    getOneSong,
    deleteSong,
    editSong,
    addToFavourite
}