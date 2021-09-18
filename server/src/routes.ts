import express from "express";
import { Mongoose } from "mongoose";
import { User } from "./models"; 

export const router = express.Router();

router.get('/users/:name', async (req: express.Request, res: express.Response) => {
    // Simple route for searching by users' name property
    User.find({'Namn': { '$regex': req.params.name.toString(), '$options': 'i' }}, async (err, users) => {
        res.json(users);
    });
});