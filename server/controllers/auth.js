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
})

router.delete('/logout', async (req, res) => {
    let token = req.user.token;
    await logout(token);
    res.status(204).end();
})

module.exports = router;