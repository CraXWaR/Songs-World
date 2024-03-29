const express = require('express');
const cors = require('./config/cors');
const database = require('./config/database');
const routes = require('./routes');
const { authMiddleware } = require('./middlewares/auth');
const cookieParser = require('cookie-parser');

const app = express();

serverStart()
async function serverStart() {
    try {
        app.use(cors());
        app.use(cookieParser());
        app.use(express.json());
        app.use(authMiddleware);
        app.use(routes);

        let port = process.env.PORT || 3000;
        app.listen(port, () => console.log(`Server listening on port ${port}`));
        await database();
    } catch (error) {
        console.log(error);
    }
}