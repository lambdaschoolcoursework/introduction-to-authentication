const express = require('express');
const bcrypt = require('bcryptjs');
const Users = require('./model');

const app = express.Router();

// register
app.post('/register', (request, response) => {
    let user = request.body;
    const hash = bcrypt.hashSync(request.body.password, 10);
    user.password = hash;
    
    console.log(user);

    Users.add(user)
        .then(res => response.status(200).json({message: 'user created successfully'}))
        .catch(err => {
            response.status(500).json({message: 'error registering user'});
            console.log(err);
        });
});

// login
app.post('/login', (request, response) => {
    const {username, password} = request.body;

    console.log({username});

    Users.find({username})
        .then(res => {
            if (bcrypt.compareSync(password, res.password)) {
                response.status(200).json({message: 'signed in successfully'});
            } else {
                response.status(500).json({message: 'invalid credentials'});
            };
        })
        .catch(err => {
            response.status(500).json({message: 'error logging in user'});
            console.log(err);
        });
});

// fetch all users
app.get('/users', (request, response) => {
    if (request.headers.authorization) {
        bcrypt.hash(request.headers.authorization, 10 , (err, hash) => {
            Users.find()
                .then(res => {
                    response.status(200).json(res);
                    console.log(hash);
                })
                .catch(err => {
                    response.status(500).json({message: 'error fetching users'});
                    console.log(err);
                });
        });
    } else {
        response.status(500).json({message: 'header missing'})
    };
});

/*
salting?
do i need to check if res(user) exists on line 31?
do you check for a certain token in header? or just that something is there? maybe checking id?
bcrypt.hash on line 47?
*/

module.exports = app;