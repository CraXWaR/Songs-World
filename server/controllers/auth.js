const { register, login, updateUser } = require('../services/user');
const router = require('express').Router();
const jwtDecode = require('jwt-decode');
const User = require('../models/User');

router.post('/register', async (req, res) => {
    const data = req.body;

    try {
        const user = await register(data);
        res.cookie("auth", user.accessToken, { secure: true,sameSite: 'none'});
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
        res.cookie("auth", user.accessToken, { sameSite: 'none' , secure: true});
        res.status(201).json(user)
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
});

router.post('/user', async (req, res) => {
    const data = req.body;
    const token = jwtDecode(data.token);
    let cookie = req.user.cookie;
    if (cookie ) {
        console.log(req.user);
    } else {
        console.log('hi');
    }
    try {
        const username = token.username;
        const email = token.email;
        const city = token.city;
        const personalInfo = token.personalInfo;
        const avatar = token.avatar;

        res.status(200).json({ "username": username, "email": email, "city": city, "personalInfo": personalInfo, "avatar": avatar });
        res.end();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

});

router.put('/user/:id', async (req, res) => {
    const data = req.body;

    try {
        const token = jwtDecode(data.token);
        const userId = token._id;
        await updateUser(userId, data);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

});

module.exports = router;