//const express = require('express');
import express from "express";
import { config } from "./config";
import mongoose from "mongoose";

import { UserModel } from "./user";
import { PatientModel } from './patient';

import { router } from "./routes";

const app = express();

// using commonjs require because json not supported by ES imports
const users = require('./testusers.json').testUsers;
const patients = require('./emergency_room_test_data.json');
 
// Connect to MongoDB
console.log('Connection to mongoDb on uri: ' + config.mongo.uri);
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err: Error) {
 console.error('MongoDB connection error: ' + err);
});

// populate db with users and patients
mongoose.connection.on('open', function() {
    mongoose.connection.db.listCollections({name: 'UserModel'})
        .next(function(err, collinfo) {
            if (collinfo) {
                UserModel.collection.deleteMany({}).then(() => console.log("All users deleted"));
                UserModel.collection.insertMany(users).then(() => console.log("Inserted users from JSON"));
                PatientModel.collection.deleteMany({}).then(() => console.log("All patients deleted"));
                PatientModel.collection.insertMany(patients).then(() => console.log("Inserted patients from JSON"));
            }
        });
});

// UserModel.collection.deleteMany({}).then(() => console.log("All users deleted"));
// UserModel.collection.insertMany(users).then(() => console.log("Inserted users from JSON"));
// PatientModel.collection.deleteMany({}).then(() => console.log("All patients deleted"));
// PatientModel.collection.insertMany(patients).then(() => console.log("Inserted patients from JSON"));

 
// Cross Origin middleware
app.use(function(req: express.Request, res: express.Response, next: express.NextFunction) {
 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 next();
});

app.use("/", router);
 
app.listen(config.port, () => console.log(`Example app listening on ${config.port}!`));