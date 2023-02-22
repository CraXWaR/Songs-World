const mongoose = require('mongoose');
require('dotenv').config();

function initDatabase() {
    return mongoose.connect('mongodb://0.0.0.0:27017/songsWorld');

}

module.exports = initDatabase;