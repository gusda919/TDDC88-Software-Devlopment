const express = require('express');
const config = require('./config');
const mongoose = require('mongoose');
const assert = require('assert')
const bodyParser = require('body-parser');
const app = express();

const User = require('./models').User;
const fs = require('fs')

const users = require('./testusers.json').testUsers;
 
// Connect to MongoDB
console.log('Connection to mongoDb on uri: ' + config.mongo.uri);
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
 console.error('MongoDB connection error: ' + err);
});

User.collection.deleteMany({}).then(() => console.log("All users deleted"));
User.collection.insertMany(users).then(() => console.log("Inserted users from JSON")) 
 
// Cross Origin middleware
app.use(function(req, res, next) {
 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 next();
});
 
require('./routes')(app);

console.log("hello world")
 
app.listen(config.port, () => console.log(`Example app listening on ${config.port}!`));