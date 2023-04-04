const user = require('../models/User');
const { register, login, logout } = require('../services/user');
const router = require('express').Router();

router.post('/register', async (req, res) => {
    const data = req.body;

    try {
        const user = await register(data);
        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }

    res.end();
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await login(email, password);
        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }

    res.end();
});

router.delete('/logout', async (req, res) => {
    res.cookie('auth', 'none', {
        httpOnly: true,
        sameSite: 'none',
        secure: true
    });
    res.send({
        message: 'Cookie deleted successfully!'
    });


    // let token = req.user.token;
    // await logout(token);
    // res.status(204).end();
});

router.get('/user', async (req, res) => {
    let cookie = req.user.cookie;

    if (cookie != 'none') {
        let user = await user.findOne({token:cookie});

        if (user) {
            let userToReturn = {
                _id: user._id,
                username: user.username,
                email: user.email,
                songs: user.songs,
                favouriteSongs: user.favouriteSongs,
                avatar: user.avatar
            };
            if (user) {
                res.status(200).json(userToReturn);
            }
        } else {
            res.status(400).json({ error: 'Unvalid user!' });
        }
    } else {
        res.end();
    }
})

module.exports = router;