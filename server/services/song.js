const Song = require('../models/Song');

require('dotenv').config();

const addSong = async (song, id) => {
    try {
        song.owner = id;
        return await Song.create({...song})
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

module.exports = {
    addSong
}