const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
        minlength: [3, 'Song name should have at least 3 characters!']
    },
    author: {
        required: true,
        type: String,
        minlength: [2, 'Author name should have at least 2 characters!']
    },
    genre: {
        required: true,
        type: String,
    },
    year: {
        required: true,
        type: Number,
        min: [1950, 'Song year should be newer than 1950\'s!'],
        max: [2023, 'Song cannot be from the future!']
    },
    price: {
        required: true,
        type: Number,
        min: [10, 'Song should be more expensive than 10 dolars!'],
        max: [200, 'Song can\'t be more expensive than 200 dolars!']
    },
    description: {
        required: false,
        type: String,
        minlength: [10, 'Description should have at least 10 characters!'],
        maxlength: [500, 'Description shouldn\'t have more than 500 characters!'],
    },
    songImage: {
        required: true,
        type: String
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
});

const song = new mongoose.model('Song', songSchema);

module.exports = song;