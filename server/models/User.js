const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String,
        minlength: [3, 'Username should have at least 3 characters!'],
        maxlength: [10, 'Username cannot have more than 10 characters!']
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String,
        minlength: [3, 'Password should have at least 3 characters!'],
        maxlength: [12, 'Password cannot have more than 12 characters!'],
    },
    songs: [
        {
            type: mongoose.Types.ObjectId
            //TODO... REF
        }
    ],
    favouriteSongs: [
        {
            type: mongoose.Types.ObjectId
            //TODO... REF
        }
    ],
    avatar: {
        required: false,
        type: String
    }
});

userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 9)
        .then((hash) => {
            this.password = hash
            return next();
        });
});

const user = new mongoose.model('User', userSchema);
module.exports = user;