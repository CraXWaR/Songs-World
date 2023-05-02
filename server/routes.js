const authController = require('./controllers/auth');
const songController = require('./controllers/song');

const router = require('express').Router();

router.get('/', (req, res) => {
    res.json('Working..');
})
router.use(authController);
router.use('/songs', songController);

module.exports = router;