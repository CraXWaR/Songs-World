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
})