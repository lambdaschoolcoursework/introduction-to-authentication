const express = require('express');

const middleware = server => {
    server.use(express.json());
};

module.exports = middleware;