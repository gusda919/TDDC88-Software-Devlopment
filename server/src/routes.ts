import express, { Request, Response, } from "express";
import { Mongoose, Error } from "mongoose";
import { UserModel, UserDoc } from "./models"; 

export const router = express.Router();

router.get('/users/:name', async (req: Request, res: Response) => {
    // Simple route for searching by users' name property
    UserModel.find({'Namn': { '$regex': req.params.name.toString(), '$options': 'i' }}, async (err: Error, users: UserDoc) => {
        res.json(users);
    });
});