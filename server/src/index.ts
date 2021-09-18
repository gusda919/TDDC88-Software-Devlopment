//const express = require('express');
import express from "express";
import { config } from "./config";
import mongoose from "mongoose";

import { User } from "./models";
import { router } from "./routes";

const app = express();

// using commonjs require because not supported by ES imports
const users = require('./testusers.json').testUsers;
 
// Connect to MongoDB
console.log('Connection to mongoDb on uri: ' + config.mongo.uri);
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err: Error) {
 console.error('MongoDB connection error: ' + err);
});

// populate db from json file
User.collection.deleteMany({}).then(() => console.log("All users deleted"));
User.collection.insertMany(users).then(() => console.log("Inserted users from JSON")) 
 
// Cross Origin middleware
app.use(function(req: express.Request, res: express.Response, next: express.NextFunction) {
 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 next();
});

app.use("/", router);
 
app.listen(config.port, () => console.log(`Example app listening on ${config.port}!`));