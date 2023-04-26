const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String,
        minlength: [3, 'Username should have at least 3 characters!'],
        maxlength: [10, 'Username cannot have more than 10 characters!']
    },
    city: {
        required: true,
        type: String,
        minlength: [3, 'City should have at least 3 characters!'],
        maxlength: [20, 'City cannot have more than 20 characters!']
    },
    email: {
        required: true,
        type: String
    },
    personalInfo: {
        required: true,
        minlength: [10, 'Personal information should have at least 10 characters!'],
        maxlength: [7000, 'Personal information cannot have more than 7000 characters!'],
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
            type: mongoose.Types.ObjectId,
            ref: 'Song'
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