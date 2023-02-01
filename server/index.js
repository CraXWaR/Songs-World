const express = require('express');
const cors = require('./config/cors');
const database = require('./config/database');
const routes = require('./routes');

const app = express();
//TODO...

serverStart()
async function serverStart() {
    try {
        app.use(cors());
        app.use(express.json());
        //TODO middleware
        app.use(routes);

        let port = process.env.PORT || 3030;
        app.listen(port, () => console.log(`Server listening on port ${port}`));
        await database();
    } catch (error) {
        console.log(error);
    }
}