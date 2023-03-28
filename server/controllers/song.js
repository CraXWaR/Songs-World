const { addSong, getAllSongs, getMostExpensiveSongs, getOneSong, deleteSong } = require('../services/song');
const router = require('express').Router();
const jwtDecode = require('jwt-decode');
const User = require('../models/User');

// router.get('/', (req, res) => {
//     console.log(1234);
//     const data = req.body;
//     const token = jwtDecode(data.token);
//     console.log(token);
//     try {
//         const username = token.username;
//         res.status(200).json({ "username": username });
//         res.end();
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// });
router.post('/', async (req, res) => {
    const data = req.body;
    const token = jwtDecode(data.token);
    try {
        // const userId = req?.user?._id;
        // console.log(userId);
        // console.log(data);
        const userId = token.id;
        const song = await addSong(data, userId);
        //TODO update songs added by users
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
    //TODO check user
    await deleteSong(req.params.id);
    res.status(200).json('Song deleted!');
});

module.exports = router;