const express = require('express');
const authRouter = require('../auth/authRouter');

const app = express.Router();

app.use('/auth', authRouter);

module.exports = app;