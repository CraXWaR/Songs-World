const User = require('../models/User');
const { register, login, logout } = require('../services/user');
const router = require('express').Router();
const jwtDecode = require('jwt-decode');

router.post('/register', async (req, res) => {
    const data = req.body;

    try {
        const user = await register(data);
        // res.cookie('userId', user._id, { maxAge: 86400000 });
        res.cookie("auth", user.accessToken, { httpOnly: true, secure: true, sameSite: 'none' });
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
        // res.cookie('userId', user._id, { maxAge: 86400000 });
        res.cookie("auth", user.accessToken, { httpOnly: true, sameSite: 'none', secure: true });
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

router.post('/user', (req, res) => {
    console.log(req.user.cookie);
    const data = req.body;
    const token = jwtDecode(data.token);
    // console.log(token);
    try {
        const username = token.username;
        const email = token.email;
        // const fullName = token.fullName;
        // const userInfo = token.userInfo;

        res.status(200).json({ "username": username, "email": email });
        res.end();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

})

module.exports = router;