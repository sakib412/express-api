const express = require('express');
const morgan = require('morgan')
const app = express();
const userRoute = require('./routes/userRoute');

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

if (process.env.NODE_ENV == 'development') {
    app.use(morgan('dev'));
}

app.use('/api/user', userRoute);

module.exports = app;