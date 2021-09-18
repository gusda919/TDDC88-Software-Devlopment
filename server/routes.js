const express = require('express');
const User = require('./models').User;

exports = module.exports = function(app) {
    app.get('/hello', (req, res) => {
        User.find({'Titel': 'vårdadministratör'}, (err, users) => {
            res.send(JSON.stringify(users));
        });
    });
}