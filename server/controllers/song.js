const { addSong, getAllSongs, getMostExpensiveSongs, getOneSong, deleteSong, editSong, getOwnedSongs } = require('../services/song');
const router = require('express').Router();
const jwtDecode = require('jwt-decode');
const { updateSongs } = require('../services/user');
// const User = require('../models/User');

router.post('/', async (req, res) => {
    const data = req.body;
    const token = jwtDecode(data.token);
    try {
        const userId = token._id;
        const song = await addSong(data, userId);
        await updateSongs(userId, song._id);
        res.status(201).json(song);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    const songs = await getAllSongs();
    res.status(200).json(songs);
});

router.get('/most', async (req, res) => {
    const songs = await getMostExpensiveSongs();
    res.status(200).json(songs);
});

router.get('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const song = await getOneSong(id);
        if (song) {
            res.status(200).json(song);
        } else {
            throw new Error('Invalid song ID!')
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
});

router.delete('/:id', async (req, res) => {
    await deleteSong(req.params.id);
    res.status(200).json('Song deleted!');
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const song = await getOneSong(id);
    try {
        const token = jwtDecode(data.token);
        const userId = token._id;
        if (userId == song.owner.id) {
            await editSong(id, data);
            const updatedSong = await getOneSong(id);
            res.status(200).json(updatedSong);
        } else {
            throw new Error('You are not the owner!');
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
});

module.exports = router;