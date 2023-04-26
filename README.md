# Angular-SPA project

Songs World:

Single Page Application, created as Angular for the client side, Node.js for server side, and using MongoDB for Data Base.

Information:

The app works as blog for songs with basic funcionality. Every user who is not logged in have access to "Home, Catalog, Login and Register". Every logged in user have access to "Catalog, Create, Songs details, Delete songs, Songs edit, Profile and Edit profile".

TechStack:

Client side - Angular CLI: 15.1.3, TypeScript: 4.7-.2

Server side - Node: 17.2.0, ExpressJS: 4.18.2, bcryptjs: 2.4.3, jsonwebtoken: 9.0.0, mongoose: 6.7.3, nodemon: 2.0.20, jwt-decode: 3.1.2, cookie-parser: 1.4.6, cors: 2.8.5, dotenv: 16.0.3, nodemon: 2.0.20

Setup:

To run the rest service, in directory "server" open cmd and run: $npm install "to install all dependencies" $npm start "to start the server"

To run the app, in directory "client" open cmd and run: $npm install "to install all dependencies" $ng server "to start the application"

The server will run at port "3000", and the app will run at port "4200".
