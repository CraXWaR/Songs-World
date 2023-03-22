const Song = require('../models/Song');

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

//TODO more funcions for song CRUD operations

module.exports = {
    addSong,
    getAllSongs
}