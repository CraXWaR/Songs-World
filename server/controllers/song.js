const { addSong } = require('../services/song');
const router = require('express').Router();

router.post('/', async (req, res) => {
    const data = req.body;

    try {
        console.log(data);
        const userId = req?.user?._id;
        const song = await addSong(data, userId);
        //TODO update songs added by users
        res.status(201).json(song);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
})

module.exports = router;