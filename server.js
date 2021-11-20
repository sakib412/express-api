const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/api";

mongoose
    .connect(DB_URL, {
        useNewUrlParser: true,
    })
    .then((con) => {
        console.log('DB connection Succesfull');
    });

let port = process.env.PORT || 3000;
const server = app.listen(port, () => `Started listening on port ${port}`);
process.on('unhandledRejection', (err) => {
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});