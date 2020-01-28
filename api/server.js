const express = require('express');
const middleware = require('./middleware');
const router = require('./router');

const app = express();

app.get('/', (request, response) => {
    response.send({message: 'server working'});
});

middleware(app);
app.use('/api', router);

module.exports = app;